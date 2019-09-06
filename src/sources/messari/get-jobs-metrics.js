import logger from '../../logger';
import settings from '../../settings';
import { getMessariSymbols } from '../../db/query';

const uri = (str, id) => `https://data.messari.io/api/v1/assets/${id}/metrics`;
const key = (str, id) => `${scrapeDir}/messari-metric/${id}/data.json`;

/**
 *
 * @param {Array} queue
 *
 */
export default async function getJobsMessariMetrics(queue) {

  try {

    let symbol;
    let jobs = 0;
    const symbols = await getMessariSymbols();

    for (symbol of symbols) {
      queue.push({
        uri: uri`${symbol}`,
        key: key`${symbol}`,
        cacheForDays: settings.cacheForMessari
      });
      jobs++;
    }

    logger.info(`getJobsMessariMetrics(): ${jobs} metrics jobs created`);

  }
  catch (error) {

    const message = `getJobsMessariMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
