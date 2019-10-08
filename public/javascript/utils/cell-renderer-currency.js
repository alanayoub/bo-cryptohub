'use strict';

// Binary Overdose Projects
import { isNumber }                       from '../libs/bo-utils-client';
import { diffNumericStrings }             from '../libs/bo-utils-client';
import { formatNumberAsCurrency }         from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

// Cryptohub Util functions
import getCssClass from './get-cell-css-class-diff.js';

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

  let result = ch.emptyCellValue;
  if (!params.value || !params.value.value) return result;

  let newValue = gnp(params, 'value.value');
  let oldValue = gnp(params, `value.lastValue`);

  if (!isNumber(oldValue) || !isNumber(newValue)) {
    return result;
  }

  const { colDef, data } = params;
  const html = document.createElement('div');

  if (params.inputCurrency === 'BTC' && params.currency === 'SAT') {
    newValue *= 100000000;
    oldValue *= 100000000;
  }

  // format number
  const digits = newValue >= 1 ? 2 : 6;
  const newVal = formatNumberAsCurrency(newValue, params.currency);
  const oldVal = formatNumberAsCurrency(oldValue, params.currency);

  let { start, end } = diffNumericStrings(oldVal, newVal);
  const cssClass = getCssClass(oldVal, newVal);
  result = `<span>${start}</span><span class="${cssClass}">${end}</span>`;

  html.innerHTML = result;

  return html;

}
