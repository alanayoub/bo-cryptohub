'use strict';

// Cryptohub classes
import State                       from './classes/class-state.js';

// Cryptohub util functions
import convertWorkingDataToRowData from './utils/convert-working-data-to-row-data.js';
import updateOverview              from './utils/view-update-overview.js';

// ag-grid config
import columnLibrary               from './column-library.js';
import agGridOptionsBase           from './ag-grid-options-base.js';
import generateColumnDefs          from './ag-grid-column-defs-generate.js';

/**
 *
 * Generate AgOptions
 *
 */
export default async function generateAgOptions() {

  if (!window.bo) throw new Error('window.bo does not exist');
  if (!window.refs) throw new Error('window.refs does not exist');

  const state = await bo.inst.state.get();
  const filterModel = await bo.inst.state.getFilterModel()

  /**
   *
   * On Grid Ready
   *
   */
  function onGridReady(params) {

    // default sort order
    params.api.setSortModel([
      {
        colId: columnLibrary[state.sort.column].colId,
        sort: state.sort.direction
      }
    ]);

    // default filters
    params.api.setFilterModel(filterModel);

    window.bo.func.updated('now');
    window.refs.workingData = window.initData;
    window.refs.rowData = convertWorkingDataToRowData(window.initData || {});
    params.api.setRowData(window.refs.rowData);

    updateOverview(window.refs.workingData);

  };

  //
  // TODO: check if there is a url config
  // if there is use that and backfill with the default config
  // dont forget to make it very secure!!!
  //
  const columnDefs = generateColumnDefs(state);

  const options = window.bo.agOptions = {
    ...agGridOptionsBase,
    ...{ columnDefs },
    ...{ onGridReady },
  };

  return options;

}
