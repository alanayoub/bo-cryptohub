import logger from '../../logger';
import settings from '../../settings';
import { getCryptocompareIds } from '../../db/query';

const { scrapeDir } = settings;
const uri = (str, id) => `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`;
const key = (str, id) => `${scrapeDir}/cryptocompare-snapshot/${id}/data.json`;

/**
 *
 * @param {Array} queue
 *
 */
export default async function getJobsSnapshot(queue) {
  try {

    let id;
    let jobs = 0;
    const ids = await getCryptocompareIds();

    for (id of ids) {
      queue.push({
        uri: uri`${id}`,
        key: key`${id}`,
        cacheForDays: 0
      });
      jobs++;
    }

    logger.info(`getJobsSnapshot(): ${jobs} jobs created`);

  }
  catch (error) {

    const message = `getJobsSnapshot(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }
}
