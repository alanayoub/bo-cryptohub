import { partialApplication } from 'bo-utils';

import onHandleData from './on-handle-data';
import { getMaps, getExchanges, getWallets } from '../../db/query';

export default {
  onBeforeHandleData: data => data,
  onHandleData: partialApplication(onHandleData, {}),
  onAfterConnect(event, socket, data) {
    const mapIds = [
      'exchangeMapIdName',
      'projectMapIdName',
      'walletMapIdName'
    ];
    getMaps(mapIds).then(value => {
      const output = JSON.stringify({data: value, type: 'maps'});
      socket.emit('store', output);
    });
    getExchanges().then(value => {
      const output = JSON.stringify({data: value, type: 'exchanges'});
      socket.emit('store', output);
    });
    getWallets().then(value => {
      const output = JSON.stringify({data: value, type: 'wallets'});
      socket.emit('store', output);
    });
  }
}
