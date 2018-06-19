/**
 *
 * @param {String} uri
 * @param {String} key
 * @param {String} cacheFor
 *
 */
const rp = require('request-promise');
const { to } = require('await-to-js');
module.exports = async function scrapeJSON(uri, key, cacheFor) {
  try {
    let error;
    let [file, age] = global.cache.get(key);
    if (!file || age > cacheFor) {
      [error, file] = await to(rp({uri, json: true}));
      if (error) throw new Error(error);
      global.cache.set(key, JSON.stringify(file));
    }
    else {
      file = JSON.parse(file);
    }
    return file;
  }
  catch(error) {
    console.log(`scrapeJSON(): Failed to scrape ${uri}`);
    return {error: true, message: `scrapeJSON(): ${error}`};
  }
}
