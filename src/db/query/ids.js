import { PerDayModel } from '../schema';

/**
 *
 * GET IDS
 *
 * @param {Array} ids
 * @returns {Object}
 *
 */
export default async function getIds(ids) {

  if (!Array.isArray(ids)) ids = [ids];

  const query = {
    year: new Date().getFullYear() + '',
    id: {$in: ids}
  };
  const projection = {_id: 0};

  let results = await PerDayModel.find(query, projection).lean();

  if (!Array.isArray(results)) results = [results];

  return results;

}
