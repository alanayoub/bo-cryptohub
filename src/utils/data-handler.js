// Libs
import arrayToObject from '../libs/bo-utils/array-to-object';
import isEmptyObject from '../libs/bo-utils/object-is-empty-object.js';
import isObject from '../libs/bo-utils/object-is-object.js';

// Cryptohub
import logger from '../logger';
import settings from '../settings';

/**
 *
 * Data Handler
 * Gets called everytime the data is updated
 *
 * @param {Array} data
 *
 */

/**
 *
 * Pack Data
 *
 * @param {Object} data
 * @return {Object}
 *
 */
const packData = function (data) {

  let id;
  let item;
  let key;
  let val;

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
 * Unpack Data
 *
 * @param {Object} data
 * @return {Object}
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
  if (!keys) {
    logger.warn('unpackData(): no `keys` property was available on data to unpack');
    return data;
  }
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
 * @param {Object} data
 * @return {Object}
 *
 */
function deleteBadRecords(data) {

  let key;
  let item;

  function validData(item) {
    return !(item['cc-total-vol-full-TOTALVOLUME24HTO'] === 0 || item['cc-total-vol-full-PRICE'] === void 0);
  }

  function isFresh(item) {
    const now = +new Date();
    const longestAge = 1000 * 60 * 60 * 24;
    const timestamp = +new Date(item['cc-total-vol-full-PRICE-timestamp']);
    return now - timestamp < longestAge;
  }

  for ([key, item] of Object.entries(data)) {
    if (!validData(item) || !isFresh(item)) delete data[key];
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
function updateTimeseriesHistory(timeseries, newTimestamp, newPrice, newVolume, limit = 100, maxAge = 7 * 24 * 60 * 60 * 1000) {

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
  tsArr.push(`${newTimestamp}|${newPrice}|${newVolume}`);
  timeseries = tsArr.join();

  return timeseries;

}

/**
 *
 * GET OLD DATA
 *
 */
function getOldData(cache) {
  let [ oldData ] = cache.get('/out/data/data.json');
  if (oldData) oldData = JSON.parse(oldData);
  if (Array.isArray(oldData)) {
    oldData = arrayToObject(oldData, 'cc-coinlist-Id');
  }
  return oldData || {};
}

/**
 *
 * ADD CRYPTOHUB FIELDS
 *
 */
function addCryptohubFields(data) {

  let ccPrice;
  let ccVolume;
  let timeseries;
  let totalSupply;
  let ccPriceTimestamp;
  let circulatingSupply;

  //
  // BTC Price
  //
  let ccBTCPrice;
  const btcId = 1182;
  const btcItem = data[btcId];
  if (btcItem) {
    ccBTCPrice = btcItem['cc-total-vol-full-PRICE'];
  }

  let key;
  let item;
  for ([key, item] of Object.entries(data)) {

    ccPrice = item['cc-total-vol-full-PRICE'];
    ccVolume = item['cc-total-vol-full-TOTALVOLUME24HTO'];
    timeseries = item['cryptohub-price-history'];
    totalSupply = item['cc-coinlist-TotalCoinSupply'];
    ccPriceTimestamp = +new Date(item['cc-total-vol-full-PRICE-timestamp']);
    circulatingSupply = item['cc-total-vol-full-SUPPLY'];

    // Update
    item['cryptohub-price-history'] = updateTimeseriesHistory(
      timeseries, ccPriceTimestamp, ccPrice, ccVolume
    );
    item['cryptohub-circulating-percent-total'] = (circulatingSupply / totalSupply) * 100;
    if (ccBTCPrice && ccPrice) {
      item['cryptohub-price-btc'] = 1 / (ccBTCPrice / ccPrice);
      item['cryptohub-price-btc-timestamp'] = ccPriceTimestamp;
    }
  }

  return data;

}

/**
 *
 * @param {Object} data
 * @return {Object}
 *
 */
function whatsHappening(data) {

  if (!isObject(data)) return false;

  let key;
  let val;
  let up = 0;
  let down = 0;
  let noChange = 0;
  for (key of Object.keys(data)) {
    if (!data[key]) continue;
    val = data[key]['cc-total-vol-full-CHANGEPCTDAY'];
    if (val > 0) up++;
    else if (val < 0) down++;
    else noChange++;
  }
  return {up, down, noChange};
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
module.exports = function dataHandler(data, cache) {
  try {

    // Get old data & unpack it
    let oldData = unpackData(getOldData(cache));

    //
    // ROW DATA STUFF
    //

    // Backfill new data with old data
    for (let id of Object.keys(oldData)) {
      data[id] = Object.assign(oldData[id], data[id]);
    }

    // Delete junk or partial data
    data = deleteBadRecords(data);

    // Add custom cryptohub fields
    data = addCryptohubFields(data);

    // pack data
    const packedData = packData(data);

    // Save file (the watcher will pick it up and emit it)
    const fileName = '/tmp-generated/data/data.json';
    if (!isEmptyObject(packedData)) cache.set(fileName, JSON.stringify(packedData));

    //
    // OTHER STUFF
    //

    const status = whatsHappening(data);
    console.log(status);

  }
  catch(error) {
    const message = `dataHandler(): ${error}`;
    logger.error(message);
    debugger
    if (process.env.NODE_ENV === 'development') debugger;
    return {message, error: true};
  }
}
