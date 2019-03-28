// Cryptohub
const logger     = require.main.require('./logger');
const settings   = require.main.require('./settings');
const scrapeJSON = require.main.require('./utils/scrape-json.js');

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

    const coinList = await scrapeJSON(settings.uriCryptocompareList, settings.keyCryptocompareList, 0, cache);

    const idSymbolMap = {};
    const symbolIdMap = {};
    let cryptocompareList;
    {
      if (!coinList) {
        throw new Error('cryptocompare(): No coinList available. Probably need to run scrape');
      };
      cryptocompareList = typeof coinList === 'string' ? JSON.parse(coinList).Data : coinList.Data;
      for (const [symbol, data] of Object.entries(cryptocompareList)) {
        idSymbolMap[data.Id] = symbol;
        symbolIdMap[symbol] = data.Id;
      };
    }

    return { idSymbolMap, symbolIdMap, coinList };

  }
  catch(error) {
    const message = `formatterCryptocompareBootstrap(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
