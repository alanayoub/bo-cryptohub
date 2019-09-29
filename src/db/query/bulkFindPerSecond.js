import { PerDayModel } from '../schema';
import { fieldTypeMap } from '../../settings'

const idsList = Object.keys(fieldTypeMap);

/**
 *
 * Find many document
 * @param {Object} data - an {id: data] map
 * @return {Array} - results in the same format
 *
 */
export default async function bulkFindPerSecond(data) {

  const $or = [];

  for (const [id, projectData] of Object.entries(data)) {
    for (const [field, value] of Object.entries(projectData)) {

      if (id === undefined || id === 'undefined' || !idsList.includes(field)) {
        continue;
      }

      $or.push({id, field});

    }
  }

  const results = await PerDayModel.find({$or});

  // Merge fields by id
  const output = {};
  for (const r of results) {
    if (!output[r.id]) output[r.id] = {};
    if (!output[r.id][r.field]) output[r.id][r.field] = {};
    output[r.id][r.field] = r;
  }

  return output;

}
