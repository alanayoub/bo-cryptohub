// Generic Util functions
import diff                from '../libs/bo-utils/diff-numeric-strings.js';
import isNumber            from '../libs/bo-utils/is-number.js';
import isObject            from '../libs/bo-utils/object-is-object.js';
import formatCurrency      from '../libs/bo-utils/format-number-as-currency.js';
import getNestedProperty   from '../libs/bo-utils/object-get-nested-property.js';

// Cryptohub Util functions
import countdownMs         from './html-countdown.js';
import getCssClass         from './get-cell-css-class-diff.js';

/**
 *
 * Cell Renderer Currency
 *
 * Render numbers in the following format: $123,456,789.00
 * Highlight changes between previous versions like so: <span>$123,45</span><span>1,789.00</span>
 * Colour the changed part of the number in green or red depending on change direction
 *
 * @param {Object} refs
 * @param {String} currency
 * @param {Object} params
 * @return {HTMLElement}
 *
 */
export default function cellRendererCurrency(refs, params) {

  const { colDef, data } = params;
  const id = getNestedProperty(data, 'cc-total-vol-full-Id.value');
  const html = document.createElement('div');

  const newValue = getNestedProperty(params, 'value.value');
  const oldValue = getNestedProperty(refs, `oldDBValues.${id}.${colDef.field}.value`);

  // format number
  let newVal;
  let oldVal;
  const digits = newValue >= 1 ? 2 : 6;
  if (isNumber(newValue)) newVal = formatCurrency(newValue, digits, params.currency);
  if (isNumber(oldValue)) oldVal = formatCurrency(oldValue, digits, params.currency);

  let result = '-';
  if (isNumber(newValue) && !isNumber(oldValue)) {
    result = newVal;
  }
  else {

    let { start, end } = diff(oldVal, newVal);
    const cssClass = getCssClass(oldVal, newVal);
    result = `<span>${start}</span><span class="${cssClass}">${end}</span>`;

  }

  html.innerHTML = result;

  setTimeout(() => {
    html.className = 'cryptohub-cell-old-data';
  }, countdownMs(params));

  return html;



}
