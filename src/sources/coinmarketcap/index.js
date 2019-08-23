'use strict';

import settings                        from '../../settings';

import formatterCryptocurrencyListings from './formatter-cryptocurrency-listings.js';

const logger = require('../../logger');

const { scrapeDir } = settings;

//
// rateLimitDelayMs: Make sure this domain isnt scrapped more that this limit
//
// interval: How often to execute jobs in the queue but not more than rateLimitDelayMs
//

const config = {
  cacheFor: settings.cacheForCoinmarketcap,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: 1000 * 60 * 60,
};

const cryptocurrencyListings = {
  event: 'data',
  name: 'cmc-listings',
  interval: 1000 * 60 * 60,
  watchDirs: [`${scrapeDir}/coinmarketcap-cryptocurrency-listings/**/*`, 'all'],
  getJobs: (queue, bootstrapData, appBootstrapData) => {
    queue.push({
      uri: settings.uriCoinmarketcapCryptocurrencyListings,
      key: settings.keyCoinmarketcapCryptocurrencyListings,
      cacheForDays: 30
    });
    logger.info(`getJobsCryptocurrencyListings(): 1 job created`);
  },
  formatter: formatterCryptocurrencyListings,
};

export default {
  config,
  cryptocurrencyListings,
}
