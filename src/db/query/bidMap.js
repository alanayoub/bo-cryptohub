import { BidModel } from '../schema';

/**
 *
 * Generate a unique Id 9 characters long
 * NOTE: Move to bo-utils
 *
 */
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

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
 * CREATE NEW ID MAPPING
 * Either add a new source id to an existing mapping or create a new record
 *
 * @param {String} source
 * @param {Array} data
 * @returns {String} bid
 *
 */
async function createNewIdMapping(source, data) {

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
      id = normalize(data.id);
      name = normalize(data.name);
      symbol = normalize(data.symbol);
      break;
    case 'cc':
      if (!data.CoinInfo || !data.CoinInfo.Id || !data.CoinInfo.FullName || !data.CoinInfo.Name) {
        return false;
      }
      id = normalize(data.CoinInfo.Id);
      name = normalize(data.CoinInfo.FullName);
      symbol = normalize(data.CoinInfo.Name); // yea I know
      break;
    case 'm':
      if (!data.id || !data.name || !data.symbol) {
        return false;
      }
      id = normalize(data.id);
      name = normalize(data.name);
      symbol = normalize(data.symbol);
      break;
  }

  // Create query
  const query = {
    $or: []
  };
  if (source !== 'cc') {
    query.$or.push({ccname: name});
    query.$or.push({ccsymbol: symbol});
  }
  if (source !== 'cmc') {
    query.$or.push({cmcname: name});
    query.$or.push({cmcsymbol: symbol});
  }
  if (source !== 'm') {
    query.$or.push({mname: name});
    query.$or.push({msymbol: symbol});
  }

  // Find matching document(s)
  const existingData = await BidModel.find(query);

  // If no match create new document and insert into db
  if (!existingData.length) {
    const newId = generateId();
    document = {
      bid: newId,
      [`${source}id`]: id,
      [`${source}name`]: name,
      [`${source}symbol`]: symbol
    }
    BidModel.create(document);
  }
  // Else update existing document
  else {

    // If there is more than 1 match
    // Find the document with the most matches and add to that one
    if (existingData.length > 1) {
      let currentMaxPoints = 0;
      existingData.map(val =>  {
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
          document = val;
        }
      });
    }
    // Otherwise use the 1 found match
    else {
      document = existingData[0];
    }

    // now save changes
    document[`${source}id`] = id;
    document[`${source}name`] = name;
    document[`${source}symbol`] = symbol;
    document.save();

  }

  // Return documents Binary Overdose id
  return document.bid;

}

/**
 *
 * Get Bid
 *
 * @param {String} source
 * @param {String} id
 * @returns {String} returns an existing bid
 *
 */
async function getBid(source, id) {
  const query = {
    [`${source}id`]: String(id).toLowerCase()
  };
  const record = await BidModel.findOne(query).lean();
  if (record) {
    return record.bid;
  }
  else {
    return false;
  }
}

// getBidRecord(name, symbol); // returns data to enable creation of a bid
//   returns all items with either the same name or same symbol... needs to be normalized!
async function getBidRecord(name, symbol) {
  const bidData = {
    bid: '001',
    cmcid: '1182',
    cmcname: 'bitcoin',
    cmcsymbol: 'btc',
    ccid: '1182',
    ccname: 'bitcoin',
    ccsymbol: 'btc',
    mid: '1182',
    mname: 'bitcoin',
    msymbol: 'btc',
  };
  return false;
}

/**
 *
 * GET BID MAP
 * Get the persisted bid to source mappings
 *
 * @param {String} source
 * @param {Array} ids
 * @returns {Object} bid to source id map
 *
 */
async function getBidMap(source, ids) {
  const query = {
    [`${source}id`]: {
      $in: ids
    }
  };
  const arr = await BidModel.find(query).lean();
  const map = {};
  arr.forEach(v => {
    map[v[`${source}id`]] = v.bid;
  });
  return map;
}

//
// Bid collection schema
//
// {
//   bid: '001',
//   cmcid: '1182',
//   cmcname: 'bitcoin',
//   cmcsymbol: 'btc',
//   ccid: '1182',
//   ccname: 'bitcoin',
//   ccsymbol: 'btc',
//   mid: '1182',
//   mname: 'bitcoin',
//   msymbol: 'btc',
// }
//
// eg0. find bid where cmcid === '1182'
// eg1. for cmc name, symbol find matching ccname, ccsymbol, mname, msymbol
// eg2. for cc name, symbol find matching cmcname, cmcsymbol, mname, msymbol
//
// pseudo query:
//   db.bid.find({
//     $or: [
//       {ccname: 'bitcoin'},
//       {mname: 'bitcoin'},
//       {ccsymbol: 'btc'},
//       {msymbol: 'btc'},
//     ]
//   })
//

/**
 *
 * GET BID MAP
 * A Binary Overdose id mapping to another source
 * Gets the persisted mappings and generates new ones if required
 * Only returns the subset of ids requested via the data
 *
 * @param {String} source
 * @param {Array} data
 * @returns {Object} bid to source id map
 *
 */
export default async function bidMap(source, data) {

  let bidMap;

  switch(source) {

    case 'cmc':

      const cmcIds = data.map(v => String(v.id));
      bidMap = await getBidMap('cmc', cmcIds);

      for (const val of data) {
        let bid = bidMap[val.id];
        if (!bid) {
          bid = await createNewIdMapping('cmc', val);
          if (bid) {
            bidMap[val.id] = bid;
          }
          else {
            logger.info(`bidMap: Can't map ${name}: ${symbol} from ${source} data`);
          }
        }
      }

      return bidMap;
      break;

    case 'cc':

      const ccIds = data.Data.map(v => v.CoinInfo.Id);
      bidMap = await getBidMap('cc', ccIds);

      for (const val of data.Data) {
        let bid = bidMap[val.CoinInfo.Id];
        if (!bid) {
          bid = await createNewIdMapping('cc', val);
          if (bid) {
            bidMap[val.CoinInfo.Id] = bid;
          }
          else {
            logger.info(`bidMap: Can't map ${name}: ${symbol} from ${source} data`);
          }
        }
      }

      return bidMap;
      break;

    case 'm':

      const mIds = data.data.map(v => v.id);
      bidMap = await getBidMap('m', mIds);

      for (const val of data.data) {
        let bid = bidMap[val.id];
        if (!bid) {
          bid = await createNewIdMapping('m', val);
          if (bid) {
            bidMap[val.id] = bid;
          }
          else {
            logger.info(`bidMap: Can't map ${name}: ${symbol} from ${source} data`);
          }
        }
      }

      return bidMap;
      break;
  }

}
