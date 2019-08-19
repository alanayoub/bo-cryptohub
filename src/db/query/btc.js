'use strict';

import { PerSecondModel } from '../schema';

/**
 *
 * GET BTC
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
export default async function getBTC() {

  const results = await PerSecondModel
    .find({
      _id: {$regex: 'cc-total-vol-full-PRICE:1182'}
    })
    .lean();

  return results;

}
