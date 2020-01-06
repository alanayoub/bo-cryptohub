'use strict';

import { objectIsObject as isObject } from '../../libs/bo-utils-client';
import EditDialogueView               from '../edit-dialogue.js';
import initPug                        from '../../generated/init-pug.generated.js';

import style                          from './toolbar.scss';

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

    if (!Array.isArray(data)) return false;

    const model = {}

    let item;
    let key;
    let val;
    let up = 0;
    let dn = 0;
    let nc = 0;
    let count = 0;
    const max = 1000;
    for (item of data) {
      if (!item['cc-total-vol-full-CHANGEPCTDAY']) continue;
      if (++count === max) break;
      val = item['cc-total-vol-full-CHANGEPCTDAY'];
      if (val.value) val = val.value;
      if (val > 0) up++;
      else if (val < 0) dn++;
      else nc++;
    }

    // Not including items with no change as that would include items with very sparse datasets that update very irregularly
    const total = up + dn;
    const placeholder = '--';
    let upPer = Math.floor(up / (total / 100));
    let dnPer = Math.floor(dn / (total / 100));
    upPer = isNaN(upPer) ? placeholder : upPer;
    dnPer = isNaN(upPer) ? placeholder : dnPer;
    model.upPer = `${upPer}%`;
    model.dnPer = `${dnPer}%`;
    model.total = `${data.length}`;

    this.gui.innerHTML = initPug['toolbar'](model);

  }

}
