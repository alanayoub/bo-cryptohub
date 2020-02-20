'use strict';

import Gadget from '../gadget';

// import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import initPug from '../../../../generated/init-pug.generated.js';

// import style from './index.scss';

export default class Default extends Gadget {

  constructor({componentState}) {

    super({componentState})

    const context = {};
    const contentHtml = initPug['common.gadgets.default'](context);

    document.querySelector(this.selector).innerHTML = contentHtml;

  }

}
