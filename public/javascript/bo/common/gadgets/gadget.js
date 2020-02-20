'use strict';

import columnLibrary from '../../../columns';
import { objectFlattenObject as flatten } from '../../../libs/bo-utils-client';

export default class {

  constructor({componentState}) {

    this.componentState = componentState;

    this.id = componentState.id;
    this.colId = componentState.colId;
    this.assetId = componentState.assetId;
    this.selector = `#gadget-container-${this.id}`;

    if (this.assetId) this.data = refs.rowData.find(v => v.id === this.assetId);
    if (this.colId) this.column = flatten(columnLibrary)[this.colId];

  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
