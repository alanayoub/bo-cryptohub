'use strict';

import updateCustomColumnData from './utils/update-custom-column-data.js';
import updateStubbedColumnData from './utils/update-stubbed-column-data.js';
import { objectFlattenObject as flatten } from '../../../libs/bo-utils-client';
import columnLibrary from '../../../columns';

const colLib = flatten(columnLibrary);

export default function mainPartial({data, columns, lastData}) {

  let parsedData = JSON.parse(data).data;
  const arrayData = [];
  for (let [id, obj] of Object.entries(parsedData)) {
    obj.id = id;
    arrayData.push(obj);
  }

  parsedData = arrayData;
  parsedData = updateCustomColumnData({columns, colLib, data: parsedData});
  parsedData = updateStubbedColumnData({columns, colLib, data: parsedData});

  if (!lastData) {
    return parsedData;
  }
  else {
    for (const item of parsedData) {
      const idx = lastData.findIndex(x => x.id === item.id);
      if (idx > -1) {
        lastData[idx] = item;
      }
      else {
        lastData.push(item);
      }
    }
  }

  parsedData = lastData;

  return parsedData;

}
