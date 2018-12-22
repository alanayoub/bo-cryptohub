//
//
//     d888888o.       ,o888888o.    8 888888888o.            .8.          8 888888888o   8 8888888888
//   .`8888:' `88.    8888     `88.  8 8888    `88.          .888.         8 8888    `88. 8 8888
//   8.`8888.   Y8 ,8 8888       `8. 8 8888     `88         :88888.        8 8888     `88 8 8888
//   `8.`8888.     88 8888           8 8888     ,88        . `88888.       8 8888     ,88 8 8888
//    `8.`8888.    88 8888           8 8888.   ,88'       .8. `88888.      8 8888.   ,88' 8 888888888888
//     `8.`8888.   88 8888           8 888888888P'       .8`8. `88888.     8 888888888P'  8 8888
//      `8.`8888.  88 8888           8 8888`8b          .8' `8. `88888.    8 8888         8 8888
//  8b   `8.`8888. `8 8888       .8' 8 8888 `8b.       .8'   `8. `88888.   8 8888         8 8888
//  `8b.  ;8.`8888    8888     ,88'  8 8888   `8b.    .888888888. `88888.  8 8888         8 8888
//   `Y8888P ,88P'     `8888888P'    8 8888     `88. .8'       `8. `88888. 8 8888         8 888888888888
//
//
// Create a number of scrapeQueues
// Each scrapeQueue takes a function that generates a scrape job ('uri' to scrape and 'key' to save file)
// The  scrapeQueues continuously run scraping at a predefined interval
//
// NOTE: Maybe change implementation to use save instead of spesifying a cache key
//

// Libs
const { to } = require('await-to-js');

// CryptoHub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');

// CryptoHub Scrape
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
    //     Month  - 100000
    //     Day    - 3200
    //     Hour   - 130
    //     Minute - 2
    //     Second - 0.038
    //
    //  26784 ms between requests :(
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
