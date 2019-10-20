/**
 *
 * Get Unchanged Values
 *
 * @param {Object} data - the input object to a tsdays db update
 * @param {Object} last - the previous input object to diff with
 * @return {Object} the changes
 *
 */
export default function getUnchangedValues(data, last) {

  if (last === null) {
    return data;
  }

  const changed = {};
  for (const [id, obj] of Object.entries(data)) {
    for (const [field, value] of Object.entries(obj)) {
      const isEqual = last.hasOwnProperty(field) && last[field] === value;
      if (!isEqual) {
        if (!changed.hasOwnProperty(id)) {
          changed[id] = {};
        }
        changed[id][field] = value;
      }
    }
  }

  return changed;

}
