import '@babel/polyfill';
import pug from 'pug-runtime';

import { Grid } from 'ag-grid';

import State from './classes/class-state.js';
import globals from './globals.js';
import initPug from './generated/init-pug.generated.js';
import ToolbarView from './views/toolbar/toolbar.js';
import defaultConfig from './default-config.js';
import dataEmitHandler from './eventHandlers/data';
import CellInteractions from './classes/class-cell-interactions.js';
import generateAgOptions from './ag-grid-options-generate.js';

import style from '../stylesheet/index.scss';

window.pug = pug;
window.Grid = Grid;

function flipMap(map) {
  const out = {};
  for(const key in map) {
    out[map[key]] = key;
  }
  return out;
}

/**
 *
 * Handle store events
 *
 * @param {Object} data
 * @return void
 *
 */
function storeEmitHandler(data) {

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

}

const content = initPug['app-container']({});
document.querySelector('.CH-app').innerHTML = content;

window.bo.inst.cellInteractions = new CellInteractions();
window.bo.inst.state = new State(defaultConfig);
window.bo.inst.state.init().then(state => {

  const columns = state.columns.filter(v => !/^c-\d{1,4}$/.test(v.id)).map(v => v.id).join(',');
  const sort = state.sort;
  const emitData = JSON.stringify({columns, sort});
  window.bo.inst.socket = io({query: {cols: emitData} });

  generateAgOptions().then(agOptions => {

    const gridElement = document.querySelector('#ch-grid');
    const grid = new Grid(gridElement, agOptions);

    if (!grid) throw new Error('Cant find grid');

    window.bo.inst.socket.on('rows-full', data => {
      dataEmitHandler('rows-full', data);
    });
    window.bo.inst.socket.on('rows-update', data => {
      dataEmitHandler('rows-update', data);
    });
    window.bo.inst.socket.on('store', storeEmitHandler);
    // window.bo.inst.socket.on('connect', () => {
    //   console.log('socket connected');
    // });
    // window.bo.inst.socket.on('disconnect', () => {
    //   console.log('socket disconnected');
    // });

    window.bo.func.updated('now');
    window.bo.inst.toolbarView = new ToolbarView('.CH-hook-toolbar');

    setInterval(window.bo.func.updated, 1000 * 1);

    window.onpopstate = event => {
      if (event.state) {
        window.bo.inst.state.update(event.state);
      }
      else {
        window.history.back();
      }
    }

  });

});
