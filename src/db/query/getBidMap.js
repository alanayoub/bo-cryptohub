import { BidModel } from '../schema';
import logger from '../../logger';

/**
 *
 * GET BID MAP
 * Get a bid to source mappings
 *
 * ids or symbols are optional but at least one is required
 *
 * @param {String} source
 * @param {Array} [ids]
 * @param {Array} [symbold]
 * @returns {Object} bid to source id/symbol map
 *
 */
export default async function getBidMap({source, ids, symbols}) {
  if (!ids && !symbols) {
    logger.error('getBidMap: one of ids or symbols is required');
  }
  const type = ids ? 'id' : 'symbol';
  const values = ids || symbols;
  const query = {
    [`${source}${type}`]: {
      $in: values
    }
  };
  const arr = await BidModel.find(query).lean();
  const map = {};
  arr.forEach(v => {
    map[v[`${source}${type}`]] = v.bid;
  });
  return map;
}
