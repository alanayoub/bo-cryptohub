import logger from '../../logger';
import { PerDayModel } from '../../db/schema';
import { getMaps, getAndUpdateBidMap } from '../../db/query';
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
  const bidMap = await getAndUpdateBidMap('cc', arrayData);

  for (const value of arrayData) {
    bid = bidMap[value.Id];
    result[bid] = {
      [`${prefix}Algorithm`]: value.Algorithm,
      [`${prefix}BlockNumber`]: value.BlockNumber,
      [`${prefix}BlockReward`]: value.BlockReward,
      [`${prefix}BlockTime`]: value.BlockTime,
      [`${prefix}CoinName`]: value.CoinName,
      [`${prefix}FullName`]: value.FullName,
      [`${prefix}FullyPremined`]: value.FullyPremined,
      [`${prefix}Id`]: value.Id,
      [`${prefix}ImageUrl`]: value.ImageUrl,
      [`${prefix}IsTrading`]: value.IsTrading,
      [`${prefix}Name`]: value.Name,
      [`${prefix}NetHashesPerSecond`]: value.NetHashesPerSecond,
      [`${prefix}PreMinedValue`]: value.PreMinedValue,
      [`${prefix}ProofType`]: value.ProofType,
      [`${prefix}SmartContractAddress`]: value.SmartContractAddress,
      [`${prefix}SortOrder`]: value.SortOrder,
      // [`${prefix}Sponsored`]: value.Sponsored,
      [`${prefix}Symbol`]: value.Symbol,
      [`${prefix}TotalCoinSupply`]: value.TotalCoinSupply,
      [`${prefix}TotalCoinsFreeFloat`]: value.TotalCoinsFreeFloat,
      [`${prefix}TotalCoinsMined`]: value.TotalCoinsMined,
      [`${prefix}Url`]: value.Url
    };
    // Add built on if available
    let builtOn;
    {
      const builtOnBid = bidMap[value.BuiltOn];
      builtOn = await PerDayModel.findOne({field: 'cryptohub-name', id: builtOnBid}).lean();
      builtOn = builtOn && builtOn.realtime && builtOn.realtime[1] && builtOn.realtime[1][1];
    }
    if (builtOn) {
      result[bid][`${prefix}BuiltOn`] = builtOn;
    }
  }

  await perSecondSave(result, timestamp);

  return {data: result, timestamp};

}
