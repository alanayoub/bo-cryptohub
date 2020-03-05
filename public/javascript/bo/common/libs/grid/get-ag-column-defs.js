'use strict';

import { partialApplication } from '../../../../libs/bo-utils-client';
import cellRendererNumber   from '../../../../utils/cell-renderer-number.js';
import cellRendererCurrency   from '../../../../utils/cell-renderer-currency.js';

const customDefaults = {
  cellClass: 'CH-align-right',
  headerClass: 'CH-col',
  width: 120,
}

/**
 *
 * GET AG-GRID COLUMNDEFS
 *
 * Each column in the grid is defined using a column definition.
 * Columns are positioned in the grid according to the order the ColDef's are specified in the grid options
 *
 * @param {Object} columns
 * @param {Object} sort
 * @param {Boolean} agSafe - Filter out non standar ag-grid properties
 *
 */
export default function getColumnDefs(colLib, columns, sort, agSafe) {

  let column;
  const output = [];

  for (column of columns) {

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
          hide: column.hide,
          field: column.id,
        }

        const sourceNames = column.sources.map(v => colLib[v].headerName);
        col.headerTooltip = [
          'Custom Calculation',
          `sources: ${sourceNames}`,
          `calculation: ${column.calc}`
        ].join('\n');

        col.type = [
          'cryptohubDefaults'
        ];

        if (column.type === 'currency') {
          col.type.push('cryptohubNumeric');
          col.cellRenderer = partialApplication(cellRendererCurrency, window.refs);
          col.cellRendererParams = {
            currency: 'USD'
          };
        }
        else if (column.type === 'number') {
          col.type.push('cryptohubNumeric');
          col.cellRenderer = cellRendererNumber;
          col.cellRendererParams = {
            bo: {
              floor: true
            }
          };
        }
        else if (column.type === 'float') {
          col.type.push('cryptohubNumeric');
          col.cellRenderer = cellRendererNumber;
          col.cellRendererParams = {
            bo: {
              floor: false
            }
          };
        }
        else if (column.type === 'percent') {
          col.type.push('cryptohubNumeric');
          col.type.push('cryptohubPercentNoFormat');
        }
        else {
          col.type.push('cryptohubText');
        }

      }
      else {
        col = Object.assign({}, colLib[id]);
      }

      if (id === sort.colId) {
        col.sort = sort.sort;
      }

      if (column.width) {
        col.width = column.width;
      }

      if (column.hide) {
        col.hide = column.hide;
      }

      output.push(col);
    }

  }

  if (agSafe) {
    output.map(col => {
      delete col.calc;
      delete col.sources;
      delete col.dependencies;
    });
  }

  return output;

}
