// Binary Overdose
import { arrayToObject }                        from 'bo-utils';
import { objectIsObject as isObject }           from 'bo-utils';
import { objectIsEmptyObject as isEmptyObject } from 'bo-utils';
import { timeseriesThin }                       from 'bo-utils';
import { timeseriesPrune }                      from 'bo-utils';
import { timeseriesScale }                      from 'bo-utils';

// Cryptohub util functions
import logger                                   from '../logger';
import settings                                 from '../settings';

/**
 *
 * Timeseries Rescale
 *
 * @param {Array} timeseries - Array of timeseries objects
 * @return {Array} - Array of updated timeseries object
 *
 */
function getNewTimeseriesData(item, limit = 50, maxAge = 1000 * 60 * 60 * 24 * 7) {

  const price      = item['cc-total-vol-full-PRICE'];
  const volume     = item['cc-total-vol-full-TOTALVOLUME24HTO'];
  const timestamp  = item['cc-total-vol-full-PRICE-timestamp'];
  const timeseries = item['cryptohub-price-history'] || [];

  timeseriesPrune(timeseries, maxAge);
  timeseriesThin(timeseries, limit);

  const last = timeseries[timeseries.length - 1];
  const next = {price, volume, timestamp: +new Date(timestamp)};
  if (JSON.stringify(last) !== JSON.stringify(next)) timeseries.push(next);

  return timeseries;

}

/**
 *
 * Get Price in BTC
 *
 * @param {Object} item
 * @param {Number} bitcoinPrice
 * @return {Object|Boolean}
 *
 */
function getPriceInBtc(item, bitcoinPrice) {

  const timestamp   = +new Date(item['cc-total-vol-full-PRICE-timestamp']);
  const cryptoPrice = item['cc-total-vol-full-PRICE'];
  const amount = 1 / (bitcoinPrice / cryptoPrice);
  return bitcoinPrice && cryptoPrice
    ? {amount, timestamp}
    : false;
}

/**
 *
 * ADD CRYPTOHUB FIELDS
 *
 */
function addCryptohubFields(data) {

  //
  // BTC Price
  //
  const btcId = 1182;
  const btcItem = data[btcId];
  let bitcoinPrice;
  if (btcItem) {
    bitcoinPrice = btcItem['cc-total-vol-full-PRICE'];
  }

  let key;
  let item;
  for ([key, item] of Object.entries(data)) {

    // Timeseries
    const timeseries = getNewTimeseriesData(item);
    if (timeseries) {
      item['cryptohub-price-history'] = timeseries;
    }

    // Bitcoin price
    const priceInBtc = getPriceInBtc(item, bitcoinPrice);
    if (priceInBtc) {
      item['cryptohub-price-btc']           = priceInBtc.amount;
      item['cryptohub-price-btc-timestamp'] = priceInBtc.timestamp;
    }

    // Circulating percent total
    const supplyTotal       = item['cc-coinlist-TotalCoinSupply'];
    const supplyCirculating = item['cc-total-vol-full-SUPPLY'];
    item['cryptohub-circulating-percent-total'] = (supplyCirculating / supplyTotal) * 100;

  }

  return data;

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
 * NOTE:
 *   Regarding packing and diffing data
 *   We should never save packed data or data diffs
 *   We should only ever emit packed data or data diffs so knowing that
 *   all data we work with here should be full datasets of unpacked data
 *
 * @param {Object} [options]
 * @param {Object} data
 * @param {} cache
 *
 */
export default function dataOnHandleData(options = {}, data, cache, oldData = {}) {
  try {

    let newData = data;

    // TODO: fix this so oldData is never an rrray
    if (Array.isArray(oldData)) {
      oldData = arrayToObject(oldData, 'cc-coinlist-Id');
    }

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

    // Add custom cryptohub fields
    newData = addCryptohubFields(newData);

    // Save file (the watcher will pick it up and emit it)
    const fileName = `${settings.generatedDir}/data/data.json`;
    cache.set(fileName, JSON.stringify(newData));

  }
  catch(error) {
    const message = `dataOnHandleData(): ${error}`;
    logger.error(message);
    debugger
    if (process.env.NODE_ENV === 'development') debugger;
    return {message, error: true};
  }
}
