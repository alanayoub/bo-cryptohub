// Node
const fs = require('fs');

// Libs
const git = require('nodegit');
const logger = require('./log.js');
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('./db-schema');
const { logHeader } = require('./utils.js');

/**
 *
 * Clone all repos in DB
 *
 */
module.exports = async function cloneRepos() {

  try {

    logHeader('Cloning repos');
    const repos = await Repo.find();
    const numRepos = repos.length;

    for (let [j, repo] of repos.entries()) {

      const repoObj = JSON.parse(repo.githubObject);

      if (repoObj && repoObj.clone_url) {

        const url = repoObj.clone_url;
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
          if (error) logger.error(`cloneRepos(): ${error}`);
        }
        else {
          logger.info(`cloneRepos(): Skipping ${url}, repo already exists`);
        }

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
