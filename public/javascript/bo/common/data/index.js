'use strict';

import EventEmitter from 'events';

import mainFull from './main.full';
import mainPartial from './main.partial';

export default class Data extends EventEmitter {

  constructor() {
    super();

    const socket = bo.inst.socket = io();
    this.last = {};
    // this.once('newEventListener', (event, listener) => {
    //   if (event === 'layout') {
    //     this.emit('layout');
    //     this.off('layout');
    //   }
    // });

    socket.on('cols', () => {
      bo.inst.state.get().then(state => {
        const columns = state.window[0].columns
          .filter(v => !/^c-\d{1,4}$/.test(v.id))
          .map(v => v.id).join(',');
        const sort = state.window[0].sort;
        const emitData = JSON.stringify({columns, sort});
        socket.emit('cols', emitData);
      });
    });

    socket.on('rows-full', data => {
      bo.inst.state.get().then(state => {
        const parsed = mainFull({data, state: state.window[0]});
        this.last.main = parsed;
        this.emit('main', {full: true, data: parsed});
      });
    });

    socket.on('rows-update', data => {
      bo.inst.state.get().then(state => {
        const parsed = mainPartial({data, state: state.window[0], lastData: this.last.main});
        this.last.main = parsed;
        this.emit('main', {partial: true, data: parsed});
      });
    });

    socket.on('store', data =>  {
      function flipMap(map) {
        const out = {};
        for(const key in map) {
          out[map[key]] = key;
        }
        return out;
      }
      window.bo.func.updated('now');

      let newSocketData = JSON.parse(data);
      const type = newSocketData.type;
      newSocketData = newSocketData.data;

      if (type === 'maps') {
        for (const item of newSocketData) {
          window.ch[item._id] = item.map;
          if (item._id === 'exchangeMapIdName') {
            window.ch['exchangeMapNameId'] = flipMap(item.map);
          }
          if (item._id === 'projectMapIdName') {
            window.ch['projectMapNameId'] = flipMap(item.map);
          }
        }
      }
      else if (type === 'exchanges') {
        window.ch.exchanges = newSocketData;
      }
      else if (type === 'wallets') {
        window.ch.wallets = newSocketData;
      }
      if (!window.initStore) window.initStore = window.ch;
    });

    // this.emit('cols', {full: true, data: {}});
    // this.emit('main', {full: true, data: {}});
    // this.emit('main', {partial: true, data: {}});

  }

  static async getState(url) {
    if (!url) return;
    const urlObj = new URL(url);
    const fragmentId = urlObj.hash.substr(1);
    if (!fragmentId) return;
    const state = await bo.clas.State.urlDecode(fragmentId);
    return state;
  }

}
