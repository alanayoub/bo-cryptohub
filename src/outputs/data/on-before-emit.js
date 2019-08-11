'use strict';

// Binary Overdose Projects
import DataTable                          from 'bo-datatable';
import { objectGetNestedProperty as gnp } from 'bo-utils';
import { objectIsEmptyObject }            from 'bo-utils';

// CryptoHub
import settings                           from '../../settings';

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
function filterData(socket, data) {

  let key;
  let item;
  let field;
  let fields;

  const whitelist = settings.fieldWhitelist;
  let requiredFields = new Set();

  if (socket) {
    const cols = gnp(socket, 'handshake.query.cols');
    const columns = cols.columns.split(',');
    if (!Array.isArray(columns)) throw new Error('data-on-before-emit.js no columns provided');
    for (const col of columns) {
      for (field of settings.columnDependencies[col]) {
        requiredFields.add(field);
      }
    }
  }
  requiredFields = Array.from(requiredFields);

  for ([key, item] of Object.entries(data)) {
    if (!validData(item) || !isFresh(item)) {
      // remove record
      delete data[key];
    }
    else {
      // remove fields that are not being used
      fields = Object.keys(data[key]);
      for (field of fields) {
        if (!requiredFields.includes(field) || !whitelist.includes(field) || (settings.removeNullFields && data[key][field] === null)) {
          delete data[key][field];
          delete data[key][`${field}-timestamp`];
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
export default function dataOnBeforeEmit(options, socket, newData, oldData) {

  const type = options.diff !== false ? 'changeset' : 'full';
  newData = newData === null ? {} : filterData(socket, newData);
  oldData = oldData === null ? {} : filterData(socket, oldData);

  let data = newData;

  if ((Array.isArray(data) && !data.length) || objectIsEmptyObject(data)) {
    data = false;
  }
  else {
    if (type === 'changeset') {
      data = DataTable.diff(oldData, data);
    }
    data = JSON.stringify({data, type});
  }

  return data;

}
