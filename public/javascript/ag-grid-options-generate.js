'use strict';

// Binary Overdose Projects
import { objectFlattenObject as flatten } from './libs/bo-utils-client';

// Cryptohub classes
import State                              from './classes/class-state.js';

// Cryptohub util functions
import convertWorkingDataToRowData        from './utils/convert-working-data-to-row-data.js';

// ag-grid config
import columnLibrary                      from './columns/';
import agGridOptionsBase                  from './ag-grid-options-base.js';
import generateColumnDefs                 from './ag-grid-column-defs-generate.js';

/**
 *
 * Generate AgOptions
 *
 */
export default async function generateAgOptions() {

  if (!window.bo) throw new Error('window.bo does not exist');
  if (!window.refs) throw new Error('window.refs does not exist');

  const state = await bo.inst.state.get();
  const filterModel = await bo.inst.state.getFilterModel();
  const colLib = flatten(columnLibrary);

  /**
   *
   * On Grid Ready
   *
   */
  function onGridReady(params) {

    // default sort order
    const validColumns = [
      ...Object.keys(colLib),
      ...state.columns.filter(v => /^c-\d{1,2}$/.test(v.id)).map(v => v.id)
    ];
    const sortId = validColumns.includes(state.sort.column) ? state.sort.column : validColumns[0];
    params.api.setSortModel([
      {
        colId: sortId,
        sort: state.sort.direction
      }
    ]);

    // default filters
    params.api.setFilterModel(filterModel);

    window.bo.func.updated('now');
    window.refs.workingData = null;
    window.refs.rowData = null;
    if (window.refs.rowData) params.api.setRowData(window.refs.rowData);

    window.bo.inst.toolbarView.update(window.refs.workingData);

  };

  //
  // TODO: check if there is a url config
  // if there is use that and backfill with the default config
  // dont forget to make it very secure!!!
  //
  const columnDefs = generateColumnDefs(state, true);

  const options = window.bo.agOptions = {
    ...agGridOptionsBase,
    ...{ columnDefs },
    ...{ onGridReady },
  };

  return options;

}
