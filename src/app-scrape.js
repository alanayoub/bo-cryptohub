// Libs
const { to } = require('await-to-js');

// CryptoHub
const logger = require('./logger');
const scrapeCryptocompare = require('./apps/scrape/scrape-cryptocompare');
const scrapeCoinmarketcap = require('./apps/scrape/scrape-coinmarketcap');

process.on('warning', error => {
  logger.warn(error.stack);
});

(async function() {

  try {

    if (global.settingsScrapeCryptocompare) {
      // await to(scrapeCryptocompare(global.cacheForCryptocompare));
    }

    if (global.settingsScrapeCoinmarketcap) {
      await to(scrapeCoinmarketcap({requestLimit: 5000, requestDelay: 3000})); // TODO: don't wait while retrieving cache
    }

  }

  catch(error) {

    logger.error(`Um some error happened yo: ${error}`);
    process.exit(1);

  }

  process.exit(0);

})();
