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
