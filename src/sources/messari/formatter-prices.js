'use strict';

// Cryptohub
const logger = require('../../logger');

import { objectGetNestedProperty as gnp } from 'bo-utils';

import { getMaps }                        from '../../db/query';
import { perSecondSave }                  from '../../db/save';

/**
 *
 * PRICES
 *
 * Original Data
 * -------------
 *
 * {
 *   "status": {
 *     "elapsed": "0",
 *     "timestamp": "2019-04-11T10:19:47.634532695Z"
 *   },
 *   "data": [
 *     {
 *       id: "c8c7e9a1-844d-4cfd-9dbc-ce85a8a9613f",
 *       symbol: "BCH",
 *       rank: 4,
 *       slug: "bitcoin-cash",
 *       name: "Bitcoin Cash",
 *       priceUsd: 331.7928859141009,
 *       priceBtc: 0.02918531760176295,
 *       percentageChange24HrUsd: 3.186926407609609,
 *       percentageChange24HrBtc: 3.981337049918368,
 *       percentageChange7dUsd: -4.435096827830578,
 *       percentageChange7dBtc: -1.5893254767933307,
 *       percentageChange90dUsd: -14.5099369682545,
 *       percentageChange90dBtc: -39.64958800725293,
 *       percentageChange1yrUsd: -42.026854119626265,
 *       percentageChange1yrBtc: -67.7444834645597,
 *       y2050Marketcap: 6963002570.293967,
 *       currentMarketcap: 5953933676.388739,
 *       vol24HrUsd: 272227365.28458655,
 *       realVol24HrUsd: 46563027.97335898,
 *       volOverstatementMultiple: 5.846427458290327,
 *       age: 64022400,
 *       y2050Supply: 20982433.29,
 *       circulatingSupply: 17941687.5,
 *       supplyPercentageIssued: 85.4950356427417,
 *       instInflation: 3.040591394357619,
 *       vladimirClubCostUsd: 696700.4252065952,
 *       athUsd: 4329.52,
 *       athTimestamp: 1513728000,
 *       percentageDownFromAth: 92.33115859545865,
 *       breakevenMultiple: 13.039779377988145,
 *       txVol24hr: 651995331.5443898,
 *       adjustedTxVol24hr: 208894538.55943453,
 *       nvt24hr: 5.541230997868197,
 *       adjustedNvt24hr: 29.09908568417022,
 *       activeAddresses24hr: 33543,
 *       txCount24hr: 54177,
 *       newIssuance24hrUsd: 597643.2402802181,
 *       fees24hrUsd: 165.44447256677824,
 *       avgDifficulty24hr: 272077986089.4984,
 *       paymentCount24hr: 68500,
 *       medianTx24hrUsd: 9518.180021125188,
 *       medianFee24hrUsd: 0.0009097458213154431,
 *       dataAdded24hrKb: 18487.107,
 *       blockCount24hr: 144,
 *       githubStars: 837,
 *       githubWatchers: 151,
 *       githubCommits90d: 357,
 *       githubCommits365d: 1222,
 *       githubAdditions90d: 13621,
 *       githubAdditions365d: 74575,
 *       githubDeletions90d: 10508,
 *       githubDeletions365d: 54330,
 *       roi2018: -93.69886976147572,
 *       priceBtcNormalizedSupply: 333.3428231033297,
 *       priceBtcNormalizedSupplyY2050: 332.023055252498,
 *       cycleLowUsd: 73.53692042800047,
 *       cycleLowTimestamp: 1544832000,
 *       percentageUpFromCycleLow: 351.5065635675912,
 *       miningAlg: "SHA-256",
 *       networkHashRate: "2,258 PH/s",
 *       availableOnNicehash: 2.094613750125146,
 *       attackHourlyCost: 26487.2703304613,
 *       attackDailyCost: 635694.4879310712,
 *       percentageChangeMtdUsd: 2.3756319590136403,
 *       percentageChangeQtdUsd: -18.213080336790576,
 *       percentageChangeYtdUsd: 110.4621445887108,
 *       stakingEngagedPercent: 0,
 *       flipsideGrade: "A",
 *       flipsideRating: 860,
 *       flipsideDevScore: 812,
 *       flipsideUtilityScore: 935,
 *       flipsideMaturityScore: 782,
 *       tokenInsightGrade: "BBB",
 *       tokenInsightTeamScore: 71,
 *       tokenInsightSubjectScore: 84,
 *       tokenInsightEcologyScore: 79,
 *       sharpe30d: 2.754162270016756,
 *       sharpe90d: -0.42058308317699905,
 *       sharpe1yr: 0.0772171135736047,
 *       volatility30d: 0.542888803834895,
 *       volatility90d: 0.8063010419732609,
 *       volatility1yr: 1.1662336844500807,
 *       y10Supply: 20452868.5,
 *       y10Marketcap: 6787266946.930182,
 *       supplyY10PercentageIssued: 87.70866942209109,
 *       liquidSupply: 17938938.82,
 *       liquidMarketcap: 5953021529.277849,
 *       vol24HrTurnover: 0.7821746947219165
 *     }
 *   ]
 * }
 *
 * Prefix fields with "m-metrics-"
 * ----------------------------------------------
 * misc_data.sectors -> m-metrics-sectors
 *
 * NOTE:
 *   We need a master field list and we just map stuff from there.
 *   Have a think about it yo
 *
 * @param {Array} data - response from Messari api request
 * @param {String} timestamp
 * @return {Object}
 *
 */
export default async function formatterPrices(data, timestamp) {

  try {

    function dataIsValid(data) {
      if (Array.isArray(data.data)) return true;
      else return false;
    }

    if (!dataIsValid(data)) return;
    data = data.data;

    let item;
    let prop;
    let result = {};

    for (item of data) {

      const maps = await getMaps(['projectMapSymbolId']);
      const symbolIdMap = maps[0].map;
      const symbol = item.symbol.toUpperCase();
      const id = symbolIdMap[symbol]; // TODO: need proper mapping for ids

      if (!id) continue;

      result[id] = {
        'm-prices-id'                             :item.id,                            // "c8c7e9a1-844d-4cfd-9dbc-ce85a8a9613f",
        'm-prices-symbol'                         :item.symbol,                        // "BCH",
        'm-prices-rank'                           :item.rank,                          // 4,
        'm-prices-slug'                           :item.slug,                          // "bitcoin-cash",
        'm-prices-name'                           :item.name,                          // "Bitcoin Cash",
        'm-prices-priceUsd'                       :item.priceUsd,                      // 331.7928859141009,
        'm-prices-priceBtc'                       :item.priceBtc,                      // 0.02918531760176295,
        'm-prices-percentageChange24HrUsd'        :item.percentageChange24HrUsd,       // 3.186926407609609,
        'm-prices-percentageChange24HrBtc'        :item.percentageChange24HrBtc,       // 3.981337049918368,
        'm-prices-percentageChange7dUsd'          :item.percentageChange7dUsd,         // -4.435096827830578,
        'm-prices-percentageChange7dBtc'          :item.percentageChange7dBtc,         // -1.5893254767933307,
        'm-prices-percentageChange90dUsd'         :item.percentageChange90dUsd,        // -14.5099369682545,
        'm-prices-percentageChange90dBtc'         :item.percentageChange90dBtc,        // -39.64958800725293,
        'm-prices-percentageChange1yrUsd'         :item.percentageChange1yrUsd,        // -42.026854119626265,
        'm-prices-percentageChange1yrBtc'         :item.percentageChange1yrBtc,        // -67.7444834645597,
        'm-prices-y2050Marketcap'                 :item.y2050Marketcap,                // 6963002570.293967,
        'm-prices-currentMarketcap'               :item.currentMarketcap,              // 5953933676.388739,
        'm-prices-vol24HrUsd'                     :item.vol24HrUsd,                    // 272227365.28458655,
        'm-prices-realVol24HrUsd'                 :item.realVol24HrUsd,                // 46563027.97335898,
        'm-prices-volOverstatementMultiple'       :item.volOverstatementMultiple,      // 5.846427458290327,
        'm-prices-age'                            :item.age,                           // 64022400,
        'm-prices-y2050Supply'                    :item.y2050Supply,                   // 20982433.29,
        'm-prices-circulatingSupply'              :item.circulatingSupply,             // 17941687.5,
        'm-prices-supplyPercentageIssued'         :item.supplyPercentageIssued,        // 85.4950356427417,
        'm-prices-instInflation'                  :item.instInflation,                 // 3.040591394357619,
        'm-prices-vladimirClubCostUsd'            :item.vladimirClubCostUsd,           // 696700.4252065952,
        'm-prices-athUsd'                         :item.athUsd,                        // 4329.52,
        'm-prices-athTimestamp'                   :item.athTimestamp,                  // 1513728000,
        'm-prices-percentageDownFromAth'          :item.percentageDownFromAth,         // 92.33115859545865,
        'm-prices-breakevenMultiple'              :item.breakevenMultiple,             // 13.039779377988145,
        'm-prices-txVol24hr'                      :item.txVol24hr,                     // 651995331.5443898,
        'm-prices-adjustedTxVol24hr'              :item.adjustedTxVol24hr,             // 208894538.55943453,
        'm-prices-nvt24hr'                        :item.nvt24hr,                       // 5.541230997868197,
        'm-prices-adjustedNvt24hr'                :item.adjustedNvt24hr,               // 29.09908568417022,
        'm-prices-activeAddresses24hr'            :item.activeAddresses24hr,           // 33543,
        'm-prices-txCount24hr'                    :item.txCount24hr,                   // 54177,
        'm-prices-newIssuance24hrUsd'             :item.newIssuance24hrUsd,            // 597643.2402802181,
        'm-prices-fees24hrUsd'                    :item.fees24hrUsd,                   // 165.44447256677824,
        'm-prices-avgDifficulty24hr'              :item.avgDifficulty24hr,             // 272077986089.4984,
        'm-prices-paymentCount24hr'               :item.paymentCount24hr,              // 68500,
        'm-prices-medianTx24hrUsd'                :item.medianTx24hrUsd,               // 9518.180021125188,
        'm-prices-medianFee24hrUsd'               :item.medianFee24hrUsd,              // 0.0009097458213154431,
        'm-prices-dataAdded24hrKb'                :item.dataAdded24hrKb,               // 18487.107,
        'm-prices-blockCount24hr'                 :item.blockCount24hr,                // 144,
        'm-prices-githubStars'                    :item.githubStars,                   // 837,
        'm-prices-githubWatchers'                 :item.githubWatchers,                // 151,
        'm-prices-githubCommits90d'               :item.githubCommits90d,              // 357,
        'm-prices-githubCommits365d'              :item.githubCommits365d,             // 1222,
        'm-prices-githubAdditions90d'             :item.githubAdditions90d,            // 13621,
        'm-prices-githubAdditions365d'            :item.githubAdditions365d,           // 74575,
        'm-prices-githubDeletions90d'             :item.githubDeletions90d,            // 10508,
        'm-prices-githubDeletions365d'            :item.githubDeletions365d,           // 54330,
        'm-prices-roi2018'                        :item.roi2018,                       // -93.69886976147572,
        'm-prices-priceBtcNormalizedSupply'       :item.priceBtcNormalizedSupply,      // 333.3428231033297,
        'm-prices-priceBtcNormalizedSupplyY2050'  :item.priceBtcNormalizedSupplyY2050, // 332.023055252498,
        'm-prices-cycleLowUsd'                    :item.cycleLowUsd,                   // 73.53692042800047,
        'm-prices-cycleLowTimestamp'              :item.cycleLowTimestamp,             // 1544832000,
        'm-prices-percentageUpFromCycleLow'       :item.percentageUpFromCycleLow,      // 351.5065635675912,
        'm-prices-miningAlg'                      :item.miningAlg,                     // "SHA-256",
        'm-prices-networkHashRate'                :item.networkHashRate,               // "2,258 PH/s",
        'm-prices-availableOnNicehash'            :item.availableOnNicehash,           // 2.094613750125146,
        'm-prices-attackHourlyCost'               :item.attackHourlyCost,              // 26487.2703304613,
        'm-prices-attackDailyCost'                :item.attackDailyCost,               // 635694.4879310712,
        'm-prices-percentageChangeMtdUsd'         :item.percentageChangeMtdUsd,        // 2.3756319590136403,
        'm-prices-percentageChangeQtdUsd'         :item.percentageChangeQtdUsd,        // -18.213080336790576,
        'm-prices-percentageChangeYtdUsd'         :item.percentageChangeYtdUsd,        // 110.4621445887108,
        'm-prices-stakingEngagedPercent'          :item.stakingEngagedPercent,         // 0,
        'm-prices-flipsideGrade'                  :item.flipsideGrade,                 // "A",
        'm-prices-flipsideRating'                 :item.flipsideRating,                // 860,
        'm-prices-flipsideDevScore'               :item.flipsideDevScore,              // 812,
        'm-prices-flipsideUtilityScore'           :item.flipsideUtilityScore,          // 935,
        'm-prices-flipsideMaturityScore'          :item.flipsideMaturityScore,         // 782,
        'm-prices-tokenInsightGrade'              :item.tokenInsightGrade,             // "BBB",
        'm-prices-tokenInsightTeamScore'          :item.tokenInsightTeamScore,         // 71,
        'm-prices-tokenInsightSubjectScore'       :item.tokenInsightSubjectScore,      // 84,
        'm-prices-tokenInsightEcologyScore'       :item.tokenInsightEcologyScore,      // 79,
        'm-prices-sharpe30d'                      :item.sharpe30d,                     // 2.754162270016756,
        'm-prices-sharpe90d'                      :item.sharpe90d,                     // -0.42058308317699905,
        'm-prices-sharpe1yr'                      :item.sharpe1yr,                     // 0.0772171135736047,
        'm-prices-volatility30d'                  :item.volatility30d,                 // 0.542888803834895,
        'm-prices-volatility90d'                  :item.volatility90d,                 // 0.8063010419732609,
        'm-prices-volatility1yr'                  :item.volatility1yr,                 // 1.1662336844500807,
        'm-prices-y10Supply'                      :item.y10Supply,                     // 20452868.5,
        'm-prices-y10Marketcap'                   :item.y10Marketcap,                  // 6787266946.930182,
        'm-prices-supplyY10PercentageIssued'      :item.supplyY10PercentageIssued,     // 87.70866942209109,
        'm-prices-liquidSupply'                   :item.liquidSupply,                  // 17938938.82,
        'm-prices-liquidMarketcap'                :item.liquidMarketcap,               // 5953021529.277849,
        'm-prices-vol24HrTurnover'                :item.vol24HrTurnover,               // 0.7821746947219165

      };

    }

    await perSecondSave(result, timestamp);

    return {data: result, timestamp};

  }

  catch(error) {

    const message = `formatterPrices(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
