'use strict';

import { MapModel } from '../schema';

const logger = require('../../logger');

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
export default async function mapSave(_id, map) {

  const defaultDoc = {
    _id,
    map
  }
  let doc = await MapModel.findOne({ _id });
  if (doc === null) {
    doc = await MapModel.create(defaultDoc);
    if (doc) doc = await doc.save();
    else debugger;
  }
  else {
    doc.map = map;
    if (!doc && !doc.save) debugger;
    doc = await doc.save();
  }

  return doc;

}
