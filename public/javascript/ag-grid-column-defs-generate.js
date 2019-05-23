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
export default function generateColumnDefs(columns) {

  const state = window.bo.inst.state.get();
  const sortCol = state.sort.column;
  const direction = state.sort.direction;

  let id;
  let column;
  const output = [];
  for (column of columns) {
    id = column.id;
    if (id in columnLibrary) {
      const col = column.id === sortCol
        ? Object.assign({}, columnLibrary[id], {sort: direction})
        : columnLibrary[id];
      output.push(col);
    }
  }
  return output;
}
