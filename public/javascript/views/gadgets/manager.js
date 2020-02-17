import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

import html from '../popdiv-html';
import wallets from '../popdiv-wallets';
import exchanges from '../popdiv-exchanges';
import tradingview from '../popdiv-tradingview';

const gadgets = {
  html,
  wallets,
  exchanges,
  tradingview
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
    return this.gadgets;
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
      tradingview: 'Chart',
      exchanges: 'Exchanges',
      wallets: 'Wallets',
      html: 'Data',
    }
    for (const [sid, value] of Object.entries(state.window)) {
      sid = +sid;
      if (sid !== 0) { // Don't do the main window
        let alive;
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
          const name = data['cc-total-vol-full-FullName'].value;
          const type = typeMap[value.type];
          const newItem = {
            id,
            sid,
            title: `${name} ${type}`,
            type: 'component',
            componentName: 'commonComponent',
            componentState: {
              id,
              sid,
              label: 'Z',
              componentName: value.componentName,
              colId: value.colId,
              assetId: value.rowId,
              type: value.type
            }
          }
          stack[0].addChild(newItem);
        }
      }
    }
  }

  register(gadget) {
    this.clean().push(gadget);
  }

}
