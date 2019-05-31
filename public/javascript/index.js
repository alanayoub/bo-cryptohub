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
window.bo.inst.state.init().then(state => {

  const socket = io();

  generateAgOptions().then(agOptions => {
    const gridElement = document.querySelector('#ch-grid');
    const grid = new agGrid.Grid(gridElement, agOptions);

    if (!grid) throw new Error('Cant find grid');

    socket.on('data', dataEmitHandler);
    socket.on('store', storeEmitHandler);

    window.bo.func.updated('now');
    window.bo.inst.editDialogue = new EditDialogue('.ch-edit');

    setInterval(window.bo.func.updated, 1000 * 1);

    /**
     *
     * Copy state from url to ag-grid state
     *
     *
     */
    window.onpopstate = event => {

      console.log('onpopstate', event.state);
      const state = event.state;
      if (!state) return;

      // Generate columnDefs
      const columns = state.columns;
      const columnDefs = generateColumnDefs(state);

      // Set sort order
      {

        // Delete old
        for (const def of columnDefs) {
          delete def.sort;
        }

        // Add new
        const sortCol = state.sort.column;
        const sortDir = state.sort.direction;
        const col = columnDefs.filter(v => v.colId === sortCol)[0];
        if (col) {
          col.sort = sortDir;
        }

      }

      const Pstate = bo.inst.state.get();
      const Pfilters = bo.inst.state.getFilterModel();
      Promise.all([Pstate, Pfilters]).then(values => {

        const [lastState, filterModel] = values;

        // Only update column defs if there is a change
        const newStr = JSON.stringify(state.columns);
        const lstStr = JSON.stringify(lastState.columns);
        if (newStr !== lstStr) {
          bo.agOptions.api.columnController.setColumnDefs(columnDefs);
        }

        bo.agOptions.api.setFilterModel(filterModel);

      });

      // bo.inst.state.get().then(lastState => {
      //   // Set Filters
      //   bo.inst.state.getFilterModel().then(model => {
      //   });
      // });

    }

  });

});


