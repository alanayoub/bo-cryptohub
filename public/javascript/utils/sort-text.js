'use strict';

/**
 *
 * SORT NUMBERS
 *
 * Compare numbers that are provided on the `value` property of objects
 *
 * @param {Object} d1 - the first item to compare
 * @param {Object} d1 - the second item to compare
 * @return {Boolean}
 *
 */
export default function sortText(d1, d2) {
  const v1 = d1 && d1.value;
  const v2 = d2 && d2.value;
  if (v1 && v2) {
    return v1.localeCompare(v2, 'en', {sensitivity: 'base'});
  }
  else if (v1 && !v2) {
    return 1;
  }
  else {
    return -1;
  }
}
