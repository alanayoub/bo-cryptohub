'use strict';

import { PerSecondModel } from '../schema';

/**
 *
 * GET MESSARI SYMBOLS
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
export default async function getMessariSymbols() {

  const query = {field: 'm-markets-base'};
  const data = await PerSecondModel.find(query).lean();
  const symbols = new Set();

  for (const obj of Object.values(data)) {
    symbols.add(obj.samples[1][1]);
  }

  const output = Array.from(symbols);

  return output;

}
