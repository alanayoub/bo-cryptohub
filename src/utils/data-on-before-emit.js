'use strict';

// Binary Overdose Projects
import DataTable from 'bo-datatable';

// CryptoHub
import settings from '../settings';

/**
 *
 * If these fields dont exist in a record the record
 * is useless to use at this time
 *
 */
function validData(item) {
  return !(
       item['cc-total-vol-full-TOTALVOLUME24HTO'] === 0
    || item['cc-total-vol-full-PRICE'] === void 0
    || item['cc-total-vol-full-Id'] === void 0
  )
}

/**
 *
 * We only want to display records that are updated regularly
 * Sometimes we will have some that have poped up into
 * the top x that we display and then dissappear  again. They
 * should be filtered out
 *
 */
function isFresh(item) {
  const now = +new Date();
  const longestAge = 1000 * 60 * 60 * 24;
  const timestamp = +new Date(item['cc-total-vol-full-PRICE-timestamp']);
  return now - timestamp < longestAge;
}

/**
 *
 * Remove bad records
 * Remove fields that are not currently used
 *
 * @param {Object} data
 * @return {Object}
 *
 */
function filterData(data) {

  let key;
  let item;
  let field;
  let fields;
  const whitelist = settings.fieldWhitelist;

  for ([key, item] of Object.entries(data)) {
    if (!validData(item) || !isFresh(item)) {
      // remove record
      delete data[key];
    }
    else {
      // remove fields that are not being used
      fields = Object.keys(data[key]);
      for (field of fields) {
        if (!whitelist.includes(field) || (settings.removeNullFields && data[key] === null)) {
          delete data[key][field];
        }
      }
    }
  }

  return data;

}

/**
 *
 *
 *
 */
export default function dataOnBeforeEmit(options, newData, oldData) {

  let emitData;
  emitData = filterData(newData);
  emitData = DataTable.diff(oldData, emitData);
  emitData = JSON.stringify(emitData);
  return emitData;

}
