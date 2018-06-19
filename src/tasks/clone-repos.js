// Node
const fs = require('fs');

// Libs
const git = require('nodegit');
const logger = require('../logger');
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('../db-schema');
const { logHeader } = require('../utils.js');

/**
 *
 * Clone all repos in DB
 *
 */
module.exports = async function cloneRepos(regex = /.*/) {

  try {

    //
    // Delete the flipping thing instead of skipping so we dont have to deal with pulling :/
    //
    logHeader('Cloning repos');
    const repos = await Repo.find({_id: regex});
    const numRepos = repos.length;

    for (let [j, repo] of repos.entries()) {

      const url = repo.cloneUrl;
      const path = `./projects/${repo._id}`;
      const options = {
        fetchOpts: {
          callbacks: {
            certificateCheck: () => 1
          }
        }
      };

      if (!fs.existsSync(path)) {
        logger.info(`cloneRepos(): Cloning ${url} repo`);
        let [error] = await to(git.Clone(url, path, options));
        if (error) {
          logger.error(`
            cloneRepos(): ${error}\n
            -> Sometimes the repos api returns more repos that actually exist, so this repo may have been deleted`
          );
        }
      }
      else {
        logger.info(`cloneRepos(): Skipping ${url}, repo already exists`);
      }

      if (numRepos === j + 1) {
        return true;
      };

    }

  }
  catch(error) {

    logger.error(`cloneRepos(): ${error}`);
    return false;

  }

};
