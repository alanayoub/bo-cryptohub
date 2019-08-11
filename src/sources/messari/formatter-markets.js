'use strict';

// Cryptohub
const logger = require('../../logger');

import { objectGetNestedProperty as gnp } from 'bo-utils';

import { perSecondSave }                  from '../../db';

/**
 *
 * METRICS
 *
 * Original Data
 * -------------
 *
 * {
 *   "status": {
 *     "elapsed": "0",
 *     "timestamp": "2019-04-11T10:19:47.634532695Z"
 *   },
 *   "data": [
 *     {
 *       "id": "0019b21e-cdf4-44ef-aee6-11b4b3376e08",
 *       "exchange": "bitstamp",
 *       "exchange_id": "3663f00d-91fc-48a2-98a2-8af76325927a",
 *       "base": "BTC",
 *       "base_asset_id": "1e31218a-e44e-4285-820c-8282ee222035",
 *       "quote": "USD",
 *       "quote_asset_id": "60dcd17b-00f3-49f8-907c-f390c2521c59",
 *       "pair": "BTC-USD",
 *       "price_usd": 12292.23,
 *       "volume_last_24_hours": 191909552.5876635,
 *       "deviation_from_vwap_percent": 0.029333589373393965,
 *       "last_trade_at": "2019-08-06T10:08:14Z",
 *       "excluded_from_price": false
 *     }
 *   ]
 * }
 *
 * Prefix fields with "m-metrics-"
 * ----------------------------------------------
 * misc_data.sectors -> m-metrics-sectors
 *
 * NOTE:
 *   We need a master field list and we just map stuff from there.
 *   Have a think about it yo
 *
 * @param {Array} data - response from Messari api request
 * @param {String} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
export default async function formatterMessariMarkets(data, timestamp, bootstrapData, appBootstrapData, fileName, event, cache) {

  try {

    function dataIsValid(data) {
      if (Array.isArray(data.data)) return true;
      else return false;
    }

    if (!dataIsValid(data)) return;
    data = data.data;

    let item;
    let prop;
    let result = {};
    const prefix = 'm-markets-';

    for (item of data) {

      const symbol = item.base.toUpperCase();
      const id = appBootstrapData.symbolIdMap[symbol]; // TODO: need proper mapping for ids

      if (!id) continue;

      result[id] = {
        [`${prefix}id`]                              : item.id,                          //  "0019b21e-cdf4-44ef-aee6-11b4b3376e08",
        [`${prefix}exchange`]                        : item.exchange,                    // "bitstamp",
        [`${prefix}exchange_id`]                     : item.exchange_id,                 //"3663f00d-91fc-48a2-98a2-8af76325927a",
        [`${prefix}base`]                            : item.base,                        // "BTC",
        [`${prefix}base_asset_id`]                   : item.base_asset_id,               // "1e31218a-e44e-4285-820c-8282ee222035",
        [`${prefix}quote`]                           : item.quote,                       // "USD",
        [`${prefix}quote_asset_id`]                  : item.quote_asset_id,              // "60dcd17b-00f3-49f8-907c-f390c2521c59",
        [`${prefix}pair`]                            : item.pair,                        // "BTC-USD",
        [`${prefix}price_usd`]                       : item.price_usd,                   // 12292.23,
        [`${prefix}volume_last_24_hours`]            : item.volume_last_24_hours,        // 191909552.5876635,
        [`${prefix}deviation_from_vwap_percent`]     : item.deviation_from_vwap_percent, // 0.029333589373393965,
        [`${prefix}last_trade_at`]                   : item.last_trade_at,               // "2019-08-06T10:08:14Z",
        [`${prefix}excluded_from_price`]             : item.excluded_from_price,         // false
      };

      for (prop of Object.keys(result[id])) {
        result[id][`${prop}-timestamp`] = timestamp;
      }

    }

    await perSecondSave(result, timestamp);

    return {data: result, timestamp};

  }

  catch(error) {

    const message = `formatterMessariMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}