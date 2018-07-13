// Libs
const logger = require('../../logger');

// CryptoHub
const settings = require('../../settings');
const { logHeader } = require('../../utils.js');
const { scrapeHTML, scrapeJSON } = require('../../utils/index.js');

/**
 *
 * Scrapes coinmarketcap list and details pages
 * Save pages in cache
 *
 * @param {Number} requestLimit - For test purposes limit the number of requests to coinmarketcap project pages
 * @param {Number} requestDelay - How long to wait inbetween requests so coinmarketcap doesn't crap out (in ms)
 *
 */
module.exports = async function scrapeCoinmarketcap({requestLimit = Infinity, requestDelay = 2000}) {

  return new Promise(async resolve => {

    try {

      logHeader('Scraping CoinMarketCap.com');
      const uri = settings.uriCoinmarketcapList;
      const key = settings.keyCoinmarketcapList;
      const file = await scrapeJSON(uri, key, global.cacheForCoinmarketcapProjectsJson);
      let ids = file.data.map(v => v.id);
      let slugs = file.data.map(v => v.website_slug);
      let results = {
        githubUrls: {}
      };

      (async function scrapeGitUrlsForAllProjects(idx = 0) {

        const id = ids.shift();
        const slug = slugs.shift();
        await scrapeJSON(settings.tagUriCoinmarketcapDetailsJSON`${id}`, settings.tagKeyCoinmarketcapDetailsJSON`${id}`, global.cacheForCoinmarketcapProjectHtml);
        await scrapeHTML(settings.tagUriCoinmarketcapDetailsHTML`${slug}`, settings.tagKeyCoinmarketcapDetailsHTML`${slug}`, global.cacheForCoinmarketcapProjectHtml);

        idx++;
        if (ids.length && idx < requestLimit) {
          setTimeout(() => {
            logger.info(`scrapeCoinmarketcap(): Waiting ${requestDelay}ms before next job`);
            scrapeGitUrlsForAllProjects(idx);
          }, requestDelay);
        }
        else {
          resolve();
        }
      })();

    }
    catch(error) {
      const message = `scrapeCoinmarketcap(): ${error}`;
      logger.info(message);
      return {message, error: true};
    }

  });

}
