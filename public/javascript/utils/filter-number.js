'use strict';

import Filter from '../classes/class-filter.js';

export default class NumberFilter extends Filter {

  constructor(params) {
    super(params);
  }

  //
  // TODO: =0 doesnt work
  // TODO: decimals dont work
  //
  doesFilterPass(params) {

    // Remove spaces
    const input = this.filterText.replace(/\s/g,'');

    // Split on numbers or valid symbols
    const split = input.match(/[0-9]+|>=|<=|[<>&|()]/gi);

    if (!split) return 1;

    // Check all signs against whitelist
    const signs = split.filter(isNaN);
    const whitelist = ['<', '>', '<=', '>=', '&', '|', '(', ')'];
    const areAllValid = signs.some(sign => {
      return whitelist.includes(sign);
    });

    const numBeforeSigns = ['<', '>', '<=', '>='];
    const generateExpression = num => {
      return split.reduce((acc, val, idx) => {
        if (numBeforeSigns.includes(val)) acc.push(num);
        acc.push(isNaN(val) ? val : Number(val))
        return acc;
      }, []).join('');
    }

    const value = this.valueGetter(params).value;
    const expressionStr = generateExpression(value);

    let passed;
    try {
      passed = (new Function(`return ${expressionStr}`))();
    }
    catch (error) {
      passed = 1;
    }

    return passed;

  };

}

