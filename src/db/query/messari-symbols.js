import { PerSecondModel } from '../schema';

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
  const data = await PerSecondModel.find(query).lean();
  const symbols = new Set();

  for (const obj of Object.values(data)) {
    const value = obj.samples.length === 2 ? obj.samples[1][1] : obj.samples[1];
    symbols.add(value);
  }

  const output = Array.from(symbols);

  return output;

}
