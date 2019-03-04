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
    // const noOldData = oldValue === void 0 || oldValue.value === null || oldValue.value === void 0 || oldValue.value === '-';
    // const noNewData = newValue === void 0 || newValue.value === null || newValue.value === void 0 || newValue.value === '-';
    // const bothEmpty = noOldData && noNewData;
    // const bothSame = (oldValue.value === newValue.value) && (oldValue.timestamp === newValue.timestamp);
    // return bothEmpty || bothSame;
    return (oldValue.value === newValue.value) && (oldValue.timestamp === newValue.timestamp);
  }
  catch(error) {
    debugger;
  }
}
