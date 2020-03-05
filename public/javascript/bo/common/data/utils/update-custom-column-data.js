import { objectIsEmptyObject as isEmptyObject } from '../../../../libs/bo-utils-client';
import { objectFlattenObject as flatten } from '../../../../libs/bo-utils-client';
import columnLibrary from '../../../../columns';

function evil(fn) {
  return new Function('return ' + fn)();
}

const colLib = flatten(columnLibrary);

export default function updateCustomColumnData({columns, data}) {

  for (const column of columns) {

    const id = column.id;
    const custom = /^c-\d{1,4}$/.test(id);

    if (custom) {

      const calc = column.calc;
      const sources = column.sources;

      let idx;
      let lastType = null;
      const calcArr = [];
      calc.replace(/\s|\n/g,'').split('').forEach(val => {
        const type = val === 'c' || !isNaN(val)
          ? 'column'
          : 'operator'
        if (lastType !== type) {
          idx = calcArr.length;
          lastType = type;
        }
        calcArr[idx] = calcArr[idx] ? calcArr[idx] + val : val;
      });
      // ['c0', '/', 'c1']

      const fields = [];
      calcArr.forEach(val => {
        const isSource = /c\d{1,2}/.test(val);
        if (isSource) {
          const idx = +val.substr(1);
          const field = colLib[sources[idx]].field;
          fields[idx] = field;
        }
      });
      // ["cmc-listings-quote_USD_market_cap", "cc-social-CodeRepository_Points"]

      for (const item of data) {

        const calcResults = {};
        const arr = calcArr.slice();
        for (const f of ['value', 'lastValue']) {
          const skip = false;
          for (const [i, c] of Object.entries(arr)) {
            if (/c\d{1,2}/.test(c)) {
              const field = fields[c.substr(1)];
              //
              // Sort out isNaN bit for other types
              //
              if (item[field] && item[field].hasOwnProperty(f)) {
                arr[i] = item[field][f];
              }
              else {
                skip = true;
              }
            }
          }
          if (!skip) {
            arr = arr.map(v => {
              if (v === undefined || v === null || v === '-') return 'undefined';
              else return v;
            });
            calcResults[f] = evil(arr.join(''));
          }
        }

        if (!isEmptyObject(calcResults)) {
          calcResults.timestamp = calcResults.lastChecked = +new Date();
          item[column.id] = calcResults;
        }
      }

    }

  }

  return data;

}
