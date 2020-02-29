'use strict';

import EventEmitter from 'events';

import mainFull from './main.full';
import mainPartial from './main.partial';

export default class Data extends EventEmitter {

  constructor() {
    super();

    this.last = {};
    // this.once('newEventListener', (event, listener) => {
    //   if (event === 'layout') {
    //     this.emit('layout');
    //     this.off('layout');
    //   }
    // });

    window.onhashchange = event => {
      this.emit('hashchange', event);
    };

    bo.inst.socket = io();

    bo.inst.socket.on('cols', data => {
      bo.inst.state.get().then(state => {
        const columns = state.window[0].columns.filter(v => !/^c-\d{1,4}$/.test(v.id)).map(v => v.id).join(',');
        const sort = state.window[0].sort;
        const emitData = JSON.stringify({columns, sort});
        bo.inst.socket.emit('cols', emitData);
      });
    });

    bo.inst.socket.on('rows-full', data => {
      bo.inst.state.get().then(state => {
        const parsed = mainFull({data, state: state.window[0]});
        this.last.main = parsed;
        this.emit('main', {full: true, data: parsed});
      });
    });

    bo.inst.socket.on('rows-update', data => {
      bo.inst.state.get().then(state => {
        const parsed = mainPartial({data, state: state.window[0], lastData: this.last.main});
        this.last.main = parsed;
        this.emit('main', {partial: true, data: parsed});
      });
    });

    bo.inst.socket.on('store', data =>  {
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

}
