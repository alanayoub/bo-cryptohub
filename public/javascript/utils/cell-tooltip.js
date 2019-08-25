'use strict';

import { timeAgo } from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

/**
 *
 * CELL TOOLTIP
 *
 * @param {Object} params
 * @return {String}
 *
 */
export default function cellTooltip(params) {
  const lastChecked = gnp(params, 'value.lastChecked');
  const t = timeAgo(lastChecked) || 'unknown time ago';
  return `Last updated ${t}`;
}
