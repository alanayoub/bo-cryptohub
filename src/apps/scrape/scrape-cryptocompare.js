// Node
const crypto = require('crypto');

// CryptoHub
const settings = require('../../settings');
const logger = require('../../logger');
const { commonDelay, itterateCryptocompareExchangePairs } = require('../../utils/');
const { logHeader } = require('../../utils.js'); // this utils needs to go yo
const { scrapeJSON } = require('../../utils/index.js');

module.exports = async function scrapeCryptocompare(cacheForDays, rateLimitDelayMs) {
  try {

    logHeader('Scraping cryptocompare.com');

    //
    // NOTE: NEED TO RATE LIMIT ALL THESE THINGS
    //

    //
    // Other requests are dependent on these items
    //
    const coinList       = await scrapeJSON(settings.uriCryptocompareList,           settings.keyCryptocompareList,           cacheForDays);
    const exchanges      = await scrapeJSON(settings.uriCryptocompareExchanges,      settings.keyCryptocompareExchanges,      cacheForDays);
    const exchangeStatus = await scrapeJSON(settings.uriCryptocompareExchangeStatus, settings.keyCryptocompareExchangeStatus, cacheForDays);

    //
    // Get every token in USD only (batched requests)
    //
    {
      let arr1 = [];
      let arr2 = ['USD'];
      let requests = 0;
      let arr1StrLen = 0;
      let symbol1;
      // Lowering by 10 so we don't need to worry about "can we add another in the remaining space" issue, come back and do it right laterz
      const arr1MaxLength = settings.limitsCryptocompareTradingInfoMultiArr1 - 10;
      const arr2MaxLength = settings.limitsCryptocompareTradingInfoMultiArr2;
      if (arr2.join().length > arr2MaxLength) {
        throw new Error(`scrapeCryptocompare(): The items in the arr2 array need to be smaller than ${arr2MaxLength} in total length`);
      }
      for (let [k, v] of Object.entries(coinList.Data)) {
        symbol1 = v.Symbol;
        arr1StrLen += symbol1.length + 1;
        if (arr1StrLen < arr1MaxLength) arr1.push(symbol1);
        if (arr1StrLen > arr1MaxLength) {
          const list1 = arr1.join();
          const list2 = arr2.join();
          const md5 = crypto.createHash('md5');
          const cacheKey = md5.update(list1 + list2).digest('hex');
          const data = {
            cacheKey, list1, list2
          }
          const uri = settings.tagUriCryptocompareTradingInfoMulti`${data}`;
          const key = settings.tagKeyCryptocompareTradingInfoMulti`${data}`;
          await scrapeJSON(uri, key, 0); //cacheForDays);
          await commonDelay(rateLimitDelayMs);
          requests++;
          arr1 = [];
          arr1StrLen = 0;
        }
      }
      logger.info(`Number of requests: ${requests} requests made for tagUriCryptocompareTradingInfoMulti`);
    }

    //
    // Get all the exchange pairs (individual requests per pair per exchange)
    // NOTE: Lots of requests, only do this once a day?
    //
    {
      let requests = 0;
      for await (const obj of itterateCryptocompareExchangePairs()) {
        if (obj === false) break;
        const { symbol1, symbol2, exchange } = obj;
        const data = {symbol1, symbol2, exchange};
        const uri = settings.tagUriCryptocompareTradingInfoSingle`${data}`;
        const key = settings.tagKeyCryptocompareTradingInfoSingle`${data}`;
        await scrapeJSON(uri, key, cacheForDays);
        await commonDelay(rateLimitDelayMs);
        requests++;
      }
      logger.info(`Number of requests: ${requests} requests made for tagUriCryptocompareTradingInfoSingle`);
    }

    const ids = Object.values(coinList.Data).map(v => v.Id);
    for (const id of ids) {
      logger.info(`ScrapeCryptocompare: Scraping ${id}`);
      await scrapeJSON(settings.tagUriCryptocompareSnapshot`${id}`,    settings.tagKeyCryptocompareSnapshot`${id}`,    cacheForDays);
      await commonDelay(rateLimitDelayMs);
      await scrapeJSON(settings.tagUriCryptocompareSocialstats`${id}`, settings.tagKeyCryptocompareSocialstats`${id}`, cacheForDays);
      await commonDelay(rateLimitDelayMs);
    }

    return true;
  }
  catch(error) {
    logger.error(`scrapeCryptocompare(): ${error}`);
    debugger;
    return {error: true, message: `scrapeCryptocompare(): ${error}`};
  }
}
