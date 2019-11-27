'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * CELL RENDERER URL
 *
 */
export default function cellRendererUrl(params) {

  const junk = ['-', 'N/A', null, 0];
  const value = gnp(params, 'value.value') || params.value;

  if (junk.includes(value)) {
    return ch.emptyCellValue;
  }
  else {
    return `<a href="${value}" target="_blank">${value}</a>`;
  }

  return url;

};
