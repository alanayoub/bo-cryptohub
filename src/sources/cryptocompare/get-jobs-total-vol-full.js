const logger   = require('../../logger');
const settings = require('../../settings');

const uri      = (str, ob) => `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${ob.limit}&tsym=USD&page=${ob.page}`;
const key      = (str, ob) => `${settings.scrapeDir}/cryptocompare-totalvolfull/page-${ob.page}.json`;
const tagGroup = (str, ob) => `${settings.scrapeDir}/cryptocompare-totalvolfull-grouped/data.json`;

/**
 *
 * @param {Array} queue
 *
 */
export default async function getJobsCryptocompareSectionTotalVolFull(queue) {
  try {

    let page = 6;
    let jobs = 0;
    const limit = 100;
    const maxPages = 20;
    const groupKey = tagGroup`${{}}`;

    while (page < maxPages) {

      // We want the first 5 pages to update more often so we
      // add first 5 pages for every other page (6 - 20)
      for (let i = 0; i < 6; i++) {
        const d = {limit, page: i};
        queue.push({ uri: uri`${d}`, key: key`${d}`, cacheForDays: 0 });
      }

      const data = {
        limit, page
      };
      queue.push({
        uri: uri`${data}`,
        key: key`${data}`,
        cacheForDays: 0
      });

      jobs++;
      page++;

    }

    logger.info(`getJobs Cryptocompare TotalVolFull: ${jobs} price jobs created`);

  }
  catch (error) {
    const message = `getJobs Cryptocompare TotalVolFull: ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
