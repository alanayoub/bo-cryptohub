'use strict';

export default class Filter {

  // mandatory methods

  // The init(params) method is called on the filter once. See below for details on the
  // parameters.
  init(params) {
    this.valueGetter = params.valueGetter;
    this.filterText = null;
    this.gui = document.createElement('div');
    this.gui.innerHTML = '<input type="text" id="filterText" />';
    this.eFilterText = this.gui.querySelector('#filterText');
  };

  // Returns the GUI for this filter. The GUI can be a) a string of html or b) a DOM element or node.
  getGui() {
    return this.gui;
  };

  // The grid calls this to know if the filter icon in the header should be shown. Return true to show.
  isFilterActive() {
    return  this.filterText !== null &&
      this.filterText !== undefined &&
      this.filterText !== '';
  };

  // The grid will ask each active filter, in turn, whether each row in the grid passes. If any
  // filter fails, then the row will be excluded from the final set. A params object is supplied
  // with attributes node (the rowNode the grid creates that wraps the data) and data (the data
  // object that you provided to the grid for that row).
  doesFilterPass() {};

  // Gets the filter state for storing
  getModel() {
    return this.isFilterActive() ? this.eFilterText.value : null;
  };

  // Restores the filter state. Called either as a result of user calling
  // OR the floating filter changed (only if using floating filters).
  setModel(model) {
    this.eFilterText.value = model;
    this.filterText = this.eFilterText.value.toLowerCase();
  };

  // optional methods

  destroy() {};

}
