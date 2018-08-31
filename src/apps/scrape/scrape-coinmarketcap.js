// Node
const crypto = require('crypto');

// Libs
const logger = require('../../logger');

// CryptoHub
const settings = require('../../settings');
const { logHeader } = require('../../utils.js');
const { scrapeHTML, scrapeJSON } = require('../../utils/index.js');

const {
  commonDelay,
  classScrapeQueue:ScrapeQueue
} = require('../../utils/');

/**
 *
 * Scrapes coinmarketcap list and details pages
 * Save pages in cache
 *
 * @param {Number} requestLimit - For test purposes limit the number of requests to coinmarketcap project pages
 * @param {Number} requestDelay - How long to wait inbetween requests so coinmarketcap doesn't crap out (in ms)
 *
 */
module.exports = async function scrapeCoinmarketcap(cacheForDays, rateLimitDelayMs) {

  try {

    const scrapeQueue = new ScrapeQueue({
      rateLimit: settings.queueCryptocompare,
      bootstrap: {
        name: 'coinList',
        async func() {
          logger.info('Scraping CoinMarketCap.com');
          const uri = settings.uriCoinmarketcapList;
          const key = settings.keyCoinmarketcapList;
          const file = await scrapeJSON(uri, key, settings.cacheForCoinmarketcapProjectsJson);
          let ids = file.data.map(v => v.id);
          let slugs = file.data.map(v => v.website_slug);
          return {
            ids,
            slugs,
          }
        }
      },
    });

    //
    // TICKER
    //
    //
    //
    scrapeQueue.addToQueue({
      name: 'ticker',
      interval: 1000 * 10,
      async getJobs(queue) {

        const len = scrapeQueue.coinList.ids.length;
        const sort = 'id';
        let jobs = 0;
        let start = 0;
        let limit = 100;

        const groupKey = settings.tagKeyCoinmarketcapTickerGrouped`${{}}`;
        const iterations = Math.round(len / limit);
        let counter = 0;

        for (; start < len; start = start + 101) {
          counter++;
          const last = counter === iterations;
          const md5 = crypto.createHash('md5');
          const cacheKey = md5.update(start + limit + sort).digest('hex');
          const data = {
            cacheKey, start, limit, sort
          }
          const uri = settings.tagUriCoinmarketcapTicker`${data}`;
          const key = settings.tagKeyCoinmarketcapTicker`${data}`;
          queue.push({uri, key, cacheForDays, groupKey, last});
          jobs++;
        }

        logger.info(`Number of jobs: ${jobs} jobs created for coinmarketcap ticker API`);

      },
      save() {
        logger.info(`Save price data to DB`);
      },
    });

  }
  catch(error) {
    const message = `scrapeCoinmarketcap(): ${error}`;
    logger.info(message);
    return {message, error: true};
  }


  //
  // use this old code to scrape all git urls
  //
  // return new Promise(async resolve => {

  //   try {

  //     logHeader('Scraping CoinMarketCap.com');
  //     const uri = settings.uriCoinmarketcapList;
  //     const key = settings.keyCoinmarketcapList;
  //     const file = await scrapeJSON(uri, key, settings.cacheForCoinmarketcapProjectsJson);
  //     let ids = file.data.map(v => v.id);
  //     let slugs = file.data.map(v => v.website_slug);
  //     let results = {
  //       githubUrls: {}
  //     };

  //     (async function scrapeGitUrlsForAllProjects(idx = 0) {

  //       const id = ids.shift();
  //       const slug = slugs.shift();
  //       await scrapeJSON(settings.tagUriCoinmarketcapDetailsJSON`${id}`, settings.tagKeyCoinmarketcapDetailsJSON`${id}`, settings.cacheForCoinmarketcapProjectHtml);
  //       await scrapeHTML(settings.tagUriCoinmarketcapDetailsHTML`${slug}`, settings.tagKeyCoinmarketcapDetailsHTML`${slug}`, settings.cacheForCoinmarketcapProjectHtml);

  //       idx++;
  //       if (ids.length && idx < requestLimit) {
  //         setTimeout(() => {
  //           logger.info(`scrapeCoinmarketcap(): Waiting ${requestDelay}ms before next job`);
  //           scrapeGitUrlsForAllProjects(idx);
  //         }, requestDelay);
  //       }
  //       else {
  //         resolve();
  //       }
  //     })();

  //   }
  //   catch(error) {
  //     const message = `scrapeCoinmarketcap(): ${error}`;
  //     logger.info(message);
  //     return {message, error: true};
  //   }

  // });

}
