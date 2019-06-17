'use strict';

// Binary Overdose Projects
import { objectFlattenObject as flatten } from './libs/bo-utils-client';

// ag-grid config
import columnLibrary                      from './columns/';

console.log(columnLibrary);

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

    if (id in colLib) {

      const col = Object.assign({}, colLib[id]);

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
