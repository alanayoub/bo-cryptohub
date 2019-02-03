/**
 *
 * Data Handler
 * Gets called everytime the data is updated
 *
 * @param {Array} data
 *
 */
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');

/**
 *
 * arrayToObject
 *
 */
function arrayToObject(data, field) {
  var objData = {};
  for (let obj of data) {
    objData[obj[field]] = obj;
  }
  return objData;
}

/**
 *
 * packData
 *
 */
const packData = function (data) {

  let id, item;
  let key, val;

  // Create key list
  const keys = [];
  for ([id, item] of Object.entries(data)) {
    for ([key, val] of Object.entries(item)) {
      if (!keys.includes(key)) keys.push(key);
    }
  }

  // Use key list to Minify data
  let newObj;
  let newData = {};
  for ([id, item] of Object.entries(data)) {
    newObj = {};
    for ([key, val] of Object.entries(item)) {
      newObj[keys.indexOf(key)] = val;
    }
    newData[id] = newObj;
  }

  newData.keys = keys;
  return newData;

}

/**
 *
 * unpackData
 *
 */
const unpackData = function (data) {

  let id, item;
  let key, val;
  let newObj;
  let newData = {};
  const keys = data.keys;

  // keys are required to unpack the data
  // they are a map from the minified object keys to the full text keys
  if (!keys) return data;
  delete data.keys;
  for ([id, item] of Object.entries(data)) {
    newObj = {};
    for ([key, val] of Object.entries(item)) {
      newObj[keys[key]] = val;
    }
    newData[id] = newObj;
  }

  return newData;

};

/**
 *
 * Delete bad records
 *
 */
function deleteBadRecords(data) {

  let key;
  let item;

  // Delete records that we don't have sufficient data for
  for ([key, item] of Object.entries(data)) {
    if (
         item['cc-total-vol-full-TOTALVOLUME24HTO'] === 0
      || item['cc-total-vol-full-PRICE']            === void 0
    ) {
      delete data[key];
    }
  }

  return data;

}

/**
 *
 * Update the price history array with the latest price
 *
 * @param {Object} timeseries - A timeseries string (timestamp|price) delimited by ,
 * @param {Number} newPrice
 * @param {Number} newTimestamp
 * @param {Number} [limit] - Maximum timeseries element aloud
 * @return {String} return the modified timeseries string
 *
 */
function updateChPriceHistory(timeseries, newTimestamp, newPrice, limit = 100, maxAge = 7 * 24 * 60 * 60 * 1000) {

  let tsArr = timeseries ? timeseries.split(',') : [];

  // remove anything older than maxAge
  const tsNow = +new Date();
  tsArr = tsArr.filter((v, i) => {
    return (tsNow - v.split('|')[0]) < maxAge;
  });

  // To make space for the new timeseries item we remove one of the
  // current items, the one that has the shortest time span between
  // it and its sibling
  let d;
  let idx;
  let diff = Infinity;
  if (tsArr.length >= limit) {
    tsArr.forEach((v, i) => {
      if (i === 0) return;
      d = Math.abs(tsArr[i-1].split('|')[0] - tsArr[i].split('|')[0]);
      if (d < diff) {
        diff = d;
        idx = i;
      }
    });
    tsArr.splice(idx, 1);
  }

  // Add new timeseries item
  tsArr.push(`${newTimestamp}|${newPrice}`);
  timeseries = tsArr.join();

  return timeseries;

}

/**
 *
 * Backfill and format data
 *
 * When running a new instance of the ap the datastore starts off empty.
 * Some data takes longer to scrape than other therefore some items in the
 * datastore will stay empty for a while. To prevent this we backfill the datastore
 * with the last output datasource if any of the stores are empty
 *
 */
module.exports = function dataHandler(data) {
  try {

    let id;
    let item;
    let key;
    let val;

    //
    // Delete here to trim down the noise
    //
    data = deleteBadRecords(data);

    //
    // Unpack data & merge new data with last data set
    //
    {
      let [ oldData ] = settings.cache.get(settings.keyCryptohubAnalyticsOut);
      oldData = JSON.parse(oldData);

      if (Array.isArray(oldData)) {
        oldData = arrayToObject(oldData, 'cc-coinlist-Id');
      }

      // Unpack minified data
      oldData = unpackData(oldData);

      // Do merge
      for (id of Object.keys(oldData)) {
        data[id] = Object.assign(oldData[id], data[id]);
      }
    }

    //
    // Also Delete here to remove any legacy records that slipped through
    //
    data = deleteBadRecords(data);

    let ccPrice;
    let totalSupply;
    let ccPriceTimestamp;
    let circulatingSupply;

    //
    // BTC Price
    //
    let ccBTCPrice;
    {
      const btcId = 1182;
      const btcItem = data[btcId];
      if (btcItem) {
        ccBTCPrice = btcItem['cc-total-vol-full-PRICE'];
      }
    }

    for (let [key, item] of Object.entries(data)) {

      ccPrice = item['cc-total-vol-full-PRICE'];
      ccPriceTimestamp = +new Date(item['cc-total-vol-full-PRICE-timestamp']);

      //
      // Update price history
      //
      {
        const timeseries = item['cryptohub-price-history'];
        item['cryptohub-price-history'] = updateChPriceHistory(timeseries, ccPriceTimestamp, ccPrice);
      }

      {
        totalSupply = item['cc-coinlist-TotalCoinSupply'];
        circulatingSupply = item['cc-total-vol-full-SUPPLY'];
        item['cryptohub-circulating-percent-total'] = (circulatingSupply / totalSupply) * 100;
      }

      if (ccBTCPrice && ccPrice) {
        item['cryptohub-price-btc'] = 1 / (ccBTCPrice / ccPrice);
        item['cryptohub-price-btc-timestamp'] = ccPriceTimestamp;
      }
    }

    //
    // pack data and save file (the watcher will pick it up and emit it)
    //
    data = packData(data);
    settings.cache.set(settings.keyCryptohubAnalyticsTmp, JSON.stringify(data));

  }
  catch(error) {
    const message = `dataHandler(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
