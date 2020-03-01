//
// TODO: refs? really
// Clear up this dumping ground
//
// Start again...
//
// window.bo = {
//   data: {
//     row: [],
//     emit: ?,
//     store: ?
//   },
//   func: {
//     updated
//   },
//   common: {
//     emptyCellValue: '-',
//   }
// }
//

import { timeAgo }       from './libs/bo-utils-client';
import rest              from './api/rest';

// Cryptohub classes
import CellInteractions  from './classes/class-cell-interactions.js';
import State             from './classes/class-state.js';
import Layout            from './views/layout';

window.bo = {
  rest,
  clas: {},
  func: {
    openCells: {}
  },
  inst: {},
  opts: {
    openCells: {
      // colName: [1, 2, 3]
    }
  }
};

window.bo.clas.CellInteractions = CellInteractions;
window.bo.clas.State = State;
window.bo.clas.Layout = Layout;
window.initStore = window.initStore || {};

window.refs = {
  store: [], // the last version of the packed data
  rowData: null,
  emitData: [],
};

window.ch = {
  emptyCellValue: '-',
  ...initStore
};

window.timestamp = null;

/**
 *
 * TODO: move
 *
 */
window.bo.func.openCells.addOpen = function(params) {
  const $cell = params.event.srcElement.closest('.ag-cell');
  const field = params.colDef.field;
  const rowIndex = params.rowIndex;
  const openCells = window.bo.opts.openCells;
  if (!openCells[field]) openCells[field] = [];
  openCells[field].push({[rowIndex]: $cell});
};

/**
 *
 * TODO: move
 *
 */
window.bo.func.openCells.removeOpen = function({params, $cell, row, field}) {
  if (!$cell) $cell = params.event.srcElement.closest('.ag-cell');
  if (!field) field = params.colDef.field;
  if (!row) row = params.rowIndex;
  const openCells = window.bo.opts.openCells;
  if (!Array.isArray(openCells[field])) return;
  const idx = openCells[field].indexOf(row);
  openCells[field].splice(idx, 1);
}

/**
 *
 * Updated
 * @param {Date} when
 * @return void
 *
 */
window.bo.func.updated = function (when) {
  const container = document.querySelector('.CH-header .ch-updated');
  if (!container) return;
  if (when === 'now') window.timestamp = new Date();
  const time = timeAgo(window.timestamp);
  container.innerHTML = `Updated ${time} ago`;
}
