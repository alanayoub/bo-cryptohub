'use strict';

// Binary Overdose Projects
import DataTable from 'bo-datatable';
import { objectIsEmptyObject } from 'bo-utils';

export default function storeOnBeforeEmit(options, socket, newData, oldData) {

  const type = options.diff !== false ? 'changeset' : 'full';
  let data = newData;

  if ((Array.isArray(data) && !data.length) || objectIsEmptyObject(data)) {
    data = false;
  }
  else {
    if (type === 'changeset') {
      data = DataTable.diff(oldData, data);
    }
    data = JSON.stringify({data, type});
  }

  return data;

}
