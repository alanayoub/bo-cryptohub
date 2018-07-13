// CryptoHub
const settings = require('../../settings');
const logger = require('../../logger');
const { logHeader } = require('../../utils.js');
const { scrapeHTML } = require('../../utils/index.js');
module.exports = async function scrapeXe(cacheForDays, rateLimitDelayMs) {
  try {
    logHeader('Scraping xe.com');
    const currency = 'USD';
    await scrapeHTML(settings.tagUriXeCurrencyTables`${currency}`, settings.tagKeyXeCurrencyTables`${currency}`, cacheForDays);
    return true;
  }
  catch(error) {
    logger.error(`scrapeCryptocompare(): ${error}`);
    return {error: true, message: `scrapeCryptocompare(): ${error}`};
  }
}
