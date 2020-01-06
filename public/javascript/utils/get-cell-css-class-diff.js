'use strict';

/**
 *
 * Get Cell CSS Class Diff
 *
 * @param {String} oldVal
 * @param {String} newVal
 * @return {String} a CSS class name
 *
 */
export default function getCellCssClassDiff(oldVal, newVal) {
  const cssClass = newVal < oldVal
    ? 'CH-text-default CH-text-bad-fade'
    : newVal > oldVal
      ? 'CH-text-default CH-text-good-fade'
      : 'CH-text-default';
  return cssClass;
}
