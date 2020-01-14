'use strict';

import segment from './segment.js';

function NumberFloatingFilter() {}

NumberFloatingFilter.prototype.init = function (params) {

  const colId = params.column.colId;

  this.onFloatingFilterChanged = params.onFloatingFilterChanged;
  this.eGui = document.createElement('div');
  this.eGui.innerHTML = `<input type="text" data-floatingFilter=${colId} />`;
  this.currentValue = null;
  this.eFilterInput = this.eGui.querySelector('input');

  const onInputBoxChanged = () => {
    if (this.eFilterInput.value === '') {
      //Remove the filter
      this.onFloatingFilterChanged(null);
      return;
    }
    this.currentValue = this.eFilterInput.value;
    this.onFloatingFilterChanged(this.currentValue);
  }

  this.eFilterInput.addEventListener('input', onInputBoxChanged);

  this.eFilterInput.addEventListener('blur', () => {
    const model = params.api.getFilterModel();
    bo.inst.state.set('filter', model);
    segment.columnFiltered(model);
  });

  bo.inst.state.getFilterModel().then(model => {
    this.eGui.querySelector('input').value = model && model[colId] ? model[colId] : null;
  });

};

NumberFloatingFilter.prototype.onParentModelChanged = function (parentModel) {

  // When the filter is empty we will receive a null message her
  if (parentModel === 'undefined') parentModel = null;
  if (!parentModel) {
    this.eFilterInput.value = '';
  } else {
    this.eFilterInput.value = parentModel + '';
  }
  this.currentValue = parentModel;

};

NumberFloatingFilter.prototype.getGui = function () {
  return this.eGui;
};

export default NumberFloatingFilter;
