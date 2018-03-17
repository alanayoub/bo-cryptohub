"use strict"

/**
 *
 * Get the current date in the format yyyy/mm/dd
 *
 */
function getCurrentDate() {
  const nowDate = new Date();
  const yyyy = nowDate.getFullYear();
  const mm = (nowDate.getMonth() + 1).toString().padStart(2, 0);
  const dd = nowDate.getDate().toString().padStart(2, 0);
  return `${yyyy}-${mm}-${dd}`;
}

/**
 *
 * @param {Object} object - any type of object
 *
 */
function typeOfData(object) {
  return Object.prototype.toString.call(object).replace(/^\[object (.*)\]$/, '$1');
}

/**
 *
 * @param {String} message
 *
 */
function logHeader(message) {
  console.log(
      '----------------------------------------------------------------\n'
    + '-                                                              -\n'
    + ' ' + message +                                                 '\n'
    + '-                                                              -\n'
    + '----------------------------------------------------------------\n'
  );
}

module.exports = {
  getCurrentDate,
  typeOfData,
  logHeader,
};
