'use strict';

// Node
const { join, dirname, basename } = require('path');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const { Project, Repo } = require('./db-schema');
const { arrayDiff, logHeader, getDirs, gitCheckout, gitLog } = require('./utils.js');

/**
 *
 * hashFiles();
 * ---------------
 * loop over repos
 * if first commit hash all files else hash changed files
 *
 */
module.exports = async function hashFiles() {

  /**
   *
   * Make sure every repo is at the correct commit as defined
   * in the DB.
   * If no commit is registered for a repo go to the first commit
   *
   */
  async function syncCommits() {

    return new Promise(async resolve => {

      try {
        let log;
        let path;
        let error;
        let repos;
        let commit;
        [error, repos] = await to(Repo.find({}));
        if (error) throw new Error(`Repo.find(): ${error}`);
        for (let [i, repo] of repos.entries()) {
          path = `projects/${repo._id}`;
          [error, log] = await to(gitLog(path));
          if (error) throw new Error(`gitLog(): ${error}`);
          repo.commits = log;
          if (!repo.commit.hash) {
            commit = repo.commit = log[0];
          }
          else {
            commit = repo.commit;
          }
          [error] = await to(gitCheckout(path, commit.hash));
          if (error) throw new Error(`gitCheckout(): ${error}`);
          [error] = await to(repo.save());
          if (error) throw new Error(`repo.save(): ${error}`);
          else {
            console.log(`syncCommits(): Saved gitLog and commit info for ${path}`);
          }
        }
        resolve(true);
      }
      catch(error) {
        console.log(`syncCommits(): ${error}`);
        resolve(false);
      }

    });

  }

  /**
   *
   */
  async function hashAllFiles(projectName, path) {

  }

  /**
   *
   */
  async function hashChangedFiles(projectName, path) {

  }

  /**
   *
   */
  async function hashFile(projectName, path) {

  }

  return new Promise(async resolve => {
    logHeader('Hashing Files');
    await syncCommits();
    resolve();
  });
};
