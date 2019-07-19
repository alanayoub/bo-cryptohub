'use strict';

import settings                        from '../../settings';

import formatterCryptocurrencyListings from './formatter-cryptocurrency-listings.js';

const logger = require('../../logger');

const { scrapeDir } = settings;

const config = {
  cacheFor: settings.cacheForCoinmarketcap,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: settings.rateLimitCoinmarketcap,
};

const cryptocurrencyListings = {
  event: 'data',
  name: 'cmc-listings',
  interval: 1000 * 5,
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
