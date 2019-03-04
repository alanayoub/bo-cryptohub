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
    ? 'cryptohub-text-default cryptohub-text-bad-fade'
    : newVal > oldVal
      ? 'cryptohub-text-default cryptohub-text-good-fade'
      : 'cryptohub-text-default';
  return cssClass;
}
