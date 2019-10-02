// Cryptohub
import logger from '../../logger';
import { perSecondSave } from '../../db/save';
import { getBidMap } from '../../db/query';
import { objectGetNestedProperty as gnp } from 'bo-utils';

function dataIsValid(data) {
  if (data.status && data.status.error_code === 0 && Array.isArray(data.data)) {
    return true;
  }
  else return false;
}

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
 *   platform: {
 *     id: 1027,
 *     name: "Ethereum",
 *     symbol: "ETH",
 *     slug: "ethereum",
 *     token_address: "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3"
 *   },
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
 * Prefix fields with "cmc-listings-"
 * ----------------------------------------------
 * cmc_rank -> cmc-listings-cmc_rank
 *
 * @param {Array} data - response from Messari api request
 * @param {String} timestamp - time the data was created
 * @returns {Object} - formatted data and timestamp
 *
 */
export default async function formatter(data, timestamp) {

  try {

    if (!dataIsValid(data)) return;
    data = data.data;

    ////
    //// Mappings (CMC Symbol ID and CMC Id Symbol)
    ////
    //{
    //  const cmcSymbolId = {};
    //  const cmcIdSymbol = {};
    //  data.forEach(v => {
    //    cmcSymbolId[v.symbol] = v.id;
    //    cmcIdSymbol[v.id] = v.symbol;
    //  });
    //  mapSave('cmcMapSymbolId', JSON.stringify(cmcSymbolId));
    //  mapSave('cmcMapIdSymbol', JSON.stringify(cmcIdSymbol));
    //}

    ////
    //// NOTE: just for testing. We need a static mapping unfortunately
    //// Or at least a static backfill
    ////
    //const mapCmcIdCcId = {};
    //{

    //  const sync = val => {
    //    return String(val).replace(/-/g, '').replace(/\s/g, '').toLowerCase();
    //  }

    //  const maps = await getMaps([
    //    'projectMapSymbolId',
    //    'projectMapNameId'
    //  ]);

    //  let ccSI = {};
    //  let ccNI = {};
    //  for (const map of maps) {
    //    if (map._id === 'projectMapSymbolId') {
    //      for (const [k, v] of Object.entries(map.map)) {
    //        ccSI[sync(k)] = sync(v);
    //      };
    //    }
    //    else if (map._id === 'projectMapNameId') {
    //      for (const [k, v] of Object.entries(map.map)) {
    //        ccNI[sync(k)] = sync(v);
    //      };
    //    }
    //  }

    //  //
    //  // Make lowercase versions so we can match better
    //  //
    //  let cmcSI = {};
    //  let cmcNI = {};
    //  let cmcNS = {};
    //  {
    //    for (const [key, val] of Object.entries(data)) {
    //      cmcSI[sync(val.symbol)] = sync(val.id);
    //      cmcNI[sync(val.name)] = sync(val.id);
    //      cmcNS[sync(val.name)] = sync(val.symbol);
    //    }
    //  }

    //  for (const [cmcName, cmcId] of Object.entries(cmcNI)) {
    //    if (ccNI[cmcName]) {
    //      mapCmcIdCcId[cmcId] = ccNI[cmcName]; // match
    //    }
    //    else if (ccSI[cmcNS[cmcName]]) {
    //      mapCmcIdCcId[cmcId] = ccSI[cmcNS[cmcName]]; // match
    //    }
    //  }

    //  mapSave('cmcCcMapIdSymbol', JSON.stringify(mapCmcIdCcId));
    //}

    const bidMap = await getBidMap('cmc', data);

    const result = {};
    const prefix = 'cmc-listings-';
    for (const val of Object.values(data)) {
      const id = bidMap[String(val.id).toLowerCase()];
      if (id === undefined) {
        console.log(`cant find id for ${val.name}: ${val.symbol}`);
        continue;
      };
      result[id] = {
        [`${prefix}circulating_supply`]: val.circulating_supply,
        [`${prefix}cmc_rank`]: val.cmc_rank,
        [`${prefix}date_added`]: val.date_added,
        [`${prefix}id`]: val.id,
        [`${prefix}last_updated`]: val.last_updated,
        [`${prefix}max_supply`]: val.max_supply,
        [`${prefix}name`]: val.name,
        [`${prefix}num_market_pairs`]: val.num_market_pairs,
        [`${prefix}tags`]: val.tags,
        [`${prefix}total_supply`]: val.total_supply,
        [`${prefix}quote_USD_market_cap`]: gnp(val, 'quote.USD.market_cap'),
        [`${prefix}quote_USD_percent_change_1h`]: gnp(val, 'quote.USD.percent_change_1h'),
        [`${prefix}quote_USD_percent_change_7d`]: gnp(val, 'quote.USD.percent_change_7d'),
        [`${prefix}quote_USD_percent_change_24h`]: gnp(val, 'quote.USD.percent_change_24h'),
        [`${prefix}quote_USD_volume_24h`]: gnp(val, 'quote.USD.volume_24h'),
        [`${prefix}quote_USD_price`]: gnp(val, 'quote.USD.price'),
        [`${prefix}slug`]: val.slug,
        [`${prefix}symbol`]: val.symbol
      }
    }

    await perSecondSave(result, timestamp);

    return {data: result, timestamp};

  }

  catch (error) {

    const message = `formatterCoinmarketcapSectionCryptocurrencyListings(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
