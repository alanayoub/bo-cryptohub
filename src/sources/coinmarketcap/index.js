import formatterCryptocurrencyListings from './formatter-cryptocurrency-listings.js';
import getJobsCryptocurrencyListings   from './get-jobs-cryptocurrency-listings.js';
import logger from '../../logger';
import settings from '../../settings';

const { scrapeDir } = settings;

const config = {
  cacheFor: settings.cacheForCoinmarketcap,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: 1000 * 60 * 1
};

let cryptocurrencyListings;
{
  cryptocurrencyListings = {
    event: 'data',
    name: 'cmc-listings',
    interval: 1000 * 60 * 1,
    watchDirs: [`${scrapeDir}/coinmarketcap-cryptocurrency-listings/**/*`, 'all'],
    getJobs: getJobsCryptocurrencyListings,
    formatter: formatterCryptocurrencyListings
  };
};

export default {
  config,
  cryptocurrencyListings
}
