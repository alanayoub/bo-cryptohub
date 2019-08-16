'use strict';

import { partialApplication }      from 'bo-utils';

import onBeforeEmit                from './on-before-emit.js';
import onHandleData                from './on-handle-data';

import analyticsMergeDataByKey     from '../../utils/analytics-merge-data-by-key';

import settings                    from '../../settings';
import { getRows }                 from '../../db/query';

function getFirstXRows(data, numRows = 50) {

  let id;
  let ids;
  let rows;
  let output = {};

  const idField = 'cc-total-vol-full-Id';
  const volField = 'cc-total-vol-full-TOTALVOLUME24HTO';

  rows = Object
    .values(data)
    .filter(a => a[idField])
    .sort((a, b) => b[volField] - a[volField])
    .slice(0, numRows);

  ids = rows.map(a => a[idField]);
  for (id of ids) output[id] = data[id];
  return output;
}

let initData = null;

export default {
  onBeforeHandleData: analyticsMergeDataByKey,
  onHandleData: partialApplication(onHandleData, {}),
  onAfterConnect(event, socket, data) {
    // const emitData = onBeforeEmit({diff: false}, socket, data, initData);
    // if (emitData) socket.emit(event, emitData);
    const cols = JSON.parse(socket.handshake.query.cols);
    const sort = cols.sort.column;
    const columns = cols.columns;

    getRows(columns, sort, settings.maxRowsTemplatedIn).then(firstX => {
      const firstXStr = JSON.stringify({data: firstX, type: 'dbDiff'});
      socket.emit('data', firstXStr);
    });

    getRows(columns, sort).then(results => {
      const resultsStr = JSON.stringify({data: results, type: 'dbDiff'});
      socket.emit('data', resultsStr);
    });

  },
  onBeforeBootstrapSave: data => {
    initData = getFirstXRows(data, settings.maxRowsTemplatedIn);
    if (!settings.maxRowsTemplatedIn) return data;
    return initData;
  },
  // NOTE: note being used
  onBeforeEmit: partialApplication(onBeforeEmit, {diff: true}),
}
