'use strict';

export default class Filter {

  init(params) {
    this.valueGetter = params.valueGetter;
    this.filterText = null;
    this.params = params;
    this.setupGui();
  };

  // not called by ag-Grid, just for us to help setup
  setupGui() {

    this.gui = document.createElement('div');
    this.gui.innerHTML = '<input type="text" id="filterText" />';

    this.onFilterChanged = () => {
      this.extractFilterText();
      this.params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector('#filterText');
    this.eFilterText.addEventListener('input', this.onFilterChanged);

  };

  extractFilterText() {
    this.filterText = this.eFilterText.value;
  };

  getGui() {
    return this.gui;
  };

  doesFilterPass(params) {

    // Extend and implement

  };

  isFilterActive() {
    return  this.filterText !== null &&
      this.filterText !== undefined &&
      this.filterText !== '';
  };

  getModel() {
    return this.isFilterActive() ? this.eFilterText.value : null;
  };

  setModel(model) {
    this.eFilterText.value = model;
    this.extractFilterText();
  };

  destroy() {
    this.eFilterText.removeEventListener('input', this.onFilterChanged);
  };

}
