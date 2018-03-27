'use strict';

// Node
const { join, basename } = require('path');

// CryptoHub
const { Project } = require('./db-schema');
const { arrayDiff, logHeader, getDirs, gitCommit, gitLog } = require('./utils.js');

/**
 *
 * hashFiles();
 * ---------------
 * loop over repos
 *   go to project.commits[repoIdx] or first commit
 *   if first commit hash all files else hash changed files
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

      const projects = await Project.find({githubUrls: {$exists: true, $not: {$size: 0}}});
      let repos;    // all repos registered in the db for a project
      let commit;
      let dirNames; // all cloned repos in project, dir names
      let dirPaths; // all cloned repos in project, full paths
      let repoName;
      let projectName;
      let unregisteredRepoNames; // all repos that don't have a commit registered in the db, dir names
      let unregisteredRepoPaths; // all repos that don't have a commit registered in the db, full paths
      // For each project...
      for (let [i, project] of projects.entries()) {
        projectName = project._id;
        repos = [];
        // If DB has commit info go to commit
        for (let [j, repo] of project.commits.entries()) {
          repoName = Object.keys(repo)[0];
          commit = repo[repoName];
          repos.push(repoName);
          // Check out commit
          debugger;
          gitCommit(repoName, commit);
        }
        // For all other cloned repos (unregistered in db) go to the first commit
        dirNames = getDirs(`projects/${project._id}`);
        dirPaths = getDirs(`projects/${project._id}`, true);
        unregisteredRepoNames = arrayDiff(dirNames, repos);
        unregisteredRepoPaths = dirPaths.filter(path => {
          return unregisteredRepoNames.includes(basename(path));
        });
        for (let [k, uRepo] of unregisteredRepoNames.entries()) {
          const path = join(project._id, uRepo);
          const log = await gitLog(unregisteredRepoPaths[k]);
          console.log(`gitlog: ${JSON.stringify(log)}`);
          gitCommit(path);
          console.log(uRepo);
        }
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
