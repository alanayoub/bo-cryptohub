import '@babel/polyfill';
import pug from 'pug-runtime';

import { Grid } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/all-modules';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import State from './classes/class-state.js';
import Layout from './views/layout';
import GadgetsManager from './views/gadgets/manager';
import globals from './globals.js';
import initPug from './generated/init-pug.generated.js';
import ToolbarView from './views/toolbar/toolbar.js';
import CookieBarView from './views/cookie-bar';
import defaultConfig from './default-config.js';
import dataEmitHandler from './eventHandlers/data';
import CellInteractions from './classes/class-cell-interactions.js';
import generateAgOptions from './ag-grid-options-generate.js';

import { getRandomInt } from './libs/bo-utils-client';

import style from '../stylesheet/index.scss';

import segment from './utils/segment.js';

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

document.querySelector('.CH-app').innerHTML = initPug['app-container']({});

bo.inst.layout = new Layout({
  container: document.querySelector('.CH-layout')
});
bo.inst.gadgets = {
  manager: new GadgetsManager()
};

$('body').on('click', '.ch-logo a', event => {
  segment.homeLogoClicked();
});

new CookieBarView();

window.bo.inst.cellInteractions = new CellInteractions();
window.bo.inst.state = new State(defaultConfig);
window.bo.inst.state.init().then(state => {

  bo.inst.socket = io();

  // TODO: move to bo-utils
  function waitUntil(check, cb, interval = 100) {
    let i = setInterval(() => {
      if (typeof check === 'function' ? check() : check) {
        clearInterval(i);
        cb();
      }
    }, interval);
  }
  waitUntil(() => refs.rowData, bo.inst.gadgets.manager.load, 100);

  generateAgOptions().then(agOptions => {

    const gridElement = document.querySelector('#ch-grid');
    const grid = new Grid(gridElement, agOptions, {modules: AllCommunityModules});

    if (!grid) throw new Error('Cant find grid');

    window.bo.inst.socket.on('cols', data => {
      window.bo.inst.state.get().then(state => {
        const columns = state.window[0].columns.filter(v => !/^c-\d{1,4}$/.test(v.id)).map(v => v.id).join(',');
        const sort = state.window[0].sort;
        const emitData = JSON.stringify({columns, sort});
        window.bo.inst.socket.emit('cols', emitData);
      });
    });
    window.bo.inst.socket.on('rows-full', data => {
      dataEmitHandler('rows-full', data);
    });
    window.bo.inst.socket.on('rows-update', data => {
      dataEmitHandler('rows-update', data);
    });
    window.bo.inst.socket.on('store', storeEmitHandler);

    window.bo.func.updated('now');
    window.bo.inst.toolbarView = new ToolbarView(
      '.CH-hook-toolbar',
      'min-content min-content max-content max-content max-content min-content auto max-content min-content',
      {
        home: true,
        edit: true,
        blog: true,
        load: true,
        save: true,
        twitter: true,
        presets: true,
        // indicators: true,
        // tokens: true,
        // updated: true,
        live: true,
        login: true
      }
    );

    setInterval(window.bo.func.updated, 1000 * 1);

    window.onpopstate = event => {
      if (event.state) {
        window.bo.inst.state.update(event.state);
      }
      else if (window.location.hash) {
        window.bo.inst.state.update();
      }
      else {
        window.history.back();
      }
    }

  });

});
