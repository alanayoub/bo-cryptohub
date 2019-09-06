// Node
const crypto   = require('crypto');

// Cryptohub
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

    let page = 0;
    let jobs = 0;
    const limit = 100;
    const maxPages = 20;
    const groupKey = tagGroup`${{}}`;

    while (page < maxPages) {
      const data = {
        limit, page
      };
      queue.push({
        uri: uri`${data}`,
        key: key`${data}`,
        cacheForDays: 0});
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
