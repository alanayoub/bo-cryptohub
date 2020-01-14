import { WalletModel } from '../schema';
import logger from '../../logger';

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
 * @param {Object} data
 *
 */
export default async function walletSave(data) {

  let _id;
  let key;
  let val;
  let doc;
  let filter;
  let defaultDoc;
  let walletId;
  let walletData;

  for ([walletId, walletData] of Object.entries(data)) {

    try {

      _id = `wallet:${walletId}`;
      filter = { _id };
      defaultDoc = {
        _id,
        ...walletData
      }

      doc = await WalletModel.findOne({ _id });
      if (doc === null) {
        doc = await WalletModel.create(defaultDoc);
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
      logger.error('error saving', error);
    }

  }

  return doc;

}
