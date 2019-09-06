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

//
// TODO: Replace with custom tooltip
//   https://www.ag-grid.com/javascript-grid-tooltip-component/
//   https://plnkr.co/edit/c4izQMo7ccb2Dpnxjav8?p=preview
//
//
// function CustomTooltip () {}

// CustomTooltip.prototype.init = function(params) {
//     var eGui = this.eGui = document.createElement('div'),
//         isHeader = params.rowIndex === undefined,
//         isGroupedHeader = isHeader && !!params.colDef.children,
//         str, valueToDisplay;

//     eGui.classList.add('custom-tooltip');

//     if (isHeader) {
//         str =  '<p>Group Name: ' + params.value + '</p>';
//         if (isGroupedHeader) {
//             str += '<hr>';
//             params.colDef.children.forEach(function(header, idx) {
//                 str += '<p>Child ' + (idx + 1) + ' - ' + header.headerName + '</p>';
//             });
//         }
//         eGui.innerHTML = str;
//     } else {
//         valueToDisplay = params.value.value ? params.value.value : '- Missing -';

//         eGui.innerHTML =
//             '<p>Athletes name:</p>' +
//             '<p><span class"name">' + valueToDisplay + '</span></p>';
//     }
// };

// CustomTooltip.prototype.getGui = function() {
//     return this.eGui;
// };
