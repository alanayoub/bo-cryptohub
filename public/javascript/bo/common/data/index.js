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

        //
        // Get data dependencies from all gadgets
        // TODO: at the moment we are only getting dependencies
        // for grids
        //
        // cols = {
        //   123: {
        //     columns: [
        //       {id: 'price', width: 100},
        //       {id: 'volume', width: 100},
        //     ],
        //     sort: {colId: 'price', sort: 'asc'}
        //   },
        //   456: {...}
        // }
        //
        const cols = {};
        for (const val of bo.clas.Layout.iterateStacks(state.layout)) {
          if (val.type === 'stack') {
            for (const [idx, component] of Object.entries(val.ref.content)) {
              const { columns, sort, id, type } = component;
              if (columns) {
                cols[id] = {
                  columns
                };
              }
              if (sort) cols[id].sort = sort;
            }
          }
        }

        //
        // Send data in old format
        // TODO: send in new format with multiple sorts etc
        //
        let sort;
        let columns = [];
        for (const [id, data] of Object.entries(cols)) {
          const c = data.columns
            .filter(v => !/^c-\d{1,4}$/.test(v.id))
            .map(v => v.id);
          columns = columns.concat(c);
          if (!sort) sort = data.sort;
        }
        const emitData = JSON.stringify({
          sort, columns: columns.join(',')
        });

        socket.emit('cols', emitData);
      });
    });

    socket.on('rows-full', data => {
      bo.inst.state.get().then(state => {
        const columns = Data.getAllColumnsFlat(state.layout);
        const parsed = mainFull({data, columns});
        this.last.main = parsed;
        this.emit('main', {full: true, data: parsed});
      });
    });

    socket.on('rows-update', data => {
      bo.inst.state.get().then(state => {
        const columns = Data.getAllColumnsFlat(state.layout);
        const parsed = mainPartial({data, columns, lastData: this.last.main});
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

  static getAllColumnsFlat(layout) {
    //
    // Get data dependencies from all gadgets
    // TODO: at the moment we are only getting dependencies
    // for grids
    //
    // cols = {
    //   123: {
    //     columns: [
    //       {id: 'price', width: 100},
    //       {id: 'volume', width: 100},
    //     ],
    //     sort: {colId: 'price', sort: 'asc'}
    //   },
    //   456: {...}
    // }
    //
    const cols = new Set();
    for (const val of bo.clas.Layout.iterateStacks(layout)) {
      if (val.type === 'stack') {
        for (const [idx, component] of Object.entries(val.ref.content)) {
          const { columns, sort, id, type } = component;
          if (columns) {
            columns.forEach(x => cols.add(x));
          }
        }
      }
    }
    return Array.from(cols);

  }

}
