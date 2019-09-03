'use strict';

import { PerDayModel, PerSecondModel } from '../schema';

const logger = require('../../logger');

async function perSecondSave(data, timestamp = +new Date()) {

  let ts;
  let id;
  let _id;
  let field;
  let value;
  let unixTime;
  let projectId;
  let defaultDoc;
  let projectData;

  const startTime = +new Date();
  for ([projectId, projectData] of Object.entries(data)) {
    for ([field, value] of Object.entries(projectData)) {

      try {

        if (projectId === void 0 || projectId === 'undefined') {
          debugger;
        }
        id = projectId;

        if (value && value.value) value = value.value;

        unixTime = +new Date(timestamp);
        defaultDoc = {
          id,
          field,
          lastChecked: unixTime,
          samples: [[unixTime, value], [unixTime, value]]
        }
        ts = await PerSecondModel.findOne({id, field});
        if (ts === null) {
          ts = await PerSecondModel.create(defaultDoc);
        }
        else if (ts.samples[1][1] !== value) {
          ts.samples = [ts.samples[1], [unixTime, value]];
        }
        if (!ts && !ts.save) debugger;
        ts.lastChecked = unixTime;
        ts = await ts.save();

      }
      catch (error) {
        logger.error(`error saving: ${error.name}: ${error}`);
        debugger;
      }

    }
  }
  logger.info('db save-perSecond', +new Date() - startTime);

}

async function perDaySave(data, timestamp = +new Date()) {

  let ts;
  let id;
  let field;
  let value;
  let unixTime;
  let projectId;
  let defaultDoc;
  let projectData;

  const startTime = +new Date();
  for ([projectId, projectData] of Object.entries(data)) {
    for ([field, value] of Object.entries(projectData)) {

      try {

        if (projectId === void 0 || projectId === 'undefined') {
          debugger;
        }
        id = projectId;

        const t = new Date(timestamp);
        const dd = t.getDate() - 1; // First day is 1
        const mm = t.getMonth();    // First month is 0
        const yyyy = ''+t.getFullYear();
        const yearArray = Array(12).fill().map(a => Array(31).fill(null));
        yearArray[mm][dd] = value;

        const query = {id, field, year: yyyy};

        ts = await PerDayModel.findOne(query);
        if (ts === null) {
          ts = await PerDayModel.create({...query, samples: yearArray});
        }
        else {
          ts.set(`samples.${mm}.${dd}`, value);
        }
        if (!ts && !ts.save) debugger;
        ts = await ts.save();

      }
      catch (error) {
        logger.error(`error saving: ${error.name}: ${error}`);
        debugger;
      }

    }
  }
  logger.info('db save-perDay', +new Date() - startTime);

}

/**
 *
 * data:
 * ```
 * {
 *   1182: {
 *     'cc-coinlist-Algorithm': "SHA-256"
 *     'cc-coinlist-BlockNumber': 585945
 *     'cc-coinlist-BlockNumber:last': 585945
 *   },
 *   ...
 * }
 *
 * ```
 *
 */
export default async function perSecond(data, timestamp = +new Date()) {
  await perSecondSave(data, timestamp);
  await perDaySave(data, timestamp);
}
