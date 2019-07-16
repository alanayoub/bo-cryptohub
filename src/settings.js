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
  : path.join(__dirname, '/../cache');

const generatedDir = `${cacheDir}/tmp-generated`;
const scrapeDir    = `${cacheDir}/tmp-scrape`;
const dbDir        = `${cacheDir}/db`;

const coinmarketcapApiKey = '84e034e2-3972-47eb-9349-5e4dc20211cd';
const cryptocompareApiKey = 'b3ad47012cc134911a4775d955ef2b9cf8b85f54d383d81c1bf77338a59b1222';

let fieldWhitelist = [

  'cc-total-vol-full-Id',
  'cc-total-vol-full-FullName',
  'cc-total-vol-full-PRICE',
  'cc-total-vol-full-PRICE:last',
  'cc-total-vol-full-CHANGEPCTDAY',
  'cc-total-vol-full-TOTALVOLUME24HTO',
  'cc-total-vol-full-TOTALVOLUME24HTO:last',
  'cc-total-vol-full-MKTCAP',
  'cc-total-vol-full-MKTCAP:last',
  'cc-total-vol-full-SUPPLY',
  'cc-total-vol-full-ProofType',
  'cc-total-vol-full-Algorithm',
  'cc-total-vol-full-NetHashesPerSecond',
  'cc-total-vol-full-ImageUrl',

  'cc-coinlist-Symbol',

  'm-metrics-sectors',
  // 'm-metrics-categories',
  // 'm-metrics-date-created',
  'm-metrics-ath-price',
  // 'm-metrics-ath-date',
  // 'm-metrics-ath-days',
  'm-metrics-ath-percent-down',
  // 'm-metrics-ath-breakeven-multiple',
  'm-metrics-cycle-low-price',
  // 'm-metrics-cycle-low-data',
  // 'm-metrics-cycle-low-percent-up',
  // 'm-metrics-cycle-low-days-since',
  // 'm-metrics-percent-change-last-1-week',
  // 'm-metrics-percent-change-last-1-month',
  // 'm-metrics-percent-change-last-3-months',
  // 'm-metrics-percent-change-last-1-year',
  'm-metrics-percent-change-btc-last-1-week',
  'm-metrics-percent-change-btc-last-1-month',
  'm-metrics-percent-change-btc-last-3-months',
  'm-metrics-percent-change-btc-last-1-year',

  'cryptohub-price-btc',
  'cryptohub-price-btc:last',
  'cryptohub-price-history',
  'cryptohub-numberOfExchanges',
  'cryptohub-numberOfPairs',
  'cryptohub-numberOfFiatPairs',
  'cryptohub-numberOfFiatCurrencies',

  'cryptohub-exchangesListDex',
  'cryptohub-exchangesListAcceptsBoth',
  'cryptohub-exchangesListCryptoOnly',

  'm-metrics-price-usd',
  'm-metrics-price-btc',
  'm-metrics-volume-last-24-hours',
  'm-metrics-volume-last-24-hours:last',
  'm-metrics-real-volume-last-24-hours',
  'm-metrics-real-volume-last-24-hours:last',
  'm-metrics-percent-change-usd-last-24-hours',
  'm-metrics-percent-change-btc-last-24-hours',

  'm-metrics-current-marketcap-usd',
  'm-metrics-current-marketcap-usd:last',
  'm-metrics-y-2050-marketcap-usd',
  'm-metrics-y-2050-marketcap-usd:last',

  'cmc-listings-circulating_supply',
  'cmc-listings-cmc_rank',
  'cmc-listings-date_added',
  'cmc-listings-id',
  'cmc-listings-last_updated',
  'cmc-listings-max_supply',
  'cmc-listings-name',
  'cmc-listings-num_market_pairs',
  'cmc-listings-tags',
  'cmc-listings-total_supply',
  'cmc-listings-market_cap',
  'cmc-listings-market_cap:last',
  'cmc-listings-percent_change_1h',
  'cmc-listings-percent_change_7d',
  'cmc-listings-percent_change_24h',
  'cmc-listings-volume_24h',
  'cmc-listings-volume_24h:last',

];

// Keep the last value of each of these fields
// in a new field with the suffix `:last`
// This is used to show changes in values
const fieldLastValue = [

  'cc-total-vol-full-PRICE',
  'cryptohub-price-btc',

  // Volume
  'cc-total-vol-full-TOTALVOLUME24HTO',
  'cmc-listings-volume_24h',
  'm-metrics-real-volume-last-24-hours',
  'm-metrics-volume-last-24-hours',

  // Marketcap
  'cc-total-vol-full-MKTCAP',
  'cmc-listings-market_cap',
  'm-metrics-current-marketcap-usd',
  'm-metrics-y-2050-marketcap-usd',

];

fieldWhitelist = [...fieldWhitelist, ...fieldWhitelist.map(v => v +='-timestamp')];

const columnDependencies = {

  //
  // Binary Overdose
  // NOTE: Always send fields in rowIndex
  //
  rowIndex: [
    'rowIndex',
    'cc-total-vol-full-Id',
    'cc-total-vol-full-CHANGEPCTDAY',
  ],
  priceBTC: [
    'cryptohub-price-btc',
  ],
  sparklineUSD: [
    'cryptohub-price-history',
  ],
  numberOfExchanges: [
    'cryptohub-numberOfExchanges',
    'cryptohub-exchangesListDex',
    'cryptohub-exchangesListCryptoOnly',
    'cryptohub-exchangesListAcceptsBoth',
    'cryptohub-numberOfPairs',
    // 'cryptohub-exchangesListFiatOnly',
    // 'cryptohub-numberOfFiatCurrencies',
    // 'cryptohub-numberOfFiatPairs',
    // 'cryptohub-numberOfDex',
  ],
  numberOfPairs: [
    'cryptohub-numberOfPairs',
  ],
  numberOfFiatPairs: [
    'cryptohub-numberOfFiatPairs',
  ],
  numberOfFiatCurrencies: [
    'cryptohub-numberOfFiatCurrencies',
  ],

  //
  // CryptoCompare
  //
  nameCC: [
    'cc-total-vol-full-FullName',
    'cc-coinlist-Symbol',
    'cc-total-vol-full-ImageUrl',
  ],
  priceUSDCC: [
    'cc-total-vol-full-PRICE',
  ],
  percentChange24hUSDCC: [
    'cc-total-vol-full-CHANGEPCTDAY',
  ],
  volume24hUSDCC: [
    'cc-total-vol-full-TOTALVOLUME24HTO',
  ],
  marketcapUSDCC: [
    'cc-total-vol-full-MKTCAP',
  ],
  circulatingSupplyCC: [
    'cc-total-vol-full-SUPPLY',
  ],
  proofTypeCC: [
    'cc-total-vol-full-ProofType',
  ],
  algoCC: [
    'cc-total-vol-full-Algorithm',
  ],
  hashesPerSecondCC: [
    'cc-total-vol-full-NetHashesPerSecond',
  ],


  //
  // CoinMarketCap
  //
  marketcapUSDCMC: [
    'cmc-listings-market_cap',
  ],
  volume24HourCMC: [
    'cmc-listings-volume_24h',
  ],
  circulatingSupplyCMC: [
    'cmc-listings-circulating_supply',
  ],
  percentChange24HourCMC: [
    'cmc-listings-percent_change_24h',
  ],
  percentChange7DayCMC: [
    'cmc-listings-percent_change_7d',
  ],

  //
  // Messari
  //
  sectorsMessari: [
    'm-metrics-sectors',
  ],
  athUSDMessari: [
    'm-metrics-ath-price',
  ],
  athPercentDownUSDMessari: [
    'm-metrics-ath-percent-down',
  ],
  cycleLowUSDMessari: [
    'm-metrics-cycle-low-price',
  ],
  percentChange7dBTCMessari: [
    'm-metrics-percent-change-btc-last-1-week',
  ],
  percentChange1mBTCMessari: [
    'm-metrics-percent-change-btc-last-1-month',
  ],
  percentChange3mBTCMessari: [
    'm-metrics-percent-change-btc-last-3-months',
  ],
  percentChange1yBTCMessari: [
    'm-metrics-percent-change-btc-last-1-year',
  ],
  priceUSDMessari: [
    'm-metrics-price-usd',
  ],
  priceBTCMessari: [
    'm-metrics-price-btc',
  ],
  volume24hUSDMessari: [
    'm-metrics-volume-last-24-hours',
  ],
  realVolume24hUSDMessari: [
    'm-metrics-real-volume-last-24-hours',
  ],
  percentChange24hUSDMessari: [
    'm-metrics-percent-change-usd-last-24-hours',
  ],
  percentChange24hBTCMessari: [
    'm-metrics-percent-change-btc-last-24-hours',
  ],
  marketcapUSDMessari: [
    'm-metrics-current-marketcap-usd',
  ],
  marketcapUSD2050Messari: [
    'm-metrics-y-2050-marketcap-usd',
  ],
}

// Add timestamp fields to each dependency and :last field to specific ones
{
  let copy;
  for (const values of Object.values(columnDependencies)) {
    copy = [];
    for (const field of values) {
      copy.push(`${field}-timestamp`);
      if (fieldLastValue.includes(field)) {
        copy.push(`${field}:last`);
      }
    }
    values = values.push(...copy);
  }
}

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

  //
  // App settings
  //
  debug:                                       true, // TODO: Change this to an env var
  logger:                                      args.options.logger || false,
  maxRowsTemplatedIn:                          50,
  maxRecordsScraped:                           600,

  // The diff-json library has a bug where null field throw an error on add.
  // For now we are just not going to send null fields, lightens the load anyhow.
  removeNullFields: true,

  //
  // Directories & Paths
  //
  dbDir,
  appRoot:                                     path.resolve(__dirname),
  cacheDir,
  scrapeDir,
  generatedDir,

  columnDependencies,

  //
  // Lists
  //
  fieldWhitelist,
  fieldLastValue,

  //
  // Cache
  // NOTE: we dont really need this if we are using rate limits. Using it for dev though
  //
  cacheForXe:                                  isProd ? 0 : 1000 * 60 * 10,
  cacheForMessari:                             isProd ? 0 : 1000 * 60 * 10,
  cacheForCryptocompare:                       isProd ? 0 : 1000 * 60 * 10,
  cacheForCoinmarketcap:                       isProd ? 0 : 1000 * 60 * 60 * 24,

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
  rateLimitMessari:                            1000 * 10,

  //
  // Based on credits so need to implement checks
  //
  // For cryptocurrency listings its 1 credit per 200 results
  //
  rateLimitCoinmarketcap:                      1000 * 60 * 60,

  rateLimitXe:                                 1000 * 60 * 60 * 24,

  //
  // Queues
  //
  queueCoinmarketcap:                          1000 * 60 * 60,

  //
  // Messari
  //
  tagUriMessariMetrics:                        (str, id) => `https://data.messari.io/api/v1/assets/${id}/metrics`,
  tagKeyMessariMetrics:                        (str, id) => `${scrapeDir}/messari-metric/${id}/data.json`,
  tagKeyMessariMetricsGrouped:                 (str, ob) => `${scrapeDir}/messari-metric-grouped/data.json`,

  //
  // Cryptocompare
  //

  tagUriCryptocompareTotalVolFull:             (str, ob) => `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${ob.limit}&tsym=USD&page=${ob.page}`,
  tagKeyCryptocompareTotalVolFull:             (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull/page-${ob.page}.json`,
  tagKeyCryptocompareTotalVolFullGrouped:      (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull-grouped/data.json`,

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

  uriCoinmarketcapCryptocurrencyListings: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${coinmarketcapApiKey}&start=1&limit=1000&convert=USD`,
  keyCoinmarketcapCryptocurrencyListings: `${scrapeDir}/coinmarketcap-cryptocurrency-listings/data.json`,

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
