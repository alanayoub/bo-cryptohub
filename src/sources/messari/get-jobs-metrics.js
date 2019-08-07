'use strict';

// Cryptohub
const logger = require('../../logger');
const settings = require('../../settings');

import { getAllSymbols } from '../../db/query';

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsMessariMetrics(queue, bootstrapData, appBootstrapData) {

  try {

    let symbol;
    let jobs = 0;
    const symbols = await getAllSymbols();

    for (symbol of symbols) {
      queue.push({
        uri: settings.tagUriMessariMetrics`${symbol}`,
        key: settings.tagKeyMessariMetrics`${symbol}`,
        cacheForDays: settings.cacheForMessari,
      });
      jobs++;
    }

    logger.info(`getJobsMessariMetrics(): ${jobs} metrics jobs created`);

  }
  catch(error) {

    const message = `getJobsMessariMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
