'use strict';

// Cryptohub
const logger = require('../../logger');

import { getMaps }       from '../../db/query';
import { perSecondSave } from '../../db/save';

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
 * @param {String?} data
 * @param {String?} timestamp
 * @return {Object}
 *
 */
export default async function formatterCryptocompareSectionCoinlist(data, timestamp) {

    const maps = await getMaps(['projectMapIdSymbol']);
    const idSymbolMap = maps[0].map;
    const prefix = 'cc-coinlist-';
    const objAllCoins = data.Data;
    const result = {};
    let currentCoinOut, currentCoinIn, key, val, id;
    for (id of Object.keys(idSymbolMap)) {
      currentCoinOut = {};
      currentCoinIn = objAllCoins[idSymbolMap[id]];
      if (currentCoinIn === void 0) {
        logger.error(`coinListWatcher.handler(): ${idSymbolMap[id]} is not in objAllCoins`);
        continue;
      }
      for ([key, val] of Object.entries(currentCoinIn)) {
        if (key === 'SortOrder') {
          val = +val; // Make SortOrder numeric
        }
        currentCoinOut[`${prefix}${key}`] = val;
        if (key === 'SortOrder' && isNaN(currentCoinOut[`${prefix}${key}`])) debugger;
      }
      result[id] = currentCoinOut;
    }

    // mapSave('projectMapIdName', JSON.stringify(mapIdName));
    await perSecondSave(result, timestamp);

    return {data: result, timestamp};

}
