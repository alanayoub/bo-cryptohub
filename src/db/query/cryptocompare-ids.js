import { BidModel } from '../schema';

/**
 *
 * GET CRYPTOCOMPARE IDS
 *
 * @returns {Object}
 *
 */
export default async function getCryptocompareIds() {

  const query = {ccid: {$exists: true}};
  const arr = await BidModel.find(query).lean();
  const set = new Set();
  arr.forEach(v => {
    set.add(v.ccid);
  });
  const output = Array.from(set);
  return output;

}
