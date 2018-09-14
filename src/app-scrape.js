// Libs
const { to } = require('await-to-js');

// CryptoHub
const logger = require('./logger');
const settings = require('./settings');
const scrapeXe = require('./apps/scrape/scrape-xe');
const scrapeCryptocompare = require('./apps/scrape/scrape-cryptocompare');
const scrapeCoinmarketcap = require('./apps/scrape/scrape-coinmarketcap');

process.on('warning', error => {
  logger.warning(`app-scrape.js:\n${error.stack}`);
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
    if (global.settingsScrapeCryptocompare) {
      const options = {
        cacheForDays: settings.cacheForCryptocompare,
        rateLimitDelayMs: settings.queueCryptocompare,
        scrape: [
          // 'coinList',
          'price',
          // 'exchangePairs',
          // 'socialStats',
          // 'snapshot',
          // 'other'
        ]
      }
      const [error, scrapeQueue] = await to(scrapeCryptocompare(options));
    }

    if (global.settingsScrapeCoinmarketcap) {
      await to(scrapeCoinmarketcap(settings.cacheForCoinmarketcap, 500)); // TODO: don't wait while retrieving cache
    }

    if (global.settingsScrapeXe) {
      await to(scrapeXe(settings.cacheForXe, 1000));
    }

  }

  catch(error) {

    logger.error(`Um some error happened yo: ${error}`);
    process.exit(1);

  }

})();
