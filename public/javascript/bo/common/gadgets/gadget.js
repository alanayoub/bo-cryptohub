'use strict';

import columnLibrary from '../../../columns';
import { waitUntil } from '../../../libs/bo-utils-client';
import { objectFlattenObject as flatten } from '../../../libs/bo-utils-client';

import style from './index.scss';

export default class {

  constructor({componentState}) {

    this.componentState = componentState;

    this.id = componentState.id;
    this.colId = componentState.colId;
    this.assetId = componentState.assetId;
    this.selector = `#gadget-container-${this.id}`;
    this.waitUntil = waitUntil;

    this.data = bo.inst.data.last.main;
    bo.inst.data.on('main', data => {
      this.data = data;
    });

    if (this.assetId) this.data = this.data.find(v => v.id === this.assetId);
    if (this.colId) this.column = flatten(columnLibrary)[this.colId];

    bo.inst.gadgets.manager.register(this);

  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
