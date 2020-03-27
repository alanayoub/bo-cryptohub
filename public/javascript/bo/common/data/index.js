'use strict';

import EventEmitter from 'events';

import mainFull from './main.full';
import mainPartial from './main.partial';
import exchangeMapIdName from './exchange.map.id.name';
import projectMapIdName from './project.map.id.name';
import exchanges from './exchanges';
import wallets from './wallets';

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

      data = JSON.parse(data);

      if (data.type === 'maps') {
        for (const item of data.data) {
          if (item._id === 'exchangeMapIdName') {
            const parsed = exchangeMapIdName({data: item.map, lastData: this.last.exchangeMapIdName});
            this.last.exchangeMapIdName = parsed;
            this.emit('exchangeMapIdName', {partial: false, data: parsed});
          }
          if (item._id === 'projectMapIdName') {
            const parsed = projectMapIdName({data: item.map, lastData: this.last.projectMapIdName});
            this.last.projectMapIdName = parsed;
            this.emit('projectMapIdName', {partial: false, data: parsed});
          }
        }
      }
      else if (data.type === 'exchanges') {
        const parsed = exchanges({data: data.data, lastData: this.last.exchanges});
        this.last.exchanges = parsed;
        this.emit('exchanges', {partial: false, data: parsed});
      }
      else if (data.type === 'wallets') {
        const parsed = wallets({data: data.data, lastData: this.last.wallets});
        this.last.wallets = parsed;
        this.emit('wallets', {partial: false, data: parsed});
      }
    });

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
