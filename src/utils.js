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
 * @param {String} path - absolute path to repo
 * @param {String} [commit] - commit to checkout
 * @return {Boolean}
 *
 */
async function gitCheckout(path, hash) {
  const git = require('nodegit');
  return new Promise(async resolve => {
    try {
      const repository = await git.Repository.open(path);
      const commit = await repository.getCommit(hash);
      await repository.setHeadDetached(commit.id(), repository.defaultSignature(), `Checkout: HEAD ${commit.id()}`);
      await git.Checkout.tree(repository, commit.sha(), {checkoutStrategy: git.Checkout.STRATEGY.FORCE});
      console.log(`gitCheckout(): Checked out ${hash} from ${path}`);
      resolve(true);
    }
    catch(error) {
      console.log(`gitCheckout(): Failed to checked out ${hash} from ${path}`);
      resolve({error: true, message: `gitCheckout(): ${error}`});
    }
  });
}

/**
 *
 * @param {String} path - absolute path to repo
 * @return {Array|Object} - An array of commits or an error object
 *
 */
async function gitLog(path) {
  const git = require('nodegit');
  return new Promise(resolve => {

    // TODO: add a catch or error validation to this, at the moment
    // if an incorrect path is used nothing is returned and it hangs
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
            results.unshift(details);
          }
          resolve(results);
        });

        history.on('error', error => resolve({error: true, message: error}));

        history.start();

      });

  });
}

module.exports = {
  gitLog,
  getDirs,
  arrayDiff,
  logHeader,
  typeOfData,
  gitCheckout,
  getCurrentDate,
};
