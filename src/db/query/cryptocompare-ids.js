import { PerSecondModel } from '../schema';

/**
 *
 * GET CRYPTOCOMPARE IDS
 *
 * @returns {Object}
 *
 */
export default async function getCryptocompareIds() {

  const query = {field: 'cc-coinlist-Id'};
  const data = await PerSecondModel.find(query).lean();
  const ids = new Set();

  for (const obj of Object.values(data)) {
    const value = obj.samples.length === 2 ? obj.samples[1][1] : obj.samples[1];
    ids.add(value);
  }

  const output = Array.from(ids);

  return output;

}
