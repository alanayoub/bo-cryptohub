'use strict';

import settings         from '../../settings';

import formatterMetrics from './formatter-metrics.js';

import getJobsMetrics   from './get-jobs-metrics.js';

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

export default {
  config,
  metrics,
}
