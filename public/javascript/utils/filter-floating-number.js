'use strict';

import segment from './segment.js';

function NumberFloatingFilter() {}

NumberFloatingFilter.prototype.init = function (params) {

  const colId = params.column.colId;

  let placeholder = '';
  const typeArray = params.column.colDef.type
  if (typeArray.includes('cryptohubNumeric')) {
    placeholder = 'e.g. <100'
  }
  else if (typeArray.includes('cryptohubText')) {
    placeholder = 'search...'
  }
  else if (typeArray.includes('cryptohubBool')) {
    placeholder = 'e.g. true'
  }

  this.eGui = document.createElement('div');
  this.eGui.innerHTML = `<input type="text" placeholder="${placeholder}" data-floatingFilter=${colId} />`;
  this.currentValue = null;
  this.eFilterInput = this.eGui.querySelector('input');

  const onInputBoxChanged = () => {
    if (this.eFilterInput.value === '') {
      // Remove the filter
      params.parentFilterInstance(instance => {
        instance.myMethodForTakingValueFromFloatingFilter(null);
      });
      return;
    }
    this.currentValue = this.eFilterInput.value;
    params.parentFilterInstance(instance => {
      instance.myMethodForTakingValueFromFloatingFilter(this.currentValue);
    });
  }

  this.eFilterInput.addEventListener('input', onInputBoxChanged);

  let timer;
  this.eFilterInput.addEventListener('keyup', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const model = params.api.getFilterModel();
      const gadgetId = params.api.gridOptionsWrapper.gridOptions.boGadgetId;
      bo.inst.state.set({gadgetId, handler: state => {
        const filters = Object.keys(model);
        const columns = state.columns;
        for (const column of columns) {
          if (filters.includes(column.id)) {
            column.filter = model[column.id];
          }
          else {
            delete column.filter;
          }
        }
        return state;
      }});
      segment.columnFiltered(model);
    }, 300);
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
