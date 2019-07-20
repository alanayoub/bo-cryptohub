'use strict';

import { partialApplication }     from 'bo-utils';

import onBeforeEmit               from './on-before-emit.js';
import onHandleData               from './on-handle-data';

export default {
  onBeforeHandleData: data => data,
  onHandleData: partialApplication(onHandleData, {}),
  onAfterConnect(event, socket, data) {
    const emitData = onBeforeEmit({diff: false}, socket, data, {});
    if (emitData) socket.emit(event, emitData);
  },
  onBeforeEmit: partialApplication(onBeforeEmit, {diff: true}),
  onBeforeBootstrapSave: (data) => {
    return data;
  }
}
