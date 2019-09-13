// Libs
import '@babel/polyfill';

import globals                     from './globals.js';
import defaultConfig               from './default-config.js';

// Binary Overdose Projects
import { DataTable }               from './libs/bo-datatable-client';
import { objectFlattenObject as flatten } from './libs/bo-utils-client';
import { objectIsEmptyObject as isEmptyObject } from './libs/bo-utils-client';

// Binary Overdose classes
import CellInteractions            from './classes/class-cell-interactions.js';
import State                       from './classes/class-state.js';

// Binary Overdose views
import ToolbarView                 from './views/toolbar/toolbar.js';

// Binary Overdose util functions
import convertWorkingDataToRowData from './utils/convert-working-data-to-row-data.js';

// ag-grid config
import generateAgOptions           from './ag-grid-options-generate.js';
import generateColumnDefs          from './ag-grid-column-defs-generate.js';

import columnLibrary               from './columns';

// CSS
import style                       from '../stylesheet/index.css';

const colLib = flatten(columnLibrary);

/**
 *
 * Handle data events
 *
 * @param {Object} data * @return void
 *
 */
function dataEmitHandler(data) {

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
          const type = val === 's' || !isNaN(val)
            ? 'source'
            : 'operator'
          if (lastType !== type) {
            idx = calcArr.length;
            lastType = type;
          }
          calcArr[idx] = calcArr[idx] ? calcArr[idx] + val : val;
        });
        // ['s0', '/', 's1']

        const fields = [];
        calcArr.forEach(val => {
          const isSource = /s\d{1,2}/.test(val);
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
              if (/s\d{1,2}/.test(c)) {
                const field = fields[c.substr(1)];
                //
                // Sort out isNaN bit for other types
                //
                if (item[field] && !isNaN(item[field][f]) && item[field][f] !== null) {
                  arr[i] = item[field][f];
                }
                else {
                  skip = true;
                }
              }
            }
            if (!skip) {
              calcResults[f] = evil(arr.join(''));
            }
          }

          if (!isEmptyObject(calcResults)) {
            calcResults.timestamp = calcResults.lastChecked = +new Date();
            item[column.id] = calcResults;
          }
        }

        // for (const [idx, source] of Object.entries(sources)) {

        //   const field = colLib[source].field;
        //   const sourceCode = `s${+idx}`;

        //   // Before looping over this calculate as much of the data
        //   for (const item of Object.values(newSocketData)) {
        //     const calcResults = {};
        //     if (!item[field]) continue;

        //     for (const f of ['value', 'lastValue']) {
        //       const value = item[field][f];
        //       calcResults[f] = evil(calc.replace(sourceCode, value));
        //     }
        //     calcResults.timestamp = calcResults.lastChecked = +new Date();

        //     item[column.id] = calcResults;
        //   }

        // }

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

function flipMap(map) {
  const out = {};
  for(const key in map) {
    out[map[key]] = key;
  }
  return out;
}

/**
 *
 * Handle store events
 *
 * @param {Object} data
 * @return void
 *
 */
function storeEmitHandler(data) {

  window.bo.func.updated('now');

  let newSocketData = JSON.parse(data);
  const type = newSocketData.type;
  newSocketData = newSocketData.data;

  if (type === 'maps') {
    for (const item of newSocketData) {
      window.ch[item._id] = item.map;
      if (item._id === 'exchangeMapIdName') {
        window.ch['exchangeMapNameId'] = flipMap(item.map);
      }
      if (item._id === 'projectMapIdName') {
        window.ch['projectMapNameId'] = flipMap(item.map);
      }
    }
  }
  else if (type === 'exchanges') {
    window.ch.exchanges = newSocketData;
  }
  if (!window.initStore) window.initStore = window.ch;

}

window.bo.inst.cellInteractions = new CellInteractions();
window.bo.inst.state = new State(defaultConfig);
window.bo.inst.state.init().then(state => {

  const columns = state.columns.filter(v => !/^c-\d{1,4}$/.test(v.id)).map(v => v.id);
  const sort = state.sort;
  const emitData = JSON.stringify({columns, sort});
  window.bo.inst.socket = io({query: {cols: emitData} });

  generateAgOptions().then(agOptions => {

    const gridElement = document.querySelector('#ch-grid');
    const grid = new agGrid.Grid(gridElement, agOptions);

    if (!grid) throw new Error('Cant find grid');

    bo.inst.socket.on('data', dataEmitHandler);
    bo.inst.socket.on('store', storeEmitHandler);

    window.bo.func.updated('now');
    window.bo.inst.toolbarView = new ToolbarView('.CH-hook-toolbar');

    setInterval(window.bo.func.updated, 1000 * 1);

    window.onpopstate = event => {
      if (event.state) {
        bo.inst.state.update(event.state);
      }
    }

  });

});
