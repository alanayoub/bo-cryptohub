// Node
const fs = require('fs-extra');
const glob = require('glob');
const { join } = require('path');

// CryptoHub
const logger = require.main.require('./logger');

/**
 *
 * @param {Object} date
 * @return {String}
 *
 */
function getISODate(date = new Date()) {
  return date.toISOString();
}

function wrapDate(date) {
  return `-<${date}>`;
}

module.exports = class Cache {

  constructor(dir = 'cache') {
    this.dir = dir;
  }

  /**
   * @param {String} key
   * @return {Array} [Boolean, age]
   */
  check(key) {
    try {
      const files = glob.sync(`${join(this.dir, key)}-<*>`, {});
      if (!files.length) return [false];
      const newestFile = files.sort().pop();
      const newestFileDate = newestFile.replace(/.*<(.*)>$/, '$1');
      const dateNow = +new Date();
      const age = ((dateNow - +new Date(newestFileDate)) / (1000*60*60*24));
      logger.info(`Cache.check(): Checking if ${key} is cached`);
      return [true, age];
    }
    catch(error) {
      logger.error(`Cache.check(): ${error}`);
    }
  }

  /**
   *
   * @param {String} key
   * @param {String} flag - if 'all' get all files that match
   * @return {Array|Object} [file, age] or a map of filename to files
   *
   */
  get(key, flag) {
    try {
      const files = glob.sync(`${join(this.dir, key)}-<*>`, {});
      if (!files.length) return [false];
      const sortedFilesList = files.sort();
      if (flag === 'all') {
        let sortedFiles = {};
        for (let i = 0; i < sortedFilesList.length; i++) {
          const fileString = fs.readFileSync(sortedFilesList[i]).toString();
          sortedFiles[sortedFilesList[i]] = fileString;
        }
        return sortedFiles;
      }
      const newestFile = sortedFilesList.pop();
      const newestFileDate = newestFile.replace(/.*<(.*)>$/, '$1');
      const dateNow = +new Date();
      const age = ((dateNow - +new Date(newestFileDate)) / (1000*60*60*24));
      const file = fs.readFileSync(newestFile);
      logger.info(`Cache.get(): Fetching cached data for ${key}`);
      return [file.toString(), age];
    }
    catch(error) {
      logger.error(`Cache.get(): ${error}`);
    }
  }

  /**
   *
   * @param {String} key
   * @param {String} data
   *
   * Saving file as `.path` then renaming to `path`
   * This is because separate node processes tend to read files
   * before they are finished saving regardless of using outputFileSync
   *
   */
  set(key, data) {
    try {
      const date = wrapDate(getISODate());
      const path = join(this.dir, `${key}${date}`);
      fs.outputFileSync(`.${path}`, data);
      fs.renameSync(`.${path}`, path);
      logger.info(`Cache.set(): saved ${key}${date} to ${this.dir}`);
    }
    catch(error) {
      logger.error(`Cache.set(): ${error}`);
    }
  }

  /**
   *
   * @param {String} key
   * @return {Boolean}
   *
   */
  del(key) {
    return true
  }

}
