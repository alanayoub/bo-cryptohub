'use strict';

import tippy from 'tippy.js';
import draggable from 'jquery-ui/ui/widgets/draggable';
import droppable from 'jquery-ui/ui/widgets/droppable';

import initPug from '../../generated/init-pug.generated.js';
import { getRandomInt } from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

/**
 *
 * POPDIV
 *
 * NOTE: gadgets should register themselvs with the gadget manager
 *
 * Initialize a Tippy popdiv on a HTML element
 * By default the popdiv is shown on initialization via the `showOnInit` property
 *
 * @param {HTMLElement} element
 * @param {String|HTMLElement|Function} content
 * @param {Object} tippyOptions - use to overwrite the default options setup here
 *
 * @see https://atomiks.github.io/tippyjs/
 *
 */
export default class popDiv {

  constructor(params, content, tippyOptions = {}) {
    const element = params.event.target.closest('.ag-cell');
    const appendTo = document.querySelector('body');
    const defaultTippyOptions = {
      popperOptions: {
        modifiers: {
          preventOverflow: {
            escapeWithReference: true,
          },
          hide: {
            enabled: false
          }
        },
      },
      content,
      appendTo,
      flip: false,
      arrow: false,
      theme: 'light CH-tippy-popdiv',
      trigger: 'click',
      maxWidth: 'none',
      multiple: true,
      allowHTML: true,
      placement: 'bottom-start',
      showOnInit: true,
      hideOnClick: 'toggle',
      interactive: true,
      interactiveBorder: 5,
      interactiveDebounce: 1,
    }
    tippy(element, Object.assign(defaultTippyOptions, tippyOptions));
    this.dragDrop(params);
    return element;
  }

  dragDrop(params) {

    const draggable = $('.tippy-popper').draggable({
      helper: function (event, ui) {
        const name = gnp(params, 'data.cc-total-vol-full-FullName.value');
        const field = params.colDef.field;
        const title = `${name} ${field}`;
        const rowId = params.data.id;
        const colId = params.colDef.colId;
        const context = {title, rowId, colId};
        const html = initPug['CH-tippy-drag-helper'](context);
        return html;
      },
      zIndex: 10000,
      cursor: 'move',
      revert: 'invalid',
      scroll: false,
      distance: 20,
      cursorAt: {top: 25, left: 10},
      iframeFix: true,
      appendTo: 'body',
      revertDuration: 500,
    });
    draggable.on('dragstart', (event, ui) => {
      ui.helper[0].style.transform = 'none';
      ui.helper[0].style.top = ui.originalPosition.top;
      ui.helper[0].style.left = ui.originalPosition.left;
    });

  }

}
