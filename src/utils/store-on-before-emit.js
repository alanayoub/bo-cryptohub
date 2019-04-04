'use strict';

// Binary Overdose Projects
import DataTable from 'bo-datatable';

export default function storeOnBeforeEmit(options, newData, oldData) {

  let emitData;
  emitData = DataTable.diff(oldData, newData);
  emitData = JSON.stringify(emitData);
  return emitData;

}
