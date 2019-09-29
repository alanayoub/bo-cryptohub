import { PerDayModel } from '../schema';
import { fieldTypeMap } from '../../settings'
import logger from '../../logger';

const idsList = Object.keys(fieldTypeMap);

/**
 *
 * Per Day Save
 *
 */
export default async function perDay(data, timestamp = +new Date()) {

  const startTime = +new Date();

  const updateOperations = [];
  for (const [id, projectData] of Object.entries(data)) {
    for (const [field, value] of Object.entries(projectData)) {

      if (id === undefined || id === 'undefined' || !idsList.includes(field)) continue;

      const t = new Date(timestamp);
      const dd = t.getDate() - 1; // First day is 1
      const mm = t.getMonth();    // First month is 0
      const year = ''+t.getFullYear();
      const unixTime = +t;
      const newData = data[id] && data[id][field];

      updateOperations.push({
        updateOne: {
          filter: {id, field, year},
          update: {
            $set: {
              id,
              field,
              year,
              lastChecked: unixTime,
              [`samples.${mm}.${dd}`]: value
            },
            $push: {'realtime': {$each: [[unixTime, newData]], $slice: -2}}
          },
          upsert: true
        }
      });
    }
  }

  let output = 'No Updates';
  if (updateOperations.length) {
    output = await PerDayModel.bulkWrite(updateOperations, {
      ordered: false
    });
  }

  logger.info('db save-perDay', +new Date() - startTime);

  return output;

}
