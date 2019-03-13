// Binary Overdose
import { arrayToObject }                        from 'bo-utils';
import { objectIsEmptyObject as isEmptyObject } from 'bo-utils';
import { objectIsObject as isObject }           from 'bo-utils';

// Cryptohub util functions
import logger                                   from '../logger';
import settings                                 from '../settings';

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
    return !(
         item['cc-total-vol-full-TOTALVOLUME24HTO'] === 0
      || item['cc-total-vol-full-PRICE'] === void 0
      || item['cc-total-vol-full-Id'] === void 0
    )
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
 * Get Changes
 *
 * @param {Object} oldData
 * @param {Object} newData
 * @return {Object} - the changes between oldData and newData
 *
 */
function getChanges(oldData, newData, idField) {
  const output = {};
  let key;
  let val;
  let k;
  let v;
  for ([key, val] of Object.entries(newData)) {
    if (oldData[key]) {
      for ([k, v] of Object.entries(newData[key])) {
        // If the property is different
        if (JSON.stringify(oldData[key][k]) !== JSON.stringify(v)) {
          if (!output[key]) output[key] = {};
          // Keep the new property
          output[key][k] = v;
        }
      }
      // If there are any changes in this item add the id field
      if (output[key]) {
        output[key][idField] = newData[key][idField];
      }
    }
    else {
      output[key] = newData[key];
    }
  }
  return output;
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
 * @param {Object} [options]
 * @param {Object} data
 * @param {} cache
 *
 */
module.exports = function dataHandler(options = {}, data, cache) {
  try {

    let newData = data;

    // Get old data
    let oldData = getOldData(cache);

    //
    // ROW DATA STUFF
    //

    //
    // Backfill new data with old data
    //
    // NOTE:
    // We still need to do this even when we are emitting
    // a diff because the whole data should be available to be
    // used by functions like `addCryptohubFields()`
    for (let id of Object.keys(oldData)) {
      newData[id] = Object.assign({}, oldData[id], newData[id]);
    }

    // Delete junk or partial data
    newData = deleteBadRecords(newData);

    // Add custom cryptohub fields
    newData = addCryptohubFields(newData);

    const idField = 'cc-total-vol-full-Id';
    const diff = getChanges(oldData, newData, idField);
    const gotChanges = !isEmptyObject(diff);

    // {

    //   function mergeData(oldData = {}, newData = {}) {

    //     let key;
    //     let output = {};
    //     const allKeys = Array.from(new Set([
    //       ...Object.keys(oldData),
    //       ...Object.keys(newData)
    //     ]));

    //     for (key of allKeys) {
    //       output[key] = newData[key]
    //         ? Object.assign({}, oldData[key], newData[key])
    //         : oldData[key];
    //     }

    //     return output;
    //   }

    //   console.group('changes');
    //   const diff = getChanges(oldData, newData);
    //   console.log('getChanges test:', diff);

    //   const merged = mergeData(oldData, diff);
    //   console.log('merged', merged);

    //   const result = JSON.stringify(newData) === JSON.stringify(merged);
    //   console.log('is there a difference? ', !result);

    //   const newDiff = getChanges(newData, merged);
    //   console.log('newDiff is:', newDiff);
    //   console.groupEnd('changes');

    //   if (!result) debugger;

    // }

    if (gotChanges) {

      // Get changes only
      // NOTE: We cant do this as the file is the same place
      // where events get picked up and where the backfill happens!!!
      if (options.updatesOnly) {
        newData = diff;
      }

      // Save file (the watcher will pick it up and emit it)
      const fileName = '/tmp-generated/data/data.json';
      cache.set(fileName, JSON.stringify(newData));

    }

    //
    // OTHER STUFF
    //

    const status = whatsHappening(newData);
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



































