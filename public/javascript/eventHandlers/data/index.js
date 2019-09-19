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
export default function dataEmitHandler(data) {

  window.bo.func.updated('now');

  const newSocketData = JSON.parse(data).data;

  bo.inst.state.get().then(v => {

    function evil(fn) {
      return new Function('return ' + fn)();
    }

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

        for (const item of Object.values(newSocketData)) {

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

    if (!window.refs.workingData) {
      // init workingData
      window.refs.workingData = newSocketData;
    }
    else {
      // merge new data with workingData
      for (const [id, val] of Object.entries(newSocketData)) {
        if (!window.refs.workingData[id]) {
          window.refs.workingData[id] = val;
        }
        else {
          Object.assign(window.refs.workingData[id], val);
        }
      }
    }

    window.refs.rowData = convertWorkingDataToRowData(window.refs.workingData);
    window.bo.agOptions.api.setRowData(window.refs.rowData);
    window.bo.inst.toolbarView.update(window.refs.rowData);

  });

}
