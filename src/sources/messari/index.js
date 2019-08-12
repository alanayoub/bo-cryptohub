'use strict';

import settings         from '../../settings';

import formatterMetrics from './formatter-metrics.js';
import formatterAssets  from './formatter-assets.js';
import formatterMarkets from './formatter-markets.js';
import formatterPrices  from './formatter-prices.js';

import getJobsMetrics   from './get-jobs-metrics.js';
import getJobsAssets    from './get-jobs-assets.js';
import getJobsMarkets   from './get-jobs-markets.js';
import getJobsPrices    from './get-jobs-prices.js';

const { scrapeDir } = settings;

const config = {
  cacheFor: settings.cacheForMessari,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: settings.rateLimitMessari,
};

const assets = {
  event: 'data',
  name: 'messari-assets',
  interval: 1000 * 30,
  watchDirs: [`${scrapeDir}/messari-assets/**/*`, 'all'],
  getJobs: getJobsAssets,
  formatter: formatterAssets,
};

const metrics = {
  event: 'data',
  name: 'messari-metrics',
  interval: 1000 * 30,
  watchDirs: [`${scrapeDir}/messari-metric/**/*`, 'all'],
  getJobs: getJobsMetrics,
  formatter: formatterMetrics,
};

const markets = {
  event: 'data',
  name: 'messari-markets',
  interval: 1000 * 60 * 60 * 24,
  watchDirs: [`${scrapeDir}/messari-markets/**/*`, 'all'],
  getJobs: getJobsMarkets,
  formatter: formatterMarkets,
};

// Not an official endpoint
const prices = {
  event: 'data',
  name: 'messari-prices',
  interval: 1000 * 60 * 5,
  watchDirs: [`${scrapeDir}/messari-prices/**/*`, 'all'],
  getJobs: getJobsPrices,
  formatter: formatterPrices,
};

export default {
  config,
  prices,
  metrics,
  markets,
  assets,
}
