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

    if (global.settingsScrapeCryptocompare) {
      await to(scrapeCryptocompare(global.cacheForCryptocompare, 100));
    }

    if (global.settingsScrapeCoinmarketcap) {
      // await to(scrapeCoinmarketcap({requestLimit: 5000, requestDelay: 3000})); // TODO: don't wait while retrieving cache
    }

    if (global.settingsScrapeCoinmarketcap) {
      await to(scrapeXe(global.cacheForXe, 1000));
    }

  }

  catch(error) {

    logger.error(`Um some error happened yo: ${error}`);
    process.exit(1);

  }

  process.exit(0);

})();
