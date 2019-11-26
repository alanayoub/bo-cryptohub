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
  return total !== void 0 ? total : '-';

}
