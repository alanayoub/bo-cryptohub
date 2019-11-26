'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * Cell Renderer Wallets
 *
 * @param {Object} params
 * @return {HTMLElement}
 *
 */
export default function cellRendererWallets(params) {

  let value = gnp(params, 'value.value');
  if (!value) {
    return ch.emptyCellValue;
  }
  let output = [];
  let max = 3;
  if (ch.walletMapIdName) {
    for (let i = 0; i < max; i++) {
      if (value[i]) {
        output[i] = ch.walletMapIdName[value[i]];
      }
    }
  }
  output = output.join(', ');
  if (value.length > max) {
    output += '...'
  }
  return output;

}
