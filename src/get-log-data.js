// Node
const fs = require('fs');
const { join } = require('path');

// Libs
const git = require('nodegit');
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('./db-schema');
const { gitLog, dbSaveCommits, logHeader } = require('./utils.js');

/**
 *
 * Get and save git log data for all repos
 *
 */
module.exports = async function getLogData() {

  return new Promise(async resolve => {

    try {

      logHeader('Getting Git log data and saving to Repo.log');
      const repos = await Repo.find();
      const numRepos = repos.length;

      for (let [j, repo] of repos.entries()) {

        const _id = repo._id;
        const key = `/git/log/gitlog-${repo.project}-${repo.githubRepoName}`;
        let error;
        let commits;
        let [log, age] = global.cache.get(key);
        if (!log || age > global.cacheForGitlog) {
          log = await gitLog(join('projects', _id), repo.defaultBranch);
          [error, commits] = await to(dbSaveCommits(log, _id)); // TODO: Deal with error
          global.cache.set(key, JSON.stringify(log));
        }

        if (commits) {
          const query = {_id};
          const update = {
            log: commits
          }
          const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          };
          const [findError] = await to(Repo.findOneAndUpdate(query, update, options).exec());
          if (findError) {
            return {error: true, message: findError};
            console.log(`getLogData() error saving Repo.log info for ${_id}: ${findError}`);
          }
          else {
            console.log(`getLogData(): Saved Repo.log for ${_id}`);
          }
        }

        if (numRepos === j + 1) {
          resolve(true);
        };

      }

    }
    catch(error) {

      console.log(`getLogData(): ${error}`);
      resolve(false);

    }

  });

};
