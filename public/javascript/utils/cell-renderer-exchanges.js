'use strict';

// Binary Overdose Projects
import { numberGroupDigits }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * Cell Renderer Exchanges
 *
 * @param {Object} params
 * @return {HTMLElement}
 *
 */
export default function cellRendererExchanges(params) {

  const total = numberGroupDigits(gnp(params, 'value.value'));
  const linkHtml = document.createElement('span');
  linkHtml.setAttribute('class', `cryptohub-link ch-numberofexchanges-link`);
  linkHtml.innerHTML = total;
  return total !== void 0 ? linkHtml : '-';

}
