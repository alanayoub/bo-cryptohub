'use strict';

import { isNumber } from '../libs/bo-utils-client';
import Filter from '../classes/class-filter.js';

export default class NumberFilter extends Filter {

  constructor(params) {
    super(params);
  }

  //
  // TODO: decimals dont work
  //
  doesFilterPass(params) {

    // Remove spaces
    const input = this.filterText.replace(/\s/g,'');

    // Split on numbers or valid symbols
    const split = input.match(/[0-9\-]+|>=|<=|[<>&|()]/gi);

    const value = this.valueGetter(params);

    if (!isNumber(value && value.value)) return 0;
    if (!split) return 1;
    if (split.length < 1) return 1;

    // Check all signs against whitelist
    const signs = split.filter(isNaN);
    const whitelist = ['<', '>', '<=', '>=', '&', '|', '(', ')'];
    const areAllValid = signs.some(sign => {
      return whitelist.includes(sign);
    });

    const numBeforeSigns = ['<', '>', '<=', '>='];
    const generateExpression = num => {
      return split.reduce((acc, val, idx) => {
        if (idx === 0) {
          acc.push(num);
          acc.push(numBeforeSigns.includes(val) ? val : '===');
        }
        if (split.length === 1 || idx !== 0) {
         acc.push(isNaN(val) ? val : Math.round(Number(val)));
        }
        return acc;
      }, []).join('');
    }

    let passed;

    if (value) {
      const expressionStr = generateExpression(value.value);
      try {
        passed = (new Function(`return ${expressionStr}`))();
      }
      catch (error) {
        passed = 1;
      }
    }
    else {
      passed = 0;
    }

    return passed;

  };

}

