// Node
const fs = require('fs-extra');
const glob = require('glob');
const { join } = require('path');

// CryptoHub
const logger = require('./logger');

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

  constructor(dir = 'cache', debug) {
    this.dir = dir;
    this.debug = debug;
  }

  /**
   *
   * @param {String} key
   * @return {Array} [file, age] - age is in days
   *
   */
  get(key) {
    try {
      const files = glob.sync(`${join(this.dir, key)}-<*>`, {});
      if (!files.length) return [false];
      const newestFile = files.sort().pop();
      const newestFileDate = newestFile.replace(/.*<(.*)>$/, '$1');
      const dateNow = +new Date();
      const age = ((dateNow - +new Date(newestFileDate)) / (1000*60*60*24));
      const file = fs.readFileSync(newestFile);
      logger.info(`Cache.get(): Fetching cached data for ${key}`);
      return [file.toString(), age];
    }
    catch(error) {
      if (this.debug) logger.info(`Cache.get(): ${error}`);
    }
  }

  /**
   *
   * @param {String} key
   * @param {String} data
   *
   */
  set(key, data) {
    try {
      const date = wrapDate(getISODate());
      fs.outputFileSync(join(this.dir, `${key}${date}`), data);
      if (this.debug) logger.info(`Cache.set(): saved ${key}${date} to ${this.dir}`);
    }
    catch(error) {
      if (this.debug) logger.info(`Cache.set(): ${error}`);
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
