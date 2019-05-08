'use strict';

function NumberFloatingFilter() {}

NumberFloatingFilter.prototype.init = function (params) {

  this.onFloatingFilterChanged = params.onFloatingFilterChanged;
  this.eGui = document.createElement('div');
  this.eGui.innerHTML = '<input type="text"/>';
  this.currentValue = null;
  this.eFilterInput = this.eGui.querySelector('input');
  var that = this;
  function onInputBoxChanged(){
    if (that.eFilterInput.value === '') {
      //Remove the filter
      that.onFloatingFilterChanged(null);
      return;
    }
    that.currentValue = that.eFilterInput.value;
    that.onFloatingFilterChanged(that.currentValue);
  }
  this.eFilterInput.addEventListener('input', onInputBoxChanged);

};

NumberFloatingFilter.prototype.onParentModelChanged = function (parentModel) {

  // When the filter is empty we will receive a null message her
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
