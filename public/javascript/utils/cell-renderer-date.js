'use strict';

import { numberGroupDigits }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 *
 */
export default function cellRendererDate(params) {
  const date = gnp(params, 'value.value');
  return typeof date === 'string' ? date : '-';
};
