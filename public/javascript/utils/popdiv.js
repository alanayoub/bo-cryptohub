'use strict';

import tippy from 'tippy.js';

/**
 *
 * POPDIV
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
export default function popDiv(element, content, tippyOptions = {}) {
  const appendTo = document.querySelector('.ag-root');
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
  return element;
}
