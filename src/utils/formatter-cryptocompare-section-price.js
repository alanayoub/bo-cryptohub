// Cryptohub
const logger = require.main.require('./logger');

/**
 *
 * PRICE
 *
 * Original Data
 * -------------
 *
 * TYPE:  "5"
 * MARKET:  "CCCAGG"
 * FROMSYMBOL:  "BTC"
 * TOSYMBOL:  "USD"
 * FLAGS:  "4"
 * PRICE: 6429.49
 * LASTUPDATE: 1536222722
 * LASTVOLUME: 0.005
 * LASTVOLUMETO: 32.1245925
 * LASTTRADEID:  "290332570"
 * VOLUMEDAY: 73331.62846431609
 * VOLUMEDAYTO: 473214413.3407818
 * VOLUME24HOUR: 164542.97725276044
 * VOLUME24HOURTO: 1115586462.295549
 * OPENDAY: 6705.03
 * HIGHDAY: 6727.19
 * LOWDAY: 6295.11
 * OPEN24HOUR: 7385.55
 * HIGH24HOUR: 7388.15
 * LOW24HOUR: 6289.93
 * LASTMARKET:  "Bitfinex"
 * CHANGE24HOUR: -956.0600000000004
 * CHANGEPCT24HOUR: -12.945007480824048
 * CHANGEDAY: -275.53999999999996
 * CHANGEPCTDAY: -4.109452157559324
 * SUPPLY: 17252100
 * MKTCAP: 110922204429
 * TOTALVOLUME24H: 471769.84240143484
 * TOTALVOLUME24HTO: 3090898519.5002995
 *
 * Prefix fields with "cc-price-"
 * ----------------------------------------------
 * PRICE -> cc-price-PRICE
 *
 * @param {Array} price is an array of the responses of batched cryptocompare api price data
 * @param {String} timestamp
 * @param {Object} bootstrappedData
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionPrice(price, timestamp, bootstrappedData) {
  try {

    let i;
    let id;
    let val;
    let field;
    let symbol;
    let fData = {};
    let batchRequestData;
    const prefix = 'cc-price-';
    if (!Array.isArray(price)) price = [price];
    console.log(`current price batch ${timestamp} length: ${price.length}`);
    for (i = 0; i < price.length; i++) {
      batchRequestData = price[i].RAW;
      if (!price[i].RAW) {
        const warning = price[i].Message;
        logger.warn(warning);
        continue;
      }
      for ([symbol, val] of Object.entries(batchRequestData)) {
        id = bootstrappedData.symbolIdMap[symbol];
        if (id && val.USD) {
          val = val.USD;
          fData[id] = {};
          for (field of Object.keys(val)) {
            fData[id][`${prefix}${field}-timestamp`] = timestamp;
            fData[id][`${prefix}${field}`] = val[field];
          }
        }
        else {
          logger.error(`formatterCryptocomparePrice(): No id or val.USD for ${symbol}`);
        }
      }
    }
    return {data: fData, timestamp};

  }
  catch(error) {
    const message = `formatterCryptocompareSectionPrice(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
