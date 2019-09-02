'use strict';

import { PerSecondModel } from '../schema';

/**
 *
 * GET CURRENCIES
 *
 * @return {Object}
 *
 */
export default async function getCurrencies() {

  const query = {
    field: {$regex: 'xe-'}
  }
  const projection = {_id: 0};

  const data = await PerSecondModel.find(query, projection).lean();

  let id;
  let field;
  const output = {};
  for (const item of data) {
    id = item.id;
    field = item.field;
    if (!output[id]) output[id] = {};
    output[id][field] = item.samples[1][1];
  }

  return output;

}
