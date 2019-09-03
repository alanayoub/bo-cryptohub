/**
 *
 * USD Currency Table
 * @return {Object}
 *
 */

// Libs
const cheerio = require('cheerio');

// CryptoHub
const logger   = require('../logger');
const settings = require('../settings');

//
// Xe
//
// Currency conversion data for USD
//
//  USD: {name: "US Dollar", unitsPerUSD": 1.0000000000", USDPerUnits: "1.0000000000"},
//  EUR: {name: "Euro",      unitsPerUSD: "0.8576784390", USDPerUnits: "1.1659381355"}
//
module.exports = function USDCurrencyTable() {
  try {
    const data = {};
    const currency = 'USD';
    const [file] = settings.cache.get(settings.tagKeyXeCurrencyTables`${currency}`);
    const $ = cheerio.load(file);
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
    return data;
  }
  catch(error) {
    logger.error(`usdCurrencyTable: ${error}`);
    return false;
  }
}
