// Cryptohub Util functions
import countdownMs from './html-countdown.js';
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

  const { colDef, data } = params;
  const id = bo.objectGetNestedProperty(data, 'cc-total-vol-full-Id.value');
  const html = document.createElement('div');

  const newValue = bo.objectGetNestedProperty(params, 'value.value');
  const oldValue = bo.objectGetNestedProperty(refs, `oldDBValues.${id}.${colDef.field}`);

  // format number
  let newVal;
  let oldVal;
  const digits = newValue >= 1 ? 2 : 6;
  if (bo.isNumber(newValue)) newVal = bo.formatNumberAsCurrency(newValue, digits, params.currency);
  if (bo.isNumber(oldValue)) oldVal = bo.formatNumberAsCurrency(oldValue, digits, params.currency);

  let result = '-';
  if (bo.isNumber(newValue) && !bo.isNumber(oldValue)) {
    result = newVal;
  }
  else {

    let { start, end } = bo.diffNumericStrings(oldVal, newVal);
    const cssClass = getCssClass(oldVal, newVal);
    result = `<span>${start}</span><span class="${cssClass}">${end}</span>`;

  }

  html.innerHTML = result;

  setTimeout(() => {
    html.className = 'cryptohub-cell-old-data';
  }, countdownMs(params));

  return html;



}
