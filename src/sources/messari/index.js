import formatterMetrics      from './formatter-metrics.js';
import formatterAssets       from './formatter-assets.js';
import formatterMarkets      from './formatter-markets.js';
import formatterPrices       from './formatter-prices.js';

import settings              from '../../settings';
import logger                from '../../logger';
import { getMessariSymbols } from '../../db/query';

const { scrapeDir } = settings;

// Messari api rate limit unknow at the moment
const rateLimit = 1000 * 10;

const config = {
  cacheFor: settings.cacheForMessari,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: rateLimit
};

let assets;
{
  const uri = 'https://data.messari.io/api/v1/assets?with-metrics';
  const key = `${scrapeDir}/messari-assets-with-metric/data.json`;
  assets = {
    event: 'data',
    name: 'messari-assets',
    interval: 1000 * 30,
    watchDirs: [`${scrapeDir}/messari-assets/**/*`, 'all'],
    async getJobs(queue) {
      queue.push({
        uri, key,
        cacheForDays: settings.cacheForMessari
      });
      logger.info('getJobs messari assets: 1 asset jobs created');
    },
    formatter: formatterAssets
  };
};

let metrics;
{
  const uri = (str, id) => `https://data.messari.io/api/v1/assets/${id}/metrics`;
  const key = (str, id) => `${scrapeDir}/messari-metric/${id}/data.json`;
  metrics = {
    event: 'data',
    name: 'messari-metrics',
    interval: 1000 * 10,
    watchDirs: [`${scrapeDir}/messari-metric/**/*`, 'all'],
    async getJobs(queue) {
      let jobs = 0;
      let symbol;
      const symbols = await getMessariSymbols();
      for (symbol of symbols) {
        queue.push({
          uri: uri`${symbol}`,
          key: key`${symbol}`,
          cacheForDays: settings.cacheForMessari
        });
        jobs++;
      }
      logger.info(`getJobs messari metrics: ${jobs} metrics jobs created`);
    },
    formatter: formatterMetrics
  };
};

let markets;
{
  const uri = 'https://data.messari.io/api/v1/markets';
  const key = `${settings.scrapeDir}/messari-markets/data.json`;
  markets = {
    event: 'data',
    name: 'messari-markets',
    interval: 1000 * 60 * 60 * 24,
    watchDirs: [`${scrapeDir}/messari-markets/**/*`, 'all'],
    async getJobs(queue) {
      queue.push({
        uri, key,
        cacheForDays: settings.cacheForMessari
      });
      logger.info('getJobs messari markets: 1 markets jobs created');
    },
    formatter: formatterMarkets
  };
};

// Not an official endpoint
let prices;
{
  const uri = 'https://data.messari.io/api/v1/markets/prices-legacy';
  const key = `${scrapeDir}/messari-prices/data.json`;
  prices = {
    event: 'data',
    name: 'messari-prices',
    interval: 1000 * 60 * 5,
    watchDirs: [`${scrapeDir}/messari-prices/**/*`, 'all'],
    async getJobs(queue) {
      queue.push({
        uri, key,
        cacheForDays: settings.cacheForMessari
      });
      logger.info('getJobs messari prices: 1 prices jobs created');
    },
    formatter: formatterPrices
  };
};

export default {
  config,
  prices,
  metrics,
  markets,
  assets
}
