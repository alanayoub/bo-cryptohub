import logger from '../../logger';
import { PerDayModel } from '../schema';
import { fieldTypeMap, columnDependencies } from '../../settings';
import { defaultSortField, defaultSortOrder } from '../../settings-platform';

const idsList = Object.keys(fieldTypeMap);

/**
 *
 * Get Records
 *
 */
async function getRecords(fieldSet, sortField = false, sortDirection = false, limit = false, display = true) {

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
        l: {$arrayElemAt: ['$realtime', 0]},
        s: {$arrayElemAt: ['$realtime', 1]}
      }
    },
    {
      $group: {
        _id: '$id',
        data: {
          $push: {
            'k': '$field',
            'v': {
              value: {$arrayElemAt: ['$s', 1]},
              lastValue: {$arrayElemAt: ['$l', 1]},
              timestamp: {$arrayElemAt: ['$s', 0]},
              lastChecked: '$lastChecked'
            }
          }
        }
      }
    },
    {
      $project: {
        data: {
          $arrayToObject: '$data'
        }
      }
    },
  ];

  if (display) {
    aggregate.push({
      $match: {
        $and: [
          {'data.cryptohub-name.value': {$exists: true, $ne: null}},
          {'data.cryptohub-symbol.value': {$exists: true, $ne: null}}
        ]
      }
    });
  }

  if (sortField) {
    sortDirection = (sortDirection === 1 || sortDirection === -1) && -1;
    aggregate.push({$sort: {[`data.${sortField}.value`]: sortDirection}});
  }

  if (limit) {
    aggregate.push({$limit: limit});
  }

  let dbData = await PerDayModel.aggregate(aggregate);

  let result;
  let results = {};
  // for (var [key,val] of Object.entries(dbData)) {
  //   if (val.data['cc-total-vol-full-Id'].value === null) {
  //     console.log(val);
  //     debugger;
  //   }
  // }
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
 * @returns {Object}
 *
 * TODO: Remove column / fields hack and implement correctly
 *
 */
export default async function getRows(columns, sort, limit, fields, display = true) {

  let data;
  let output;
  let sortField;
  let sortDirection;
  const fieldSet = fields ? new Set(fields) : getFieldSet(columns, columnDependencies);

  if (!fieldSet) throw new Error(`Invalid fieldSet ${fieldSet}`);

  if (sort && columnDependencies[sort.column]) {
    sortField = columnDependencies[sort.column][0];
    sortDirection = sort.direction === 'desc' ? -1 : 1;
  }
  // TODO: make this as a platform option
  // default sort
  else {
    sortField = defaultSortField;
    sortDirection = defaultSortOrder;
  }

  let startTime;
  if (!isNaN(limit)) {

    startTime = +new Date();
    output = await getRecords(fieldSet, sortField, sortDirection, limit, display);
    logger.info(`db queryTime-rows first x: ${+new Date() - startTime}`);

  }
  else {

    startTime = +new Date();
    output = await getRecords(fieldSet, sortField, sortDirection, false, display);
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
