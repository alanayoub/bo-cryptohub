// Note
const { join } = require('path');

// Libs
const { to } = require('await-to-js');
const octokit = require('@octokit/rest')();

// CryptoHub
const { Repo } = require('./db-schema');
const { paginate } = require('./utils-github');

/**
 *
 * Get and save all github repo fork information for all projects
 *
 */
module.exports = async function getForkData() {

  try {

    await octokit.authenticate({
      type: 'oauth',
      key: global.githubClientId,
      secret: global.githubClientSecret
    });

    const repos = await Repo.find({});

    //
    // 1. Get forks for each repo
    // 2. Create forkMapFull and repoList
    //
    // forkMapFull: repo:parent (null if not a fork)
    // ---------------------------------------------
    // 'bitcoin/bitcoin': null,
    // 'litecoin/litecoin': 'bitcoin/bitcoin',
    // 'reddcoin/reddcoin': 'litecoin/litecoin'
    //
    const repoList = [];
    const forkMapFull = {};
    for (const [i, repo] of repos.entries()) {
      const project = repo.project;
      const repoName = repo.githubRepoName;
      const octokitOptions = {
        owner: repo.githubProjectName,
        repo: repoName,
        per_page: 30
      };
      const cacheKey = `forks-${octokitOptions.owner}-${octokitOptions.repo}`;
      const [error, forks] = await to(paginate(octokit.repos.getForks, octokitOptions, cacheKey, 30));
      repoList.push(repo._id);
      if (error) throw new Error(error);
      forks.forEach(fork => {
        forkMapFull[fork.full_name] = join(project, repoName);
      });
    }

    // 1. Filter by our repos and cache both maps
    // 2. Set repos that arent forks to null
    const forkMap = {};
    repoList.forEach(repo => {
      forkMap[repo] = forkMapFull[repo] || null;
    });

    global.cache.set('forkmap', JSON.stringify(forkMap));
    global.cache.set('forkmapFull', JSON.stringify(forkMapFull));

    // Save repo.forkedFrom
    for (const [i, repo] of repos.entries()) {
      repo.forkedFrom = forkMap[repo._id];
      const [error, updated] = await to(repo.save());
      if (error) {
        console.log(`getForkData(): Error saving forkedFrom field for repo ${repo._id}: ${error}`);
      }
      else {
        console.log(`getForkData(): Updated repo.forkedFrom for ${repo._id} to: ${updated.forkedFrom}`);
      }
    };

  }
  catch (error) {
    //
    // TODO: if error is github ratelimit wait for 1 hour and try again
    //
    console.log(`getForkData(): ${error}`);
    return {error: true, message: error};
  }

};