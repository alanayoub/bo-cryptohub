// Cryptohub
const logger = require('../../logger');

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
 * @param {Array} price is an array of the responses of batched cryptocompare api price data
 * @param {String} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionTotalVolFull(price, timestamp, bootstrapData) {
  try {

    const prefix = 'cc-total-vol-full-';

    let fData = {};
    let idx;
    let dataItem;
    let RAW;
    let coinInfo;

    for ([idx, dataItem] of Object.entries(price.Data)) {

      try {
        RAW = price.Data[idx].RAW.USD;
        coinInfo = price.Data[idx].CoinInfo;
      }
      catch (error) {
        logger.error(`formatterCryptocompareSectionTotalVolFull(): idx:${idx}, ${error}`);
      }

      let key;
      let val;
      const id = coinInfo.Id;

      fData[id] = {};

      for ([key, val] of Object.entries(RAW)) {
        fData[id][`${prefix}${key}-timestamp`] = timestamp;
        fData[id][`${prefix}${key}`] = val;
      }

      for ([key, val] of Object.entries(coinInfo)) {
        fData[id][`${prefix}${key}-timestamp`] = timestamp;
        fData[id][`${prefix}${key}`] = val;
      }

    }

    return {data: fData, timestamp};

  }
  catch(error) {
    const message = `formatterCryptocompareSectionTotalVolFull(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
