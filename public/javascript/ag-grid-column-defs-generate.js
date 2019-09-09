'use strict';

import { objectFlattenObject as flatten } from './libs/bo-utils-client';
import { partialApplication } from './libs/bo-utils-client';
import cellRendererCurrency   from './utils/cell-renderer-currency.js';
import columnLibrary from './columns';

const customDefaults = {
  cellClass: 'cryptohub-align-right',
  headerClass: 'CH-col',
  type: [
    'cryptohubDefaults',
    'cryptohubNumeric',
  ],
  width: 120,
  cellRenderer: partialApplication(cellRendererCurrency, window.refs),
  cellRendererParams: {
    currency: 'USD',
  },
}

/**
 *
 * AG-GRID columnDefs
 *
 * Each column in the grid is defined using a column definition.
 * Columns are positioned in the grid according to the order the ColDef's are specified in the grid options
 *
 */
export default function generateColumnDefs(state) {

  let column;
  const output = [];
  const colLib = flatten(columnLibrary);

  for (column of state.columns) {

    const id = column.id;
    const custom = /^c-\d{1,4}$/.test(id);

    if (id in colLib || custom) {

      let col;
      if (custom) {
        if (!column.calc || !column.id || !column.headerName) {
          continue;
        }
        col = {
          ...customDefaults,
          calc: column.calc,
          colId: column.id,
          sources: column.sources,
          headerName: column.headerName,
          field: column.id,
        }
      }
      else {
        col = Object.assign({}, colLib[id]);
      }

      if (id === state.sort.column) {
        col.sort = state.sort.direction;
      }

      if (column.width) {
        col.width = column.width;
      }

      output.push(col);
    }

  }

  return output;

}
