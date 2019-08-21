'use strict';

import { partialApplication }     from 'bo-utils';

import onBeforeEmit               from './on-before-emit.js';
import onHandleData               from './on-handle-data';

import { getMaps, getExchanges }  from '../../db/query';

export default {
  onBeforeHandleData: data => data,
  onHandleData: partialApplication(onHandleData, {}),
  onAfterConnect(event, socket, data) {
    const mapIds = ['exchangeMapIdName', 'projectMapIdName'];
    getMaps(mapIds).then(value => {
      const output = JSON.stringify({data: value, type: 'maps'});
      socket.emit('store', output);
    });
    getExchanges().then(value => {
      const output = JSON.stringify({data: value, type: 'exchanges'});
      socket.emit('store', output);
    });
  },
  onBeforeEmit: partialApplication(onBeforeEmit, {diff: true}),
  onBeforeBootstrapSave: (data) => {
    return data;
  }
}
