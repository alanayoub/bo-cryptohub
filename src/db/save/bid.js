import { BidModel } from '../schema';
import { getBidMatch } from '../query';

/**
 *
 * NORMALIZE
 *
 */
const normalize = val => {
  return String(val).replace(/-/g, '').replace(/\s/g, '').toLowerCase();
}

/**
 *
 * Generate a unique Id 9 characters long
 * NOTE: Move to bo-utils
 *
 */
function generateId() {
  return Math.random().toString(36).substr(2, 9).padStart(9, '0');
}

/**
 *
 * CREATE NEW ID MAPPING
 * Either add a new source id to an existing mapping or create a new record
 *
 * @param {String} source
 * @param {Array} data
 * @returns {String} bid
 *
 */
export default async function createNewIdMapping(source, data) {

  let id;
  let name;
  let symbol;
  let document;

  // Get data and return false if bad data
  switch(source) {
    case 'cmc':
      if (!data.id || !data.name || !data.symbol) {
        return false;
      }
      id = data.id;
      name = normalize(data.name);
      symbol = normalize(data.symbol);
      break;
    case 'cc':
      if (!data.Id || !data.Name || !data.Symbol) {
        return false;
      }
      id = data.Id;
      name = normalize(data.Name);
      symbol = normalize(data.Symbol);
      break;
    case 'm':
      if (!data.id || !data.name || !data.symbol) {
        return false;
      }
      id = data.id;
      name = normalize(data.name);
      symbol = normalize(data.symbol);
      break;
  }

  document = await getBidMatch({source, name, symbol, findOne: true});

  if (!document) {
    const newId = generateId();
    document = {
      bid: newId,
      [`${source}id`]: id,
      [`${source}name`]: name,
      [`${source}symbol`]: symbol
    }
    BidModel.create(document);
  }
  else {
    document[`${source}id`] = id;
    document[`${source}name`] = name;
    document[`${source}symbol`] = symbol;
    document.save();
  }

  // Return documents Binary Overdose id
  return document.bid;

}
