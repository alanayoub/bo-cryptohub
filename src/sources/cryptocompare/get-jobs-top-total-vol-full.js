// Node
const crypto   = require('crypto');

// Cryptohub
const logger   = require('../../logger');
const settings = require('../../settings');

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsCryptocompareSectionTotalVolFull(queue, bootstrapData) {
  try {

     // let arr1 = [];
     // let arr2 = ['USD'];
     // let arr1StrLen = 0;
     // let symbol1;
     // let counter = 0;
     // // Lowering by 10 so we don't need to worry about "can we add another in the remaining space" issue, come back and do it right laterz
     // const arr1MaxLength = settings.limitsCryptocompareTradingInfoMultiArr1 - 10;
     // const arr2MaxLength = settings.limitsCryptocompareTradingInfoMultiArr2;
     // const groupKey = settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`;
     // if (arr2.join().length > arr2MaxLength) {
     //   throw new Error(`scrapeCryptocompare(): The items in the arr2 array need to be smaller than ${arr2MaxLength} in total length`);
     // }
     // let jobs = 0;

     // // filter first x by sortOrder
     // const limit = 400;
     // let items = [];
     // let order;
     // for (let item of Object.values(bootstrapData.coinList)) {
     //   order = item['SortOrder'];
     //   if (order < limit) {
     //     items[order] = item;
     //   }
     // }
     // items = items.filter(Boolean);
     // const length = items.length;

     // for (let v of items) {
     //   counter++;
     //   symbol1 = v.Symbol;
     //   arr1StrLen += symbol1.length + 1;
     //   let last = counter === length;
     //   if (arr1StrLen < arr1MaxLength) arr1.push(symbol1);
     //   if ((arr1StrLen > arr1MaxLength) || last) {
     //     const list1 = arr1.join();
     //     const list2 = arr2.join();
     //     const md5 = crypto.createHash('md5');
     //     const cacheKey = md5.update(list1 + list2).digest('hex');
     //     const data = {
     //       cacheKey, list1, list2
     //     }
     //     const uri = settings.tagUriCryptocompareTradingInfoMulti`${data}`;
     //     const key = settings.tagKeyCryptocompareTradingInfoMulti`${data}`;

     //     queue.push({uri, key: groupKey, cacheForDays: settings.cacheForCryptocompare});
     //     jobs++;
     //     arr1 = [];
     //     arr1StrLen = 0;

     //   }
     // }
     // logger.info(`getJobsCryptocompareSectionTotalVolFull(): ${jobs} price jobs created`);

  }
  catch(error) {
    const message = `getJobsCryptocompareSectionTotalVolFull(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
