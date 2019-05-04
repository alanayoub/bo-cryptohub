'use strict'

// Binary Overdose Projects
import { getRandomInt }               from '../libs/bo-utils-client';
import { partialApplication }         from '../libs/bo-utils-client';
import { htmlToggleClass }            from '../libs/bo-utils-client';

// Cryptohub util functions
import popDiv                         from '../utils/popdiv.js';
import initPug                        from '../generated/init-pug.generated.js';

import cellOnClickTradingview         from '../utils/cell-on-click-tradingview.js';

export default class CellInteractions {

  constructor() {
    this.hovering$cell = null;
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
   * Open a popdiv
   *
   */
  static open(params, action) {

    const $cell = params.event.srcElement.closest('.ag-cell');
    // htmlToggleClass($cell, 'ch-cell-active');

    // this.setMouseOverState($cell);
    switch (action) {
      case 'tradingview':
        $cell.dataset.chOpen = true;
        $cell._tippy.set({
          hideOnClick: 'false',
        });
        cellOnClickTradingview('USD', params);
        $cell.$popDivTippy = $cell._tippy;
        break;
      default:
        // do nothing
    }

  }

  /**
   *
   * Close a popdiv
   *
   */
  static close(params) {
    const $cell = params.event.srcElement.closest('.ag-cell');
    if ($cell.$popDivTippy) {
      $cell.$popDivTippy.destroy();
    }
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
    this.hovering$cell = $cell;
  }

  /**
   *
   * Set the mouse out state of a cell
   *
   */
  setMouseOutState($cell) {
    $cell.dataset.chHover = false;
    $cell.dataset.chOpen = false;
    this.hovering$cell = null;
    if ($cell.$triggerTippy) {
      $cell.$triggerTippy.reference.classList.remove('ch-cell-hover');
      $cell.$triggerTippy.destroy();
      if ($cell.$triggerTippy) {
        $cell.$trigger.removeEventListener('click', this.triggerClickHandler);
        $cell.$triggerTippy.destroy();
      }
    }
  }

  /**
   *
   * User clicked on a trigger
   *
   */
  triggerClickHandler(context, params, action) {
    const $cell = params.event.srcElement.closest('.ag-cell');
    if ($cell.dataset.chOpen === 'true') {
      context.setMouseOutState($cell);
      CellInteractions.close(params);
    }
    else {
      CellInteractions.open(params, action);
    }
  }

  /**
   *
   * Mouse out handler
   *
   */
  mouseOut(params) {

    const $cell = params.event.srcElement.closest('.ag-cell');
    if (!$cell.$trigger) {
      this.setMouseOutState($cell);
    }

    // const $cell = params.event.srcElement.closest('.ag-cell');
    // if (this.hovering$cell && !hovering$cellOpen) {
    //   this.setMouseOutState(this.hovering$cell);
    // }

  //   const hovering = $cell.dataset.chHover === 'true';
  //   if (hovering) {
  //     $cell.dataset.chHover = false;
  //     // $cell.dataset.chOpen = false;
  //     if ($cell._tippy) {
  //       $cell._tippy.reference.classList.remove('ch-cell-hover');
  //       $cell._tippy.destroy();
  //     }
  //   }
  }

  /**
   *
   * Mouse over handler
   *
   */
  mouseOver(params, action) {

    const id = getRandomInt();
    const $cell = params.event.srcElement.closest('.ag-cell');
    const width = $cell.scrollWidth;
    const height = $cell.scrollHeight;
    const content = initPug['ch-tippy-cell-hover']({id});
    const hovering$cellOpen = this.hovering$cell && this.hovering$cell.dataset.chOpen === 'true';

    // If we are hovering over one that is already open
    if ($cell.dataset.chOpen === 'true') return;

    // If this is the same cell
    if ($cell === this.hovering$cell) return

    if (this.hovering$cell && !hovering$cellOpen) {
      this.setMouseOutState(this.hovering$cell);
    }

    // If there are no actions
    if (!action) return;

    if ($cell.dataset.chHover !== 'true') {
      this.setMouseOverState($cell, content);
    }

    // this.active$cell = $cell;

    const $trigger = document.querySelector(`.ch-tippy-cell-hover-${id}`);
    if (!$trigger) return;

    $cell.$trigger = $trigger;
    $cell.$triggerTippy = $cell._tippy;

    $trigger.addEventListener(
      'click',
      partialApplication(this.triggerClickHandler, this, params, action),
      false
    );

  }

}
