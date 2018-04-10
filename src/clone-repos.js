'use strict';

// Node
const fs = require('fs');

// Libs
const git = require('nodegit');

// CryptoHub
const { Repo } = require('./db-schema');
const { logHeader } = require('./utils.js');

/**
 *
 * Clone all repos in DB
 *
 */
module.exports = async function cloneRepos() {

  return new Promise(async resolve => {

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
            console.log(`cloneRepos(): Cloning ${url} repo`);
            await git.Clone(url, path, options);
          }
          else {
            console.log(`cloneRepos(): Skipping ${url}, repo already exists`);
          }

        }

        if (numRepos === j + 1) {
          resolve(true);
        };

      }

    }
    catch (error) {

      console.log(`cloneRepos(): ${error}`);
      resolve(false);

    }

  });

};
