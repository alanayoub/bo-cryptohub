'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * CELL RENDERER NAME
 *
 */
export default function cellRendererName(params) {

  const fileName = gnp(params, 'data.cc-total-vol-full-ImageUrl.value');
  const symbol = gnp(params, 'data.cc-coinlist-Symbol.value');
  const name = gnp(params, 'value.value') || ch.emptyCellValue;

  let imgUrl;
  let styles = '';
  if (fileName) {
    imgUrl = `https://www.cryptocompare.com${fileName}`;
    styles = `background-image: url(${imgUrl})`;
  }

  const output = `
    <div class="ch-col-name">
      <span class="ch-icons" style="${styles}"></span>
      <strong>${name}</strong><span class="ch-symbol"> (${symbol})</span>
    </div>
  `;

  return output;

};
