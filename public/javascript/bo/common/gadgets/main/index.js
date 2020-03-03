'use strict';

import { Grid } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import getAgOptions from './utils/get-ag-options';

import Gadget from '../gadget';
import initPug from '../../../../generated/init-pug.generated.js';
import generateColumnDefs from '../../../../ag-grid-column-defs-generate.js';

import { getRandomInt }                         from '../../../../libs/bo-utils-client';
import { objectsAreEqual }                      from '../../../../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../../../../libs/bo-utils-client';

import style from './index.scss';

export default class Main extends Gadget {

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
      this.updateData();
    });

    bo.inst.events.on('MAIN_COLUMNS_CHANGED', ({oldState, newState}) => {
      console.log('main_columns_changed');
      // request cols data
      const oldCols = oldState.window[0].columns;
      const newCols = newState.window[0].columns;
      const sort = newState.window[0].sort;
      const newColFields = Main.columnsChanged(oldCols, newCols);
      if (newColFields) {
        const columns = newColFields
          .filter(v => !/^c-\d{1,4}$/.test(v)) // filter out custom columns
          .join();
        const emitData = JSON.stringify({columns, sort});
        bo.inst.socket.emit('cols', emitData);
      }

      // update ag-grid columns
      const columnDefs = generateColumnDefs(newState.window[0]);
      bo.agOptions.api.columnController.setColumnDefs(columnDefs);
    });

    bo.inst.events.on('MAIN_SORT_CHANGED', ({oldState, newState}) => {
      console.log('main_sort_changed');
    });

    bo.inst.events.on('MAIN_FILTER_CHANGED', ({oldState, newState}) => {
      console.log('main_filter_changed');
    });

    this.render();
  }

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

  /**
   *
   * If cols changed return new cols
   * else if calc exists return cols
   *
   */
  static columnsChanged(oldCols, newCols) {

    let output = false;

    const oldFields = oldCols.map(x => x.id).sort((a, b) => a.length - b.length);
    const newFields = newCols.map(x => x.id).sort((a, b) => a.length - b.length);
    const calcIds = newCols.filter(v => v.calc).map(v => v.id);
    const changed = !objectsAreEqual(oldFields, newFields);

    if (changed || calcIds.length) {
      output = newFields;
    }

    return output;

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
    updateDate();
  }

  updateData() {
    bo.agOptions.api.setRowData(this.data);
    // move upadate from state to here!
  }

  updateColumns() {
    //
  }

  updateFilters() {
    //
  }

  updateSort() {
    //
  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
