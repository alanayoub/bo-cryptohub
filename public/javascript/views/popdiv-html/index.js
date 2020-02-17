'use strict';

import Gadget from '../../bo/common/gadgets/gadget';

import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import initPug from '../../generated/init-pug.generated.js';

import style from './index.scss';

export default class Html extends Gadget {

  constructor({componentState}) {

    super({componentState})

    const projectName = gnp(this.data, 'cc-total-vol-full-FullName.value');
    const name = `${projectName} ${this.column.headerName}`;
    const description = this.data[this.column.field].value
    const context = {name, description};
    const contentHtml = initPug['popdiv-html'](context);

    document.querySelector(this.selector).innerHTML = contentHtml;

  }

}
