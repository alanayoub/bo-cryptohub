'use strict';

import globals                        from './globals.js';

// Binary Overdose Projects
import { DataTable }                  from './libs/bo-datatable-client';
import { partialApplication }         from './libs/bo-utils-client';

// Cryptohub util functions
import convertWorkingDataToRowData    from './utils/convert-working-data-to-row-data.js';
import updateOverview                 from './utils/view-update-overview.js';

// ag-grid config
import columnLibrary                  from './column-library.js';
import agGridOptionsBase              from './ag-grid-options-base.js';
import defaultConfig                  from './default-config.js';

// CSS
import style                          from '../stylesheet/index.css';

/**
 *
 * AG-GRID columnDefs
 *
 * Each column in the grid is defined using a column definition.
 * Columns are positioned in the grid according to the order the ColDef's are specified in the grid options
 *
 */
function generateColumnDefs(columns) {

  let id;
  let column;
  const output = [];
  for (column of columns) {
    id = column.id;
    if (id in columnLibrary) {
      output.push(columnLibrary[id]);
    }
  }
  return output;

}

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

/**
 *
 * On Grid Ready
 *
 */
function onGridReadyHandler(sortConfig, params) {

  // default sort order
  params.api.setSortModel([
    { ...sortConfig }
  ]);

  // NOTE: DO NOT CHANGE UNLESS YOU WANT TO UPDATE HOW DATA WORKS

  // Do an update straight away
  // Two sets of data are used to bootstrap, the latest and an old set
  window.bo.func.updated('now');

  window.refs.workingData = window.initData;
  window.refs.rowData = convertWorkingDataToRowData(window.initData || {});
  params.api.setRowData(window.refs.rowData);

  updateOverview(window.refs.workingData);

};

const socket        = io();
const columnDefs    = generateColumnDefs(defaultConfig.columns);
const sortField     = columnLibrary[defaultConfig.sort.column].field;
const gridElement   = document.querySelector('#ch-grid');
const sortDirection = defaultConfig.sort.direction;
const onGridReady   = partialApplication(onGridReadyHandler, {colId: sortField, sort: sortDirection})

const agOptions = window.bo.agOptions = {
  ...agGridOptionsBase,
  ...{ columnDefs },
  ...{ onGridReady },
};

const grid = new agGrid.Grid(gridElement, agOptions);

if (!grid) throw new Error('Cant find grid');

window.bo.func.updated('now');
setInterval(window.bo.func.updated, 1000 * 1);

socket.on('data', dataEmitHandler);
socket.on('store', storeEmitHandler);
