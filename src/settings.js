// Node
const path = require('path');

// Libs
const argv = require('argv');

// Settings
global.githubClientId = 'c7a2c111a27dee50bba0';
global.githubClientSecret = '5e4b8b348c8165536391bdbf6041685f270503f0';

// Cache for days
// global.cacheForXe = 1;
global.cacheForGitlog = 7;
global.cacheForGithubRepo = 7;
global.cacheForGithubForks = 30;
// global.cacheForCryptocompare = 30;
// global.cacheForCoinmarketcap = 30;
// global.cacheForCoinmarketcapProjectsJson = 1;
// global.cacheForCoinmarketcapProjectHtml = 30;

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

const args = argv.option([
  {
    name: 'local',
    short: 'l',
    type: 'boolean',
    description: 'Changes required to mimic development build locally',
    example: `'script --local=true' or 'script -l true'`
  },
  {
    name: 'logger',
    short: 'L',
    type: 'boolean',
    description: 'Log to console',
    example: `'script --logger=true' or 'script -L true'`
  }
]).run();

const isProd = process.env.NODE_ENV === 'production' && args.options.local !== true;

const cacheDir = isProd
  ? '/home/ubuntu/cryptohub-cache'
  : '/media/alan/Seagate1/code/cryptohub/cache';

const generatedDir = `${cacheDir}/tmp-generated`;
const scrapeDir    = `${cacheDir}/tmp-scrape`;
const dbDir        = `${cacheDir}/db`;

const cryptocompareApiKey = 'b3ad47012cc134911a4775d955ef2b9cf8b85f54d383d81c1bf77338a59b1222';

let columnWhitelist = [

  'cc-total-vol-full-Id',
  'cc-total-vol-full-FullName',
  'cc-total-vol-full-PRICE',
  'cc-total-vol-full-CHANGEPCTDAY',
  'cc-total-vol-full-TOTALVOLUME24HTO',
  'cc-total-vol-full-MKTCAP',
  'cc-total-vol-full-SUPPLY',
  'cc-total-vol-full-ProofType',
  'cc-total-vol-full-Algorithm',
  'cc-total-vol-full-NetHashesPerSecond',
  'cc-total-vol-full-ImageUrl',

  'cc-coinlist-Symbol',

  'cryptohub-price-btc',
  'cryptohub-price-history',
  'cryptohub-numberOfExchanges',
  'cryptohub-numberOfPairs',
  'cryptohub-numberOfFiatPairs',
  'cryptohub-numberOfFiatCurrencies',

  'cryptohub-exchangesListDex',
  'cryptohub-exchangesListAcceptsBoth',
  'cryptohub-exchangesListCryptoOnly',

];

columnWhitelist = [...columnWhitelist, ...columnWhitelist.map(v => v +='-timestamp')];

/**
 *
 *  uriCryptocompareList:
 *    Returns all the coins that CryptoCompare has added to the website
 *
 *  uriCryptocompareExchanges:
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

  debug:                                       true, // TODO: Change this to an env var
  logger:                                      args.options.logger || false,

  //
  // Directories & Paths
  //
  dbDir,
  appRoot:                                     path.resolve(__dirname),
  cacheDir,
  scrapeDir,
  generatedDir,

  //
  // Lists
  //
  columnWhitelist,

  //
  // Cache
  // NOTE: we dont really need this if we are using rate limits. Using it for dev though
  //
  cacheForXe:                                  isProd ? 0 : 1000 * 60 * 10,
  cacheForMessari:                             isProd ? 0 : 1000 * 60 * 10,
  cacheForCryptocompare:                       isProd ? 0 : 1000 * 60 * 10,

  //
  // RateLimits
  //

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
  rateLimitCryptocompare:                      26784,

  // Unknow at the moment
  rateLimitMessari:                            1000 * 60 * 60,

  rateLimitXe:                                 1000 * 60 * 60 * 24,

  //
  // Queues
  //
  queueCoinmarketcap:                          1000 * 60 * 60,

  //
  // Cryptocompare
  //

  tagUriCryptocompareTotalVolFull:              (str, ob) => `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${ob.limit}&tsym=USD&page=${ob.page}`,
  tagKeyCryptocompareTotalVolFull:              (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull/page-${ob.page}.json`,
  tagKeyCryptocompareTotalVolFullGrouped:       (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull-grouped/data.json`,

  uriCryptocompareList:                        'https://min-api.cryptocompare.com/data/all/coinlist',
  keyCryptocompareList:                        `${scrapeDir}/cryptocompare-coinlist/data.json`,

  uriCryptocompareExchangesList:               'https://min-api.cryptocompare.com/data/v2/all/exchanges',
  keyCryptocompareExchangesList:               `${scrapeDir}/cryptocompare-exchanges-list/data.json`,
  uriCryptocompareExchangesGeneral:            `https://min-api.cryptocompare.com/data/exchanges/general?api_key=${cryptocompareApiKey}`,
  keyCryptocompareExchangesGeneral:            `${scrapeDir}/cryptocompare-exchanges-general/data.json`,

  // uriCryptocompareExchangeStatus:              'https://min-api.cryptocompare.com/data/all/cccaggexchanges',
  // keyCryptocompareExchangeStatus:              `${scrapeDir}/cryptocompare-exchange-status/data.json`,

  tagUriCryptocompareTradingInfoSingle:        (str, ob) => `https://min-api.cryptocompare.com/data/generateAvg?fsym=${ob.symbol1}&tsym=${ob.symbol2}&e=${ob.exchange}`,
  tagKeyCryptocompareTradingInfoSingle:        (str, ob) => `${scrapeDir}/cryptocompare-exchange/${ob.exchange}-pairs-${ob.symbol1}-${ob.symbol2}.json`,
  tagKeyCryptocompareTradingInfoSingleGrouped: (str, ob) => `${scrapeDir}/cryptocompare-exchange-grouped/data.json`,

  tagUriCryptocompareTradingInfoMulti:         (str, ob) => `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ob.list1}&tsyms=${ob.list2}&e=${ob.exchange || 'CCCAGG'}`,
  tagKeyCryptocompareTradingInfoMulti:         (str, ob) => `${scrapeDir}/cryptocompare-trading-info-${ob.exchange || 'CCCAGG'}/${ob.cacheKey}.json`,
  tagKeyCryptocompareTradingInfoMultiGrouped:  (str, ob) => `${scrapeDir}/cryptocompare-trading-info-${ob.exchange || 'CCCAGG'}-grouped/data.json`,
  limitsCryptocompareTradingInfoMultiArr1:     300,
  limitsCryptocompareTradingInfoMultiArr2:     100,

  tagUriCryptocompareSnapshot:                 (str, id) => `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`,
  tagKeyCryptocompareSnapshot:                 (str, id) => `${scrapeDir}/cryptocompare-snapshot/${id}.json`,
  tagKeyCryptocompareSnapshotGrouped:          (str, ob) => `${scrapeDir}/cryptocompare-snapshot-grouped/data.json`,

  tagUriCryptocompareSocialstats:              (str, id) => `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`,
  tagKeyCryptocompareSocialstats:              (str, id) => `${scrapeDir}/cryptocompare-socialstats/${id}.json`,
  tagKeyCryptocompareSocialStatsGrouped:       (str, ob) => `${scrapeDir}/cryptocompare-socialstats-grouped/data.json`,

  //
  // Coinmarketcap
  //
  // tagUriCoinmarketcapTicker:                   (str, ob) => `https://api.coinmarketcap.com/v2/ticker/?start=${ob.start || 0}&limit=${ob.limit || 100}&sort=${ob.sort || 'id'}`,
  // tagKeyCoinmarketcapTicker:                   (str, ob) => `/coinmarketcap/ticker/${ob.cacheKey}.json`,
  // tagKeyCoinmarketcapTickerGrouped:            (str, ob) => `/coinmarketcap/ticker-grouped/data.json`,

  // uriCoinmarketcapList:                        'https://api.coinmarketcap.com/v2/listings/',
  // keyCoinmarketcapList:                        '/coinmarketcap/search/coins.json',
  // tagUriCoinmarketcapDetailsJSON:              (str, id) => `https://api.coinmarketcap.com/v2/ticker/${id}/`,
  // tagUriCoinmarketcapDetailsHTML:              (str, id) => `https://coinmarketcap.com/currencies/${id}/`,
  // tagKeyCoinmarketcapDetailsJSON:              (str, id) => `/coinmarketcap/details/${id}.json`,
  // tagKeyCoinmarketcapDetailsHTML:              (str, id) => `/coinmarketcap/details/${id}.html`,

  //
  // XE
  //
  tagUriXeCurrencyTables:                      (str, id) => `https://xe.com/currencytables/?from=${id}`,
  tagKeyXeCurrencyTables:                      (str, id) => `${scrapeDir}/xe-currencytables/${id}.html`,

  //
  // ISO
  //
  uriISO4217CurrencyCodes:                     `${path.resolve(__dirname)}/../iso/4217.txt`,

}

module.exports = settings;
