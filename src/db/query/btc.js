import { BidModel, PerDayModel } from '../schema';

/**
 *
 * GET BTC
 * Get BTC price from CoinMarketCap data
 *
 * @param {Array} columns
 * @param {String} sort
 * @returns {Object}
 *
 */
export default async function getBTC() {

  // Get Bitcoin id
  const bidQuery = {
    ccname: 'bitcoin',
    ccsymbol: 'btc'
  }
  const btc = await BidModel.findOne(bidQuery).lean();
  const bid = btc.bid;

  // Get Bitcoin price
  const query = {
    id: bid,
    field: 'cc-total-vol-full-PRICE'
  };
  const projection = {_id: 0};
  const results = await PerDayModel
    .find(query, projection)
    .lean();

  return results;

}
