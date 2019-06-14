'use strict';

// Libs
import '@babel/polyfill';

import globals                     from './globals.js';
import defaultConfig               from './default-config.js';

// Binary Overdose Projects
import { DataTable }               from './libs/bo-datatable-client';

// Binary Overdose classes
import CellInteractions            from './classes/class-cell-interactions.js';
import State                       from './classes/class-state.js';

// Binary Overdose views
import ToolbarView                 from './views/toolbar/toolbar.js';

// Binary Overdose util functions
import convertWorkingDataToRowData from './utils/convert-working-data-to-row-data.js';

// ag-grid config
import generateAgOptions           from './ag-grid-options-generate.js';
import generateColumnDefs          from './ag-grid-column-defs-generate.js';

// CSS
import style                       from '../stylesheet/index.css';

/**
 *
 * Handle data events
 *
 * @param {Object} data
 * @return void
 *
 */
function dataEmitHandler(data) {

  window.bo.func.updated('now');

  let newSocketData = JSON.parse(data);
  const type = newSocketData.type;
  newSocketData = newSocketData.data;

  if (type === 'changeset') {
    window.DataTable.changesets.applyChanges(window.refs.workingData, newSocketData);
  }
  else {
    if (!window.initData) window.initData = newSocketData;
    window.refs.workingData = newSocketData;
  }

  if (window.refs.workingData) {
    window.refs.rowData = convertWorkingDataToRowData(window.refs.workingData);
    window.bo.agOptions.api.setRowData(window.refs.rowData);
    window.bo.inst.toolbarView.update(window.refs.workingData);
  }

}

/**
 *
 * Handle store events
 *
 * @param {Object} data
 * @return void
 *
 */
function storeEmitHandler(data) {

  window.bo.func.updated('now');

  let newSocketData = JSON.parse(data);
  const type = newSocketData.type;
  newSocketData = newSocketData.data;

  if (type === 'changeset') {
    window.DataTable.changesets.applyChanges(window.ch, newSocketData);
  }
  else {
    window.ch = {
      ...window.ch,
      ...newSocketData
    };
    if (!window.initStore) window.initStore = window.ch;
  }

}

window.bo.inst.cellInteractions = new CellInteractions();
window.bo.inst.state = new State(defaultConfig);
window.bo.inst.state.init().then(state => {

  const cols = state.columns.map(v => v.id);
  window.bo.inst.socket = io({query: { cols } });

  generateAgOptions().then(agOptions => {

    const gridElement = document.querySelector('#ch-grid');
    const grid = new agGrid.Grid(gridElement, agOptions);

    if (!grid) throw new Error('Cant find grid');

    bo.inst.socket.on('data', dataEmitHandler);
    bo.inst.socket.on('store', storeEmitHandler);

    window.bo.func.updated('now');
    window.bo.inst.toolbarView = new ToolbarView('.CH-hook-toolbar');

    setInterval(window.bo.func.updated, 1000 * 1);

    window.onpopstate = event => {
      if (event.state) {
        bo.inst.state.update(event.state);
      }
    }

  });

});


