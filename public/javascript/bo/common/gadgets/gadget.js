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
    this.rowId = componentState.rowId;
    this.selector = `#gadget-container-${this.id}`;
    this.waitUntil = waitUntil;

    this.data = bo.inst.data.last.main;
    bo.inst.data.on('main', data => {
      this.data = data;
    });

    if (this.rowId) this.data = this.data.find(v => v.id === this.rowId);
    if (this.colId) this.column = flatten(columnLibrary)[this.colId];

    bo.inst.gadgets.manager.register(this);

  }

  alive() {
    return !!document.querySelector(this.selector);
  }

  async active() {
    const { layout } = await bo.inst.state.get();
    const active = bo.clas.Layout.isActiveGadget(this.id, layout);
  }

  dataDependencies() {
    return false;
  }

}
