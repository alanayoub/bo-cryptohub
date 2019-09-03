/**
 *
 * Unpack Data
 *
 * @param {Object} data
 * @return {Object}
 *
 */
export default function unpackData(data) {

  let id, item;
  let key, val;
  let newObj;
  let newData = {};
  const keys = data.keys;

  // keys are required to unpack the data
  // they are a map from the minified object keys to the full text keys
  if (!keys) {
    logger.warn('unpackData(): no `keys` property was available on data to unpack');
    return data;
  }
  delete data.keys;
  for ([id, item] of Object.entries(data)) {
    newObj = {};
    for ([key, val] of Object.entries(item)) {
      newObj[keys[key]] = val;
    }
    newData[id] = newObj;
  }

  return newData;

};
