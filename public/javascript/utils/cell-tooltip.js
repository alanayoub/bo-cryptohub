'use strict';

import { timeAgo } from '../libs/bo-utils-client';

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
  const t = timeAgo(timestamp) || 'unknown time ago';
  return `Last updated ${t}`;
}
