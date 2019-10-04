import { objectGetNestedProperty as gnp } from 'bo-utils';

import logger from '../../logger';
import { getBtc, getRows } from '../../db/query';
import { perSecondSave } from '../../db/save';

const config = {
  cacheFor: 0,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: 1000 * 10 * 60 * 24
};

/**
 *
 * Timeseries Rescale
 *
 * @param {Object} fields - price, volume and timeseries field names
 * @param {Object} item - reference to the current data object
 * @param {Number} limit - limit timeseries length
 * @param {Number} period - period after which we should create a new timeseries item
 * @returns {String} - Stringified Array of updated timeseries object
 *
 */
function getNewTimeseriesData(fields, item, limit = 7, period = 1000 * 60 * 60 * 24) {

  const price     = gnp(item, `${fields.price}.value`);
  const volume    = gnp(item, `${fields.volume}.value`);
  const timestamp = gnp(item, `${fields.price}.timestamp`);
  let timeseries  = gnp(item, `${fields.timeseries}.value`) || [];

  if (typeof timeseries === 'string') timeseries = JSON.parse(timeseries);

  if (timeseries[0] && timeseries[0].timestamp === null) {
    timeseries.splice(0, 1);
  }

  if (price && volume && timestamp) {
    const lastItem = timeseries[timeseries.length - 1];
    if (!lastItem || timestamp - lastItem.timestamp > period) {
      timeseries.push({
        price,
        volume,
        timestamp
      });
      if (timeseries.length > limit) {
        timeseries.shift();
      }
    }
  }

  return JSON.stringify(timeseries);

}

const custom = {
  event: 'data',
  name: 'binaryoverdose',
  interval: 1000 * 20,
  getJobs(queue) {
    queue.push({
      local: true
    });
  },
  async formatter() {

    //
    // Steps
    //
    //
    // 1. Get BTC price in USD
    const [ btc ] = await getBtc();
    if (!btc) {
      logger.warn('sources/binaryoverdose/index.js: Couldnt get \'btc\', bailing out');
      return;
    }
    const btcPrice = btc.realtime[1][1];

    //
    // 2.1. Get all proxy fields
    //
    const proxyFields = [
      'cc-total-vol-full-Id',
      'cc-total-vol-full-TOTALVOLUME24HTO',
      'cmc-listings-quote_USD_volume_24h',
      'm-assets-metrics-market_data_price_usd',
      'm-assets-metrics-market_data_price_btc',
      'm-assets-metrics-market_data_volume_last_24_hours',
      'cc-total-vol-full-FullName',
      'cc-total-vol-full-PRICE',
      'cmc-listings-name',
      'cc-coinlist-Symbol',
      'cmc-listings-symbol',
      'm-assets-symbol',
      'cmc-listings-quote_USD_price',
      'm-assets-metrics-market_data_price_usd',
      'm-assets-name'
    ];

    //
    // 2.2. Get all fields to be created
    //
    const newFields = [
      'cc-total-vol-full-PRICE-cryptohub-BTC',
      'cryptohub-cc-price-history-USD',
      'cryptohub-cc-price-history-BTC',
      'cmc-listings-quote_USD_price_BTC',
      'cryptohub-cmc-price-history-USD',
      'cryptohub-cmc-price-history-BTC',
      'cryptohub-m-price-history-USD',
      'cryptohub-m-price-history-BTC',
      'cryptohub-cc-circulating-percent-total',
      'cryptohub-name',
      'cryptohub-symbol',
      'cryptohub-price-usd'
    ];
    const data = await getRows(null, false, false, [...proxyFields, ...newFields], false);
    if (!data) {
      logger.warn('sources/binaryoverdose/index.js: Couldnt get rows, bailing out');
      return;
    };

    //
    // 3. Loop through results and add / update custom records
    //
    const cryptohubData = {}
    let ref = null;
    let key;
    let item;
    let fields;
    for ([key, item] of Object.entries(data)) {

      ref = {
        'cc-total-vol-full-Id': gnp(item, 'cc-total-vol-full-Id.value') // Required by getRows
      };

      //
      // Create:
      //   cryptohub-name
      //   cryptohub-symbol
      //   cryptohub-price-usd
      //
      {
        const ccName = gnp(item, 'cc-total-vol-full-FullName.value');
        const cmcName = gnp(item, 'cmc-listings-name.value');
        const mName = gnp(item, 'm-assets-name.value');
        if (ccName || cmcName || mName) {
          ref['cryptohub-name'] = ccName || cmcName || mName;
        }
        const ccSymbol = gnp(item, 'cc-coinlist-Symbol.value');
        const cmcSymbol = gnp(item, 'cmc-listings-symbol.value');
        const mSymbol = gnp(item, 'm-assets-symbol.value');
        if (ccSymbol || cmcSymbol || mSymbol) {
          ref['cryptohub-symbol'] = ccSymbol || cmcSymbol || mSymbol;
        }
        const ccPrice = gnp(item, 'cc-total-vol-full-PRICE.value');
        const cmcPrice = gnp(item, 'cmc-listings-quote_USD_price.value');
        const mPrice = gnp(item, 'm-assets-metrics-market_data_price_usd.value');
        if (ccPrice || cmcPrice || mPrice) {
          ref['cryptohub-price-usd'] = ccPrice || cmcPrice || mPrice;
        }
      }

      //
      // Create:
      //   cc-total-vol-full-PRICE-cryptohub-BTC
      //   cryptohub-cc-price-history-USD
      //   cryptohub-cc-price-history-BTC
      //
      if (item['cc-total-vol-full-PRICE']) {

        // BTC copy of cc PRICE
        ref['cc-total-vol-full-PRICE-cryptohub-BTC'] = Math.ceil(1 / (btcPrice / gnp(item, 'cc-total-vol-full-PRICE.value')) * 100000000); // sats
        // ref['cc-total-vol-full-PRICE-cryptohub-BTC'] = 1 / (btcPrice / item['cc-total-vol-full-PRICE']);

        if (item['cc-total-vol-full-TOTALVOLUME24HTO']) {

          // cc USD 7 day trend
          fields = {
            price: 'cc-total-vol-full-PRICE',
            volume: 'cc-total-vol-full-TOTALVOLUME24HTO',
            timeseries: 'cryptohub-cc-price-history-USD'
          }
          ref['cryptohub-cc-price-history-USD'] = getNewTimeseriesData(fields, item);

          // cc BTC 7 day trend
          fields = {
            price: 'cc-total-vol-full-PRICE-cryptohub-BTC',
            volume: 'cc-total-vol-full-TOTALVOLUME24HTO',
            timeseries: 'cryptohub-cc-price-history-BTC'
          }
          ref['cryptohub-cc-price-history-BTC'] = getNewTimeseriesData(fields, item);
        }

      }

      //
      // Create:
      //   cmc-listings-quote_USD_price_BTC
      //   cryptohub-cmc-price-history-USD
      //   cryptohub-cmc-price-history-BTC
      //
      if (item['cmc-listings-quote_USD_price']) {

        // BTC copy of cmc price

        ref['cmc-listings-quote_USD_price_BTC'] = Math.ceil(1 / (btcPrice / gnp(item, 'cmc-listings-quote_USD_price.value')) * 100000000); // sats
        // ref['cmc-listings-quote_USD_price_BTC'] = 1 / (btcPrice / item['cmc-listings-quote_USD_price']);

        if (item['cmc-listings-quote_USD_volume_24h']) {

          // cmc USD 7 day trend
          fields = {
            price: 'cmc-listings-quote_USD_price',
            volume: 'cmc-listings-quote_USD_volume_24h',
            timeseries: 'cryptohub-cmc-price-history-USD'
          }
          ref['cryptohub-cmc-price-history-USD'] = getNewTimeseriesData(fields, item);

          // cmc BTC 7 day trend
          fields = {
            price: 'cmc-listings-quote_USD_price_BTC',
            volume: 'cmc-listings-quote_USD_volume_24h',
            timeseries: 'cryptohub-cmc-price-history-BTC'
          }
          ref['cryptohub-cmc-price-history-BTC'] = getNewTimeseriesData(fields, item);

        }

      }

      //
      // Create:
      //   cryptohub-m-price-history-USD
      //   cryptohub-m-price-history-BTC
      //
      if (item['m-assets-metrics-market_data_volume_last_24_hours']) {

        if (item['m-assets-metrics-market_data_price_usd']) {

          // cmc USD 7 day trend
          fields = {
            price: 'm-assets-metrics-market_data_price_usd',
            volume: 'm-assets-metrics-market_data_volume_last_24_hours',
            timeseries: 'cryptohub-m-price-history-USD'
          }
          ref['cryptohub-m-price-history-USD'] = getNewTimeseriesData(fields, item);

        }

        if (item['m-assets-metrics-market_data_price_btc']) {

          // cmc BTC 7 day trend
          fields = {
            price: 'm-assets-metrics-market_data_price_btc',
            volume: 'm-assets-metrics-market_data_volume_last_24_hours',
            timeseries: 'cryptohub-m-price-history-BTC'
          }
          ref['cryptohub-m-price-history-BTC'] = getNewTimeseriesData(fields, item);

        }

      }

      //
      // Create:
      //   cryptohub-cc-circulating-percent-total
      //
      const supplyTotal       = gnp(item, 'cc-coinlist-TotalCoinSupply.value');
      const supplyCirculating = gnp(item, 'cc-total-vol-full-SUPPLY.value');
      if (supplyTotal && supplyCirculating) {
        ref['cryptohub-cc-circulating-percent-total'] = supplyCirculating / supplyTotal * 100;
      }

      cryptohubData[key] = ref;

    }

    perSecondSave(cryptohubData, +new Date());

    return cryptohubData;

  }
};

export default {
  config,
  custom
}
