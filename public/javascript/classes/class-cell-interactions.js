'use strict'

// Binary Overdose Projects
import { partialApplication }             from '../libs/bo-utils-client';
import { htmlToggleClass }                from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

// Cryptohub util functions
import popDiv                             from '../utils/popdiv.js';
import initPug                            from '../generated/init-pug.generated.js';

import cellOnClickTradingview             from '../utils/cell-on-click-tradingview.js';
import cellOnClickExchanges               from '../utils/cell-on-click-exchanges.js';

export default class CellInteractions {

  constructor() {
    this.openItems = [];
    this.tippyOptions = {
      theme: 'light',
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

    let $from = params.event.fromElement;
    let fromIsCell;
    let fromIsOpen;
    let $fromCell;
    if ($from) {
      $from      = $from.closest('.ag-cell')
      fromIsCell = !!$from;
      $fromCell  = fromIsCell && $from;
      fromIsOpen = fromIsCell && $from.dataset.chOpen === 'true';
    }

    let $to = params.event.toElement;
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
    const colId = params.colDef.colId;
    const tippy = $cell._tippy;
    const currencyColumns = [
      'priceUSDCC',
      'priceBTCCC',
      'priceUSDMessari',
      'priceBTCMessari'
    ];
    if (!tippy) return;

    if (currencyColumns.includes(colId)) {
      $cell.dataset.chOpen = true;
      tippy.set({
        hideOnClick: 'false',
      });
      cellOnClickTradingview(params);
      $cell.$popDivTippy = $cell._tippy;
      window.bo.func.openCells.addOpen(params);
    }
    else if (colId === 'numberOfExchanges') {
      $cell.dataset.chOpen = true;
      tippy.set({
        hideOnClick: 'false',
      });
      cellOnClickExchanges(params);
      $cell.$popDivTippy = $cell._tippy;
      window.bo.func.openCells.addOpen(params);
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
      $cell.$triggerTippy.reference.classList.remove('ch-cell-hover');
      $cell.$triggerTippy.destroy();
    }
    window.bo.func.openCells.removeOpen({params, $cell, row, field});
  }

  /**
   *
   * Set the mouse over state of a cell
   *
   */
  setMouseOverState($cell, content) {
    popDiv($cell, content, this.tippyOptions);
    $cell.$triggerTippy = $cell._tippy;
    $cell.classList.add('ch-cell-hover');
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
      $cell.$triggerTippy.reference.classList.remove('ch-cell-hover');
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
      const $tippy = document.querySelectorAll(`.ch-tippy-cell-hover-${params.data.id}`)[0];
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
      const content = initPug['ch-tippy-cell-hover']({id});

      this.setMouseOverState($cell, content);

      const $trigger = document.querySelector(`.ch-tippy-cell-hover-${id}`);
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
