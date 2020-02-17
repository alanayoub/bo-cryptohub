'use strict';

import columnLibrary from '../../../columns';
import { objectFlattenObject as flatten } from '../../../libs/bo-utils-client';

export default class {

  constructor({componentState}) {

    this.componentState = componentState;

    this.id = componentState.id;
    this.colId = componentState.colId;
    this.assetId = componentState.assetId;

    if (!this.colId) return;

    this.data = refs.rowData.find(v => v.id === this.assetId);
    this.column = flatten(columnLibrary)[this.colId];
    this.selector = `#gadget-container-${this.id}`;

  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
