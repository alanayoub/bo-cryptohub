import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

import def from '../../bo/common/gadgets/default';
import html from '../popdiv-html';
import wallets from '../popdiv-wallets';
import treemap from '../../bo/common/gadgets/treemap';
import exchanges from '../popdiv-exchanges';
import tradingview from '../popdiv-tradingview';

const gadgets = {
  html,
  treemap,
  wallets,
  exchanges,
  tradingview,
  default: def
}

export default class gadgetsManager {

  constructor() {
    this.gadgets = {};
  }

  clean() {
    for (const gadget of this.gadgets) {
      try {
        gadget.alive.call(gadget.context);
      } catch (error) {
        console.log(error);
      }
    }
  }

  resize(stackId) {
    const stacks = bo.inst.layout.root.getItemsByType('stack');
    const stack = stacks.filter(x => x.config.sid === stackId)[0];
    const item = stack.getActiveContentItem().config;
    const gadget = bo.inst.gadgets.manager.gadgets[item.componentState.id];
    if (gadget && gadget.resize) {
      console.log('resizeing', gadget, item.config);
      gadget.resize();
    }
  }

  doStuff(config) {
    // TODO: move to bo-utils
    function waitUntil(check, cb, interval = 100) {
      let i = setInterval(() => {
        if (typeof check === 'function' ? check() : check) {
          clearInterval(i);
          cb();
        }
      }, interval);
    }
    waitUntil(() => refs.rowData, handler, 100);
    const gadgetMan = this;
    function handler() {
      const componentState = config.componentState;
      if (componentState.type) {
        const gadget = new (gadgets[componentState.type])({componentState});
        gadgetMan.gadgets[componentState.id] = gadget;
      }
    }
  }

  async load() {
    const state = await bo.inst.state.get();
    const typeMap = {
      html: 'Data',
      treemap: 'Treemap',
      wallets: 'Wallets',
      default: 'Default',
      exchanges: 'Exchanges',
      tradingview: 'Chart'
    }
    for (const [sid, arr] of Object.entries(state.window)) {
      sid = +sid;
      if (sid !== 0) { // Don't do the main window for now
        let alive;
        for (const value of arr) {
          if (value.id) {
            const gadget = bo.inst.gadgets.manager.gadgets[value.id];
            if (gadget && typeof gadget.alive === 'function' && gadget.alive()) {
              alive = true;
            }
          }
          if (alive) continue;
          const stacks = bo.inst.layout.root.getItemsByType('stack');
          const stack = stacks.filter(v => v.config.sid === sid);
          if (stack.length) {
            const id = value.id;

            const data = refs.rowData.find(v => v.id === value.rowId);
            let title;
            if (data) {
              const name = data['cc-total-vol-full-FullName'].value;
              const type = typeMap[value.type];
              title = `${name} ${type}`;
            }
            else if (value.type === 'default') {
              title = 'Default';
            }
            else if (value.type === 'treemap') {
              title = 'Treemap';
            }

            const { colId, rowId, type } = value;
            const newItem = {
              id,
              sid,
              title,
              type: 'component',
              componentName: 'commonComponent',
              componentState: {
                id,
                sid,
                type,
                ...colId && {colId},
                ...rowId && {assetId: rowId}
              }
            }
            stack[0].addChild(newItem);
          }
        }
      }
    }
  }

  register(gadget) {
    debugger;
    this.clean();
    this.gadgets.push(gadget);
  }

}
