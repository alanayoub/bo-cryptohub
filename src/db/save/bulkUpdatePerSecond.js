import { PerSecondModel } from '../schema';
import { fieldTypeMap } from '../../settings'

const idsList = Object.keys(fieldTypeMap);

/**
 *
 *
 *
 */
export default async function bulkUpdatePerSecond(scrapeResults, timestamp) {

  const updateOperations = [];

  for (const [id, projectData] of Object.entries(scrapeResults)) {
    for (const [field, value] of Object.entries(projectData)) {

      if (id === undefined || id === 'undefined' || !idsList.includes(field)) continue;

      const unixTime = +new Date(timestamp);
      const newData = scrapeResults[id] && scrapeResults[id][field];

      updateOperations.push({
        updateOne: {
          filter: {id, field},
          update: {
            $set: {
              id,
              field,
              lastChecked: unixTime
            },
            $push: {'samples': {$each: [[unixTime, newData]], $slice: -2}}
          },
          upsert: true
        }
      });

    }
  }

  let output = 'No Updates';
  if (updateOperations.length) {
    output = await PerSecondModel.bulkWrite(updateOperations, {
      ordered: false
    });
  }

  return output;

}
