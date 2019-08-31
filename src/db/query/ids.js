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

  ids.push('cc-total-vol-full-Id');
  const query = {
    id: {$in: ids}
  };
  const projection = {_id: 0};

  let results = await PerSecondModel.find(query, projection).lean();

  if (!Array.isArray(results)) results = [results];

  return results;

}
