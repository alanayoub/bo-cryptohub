/**
 *
 * USD Currency Table
 * @return {Object}
 *
 */

//
// NOTE: MAKE THIS A FORMATTER and put it on bootstrapData
//

// Libs
const cheerio = require('cheerio');

// CryptoHub
const logger = require('../logger');
const settings = require('../settings');

//
// Xe
//
// Currency conversion data for USD
//
//  USD: {name: "US Dollar", unitsPerUSD": 1.0000000000", USDPerUnits: "1.0000000000"},
//  EUR: {name: "Euro",      unitsPerUSD: "0.8576784390", USDPerUnits: "1.1659381355"}
//
module.exports = function formatterXeSectionCurrency(response, timestamp, bootstrapData, appBootstrapData) {
  try {

    const data = {};
    const $ = cheerio.load(response);
    const trs = $('#historicalRateTbl tbody tr').toArray();
    for (const tr of trs) {
      const tds = $(tr).find('td').toArray();
      const code = $(tds[0]).text();
      const name = $(tds[1]).text();
      const unitsPerUSD = $(tds[2]).text();
      const USDPerUnits = $(tds[3]).text();
      data[code] = {
        name,
        unitsPerUSD,
        USDPerUnits
      }
    }
    appBootstrapData.currency = data;
    return {data, timestamp};
  }
  catch(error) {
    const message = `formatterXeSectionCurrency(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
