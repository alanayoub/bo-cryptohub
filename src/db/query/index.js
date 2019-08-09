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
      data[id][field]                = obj[field][1][1]; // value
      data[id][`${field}:last`]      = obj[field][0][1]; // last value
      data[id][`${field}-timestamp`] = obj[field][1][0]; // timestamp
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
async function getRows(columns, sort) {

  // db.tsseconds.find({ _id: { $regex: "^m-metrics-all_time_high_percent_down" } }).sort({ "samples.1": 1 })

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

  const regex = '^'+ Array.from(fieldSet).join('|^');
  const query = {
    _id: { $regex: regex }
  }

  const data = await PerSecondModel.find(query).lean();

  let id;
  const objectData = {};
  for (const item of data) {
    [field, id] = item._id.split(':');
    if (!objectData[id]) objectData[id] = {};
    objectData[id][field] = item.samples;
  }

  let output;
  output = objectData;
  output = makeDataShit(output);
  for (const [key, item] of Object.entries(output)) {
    if (!item['cc-total-vol-full-Id']) delete output[key]; // Required field(s)
  }

  // Organize data first
  // if (sort) {
  //   if (!Array.isArray(sort) sort = [sort];
  //   data.sort((a, b) => {
  //     a.samples[1][1] - b.samples[1][1];
  //   });
  // }

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

export {
  getMaps,
  getRows,
  getExchanges,
  getAllSymbols,
}
