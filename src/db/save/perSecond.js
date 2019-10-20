import { bulkUpdatePerDay } from '../save';
import { tsDaysDbQueue } from '../connect.js';
import logger from '../../logger';

function splitIntoGroups(data, maxFields = 5000) {

  const firstKey = Object.keys(data)[0];
  const numFields = Object.keys(data[firstKey]).length;
  const numItems = Math.floor((maxFields / numFields));

  let idx = 0;
  let count = 0;
  const arr = [{}];
  for (const [id, item] of Object.entries(data)) {
    if (count < numItems) {
      arr[idx][id] = item;
      count++;
    }
    else {
      idx++;
      arr[idx] = {};
      count = 0;
      arr[idx][id] = item;
    }
  }

  return arr;

}

/**
 *
 * data:
 * ```
 * {
 *   1182: {
 *     'cc-coinlist-Algorithm': "SHA-256"
 *     'cc-coinlist-BlockNumber': 585945
 *     'cc-coinlist-BlockNumber:last': 585945
 *   },
 *   ...
 * }
 *
 * ```
 *
 */
export default async function perSecond(data, timestamp = +new Date()) {

  const dataGroups = splitIntoGroups(data, 5000);
  tsDaysDbQueue.push(dataGroups);

}
