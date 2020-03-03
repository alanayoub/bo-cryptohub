'use strict';

// Cryptohub classes
import CellInteractions from '../classes/class-cell-interactions.js';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';
import { getRandomInt }                   from '../libs/bo-utils-client';

import popDiv                             from '../views/popdiv';
import segment                            from './segment.js';
import initPug                            from '../generated/init-pug.generated.js';

import cellOnClickTradingview             from '../views/popdiv-tradingview/';
import cellOnClickExchanges               from '../views/popdiv-exchanges/';
import cellOnClickWallets                 from '../views/popdiv-wallets/';
import cellOnClickHtml                    from '../views/popdiv-html/';

/**
 *
 *
 *
 */
export default function onCellClicked(params) {
  const $cell = params.event.srcElement.closest('.ag-cell');
  const open = $cell.dataset.chOpen === 'true';
  console.log(bo.inst.cellInteractions.openItems);
  if (open) {

    if ($cell.$popDivTippy) {
      $cell.$popDivTippy.destroy();
    }
    if ($cell.$triggerTippy) {
      // $cell.$triggerTippy.reference.classList.remove('CH-cell-hover');
      // $cell.$triggerTippy.destroy();
    }
    $cell.dataset.chOpen = false;
    const idx = bo.inst.cellInteractions.openItems.indexOf($cell);
    if (idx >-1) {
      bo.inst.cellInteractions.openItems.splice(idx, 1);
    }
  }
  else {

    const $cell = params.event.srcElement.closest('.ag-cell');
    const tippy = $cell._tippy;
    bo.inst.cellInteractions.openItems.push($cell);

    const rand = getRandomInt();
    const id = `gadget-container-${rand}`;
    const contentPopdiv = initPug['ch-tippy-popdiv']({id});
    const popdivType = gnp(params, 'colDef.cellRendererParams.popdiv');

    const classes = {
      tradingview: cellOnClickTradingview,
      exchanges: cellOnClickExchanges,
      wallets: cellOnClickWallets,
      html: cellOnClickHtml,
    }

    if (popdivType) {

      $cell.dataset.chOpen = true;
      if (tippy) tippy.set({hideOnClick: true});

      new popDiv(params, contentPopdiv);

      const componentState = {
        id: rand,
        rowId: params.data.id,
        colId: params.colDef.colId
      }
      new classes[popdivType]({componentState});

      $cell.$popDivTippy = $cell._tippy;
      // bo.func.openCells.addOpen(params);

      // segment
      const data = {
        popdivType,
        name: params.data['cryptohub-name'],
        rowId: params.id,
        columnId: params.colDef.colId,
      }
      segment.cellSelected(data);
    }

  }
}
