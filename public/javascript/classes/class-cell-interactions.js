'use strict'

// Binary Overdose Projects
import { partialApplication }             from '../libs/bo-utils-client';
import { htmlToggleClass }                from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

// Cryptohub util functions
import popDiv                             from '../utils/popdiv.js';
import segment                            from '../utils/segment.js';
import initPug                            from '../generated/init-pug.generated.js';

import cellOnClickTradingview             from '../views/popdiv-tradingview/';
import cellOnClickExchanges               from '../views/popdiv-exchanges/';
import cellOnClickWallets                 from '../views/popdiv-wallets/';
import cellOnClickHtml                    from '../views/popdiv-html/';

export default class CellInteractions {

  constructor() {
    this.openItems = [];
    this.tippyOptions = {
      theme: 'light CH-tippy-click',
      placement: 'right',
      hideOnClick: 'false',
      interactiveBorder: 5,
      interactiveDebounce: 1,
      onHide(tippy) {
        const opened = tippy.reference.dataset.chOpen === 'true';
        const hovering = tippy.reference.dataset.chHover === 'true';
        if (opened || hovering) return false;
        else return true;
      }
    }
  }

  /**
   *
   * Get Cell Data
   *
   * @param {Object} params
   * @return {Object}
   *
   */
  static getCellData(params) {

    let $from, $to;
    const type = params.event.type;
    if (type === 'mouseout') {
      $from = params.event.target;
      $to = params.event.relatedTarget;
    }
    else if (type === 'mouseover') {
      $to = params.event.target;
      $from = params.event.relatedTarget;
    }

    let fromIsCell;
    let fromIsOpen;
    let $fromCell;
    if ($from) {
      $from      = $from.closest('.ag-cell')
      fromIsCell = !!$from;
      $fromCell  = fromIsCell && $from;
      fromIsOpen = fromIsCell && $from.dataset.chOpen === 'true';
    }

    let toIsCell;
    let toIsOpen;
    let $toCell;
    if ($to) {
      $to      = $to.closest('.ag-cell');
      toIsCell = !!$to;
      $toCell  = toIsCell && $to;
      toIsOpen = toIsCell && $to.dataset.chOpen === 'true';
    }

    return {
      $to,
      toIsCell,
      toIsOpen,
      $toCell,
      $from,
      fromIsCell,
      fromIsOpen,
      $fromCell,
    }

  }

  /**
   *
   * Open a popdiv
   *
   */
  static open(params) {

    const $cell = params.event.srcElement.closest('.ag-cell');
    const tippy = $cell._tippy;
    if (!tippy) return;

    const popdivType = gnp(params, 'colDef.cellRendererParams.popdiv');

    if (popdivType) {
      $cell.dataset.chOpen = true;
      tippy.set({
        hideOnClick: 'false',
      });
      switch (popdivType) {
        case 'tradingview':
          cellOnClickTradingview(params);
          break;
        case 'exchanges':
          cellOnClickExchanges(params);
          break;
        case 'wallets':
          cellOnClickWallets(params);
          break;
        case 'html':
          cellOnClickHtml(params);
          break;
      }
      $cell.$popDivTippy = $cell._tippy;
      window.bo.func.openCells.addOpen(params);
      const data = {
        popdivType,
        name: params.data['cryptohub-name'],
        rowId: params.id,
        columnId: params.colDef.colId,
      }
      segment.cellSelected(data);
    }

  }

  /**
   *
   * Close a popdiv
   *
   * TODO: fix this so you dont have to pass params
   *
   */
  static close({params, $cell, row, field}) {
    const popdivType = gnp(params, 'colDef.cellRendererParams.popdiv');
    if (!$cell) {
      $cell = params.event.srcElement.closest('.ag-cell');
    }
    if ($cell.dataset.chOpen === 'true') {
      CellInteractions.setMouseOutState($cell);
    }
    $cell.dataset.chOpen = false;
    if ($cell.$popDivTippy) {
      $cell.$popDivTippy.destroy();
    }
    if ($cell.$triggerTippy) {
      $cell.$triggerTippy.reference.classList.remove('CH-cell-hover');
      $cell.$triggerTippy.destroy();
    }
    window.bo.func.openCells.removeOpen({params, $cell, row, field});
    const data = {
      popdivType,
      name: params.data['cryptohub-name'],
      rowId: params.id,
      columnId: params.colDef.colId,
    }
    segment.cellSelected(data);
  }

  /**
   *
   * Set the mouse over state of a cell
   *
   */
  setMouseOverState($cell, content) {
    popDiv($cell, content, this.tippyOptions);
    $cell.$triggerTippy = $cell._tippy;
    $cell.classList.add('CH-cell-hover');
    $cell.dataset.chHover = 'true';
  }

  /**
   *
   * Set the mouse out state of a cell
   *
   */
  static setMouseOutState($cell) {
    $cell.dataset.chHover = false;
    $cell.dataset.chOpen = false;
    if ($cell.$triggerTippy) {
      $cell.$triggerTippy.reference.classList.remove('CH-cell-hover');
      $cell.$triggerTippy.destroy();
    }
    if ($cell.$trigger) {
      $cell.$trigger.removeEventListener('click', CellInteractions.triggerClickHandler);
      $cell.$triggerTippy.destroy();
    }
  }

  /**
   *
   * User clicked on a trigger
   *
   */
  static triggerClickHandler(params) {
    const $cell = params.event.srcElement.closest('.ag-cell');
    if ($cell.dataset.chOpen === 'true') {
      CellInteractions.close({params});
    }
    else {
      CellInteractions.open(params);
    }
  }

  /**
   *
   * Mouse out handler
   *
   */
  mouseOut(params) {

    if (!params.event) {
      const $tippy = document.querySelectorAll(`.CH-tippy-cell-hover-${params.data.id}`)[0];
      if ($tippy) $tippy.remove();
      return;
    }

    const { $to, $from, fromIsCell, fromIsOpen } = CellInteractions.getCellData(params);
    if ($to === $from) {
      return;
    }

    if (fromIsCell && !fromIsOpen) {
      CellInteractions.setMouseOutState($from);
    }

  }

  /**
   *
   * Mouse over handler
   *
   */
  mouseOver(params) {

    const typeArr = gnp(params, 'colDef.type') || [];
    if (!typeArr.includes('cryptohubHover')) {
      return;
    }

    const { $to, $from, toIsOpen, toIsCell } = CellInteractions.getCellData(params);
    if ($to === $from) {
      return;
    }

    if (toIsCell && !toIsOpen) {

      const id = params.data.id;
      const $cell = params.event.srcElement.closest('.ag-cell');
      const content = initPug['tippy-cell-hover']({id});

      this.setMouseOverState($cell, content);

      const $trigger = document.querySelector(`.CH-tippy-cell-hover-${id}`);
      if (!$trigger) {
        return;
      }

      $cell.$trigger = $trigger;
      $cell.$triggerTippy = $cell._tippy;

      $trigger.addEventListener(
        'click',
        partialApplication(CellInteractions.triggerClickHandler, params),
        false
      );

    }

  }

}
