/**
 * Itterate over Cryptocompare exchange pairs
 * @return {Object} uri and key for making a request
 */
const settings = require('../../settings');
const logger = require('../../logger');
module.exports = async function* itterateCryptocompareExchangePairs() {
  try {

    let [exchanges] = settings.cache.get(settings.keyCryptocompareExchanges);
    exchanges = JSON.parse(exchanges);

    let numberOfItems = 0;
    for (const exchange of Object.values(exchanges)) {
      for (const pairs of Object.values(exchange)) {
        numberOfItems += pairs.length;
      }
    }

    let count = 0;
    for (const [exchange, exchangeObject] of Object.entries(exchanges)) {
      for (const [symbol1, pairArray] of Object.entries(exchangeObject)) {
        for (const symbol2 of pairArray) {
          count++;
          yield {
            exchange, symbol1, symbol2, last: count === numberOfItems
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
