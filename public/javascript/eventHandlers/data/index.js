import { objectFlattenObject as flatten } from '../../libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from '../../libs/bo-utils-client';
import convertWorkingDataToRowData from '../../utils/convert-working-data-to-row-data.js';
import columnLibrary from '../../columns';

const colLib = flatten(columnLibrary);

/**
 *
 * Handle data events
 *
 * @param {Object} data * @return void
 *
 */
export default function dataEmitHandler(event, data) {

  window.bo.func.updated('now');

  let newSocketData = JSON.parse(data).data;
  const arrayData = [];
  for (let [id, obj] of Object.entries(newSocketData)) {
    obj.id = id;
    arrayData.push(obj);
  }

  newSocketData = arrayData;
  // data = arrayData;

  bo.inst.state.get().then(v => {

    function evil(fn) {
      return new Function('return ' + fn)();
    }

    // Updates new socket data with custom changes
    for (const column of v.columns) {

      const id = column.id;
      const custom = /^c-\d{1,4}$/.test(id);

      if (custom) {

        const calc = column.calc;
        const sources = column.sources;

        let idx;
        let lastType = null;
        const calcArr = [];
        calc.split('').forEach(val => {
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

        for (const item of newSocketData) {

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
                if (v === null) return 'null';
                else if (v === undefined) return 'undefined';
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

    if (event === 'rows-full') {
      window.refs.rowData = newSocketData;
      window.bo.agOptions.api.setRowData(window.refs.rowData);
    }
    else if (event === 'rows-update') {
      window.bo.agOptions.api.batchUpdateRowData({update: newSocketData}, () => {
        // console.log('updates happened');
      });
    }

    window.bo.inst.toolbarView.update(window.refs.rowData);

  });

}
