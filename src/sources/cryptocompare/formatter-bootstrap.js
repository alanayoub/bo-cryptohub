'use strict';

import { mapSave }  from '../../db/save';

const logger     = require('../../logger');
const scrapeJSON = require('../../utils/scrape-json.js');
const settings   = require('../../settings');

/**
 *
 * COINLIST
 *
 * Original Data
 * -------------
 *
 * Algorithm            : "SHA256"
 * BuiltOn              : "N/A"
 * CoinName             : "Bitcoin"
 * FullName             : "Bitcoin (BTC)"
 * FullyPremined        : "0"
 * Id                   : "1182"
 * ImageUrl             : "/media/19633/btc.png"
 * IsTrading            : true
 * Name                 : "BTC"
 * PreMinedValue        : "N/A"
 * ProofType            : "PoW"
 * SmartContractAddress : "N/A"
 * SortOrder            : "1"
 * Sponsored            : false
 * Symbol               : "BTC"
 * TotalCoinSupply      : "21000000"
 * TotalCoinsFreeFloat  : "N/A"
 * Url                  : "/coins/btc/overview"
 *
 * Prefix fields with "cc-coinlist-"
 * ----------------------------------
 * Algorithm -> cc-coinlist-Algorithm
 *
 * @param {String?} data
 * @param {String?} timestamp
 * @return {Object}
 *
 */
export default async function formatterCryptocompareBootstrap(cache) {
  try {

    return;
    // // Get coinList
    // let coinList;
    // try {
    //   const uriCryptocompareList = 'https://min-api.cryptocompare.com/data/all/coinlist';
    //   const keyCryptocompareList = `${settings.scrapeDir}/cryptocompare-coinlist/data.json`;
    //   coinList = await scrapeJSON(uriCryptocompareList, keyCryptocompareList, 0, cache);
    //   coinList = typeof coinList === 'string' ? JSON.parse(coinList).Data : coinList.Data;
    // }
    // catch (error) {
    //   logger.error(`formatter-cryptocompare-bootstrap: [Error scraping coinList] | ${error}`);
    // }

    // // Create maps
    // const idSymbolMap = {};
    // const symbolIdMap = {};
    // for (const [symbol, data] of Object.entries(coinList)) {
    //   idSymbolMap[data.Id] = symbol;
    //   symbolIdMap[symbol] = data.Id;
    // };

    // mapSave('projectMapCoinList', JSON.stringify(coinList));
    // // mapSave('projectMapCoinList', JSON.stringify(coinList));
    // // mapSave('projectMapCoinList', JSON.stringify(coinList));
    // return { idSymbolMap, symbolIdMap, coinList };

  }
  catch(error) {
    const message = `formatterCryptocompareBootstrap(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
