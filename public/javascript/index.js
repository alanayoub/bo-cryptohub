'use strict';

// Libs
import '@babel/polyfill';

import globals                        from './globals.js';
import defaultConfig                  from './default-config.js';

// Binary Overdose Projects
import { DataTable }                  from './libs/bo-datatable-client';

// Binary Overdose classes
import CellInteractions               from './classes/class-cell-interactions.js';
import State                          from './classes/class-state.js';

// Binary Overdose views
import EditDialogue                   from './views/edit-dialogue.js';

// Binary Overdose util functions
import convertWorkingDataToRowData    from './utils/convert-working-data-to-row-data.js';
import updateOverview                 from './utils/view-update-overview.js';

// ag-grid config
import generateAgOptions              from './ag-grid-options-generate.js';
import generateColumnDefs             from './ag-grid-column-defs-generate.js';

// CSS
import style                          from '../stylesheet/index.css';

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
    window.refs.workingData = newSocketData;
  }

  window.refs.rowData = convertWorkingDataToRowData(window.refs.workingData);
  window.bo.agOptions.api.setRowData(window.refs.rowData);

  updateOverview(window.refs.workingData);

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
  }

}

window.bo.inst.cellInteractions = new CellInteractions();
window.bo.inst.state = new State(defaultConfig);
window.bo.inst.state.init().then(() => {

  const socket = io();
  const agOptions = generateAgOptions();
  const gridElement = document.querySelector('#ch-grid');
  const grid = new agGrid.Grid(gridElement, agOptions);

  if (!grid) throw new Error('Cant find grid');

  socket.on('data', dataEmitHandler);
  socket.on('store', storeEmitHandler);

  window.bo.func.updated('now');
  window.bo.inst.editDialogue = new EditDialogue('.ch-edit');

  setInterval(window.bo.func.updated, 1000 * 1);

  window.onhashchange = () => {

    bo.inst.state.getUrl().then(state => {
      const columns = state.columns;
      const columnDefs = generateColumnDefs(columns);
      bo.agOptions.api.columnController.setColumnDefs(columnDefs);
      bo.inst.state.set('columns', columns);
    });

  }

});


