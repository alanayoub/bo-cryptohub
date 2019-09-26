import logger from '../../logger';
import settings from '../../settings';

const { scrapeDir, coinmarketcapApiKey } = settings;

const uri = (str, ob) => `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${coinmarketcapApiKey}&start=${ob.page}&limit=${ob.limit}&convert=USD`;
const key = (str, ob) => `${scrapeDir}/coinmarketcap-cryptocurrency-listings/page-${ob.page}.json`;
const tagGroup = (str, ob) => `${scrapeDir}/coinmarketcap-cryptocurrency-listings/data.json`;

/**
 *
 * @param {Array} queue
 *
 */
export default async function getJobsCryptocurrencyListings(queue) {
  try {

    let page = 1;
    let jobs = 0;
    const limit = 1000;
    const maxPages = 3;
    const groupKey = tagGroup`${{}}`;

    while (page < maxPages) {
      const data = {
        limit, page
      };
      queue.push({
        uri: uri`${data}`,
        key: key`${data}`,
        cacheForDays: 0
      });
      jobs++;
      page++;
    }

    logger.info(`getJobsCryptocurrencyListings(): ${jobs} jobs created`);

  }
  catch (error) {
    const message = `getJobs Coinmarketcap Cryptocurrency Listings: ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
