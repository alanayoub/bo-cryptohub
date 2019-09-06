import { PerSecondModel } from '../schema';

/**
 *
 * GET BTC
 *
 * @param {Array} columns
 * @param {String} sort
 * @returns {Object}
 *
 */
export default async function getBTC() {

  const query = {
    id: '1182',
    field: 'cc-total-vol-full-PRICE'
  };
  const projection = {_id: 0};
  const results = await PerSecondModel
    .find(query, projection)
    .lean();

  return results;

}
