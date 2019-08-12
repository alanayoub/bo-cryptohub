'use strict';

// Cryptohub
const logger = require('../../logger');
const settings = require('../../settings');

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsPrices(queue) {

  try {

    queue.push({
      uri: settings.uriMessariPrices,
      key: settings.keyMessariPrices,
      cacheForDays: settings.cacheForMessari,
    });

    logger.info(`getJobsPrices(): 1 markets jobs created`);

  }
  catch(error) {

    const message = `getJobsPrices(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
