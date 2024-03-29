'use strict';

/**
 *
 * Convert Working Data to Row Data
 *
 * UnMinify data & expand timestamps / value into object
 * Creates ag-grid Array row data
 *
 * @param {Array} data - array of data objects to unpack
 * @return {Array} unpacked array data
 *
 */
export default function convertWorkingDataToRowData(data) {

  data = JSON.parse(JSON.stringify(data));

  if (data.keys) {

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

  }

  //
  // Convert data Object to Array
  //
  const arrayData = [];
  for (let [id, obj] of Object.entries(data)) {
    obj.id = id;
    arrayData.push(obj);
  }
  data = arrayData;

  return data;
}
