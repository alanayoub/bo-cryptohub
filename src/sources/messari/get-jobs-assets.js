'use strict';

// Cryptohub
const logger = require('../../logger');
const settings = require('../../settings');

/**
 *
 * @param {Array} queue
 *
 */
module.exports = async function getJobsAssetsWithMetrics(queue) {

  try {

    queue.push({
      uri: settings.uriMessariAssetsWithMetrics,
      key: settings.keyMessariAssetsWithMetrics,
      cacheForDays: settings.cacheForMessari,
    });

    logger.info(`getJobsMessariMetrics(): 1 metrics jobs created`);

  }
  catch(error) {

    const message = `getJobsMessariMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
