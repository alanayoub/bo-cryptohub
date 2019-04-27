//
// TODO: refs? really
// Clear up this dumping ground
//
// Start again...
//
// window.bo = {
//   data: {
//     row: [],
//     emit: ?,
//     store: ?
//   },
//   func: {
//     updated
//   },
//   common: {
//     emptyCellValue: '-',
//   }
// }
//

import { timeAgo }                    from './libs/bo-utils-client';

window.initData = window.initData || {};
window.initStore = window.initStore || {};

window.bo = {
  func: {}
};

window.refs = {
  store: [], // the last version of the packed data
  rowData: [],
  emitData: [],
};

window.ch = {
  emptyCellValue: '-',
  ...initStore
};

window.timestamp = null;

/**
 *
 * Updated
 * @param {Date} when
 * @return void
 *
 */
window.bo.func.updated = function (when) {

  if (when === 'now') window.timestamp = new Date();
  const time = timeAgo(window.timestamp);
  document.querySelector('#updated').innerHTML = `Last Updated: ${time}`;

}
