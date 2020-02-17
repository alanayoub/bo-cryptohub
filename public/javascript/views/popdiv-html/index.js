'use strict';

// Binary Overdose Projects
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

// Cryptohub
import initPug from '../../generated/init-pug.generated.js';

import style from './index.scss';

/**
 *
 * Generate PopDiv HTML with AG-GRID container
 *
 */
function html(params, gridId) {
  const projectName = gnp(params, 'data.cc-total-vol-full-FullName.value');
  const headerName = gnp(params, 'colDef.headerName');
  const name = `${projectName} ${headerName}`;
  const description = gnp(params, 'value.value');
  const output = {
    name,
    gridId,
    description,
  }
  const contentHtml = initPug['popdiv-html'](output);
  return contentHtml;
}

/**
 *
 * Build PopDiv with Wallet data in an AG-Grid
 *
 */
export default function popdivWallets(params, rand) {

  const id = `ch-tippy-${rand}`;
  const gridId = `grid-${rand}`;

  // Populate html content
  const idSelector = `#${id}`;
  const content = html(params, gridId);
  document.querySelector(idSelector).innerHTML = content;

}
