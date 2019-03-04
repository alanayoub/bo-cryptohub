/**
 *
 * dataUnpack
 *
 * UnMinify data & expand timestamps / value into object
 *
 * @param {Array} data - array of data objects to unpack
 * @return {Array} unpacked array data
 *
 */
export default function dataUnpack(data) {

  //
  // UnMinify
  //
  let id, item;
  let key, val;
  let newObj;
  let newData = {};
  const keys = data.keys;
  delete data.keys;
  for ([id, item] of Object.entries(data)) {
    newObj = {};
    for ([key, val] of Object.entries(item)) {
      newObj[keys[key]] = val;
    }
    newData[id] = newObj;
  }
  data = newData;

  //
  // Convert data Object to Array
  //
  const arrayData = [];
  for (let [id, obj] of Object.entries(data)) {
    obj.id = obj.Id;
    arrayData.push(obj);
  }
  data = arrayData;

  //
  // Expand timestamp / value
  //
  const regex = /-timestamp$/g;
  let match;
  let value;
  let valueKey;
  let timestamp;
  let d, k, v;
  for (d of data) {
    for ([k, v] of Object.entries(d)) {
      match = k.match(regex);
      if (match && match.length) {
        valueKey = k.replace(regex, '');
        value = d[valueKey];
        timestamp = d[k];
        d[valueKey] = {
          timestamp,
          value
        };
        delete d[k];
      }
    }
  }

  return data;
}
