'use strict';

// Binary Overdose
import logger                               from '../../logger';
import { fieldTypeMap, columnDependencies } from '../../settings';
import { PerDayModel, PerSecondModel }      from '../schema';

const idsList = Object.keys(fieldTypeMap);

/**
 *
 *
 */
async function getIds(sortField, sortDirection, limit) {

  const data = await PerSecondModel
    .find({field: sortField})
    .sort({'samples.1.1': sortDirection})
    .limit(limit)
    .lean();

  const ids = data.map(v => v.id);
  return ids;

}

/**
 *
 *
 */
async function getRecords(fieldSet, sortField = false, sortDirection = false, limit = false) {

  // const requiredFields = ['cc-total-vol-full-Id'];

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
         lastChecked: 1,
         l: {$arrayElemAt: ["$samples", 0]},
         s: {$arrayElemAt: ["$samples", 1]}
       }
     },
     {
      $group: {
        _id: "$id",
        data: {
          $push: {
            "k" : "$field",
            "v" : {
              value: {$arrayElemAt: ["$s", 1]},
              lastValue: {$arrayElemAt: ["$l", 1]},
              timestamp: {$arrayElemAt: ["$s", 0]},
              lastChecked: "$lastChecked",

            }
          }
        }
      }
     },
     {
       $project: {
         data: {
           $arrayToObject: "$data"
         }
       }
     },
     {
       $match: {
         "data.cc-total-vol-full-Id": {$exists: true}
       }
     },
  ];

  if (sortField) {
    sortDirection = (sortDirection === 1 || sortDirection === -1) && -1;
    aggregate.push({$sort: {[`data.${sortField}.value`]: sortDirection}});
  }

  if (limit) {
    aggregate.push({$limit: limit});
  }

  let dbData = await PerSecondModel.aggregate(aggregate);

  let result;
  let results = {};
  for (result of dbData) {
    results[result._id] = result.data
  }

  return results;

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
  if (!isNaN(limit)) {

    startTime = +new Date();
    output = await getRecords(fieldSet, sortField, sortDirection, limit);
    logger.info(`db queryTime-rows first x: ${+new Date() - startTime}`);

  }
  else {

    startTime = +new Date();
    output = await getRecords(fieldSet, sortField, sortDirection);
    logger.info(`db queryTime-rows: ${+new Date() - startTime}`);

  }

  //
  // HISTORICAL
  //
  // startTime = +new Date();
  // const aggregate = [
  //    {
  //      $match: {
  //        field: {
  //          $in: Array.from(fieldSet)
  //        }
  //      }
  //    },
  //    {
  //      $project: {
  //        id: 1,
  //        field: 1,
  //        month: {$arrayElemAt: ["$samples", 7]}
  //      }
  //    },
  //    {
  //      $project: {
  //        _id: 0,
  //        id: 1,
  //        field: 1,
  //        value: {$arrayElemAt: ["$month", 25]}
  //      }
  //    },
  //    {
  //     $group: {
  //       _id: "$id",
  //       data: {
  //         $push: {"k" : "$field", "v" : "$value"}
  //       }
  //     }
  //    },
  //    {
  //      $project: {
  //        id: "$_id",
  //        _id: 0,
  //        data: {
  //          $arrayToObject: "$data"
  //        }
  //      }
  //    }
  // ];
  // const tmp = await PerDayModel.aggregate(aggregate);
  // console.log(`queryTime-perDay: ${+new Date() - startTime}`);

  return output;

}
