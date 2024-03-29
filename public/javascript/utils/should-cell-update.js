'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * SHOULD CELL UPDATE
 *
 * Decide whether to update the cell or not.
 * Note we DO want to update the cell even if the data hasnt changed so
 * that the HTML reloads. That said we don't want to update if we have no data.
 *
 * @param {String} oldValue
 * @param {String} newValue
 * @return {Boolean}
 *
 */
export default function shouldCellUpdate(oldValue, newValue) {

  try {

    let out = true;
    let ov = JSON.stringify(gnp(oldValue, 'value'));
    let nv = JSON.stringify(gnp(newValue, 'value'));
    if (ov !== nv) {
      out = false;
    }

    return out;

  }
  catch(error) {
    debugger;
  }
}
