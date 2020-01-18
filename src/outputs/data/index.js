import { partialApplication }      from 'bo-utils';

import analyticsMergeDataByKey     from '../../utils/analytics-merge-data-by-key';
import settings                    from '../../settings';
import { getRows }                 from '../../db/query';

export default {
  onBeforeHandleData: analyticsMergeDataByKey,
  onHandleData() {},
  onAfterConnect(event, socket, data) {
    socket.emit('cols');
  }
}
