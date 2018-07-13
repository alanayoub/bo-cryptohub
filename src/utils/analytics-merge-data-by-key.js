/**
 *
 * Takes and array of data objects and returns an object
 * with the items identified via their keys
 * If any two keys are the same it merges the data and
 * the second item overrides the first
 *
 * @param {Array} dataArray
 * @return {Object}
 *
 */
const logger = require('../logger');
module.exports = function mergeDataByKey(dataArray) {
  try {
    const result = {};
    for (const data of dataArray) {
      for (const [key, val] of Object.entries(data)) {
        if (!result[key]) result[key] = {};
        Object.assign(result[key], val);
      }
    }
    return result;
  }
  catch(error) {
    logger.error(`mergeDataByKey: ${error}`);
    return false;
  }
}
