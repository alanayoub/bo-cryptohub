import logger from '../../logger';
import { perSecondSave } from '../../db/save';
import { getBidMap } from '../../db/query';
import { objectGetNestedProperty as gnp } from 'bo-utils';

/**
 *
 * TOTAL VOL FULL
 *
 * Original Data
 * -------------
 *
 * CoinInfo: {
 *   Id: "925326",
 *   Name: "PSM",
 *   FullName: "Prasm",
 *   Internal: "PSM",
 *   ImageUrl: "/media/34478246/prasm.png",
 *   Url: "/coins/psm/overview",
 *   Algorithm: "N/A",
 *   ProofType: "N/A",
 *   NetHashesPerSecond: 0,
 *   BlockNumber: 0,
 *   BlockTime: 0,
 *   BlockReward: 0,
 *   Type: 1,
 *   DocumentType: "Webpagecoinp"
 * },
 * RAW: {
 *   USD: {
 *     TYPE: "5",
 *     MARKET: "CCCAGG",
 *     FROMSYMBOL: "PSM",
 *     TOSYMBOL: "USD",
 *     FLAGS: "2",
 *     PRICE: 0.00052371,
 *     LASTUPDATE: 1548407775,
 *     LASTVOLUME: 0,
 *     LASTVOLUMETO: 0,
 *     LASTTRADEID: 0,
 *     VOLUMEDAY: 0,
 *     VOLUMEDAYTO: 0,
 *     VOLUME24HOUR: 0,
 *     VOLUME24HOURTO: 0,
 *     OPENDAY: 0.0007867287999999999,
 *     HIGHDAY: 0.0007867287999999999,
 *     LOWDAY: 0.00052371,
 *     OPEN24HOUR: 0.00052371,
 *     HIGH24HOUR: 0.00052371,
 *     LOW24HOUR: 0.00052371,
 *     LASTMARKET: "IDAX",
 *     VOLUMEHOUR: 0,
 *     VOLUMEHOURTO: 0,
 *     OPENHOUR: 0.00052371,
 *     HIGHHOUR: 0.00052371,
 *     LOWHOUR: 0.00052371,
 *     CHANGE24HOUR: 0,
 *     CHANGEPCT24HOUR: 0,
 *     CHANGEDAY: -0.0002630187999999999,
 *     CHANGEPCTDAY: -33.43195266272188,
 *     SUPPLY: 4000000000,
 *     MKTCAP: 2094840.0000000002,
 *     TOTALVOLUME24H: 444,
 *     TOTALVOLUME24HTO: 0.23252724000000002,
 *     IMAGEURL: "/media/34478246/prasm.png"
 *   }
 * }
 *
 * Prefix fields with "cc-total-vol-full-"
 * ----------------------------------------------
 * PRICE -> cc-total-vol-full-ImageUrl
 *
 * @param {Array} data is an array of the responses of batched cryptocompare api price data
 * @param {String} timestamp
 * @returns {Object}
 *
 */
export default async function totalVolFull(data, timestamp) {
  try {

    const prefix = 'cc-total-vol-full-';

    let result = {};
    let id;
    let key;
    let val;
    let idx;
    let dataItem;
    let RAW;
    let coinInfo;

    const bidMap = await getBidMap('cc', data);

    for ([idx, dataItem] of Object.entries(data.Data)) {

      if (data.Data && data.Data[idx]) {
        RAW = data.Data[idx].RAW && data.Data[idx].RAW.USD;
        coinInfo = data.Data[idx].CoinInfo;
      }

      if (coinInfo) {
        id = coinInfo.Id;

        result[id] = {};

        for ([key, val] of Object.entries(coinInfo)) {
          result[id][`${prefix}${key}`] = val;
        }

        if (RAW) {
          for ([key, val] of Object.entries(RAW)) {
            result[id][`${prefix}${key}`] = val;
          }
        }

      }

    }

    await perSecondSave(result, timestamp);

    return {data: result, timestamp};

  }
  catch (error) {
    const message = `totalVolFull(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
