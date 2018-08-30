// Node
const crypto = require('crypto');

// CryptoHub
const settings       = require('../../settings');
const logger         = require('../../logger');
const { scrapeJSON } = require('../../utils/index.js');
const {
  commonDelay,
  itterateCryptocompareExchangePairs,
  classScrapeQueue:ScrapeQueue
} = require('../../utils/');

module.exports = async function scrapeCryptocompare(cacheForDays, rateLimitDelayMs) {
  try {

    const scrapeQueue = new ScrapeQueue({
      rateLimit: settings.queueCryptocompare,
      bootstrap: {
        name: 'coinList',
        async func() {
          return await scrapeJSON(settings.uriCryptocompareList, settings.keyCryptocompareList, cacheForDays)
        }
      }
    });

    //
    // COINLIST
    // Get the full list of coins with IDs
    //
    //
    //
    scrapeQueue.addToQueue({
      name: 'coinList',
      interval: 1000 * 5,
      getJobs(queue) {
        queue.push({uri: settings.uriCryptocompareList, key: settings.keyCryptocompareList, cacheForDays});
      },
      save() {
        logger.info(`Save coinList data to DB`);
      },
    });

    //
    // PRICE
    // Get every token in USD only (batched requests)
    //
    //
    //
    scrapeQueue.addToQueue({
      name: 'price',
      interval: 1000 * 10,
      getJobs(queue) {
        let arr1 = [];
        let arr2 = ['USD'];
        let jobs = 0;
        let arr1StrLen = 0;
        let symbol1;
        let counter = 0;
        const length = Object.keys(scrapeQueue.coinList.Data).length;
        // Lowering by 10 so we don't need to worry about "can we add another in the remaining space" issue, come back and do it right laterz
        const arr1MaxLength = settings.limitsCryptocompareTradingInfoMultiArr1 - 10;
        const arr2MaxLength = settings.limitsCryptocompareTradingInfoMultiArr2;
        const groupKey = settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`;
        if (arr2.join().length > arr2MaxLength) {
          throw new Error(`scrapeCryptocompare(): The items in the arr2 array need to be smaller than ${arr2MaxLength} in total length`);
        }
        for (let [k, v] of Object.entries(scrapeQueue.coinList.Data)) {
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
            queue.push({uri, key, cacheForDays, groupKey, last});
            jobs++;
            arr1 = [];
            arr1StrLen = 0;
          }
        }
        logger.info(`Number of jobs: ${jobs} jobs created for tagUriCryptocompareTradingInfoMulti`);
      },
      save() {
        logger.info(`Save price data to DB`);
      },
    });

    //
    // Get all the exchange pairs (individual requests per pair per exchange. No we can't batch them)
    // NOTE: 1000s of requests, only do this once a day
    //
    //
    //
    scrapeQueue.addToQueue({
      name: 'exchangePairs',
      interval: 1000 * 60 * 60 * 24,
      async getJobs(queue) {
        let jobs = 0;
        const groupKey = settings.tagKeyCryptocompareTradingInfoSingleGrouped`${{}}`;
        for await (const obj of itterateCryptocompareExchangePairs()) {
          if (obj === false) break;
          const { symbol1, symbol2, exchange, last } = obj;
          const data = {symbol1, symbol2, exchange};
          const uri = settings.tagUriCryptocompareTradingInfoSingle`${data}`;
          const key = settings.tagKeyCryptocompareTradingInfoSingle`${data}`;
          queue.push({uri, key, cacheForDays, groupKey, last});
          jobs++;
        }
        logger.info(`Number of jobs: ${jobs} jobs created for tagUriCryptocompareTradingInfoSingle`);
        queue.push({uri: settings.uriCryptocompareList, key: settings.keyCryptocompareList, cacheForDays});
      },
      save() {
        logger.info(`Save exchangePairs data to DB`);
      },
    });

    //
    // SOCIAL STATS
    // NOTE: 1000s of requests, only do this once a day
    //
    //
    //
    scrapeQueue.addToQueue({
      name: 'socialStats',
      interval: 1000 * 60 * 60 * 24,
      async getJobs(queue) {
        let jobs = 0;
        let counter = 0;
        const groupKey = settings.tagKeyCryptocompareSocialStatsGrouped`${{}}`;
        const ids = Object.values(scrapeQueue.coinList.Data).map(v => v.Id);
        const length = ids.length;
        for (const id of ids) {
          counter++;
          const last = counter === length;
          const uri = settings.tagUriCryptocompareSocialstats`${id}`;
          const key = settings.tagKeyCryptocompareSocialstats`${id}`;
          queue.push({uri, key, cacheForDays, groupKey, last});
          jobs++;
        }
        logger.info(`${jobs} jobs created for tagUriCryptocompareSocialstats`);
      },
      save() {
        logger.info(`Save socialStats data to DB`);
      },
    });

    //
    // SNAPSHOT
    // NOTE: 1000s of requests, only do this once a day
    //
    //
    //
    scrapeQueue.addToQueue({
      name: 'snapshot',
      interval: 1000 * 60 * 60 * 24,
      async getJobs(queue) {
        let jobs = 0;
        let counter = 0;
        const groupKey = settings.tagKeyCryptocompareSnapshotGrouped`${{}}`;
        const ids = Object.values(scrapeQueue.coinList.Data).map(v => v.Id);
        const length = ids.length;
        for (const id of ids) {
          counter++;
          const last = counter === length;
          const uri = settings.tagUriCryptocompareSnapshot`${id}`;
          const key = settings.tagKeyCryptocompareSnapshot`${id}`;
          queue.push({uri, key, cacheForDays, groupKey, last});
          jobs++;
        }
        logger.info(`${jobs} jobs created for tagUriCryptocompareSocialstats`);
      },
      save() {
        logger.info(`Save snapshot data to DB`);
      },
    });

    //
    // OTHER
    // Simple single requests
    //
    //
    //
    scrapeQueue.addToQueue({
      name: 'other',
      interval: 1000 * 10,
      getJobs(queue) {
        queue.push({uri: settings.uriCryptocompareExchanges,      key: settings.keyCryptocompareExchanges,      cacheForDays});
        queue.push({uri: settings.uriCryptocompareExchangeStatus, key: settings.keyCryptocompareExchangeStatus, cacheForDays});
      },
      save() {
        logger.info(`Save other data to DB`);
      },
    });

  }
  catch(error) {
    logger.error(`scrapeCryptocompare(): ${error}`);
    debugger;
    return {error: true, message: `scrapeCryptocompare(): ${error}`};
  }
}
