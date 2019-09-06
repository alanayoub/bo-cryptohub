import { MapModel } from '../schema';
import logger from '../../logger';

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
    else {
      logger.error('error saving map: no save method on doc');
    };
  }
  else {
    doc.map = map;
    if (!doc && !doc.save) {
      logger.error('error saving map: no save method on doc');
    };
    doc = await doc.save();
  }

  return doc;

}
