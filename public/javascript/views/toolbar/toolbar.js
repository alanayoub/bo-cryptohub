'use strict';

import { objectIsObject as isObject } from '../../libs/bo-utils-client';
import EditDialogueView               from '../edit-dialogue.js';
import initPug                        from '../../generated/init-pug.generated.js';

import style                          from './toolbar.css';

export default class Toolbar {

  constructor(selector) {

    this.gui = document.querySelector(selector)
    this.gui.innerHTML = initPug['toolbar']({
      upPer: '  ',
      dnPer: '  ',
      ncPer: '  ',
      total: '   '
    });

    window.bo.inst.editDialogue = new EditDialogueView(selector, '.ch-edit');

  }

  /**
   *
   * @param {Object} data
   * @return {Object}
   *
   */
  update(data) {

    if (!isObject(data)) return false;

    const model = {}

    let key;
    let val;
    let up = 0;
    let dn = 0;
    let nc = 0;
    for (key of Object.keys(data)) {
      if (!data[key]) continue;
      val = data[key]['cc-total-vol-full-CHANGEPCTDAY'];
      if (val > 0) up++;
      else if (val < 0) dn++;
      else nc++;
    }

    const total = up + dn + nc;
    const placeholder = '-';
    let upPer = Math.floor(up / (total / 100));
    let dnPer = Math.floor(dn / (total / 100));
    let ncPer = Math.floor(nc / (total / 100));
    upPer = isNaN(upPer) ? placeholder : upPer;
    dnPer = isNaN(upPer) ? placeholder : dnPer;
    ncPer = isNaN(upPer) ? placeholder : ncPer;
    model.upPer = `${upPer}%`;
    model.dnPer = `${dnPer}%`;
    model.ncPer = `${ncPer}%`;
    model.total = `${total}`;

    this.gui.innerHTML = initPug['toolbar'](model);

  }

}
