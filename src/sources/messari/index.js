'use strict';

import settings         from '../../settings';

import formatterMetrics from './formatter-metrics.js';
import formatterMarkets from './formatter-markets.js';

import getJobsMetrics   from './get-jobs-metrics.js';
import getJobsMarkets   from './get-jobs-markets.js';

const { scrapeDir } = settings;

const config = {
  cacheFor: settings.cacheForMessari,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: settings.rateLimitMessari,
};

const metrics = {
  event: 'data',
  name: 'messari-metrics',
  interval: 1000 * 5,
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

export default {
  config,
  metrics,
  markets,
}
