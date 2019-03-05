import getNestedProperty  from '../libs/bo-utils/object-get-nested-property.js';
import numberGroupDigits  from '../libs/bo-utils/number-group-digits.js';

/**
 *
 *
 */
export default function cellRendererNumber(params) {
  const number = getNestedProperty(params, 'value.value');
  return numberGroupDigits(number) || '-';
};
