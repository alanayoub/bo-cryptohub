'use strict';

// Node
const { join, dirname, basename } = require('path');

// CryptoHub
const { Project, Repo } = require('./db-schema');
const { arrayDiff, logHeader, getDirs, gitCheckout, gitLog } = require('./utils.js');

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

      try {
        const repos = await Repo.find({});
        let log;
        let path;
        let commit;
        for (let [i, repo] of repos.entries()) {
          // TODO: only set if not error
          path = `projects/${repo._id}`;
          log = await gitLog(path);

          repo.commits = log;
          if (!repo.commit) {
            commit = repo.commit = log[0];
          }
          else {
            commit = repo.commit;
          }
          await gitCheckout(path, commit.hash);
          // if no error, save commit
          repo.save();
        }
        resolve(true);
      }
      catch(error) {
        console.log(`syncCommits(): ${error}`);
        resolve(false);
      }

      // let testCount = 0;
      // let setToFirst = 0;
      // let setToDBCommit = 0;

      // const projects = await Project.find({githubUrls: {$exists: true, $not: {$size: 0}}});
      // let log;      // the current git log
      // let root;     // root path for a project
      // let commit;   // the current commit hash
      // let dbRepos;  // all repos registered in the db for a project
      // let dirNames; // all cloned repos in project, dir names
      // let dirPaths; // all cloned repos in project, full paths
      // let repoName;
      // let projectName;
      // let unregisteredRepoNames; // all repos that don't have a commit registered in the db, dir names
      // let unregisteredRepoPaths; // all repos that don't have a commit registered in the db, full paths

      // // For each project...
      // for (let [i, project] of projects.entries()) {
      //   dirNames = getDirs(`projects/${project._id}`);
      //   dirPaths = getDirs(`projects/${project._id}`, true);
      //   projectName = project._id;
      //   root = dirname(dirPaths[0]);
      //   dbRepos = [];

      //   // If DB has commit info for a repo, set that repo to the correct commit
      //   for (let [j, repo] of project.commits.entries()) {
      //     repoName = Object.keys(repo)[0];
      //     commit = repo[repoName];
      //     dbRepos.push(repoName);
      //     debugger
      //     await gitCheckout(join(root, repoName), commit);
      //     setToDBCommit++;
      //   }

      //   // For all other cloned repos (unregistered in db) go to the first commit
      //   unregisteredRepoNames = arrayDiff(dirNames, dbRepos);
      //   unregisteredRepoPaths = dirPaths.filter(path => {
      //     return unregisteredRepoNames.includes(basename(path));
      //   });
      //   for (let [k, uRepo] of unregisteredRepoNames.entries()) {
      //     if (testCount < 2) resolve(true);
      //     const path = unregisteredRepoPaths[k];
      //     log = await gitLog(path);
      //     commit = log[0].hash;
      //     gitCheckout(path, commit);
      //     setToFirst++;
      //     //
      //     // updateDB to first commit
      //     // something like this...
      //     //
      //     // Model.findById(id, function (err, doc) {
      //     //   if (err) ..
      //     //   doc.name = 'jason bourne';
      //     //   doc.save(callback);
      //     // });
      //     //
      //     testCount++;
      //   }

      // }

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
