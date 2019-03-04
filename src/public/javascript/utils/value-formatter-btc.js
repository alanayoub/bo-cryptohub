import getNestedProperty from '../libs/bo-utils/object-get-nested-property.js';
import formatCurrency from '../libs/bo-utils/format-number-as-currency.js';

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
