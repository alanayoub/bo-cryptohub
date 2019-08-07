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
module.exports = async function getJobsMessariMarkets(queue, bootstrapData, appBootstrapData) {

  try {

    queue.push({
      uri: settings.uriMessariMarkets,
      key: settings.keyMessariMarkets,
      cacheForDays: settings.cacheForMessari,
    });

    logger.info(`getJobsMessariMarkets(): 1 markets jobs created`);

  }
  catch(error) {

    const message = `getJobsMessariMarkets(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
