'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * valueFormatterPercentChange
 *
 * @param {}
 * @return {}
 *
 */
export default function valueFormatterPercentChange(params) {

  const value = gnp(params, 'value.value');
  const num = Number.parseFloat(value).toFixed(2);

  return isNaN(num) ? '-' : `${num}%`;

};
