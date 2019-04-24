'use strict';

// Binary Overdose Projects
import DataTable from 'bo-datatable';

export default function storeOnBeforeEmit(options, newData, oldData) {

  const type = options.diff !== false ? 'changeset' : 'full';
  let data = newData;

  if (type === 'changeset') {
    data = DataTable.diff(oldData, data);
  }

  data = JSON.stringify({data, type});

  return data;

}
