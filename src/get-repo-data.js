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
      const key = `gitlog-${repo.projectId}-${repo.data.name}`;
      const query = {_id};
      let commits, error;

      let [log, age] = global.cache.get(key);
      if (!log || age > 7) {
        log = await gitLog(join('projects', _id), repo.data.default_branch);
        [error, commits] = await to(dbSaveCommits(log, _id)); // TODO: Deal with error
        global.cache.set(key, JSON.stringify(log));
      }

      const [githubProjectName, githubRepoName] = repo.data.full_name.split('/');
      const update = {
        _id,
        githubRepoName,
        githubProjectName,
        isFork: repo.data.fork,
        commit: null,
        project: repo.projectId,
        githubObject: JSON.stringify(repo.data),
      };
      // TODO: conditional literal property?
      if (commits) {
        update.log = commits;
      }
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
    debugger
    console.log(`getRepoData(): ${error}`);
    return {error: true, message: error};
  }

};
