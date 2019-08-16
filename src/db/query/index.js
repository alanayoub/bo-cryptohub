'use strict';

// Binary Overdose
import { fieldTypeMap, columnDependencies }        from '../../settings';
import { PerSecondModel, MapModel, ExchangeModel } from '../schema';

const idsList = Object.keys(fieldTypeMap);

/**
 *
 * MAKE DATA SHIT
 *
 * To support legacy data format. TMP situation untill we fully
 * move to db data
 *
 */
function makeDataShit(objectData) {
  const data = {};
  for (const [id, obj] of Object.entries(objectData)) {
    if (!data[id]) data[id] = {};
    for (const [field, value] of Object.entries(obj)) {
      data[id][field]                  = obj[field].samples[1][1]; // value
      data[id][`${field}:last`]        = obj[field].samples[0][1]; // last value
      data[id][`${field}-timestamp`]   = obj[field].samples[1][0]; // timestamp
      data[id][`${field}-lastChecked`] = obj[field].lastChecked; // last time value was checked

      //
      // TODO: Add last checked
      // data[id][`${field}-lastChecked`] = obj[field]; // timestamp
      //
    }
  }
  return data;
}

/**
 *
 * GET ROWS
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
async function getRows(columns, sort, limit) {

  // db.tsseconds.find({ _id: { $regex: "^m-metrics-all_time_high_percent_down" } }).sort({ "samples.1": 1 })

  /**
   *
   *
   */
  async function getIds(columns, sortField, limit) {

    console.log(columns, sortField, limit);
    data = await PerSecondModel
      .find({_id: {$regex: `^${sortField}:`}})
      .sort({'samples.1.1': -1})
      .limit(limit)
      .lean();

    const ids = data.map(v => v._id.split(':')[1]);
    return ids;

  }

  /**
   *
   *
   */
  async function getFirstXSorted(ids, fieldSet) {

    const idsStr = ids.join('|');
    const fieldsStr = Array.from(fieldSet).join('|');
    const regex = `^(${fieldsStr}):(${idsStr})$`;
    const query = {
      _id: {$regex: regex}
    }
    const results = await PerSecondModel
      .find(query)
      .sort({'samples.1.1': -1})
      .lean();

    return results;

  }

  /**
   *
   *
   *
   */
  async function getAllResultsUnsorted(fieldSet) {

    const regex = '^'+ Array.from(fieldSet).join('|^');
    const query = {
      _id: { $regex: regex }
    }
    data = await PerSecondModel.find(query).lean();

    return data;

  }

  /**
   *
   *
   */
  function convertResultsToOutput(data, sortField) {

    let id;
    let field;
    const objectData = {};
    for (const item of data) {
      [field, id] = item._id.split(':');
      if (!objectData[id]) objectData[id] = {};
      objectData[id][field] = item;
    }

    let output;
    output = objectData;
    output = makeDataShit(output);
    for (const [key, item] of Object.entries(output)) {
      if (!item['cc-total-vol-full-Id']) delete output[key]; // Required field(s)
    }

    if (sortField) {
      // if (!Array.isArray(sort) sort = [sort];
      // data.sort((a, b) => {
      //   a.samples[1][1] - b.samples[1][1];
      // });
    }

    return output;

  }

  /**
   *
   *
   */
  function getFieldSet(columns, columnDependencies) {

    let field;
    let fields;
    let column;
    let fieldSet = new Set();
    for (column of columns) {
      fields = columnDependencies[column];
      for (field of fields) {
        if (idsList.includes(field)) {
          fieldSet.add(field);
        }
      }
    }

    return fieldSet;

  }

  let data;
  let output;
  let sortField;
  const fieldSet = getFieldSet(columns, columnDependencies);

  if (!fieldSet) throw new Error(`Invalid fieldSet ${fieldSet}`);

  if (sort) sortField = columnDependencies[sort][0];

  if (limit) {
    const ids = await getIds(columns, sortField, limit);
    data = await getFirstXSorted(ids, fieldSet);
    output = convertResultsToOutput(data);
  }
  else {
    data = await getAllResultsUnsorted(fieldSet);
    output = convertResultsToOutput(data, sortField);
  }

  return output;

}

/**
 *
 * GET ALL SYMBOLS
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
async function getAllSymbols() {

  const query = {_id: {$regex: "m-markets-base"}};
  const data = await PerSecondModel.find(query).lean();
  const symbols = new Set();

  for (const obj of Object.values(data)) {
    symbols.add(obj.samples[1][1]);
  }

  const output = Array.from(symbols);

  return output;

}

/**
 *
 * GET MAPS
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
async function getMaps(ids) {

  if (!Array.isArray(ids)) ids = [ids];

  const query = {_id: {$regex: ids.join('|')}};
  let maps = await MapModel.find(query).lean();

  if (!Array.isArray(maps)) maps = [maps];

  for (const item of maps) {
    if (typeof item.map === 'string') {
      item.map = JSON.parse(item.map);
    }
  }

  return maps;

}

/**
 *
 * GET EXCHANGES
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
async function getExchanges() {

  const query = {
    _id: {$regex: "exchange"}
  }

  const data = await ExchangeModel.find(query).lean();

  let id;
  let item;
  const output = {};
  for (item of data) {
    id = item._id.split(':')[1];
    if (!output[id]) output[id] = {};
    output[id] = item;
  }

  return output;

}

/**
 *
 * GET CURRENCIES
 *
 * @return {Object}
 *
 */
async function getCurrencies() {

  const query = {
    _id: {$regex: "xe-"}
  }

  const data = await PerSecondModel.find(query).lean();

  let id;
  const output = {};
  for (const item of data) {
    [field, id] = item._id.split(':');
    if (!output[id]) output[id] = {};
    output[id][field] = item.samples[1][1];
  }

  return output;

}

export {
  getMaps,
  getRows,
  getExchanges,
  getAllSymbols,
  getCurrencies,
}
