// CryptoHub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');
const {
  analyticsMergeDataByKey,
  analyticsUSDCurrencyTable,
  formatterCryptocompareAllCoins,
  formatterCryptocompareSnapshot,
  formatterCryptocompareSocialstats,
  formatterCryptocompareFiatVolumeUSD,
  itterateCryptocompareExchangePairs,
} = require.main.require('./utils/');

/**
 *
 * Parse cryptocompare data
 * @return {Object}
 *
 */
module.exports = async function cryptocompare() {
  try {

    //
    // Helper data
    //
    const idSymbolMap = {};
    const symbolIdMap = {};
    const exchangePairVolumeData = {};
    let cryptocompareList;
    {
      const [file] = settings.cache.get(settings.keyCryptocompareList);
      cryptocompareList = JSON.parse(file).Data;
      for (const [symbol, data] of Object.entries(cryptocompareList)) {
        idSymbolMap[data.Id] = symbol;
        symbolIdMap[symbol] = data.Id;
      };
      for await (const obj of itterateCryptocompareExchangePairs()) {
        if (obj === false) break; // finished
        const [exchangePairString] = settings.cache.get(obj.key);
        const exchangePair = JSON.parse(exchangePairString);
        exchangePairVolumeData[`${obj.from}${obj.to}`] = exchangePair.RAW;
      }
    }

    //
    // Fields
    //
    let social = {};
    let snapshot = {};
    let allCoins = {};
    let fiatVolumeUSD;

    for (const id of Object.keys(idSymbolMap)) {
      let [fileSocial]   = settings.cache.get(settings.tagKeyCryptocompareSocialstats`${id}`);
      let [fileSnapshot] = settings.cache.get(settings.tagKeyCryptocompareSnapshot`${id}`);
      social[id]   = JSON.parse(fileSocial);
      snapshot[id] = JSON.parse(fileSnapshot);
      allCoins[id] = cryptocompareList[idSymbolMap[id]];
    }

    social        = formatterCryptocompareSocialstats(social);
    snapshot      = formatterCryptocompareSnapshot(snapshot);
    allCoins      = formatterCryptocompareAllCoins(allCoins);
    fiatVolumeUSD = formatterCryptocompareFiatVolumeUSD(exchangePairVolumeData, analyticsUSDCurrencyTable(), symbolIdMap);

    const result = analyticsMergeDataByKey([allCoins, social, snapshot, fiatVolumeUSD]);
    return result;
  }
  catch(error) {
    debugger;
    logger.error(`cryptocompare: ${error}`);
    return false;
  }
}




