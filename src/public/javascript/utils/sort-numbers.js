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
export default function sortNumbers(d1, d2) {
  return ((d1 && d1.value) || -Infinity) - ((d2 && d2.value) || -Infinity);
}
