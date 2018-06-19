// Libs
const { to } = require('await-to-js');
const cheerio = require('cheerio');

// CryptoHub
const logger = require('./logger');
const settings = require('./settings');
const {
  formatterJSONToTxt,
  formatterCryptocompareSnapshot,
  formatterCryptocompareSocialstats
} = require('./utils/index.js');

process.on('warning', error => {
  logger.warn(error.stack);
});

/**
 *
 * Merge cryptocompare data items
 * @param {Array} dataArray
 * @return {Object}
 *
 */
function mergeCryptocompareDataById(dataArray) {
  try {
    const result = {};
    for (const data of dataArray) {
      for (const [key, val] of Object.entries(data)) {
        if (!result[key]) result[key] = {};
        Object.assign(result[key], val);
      }
    }
    return result;
  }
  catch(error) {
    logger.error(`mergeCryptocompareDataById: ${error}`);
    return false;
  }
}

//
// 1. Parse all the data that has been scraped and convert into a single json document
// 2. Update the document as data changes
// 3. Make the document available through a socket
//
(async function() {

  try {

    logger.info('Analytics');
    let cryptocompare;
    let coinmarketcap = {};

    //
    // Cryptocompare
    //
    {
      // const [file] = settings.cache.get(settings.keyCryptocompareList);
      // const json = JSON.parse(file);
      // const ids = Object.values(json.Data).map(v => v.Id);

      // let social = {};
      // let snapshot = {};
      // for (const id of ids) {
      //   let [fileSocial]   = settings.cache.get(settings.tagKeyCryptocompareSocialstats`${id}`);
      //   let [fileSnapshot] = settings.cache.get(settings.tagKeyCryptocompareSnapshot`${id}`);
      //   social[id]   = JSON.parse(fileSocial);
      //   snapshot[id] = JSON.parse(fileSnapshot);
      // }
      // social   = formatterCryptocompareSocialstats(social);
      // snapshot = formatterCryptocompareSnapshot(snapshot);

      // cryptocompare = mergeCryptocompareDataById([social, snapshot]);
    }

    //
    // Coinmarketcap
    //
    {
      const [file] = settings.cache.get(settings.keyCoinmarketcapList);
      const json = JSON.parse(file).data;
      let slugs = json.map(v => v.slug);
      const githubUrls = {};
      for (const item of json) {
        const slug = item.website_slug;
        const [file] = settings.cache.get(settings.tagKeyCoinmarketcapDetailsHTML`${slug}`);
        const $ = cheerio.load(file);

        // Github URLs
        const urls = [];
        const githubs = $('a[href^="https://github"]').toArray();
        if (global.githubOverrides[slug]) {
          urls.push(global.githubOverrides[slug]);
          if (githubs.length) {
            logger.warn(`Found a github url that didn't exist before. Maybe we can remove the override for ${slug}`);
          }
        }
        githubs.forEach(a => urls.push(a.attribs.href));
        githubUrls[item.id] = Array.from(new Set(urls))

        // Volume
        // Do stuff...

      }
      console.log(coinmarketcap, githubUrls);
      debugger
    }

    //
    // Output
    //
    settings.cache.set(settings.keyCryptohubAnalytics, formatterJSONToTxt(cryptocompare));

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
    process.exit(1);

  }

  process.exit(0);

})();
