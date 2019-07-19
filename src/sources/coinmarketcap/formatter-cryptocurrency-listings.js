// Cryptohub
const logger = require('../../logger');

import { objectGetNestedProperty as gnp }  from 'bo-utils';

/**
 *
 * COINMARKETCAP CRYPTOCURRENCY LISTINGS
 *
 * Original Data
 * -------------
 *
 * {
 *   circulating_supply: 17758112,
 *   cmc_rank: 1,
 *   date_added: "2013-04-28T00:00:00.000Z",
 *   id: 1,
 *   last_updated: "2019-06-14T09:24:28.000Z",
 *   max_supply: 21000000,
 *   name: "Bitcoin",
 *   num_market_pairs: 7589,
 *   platform: null,
 *   quote: {
 *     USD: {
 *       last_updated: "2019-06-14T09:24:28.000Z",
 *       market_cap: 146990328685.9646,
 *       percent_change_1h: -0.0364815,
 *       percent_change_7d: 4.27607,
 *       percent_change_24h: 2.0296,
 *       price: 8277.36240688,
 *       volume_24h: 19099868484.3104,
 *     }
 *   }
 *   slug: "bitcoin",
 *   symbol: "BTC",
 *   tags: ["mineable"],
 *   total_supply: 17758112
 * }
 *
 *
 * Prefix fields with "cmc-listings-"
 * ----------------------------------------------
 * cmc_rank -> cmc-listings-cmc_rank
 *
 * @param {Array} data - response from Messari api request
 * @param {String} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
export default function formatter(data, timestamp, bootstrapData, appBootstrapData, fileName, event, cache) {

  try {

    function dataIsValid(data) {
      if (data.status && data.status.error_code === 0 && Array.isArray(data.data)) {
        return true;
      }
      else return false;
    }

    if (!dataIsValid(data)) return;
    data = data.data;

    //
    // Mappings (CMC Symbol ID and CMC Id Symbol)
    //
    {
      const cmcSymbolId = {};
      const cmcIdSymbol = {};
      data.forEach(v => {
        cmcSymbolId[v.symbol] = v.id;
        cmcIdSymbol[v.id] = v.symbol;
      });

      appBootstrapData.cmcSymbolId = cmcSymbolId;
      appBootstrapData.cmcIdSymbol = cmcIdSymbol;
    }

    //
    // NOTE: just for testing. We need a static mapping unfortunately
    // Or at least a static backfill
    //
    {
      const sync = val => {
        return val.replace('-', '').replace(' ', '').toLowerCase();
      }

      const ccNameSymbol = {};
      for (const [s, val] of Object.entries(appBootstrapData.symbolIdMap)) {
        const name = sync(appBootstrapData.coinList[s].CoinName);
        ccNameSymbol[name] = appBootstrapData.coinList[s];
      }

      const cmcData = Object.values(data);
      const mapCmcIdCcId = {};
      for (const val of cmcData) {
        const cmcname = sync(val.name);
        const cmcsymbol = sync(val.symbol);
        if (ccNameSymbol[cmcname]) {
          mapCmcIdCcId[val.id] = appBootstrapData.coinList[ccNameSymbol[cmcname].Symbol].Id
        }
        else {
          //console.log('map manually ', sync(cmcname));
        }
      }
      appBootstrapData.mapCmcIdCcId = mapCmcIdCcId;
    }

    //
    //
    //
    const output = {};
    for (const val of Object.values(data)) {
      const id = appBootstrapData.mapCmcIdCcId[val.id];
      output[id] = {
        'cmc-listings-circulating_supply' : val.circulating_supply,
        'cmc-listings-cmc_rank'           : val.cmc_rank,
        'cmc-listings-date_added'         : val.date_added,
        'cmc-listings-id'                 : val.id,
        'cmc-listings-last_updated'       : val.last_updated,
        'cmc-listings-max_supply'         : val.max_supply,
        'cmc-listings-name'               : val.name,
        'cmc-listings-num_market_pairs'   : val.num_market_pairs,
        'cmc-listings-tags'               : val.tags,
        'cmc-listings-total_supply'       : val.total_supply,
        'cmc-listings-market_cap'         : gnp(val, 'quote.USD.market_cap'),
        'cmc-listings-percent_change_1h'  : gnp(val, 'quote.USD.percent_change_1h'),
        'cmc-listings-percent_change_7d'  : gnp(val, 'quote.USD.percent_change_7d'),
        'cmc-listings-percent_change_24h' : gnp(val, 'quote.USD.percent_change_24h'),
        'cmc-listings-volume_24h'         : gnp(val, 'quote.USD.volume_24h'),
        // 'cmc-listings-slug'               : val.slug,
        // 'cmc-listings-symbol'             : val.symbol,
        // 'cmc-listings-price'              : gnp(val, ''),
      }
    }

    let item;
    let prop;
    for (item of Object.values(output)) {
      for (prop of Object.keys(item)) {
        item[`${prop}-timestamp`] = timestamp;
      }
    }

    return {data: output, timestamp};

  }

  catch(error) {

    const message = `formatterCoinmarketcapSectionCryptocurrencyListings(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
