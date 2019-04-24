'use strict';

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
  const boundary = document.querySelector('.ag-body');
  const defaultTippyOptions = {
    content,
    boundary,
    arrow: false,
    theme: 'light',
    trigger: 'click',
    allowHTML: true,
    placement: 'bottom-start',
    showOnInit: true,
    hideOnClick: 'toggle',
    interactive: true,
    interactiveBorder: 5,
    interactiveDebounce: 1,
  }
  tippy(element, Object.assign(defaultTippyOptions, tippyOptions));
}
