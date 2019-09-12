import logger from '../../logger';
import settings from '../../settings';
import { getCryptocompareIds } from '../../db/query';

const { scrapeDir, cryptocompareApiKey } = settings;
const uri = (str, id) => `https://min-api.cryptocompare.com/data/social/coin/latest?api_key=${cryptocompareApiKey}&coinId=${id}`;
const key = (str, id) => `${scrapeDir}/cryptocompare-social/${id}/data.json`;

/**
 *
 * @param {Array} queue
 *
 */
export default async function getJobsSocial(queue) {

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

    logger.info(`getJobsSocial(): ${jobs} jobs created`);

  }
  catch (error) {

    const message = `getJobsSocial(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
