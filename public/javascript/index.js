import '@babel/polyfill';
import pug from 'pug-runtime';

import { Grid } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/all-modules';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import Data from './bo/common/data';
import Events from './bo/common/events';
import State from './classes/class-state.js';
import Layout from './views/layout';
import GadgetsManager from './views/gadgets/manager';
import globals from './globals.js';
import initPug from './generated/init-pug.generated.js';
import ToolbarView from './views/toolbar/toolbar.js';
import CookieBarView from './views/cookie-bar';
import defaultConfig from './default-config.js';
import CellInteractions from './classes/class-cell-interactions.js';

import { getRandomInt } from './libs/bo-utils-client';
import { waitUntil } from './libs/bo-utils-client';

import style from '../stylesheet/index.scss';

import segment from './utils/segment.js';

window.pug = pug;

document.querySelector('.CH-app').innerHTML = initPug['app-container']({});

$('body').on('click', '.ch-logo a', event => {
  segment.homeLogoClicked();
});

new CookieBarView();
bo.flag = {};
bo.inst.data = new Data();
bo.inst.events = new Events();

window.bo.inst.cellInteractions = new CellInteractions();
window.bo.inst.state = new State(defaultConfig);
window.bo.inst.state.init().then(({state, filterModel}) => {

  bo.inst.gadgets = {
    manager: new GadgetsManager()
  };

  bo.inst.data.on('main', data => {
    if (!bo.inst.layout) {
      bo.inst.layout = new Layout({
        state,
        data: data.data,
        container: document.querySelector('.CH-layout')
      });
    }
  });

  setInterval(window.bo.func.updated, 1000 * 1);

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

});
