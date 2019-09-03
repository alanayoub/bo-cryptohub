/**
 *
 * Take and Object and a Map of keys to keys
 * Return a new object with the keys swapped as per the map
 * @param {Object} obj
 * @param {Object} map
 * @return {Object}
 *
 */
const logger = require('../logger');
module.exports = function swapObjectKeys(obj, map) {
  try {
    let result = {};
    for (let [k, v] of Object.entries(obj)) {
      result[map[k]] = v;
    }
    return result;
  }
  catch(error) {
    const message = `swapObjectKeys(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
