/**
 * Itterate over Cryptocompare exchange pairs
 * @return {Object} uri and key for making a request
 */
const settings = require('../settings');
const logger = require('../logger');
module.exports = async function* itterateCryptocompareExchangePairs() {
  try {
    let [exchanges] = settings.cache.get(settings.keyCryptocompareExchanges);
    for (const [exchange, exchangeObject] of Object.entries(exchanges)) {
      for (const [symbol1, pairArray] of Object.entries(exchangeObject)) {
        for (const symbol2 of pairArray) {
          const data = {symbol1, symbol2, exchange};
          const uri = settings.tagUriCryptocompareExchangePairs`${data}`;
          const key = settings.tagKeyCryptocompareExchangePairs`${data}`;
          yield {
            uri, key
          };
        }
      }
    }
    yield false;
  }
  catch (error) {
    const message = `itterateCryptocompareExchangePairs(): ${error}`;
    logger.info(message);
    return {message, error: true};
  }
};
