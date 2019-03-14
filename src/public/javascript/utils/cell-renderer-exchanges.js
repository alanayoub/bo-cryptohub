'use strict';

/**
 *
 * Cell Renderer Exchanges
 *
 * @param {Object} params
 * @return {HTMLElement}
 *
 */
export default function cellRendererExchanges(params) {

  const total = bo.numberGroupDigits(bo.objectGetNestedProperty(params, 'value.value'));
  const linkHtml = document.createElement('span');
  linkHtml.setAttribute('class', `cryptohub-link ch-numberofexchanges-link`);
  linkHtml.innerHTML = total;
  return linkHtml;

}
