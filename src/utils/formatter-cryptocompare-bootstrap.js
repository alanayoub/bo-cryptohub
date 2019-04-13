// Cryptohub
const logger     = require('../logger');
const settings   = require('../settings');
const scrapeJSON = require('./scrape-json.js');

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
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
module.exports = async function formatterCryptocompareBootstrap(cache) {
  try {


    // Get coinList
    let coinList;
    try {
      coinList = await scrapeJSON(settings.uriCryptocompareList, settings.keyCryptocompareList, 0, cache);
      coinList = typeof coinList === 'string' ? JSON.parse(coinList).Data : coinList.Data;
    }
    catch (error) {
      logger.error(`formatter-cryptocompare-bootstrap: [Error scraping coinList] | ${error}`);
    }

    // // Get old data
    // let oldData;
    // try {
    //   const path = `${settings.dbDir}/data/data.json`;
    //   oldData = JSON.parse(cache.get(path)[0]);
    //   debugger;
    // }
    // catch(error) {
    //   logger.error(`formatter-cryptocompare-bootstrap: [Error getting file] ${path} | ${error}`);
    // }

    // Create maps
    const idSymbolMap = {};
    const symbolIdMap = {};
    for (const [symbol, data] of Object.entries(coinList)) {
      idSymbolMap[data.Id] = symbol;
      symbolIdMap[symbol] = data.Id;
    };

    return { idSymbolMap, symbolIdMap, coinList };

  }
  catch(error) {
    const message = `formatterCryptocompareBootstrap(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
