'use strict';

import columnLibrary from '../../columns';

// Binary Overdose Projects
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import { objectFlattenObject as flatten } from '../../libs/bo-utils-client';

// Cryptohub
import initPug from '../../generated/init-pug.generated.js';

import style from './index.scss';

/**
 *
 * Build PopDiv with Wallet data in an AG-Grid
 *
 */
export default class html {

  constructor({componentState}) {
    const { id, assetId, colId } = componentState;
    this.selector = `#gadget-container-${id}`;
    if (!colId) return;

    const data = refs.rowData.find(v => v.id === assetId);
    const colLib = flatten(columnLibrary);
    const column = colLib[colId];
    const projectName = gnp(data, 'cc-total-vol-full-FullName.value');
    const name = `${projectName} ${column.headerName}`;
    const description = data[column.field].value

    const contentHtml = initPug['popdiv-html']({name, description});
    document.querySelector(this.selector).innerHTML = contentHtml;

  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
