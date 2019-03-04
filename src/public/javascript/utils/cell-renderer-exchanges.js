// Generic Util functions
import getNestedProperty from '../libs/bo-utils/object-get-nested-property.js';
import numberGroupDigits from '../libs/bo-utils/number-group-digits.js';

/**
 *
 * Cell Renderer Exchanges
 *
 * @param {Object} params
 * @return {HTMLElement}
 *
 */
export default function cellRendererExchanges(params) {

  const total = numberGroupDigits(getNestedProperty(params, 'value.value'));
  const linkHtml = document.createElement('span');
  linkHtml.setAttribute('class', `cryptohub-link ch-numberofexchanges-link`);
  linkHtml.innerHTML = total;
  return linkHtml;

}
