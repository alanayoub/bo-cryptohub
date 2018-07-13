// Libs
const { to }        = require('await-to-js');
const cheerio       = require('cheerio');

// CryptoHub
const logger        = require.main.require('./logger');
const settings      = require.main.require('./settings');
const cryptocompare = require.main.require('./apps/analytics/cryptocompare');
const coinmarketcap = require.main.require('./apps/analytics/coinmarketcap');
const {
  analyticsMapCmcToCc,
  commonSwapObjectKeys,
  analyticsMergeDataByKey, // TODO: make this function common?
}                   = require.main.require('./utils/');

process.on('warning', error => {
  logger.warn(error.stack);
});

//
// 1. Parse all the data that has been scraped and convert into a single json document
// 2. Update the document as data changes
// 3. Make the document available through a socket
//
(async function() {

  try {

    logger.info('Analytics');

    let cc  = await cryptocompare();
    let cmc = await coinmarketcap();

    let map = analyticsMapCmcToCc(cmc, cc);
    cmc = commonSwapObjectKeys(cmc, map);
    let json = analyticsMergeDataByKey([cc, cmc]);

    settings.cache.set(settings.keyCryptohubAnalytics, json);

    // ATH
    // ATH 1 month
    // ATH 3 month
    // ATH 6 month
    // ATL
    // ATL 1 month
    // ATL 3 month
    // ATL 6 month

    // Rank
    // Mark
    // Name
    // Symbol
    // Price USD
    // Price BTC
    // 24h Volume USD
    // Market Cap USD
    // Circulating Supply
    // Total Supply
    // Circulating Supply %
    // Max Supply
    // Percent Change 1h
    // Percent Change 24h
    // Percent Change 7d
    // 24h Volume Btc
    // Market Cap Btc
    // Market Cap $
    // $ value per RP
    // $ value per GP
    // Code Repo Points
    // General Points
    // Algorithm
    // Proof
    // Years old
    // Hashes Per Second
    // ICO
    // Number of Pairs
    // Number of Exchanges
    // Instamine
    // Premine
    // Tags

  }

  catch(error) {

    logger.error(`Um some error happened yo: ${error}`);
    debugger
    process.exit(1);

  }

  process.exit(0);

})();
