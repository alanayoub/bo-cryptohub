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

    this.model = this.buildModel();
    this.render();
    return this;

  }

  buildModel() {
    const children = refs.rowData.concat()
      .sort((a, b) => {
        const field = 'cc-total-vol-full-MKTCAP';
        return a[field] && b[field] ? b[field].value - a[field].value : false;
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
    // NOTE: we are using a really shit treemap library
    // that required data in a dumb way amongst other things
    // TODO: write our own
    new TMap(this.containerId, this.model, {});
  }

  resize() {
    this.render();
  }

}
