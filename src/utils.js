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
 * Save commits to db if they don't alrady exist
 * @param {Array} log - array of commits
 * @param {String} project - project/repo
 * @return {Array} array of Commit objects
 *
 */
async function dbSaveCommits(log, project) {

    try {

      const { to } = require('await-to-js');
      const { Commit } = require('./db-schema');
      const commits = [];
      let error;
      let dbCommit;
      let savedCommit;

      for (let [i, commit] of log.entries()) {
        [error, dbCommit] = await to(Commit.findOne({hash: commit.hash}).exec());
        if (error) throw new Error(`saveCommits(): ${error}`);
        if (dbCommit) {
          // console.log(`savedCommits(): Skipping, ${commit.hash} already exists for ${project}`);
          commits.push(dbCommit);
        }
        else {
          [error, savedCommit] = await to(Commit.create(commit));
          if (error) throw new Error(error);
          // console.log(`savedCommits(): Creating new commit ${commit.hash} for ${project}`);
          commits.push(savedCommit);
        }
      };

      return commits;

    }
    catch(error) {
      console.log(`saveCommits(): ${error}`);
      return false;
    }

}

/**
 *
 */
function get(uri) {
  const rp = require('request-promise');
  return rp({
    uri,
    json: true,
    headers: {'user-agent': 'node.js'},
  });
}

module.exports = {
  getDirs,
  arrayDiff,
  logHeader,
  typeOfData,
  getCurrentDate,

  // resource
  get,

  // db
  dbSaveCommits,
};
