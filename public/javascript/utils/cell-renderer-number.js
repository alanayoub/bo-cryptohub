'use strict';

import { numberGroupDigits }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 *
 */
export default function cellRendererNumber(params) {
  let number = gnp(params, 'value.value');
  if (params.bo) {
    if (params.bo.floor) {
      number = Math.floor(number);
    }
    else if (params.bo.decimals) {
      number = Number.parseFloat(number).toFixed(params.bo.decimals);
    }
  }
  return numberGroupDigits(number) || '-';
};
