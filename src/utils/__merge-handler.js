/**
 *
 * Merge Handler
 *
 * Everytime new data is scraped this function will
 * be used to merge it with the existing data
 *
 * @param {Array} dataArray
 * @param {Object} db
 * @return {Array} - the merged data
 *
 */
const logger = require('../logger');
module.exports = function mergeHandler(dataArray, db) {
  try {
    //
    // basically at the moment this is only if we are scraping coinmarketcap too
    // we are probably going to retire cmc as the api rate limit sucks
    // let cc, cmc, map, json;
    // if (dataArray.length === 2) {
    //   cmc = db.coinmarketcap;
    //   cc = db.cryptocompare;
    //   if (!map) {
    //     map = analyticsMapCmcToCc(cmc, cc);
    //   }
    //   cmc = commonSwapObjectKeys(cmc, map);
    //   json = analyticsMergeDataByKey([cc, cmc]);
    //   return json;
    // }
    //
    return dataArray[0];
  }
  catch(error) {
    const message = `mergeHandler(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
