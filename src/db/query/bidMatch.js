import { BidModel } from '../schema';

/**
 *
 * BID MATCH
 * Get a document or documents by matching a name and or symbol
 *
 * @param {Object} - object as described below. All properties are optional but at least one must be provided
 * @param {String} [source]
 * @param {String} [name]
 * @param {String} [symbol]
 * @param {Boolean} [findOne]
 * @return {Object|Array} one or many mongodb documents
 *
 */
export default async function bidMatch({source, name, symbol, findOne = false}) {

  // Create query
  const query = {
    $or: []
  };
  if (source !== 'cc') {
    if (name) query.$or.push({ccname: name});
    if (symbol) query.$or.push({ccsymbol: symbol});
  }
  if (source !== 'cmc') {
    if (name) query.$or.push({cmcname: name});
    if (symbol) query.$or.push({cmcsymbol: symbol});
  }
  if (source !== 'm') {
    if (name) query.$or.push({mname: name});
    if (symbol) query.$or.push({msymbol: symbol});
  }

  // Find matching document(s)
  let result;
  const results = await BidModel.find(query);

  if (!findOne || results.length < 2) {
    if (findOne) {
      return results[0];
    }
    else {
      return results;
    }
  }
  else {
    // If there is more than 1 match
    // Find the document with the most matches and add to that one
    let currentMaxPoints = 0;
    results.map(val =>  {
      let points = 0;
      if (source !== 'cc') {
        if (val.ccname === name) ++points;
        if (val.ccsymbol === symbol) ++points;
      }
      if (source !== 'cmc') {
        if (val.cmcname === name) ++points;
        if (val.cmcsymbol === symbol) ++points;
      }
      if (source !== 'm') {
        if (val.mname === name) ++points;
        if (val.msymbol === symbol) ++points;
      }
      if (points > currentMaxPoints) {
        currentMaxPoints = points;
        result = val;
      }
    });
    return result;
  }

}
