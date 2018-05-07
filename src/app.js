// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');

// CryptoHub
require('./db-connect');
const Cache = require('./cache');
const logger = require('./log.js');

const scrape = require('./scrape.js');
const hashFiles = require('./hash-files');
const cloneRepos = require('./clone-repos');
const getLogData = require('./get-log-data');
const syncCommits = require('./sync-commits');
const getRepoData = require('./get-repo-data');
const getForkData = require('./get-fork-data');
const setFirstCommit = require('./set-first-commit');

// settings
global.cache = new Cache('cache', true);
global.githubClientId = 'c7a2c111a27dee50bba0';
global.githubClientSecret = '5e4b8b348c8165536391bdbf6041685f270503f0';

global.cacheForGitlog = 7;
global.cacheForGithubRepo = 7;
global.cacheForGithubForks = 30;
global.cacheForCoinmarketcapProjectsJson = 1;
global.cacheForCoinmarketcapProjectHtml = 30;

// Leave in execution order
// global.settingsScrape = true;
// global.settingsGetRepoData = true;
// global.settingsCloneRepos = true;
// global.settingsGetLogData = true;
// global.settingsGetForkData = true;
// global.settingsSetFirstCommit = true;
// global.settingsSyncCommits = true;
global.settingsHashFiles = true;

// Stuff we found while parsing the data
global.notes = [];

process.on('warning', error => {
  debugger;
  logger.warn(error.stack);
});

//
// TODO:
// add overrides for extra repos, like bitcoin cash
// 'bitcoin-cash': ['https://github.com/Bitcoin-ABC/bitcoin-abc']
//

//
// TODO: move sync commits out to separate file/function
//
(async function doStuffYo() {

  //
  // Each task is completely independent
  //
  try {

    let error;

    // Scrape Coinmarketcap
    // Get list of projects and links to their Githubs
    if (global.settingsScrape) {
      [error] = await to(scrape({requestLimit: 500, requestDelay: 2000}));
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
      [error] = await to(cloneRepos());
      if (error) throw new Error(error);
    }

    // For each repo checkout the latest commit on the default branch and save the log
    if (global.settingsGetLogData) {
      [error] = await to(getLogData());
      if (error) throw new Error(error);
    }

    // Get forks list for each repo
    // Set repo.forkedFrom fields
    if (global.settingsGetForkData) {
      [error] = await to(getForkData());
      if (error) throw new Error(error);
    }

    // Set repo.firstCommit (the first 'real' commit based on fork data & logs)
    if (global.settingsSetFirstCommit) {
      [error] = await to(setFirstCommit());
      if (error) throw new Error(error);
    }

    // Make sure every repo is at repo.commit (the last processed commit) on repo.defaultBranch
    if (global.settingsSyncCommits) {
      [error] = await to(syncCommits());
      if (error) throw new Error(error);
    }

    // Continue hashing files from repo.commit onwards
    if (global.settingsHashFiles) {
      [error] = await to(hashFiles());
      if (error) throw new Error(error);
    }

  }
  catch(error) {
    logger.error(`Um some error happened yo: ${error}`);
    process.exit(1);
  }

  process.exit(0);

})();


// scrape.on('done', async () => {

//   console.log('Finished scraping');
  // await checkoutRepos();
  // await hashFiles();

  //
  // hashFiles();
  // ----------------
  // loop over repos
  //   go to project.commits[repoIdx] or first commit
  //   if first commit hash all files else hash changed files
  //

  //
  // hashFile();
  // ----------------
  // minify file, strip comments or compile file so bullshit changes don't register
  // hash file
  // check if file is from forked repo and how old the file is
  // save file data
  //

// });

// var hashStuff = () => {
//   var results = [];
//   //
//   // log a hash of all files in folder
//   //
//   glob(`projects/**/*.*`, {}, (error, files) => {
//     files.forEach(path => {
//       fs.readFile(path, 'utf8', (error, contents) => {
//         var md5 = crypto.createHash('md5');
//         var item = md5.update(contents).digest('hex');
//         results.push(item);
//         console.log(`${path}\n${item}\n`);
//         // console.log(item);
//       });
//     });
//   });
// }

//
// Example
//
// projects: {
//   bitcoin: {
//     github: ['url1', 'url2'],                   // github to scan
//     commits: [],                               // last commit parsed per repo
//     original: {                                // original files (this project wrote this code)
//       active: ['12', '32', '123', '2f', '43'], // hashes of active files
//       old: []                                  // changed or deleted files
//     },
//     copies: {                                  // copied files (this project copied/forked this code)
//       active: [],
//       old: [],
//     },
//   },
//   ethereum: {
//     original: ['12', '32', '22', '23', '22d'],
//     copies: [],
//   },
// }

// hashes: {
//   files: {
//     '1232543fd4ffsdd24f2v2': {
//       length: 1003,                            // number of characters
//       project: 'bitcoin',
//       active: true,
//       date: 123,
//       copies: [
//         {project: 'ethereum': date: 1234, active: true},
//         {project: 'neo': date: 1254, active: false}
//       ]
//     }
//   }
// }




//
// Get github github
//
// curl https://api.github.com/orgs/ethereum/repos

//
// Projects & repos
//
//
// {
//   bitcoin: [
//     'https://github.com/bitcoin/bitcoin',
//     'https://github.com/bitcoin/bips',
//     'https://github.com/bitcoin/libblkmaker',
//     'https://github.com/bitcoin/libbase58',
//   ],
//   ethereum: [
//     'https://github.com/ethereum/remix-ide',

//   ],
//   litecoin: [
//     'https://github.com/litecoin-project/litecoin'
//   ]
// }
