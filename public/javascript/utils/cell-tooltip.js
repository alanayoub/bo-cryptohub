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
  const field = params.colDef.field.split('.')[0];
  const data = params.data[field] || {};
  const t = timeAgo(data.lastChecked) || 'unknown time ago';
  return `Last updated ${t}`;
}
