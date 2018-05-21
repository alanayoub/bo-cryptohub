// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('../db-schema');
const { logHeader } = require('../utils.js');
const { gitCheckout, gitCheckoutBranch } = require('../utils/index.js');
const logger = require('../logger');

/**
 *
 * Make sure every repo is at the correct commit as defined in the DB.
 *
 */
module.exports = async function syncCommits(regex = /.*/) {

  try {
    let path;
    let error;
    let repos;
    let commit;
    logHeader('Sync commits');
    [error, repos] = await to(Repo.find({_id: regex}));
    if (error) throw new Error(`syncCommits(): ${error}`);
    for (let [i, repo] of repos.entries()) {
      path = `projects/${repo._id}`;
      [error] = await to(gitCheckoutBranch(path, repo.defaultBranch));
      if (error) throw new Error(`syncCommits(): ${error}`);
      commit = repo.commit || repo.firstCommit;
      if (commit) {
        [error] = await to(gitCheckout(path, commit));
        if (error) throw new Error(`syncCommits(): ${error}`);
      }
      [error] = await to(repo.save());
      if (error) throw new Error(`repo.save(): ${error}`);
      else {
        logger.info(`syncCommits(): set ${repo._id} to branch ${repo.defaultBranch} and to commit ${repo.commit || '[first]'}`);
      }
    }
    return true;
  }
  catch(error) {
    logger.error(`syncCommits(): ${error}`);
    return false;
  }

};
