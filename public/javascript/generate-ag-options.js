'use strict';

// Cryptohub util functions
import convertWorkingDataToRowData    from './utils/convert-working-data-to-row-data.js';
import updateOverview                 from './utils/view-update-overview.js';

// ag-grid config
import columnLibrary     from './column-library.js';
import defaultConfig     from './default-config.js';
import agGridOptionsBase from './ag-grid-options-base.js';

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
 * On Grid Ready
 *
 */
function onGridReady(params) {

  // default sort order
  params.api.setSortModel([
    {
      colId: columnLibrary[defaultConfig.sort.column].field,
      sort: defaultConfig.sort.direction
    }
  ]);

  window.bo.func.updated('now');
  window.refs.workingData = window.initData;
  window.refs.rowData = convertWorkingDataToRowData(window.initData || {});
  params.api.setRowData(window.refs.rowData);

  updateOverview(window.refs.workingData);

};

/**
 *
 * Generate AgOptions
 *
 */
export default function generateAgOptions() {

  if (!window.bo) throw new Error('window.bo does not exist');
  if (!window.refs) throw new Error('window.refs does not exist');

  //
  // TODO: check if there is a url config
  // if there is use that and backfill with the default config
  // dont forget to make it very secure!!!
  //
  const columnDefs = generateColumnDefs(defaultConfig.columns);

  const options = window.bo.agOptions = {
    ...agGridOptionsBase,
    ...{ columnDefs },
    ...{ onGridReady },
  };

  return options;

}
