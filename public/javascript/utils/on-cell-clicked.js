'use strict';

// Cryptohub classes
import CellInteractions from '../classes/class-cell-interactions.js';

/**
 *
 *
 *
 */
export default function onCellClicked(params) {
  const $cell = params.event.srcElement.closest('.ag-cell');
  const open = $cell.dataset.chOpen === 'true';
  if (open) {
    CellInteractions.close({params});
    window.bo.inst.cellInteractions.mouseOver(params);
  }
  else {
    CellInteractions.open(params);
  }
}
