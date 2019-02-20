// Cryptohub
const logger = require.main.require('./logger');

/**
 *
 * addSymbol
 *
 */
function addSymbol(symbols, symbol) {
  if (!symbols[symbol]) {
    symbols[symbol] = {
      pairs: new Set(),
      exchangeListFiatOnly: new Set(),
      exchangeListCryptoOnly: new Set(),
      exchangeListAcceptsBoth: new Set(),
      _fiatCurrencies: new Set(),
      _exchangesRank: 0,
      _numberOfExchanges: 0,
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
function addExchange(exchanges, exchange, id) {
  exchanges[exchange] = {
    id,
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
function addExchangeToSymbol(symbols, symbol, exchange, type) {
  if (type === 'fiat')        symbols[symbol].exchangeListFiatOnly.add(exchange);
  else if (type === 'crypto') symbols[symbol].exchangeListCryptoOnly.add(exchange);
  else if (type === 'both')   symbols[symbol].exchangeListAcceptsBoth.add(exchange);
}

/**
 *
 * addPairsToSymbol
 *
 */
function addPairsToSymbol(symbols, symbol, pair) {
  symbols[symbol].pairs.add(pair);
}

/**
 *
 * addPairsToExchange
 *
 */
function addPairsToExchange(exchanges, exchange, pair) {
  exchanges[exchange].pairs.add(pair);
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
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionExchanges(response, timestamp, bootstrapData, appBootstrapData, fileName) {
  try {

    const emptyReturn = {data: {}, timestamp};

    if (!appBootstrapData.currency || (!response && !response.Data) || response.Response !== 'Success') {
      return emptyReturn;
    }

    const responseTypeExchanges        = 'cryptocompare-exchanges/list';
    const responseTypeExchangesGeneral = 'cryptocompare-exchanges/general';
    if (fileName.indexOf(responseTypeExchanges) > -1) {
      // do exchanges list
    }
    else if (fileName.indexOf(responseTypeExchangesGeneral) > -1) {
      // do exchanges general

      appBootstrapData.exchanges = response.Data;
      return emptyReturn;
    }

    //
    // STEP 1: Extract data into the below 2 object structures
    //
    // symbols: {
    //   btc: {
    //     exchangesList: ['kraken', 'poloniex'],
    //   }
    // }
    //
    // exchanges: {
    //   kraken: {
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
    let exchange;
    let exchangeId = 0;
    const exclude0xSymbols = true;

    for ([exchange, data] of Object.entries(response.Data)) {
      if (!data.is_active) continue;
      if (!exchanges[exchange]) addExchange(exchanges, exchange, exchangeId++);
      data = data.pairs;

      for ([symbol1, list] of Object.entries(data)) {
        if (symbol1.startsWith('0x') && exclude0xSymbols) continue;
        addSymbol(symbols, symbol1);
        // addExchangeToSymbol(symbols, symbol1, exchange);

        for (symbol2 of Object.values(list)) {
          if (symbol2.startsWith('0x') && exclude0xSymbols) continue;
          pair = `${symbol1},${symbol2}`;
          addSymbol(symbols, symbol2);
          // addExchangeToSymbol(symbols, symbol2, exchange);
          addPairsToExchange(exchanges, exchange, pair);
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
    //     exchangesList: ['kraken', 'poloniex'],
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
    //   kraken: {
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
    for ([exchange, obj] of Object.entries(exchanges)) {

      for (pair of obj.pairs.values()) {

        [symbol1, symbol2] = pair.split(',');

        hasFiat = hasCrypto = false;
        if (obj._numberOfFiatCurrencies) hasFiat = true;
        if (obj._numberOfCryptoCurrencies) hasCrypto = true;

        if (hasFiat && hasCrypto) addExchangeToSymbol(symbols, symbol1, exchange, 'both');
        else if (hasCrypto)       addExchangeToSymbol(symbols, symbol1, exchange, 'crypto');
        else if (hasFiat)         addExchangeToSymbol(symbols, symbol1, exchange, 'fiat');

      }

    }

    // Symbols part 2
    for (obj of Object.values(symbols)) {
      obj._numberOfExchanges = obj.exchangeListFiatOnly.size + obj.exchangeListCryptoOnly.size + obj.exchangeListAcceptsBoth.size;
    }

    //
    // Set bootstrap data
    //
    appBootstrapData.exchanges = exchanges;

    //
    // Save exchange data to core dataset
    //
    let result = {};
    const map = bootstrapData['symbolIdMap'];
    if (bootstrapData.coinList.Data) {
      const coinList = bootstrapData.coinList.Data;
      let id;
      let symbol;
      let exchange;
      for ([symbol] of Object.entries(coinList)) {
        if (symbols[symbol]) {
          id = map[symbol];
          result[id] = {

            // 'cryptohub-pairs': symbols[symbol].pairs,
            // 'cryptohub-fiatCurrencies': symbols[symbol]._fiatCurrencies,
            // 'cryptohub-exchagnesRank': symbols[symbol]._exchagnesRank,

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

          }
        }
      }
    }

    return {data: result, timestamp};

  }
  catch(error) {
    const message = `formatterCryptocompareSectionExchanges(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
