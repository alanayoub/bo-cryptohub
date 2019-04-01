/**
 *
 * @param {Array} price is an array of the responses of batched cryptocompare api price data
 * @return {Object} data
 *
 */

// Cryptohub
const logger = require('../logger');
module.exports = function formatterCryptocomparePrice(price, symbolIdMap) {
  try {
    let i;
    let id;
    let val;
    let field;
    let symbol;
    let result = {};
    let batchRequestData;
    const prefix = 'cc-price-';
    for (i = 0; i < price.length; i++) {
      batchRequestData = price[i].RAW;
      if (!price[i].RAW) {
        const warning = price[i].Message;
        logger.warn(warning);
        continue;
      }
      for ([symbol, val] of Object.entries(batchRequestData)) {
        id = symbolIdMap[symbol];
        if (id && val.USD) {
          val = val.USD;
          result[id] = {};
          for (field of Object.keys(val)) {
            result[id][`${prefix}${field}`] = val[field];
          }
        }
        else {
          logger.error(`formatterCryptocomparePrice(): No id or val.USD for ${symbol}`);
        }
      }
    }
    return result;
  }
  catch(error) {
    const message = `formatterCryptocomparePrice(): ${error}`;
    logger.error(message);
    debugger
    return {message, error: true};
  }
}
