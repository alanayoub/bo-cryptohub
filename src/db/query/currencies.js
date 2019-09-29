import { PerDayModel } from '../schema';

/**
 *
 * GET CURRENCIES
 *
 * @returns {Object}
 *
 */
export default async function getCurrencies() {

  const query = {
    field: {$regex: 'xe-'}
  }
  const projection = {_id: 0};

  const data = await PerDayModel.find(query, projection).lean();

  let id;
  let field;
  const output = {};
  for (const item of data) {
    id = item.id;
    field = item.field;
    if (!output[id]) output[id] = {};
    output[id][field] = item.realtime[1][1];
  }

  return output;

}
