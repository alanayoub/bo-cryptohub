import getNestedProperty from '../libs/bo-utils/object-get-nested-property.js';

/**
 *
 * valueFormatterPercentChange
 *
 * @param {}
 * @return {}
 *
 */
export default function valueFormatterPercentChange(params) {

  const value = getNestedProperty(params, 'value.value');
  const num = Number.parseFloat(value).toFixed(2);

  return isNaN(num) ? '-' : `${num}%`;

};
