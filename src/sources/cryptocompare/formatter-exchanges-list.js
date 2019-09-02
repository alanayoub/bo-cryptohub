// Binary Overdose
import { objectGetNestedProperty as getNestedProp } from 'bo-utils';

// Cryptohub
import logger   from '../../logger';

import { perSecondSave, exchangeSave }          from '../../db/save';
import { getMaps, getExchanges, getCurrencies } from '../../db/query';

/**
 *
 * addSymbol
 *
 */
function addSymbol(symbols, symbol) {
  if (!symbols[symbol]) {
    symbols[symbol] = {
      pairs: new Set(),
      exchangeListDex: new Set(),
      exchangeListFiatOnly: new Set(),
      exchangeListCryptoOnly: new Set(),
      exchangeListAcceptsBoth: new Set(),
      fiatCurrencies: new Set(),
      exchangesRank: 0,
      numberOfExchanges: 0,
      numberOfDex: 0,
      numberOfPairs: 0,
      numberOfFiatPairs: 0,
      numberOfFiatCurrencies: 0,
    }
  }
}

/**
 *
 * addExchange
 *
 */
function addExchange(exchanges, name, id) {
  if (!name || !id)  return;
  exchanges[id] = {
    id,
    name,
    pairs: new Set(),
    cryptoCurrencies: new Set(),
    fiatCurrencies: new Set(),
    points: 0,
    numberOfPairs: 0,
    numberOfFiatPairs: 0,
    numberOfCryptoPairs: 0,
    numberOfCurrencies: 0,
    numberOfCryptoCurrencies: 0,
    numberOfFiatCurrencies: 0,
  };
}

/**
 *
 * addExchangeToSymbol
 *
 */
function addExchangeToSymbol(symbols, symbol, id, type) {
  if (!symbol || !id || !type) return;
  if (type === 'fiat')               symbols[symbol].exchangeListFiatOnly.add(id);
  else if (type === 'Decentralized') symbols[symbol].exchangeListDex.add(id);
  else if (type === 'crypto')        symbols[symbol].exchangeListCryptoOnly.add(id);
  else if (type === 'both')          symbols[symbol].exchangeListAcceptsBoth.add(id);
}

/**
 *
 * addPairsToSymbol
 *
 */
function addPairsToSymbol(symbols, symbol, pair) {
  if (symbols[symbol]) symbols[symbol].pairs.add(pair);
  else {
    //logger.info(`addPairsToSymbol(): can't add pair ${pair} to symbol ${symbol}`);
  }
}

/**
 *
 * addPairsToExchange
 *
 */
function addPairsToExchange(exchanges, id, pair) {
  if (exchanges[id]) exchanges[id].pairs.add(pair);
  else {
    // logger.info(`addPairsToExchange(): can't add pair ${pair} to exchange id ${id}`);
  }
}

// TODO: val?
// function addCryptoVolume(currencyCodes, symbol1, symbol2) {
//   if (!(currencyCodes.includes(symbol2) || currencyCodes.includes(symbol1))) {
//     // For each pair record the volume in each currency
//     if (!cryptoVolume[symbol1])          cryptoVolume[symbol1]          = {};
//     if (!cryptoVolume[symbol2])          cryptoVolume[symbol2]          = {};
//     if (!cryptoVolume[symbol1][symbol2]) cryptoVolume[symbol1][symbol2] = 0;
//     if (!cryptoVolume[symbol2][symbol1]) cryptoVolume[symbol2][symbol1] = 0;
//     cryptoVolume[symbol1][symbol2] += val.VOLUME24HOURTO;
//     cryptoVolume[symbol2][symbol1] += val.VOLUME24HOUR;
//   }
// }

// TODO: val?
// function addFiatVolume(currencyCodes, symbol1, symbol2) {
//   if (currencyCodes.includes(symbol2)) {
//     if (!fiatVolume[symbol1])          fiatVolume[symbol1]          = {};
//     if (!fiatVolume[symbol1][symbol2]) fiatVolume[symbol1][symbol2] = 0;
//     fiatVolume[symbol1][symbol2]                                   += val.VOLUME24HOURTO;
//   }
//   if (currencyCodes.includes(symbol1)) {
//     if (!fiatVolume[symbol2])          fiatVolume[symbol2]          = {};
//     if (!fiatVolume[symbol2][symbol1]) fiatVolume[symbol2][symbol1] = 0;
//     fiatVolume[symbol2][symbol1]                                   += val.VOLUME24HOUR;
//   }
// }

/**
 *
 * EXCHANGES
 *
 * Format and save exchange data to appBootstrapData and return
 * exchange data for symbols to be merged with the main dataset
 *
 * Original exchanges data is in the below format:
 *
 * ```
 *   Data: {
 *     Kraken: {
 *       pairs: {
 *         etc: [btc, eth],
 *         powr: [btc, eth]
 *       }
 *     }
 *   }
 * ```
 *
 * @param {Object} response - response object
 * @param {String} timestamp - time data was received
 * @return {Object}
 *
 */
export default async function formatterExchangesList(response, timestamp) {
  try {

    const emptyReturn = {data: {}, timestamp};

    const maps = await getMaps(['exchangeMapNameId']);
    const mapNameId = maps[0].map;
    const dbExchanges = await getExchanges();
    const dbCurrencies = await getCurrencies();
    const [ dbSymbolId ] = await getMaps(['projectMapSymbolId']);

    if (!mapNameId || (!response && !response.Data) || response.Response !== 'Success') {
      return emptyReturn;
    }

    //
    // STEP 1: Extract data into the below 2 object structures
    //
    // symbols: {
    //   btc: {
    //     exchangesList: [1234, 4322],
    //   }
    // }
    //
    // exchanges: {
    //   1234: {
    //     pairs: {btc: [eth, ltc]},
    //   }
    // }
    //

    const symbols = {};
    const exchanges = {};
    // const fiatVolume = {};
    // const cryptoVolume = {};

    let data;
    let list;
    let pair;
    let symbol1;
    let symbol2;
    let exchangeId;
    let exchangeName;
    let centralizationType;
    const exclude0xSymbols = true;

    for ([exchangeName, data] of Object.entries(response.Data)) {
      exchangeId = mapNameId[exchangeName];
      centralizationType = getNestedProp(dbExchanges, `${exchangeId}.cc-CentralizationType`);
      if (!data.isActive) continue;
      if (!exchanges[exchangeId]) addExchange(exchanges, exchangeName, exchangeId);
      data = data.pairs;

      for ([symbol1, list] of Object.entries(data)) {
        if (symbol1.startsWith('0x') && exclude0xSymbols) continue;
        addSymbol(symbols, symbol1);
        if (centralizationType && centralizationType === 'Decentralized') {
          addExchangeToSymbol(symbols, symbol1, exchangeId, centralizationType);
        }
        for (symbol2 of Object.values(list)) {
          if (symbol2.startsWith('0x') && exclude0xSymbols) continue;
          pair = `${symbol1},${symbol2}`;
          addSymbol(symbols, symbol2);
          if (centralizationType && centralizationType === 'Decentralized') {
            addExchangeToSymbol(symbols, symbol1, exchangeId, centralizationType);
          }
          addPairsToExchange(exchanges, exchangeId, pair);
          addPairsToSymbol(symbols, symbol1, pair);
          addPairsToSymbol(symbols, symbol2, pair);
        }

      }

    }

    //
    // STEP 2: With the data collected we can now annotate it
    //         with additional metrics as below
    //
    // symbols: {
    //   btc: {
    //     exchangesList: [1234, 4322],
    //     pairs: ['eth,ltc'],
    //     fiatCurrencies: [usd, eur],
    //     exchagnesRank: 87,
    //     numberOfFiatCurrencies: 2,
    //     numberOfExchanges: 33,
    //     numberOfPairs: 123,
    //     numberOfFiatPairs: 31
    //   }
    // }
    // exchanges: {
    // 1234: {
    //     pairs: ['eth,ltc'],
    //     points: 84,
    //     fiatCurrencies: [usd, eur],
    //     cryptoCurrencies: [btc, ltc],
    //     numberOfFiatCurrencies: 2,
    //     numberOfSymbold: 34,
    //     numberOfPairs: 32,
    //   }
    // }
    //

    let obj;
    const currencyCodes = Object.keys(dbCurrencies) || [];

    // Symbols
    for (obj of Object.values(symbols)) {
      obj.numberOfPairs = obj.pairs.size;
      for (pair of obj.pairs.values()) {
        [symbol1, symbol2] = pair.split(',');

        // add to fiatCurrencies or cryptoCurrencies
        if (currencyCodes.includes(symbol1)) obj.fiatCurrencies.add(symbol1);
        if (currencyCodes.includes(symbol2)) obj.fiatCurrencies.add(symbol2);

        if (currencyCodes.includes(symbol1) || currencyCodes.includes(symbol2)) {
          obj.numberOfFiatPairs++;
        }
      }
      obj.numberOfFiatCurrencies = obj.fiatCurrencies.size;
      // exchangesRank
    }

    // Exchanges
    for (obj of Object.values(exchanges)) {

      for (pair of obj.pairs.values()) {

        [symbol1, symbol2] = pair.split(',');

        if (currencyCodes.includes(symbol1) || currencyCodes.includes(symbol2)) {
          obj.numberOfFiatPairs++;
        }

        // add to fiatCurrencies or cryptoCurrencies
        if (currencyCodes.includes(symbol1)) obj.fiatCurrencies.add(symbol1);
        else obj.cryptoCurrencies.add(symbol1);

        if (currencyCodes.includes(symbol2)) obj.fiatCurrencies.add(symbol2);
        else obj.cryptoCurrencies.add(symbol2);

        //
        // Need per exchange volume to do this. Looks like too many requests
        // with the current API setup
        //
        // addCryptoVolume(currencyCodes, symbol1, symbol2);
        // addFiatVolume(currencyCodes, symbol1, symbol2);

      }
      obj.numberOfFiatCurrencies = obj.fiatCurrencies.size;
      obj.numberOfCryptoCurrencies = obj.cryptoCurrencies.size;
      obj.numberOfCurrencies = obj.numberOfFiatCurrencies + obj.numberOfCryptoCurrencies;

      obj.numberOfPairs = obj.pairs.size;
      obj.numberOfCryptoPairs = obj.numberOfPairs - obj.numberOfFiatPairs;

    }

    // Exchanges part 2
    // Now that we have calculated which exchanges have fiat / crypto pairs add this data
    let hasFiat;
    let hasCrypto;
    for ([exchangeId, obj] of Object.entries(exchanges)) {

      for (pair of obj.pairs.values()) {

        [symbol1, symbol2] = pair.split(',');

        hasFiat = hasCrypto = false;
        if (obj.numberOfFiatCurrencies) hasFiat = true;
        if (obj.numberOfCryptoCurrencies) hasCrypto = true;

        if (hasFiat && hasCrypto) addExchangeToSymbol(symbols, symbol1, exchangeId, 'both');
        else if (hasCrypto)       addExchangeToSymbol(symbols, symbol1, exchangeId, 'crypto');
        else if (hasFiat)         addExchangeToSymbol(symbols, symbol1, exchangeId, 'fiat');

      }

    }

    // Symbols part 2
    for (obj of Object.values(symbols)) {
      obj.numberOfExchanges = obj.exchangeListFiatOnly.size + obj.exchangeListCryptoOnly.size + obj.exchangeListAcceptsBoth.size;
      obj.numberOfDex = obj.exchangeListDex.size;
    }

    //
    // Step 3: Save exchange data to core dataset
    //
    // data: {
    //   1182: {
    //     'cryptohub-exchangesListFiatOnly': [],
    //     'cryptohub-exchangesListCryptoOnly': ['Binance'],
    //     'cryptohub-exchangesListAcceptsBoth': ['Kraken'],
    //     'cryptohub-numberOfFiatCurrencies': 32,
    //     'cryptohub-numberOfExchanges': 23,
    //     'cryptohub-numberOfPairs': 4,
    //     'cryptohub-numberOfFiatPairs': 3,
    //   }
    // }
    //
    async function getData() {

      let result = {};

      for (const [symbol, id] of Object.entries(dbSymbolId.map)) {
        if (symbols[symbol]) {
          result[id] = {

            // 'cryptohub-pairs': symbols[symbol].pairs,
            // 'cryptohub-fiatCurrencies': symbols[symbol].fiatCurrencies,
            // 'cryptohub-exchagnesRank': symbols[symbol].exchagnesRank,

            'cryptohub-exchangesListDex'        : Array.from(symbols[symbol].exchangeListDex),
            'cryptohub-exchangesListFiatOnly'   : Array.from(symbols[symbol].exchangeListFiatOnly),
            'cryptohub-exchangesListCryptoOnly' : Array.from(symbols[symbol].exchangeListCryptoOnly),
            'cryptohub-exchangesListAcceptsBoth': Array.from(symbols[symbol].exchangeListAcceptsBoth),

            'cryptohub-numberOfFiatCurrencies'  : symbols[symbol].numberOfFiatCurrencies,
            'cryptohub-numberOfExchanges'       : symbols[symbol].numberOfExchanges,
            'cryptohub-numberOfPairs'           : symbols[symbol].numberOfPairs,
            'cryptohub-numberOfFiatPairs'       : symbols[symbol].numberOfFiatPairs,
            'cryptohub-numberOfDex'             : symbols[symbol].numberOfDex,

          }
        }
      }

      return result;

    }

    /**
     *
     * GET EXCHANGES DATA
     *
     */
    function getExchangesData(data) {
      const output = {};
      for (const [id, val] of Object.entries(data)) {
        output[id] = {
          'cc-id': val.id,
          'cc-name': val.name,
          'cryptohub-pairs': Array.from(val.pairs),
          'cryptohub-cryptoCurrencies': Array.from(val.cryptoCurrencies),
          'cryptohub-fiatCurrencies': Array.from(val.fiatCurrencies),
          'cryptohub-points': val.points,
          'cryptohub-numberOfPairs': val.numberOfPairs,
          'cryptohub-numberOfFiatPairs': val.numberOfFiatPairs,
          'cryptohub-numberOfCryptoPairs': val.numberOfCryptoPairs,
          'cryptohub-numberOfCurrencies': val.numberOfCurrencies,
          'cryptohub-numberOfCryptoCurrencies': val.numberOfCryptoCurrencies,
          'cryptohub-numberOfFiatCurrencies': val.numberOfFiatCurrencies,
        }
      }
      return output;
    }

    const result = await getData();
    await perSecondSave(result, timestamp);
    await exchangeSave(getExchangesData(exchanges));

  }
  catch(error) {
    const message = `formatterExchangesList(): ${error}`;
    logger.error(message);
    debugger;
    return {message, error: true};
  }
}
