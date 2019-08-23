'use strict';

import settings                  from '../../settings';

import formatterCoinlist         from './formatter-coinlist.js';
import formatterExchangesList    from './formatter-exchanges-list.js';
import formatterTotalVolFull     from './formatter-total-vol-full.js';
import formatterExchangesGeneral from './formatter-exchanges-general.js';

import getJobsTotalVolFull       from './get-jobs-total-vol-full.js';

import formatterBootstrap        from './formatter-bootstrap.js';

const { scrapeDir } = settings;

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
const rateLimitCryptocompare = 26784;

const config = {
  cacheFor: settings.cacheForCryptocompare,
  bootstrap: formatterBootstrap,
  rateLimitDelayMs: rateLimitCryptocompare,
}

//
// COINLIST
// Get the full list of coins with IDs
//
// TODO: bootstrapData needs to change when coinlist changes!!!!
//
const coinList = {
  event: 'data',
  name: 'coinList',
  interval: 1000 * 30,
  //
  // TODO: can we remove this and just search for the key?
  //
  watchDirs: [`${scrapeDir}/cryptocompare-coinlist/data.json`, 'all'],
  getJobs(queue, bootstrapData) {
    queue.push({
      uri: 'https://min-api.cryptocompare.com/data/all/coinlist',
      key: `${scrapeDir}/cryptocompare-coinlist/data.json`,
      cacheForDays: 0
    });
  },
  formatter: formatterCoinlist
};

//
// EXCHANGES LIST
// Get all the exchanges that CryptoCompare has integrated with
//
// TODO: separate into exchangesList & exchangesGeneral & have 2 formatters, then we don't need the glob
// and we can keep the default data.json
//
const exchangesList = {
  event: 'data,store',
  name: 'exchanges-list',
  interval: 1000 * 60 * 1,
  // TODO: rename this fucking bit, this is where the watcher will look for files to load
  // so if we are saving them in different places they will never be added!
  watchDirs: [settings.keyCryptocompareExchangesList, 'all'],
  getJobs(queue, bootstrapData) {
    queue.push({uri: settings.uriCryptocompareExchangesList, key: settings.keyCryptocompareExchangesList, cacheForDays: 0});
  },
  formatter: formatterExchangesList
};

//
// TOP TOTAL VOLUME
//
const topTotalVolume = {
  event: 'data',
  name: 'totalVolFull',
  interval: 1000 * 30,
  watchDirs: [settings.tagKeyCryptocompareTotalVolFullGrouped`${{}}`, 'all'],
  getJobs: getJobsTotalVolFull,
  handler(oldData, newData) {
    const merged = {...oldData, ...newData};
    return merged;
  },
  formatter: formatterTotalVolFull
};

//
// EXCHANGES GENERAL
//
const exchangesGeneral = {
  event: 'data,store',
  name: 'exchanges-general',
  interval: 1000 * 60 * 60,
  watchDirs: [settings.keyCryptocompareExchangesGeneral, 'all'],
  getJobs(queue, bootstrapData) {
    queue.push({uri: settings.uriCryptocompareExchangesGeneral, key: settings.keyCryptocompareExchangesGeneral, cacheForDays: 0});
  },
  formatter: formatterExchangesGeneral
};

export default {
  config,
  coinList,
  exchangesList,
  topTotalVolume,
  exchangesGeneral,
}
