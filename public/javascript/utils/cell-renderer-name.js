'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * CELL RENDERER NAME
 *
 */
export default function cellRendererName(params) {

  const fileName = gnp(params, 'data.cryptohub-coin-image-url.value');
  const symbol = gnp(params, 'data.cryptohub-symbol.value');
  const name = gnp(params, 'data.cryptohub-name.value') || ch.emptyCellValue;

  let styles = '';
  if (fileName) {
    styles = `background-image: url(${fileName})`;
  }

  const output = `
    <div class="ch-col-name">
      <span class="ch-icons" style="${styles}"></span>
      <strong>${name}</strong><span class="ch-symbol"> (${symbol})</span>
    </div>
  `;

  return output;

};
