'use strict';

import Gadget from '../gadget';
import TMap from '../../libs/treemap';
import { getRandomInt } from '../../../../libs/bo-utils-client';
import initPug from '../../../../generated/init-pug.generated.js';

import style from './index.scss';

export default class TreeMap extends Gadget {

  constructor({componentState}) {

    super({componentState})

    const containerId = this.containerId = `ch-gadget-${getRandomInt(100000, 999999)}`;
    const contentHtml = initPug['common.gadgets.treemap']({containerId});
    document.querySelector(this.selector).innerHTML = contentHtml;

    this.model = this.buildModel(bo.inst.data.last.main);
    bo.inst.data.on('main', data => {
      this.model = this.buildModel(data.data);
    });
    this.render();
    return this;

  }

  buildModel(data) {
    if (!data) return;
    const f = 'cc-total-vol-full-MKTCAP';
    const children = data
      .concat()
      .filter(x => {
        return x[f] && x[f].value;
      })
      .sort((a, b) => {
        return b[f].value - a[f].value;
      })
      .slice(0, 100) // make copy
      .reduce((acc, val, idx) => {
        acc.push({
          name: val['cryptohub-symbol'].value,
          volume: Number(val['cc-total-vol-full-TOTALVOLUME24HTO'].value).toFixed(),
          value: Number(val['cc-total-vol-full-MKTCAP'].value).toFixed(),
          price: Number(val['cc-total-vol-full-PRICE'].value).toFixed(2),
          pc: Number(val['cc-total-vol-full-CHANGEPCTDAY'].value).toFixed(2)
        });
        return acc;
      }, []);
    return {name: 'test', children: [{children}]};
  }

  render() {
    const check = () => {
      const container = document.querySelector(`#${this.containerId}`);
      return container.offsetWidth && container.offsetHeight;
    }
    const callback = () => {
      // NOTE: we are using a really shit treemap library
      // that required data in a dumb way amongst other things
      // TODO: write our own
      new TMap(this.containerId, this.model, {});
    }
    const interval = 25;
    // The tab created event is called but the container doesnt have and dimentions yet!
    this.waitUntil(check, callback, interval);
  }

  resize() {
    this.render();
  }

}
