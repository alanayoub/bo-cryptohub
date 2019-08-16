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

  const { colDef, data } = params;
  const html = document.createElement('div');

  const newValue = gnp(params, 'value.value');
  const oldValue = gnp(params, `data.${params.colDef.field}:last`);

  // format number
  let newVal;
  let oldVal;
  const digits = newValue >= 1 ? 2 : 6;
  if (isNumber(newValue)) newVal = formatNumberAsCurrency(newValue, params.currency);
  if (isNumber(oldValue)) oldVal = formatNumberAsCurrency(oldValue, params.currency);

  if (isNumber(newValue) && !isNumber(oldValue)) {
    result = newVal;
  }
  else {

    let { start, end } = diffNumericStrings(oldVal, newVal);
    const cssClass = getCssClass(oldVal, newVal);
    result = `<span>${start}</span><span class="${cssClass}">${end}</span>`;

  }

  html.innerHTML = result;

  return html;

}
