import { WalletModel } from '../schema';

/**
 *
 * GET WALLETS
 *
 * @param {Array} columns
 * @param {String} sort
 * @returns {Object}
 *
 */
export default async function getWallets() {

  const regex = '^'+[
    'wallet',
    // 'cc-WalletFeatures',
    // 'cc-Coins',
    // 'cc-Platforms',
    // 'cc-Id',
    // 'cc-Url',
    // 'cc-LogoUrl',
    // 'cc-Name',
    // 'cc-Security',
    // 'cc-Anonymity',
    // 'cc-EaseOfUse',
    // 'cc-HasAttchedCard',
    // 'cc-HasTradingFacilities',
    // 'cc-HasVouchersAndOffers',
    // 'cc-SourceCodeUrl',
    // 'cc-ValidationType',
    // 'cc-MoreCoins',
    // 'cc-SortOrder'
  ].join('|^');

  const query = {
    _id: {$regex: regex}
  }

  const data = await WalletModel.find(query).lean();

  let id;
  let item;
  const output = {};
  for (item of data) {
    id = item._id.split(':')[1];
    if (!output[id]) output[id] = {};
    output[id] = item;
  }

  return output;

}
