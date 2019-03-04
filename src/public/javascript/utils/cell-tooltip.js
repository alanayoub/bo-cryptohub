import timeago from '../libs/bo-utils/time-ago.js';

/**
 *
 * CELL TOOLTIP
 *
 * @param {Object} params
 * @return {String}
 *
 */
export default function cellTooltip(params) {
  const { value, valueFormatted, data, node, colDef, rowIndex, api } = params;
  const field = data[colDef.field];
  const timestamp = field && field.timestamp;
  const t = timeago(timestamp) || 'unknown time ago';
  return `Last updated ${t}`;
}
