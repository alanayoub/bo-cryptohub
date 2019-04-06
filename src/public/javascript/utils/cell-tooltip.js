'use strict';

/**
 *
 * CELL TOOLTIP
 *
 * @param {Object} params
 * @return {String}
 *
 */
export default function cellTooltip(params) {
  const { data, colDef } = params;
  const field = data[colDef.field];
  const timestamp = field && field.timestamp;
  const t = bo.timeAgo(timestamp) || 'unknown time ago';
  return `Last updated ${t}`;
}
