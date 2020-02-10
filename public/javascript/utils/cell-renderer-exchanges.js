'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../libs/bo-utils-client';

/**
 *
 * Cell Renderer Exchanges
 *
 * @param {Object} params
 * @return {HTMLElement}
 *
 */
export default function cellRendererExchanges(params) {

  if (isEmptyObject(ch.exchanges)) {
    return ch.emptyCellValue;
  }

  const dex = gnp(params, 'data.cryptohub-exchangesListDex.value') || [];
  const both = gnp(params, 'data.cryptohub-exchangesListAcceptsBoth.value') || [];
  const crypto = gnp(params, 'data.cryptohub-exchangesListCryptoOnly.value') || [];
  const exchangeIds = [
    ...dex, ...both, ...crypto
  ];

  let output = new Set();
  let max = 3;
  for (const id of exchangeIds) {
    output.add(ch.exchanges[id]['cc-Name']);
    if (output.size === max) {
      break;
    }
  }
  output = Array.from(output).join(', ');
  if (exchangeIds.length > max) {
    output += '...'
  }

  return output;

}
