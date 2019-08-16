'use strict';

import Filter                         from '../classes/class-filter.js';
import { objectIsObject as isObject } from '../libs/bo-utils-client';

export default class TextFilter extends Filter {

  constructor(params) {
    super(params);
  }

  doesFilterPass(params) {

    let value = this.valueGetter(params);
    if (isObject(value)) {
      value = value.value;
    }
    if (value === void 0 || value === null) {
      return 0;
    }
    if (Array.isArray(value)) {
      value = value.join(' ');
    }

    const input = this.filterText.trim().replace(/\s/g,'|');
    const regex = new RegExp(input, 'g');
    const found = value.toLowerCase().match(regex);

    let passed;
    if (found && found.length) return passed = 1;
    else return passed = 0;

    return passed;

  };

}

