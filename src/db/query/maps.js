'use strict';

import { MapModel } from '../schema';

/**
 *
 * GET MAPS
 *
 * @param {Array} ids
 * @return {Object}
 *
 */
export default async function getMaps(ids) {

  if (!Array.isArray(ids)) ids = [ids];

  const query = {_id: {$regex: ids.join('|')}};
  let maps = await MapModel.find(query).lean();

  if (!Array.isArray(maps)) maps = [maps];

  for (const item of maps) {
    if (typeof item.map === 'string') {
      item.map = JSON.parse(item.map);
    }
  }

  return maps;

}
