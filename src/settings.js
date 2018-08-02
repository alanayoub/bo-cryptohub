// Node
const path = require('path');

// cryptoHub
const Cache = require('./cache');

// Settings
global.cache = new Cache('cache', true);
global.githubClientId = 'c7a2c111a27dee50bba0';
global.githubClientSecret = '5e4b8b348c8165536391bdbf6041685f270503f0';

// Cache for days
global.cacheForXe = 1;
global.cacheForGitlog = 7;
global.cacheForGithubRepo = 7;
global.cacheForGithubForks = 30;
global.cacheForCryptocompare = 30;
global.cacheForCoinmarketcapProjectsJson = 1;
global.cacheForCoinmarketcapProjectHtml = 30;

// Leave in execution order
global.settingsScrapeCryptocompare = true;
global.settingsScrapeCoinmarketcap = false;
global.settingsScrapeXe = false;
// global.settingsGetRepoData = true;
// global.settingsCloneRepos = true;
// global.settingsGetLogData = true;
// global.settingsGetForkData = true;
// global.settingsSetFirstCommit = true;
// global.settingsSyncCommits = true;
// global.settingsHashFiles = true;

// Stuff we found while parsing the data
global.notes = [];

// Bitbucket :/
// Ardor: https://bitbucket.org/Jelurida/ardor/src
// NXT: https://bitbucket.org/JeanLucPicard/nxt/src
global.githubOverrides = {
  'gas':                   'https://github.com/neo-project',
  'kin':                   'https://github.com/kinecosystem',
  'tenx':                  'https://github.com/tenx-tech',
  'gnosis':                'https://github.com/gnosis',
  'aragon':                'https://github.com/aragon/aragon-network-token',
  'funfair':               'https://github.com/funfair-tech',
  'basic-attention-token': 'https://github.com/brave-intl',
}

/**
 *
 *  uriCryptocompareList:
 *    Returns all the coins that CryptoCompare has added to the website
 *
 *  uriCryptocompareExchanges:
 *    Returns all the exchanges that CryptoCompare has integrated with
 *
 *  uriCryptocompareExchangeStatus:
 *    Returns all the exchanges that CryptoCompare has integrated with and their status,
 *    including whether or not they are excluded from pricing and volumes
 *
 *  tagUriCryptocompareTradingInfoSingle:
 *    Compute the current trading info (price, vol, open, high, low etc) of the
 *    requested pair as a volume weighted average based on the exchanges requested
 *
 *
 *
 *  tagUriCryptocompareSnapshot:
 *    Get the general, subs (used to connect to the streamer and to figure out what exchanges we have
 *    data for and what are the exact coin pairs of the coin) and the aggregated prices for all pairs available
 *
 *  tagUriCryptocompareSocialstats:
 *    Get CryptoCompare website, Facebook, code repository, Twitter and Reddit data for coins
 *    If called with the id of a cryptopian you just get data from Cryptocompare website that is available to the public
 *
 */
const settings = {

  debug: true, // TODO: Change this to an env var
  appRoot: path.resolve(__dirname),

  // Cache
  cache: new Cache('cache', true),

  // Queues: rateLimit
  queueCryptocompare: 100,
  queueCoinmarketcap: 1000 * 60 * 60,

  // Cryptocompare
  uriCryptocompareList:           'https://min-api.cryptocompare.com/data/all/coinlist',
  keyCryptocompareList:           '/cryptocompare/coinlist/coinlist.json',
  uriCryptocompareExchanges:      'https://min-api.cryptocompare.com/data/all/exchanges',
  keyCryptocompareExchanges:      '/cryptocompare/exchanges/exchanges.json',
  uriCryptocompareExchangeStatus: 'https://min-api.cryptocompare.com/data/all/cccaggexchanges',
  keyCryptocompareExchangeStatus: '/cryptocompare/exchange/status.json',

  tagUriCryptocompareTradingInfoSingle:        (str, ob) => `https://min-api.cryptocompare.com/data/generateAvg?fsym=${ob.symbol1}&tsym=${ob.symbol2}&e=${ob.exchange}`,
  tagKeyCryptocompareTradingInfoSingle:        (str, ob) => `/cryptocompare/exchange/${ob.exchange}/pairs/${ob.symbol1}-${ob.symbol2}.json`,
  tagKeyCryptocompareTradingInfoSingleGrouped: (str, ob) => `/cryptocompare/exchange-grouped/data.json`,

  tagUriCryptocompareTradingInfoMulti:         (str, ob) => `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ob.list1}&tsyms=${ob.list2}&e=${ob.exchange || 'CCCAGG'}`,
  tagKeyCryptocompareTradingInfoMulti:         (str, ob) => `/cryptocompare/trading-info/${ob.exchange || 'CCCAGG'}/${ob.cacheKey}.json`,
  tagKeyCryptocompareTradingInfoMultiGrouped:  (str, ob) => `/cryptocompare/trading-info/${ob.exchange || 'CCCAGG'}-grouped/data.json`,
  limitsCryptocompareTradingInfoMultiArr1: 300,
  limitsCryptocompareTradingInfoMultiArr2: 100,

  tagUriCryptocompareSnapshot:      (str, id) => `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`,
  tagKeyCryptocompareSnapshot:      (str, id) => `/cryptocompare/snapshot/${id}.json`,
  tagUriCryptocompareSocialstats:   (str, id) => `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`,
  tagKeyCryptocompareSocialstats:   (str, id) => `/cryptocompare/socialstats/${id}.json`,

  // Coinmarketcap
  uriCoinmarketcapList:                          'https://api.coinmarketcap.com/v2/listings/',
  keyCoinmarketcapList:                          '/coinmarketcap/search/coins.json',
  tagUriCoinmarketcapDetailsJSON:   (str, id) => `https://api.coinmarketcap.com/v2/ticker/${id}/`,
  tagUriCoinmarketcapDetailsHTML:   (str, id) => `https://coinmarketcap.com/currencies/${id}/`,
  tagKeyCoinmarketcapDetailsJSON:   (str, id) => `/coinmarketcap/details/${id}.json`,
  tagKeyCoinmarketcapDetailsHTML:   (str, id) => `/coinmarketcap/details/${id}.html`,

  // Cryptohub
  keyCryptohubAnalytics:                         '/cryptohub/analytics/data.json',

  // XE
  tagUriXeCurrencyTables:           (str, id) => `https://xe.com/currencytables/?from=${id}`,
  tagKeyXeCurrencyTables:           (str, id) => `/xe/currencytables/${id}.html`,

  // ISO
  uriISO4217CurrencyCodes: `${path.resolve(__dirname)}/../iso/4217.txt`,

}

module.exports = settings;
