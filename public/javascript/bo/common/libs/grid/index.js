'use strict';

import { Grid as agGrid }      from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import getAgOptions                             from './get-ag-options';
import getAgColumnDefs                          from './get-ag-column-defs.js';
import { objectFlattenObject as flatten }       from '../../../../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../../../../libs/bo-utils-client';

export default class Grid {

  constructor(container, columns, state, data = null) {
    const columnLibrary = this.columnLibrary = flatten(columns);
    const filterModel = Grid.getFilterModel(state);
    const options = getAgOptions({
      data,
      state,
      filterModel,
      columnLibrary,
      grid: this,
    });
    this.agGrid = new agGrid(container, options, {modules: AllCommunityModules});
    if (!this.agGrid) {
      throw new Error('Cant find grid');
    }
    return this;
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

  setColumnDefs(columns, sort) {
    const columnDefs = getAgColumnDefs(this.columnLibrary, columns, sort);
    this.agGrid.gridOptions.api.columnController.setColumnDefs(columnDefs);
  }

}
