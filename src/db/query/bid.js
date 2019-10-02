import { BidModel } from '../schema';

/**
 *
 * Get Bid
 *
 * @param {String} source
 * @param {String} id
 * @returns {String} returns an existing bid
 *
 */
export default async function getBid(source, id) {
  const query = {
    [`${source}id`]: String(id).toLowerCase()
  };
  const record = await BidModel.findOne(query).lean();
  if (record) {
    return record.bid;
  }
  else {
    return false;
  }
}
