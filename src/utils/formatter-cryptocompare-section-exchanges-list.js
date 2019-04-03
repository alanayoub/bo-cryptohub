// Binary Overdose
import { objectGetNestedProperty as getNestedProp } from 'bo-utils';

// Cryptohub
import logger   from '../logger';
import settings from '../settings';

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
      _fiatCurrencies: new Set(),
      _exchangesRank: 0,
      _numberOfExchanges: 0,
      _numberOfDex: 0,
      _numberOfPairs: 0,
      _numberOfFiatPairs: 0,
      _numberOfFiatCurrencies: 0,
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
    _cryptoCurrencies: new Set(),
    _fiatCurrencies: new Set(),
    _points: 0,
    _numberOfPairs: 0,
    _numberOfFiatPairs: 0,
    _numberOfCryptoPairs: 0,
    _numberOfCurrencies: 0,
    _numberOfCryptoCurrencies: 0,
    _numberOfFiatCurrencies: 0,
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
  else logger.info(`addPairsToSymbol(): can't add pair ${pair} to symbol ${symbol}`);
}

/**
 *
 * addPairsToExchange
 *
 */
function addPairsToExchange(exchanges, id, pair) {
  if (exchanges[id]) exchanges[id].pairs.add(pair);
  else logger.info(`addPairsToExchange(): can't add pair ${pair} to exchange id ${id}`);
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
 * @param {Object} bootstrapData - legacy bootstrap data (will be merged with appBootstrapData
 * @param {Object} addBootstrapData - data store for non row data
 * @param {String} fileName - file name of stored request
 * @param {String} event - type of event
 * @return {Object}
 *
 */
export default function formatterCryptocompareSectionExchangesList(response, timestamp, bootstrapData, appBootstrapData, fileName, event, cache) {
  try {

    const emptyReturn = {data: {}, timestamp};
    const store = JSON.parse(cache.get(`${settings.dbDir}/store/data.json`)[0]);
    const mapNameId = getNestedProp(store, 'exchange-map-nameId');

    if (!appBootstrapData.currency || !mapNameId || (!response && !response.Data) || response.Response !== 'Success') {
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
      centralizationType = getNestedProp(store, `exchanges.${exchangeId}.CentralizationType`);
      if (!data.is_active) continue;
      if (!exchanges[exchangeId]) addExchange(exchanges, exchangeName, exchangeId);
      data = data.pairs;

      for ([symbol1, list] of Object.entries(data)) {
        if (symbol1.startsWith('0x') && exclude0xSymbols) continue;
        addSymbol(symbols, symbol1);
        if (centralizationType === 'Decentralized') {
          addExchangeToSymbol(symbols, symbol1, exchangeId, centralizationType);
        }
        for (symbol2 of Object.values(list)) {
          if (symbol2.startsWith('0x') && exclude0xSymbols) continue;
          pair = `${symbol1},${symbol2}`;
          addSymbol(symbols, symbol2);
          if (centralizationType === 'Decentralized') {
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
    //     _fiatCurrencies: [usd, eur],
    //     _exchagnesRank: 87,
    //     _numberOfFiatCurrencies: 2,
    //     _numberOfExchanges: 33,
    //     _numberOfPairs: 123,
    //     _numberOfFiatPairs: 31
    //   }
    // }
    // exchanges: {
    // 1234: {
    //     pairs: ['eth,ltc'],
    //     _points: 84,
    //     _fiatCurrencies: [usd, eur],
    //     _cryptoCurrencies: [btc, ltc],
    //     _numberOfFiatCurrencies: 2,
    //     _numberOfSymbold: 34,
    //     _numberOfPairs: 32,
    //   }
    // }
    //

    let obj;
    const currencyCodes = Object.keys(appBootstrapData.currency) || [];

    // Symbols
    for (obj of Object.values(symbols)) {
      obj._numberOfPairs = obj.pairs.size;
      for (pair of obj.pairs.values()) {
        [symbol1, symbol2] = pair.split(',');

        // add to _fiatCurrencies or _cryptoCurrencies
        if (currencyCodes.includes(symbol1)) obj._fiatCurrencies.add(symbol1);
        if (currencyCodes.includes(symbol2)) obj._fiatCurrencies.add(symbol2);

        if (currencyCodes.includes(symbol1) || currencyCodes.includes(symbol2)) {
          obj._numberOfFiatPairs++;
        }
      }
      obj._numberOfFiatCurrencies = obj._fiatCurrencies.size;
      // _exchangesRank
    }

    // Exchanges
    for (obj of Object.values(exchanges)) {

      for (pair of obj.pairs.values()) {

        [symbol1, symbol2] = pair.split(',');

        if (currencyCodes.includes(symbol1) || currencyCodes.includes(symbol2)) {
          obj._numberOfFiatPairs++;
        }

        // add to _fiatCurrencies or _cryptoCurrencies
        if (currencyCodes.includes(symbol1)) obj._fiatCurrencies.add(symbol1);
        else obj._cryptoCurrencies.add(symbol1);

        if (currencyCodes.includes(symbol2)) obj._fiatCurrencies.add(symbol2);
        else obj._cryptoCurrencies.add(symbol2);

        //
        // Need per exchange volume to do this. Looks like too many requests
        // with the current API setup
        //
        // addCryptoVolume(currencyCodes, symbol1, symbol2);
        // addFiatVolume(currencyCodes, symbol1, symbol2);

      }
      obj._numberOfFiatCurrencies = obj._fiatCurrencies.size;
      obj._numberOfCryptoCurrencies = obj._cryptoCurrencies.size;
      obj._numberOfCurrencies = obj._numberOfFiatCurrencies + obj._numberOfCryptoCurrencies;

      obj._numberOfPairs = obj.pairs.size;
      obj._numberOfCryptoPairs = obj._numberOfPairs - obj._numberOfFiatPairs;

    }

    // Exchanges part 2
    // Now that we have calculated which exchanges have fiat / crypto pairs add this data
    let hasFiat;
    let hasCrypto;
    for ([exchangeId, obj] of Object.entries(exchanges)) {

      for (pair of obj.pairs.values()) {

        [symbol1, symbol2] = pair.split(',');

        hasFiat = hasCrypto = false;
        if (obj._numberOfFiatCurrencies) hasFiat = true;
        if (obj._numberOfCryptoCurrencies) hasCrypto = true;

        if (hasFiat && hasCrypto) addExchangeToSymbol(symbols, symbol1, exchangeId, 'both');
        else if (hasCrypto)       addExchangeToSymbol(symbols, symbol1, exchangeId, 'crypto');
        else if (hasFiat)         addExchangeToSymbol(symbols, symbol1, exchangeId, 'fiat');

      }

    }

    // Symbols part 2
    for (obj of Object.values(symbols)) {
      obj._numberOfExchanges = obj.exchangeListFiatOnly.size + obj.exchangeListCryptoOnly.size + obj.exchangeListAcceptsBoth.size;
      obj._numberOfDex = obj.exchangeListDex.size;
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
    //     'cryptohub-numberOfFiatCurrencies-timestamp': 1550696919978,
    //     'cryptohub-numberOfExchanges': 23,
    //     'cryptohub-numberOfExchanges-timestamp': 1550696919978,
    //     'cryptohub-numberOfPairs': 4,
    //     'cryptohub-numberOfPairs-timestamp': 1550696919978,
    //     'cryptohub-numberOfFiatPairs': 3,
    //     'cryptohub-numberOfFiatPairs-timestamp': 1550696919978
    //   }
    // }
    //
    function handleData(timestamp) {

      let result = {};
      const map = bootstrapData['symbolIdMap'];
      if (bootstrapData.coinList.Data) {
        const coinList = bootstrapData.coinList.Data;
        let id;
        let symbol;
        for ([symbol] of Object.entries(coinList)) {
          if (symbols[symbol]) {
            id = map[symbol];
            result[id] = {

              // 'cryptohub-pairs': symbols[symbol].pairs,
              // 'cryptohub-fiatCurrencies': symbols[symbol]._fiatCurrencies,
              // 'cryptohub-exchagnesRank': symbols[symbol]._exchagnesRank,

              'cryptohub-exchangesListDex': Array.from(symbols[symbol].exchangeListDex),
              'cryptohub-exchangesListFiatOnly': Array.from(symbols[symbol].exchangeListFiatOnly),
              'cryptohub-exchangesListCryptoOnly': Array.from(symbols[symbol].exchangeListCryptoOnly),
              'cryptohub-exchangesListAcceptsBoth': Array.from(symbols[symbol].exchangeListAcceptsBoth),

              'cryptohub-numberOfFiatCurrencies': symbols[symbol]._numberOfFiatCurrencies,
              'cryptohub-numberOfFiatCurrencies-timestamp': timestamp,

              'cryptohub-numberOfExchanges': symbols[symbol]._numberOfExchanges,
              'cryptohub-numberOfExchanges-timestamp': timestamp,

              'cryptohub-numberOfPairs': symbols[symbol]._numberOfPairs,
              'cryptohub-numberOfPairs-timestamp': timestamp,

              'cryptohub-numberOfFiatPairs': symbols[symbol]._numberOfFiatPairs,
              'cryptohub-numberOfFiatPairs-timestamp': timestamp,

              'cryptohub-numberOfDex': symbols[symbol]._numberOfExchanges,

            }
          }
        }
      }
      return {data: result, timestamp};

    }

    function handleStore(timestamp) {
      return {data: {data: exchanges}, timestamp};
    }

    switch (event) {
      case 'data':
        return handleData(timestamp) || emptyReturn;
      case 'store':
        return handleStore(timestamp) || emptyReturn;
    }

  }
  catch(error) {
    const message = `formatterCryptocompareSectionExchangesList(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
