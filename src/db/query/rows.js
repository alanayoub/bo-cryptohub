'use strict';

// Binary Overdose
import { fieldTypeMap, columnDependencies } from '../../settings';
import { PerSecondModel }                   from '../schema';

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
 *
 */
async function getIds(sortField, sortDirection, limit) {

  const data = await PerSecondModel
    .find({_id: {$regex: `^${sortField}:`}})
    .sort({'samples.1.1': sortDirection})
    .limit(limit)
    .lean();

  const ids = data.map(v => v._id.split(':')[1]);
  return ids;

}

/**
 *
 *
 */
async function getFirstXSorted(ids, fieldSet, sortDirection) {

  const idsStr = ids.join('|');
  const fieldsStr = Array.from(fieldSet).join('|');
  const regex = `^(${fieldsStr}):(${idsStr})$`;
  const query = {
    _id: {$regex: regex}
  }
  const results = await PerSecondModel
    .find(query)
    .sort({'samples.1.1': sortDirection})
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
  const data = await PerSecondModel.find(query).lean();

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

/**
 *
 * GET ROWS
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 * TODO: Remove column / fields hack and implement correctly
 *
 */
export default async function getRows(columns, sort, limit, fields) {

  const startTime = +new Date();
  let data;
  let output;
  let sortField;
  let sortDirection;
  const fieldSet = fields ? new Set(fields) : getFieldSet(columns, columnDependencies);

  fieldSet.add('cc-total-vol-full-Id'); // required

  if (!fieldSet) throw new Error(`Invalid fieldSet ${fieldSet}`);

  if (sort) {
    sortField = columnDependencies[sort.column][0];
    sortDirection = sort.direction === 'desc' ? -1 : 1;
  }

  if (limit) {
    const ids = await getIds(sortField, sortDirection, limit);
    data = await getFirstXSorted(ids, fieldSet, sortDirection);
    output = convertResultsToOutput(data);
  }
  else {
    data = await getAllResultsUnsorted(fieldSet);
    output = convertResultsToOutput(data, sortField);
  }

  console.log(`rows query time: ${+new Date() - startTime}`);
  return output;

}
