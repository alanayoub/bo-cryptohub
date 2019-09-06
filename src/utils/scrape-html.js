/**
 *
 * @param {String} uri
 * @param {String} key
 * @param {String} cacheFor
 *
 */

const rp = require('request-promise');
const { to } = require('await-to-js');
const logger = require('./logger');
const cheerio = require('cheerio');

module.exports = async function scrapeHTML(uri, key, cacheFor, cache) {
  try {
    const options = {
      uri,
      transform: html => cheerio.load(html)
    };
    let [file, age] = await cache.get(key);
    if (!file || age > cacheFor) {
      const [error, $] = await to(rp(options));
      if (error) throw new Error(error);
      file = $.html();
      cache.set(key, file);
    }
    return file;
  }
  catch (error) {
    const message = `scrapeHTML(): Failed to scrape ${uri}: ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
