'use strict';

function NumberFilter() {}

NumberFilter.prototype.init = function (params) {
    this.valueGetter = params.valueGetter;
    this.filterText = null;
    this.params = params;
    this.setupGui();
};

// not called by ag-Grid, just for us to help setup
NumberFilter.prototype.setupGui = function () {
    this.gui = document.createElement('div');
    this.gui.innerHTML =
        '<div style="padding: 4px; width=100px">' +
        '<div style="font-weight: bold;">Greater than: </div>' +
        '<div><input style="margin: 4px 0px 4px 0px; width: 100px" type="text" id="filterText" placeholder="Number of medals..."/></div>' +
        '</div>';

    var that = this;
    this.onFilterChanged = function() {
        that.extractFilterText();
        that.params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector('#filterText');
    this.eFilterText.addEventListener("input", this.onFilterChanged);
};

NumberFilter.prototype.extractFilterText = function () {
    this.filterText = this.eFilterText.value;
};

NumberFilter.prototype.getGui = function () {
    return this.gui;
};

//
// TODO: =0 doesnt work
// TODO: decimals dont work
//
NumberFilter.prototype.doesFilterPass = function (params) {
  const valueGetter = this.valueGetter;
  const value = valueGetter(params).value;

  const input = this.filterText.replace(/\s/g,'');
  const split = input.match(/[0-9]+|>=|<=|[<>&|()]/gi);
  const whitelist = ['<', '>', '<=', '>=', '&', '|', '(', ')'];
  const signs = split.filter(isNaN);
  const areAllValid = signs.some(sign => {
    return whitelist.includes(sign);
  });

  const numBeforeSigns = ['<', '>', '<=', '>='];
  const num = 80;
  const generateExpression = num => {
    return split.reduce((acc, val, idx) => {
      if (numBeforeSigns.includes(val)) acc.push(num);
      acc.push(isNaN(val) ? val : Number(val))
      return acc;
    }, []).join('');
  }

  const expressionStr = generateExpression(value);

  let passed;
  try {
    passed = (new Function(`return ${expressionStr}`))();
  }
  catch (error) {
    passed = 1;
  }

  return passed;
};

NumberFilter.prototype.isFilterActive = function () {
    return  this.filterText !== null &&
        this.filterText !== undefined &&
        this.filterText !== '';
};

NumberFilter.prototype.getModel = function () {
    return this.isFilterActive() ? this.eFilterText.value : null;
};

NumberFilter.prototype.setModel = function (model) {
    this.eFilterText.value = model;
    this.extractFilterText();
};


NumberFilter.prototype.destroy = function () {
    this.eFilterText.removeEventListener("input", this.onFilterChanged);
};

export default NumberFilter;
