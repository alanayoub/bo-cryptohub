'use strict';

import { numberGroupDigits }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 *
 */
export default function cellRendererNumber(params) {
  const number = gnp(params, 'value.value');
  return numberGroupDigits(number) || '-';
};
