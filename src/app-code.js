// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');

// CryptoHub
require('./settings');
require('./db-connect');
const logger = require('./logger');
const hashFiles = require('./tasks/hash-files');
const cloneRepos = require('./tasks/clone-repos');
const getLogData = require('./tasks/get-log-data');
const syncCommits = require('./tasks/sync-commits');
const getRepoData = require('./tasks/get-repo-data');
const getForkData = require('./tasks/get-fork-data');
const setFirstCommit = require('./tasks/set-first-commit');
const scrapeCoinmarketcap = require('./tasks/scrape-coinmarketcap');

process.on('warning', error => {
  debugger;
  logger.warn(error.stack);
});

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

    // Scrape Coinmarketcap
    // Get list of projects and links to their Githubs
    if (global.settingsScrapeCoinmarketcap) {
      await to(scrapeCoinmarketcap({requestLimit: 5000, requestDelay: 2000}));
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
