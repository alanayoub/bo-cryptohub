/**
 *
 * @param {Number} milliseconds
 * @return {Object} promise
 *
 */
const logger = require('../logger');
module.exports = function delay(milliseconds) {
  try {
    logger.debug(`common-delay.js: Waiting ${milliseconds} milliseconds`);
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  catch(error) {
    const message = `common-delay.js: ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
