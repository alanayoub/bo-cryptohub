// Node
const fs = require('fs');
const glob = require('glob');
const { join } = require('path');

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
      const files = glob.sync(`${join(this.dir, key)}*`, {});
      if (!files.length) return false;
      const newestFile = files.sort().pop();
      const newestFileDate = newestFile.replace(/.*<(.*)>$/, '$1');
      const dateNow = +new Date();
      const age = ((dateNow - +new Date(newestFileDate)) / (1000*60*60*24));
      const file = fs.readFileSync(newestFile);
      return [file.toString(), age];
    }
    catch(error) {
      if (this.debug) console.log(`Cache.get(): ${error}`);
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
      fs.writeFileSync(join(this.dir, `${key}${date}`), data);
      if (this.debug) console.log(`Cache.set(): saved ${key}${date} to ${this.dir}`);
    }
    catch(error) {
      if (this.debug) console.log(`Cache.set(): ${error}`);
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








//
// Redis cache
// TODO: move somewhere incase we want to use Redis for something later
//
// const redis = require('redis');
// const client = Promise.promisifyAll(redis.createClient());

// client.on('error', error => {
//   console.log(`Error: ${error}`);
// });

// module.exports = client;
