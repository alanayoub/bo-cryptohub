// Binary Overdose
import { arrayToObject }                        from 'bo-utils';
import { objectIsObject as isObject }           from 'bo-utils';
import { objectIsEmptyObject as isEmptyObject } from 'bo-utils';
import { timeseriesThin }                       from 'bo-utils';
import { timeseriesPrune }                      from 'bo-utils';
import { timeseriesScale }                      from 'bo-utils';

// Cryptohub util functions
import logger                                   from '../../logger';
import settings                                 from '../../settings';
import { perSecondSave }                        from '../../db';
import { getRows }                              from '../../db/query';

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
  if (timeseries[0] && timeseries[0].timestamp === null) timeseries.splice(0, 1);
  if (!price || !volume || !timestamp) {
    return timeseries;
  }

  timeseriesPrune(timeseries, maxAge);
  timeseriesThin(timeseries, limit);

  const last = timeseries[timeseries.length - 1];
  const next = {price, volume, timestamp: +new Date(timestamp)};
  if (JSON.stringify(last) !== JSON.stringify(next)) timeseries.push(next);

  return timeseries;

}

//
//
//
function priceInBitcoin(oldData = {}, newData, bitcoinPrice) {

  const output = {};
  const cryptoPrice = newData['cc-total-vol-full-PRICE'];
  const cryptoPriceTimestamp = newData['cc-total-vol-full-PRICE-timestamp'];

  if (bitcoinPrice && cryptoPrice) {

    const field = 'cryptohub-price-btc';

    // output.price = 1 / (bitcoinPrice / cryptoPrice); // btc
    output.price = Math.ceil((1 / (bitcoinPrice / cryptoPrice)) * 100000000); // sats

    if (settings.fieldLastValue.includes(field)) {
      output.lastPrice = oldData[field];
    }

    output.timestamp = +new Date(cryptoPriceTimestamp);

  }

  return output;

}

function getBitcoinPrice(data) {
  return data[1182] ? data[1182]['cc-total-vol-full-PRICE'] : false;
}

/**
 *
 * ADD CRYPTOHUB FIELDS
 *
 */
async function getCryptohubFields(oldData, data) {

  const cryptohubData = {}

  let key;
  let item;
  const bitcoinPrice = getBitcoinPrice(data);
  for ([key, item] of Object.entries(data)) {

    if (isNaN(key)) continue;

    cryptohubData[key] = {};

    // Timeseries
    const timeseries = getNewTimeseriesData(item);
    if (timeseries) {
      // item['cryptohub-price-history'] = timeseries;
      cryptohubData[key]['cryptohub-price-history'] = JSON.stringify(timeseries);
    }

    // Bitcoin price
    const { price, lastPrice, timestamp } = priceInBitcoin(oldData[key], item, bitcoinPrice);
    if (price) {
      // item['cryptohub-price-btc'] = price;
      cryptohubData[key]['cryptohub-price-btc'] = price;
    }
    if (price !== lastPrice) {
      cryptohubData[key]['cryptohub-price-btc:last'] = lastPrice;
    }
    if (timestamp) {
      cryptohubData[key]['cryptohub-price-btc-timestamp'] = timestamp;
    }

    // Circulating percent total
    const supplyTotal       = item['cc-coinlist-TotalCoinSupply'];
    const supplyCirculating = item['cc-total-vol-full-SUPPLY'];
    cryptohubData[key]['cryptohub-circulating-percent-total'] = (supplyCirculating / supplyTotal) * 100;

  }

  return cryptohubData;

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
export default function dataOnHandleData(options = {}, data, cache, oldData = {}, appBootstrapData) {
  try {

    let newData = data;
    let cryptohubData;

    //
    // Backfill new data with old data
    //
    // NOTE:
    // We still need to do this even when we are emitting
    // a diff because the whole data should be available to be
    // used by functions like `getCryptohubFields()`
    for (let id of Object.keys(oldData)) {
      newData[id] = Object.assign({}, oldData[id], newData[id]);
      for (let field of settings.fieldLastValue) {
        if (oldData[id][field] !== newData[id][field]) {
          newData[id][`${field}:last`] = oldData[id][field];
        }
      }
    }

    // Add custom cryptohub fields
    cryptohubData = getCryptohubFields(oldData, newData);
    newData = Object.assign(newData, cryptohubData);

    perSecondSave(cryptohubData, +new Date()); // NOTE: should be async

    // Save file (the watcher will pick it up and emit it)
    const fileName = `${settings.generatedDir}/data/data.json`;
    cache.set(fileName, JSON.stringify(newData));

    // Create a list of x (settins.maxRecordsScraped) sorted symbols
    // We are doing this here as we don't the sort cryteria before this point
    let firstXSymbols;
    {
      const arr = [];
      const limit = settings.maxRecordsScraped;
      const fieldVol = 'cc-total-vol-full-TOTALVOLUME24HTO';
      const fieldSymbol = 'cc-coinlist-Symbol';
      const fieldTrading = 'cc-coinlist-IsTrading';
      let key;
      let item;
      for ([key, item] of Object.entries(newData)) {
        if (item[fieldTrading] === false) {
          delete newData[key]
        }
        else if (!item[fieldVol]) {
          // do nothing
        }
       else {
          arr.push(item);
        }
      }
      arr.sort((a, b) => b[fieldVol] - a[fieldVol]);
      firstXSymbols = arr.splice(0, limit).map(x => x[fieldSymbol]);
    }

    appBootstrapData.firstXSymbols = firstXSymbols;

  }
  catch(error) {
    const message = `dataOnHandleData(): ${error}`;
    logger.error(message);
    if (process.env.NODE_ENV === 'development') debugger;
    return {message, error: true};
  }
}
