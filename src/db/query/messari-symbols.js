import { PerDayModel } from '../schema';

/**
 *
 * GET MESSARI SYMBOLS
 *
 * @param {Array} columns
 * @param {String} sort
 * @returns {Object}
 *
 */
export default async function getMessariSymbols() {

  const query = {field: 'm-markets-base'};
  const data = await PerDayModel.find(query).lean();
  const symbols = new Set();

  for (const obj of Object.values(data)) {
    if (obj.realtime) {
      const value = obj.realtime.length === 2 ? obj.realtime[1][1] : obj.realtime[1];
      symbols.add(value);
    }
  }

  const output = Array.from(symbols);

  return output;

}
