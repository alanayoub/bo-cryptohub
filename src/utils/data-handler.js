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

    // Delete records that we don't have sufficient data for
    for ([key, item] of Object.entries(data)) {
      if (
           item['cc-coinlist-IsTrading']     === false
        || item['cc-price-TOTALVOLUME24HTO'] === 0
        || item['cc-price-PRICE']            === void 0
      ) {
        delete data[key];
      }
    }

    // Merge new data with last data set
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

    // Create custom fields
    const btcId = 1182;
    const btcItem = data[btcId];
    let btcPrice;
    if (btcItem) {
      btcPrice = btcItem['cc-price-PRICE'];
    }
    let ccRank;
    let ccRankTimestamp
    let ccPrice;
    let totalSupply;
    let circulatingSupply;
    for (let [key, item] of Object.entries(data)) {
      ccRank  = item['cc-coinlist-SortOrder'] || 10000;
      ccRankTimestamp = item['cc-coinlist-SortOrder-timestamp'];
      ccPrice = item['cc-price-PRICE'];
      totalSupply = item['cc-coinlist-TotalCoinSupply'];
      circulatingSupply = item['cc-price-SUPPLY'];
      item['cryptohub-rank'] = ccRank;
      item['cryptohub-rank-timestamp'] = ccRankTimestamp;
      item['cryptohub-circulating-percent-total'] = (circulatingSupply / totalSupply) * 100;
      item['cryptohub-circulating-percent-total-timestamp'] = ccRankTimestamp;
      if (btcPrice && ccPrice) {
        item['cryptohub-price-btc'] = 1 / (btcPrice / ccPrice);
        item['cryptohub-price-btc-timestamp'] = item['cc-price-PRICE-timestamp'];
      }
    }

    // pack data and save file (the watcher will pick it up and emit it)
    data = packData(data);
    settings.cache.set(settings.keyCryptohubAnalyticsTmp, JSON.stringify(data));

  }
  catch(error) {
    const message = `dataHandler(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
