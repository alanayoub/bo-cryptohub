'use strict';

// Binary Overdose
import { fieldTypeMap, columnDependencies } from '../../settings';
import { PerDayModel, PerSecondModel }      from '../schema';

const idsList = Object.keys(fieldTypeMap);

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
    objectData[id][field] = {
      lastChecked: item.lastChecked,
      lastValue: item.samples[0][1],
      timestamp: item.samples[1][0],
      value: item.samples[1][1]
    }
  }

  let output;
  output = objectData;
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

  let data;
  let output;
  let sortField;
  let sortDirection;
  const fieldSet = fields ? new Set(fields) : getFieldSet(columns, columnDependencies);

  // Required
  fieldSet.add('cc-total-vol-full-Id');
  fieldSet.add('cc-total-vol-full-CHANGEPCTDAY');

  if (!fieldSet) throw new Error(`Invalid fieldSet ${fieldSet}`);

  if (sort) {
    sortField = columnDependencies[sort.column][0];
    sortDirection = sort.direction === 'desc' ? -1 : 1;
  }

  let startTime;
  if (limit) {

    startTime = +new Date();
    const ids = await getIds(sortField, sortDirection, limit);
    data = await getFirstXSorted(ids, fieldSet, sortDirection);
    console.log(`queryTime-rows first x: ${+new Date() - startTime}`);

    startTime = +new Date();
    output = convertResultsToOutput(data);
    console.log(`parseTime-rows first x: ${+new Date() - startTime}`);

  }
  else {

    startTime = +new Date();
    data = await getAllResultsUnsorted(fieldSet);
    console.log(`queryTime-rows: ${+new Date() - startTime}`);

    startTime = +new Date();
    output = convertResultsToOutput(data, sortField);
    console.log(`parseTime-rows: ${+new Date() - startTime}`);

  }

  const aggregate = [
     {
       $match: {
         field: {
           $in: Array.from(fieldSet)
         }
       }
     },
     {
       $project: {
         id: 1,
         field: 1,
         month: {$arrayElemAt: ["$samples", 7]}
       }
     },
     {
       $project: {
         _id: 0,
         id: 1,
         field: 1,
         value: {$arrayElemAt: ["$month", 25]}
       }
     },
     {
      $group: {
        _id: "$id",
        data: {
          $push: {"k" : "$field", "v" : "$value"}
        }
      }
     },
     {
       $project: {
         id: "$_id",
         _id: 0,
         data: {
           $arrayToObject: "$data"
         }
       }
     }
  ];
  startTime = +new Date();
  const tmp = await PerDayModel.aggregate(aggregate);
  console.log(`queryTime-perDay: ${+new Date() - startTime}`);

  return output;

}
