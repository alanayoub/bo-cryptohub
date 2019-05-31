'use strict';

// ag-grid config
import columnLibrary from './column-library.js';

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

  for (column of state.columns) {

    const id = column.id;

    if (id in columnLibrary) {

      const col = Object.assign({}, columnLibrary[id]);

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
