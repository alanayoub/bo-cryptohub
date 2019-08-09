'use strict';

import { MapModel, ExchangeModel, PerSecondModel } from './schema';

/**
 *
 * data:
 * ```
 // * {
 // *   123456: {
 // *     cc-centralizationType: // "Centralized"
 // *     cc-country: // "United Kingdom"
 // *     cryptohub-numberOfCryptoCurrencies: // 6
 // *   },
 // * }
 *
 * ```
 *
 */
async function mapSave(_id, map) {

  const defaultDoc = {
    _id,
    map
  }
  let doc = await MapModel.findOne({ _id });
  if (doc === null) {
    doc = await MapModel.create(defaultDoc);
    doc = await doc.save();
  }
  else {
    doc.map = map;
    doc = await doc.save();
  }

  return doc;

}

/**
 *
 * data:
 * ```
 * {
 *   123456: {
 *     cc-centralizationType: // "Centralized"
 *     cc-country: // "United Kingdom"
 *     cryptohub-numberOfCryptoCurrencies: // 6
 *   },
 * }
 *
 * ```
 *
 */
async function exchangeSave(data) {

  let _id;
  let key;
  let val;
  let doc;
  let filter;
  let defaultDoc;
  let exchangeId;
  let exchangeData;

  for ([exchangeId, exchangeData] of Object.entries(data)) {

    if (exchangeId === void 0 || exchangeId === 'undefined') {
      debugger;
    }

    try {

      _id = `exchange:${exchangeId}`;
      filter = { _id };
      defaultDoc = {
        _id,
        ...exchangeData
      }

      doc = await ExchangeModel.findOne({ _id });
      if (doc === null) {
        doc = await ExchangeModel.create(defaultDoc);
        doc = await doc.save();
      }
      else {
        for ([key, val] of Object.entries(defaultDoc)) {
          doc[key] = val;
        }
        doc = await doc.save();
      }

    }
    catch (error) {
      console.log('error saving', error);
      debugger;
    }

  }

  return doc;

}

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

  const regex = RegExp('^.*(-timestamp|:last)$');

  for ([projectId, projectData] of Object.entries(data)) {
    for ([field, value] of Object.entries(projectData)) {

      try {

        // NOTE: tmp solution while migrating from files to db
        // Ignores -timestamp and :last files
        if (regex.test(field)) continue;

        if (projectId === void 0 || projectId === 'undefined') {
          debugger;
        }
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
          ts = await ts.save();
        }
        else if (ts.samples[1][1] !== value) {
          ts.samples = [ts.samples[1], [unixTime, value]]
          ts = await ts.save();
        }

      }
      catch (error) {
        console.log('error saving', error);
        debugger;
      }

    }
  }

  return ts;

}

export {
  mapSave,
  exchangeSave,
  perSecondSave
}
