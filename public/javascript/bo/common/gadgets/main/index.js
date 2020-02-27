'use strict';

import { Grid } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import Gadget from '../gadget';
import initPug from '../../../../generated/init-pug.generated.js';
import { getRandomInt } from '../../../../libs/bo-utils-client';

import style from './index.scss';

export default class Main extends Gadget {

  constructor({componentState}) {

    super({componentState})

    const containerId = this.containerId = `ch-gadget-${getRandomInt(100000, 999999)}`;
    const content = initPug['common-gadget-main']({containerId});
    this.selector = `#gadget-container-${this.id}`;
    document.querySelector(this.selector).innerHTML = content;
    this.render();

  }

  render() {
    bo.agOptions.rowData = refs.rowData;
    const container = document.querySelector(`#${this.containerId}`);
    const grid = new Grid(container, bo.agOptions, {modules: AllCommunityModules});
    if (!grid) throw new Error('Cant find grid');
  }

  update() {
  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
