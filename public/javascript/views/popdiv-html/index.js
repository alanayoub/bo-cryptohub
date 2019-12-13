'use strict';

// Binary Overdose Projects
import { getRandomInt }                   from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

// Cryptohub
import popDiv  from '../../utils/popdiv.js';
import initPug from '../../generated/init-pug.generated.js';

import style from './index.css';

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
export default function popdivWallets(params) {

  const rand = getRandomInt();
  const id = `ch-tippy-${rand}`;
  const gridId = `grid-${rand}`;

  // Create popdiv
  const $cell = params.event.target.closest('.ag-cell');
  const contentPopdiv = initPug['ch-tippy-popdiv']({id});
  popDiv($cell, contentPopdiv);

  // Populate html content
  const idSelector = `#${id}`;
  const content = html(params, gridId);
  document.querySelector(idSelector).innerHTML = content;

}
