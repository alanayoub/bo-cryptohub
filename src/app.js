// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');

// CryptoHub
require('./db-connect');
const Cache = require('./cache');
const logger = require('./logger');
const hashFiles = require('./tasks/hash-files');
const cloneRepos = require('./tasks/clone-repos');
const getLogData = require('./tasks/get-log-data');
const syncCommits = require('./tasks/sync-commits');
const getRepoData = require('./tasks/get-repo-data');
const getForkData = require('./tasks/get-fork-data');
const setFirstCommit = require('./tasks/set-first-commit');
const scrapeCoinmarketcap = require('./tasks/scrape-coinmarketcap');
const scrapeOtherStuff = require('./tasks/scrape-otherstuff');

// Settings
global.cache = new Cache('cache', true);
global.githubClientId = 'c7a2c111a27dee50bba0';
global.githubClientSecret = '5e4b8b348c8165536391bdbf6041685f270503f0';

// Cache for days
global.cacheForGitlog = 7;
global.cacheForGithubRepo = 7;
global.cacheForGithubForks = 30;
global.cacheForCryptoCompare = 30;
global.cacheForCoinmarketcapProjectsJson = 1;
global.cacheForCoinmarketcapProjectHtml = 30;

// Leave in execution order
global.settingsScrapeOtherStuff = true;
// global.settingsScrapeCoinmarketcap = true;
// global.settingsGetRepoData = true;
// global.settingsCloneRepos = true;
// global.settingsGetLogData = true;
// global.settingsGetForkData = true;
// global.settingsSetFirstCommit = true;
// global.settingsSyncCommits = true;
// global.settingsHashFiles = true;

// Stuff we found while parsing the data
global.notes = [];

process.on('warning', error => {
  debugger;
  logger.warn(error.stack);
});

//
// Github:
// BAT: https://github.com/brave-intl?utf8=%E2%9C%93&q=&type=&language=
// FUN: https://github.com/funfair-tech
// KIN: https://github.com/kinecosystem
// GAS: https://github.com/neo-project
// PAY: https://github.com/tenx-tech
// ANT: https://github.com/aragon/aragon-network-token
// GNO: https://github.com/gnosis
//
// Bitbucket :/
// Ardor: https://bitbucket.org/Jelurida/ardor/src
// NXT: https://bitbucket.org/JeanLucPicard/nxt/src
//

//
// TODO:
// add overrides for extra repos, like bitcoin cash
// 'bitcoin-cash': ['https://github.com/Bitcoin-ABC/bitcoin-abc']
//

(async function doStuffYo() {

  try {

    // const regex = /litecoin\/litecoin$|bitcoin\/bitcoin$|reddcoin\/reddcoin$/;
    const regex = /.*/;
    let error;

    // Scrape Other stuff
    if (global.settingsScrapeOtherStuff) {
      [error] = await to(scrapeOtherStuff({requestLimit: 999999, requestDelay: 2000}));
      if (error) throw new Error(error);
    }

    // Scrape Coinmarketcap
    // Get list of projects and links to their Githubs
    if (global.settingsScrapeCoinmarketcap) {
      [error] = await to(scrapeCoinmarketcap({requestLimit: 5000, requestDelay: 2000}));
      if (error) throw new Error(error);
    }

    // Itterate Coinmarketcap projects
    // Fetch all Github repos for each project
    if (global.settingsGetRepoData) {
      [error] = await to(getRepoData());
      if (error) throw new Error(error);
    }

    // Clone all repos
    if (global.settingsCloneRepos) {
      [error] = await to(cloneRepos(regex));
      if (error) throw new Error(error);
    }

    // For each repo checkout the latest commit on the default branch and save the log
    if (global.settingsGetLogData) {
      [error] = await to(getLogData(regex));
      if (error) throw new Error(error);
    }

    // Get forks list for each repo
    // Set repo.forkedFrom fields
    if (global.settingsGetForkData) {
      [error] = await to(getForkData(regex));
      if (error) throw new Error(error);
    }

    // Set repo.firstCommit (the first 'real' commit based on fork data & logs)
    if (global.settingsSetFirstCommit) {
      [error] = await to(setFirstCommit());
      if (error) throw new Error(error);
    }

    // Make sure every repo is at repo.commit (the last processed commit) on repo.defaultBranch
    if (global.settingsSyncCommits) {
      [error] = await to(syncCommits(regex));
      if (error) throw new Error(error);
    }

    // Continue hashing files from repo.commit onwards
    if (global.settingsHashFiles) {
      [error] = await to(hashFiles(regex));
      if (error) throw new Error(error);
    }

  }
  catch(error) {
    logger.error(`Um some error happened yo: ${error}`);
    process.exit(1);
  }

  process.exit(0);

})();
