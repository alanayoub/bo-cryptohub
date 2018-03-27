'use strict';

/**
 *
 * Get the current date in the format yyyy/mm/dd
 *
 */
function getCurrentDate() {
  const nowDate = new Date();
  const yyyy = nowDate.getFullYear();
  const mm = (nowDate.getMonth() + 1).toString().padStart(2, 0);
  const dd = nowDate.getDate().toString().padStart(2, 0);
  return `${yyyy}-${mm}-${dd}`;
}

/**
 *
 * @param {Object} object - any type of object
 *
 */
function typeOfData(object) {
  return Object.prototype.toString.call(object).replace(/^\[object (.*)\]$/, '$1');
}

/**
 *
 * @param {String} message
 *
 */
function logHeader(message) {
  console.log(
      '----------------------------------------------------------------\n'
    + '-                                                              -\n'
    + ' ' + message +                                                 '\n'
    + '-                                                              -\n'
    + '----------------------------------------------------------------\n'
  );
}

/**
 *
 * Get all directories in directory (not deep)
 * @param {String} path
 * @param {Boolean} full - fully qualified path
 *
 */
function getDirs(path, full = false) {
  const { resolve, basename } = require('path');
  const { lstatSync, readdirSync } = require('fs');
  const isDirectory = path => lstatSync(path).isDirectory();
  let dirs = readdirSync(path)
    .map(name => resolve(path, name))
    .filter(isDirectory);
  if (!full) dirs = dirs.map(p => basename(p));
  return dirs;
}

/**
 *
 * Array difference
 * @param {Array} a
 * @param {Array} b
 *
 */
function arrayDiff(a, b) {
  return a.filter(i => !b.includes(i));
}

/**
 *
 * @param {String} repo - absolute path to repo
 * @param {String} [commit] - commit to checkout
 * @return {Boolean}
 *
 */
async function gitCommit(repo, commit) {
  return new Promise(resolve => {
    console.log(`gitCommit(): ${repo} ${commit}`);
    // nodeGit
    // nodeGit.repository.open();
    // repository.getCommit();
    //
    // something like that
  });
}

/**
 *
 * @param {String} path - absolute path to repo
 *
 */
async function gitLog(path) {
  return new Promise(resolve => {

    const git = require('nodegit');

    git.Repository
      .open(path)
      .then(repo => repo.getMasterCommit())
      .then(firstCommitOnMaster => {

        const history = firstCommitOnMaster.history();

        history.on('commit', commit => {});

        history.on('end', commits => {
          const results = [];
          let author;
          let details;
          for (let [i, commit] of commits.entries()) {
            author = commit.author();
            details = {
              hash: commit.sha(),
              date: commit.date(),
              author: {
                name: author.name(),
                email: author.email(),
              },
              message: commit.message(),
            };
            results.push(details);
          }
          resolve(results);
        });

        history.on('error', error => {
          resolve({error: true});
        });

        history.start();

      });

  });
}

module.exports = {
  gitLog,
  getDirs,
  gitCommit,
  arrayDiff,
  logHeader,
  typeOfData,
  getCurrentDate,
};
