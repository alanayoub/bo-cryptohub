// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('./db-schema');
const { logHeader, gitCheckout, gitCheckoutBranch } = require('./utils.js');
const logger = require('./log.js');

/**
 *
 * Make sure every repo is at the correct commit as defined in the DB.
 *
 */
module.exports = async function syncCommits() {

  try {
    let path;
    let error;
    let repos;
    logHeader('Sync commits');
    [error, repos] = await to(Repo.find({}));
    if (error) throw new Error(`Repo.find(): ${error}`);
    for (let [i, repo] of repos.entries()) {
      path = `projects/${repo._id}`;
      [error] = await to(gitCheckoutBranch(path, 'master'));
      if (error) throw new Error(`gitCheckoutBranch(): ${error}`);
      if (repo.commit) {
        [error] = await to(gitCheckout(path, commit));
        if (error) throw new Error(`gitCheckout(): ${error}`);
      }
      [error] = await to(repo.save());
      if (error) throw new Error(`repo.save(): ${error}`);
      else {
        logger.info(`syncCommits(): Saved repo.commit and repo.log for ${path}`);
      }
    }
    return true;
  }
  catch(error) {
    logger.error(`syncCommits(): ${error}`);
    return false;
  }

};
