'use strict';

import * as moment from 'moment';
import { numberGroupDigits } from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 *
 */
export default function cellRendererDate(params) {

  let value = gnp(params, 'value.value');

  // Is null or undefined
  if (!value) {
    return ch.emptyCellValue;
  }
  // is a number
  if (typeof value === 'number') {
    value = String(value);
  }
  // is a number string of 10 characters
  if (value.length === 10 && !isNaN(value)) {
    value += '000';
  }
  // Is a number string now should have 13 characters
  if (!isNaN(value)) {
    value = +value;
  }
  // is a non number string
  if (new Date(value) == 'Invalid Date') {
    // do nothing
  }
  else {
    value = new Date(value);
  }
  // const local = (params.bo && params.bo.local) || 'en-gb';
  const fromFormat = (params.bo && params.bo.fromFormat) || 'DD-MM-YYYY';
  return moment(value, fromFormat).format('D MMM YYYY');
  // return moment(value, 'DD-MM-YYYY').format('D MMM YYYY');
};
