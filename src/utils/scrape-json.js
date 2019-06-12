/**
 *
 * @param {String} uri
 * @param {String} key
 * @param {String} cacheFor
 *
 */

// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');
const logger   = require('../logger');

module.exports = async function scrapeJSON(uri, key, cacheFor, cache) {
  try {
    let error;
    let [file, age] = await cache.get(key);
    if (!file || age > cacheFor) {
      [error, file] = await to(rp({uri, json: true}));
      if (error) throw new Error(error);
      cache.set(key, JSON.stringify(file));
    }
    else {
      file = JSON.parse(file);
    }
    return file;
  }
  catch(error) {
    logger.error(`scrape-json.js: Failed to scrape ${uri}`);
    return {error: true, message: `scrapeJSON(): ${error}`};
  }
}
