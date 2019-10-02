import logger from '../../logger';
import { getMaps } from '../../db/query';
import { getBidMap } from '../../db/query';
import { mapSave, perSecondSave } from '../../db/save';

/**
 *
 * COINLIST
 *
 * Original Data
 * -------------
 *
 * Algorithm: "N/A"
 * BlockNumber: 0
 * BlockReward: 0
 * BlockTime: 0
 * BuiltOn: "7605"
 * CoinName: "Algory"
 * FullName: "Algory (ALG)"
 * FullyPremined: "0"
 * Id: "903856"
 * ImageUrl: "/media/33842957/alg.jpg"
 * IsTrading: true
 * Name: "ALG"
 * NetHashesPerSecond: 0
 * PreMinedValue: "N/A"
 * ProofType: "N/A"
 * SmartContractAddress: "0x16b0a1a87ae8af5c792fabc429c4fe248834842b"
 * SortOrder: "2853"
 * Sponsored: false
 * Symbol: "ALG"
 * TotalCoinSupply: "75000000"
 * TotalCoinsFreeFloat: "N/A"
 * TotalCoinsMined: 75000000
 * Url: "/coins/alg/overview"
 *
 * Prefix fields with "cc-coinlist-"
 * ----------------------------------
 * Algorithm -> cc-coinlist-Algorithm
 *
 * @param {Object} data - data object
 * @param {Number} timestamp - time data was created
 * @returns {Object} formatted data and timestamp
 *
 */
export default async function formatterCryptocompareSectionCoinlist(data, timestamp) {

  const prefix = 'cc-coinlist-';

  const arrayData = [];
  for (const value of Object.values(data.Data)) {
    arrayData.push(value);
  }

  const result = {};

  {
    //
    // Get rid of this
    //
    const mapSymbolId = {};
    let currentCoinOut, currentCoinIn, symbol, id, key, val;
    for ([symbol, val] of Object.entries(data.Data)) {
      mapSymbolId[symbol] = val['Id'];
    }
    mapSave('projectMapSymbolId', JSON.stringify(mapSymbolId));
  }

  let bid;
  const bidMap = await getBidMap('cc', arrayData);

  for (const value of arrayData) {
    bid = bidMap[value.Id];
    result[bid] = {};
    for (const [field, prop] of Object.entries(value)) {
      result[bid][`${prefix}${field}`] = prop;
    }
  }

  await perSecondSave(result, timestamp);

  return {data: result, timestamp};

}
