// Node
const fs = require('fs-extra');
const glob = require('glob');
const crypto = require('crypto');
const { join } = require('path');

// Libs
const Promise = require('bluebird');
const { to }  = require('await-to-js');

// CryptoHub
const logger = require('../logger');
const globPromise = Promise.promisify(glob);

/**
 *
 * @param {Object} date
 * @return {String}
 *
 */
function getISODate(date = new Date()) {
  return date.toISOString();
}

/**
 *
 * Class Cache
 *
 * @param {String} dir
 * @param {Boolean} allowEmpty - allow caching of 'empty' data, for example an empty object {}
 * @return {Object} - an instance of Cache
 *
 */
module.exports = class Cache {

  constructor(dir = 'cache', allowEmpty = false) {
    this.dir = dir;
    this.allowEmpty = allowEmpty;
  }

  /**
   * @param {String} key
   * @return {Array} [Boolean, hash, date]
   */
  check(key) {
    try {
      const files = glob.sync(`${join(this.dir, key)}-[*>`, {});
      if (!files.length) return [false];
      const newestFile = files.sort().pop();
      const newestFileHash = newestFile.replace(/.*<(.*)>$/, '$1');
      const newestFileDate = newestFile.replace(/.*-\[(.*)\]-<.*/, '$1');
      logger.debug(`cache.js: check(): Checking if ${key} is cached`);
      return [true, newestFileHash, newestFileDate];
    }
    catch(error) {
      logger.error(`cache.js: check(): ${error}`);
    }
  }

  /**
   *
   * @param {String} key
   * @param {String} flag - if 'all' get a sorted list of all files that match
   * @return {Array|Object} [file, age] or a map of filename to files
   *
   */
  get(key, flag) {
    try {

      const files = glob.sync(join(this.dir, key), {});

      if (!files.length) {
        return [false];
      }
      const sortedFilesList = files.sort();
      if (flag === 'all') {
        return sortedFilesList;
      }
      if (flag === 'newest') {
        return [sortedFilesList.pop()];
      }
      const newestFile = sortedFilesList.pop();
      const newestFileDate = newestFile.replace(/.*\[(.*)\].*/, '$1');
      const dateNow = +new Date();
      const age = ((dateNow - +new Date(newestFileDate)) / (1000*60*60*24));
      const file = fs.readFileSync(newestFile);
      logger.debug(`cache.js: get(): ${newestFile}`);
      if (isNaN(age)) debugger;
      return [file.toString(), age];
    }
    catch(error) {
      logger.error(`cache.js: get(): ${error}`);
      return [false];
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
   * Save files as key-hash-date
   * If hash is the same just update the date on the old file
   *
   */
  set(key, data) {
    try {
      if (!this.allowEmpty) {
        const emptyStates = ['', '{}'];
        if (emptyStates.includes(data)) {
          return false;
        }
      }
      const md5 = crypto.createHash('md5');
      const hash = md5.update(data).digest('hex');
      const date = getISODate();
      const path = join(this.dir, `${key}-[${date}]-<${hash}>`);
      const [oldExists, oldHash, oldDate] = this.check(key);
      const oldPath = join(this.dir, `${key}-[${oldDate}]-<${oldHash}>`);
      if (oldExists && (oldHash === hash)) {
        fs.renameSync(oldPath, path);
        logger.debug(`cache.js: set(): (renamed) ${path}`);
      }
      else {
        fs.outputFileSync(`.${path}`, data);
        fs.renameSync(`.${path}`, path);
        logger.debug(`cache.js: set(): (saved) ${path}`);
      }
    }
    catch(error) {
      logger.error(`cache.js: set(): ${error}`);
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
