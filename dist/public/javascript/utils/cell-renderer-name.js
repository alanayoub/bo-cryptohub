'use strict';

const gnp = bo.objectGetNestedProperty;

/**
 *
 * CELL RENDERER NAME
 *
 */
export default function cellRendererName(params) {

  const fileName = gnp(params, 'data.cc-total-vol-full-ImageUrl.value');
  const imgUrl = `https://www.cryptocompare.com${fileName}`;

  const symbol = gnp(params, 'data.cc-coinlist-Symbol.value');
  const img = imgUrl ? `<img src="${imgUrl}" class="ch-icons" />` : '';

  const output = `
    <div class="ch-col-name">
      ${img}
      <strong>${params.value}</strong><span> (${symbol})</span>
    </div>
  `

  return output;

};
