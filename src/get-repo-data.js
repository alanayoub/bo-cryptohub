'use strict';

// Node
const { join } = require('path');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Repo } = require('./db-schema');
const { gitLog, dbSaveCommits } = require('./utils.js');
const itterateWebRepos = require('./itterate-web-repos');

/**
 *
 * Get and save all github repo information for all projects
 *
 */
module.exports = async function getRepoData() {

  try {

    for await (const repo of itterateWebRepos('Get all github repo information')) {

      if (!repo) break;

      const _id = join(repo.projectId, repo.data.name);
      const query = {_id};
      const log = await gitLog(join('projects', _id));
      const [error, commits] = await to(dbSaveCommits(log, _id)); // TODO: Deal with error
      const update = {
        _id,
        log: commits,
        isFork: repo.data.fork,
        commit: null,
        project: repo.projectId,
        githubObject: JSON.stringify(repo.data),
      };
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      };

      const [findError] = await to(Repo.findOneAndUpdate(query, update, options).exec());

      if (findError) {
        return {error: true, message: findError};
        console.log(`getRepoData() error saving repo info for ${_id}: ${findError}`);
      }
      else {
        console.log(`getRepoData(): Saved repo information from github for ${_id}`);
      }

    }

  }
  catch (error) {

    console.log(`getRepoData(): ${error}`);
    return {error: true, message: error};

  }

};
