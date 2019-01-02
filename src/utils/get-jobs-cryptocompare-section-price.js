// Node
const crypto   = require('crypto');

// Cryptohub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrappedData
 *
 * TODO: CHANGE HOW THIS WORKS
 * Update after every request. Change the active file with the new data and timestamp
 * This way we will get updates quicker. At the moment 55 requests takes forever at 1 request per minute or so
 *
 */
module.exports = async function getJobsCryptocompareSectionPrice(queue, bootstrappedData) {
  try {

     let arr1 = [];
     let arr2 = ['USD'];
     let arr1StrLen = 0;
     let symbol1;
     let counter = 0;
     const length = Object.keys(bootstrappedData.coinList.Data).length;
     // Lowering by 10 so we don't need to worry about "can we add another in the remaining space" issue, come back and do it right laterz
     const arr1MaxLength = settings.limitsCryptocompareTradingInfoMultiArr1 - 10;
     const arr2MaxLength = settings.limitsCryptocompareTradingInfoMultiArr2;
     const groupKey = settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`;
     if (arr2.join().length > arr2MaxLength) {
       throw new Error(`scrapeCryptocompare(): The items in the arr2 array need to be smaller than ${arr2MaxLength} in total length`);
     }
     let jobs = 0;
     for (let [k, v] of Object.entries(bootstrappedData.coinList.Data)) {
       counter++;
       symbol1 = v.Symbol;
       arr1StrLen += symbol1.length + 1;
       const last = counter === length;
       if (arr1StrLen < arr1MaxLength) arr1.push(symbol1);
       if ((arr1StrLen > arr1MaxLength) || last) {
         const list1 = arr1.join();
         const list2 = arr2.join();
         const md5 = crypto.createHash('md5');
         const cacheKey = md5.update(list1 + list2).digest('hex');
         const data = {
           cacheKey, list1, list2
         }
         const uri = settings.tagUriCryptocompareTradingInfoMulti`${data}`;
         const key = settings.tagKeyCryptocompareTradingInfoMulti`${data}`;
         queue.push({uri, key, cacheForDays: settings.cacheForCryptocompare, groupKey, last});
         jobs++;
         arr1 = [];
         arr1StrLen = 0;
       }
     }
     logger.info(`getJobsCryptocompareSectionPrice(): ${jobs} price jobs created`);

  }
  catch(error) {
    const message = `getJobsCryptocompareSectionPrice(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
