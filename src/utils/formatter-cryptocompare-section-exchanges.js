// Cryptohub
const logger = require.main.require('./logger');

/**
 *
 * EXCHANGES
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
 *
 * @param {Array} exchanges is an array of the responses of batched cryptocompare api exchanges data
 * @param {String} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionExchanges(response, timestamp, bootstrapData, appBootstrapData) {
  try {

    if (!appBootstrapData.currency) return {data: {}, timestamp};

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

    if (!response && !response.Data) return {data: {}, timestamp};

    const symbols = {};
    const exchanges = {};
    // const fiatVolume = {};
    // const cryptoVolume = {};

    function addSymbol(symbol) {
      if (!symbols[symbol]) {
        symbols[symbol] = {
          pairs: new Set(),
          exchangeList: new Set(),
          _fiatCurrencies: new Set(),
          _exchangesRank: 0,
          _numberOfExchanges: 0,
          _numberOfPairs: 0,
          _numberOfFiatPairs: 0,
          _numberOfFiatCurrencies: 0,
        }
      }
    }

    function addExchange(exchange) {
      exchanges[exchange] = {
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

    function addExchangeToSymbol(symbol, exchange) {
      symbols[symbol].exchangeList.add(exchange);
    }

    function addPairsToSymbol(symbol, pair) {
      symbols[symbol].pairs.add(pair);
    }

    function addPairsToExchange(exchange, pair) {
      exchanges[exchange].pairs.add(pair);
    }

    // TODO: val?
    function addCryptoVolume(currencyCodes, symbol1, symbol2) {
      if (!(currencyCodes.includes(symbol2) || currencyCodes.includes(symbol1))) {
        // For each pair record the volume in each currency
        if (!cryptoVolume[symbol1])          cryptoVolume[symbol1]          = {};
        if (!cryptoVolume[symbol2])          cryptoVolume[symbol2]          = {};
        if (!cryptoVolume[symbol1][symbol2]) cryptoVolume[symbol1][symbol2] = 0;
        if (!cryptoVolume[symbol2][symbol1]) cryptoVolume[symbol2][symbol1] = 0;
        cryptoVolume[symbol1][symbol2] += val.VOLUME24HOURTO;
        cryptoVolume[symbol2][symbol1] += val.VOLUME24HOUR;
      }
    }

    // TODO: val?
    function addFiatVolume(currencyCodes, symbol1, symbol2) {
      if (currencyCodes.includes(symbol2)) {
        if (!fiatVolume[symbol1])          fiatVolume[symbol1]          = {};
        if (!fiatVolume[symbol1][symbol2]) fiatVolume[symbol1][symbol2] = 0;
        fiatVolume[symbol1][symbol2]                                   += val.VOLUME24HOURTO;
      }
      if (currencyCodes.includes(symbol1)) {
        if (!fiatVolume[symbol2])          fiatVolume[symbol2]          = {};
        if (!fiatVolume[symbol2][symbol1]) fiatVolume[symbol2][symbol1] = 0;
        fiatVolume[symbol2][symbol1]                                   += val.VOLUME24HOUR;
      }
    }

    let data;
    let list;
    let pair;
    let symbol1;
    let symbol2;
    let exchange;
    const exclude0xSymbols = true;
    for ([exchange, data] of Object.entries(response.Data)) {
      if (!data.is_active) continue;
      if (!exchanges[exchange]) addExchange(exchange);
      data = data.pairs;
      for ([symbol1, list] of Object.entries(data)) {
        if (symbol1.startsWith('0x') && exclude0xSymbols) continue;
        addSymbol(symbol1);
        addExchangeToSymbol(symbol1, exchange);
        for (symbol2 of Object.values(list)) {
          if (symbol2.startsWith('0x') && exclude0xSymbols) continue;
          pair = `${symbol1},${symbol2}`;
          addSymbol(symbol2);
          addExchangeToSymbol(symbol2, exchange);
          addPairsToExchange(exchange, pair);
          addPairsToSymbol(symbol1, pair);
          addPairsToSymbol(symbol2, pair);
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
      obj._numberOfExchanges = obj.exchangeList.size;
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

        // addCryptoVolume(currencyCodes, symbol1, symbol2);
        // addFiatVolume(currencyCodes, symbol1, symbol2);

      }
      obj._numberOfFiatCurrencies = obj._fiatCurrencies.size;
      obj._numberOfCryptoCurrencies = obj._cryptoCurrencies.size;
      obj._numberOfCurrencies = obj._numberOfFiatCurrencies + obj._numberOfCryptoCurrencies;

      obj._numberOfPairs = obj.pairs.size;
      obj._numberOfCryptoPairs = obj._numberOfPairs - obj._numberOfFiatPairs;

    }

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
      for ([symbol] of Object.entries(coinList)) {
        if (symbols[symbol]) {
          id = map[symbol];
          result[id] = {
            // 'cryptohub-exchangesList': symbols[symbol].exchangesList,
            // 'cryptohub-pairs': symbols[symbol].pairs,
            // 'cryptohub-fiatCurrencies': symbols[symbol]._fiatCurrencies,
            // 'cryptohub-exchagnesRank': symbols[symbol]._exchagnesRank,

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
