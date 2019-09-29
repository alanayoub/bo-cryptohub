import formatterSocial           from './formatter-social.js';
import formatterCoinlist         from './formatter-coinlist.js';
import formatterBootstrap        from './formatter-bootstrap.js';
import formatterTotalVolFull     from './formatter-total-vol-full.js';
import formatterExchangesList    from './formatter-exchanges-list.js';
import formatterExchangesGeneral from './formatter-exchanges-general.js';

import getJobsSocial             from './get-jobs-social.js';
import getJobsTotalVolFull       from './get-jobs-total-vol-full.js';

import settings                  from '../../settings';
import logger                    from '../../logger';

const { scrapeDir, cryptocompareApiKey } = settings;

const config = {
  cacheFor: settings.cacheForCryptocompare,
  bootstrap: formatterBootstrap,
  //
  // From cryptocompare.com:
  //   Caching: 10 seconds
  //   Rate limits:
  //     Month  - 100000
  //     Day    - 3200
  //     Hour   - 130
  //     Minute - 2
  //     Second - 0.038
  //
  //  26784 ms between requests :(
  //
  rateLimitDelayMs: 26784
}

//
// COINLIST
// Get the full list of coins with IDs
//
let coinList;
{
  const uri = 'https://min-api.cryptocompare.com/data/all/coinlist';
  const key = `${scrapeDir}/cryptocompare-coinlist/data.json`;
  coinList = {
    event: 'data',
    name: 'coinList',
    interval: 1000 * 60 * 60 * 24,
    //
    // TODO: can we remove this and just search for the key?
    //
    watchDirs: [`${scrapeDir}/cryptocompare-coinlist/data.json`, 'all'],
    getJobs(queue) {
      queue.push({uri, key, cacheForDays: 0});
      logger.info('getJobs Cryptocompare coinList: 1 coinList job created');
    },
    formatter: formatterCoinlist
  };
};

//
// EXCHANGES LIST
// Get all the exchanges that CryptoCompare has integrated with
//
// TODO: separate into exchangesList & exchangesGeneral & have 2 formatters, then we don't need the glob
// and we can keep the default data.json
//
let exchangesList;
{
  const uri = 'https://min-api.cryptocompare.com/data/v2/all/exchanges';
  const key = `${scrapeDir}/cryptocompare-exchanges-list/data.json`;
  exchangesList = {
    event: 'data,store',
    name: 'exchanges-list',
    interval: 1000 * 60 * 60 * 24,
    // TODO: rename this fucking bit, this is where the watcher will look for files to load
    // so if we are saving them in different places they will never be added!
    watchDirs: [key, 'all'],
    getJobs(queue) {
      queue.push({uri, key, cacheForDays: 0});
      logger.info('getJobs Cryptocompare exchangeList: 1 exchangeList job created');
    },
    formatter: formatterExchangesList
  };
};

//
// TOP TOTAL VOLUME
//
let topTotalVolume;
{
  const key = (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull-grouped/data.json`;
  topTotalVolume = {
    event: 'data',
    name: 'totalVolFull',
    interval: 1000 * 30,
    watchDirs: [key`${{}}`, 'all'],
    getJobs: getJobsTotalVolFull,
    handler(oldData, newData) {
      const merged = {...oldData, ...newData};
      return merged;
    },
    formatter: formatterTotalVolFull
  };
};

//
// EXCHANGES GENERAL
//
let exchangesGeneral;
{
  const uri = `https://min-api.cryptocompare.com/data/exchanges/general?api_key=${cryptocompareApiKey}`;
  const key = `${scrapeDir}/cryptocompare-exchanges-general/data.json`;
  exchangesGeneral = {
    event: 'data,store',
    name: 'exchanges-general',
    interval: 1000 * 60 * 60 * 24,
    watchDirs: [key, 'all'],
    getJobs(queue) {
      queue.push({uri, key, cacheForDays: 0});
      logger.info('getJobs Cryptocompare exchangeGeneral: 1 exchangeGeneral job created');
    },
    formatter: formatterExchangesGeneral
  };
};

//
// SOCIAL
//
let social;
{
  const key = (str, ob) => `${scrapeDir}/cryptocompare-social-grouped/data.json`;
  social = {
    event: 'data',
    name: 'social',
    interval: 1000 * 30,
    watchDirs: [key`${{}}`, 'all'],
    getJobs: getJobsSocial,
    formatter: formatterSocial
  };
};

export default {
  config,
  social,
  coinList,
  exchangesList,
  topTotalVolume,
  exchangesGeneral
}
