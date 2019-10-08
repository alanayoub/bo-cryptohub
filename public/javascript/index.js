// Libs
import '@babel/polyfill';

import globals from './globals.js';
import defaultConfig from './default-config.js';
import CellInteractions from './classes/class-cell-interactions.js';
import State from './classes/class-state.js';
import ToolbarView from './views/toolbar/toolbar.js';
import generateAgOptions from './ag-grid-options-generate.js';
import dataEmitHandler from './eventHandlers/data';

import style from '../stylesheet/index.css';

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
  if (!window.initStore) window.initStore = window.ch;

}

window.bo.inst.cellInteractions = new CellInteractions();
window.bo.inst.state = new State(defaultConfig);
window.bo.inst.state.init().then(state => {

  const columns = state.columns.filter(v => !/^c-\d{1,4}$/.test(v.id)).map(v => v.id).join(',');
  const sort = state.sort;
  const emitData = JSON.stringify({columns, sort});
  window.bo.inst.socket = io({query: {cols: emitData} });

  generateAgOptions().then(agOptions => {

    const gridElement = document.querySelector('#ch-grid');
    const grid = new agGrid.Grid(gridElement, agOptions);

    if (!grid) throw new Error('Cant find grid');

    bo.inst.socket.on('rows-full', data => {
      dataEmitHandler('rows-full', data);
    });
    bo.inst.socket.on('rows-update', data => {
      dataEmitHandler('rows-update', data);
    });
    bo.inst.socket.on('store', storeEmitHandler);

    window.bo.func.updated('now');
    window.bo.inst.toolbarView = new ToolbarView('.CH-hook-toolbar');

    setInterval(window.bo.func.updated, 1000 * 1);

    window.onpopstate = event => {
      if (event.state) {
        bo.inst.state.update(event.state);
      }
      else {
        bo.inst.state.set(defaultConfig);
      }
    }

  });

});
