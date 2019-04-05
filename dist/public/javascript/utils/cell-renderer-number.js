'use strict';

/**
 *
 *
 */
export default function cellRendererNumber(params) {
  const number = bo.objectGetNestedProperty(params, 'value.value');
  return bo.numberGroupDigits(number) || '-';
};
