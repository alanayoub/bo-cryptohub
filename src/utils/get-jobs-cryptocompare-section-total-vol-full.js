// Node
const crypto   = require('crypto');

// Cryptohub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsCryptocompareSectionTotalVolFull(queue, bootstrapData) {
  try {

    let page = 0;
    let jobs = 0;
    const limit = 100;
    const maxPages = 5;
    const groupKey = settings.tagKeyCryptocompareTotalVolFullGrouped`${{}}`;

    while (page < maxPages) {
      const data = {
        limit, page
      };
      const uri = settings.tagUriCryptocompareTotalVolFull`${data}`;
      const key = settings.tagKeyCryptocompareTotalVolFull`${data}`;
      queue.push({uri, key: groupKey, cacheForDays: settings.cacheForCryptocompare});
      jobs++;
      page++;
    }

    logger.info(`getJobsCryptocompareSectionTotalVolFull(): ${jobs} price jobs created`);

  }
  catch(error) {
    const message = `getJobsCryptocompareSectionTotalVolFull(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
