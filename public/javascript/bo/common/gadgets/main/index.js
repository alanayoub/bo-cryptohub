'use strict';

import { Grid } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import getAgOptions from './utils/get-ag-options';

import Gadget from '../gadget';
import initPug from '../../../../generated/init-pug.generated.js';
import { getRandomInt } from '../../../../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../../../../libs/bo-utils-client';
import generateColumnDefs from '../../../../ag-grid-column-defs-generate.js';

import style from './index.scss';

export default class Main extends Gadget {

  static getFilterModel(state) {

    if (!state) {
      return null;
    }

    const model = state.columns
      .reduce((a, v) => {
        if (v.filter) a[v.id] = v.filter;
        return a;
      }, {});

    return isEmptyObject(model) ? null : model;

  }

  constructor({componentState}) {

    super({componentState})

    const containerId = this.containerId = `ch-gadget-${getRandomInt(100000, 999999)}`;
    const content = initPug['common-gadget-main']({containerId});
    this.selector = `#gadget-container-${this.id}`;
    document.querySelector(this.selector).innerHTML = content;

    // Initial data
    this.data = bo.inst.data.last.main || null;

    // Data updated
    bo.inst.data.on('main', data => {
      this.data = data.data;
      this.update();
    });

    this.render();

  }

  async render() {
    const urlState = await bo.inst.state.get();
    const state = urlState.window[0];
    const filterModel = Main.getFilterModel(state);
    bo.agOptions = getAgOptions(state, filterModel);
    bo.agOptions.rowData = this.data;
    const container = document.querySelector(`#${this.containerId}`);
    const grid = new Grid(container, bo.agOptions, {modules: AllCommunityModules});
    if (!grid) throw new Error('Cant find grid');
  }

  update() {
    bo.agOptions.api.setRowData(this.data);
    // move upadate from state to here!
  }


  alive() {
    return !!document.querySelector(this.selector);
  }

}
