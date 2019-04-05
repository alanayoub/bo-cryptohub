'use strict';

// Cryptohub Util functions
import countdownMs from './html-countdown.js';
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

    const value = params.valueFormatted
      ? params.valueFormatted
      : bo.objectGetNestedProperty(params, 'value.value');

    const data = `<span class="cryptohub-cell-data">-</span>`;

    this.eGui.innerHTML = data;

    // get references to the elements we want
    this.eValue = this.eGui.querySelector('.cryptohub-cell-data');

    // set value into cell
    this.eValue.innerHTML = value;

    // change style after x mins
    const valueIsTrue = value !== void 0 && value !== '-' && value !== null;
    const countdown = valueIsTrue ? countdownMs(params) : '';
    setTimeout(() => {
      this.eValue.className += ' cryptohub-cell-old-data';
    }, countdown);

  }

}
