'use strict';

const {
  objectGetNestedProperty: getNestedProperty,
  formatNumberAsCurrency: formatCurrency
} = bo;

/**
 *
 * valueFormatterBTC
 *
 * @param {Object} params
 * @return {String}
 *
 */
export default function valueFormatterBTC(params) {

  const number = getNestedProperty(params, 'value.value');
  if (number === null || number === void 0) return '-';
  return formatCurrency(number, 8, 'BTC');

};
