'use strict';

import { ExchangeModel } from '../schema';

const logger = require('../../logger');

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
export default async function exchangeSave(data) {

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
      if (!doc && !doc.save) debugger;
      doc = await doc.save();
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
