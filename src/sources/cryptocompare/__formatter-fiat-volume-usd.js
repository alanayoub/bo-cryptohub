/**
 *
 * @return {Object} socialstats
 *
 */
// Cryptohub
const logger = require('../../logger');
const settings = require('../../settings');
//
// fiatVolume
//
// BTC: {
//   USD: 10000000,
//   EUR: 233432,
// },
// LTC: {...}
//
// NOTE: Takes a long time? Maybe cache the result?
//       Also take note of all the exchanges that deal in Fiat
//
// Need to the the _id of the token
//
module.exports = function formatterCryptocompareFiatVolumeUSD(exchangePairVolumeData, USDCurrencyTable, symbolIdMap) {
  try {

    //
    //
    //
    const fiatVolume = {};
    const cryptoVolume = {};
    const currencyCodes = Object.keys(USDCurrencyTable);
    const [exchangeStatusString] = settings.cache.get(settings.keyCryptocompareExchangeStatus);
    const exchangeStatus = JSON.parse(exchangeStatusString);
    for (const [key, val] of Object.entries(exchangePairVolumeData)) {
      if (!val) {
        logger.warn(`app-analytics: No data found for ${key}`);
        continue;
      }
      // Ignore volume?
      if (exchangeStatus[val.LASTMARKET]) {
        if (exchangeStatus[val.LASTMARKET].excludeVolume.all === true) {
          logger.info(`app-analytics: ignoring exchange "${val.LASTMARKET}"`);
          continue;
        }
      }
      if (val.Response === 'Error') {
        logger.error(`app-analytics: Error getting ${key}`);
        continue;
      }
      logger.info(`app-analytics: parsing ${key} for ${val.LASTMARKET}`);
      //
      // Crypto volume
      //
      if (!(currencyCodes.includes(val.TOSYMBOL) || currencyCodes.includes(val.FROMSYMBOL))) {
        //
        // For each pair record the volume in each currency
        //
        if (!cryptoVolume[val.FROMSYMBOL]) cryptoVolume[val.FROMSYMBOL] = {};
        if (!cryptoVolume[val.TOSYMBOL])   cryptoVolume[val.TOSYMBOL]   = {};
        if (!cryptoVolume[val.FROMSYMBOL][val.TOSYMBOL]) cryptoVolume[val.FROMSYMBOL][val.TOSYMBOL] = 0;
        if (!cryptoVolume[val.TOSYMBOL][val.FROMSYMBOL]) cryptoVolume[val.TOSYMBOL][val.FROMSYMBOL] = 0;
        cryptoVolume[val.FROMSYMBOL][val.TOSYMBOL] += val.VOLUME24HOURTO;
        cryptoVolume[val.TOSYMBOL][val.FROMSYMBOL] += val.VOLUME24HOUR;
      }
      //
      // Fiat volume
      //
      if (currencyCodes.includes(val.TOSYMBOL)) {
        if (!fiatVolume[val.FROMSYMBOL]) fiatVolume[val.FROMSYMBOL] = {};
        if (!fiatVolume[val.FROMSYMBOL][val.TOSYMBOL]) fiatVolume[val.FROMSYMBOL][val.TOSYMBOL] = 0;
        fiatVolume[val.FROMSYMBOL][val.TOSYMBOL] += val.VOLUME24HOURTO;
      }
      if (currencyCodes.includes(val.FROMSYMBOL)) {
        if (!fiatVolume[val.TOSYMBOL]) fiatVolume[val.TOSYMBOL] = {};
        if (!fiatVolume[val.TOSYMBOL][val.FROMSYMBOL]) fiatVolume[val.TOSYMBOL][val.FROMSYMBOL] = 0;
        fiatVolume[val.TOSYMBOL][val.FROMSYMBOL] += val.VOLUME24HOUR;
      }
    }

    //
    // fiatVolumeUSD - all fiatVolume converted to USD
    // TODO: Also capture crypto volume in USD and get ratio
    //
    const fiatVolumeUSD = {};
    for (const [fromCurrency, volumes] of Object.entries(fiatVolume)) {
      fiatVolumeUSD[fromCurrency] = 0;
      for (const [toCurrency, volume] of Object.entries(volumes)) {
        if (USDCurrencyTable[toCurrency]) {
          const rate = USDCurrencyTable[toCurrency].USDPerUnits;
          fiatVolumeUSD[fromCurrency] += volume * rate;
          console.log(`fiatVolume ${fromCurrency} += ${volume*rate} = ${fiatVolumeUSD[fromCurrency]}`);
        }
        else {
          logger.warn(`app-analytics: Cant get ${toCurrency} from USDCurrencyTable`);
        }
      }
    }

    //
    // Convert
    //
    // BTC: 23432
    // LTC: 32423
    //
    // To
    //
    // 123: {'Fiat Volume USD': 123433, 'Fiat Exchanges': 3, 'Symbol': 'BTC', 'Crypto Volume USD': 32432}
    //
    const data = {};
    for (const [key, val] of Object.entries(fiatVolumeUSD)) {
      const id = symbolIdMap[key];
      data[id] = {
        // 'Symbol': 'BTC',
        // 'Fiat Exchanges': 3,
        'Fiat Volume USD': val
        // 'Crypto Volume USD': 32432,
      }
    }

    return data;
  }
  catch (error) {
    const message = `formatterCryptocompareFiatVolumeUSD(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
