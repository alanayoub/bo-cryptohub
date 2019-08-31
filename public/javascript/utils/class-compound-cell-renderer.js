'use strict';

// Binary Overdose Projects
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

// Cryptohub Util functions
import getCssClass from './get-cell-css-class-diff.js';

/**
 *
 * Cell renderer class
 *
 */
export default class CompoundCellRenderer {

  // gets called once before the renderer is used
  init(params) {

    this.eGui = document.createElement('div');
    this.cryptohubLoadCell(params);

  }

  // gets called once when grid ready to insert the element
  getGui() {
    return this.eGui;
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params) {
    this.cryptohubLoadCell(params);
  }

  cryptohubLoadCell(params) {

    this.eGui.innerHTML = '<span class="cryptohub-cell-data">-</span>';

    // get references to the elements we want
    this.eValue = this.eGui.querySelector('.cryptohub-cell-data');

    // set value into cell
    this.eValue.innerHTML = params.valueFormatted || (value && value.value);

  }

}
