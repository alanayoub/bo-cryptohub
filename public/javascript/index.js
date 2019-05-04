'use strict';

import globals                        from './globals.js';

// Binary Overdose Projects
import { DataTable }                  from './libs/bo-datatable-client';

// Cryptohub classes
import CellInteractions               from './classes/class-cell-interactions.js';

// Cryptohub util functions
import convertWorkingDataToRowData    from './utils/convert-working-data-to-row-data.js';
import updateOverview                 from './utils/view-update-overview.js';

// ag-grid config
import generateAgOptions              from './ag-grid-options-generate.js';

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

const socket = io();
const agOptions = generateAgOptions();
const gridElement = document.querySelector('#ch-grid');
const grid = new agGrid.Grid(gridElement, agOptions);

if (!grid) throw new Error('Cant find grid');

window.bo.func.updated('now');
setInterval(window.bo.func.updated, 1000 * 1);

socket.on('data', dataEmitHandler);
socket.on('store', storeEmitHandler);
