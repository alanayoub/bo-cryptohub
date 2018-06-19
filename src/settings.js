const Cache = require('./cache');

// Settings
global.cache = new Cache('cache', true);
global.githubClientId = 'c7a2c111a27dee50bba0';
global.githubClientSecret = '5e4b8b348c8165536391bdbf6041685f270503f0';

// Cache for days
global.cacheForGitlog = 7;
global.cacheForGithubRepo = 7;
global.cacheForGithubForks = 30;
global.cacheForCryptocompare = 30;
global.cacheForCoinmarketcapProjectsJson = 1;
global.cacheForCoinmarketcapProjectHtml = 30;

// Leave in execution order
global.settingsScrapeCryptocompare = true;
global.settingsScrapeCoinmarketcap = true;
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

const Settings = {

  // Cache
  cache: new Cache('cache', true),

  // Cryptocompare
  uriCryptocompareList:                        'https://min-api.cryptocompare.com/data/all/coinlist',
  keyCryptocompareList:                        '/cryptocompare/coinlist/coinlist.json',
  tagUriCryptocompareSnapshot:    (str, id) => `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`,
  tagKeyCryptocompareSnapshot:    (str, id) => `/cryptocompare/snapshot/${id}.json`,
  tagUriCryptocompareSocialstats: (str, id) => `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`,
  tagKeyCryptocompareSocialstats: (str, id) => `/cryptocompare/socialstats/${id}.json`,

  // Coinmarketcap
  uriCoinmarketcapList:                        'https://api.coinmarketcap.com/v2/listings/',
  keyCoinmarketcapList:                        '/coinmarketcap/search/coins.json',
  tagUriCoinmarketcapDetailsJSON: (str, id) => `https://api.coinmarketcap.com/v2/ticker/${id}/`,
  tagUriCoinmarketcapDetailsHTML: (str, id) => `https://coinmarketcap.com/currencies/${id}/`,
  tagKeyCoinmarketcapDetailsJSON: (str, id) => `/coinmarketcap/details/${id}.json`,
  tagKeyCoinmarketcapDetailsHTML: (str, id) => `/coinmarketcap/details/${id}.html`,

  // Cryptohub
  keyCryptohubAnalytics:                       '/cryptohub/analytics/data.txt',
}

module.exports = Settings;
