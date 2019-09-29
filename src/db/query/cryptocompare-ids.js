import { PerDayModel } from '../schema';

/**
 *
 * GET CRYPTOCOMPARE IDS
 *
 * @returns {Object}
 *
 */
export default async function getCryptocompareIds() {

  const query = {field: 'cc-coinlist-Id'};
  const data = await PerDayModel.find(query).lean();
  const ids = new Set();

  for (const obj of Object.values(data)) {
    if (obj.realtime) {
      const value = obj.realtime.length === 2 ? obj.realtime[1][1] : obj.realtime[1];
      ids.add(value);
    }
  }

  const output = Array.from(ids);

  return output;

}
