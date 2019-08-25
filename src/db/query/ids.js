'use strict';

import { PerSecondModel } from '../schema';

/**
 *
 * GET IDS
 *
 * @param {Array} ids
 * @return {Object}
 *
 */
export default async function getIds(ids) {

  if (!Array.isArray(ids)) ids = [ids];

  const regex = 'cc-total-vol-full-Id:' + ids.join('|cc-total-vol-full-Id:');
  const query = {_id: {$regex: regex}};
  let results = await PerSecondModel.find(query).lean();

  if (!Array.isArray(results)) results = [results];

  return results;

}
