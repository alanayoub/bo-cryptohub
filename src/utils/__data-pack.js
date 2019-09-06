/**
 *
 * Pack Data
 *
 * @param {Object} data
 * @returns {Object}
 *
 */
export default function packData(data) {

  let id;
  let item;
  let key;
  let val;

  // Create key list
  const keys = [];
  for ([id, item] of Object.entries(data)) {
    for ([key, val] of Object.entries(item)) {
      if (!keys.includes(key)) keys.push(key);
    }
  }

  // Use key list to Minify data
  let newObj;
  let newData = {};
  for ([id, item] of Object.entries(data)) {
    newObj = {};
    for ([key, val] of Object.entries(item)) {
      newObj[keys.indexOf(key)] = val;
    }
    newData[id] = newObj;
  }

  newData.keys = keys;
  return newData;

}
