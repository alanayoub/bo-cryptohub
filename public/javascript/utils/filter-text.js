'use strict';

import Filter from '../classes/class-filter.js';

export default class TextFilter extends Filter {

  constructor(params) {
    super(params);
  }

  doesFilterPass(params) {

    const value = this.valueGetter(params);
    if (!value || !value.value) return 0;
    const input = this.filterText.trim().replace(/\s/g,'|');
    const regex = new RegExp(input, 'g');
    const found = value.value.join(' ').toLowerCase().match(regex);

    let passed;
    if (found && found.length) return passed = 1;
    else return passed = 0;

    return passed;

  };

}

