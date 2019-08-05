'use strict';

// Binary Overdose
import { fieldTypeMap, columnDependencies } from '../../settings';
import { PerSecondModel }                   from '../schema';

const idsList = Object.keys(fieldTypeMap);

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

  const data = await PerSecondModel.find(query);

  let id;
  const objectData = {};
  for (const item of data) {
    [field, id] = item._id.split(':');
    if (!objectData[id]) objectData[id] = {};
    objectData[id][field] = item.samples;
  }

  const output = objectData;

  // Organize data first
  // if (sort) {
  //   if (!Array.isArray(sort) sort = [sort];
  //   data.sort((a, b) => {
  //     a.samples[1][1] - b.samples[1][1];
  //   });
  // }

  return output;


    //const columns = [
    //  'percentChange24hUSDCC',
    //  'volume24HourCMC'
    //];
    //getRows(columns).then(data => {
    //  console.log(!!data);
    //  debugger;
    //});
    ////
    ////
    ////

}

export default {
  getRows
}
