import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

import def from '../../bo/common/gadgets/default';
import main from '../../bo/common/gadgets/main';
import html from '../popdiv-html';
import wallets from '../popdiv-wallets';
import treemap from '../../bo/common/gadgets/treemap';
import exchanges from '../popdiv-exchanges';
import tradingview from '../popdiv-tradingview';

const gadgets = {
  main,
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
    this.data = bo.inst.data.last.main;
    bo.inst.data.on('main', data => {
      this.data = data.data;
    });
  }

  loadTabGadget(config) {
    const gadgetMan = this;
    const componentState = config.componentState;
    if (componentState.type) {
      const gadget = new (gadgets[componentState.type])({componentState});
      gadgetMan.gadgets[componentState.id] = gadget;
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
    for (const {ref, type} of bo.clas.Layout.iterateStacks(state.layout)) {
      if (type === 'stack') {
        const stack = ref;
        const sid = +stack.sid;
        const arr = stack.content;

        for (const value of arr) {
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

            const data = this.data.find(v => v.id === value.rowId);
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
                ...rowId && {rowId}
              }
            }
            stack[0].addChild(newItem);
          }
        }

      }
    }
  }

  register(gadget) {
    this.gadgets[gadget.id] = gadget;
  }

}
