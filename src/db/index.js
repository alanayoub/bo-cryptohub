'use strict';

import { PerSecondModel } from './schema';

/**
 *
 * data:
 * ```
 * {
 *   1182: {
 *     'cc-coinlist-Algorithm': "SHA-256"
 *     'cc-coinlist-Algorithm-timestamp': "2019-07-18T15:02:10.457Z"
 *     'cc-coinlist-BlockNumber': 585945
 *     'cc-coinlist-BlockNumber:last': 585945
 *     'cc-coinlist-BlockNumber-timestamp': "2019-07-18T15:02:10.457Z"
 *   },
 *   ...
 * }
 *
 * ```
 *
 */
async function perSecondSave(data, timestamp = +new Date()) {

  let ts;
  let _id;
  let field;
  let value;
  let filter;
  let unixTime;
  let projectId;
  let defaultDoc;
  let projectData;

  const regex = RegExp('^.*[-timestamp|:last]$');

  for ([projectId, projectData] of Object.entries(data)) {
    for ([field, value] of Object.entries(projectData)) {

      try {

        // NOTE: tmp solution while migrating from files to db
        // Ignores -timestamp and :last files
        if (regex.test(field)) continue;

        _id = `${field}:${projectId}`;

        filter = { _id };
        unixTime = +new Date(timestamp);
        defaultDoc = {
          _id,
          samples: [[unixTime, value], [unixTime, value]]
        }

        ts = await PerSecondModel.findOne({ _id });
        if (ts === null) {
          ts = await PerSecondModel.create(defaultDoc);
        }
        else {
          ts.samples = [ts.samples[1], [unixTime, value]]
        }

        ts = await ts.save();

      }
      catch (error) {
        console.log('error saving', error);
        debugger;
      }

    }
  }

}

export {
  perSecondSave
}
