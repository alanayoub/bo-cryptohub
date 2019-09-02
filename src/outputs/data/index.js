'use strict';

import { partialApplication }      from 'bo-utils';

import analyticsMergeDataByKey     from '../../utils/analytics-merge-data-by-key';

import settings                    from '../../settings';
import { getRows }                 from '../../db/query';

export default {
  onBeforeHandleData: analyticsMergeDataByKey,
  onHandleData() {},
  onAfterConnect(event, socket, data) {

    const cols = JSON.parse(socket.handshake.query.cols);
    const sort = cols.sort;
    const columns = cols.columns;

    getRows(columns, sort, settings.maxRowsTemplatedIn).then(firstX => {
      const firstXStr = JSON.stringify({data: firstX, type: 'dbDiff'});
      socket.emit('data', firstXStr);
      getRows(columns, sort).then(results => {
        const resultsStr = JSON.stringify({data: results, type: 'dbDiff'});
        socket.emit('data', resultsStr);
      });
    });

  }
}
