import gnp from '../libs/bo-utils/object-get-nested-property.js';

/**
 *
 * SHOULD CELL UPDATE
 *
 * Decide whether to update the cell or not.
 * Note we DO want to update the cell even if the data hasnt changed so
 * that the HTML reloads. That said we don't want to update if we have no data.
 *
 * @param {String} oldValue
 * @param {String} newValue
 * @return {Boolean}
 *
 */
export default function shouldCellUpdate(oldValue, newValue) {
  try {
    return (gnp(oldValue, 'value') === gnp(newValue, 'value'))
      && (gnp(oldValue, 'timestamp') === gnp(newValue, 'timestamp'));
  }
  catch(error) {
    debugger;
  }
}
