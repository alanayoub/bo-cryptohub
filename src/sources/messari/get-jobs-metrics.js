// Cryptohub
const logger = require('../../logger');
const settings = require('../../settings');

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsMessariSectionMetrics(queue, bootstrapData, appBootstrapData) {

  try {

    if (!appBootstrapData.firstXSymbols) {
      return;
    }
    else {

      let symbol;
      let jobs = 0;
      const symbols = appBootstrapData.firstXSymbols;
      // const groupKey = settings.tagKeyMessariMetricsGrouped`${{}}`;

      for (symbol of symbols) {
        queue.push({
          // groupKey,
          uri: settings.tagUriMessariMetrics`${symbol}`,
          key: settings.tagKeyMessariMetrics`${symbol}`,
          cacheForDays: settings.cacheForMessari,
        });
        jobs++;
      }

      logger.info(`getJobsMessariMetrics(): ${jobs} metrics jobs created`);

    }

  }
  catch(error) {

    const message = `getJobsMessariSectionMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
