// Libs
const { to } = require('await-to-js');

// CryptoHub
const logger = require('./logger');
const settings = require('./settings');
const scrapeXe = require('./apps/scrape/scrape-xe');
const scrapeCryptocompare = require('./apps/scrape/scrape-cryptocompare');
const scrapeCoinmarketcap = require('./apps/scrape/scrape-coinmarketcap');

process.on('warning', error => {
  logger.warn(error.stack);
});

(async function() {

  try {

    //
    // Cryptocompare
    //
    // From the website:
    //   Caching: 10 seconds
    //   Rate limits:
    //     Hour limit - 100000
    //     Minute limit - 2000
    //     Second limit - 50
    //
    // Not sure what that means but:
    //   100000/60/60 = 27 requests per second
    //   1000/27      = 37 milliseconds between requests
    //
    // NOTE: Need to setup a que and rate limiter
    //
    if (global.settingsScrapeCryptocompare) {
      await to(scrapeCryptocompare(global.cacheForCryptocompare, 100));
    }

    if (global.settingsScrapeCoinmarketcap) {
      await to(scrapeCoinmarketcap(global.cacheForCoinmarketcap, 500)); // TODO: don't wait while retrieving cache
    }

    if (global.settingsScrapeXe) {
      await to(scrapeXe(global.cacheForXe, 1000));
    }

  }

  catch(error) {

    logger.error(`Um some error happened yo: ${error}`);
    process.exit(1);

  }

})();
