import { objectFlattenObject as flatten } from '../../libs/bo-utils-client';
import updateCustomColumnData from '../../utils/update-custom-column-data.js';
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

    // Updates newSocketData with custom changes
    newSocketData = updateCustomColumnData({state: v, colLib, data: newSocketData});

    // Stub columns with no direct field data (only dependencies)
    // We need to do this or ag-grid wont call the renderer in some insstances
    {
      const stubs = [];
      for (const column of v.columns) {
        const colData = colLib[column.id];
        if (!colData) {
          // Custom columns wont show up in colLib data
          continue;
        }
        const isStub = /^stub-/.test(colData.field);
        if (isStub) {
          stubs.push(colLib[column.id].field);
        }
      }
      const timestamp = +new Date();
      const tmpValue = {
        value: null,
        lastValue: null,
        timestamp,
        lastChecked: timestamp
      };
      for (const item of newSocketData) {
        for (const stub of stubs) {
          item[stub] = tmpValue;
        }
      }
    }

    if (event === 'rows-full') {
      window.refs.rowData = newSocketData;
    }
    else if (event === 'rows-update') {
      if (!window.refs.rowData) {
        window.refs.rowData = newSocketData;
      }
      else {
        for (const item of newSocketData) {
          const idx = window.refs.rowData.findIndex(x => x.id === item.id);
          if (idx > -1) {
            window.refs.rowData[idx] = item;
          }
          else {
            window.refs.rowData.push(item);
          }
        }
      }
    }

    if (window.bo.agOptions.api) {
      window.bo.agOptions.api.setRowData(window.refs.rowData);
    }
    window.bo.inst.toolbarView.update(window.refs.rowData);

  });

}
