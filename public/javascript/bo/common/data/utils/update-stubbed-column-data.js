'use strict';

// Stub columns with no direct field data (only dependencies)
// We need to do this or ag-grid wont call the renderer in some instances
export default function updateCustomColumnData({columns, colLib, data}) {

  const stubs = [];
  for (const column of columns) {
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

  for (const item of data) {
    for (const stub of stubs) {
      item[stub] = tmpValue;
    }
  }

  return data;

}
