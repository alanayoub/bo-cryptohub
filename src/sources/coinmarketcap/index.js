import formatterCryptocurrencyListings from './formatter-cryptocurrency-listings.js';
import logger from '../../logger';
import settings from '../../settings';

const { scrapeDir, coinmarketcapApiKey } = settings;

const config = {
  cacheFor: settings.cacheForCoinmarketcap,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: 1000 * 60 * 60
};

let cryptocurrencyListings;
{
  const uri = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${coinmarketcapApiKey}&start=1&limit=1000&convert=USD`;
  const key = `${scrapeDir}/coinmarketcap-cryptocurrency-listings/data.json`;
  cryptocurrencyListings = {
    event: 'data',
    name: 'cmc-listings',
    interval: 1000 * 60 * 60,
    watchDirs: [`${scrapeDir}/coinmarketcap-cryptocurrency-listings/**/*`, 'all'],
    getJobs: (queue) => {
      queue.push({
        uri, key,
        cacheForDays: 30
      });
      logger.info('getJobsCryptocurrencyListings(): 1 job created');
    },
    formatter: formatterCryptocurrencyListings
  };
};

export default {
  config,
  cryptocurrencyListings
}
