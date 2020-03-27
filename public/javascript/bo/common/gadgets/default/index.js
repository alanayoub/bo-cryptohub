'use strict';

import Gadget from '../gadget';
import SearchDropdown from '../../components/search-dropdown';
import { getRandomInt } from '../../../../libs/bo-utils-client';

import initPug from '../../../../generated/init-pug.generated.js';

import style from './index.scss';

export default class Default extends Gadget {

  constructor({componentState}) {

    super({componentState});

    const containerId = this.containerId = `ch-gadget-${getRandomInt(100000, 999999)}`;
    const html = initPug['common.gadgets.default']({containerId});
    this.container = document.querySelector(this.selector);
    this.container.innerHTML = html;
    this.buildModel();
    this.addListeners();

    // this.wallets = bo.inst.data.last.wallets;
    // bo.inst.data.on('wallets', data => {
    //   this.wallets = data;
    // });

    new SearchDropdown({
      name: 'exchanges',
      options: this.model.names,
      selector: `#${this.containerId} .js-exchanges`,
      placeholder: 'All',
    });

    new SearchDropdown({
      name: 'wallets',
      options: this.model.names,
      selector: `#${this.containerId} .js-wallets`,
      placeholder: 'All',
    });

  }

  buildModel() {
    const names = bo.inst.data.last.main.map(x => {
      const name = x['cryptohub-name'].value;
      const id = x['id'];
      return {
        id, name
      }
    });
    names.unshift({name: 'All', id: 'All'});
    this.model = {
      names
    }
  }

  addListeners() {
    const containerListener = event => {
      const target = event.target;
      const node = target.nodeName;
      if (node === 'BUTTON') {
        const row = target.closest('.bo-row');
        const input = row.querySelector('input');
        const dataset = input.dataset;
        console.log(dataset);
      }
    }
    this.container.removeEventListener('click', containerListener);
    this.container.addEventListener('click', containerListener);
  }

  resize() {}

}
