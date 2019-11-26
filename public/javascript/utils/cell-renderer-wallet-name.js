'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * CELL RENDERER NAME
 *
 */
export default function cellRendererName(params) {

  const domain = 'https://cryptocompare.com';
  const fileName = gnp(params, 'data.cc-LogoUrl');
  const name = gnp(params, 'data.cc-Name') || ch.emptyCellValue;
  const url = gnp(params, 'data.cc-Url');
  const urlPath = domain + url;
  const filePath = domain + fileName;

  let styles = '';
  if (fileName) {
    styles = `background-image: url(${filePath})`;
  }

  const output = `
    <div class="ch-col-name">
      <span class="ch-icons" style="${styles}"></span>
      <a href="${urlPath}" target="_blank">${name}</a>
    </div>
  `;

  return output;

};
