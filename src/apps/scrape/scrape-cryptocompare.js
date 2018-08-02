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

    // Bootstrap
    const coinList = await scrapeJSON(settings.uriCryptocompareList, settings.keyCryptocompareList, cacheForDays);

    //
    // NOTE: NEED TO RATE LIMIT ALL THESE THINGS
    //

    //
    // Intercept 'shift'
    // If last item in array call getJobs()
    // Calls function only after interval has elapsed
    //
    const handler = {
      get: function (obj, prop) {
        if (prop === 'shift' && obj.length === 0) {
          const t = +new Date();
          const currentInterval = t - (obj.startTimestamp || 0);
          const timeLeft = obj.interval - currentInterval;
          logger.info(`startTimestamp: ${obj.startTimestamp}`);
          const reset = () => {
            // logger.info('----------------------------------------------------------------------------------------');
            // logger.info('|                                                                                      |');
            // logger.info(`| Getting new jobs for ${obj.name}                                                     |`);
            // logger.info('|                                                                                      |');
            // logger.info('----------------------------------------------------------------------------------------');
            obj.getJobs();
            obj.timeout = void 0;
            obj.startTimestamp = +new Date();
          };
          if (timeLeft > 0) {
            logger.info(`get ${obj.name} jobs in ${timeLeft}ms`);
            if (!obj.timeout) {
              logger.info('setting timeout');
              obj.saveToDb();
              obj.timeout = setTimeout(reset, timeLeft);
            }
          }
          else {
            logger.info(`get ${obj.name} jobs now because ${timeLeft}ms`);
            obj.saveToDb();
            reset();
          }
        }
        return obj[prop];
      }
    }

    const rateLimit = settings.queueCryptocompare;
    const queues = {};
    const proxies = {};


    // //
    // // Get the full list of coins with IDs
    // //
    // //
    // //
    // queues.coinList = [];
    // queues.coinList.name = 'coinList';
    // queues.coinList.interval = 1000 * 5;
    // queues.coinList.getJobs = () => {
    //   queues.coinList.push({uri: settings.uriCryptocompareList, key: settings.keyCryptocompareList, cacheForDays});
    // };
    // queues.coinList.saveToDb = () => {
    //   logger.info(`Save ${queues.coinList.name} data to DB`);
    // };
    // proxies.coinList = new Proxy(queues.coinList, handler);


    // //
    // // Other simple single requests
    // //
    // //
    // //
    // queues.other = [];
    // queues.other.name = 'other';
    // queues.other.interval = 1000 * 10;
    // queues.other.getJobs = () => {
    //   queues.other.push({uri: settings.uriCryptocompareExchanges,      key: settings.keyCryptocompareExchanges,      cacheForDays});
    //   queues.other.push({uri: settings.uriCryptocompareExchangeStatus, key: settings.keyCryptocompareExchangeStatus, cacheForDays});
    // };
    // queues.other.saveToDb = () => {
    //   logger.info(`Save ${queues.other.name} data to DB`);
    // };
    // proxies.other = new Proxy(queues.other, handler);


    //
    // Get every token in USD only (batched requests)
    //
    //
    //
    queues.price = [];
    queues.price.name = 'price';
    queues.price.interval = 1000 * 10;
    queues.price.getJobs = () => {
      let arr1 = [];
      let arr2 = ['USD'];
      let jobs = 0;
      let arr1StrLen = 0;
      let symbol1;
      let counter = 0;
      const length = Object.keys(coinList.Data).length;
      // Lowering by 10 so we don't need to worry about "can we add another in the remaining space" issue, come back and do it right laterz
      const arr1MaxLength = settings.limitsCryptocompareTradingInfoMultiArr1 - 10;
      const arr2MaxLength = settings.limitsCryptocompareTradingInfoMultiArr2;
      const groupKey = settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`;
      if (arr2.join().length > arr2MaxLength) {
        throw new Error(`scrapeCryptocompare(): The items in the arr2 array need to be smaller than ${arr2MaxLength} in total length`);
      }
      for (let [k, v] of Object.entries(coinList.Data)) {
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
          queues.price.push({uri, key, cacheForDays, groupKey, last});
          jobs++;
          arr1 = [];
          arr1StrLen = 0;
        }
      }
      logger.info(`Number of jobs: ${jobs} jobs created for tagUriCryptocompareTradingInfoMulti`);
    };
    queues.price.saveToDb = () => {
      logger.info(`Save ${queues.price.name} data to DB`);
    };
    proxies.price = new Proxy(queues.price, handler);


    // //
    // // Get all the exchange pairs (individual requests per pair per exchange)
    // // NOTE: Lots of requests, only do this once a day?
    // //
    // //
    // //
    // queues.exchangePairs = [];
    // queues.exchangePairs.name = 'ExchangePairs';
    // queues.exchangePairs.interval = 1000 * 60 * 60 * 24;
    // queues.exchangePairs.getJobs = async () => {
    //   let jobs = 0;
    //   const groupKey = settings.tagKeyCryptocompareTradingInfoSingleGrouped`${{}}`;
    //   for await (const obj of itterateCryptocompareExchangePairs()) {
    //     if (obj === false) break;
    //     const { symbol1, symbol2, exchange, last } = obj;
    //     const data = {symbol1, symbol2, exchange};
    //     const uri = settings.tagUriCryptocompareTradingInfoSingle`${data}`;
    //     const key = settings.tagKeyCryptocompareTradingInfoSingle`${data}`;
    //     queues.exchangePairs.push({uri, key, cacheForDays, groupKey, last});
    //     jobs++;
    //   }
    //   logger.info(`Number of jobs: ${jobs} jobs created for tagUriCryptocompareTradingInfoSingle`);
    // };
    // queues.exchangePairs.saveToDb = () => {
    //   logger.info(`Save ${queues.exchangePairs.name} data to DB`);
    // };
    // proxies.exchangePairs = new Proxy(queues.exchangePairs, handler);


    //
    //
    // Do the scrape!
    //
    //
    const groups = {};
    const timestamp = +new Date();
    let requests = 0;
    async function init() {
      for (let [name, queue] of Object.entries(proxies)) {
        const item = queue.shift();
        if (item) {
          console.time('init');
          const { uri, key, cacheForDays, groupKey, last } = item;
          const file = await scrapeJSON(uri, key, cacheForDays);
          const elapsedTime = +new Date() - timestamp;
          requests++;
          console.log(`time: ${elapsedTime/requests} ms per request`);
          console.log(`total request: ${requests}`);
          //
          // Deal with paginated requests
          // Collect groups of files in an Array then save a master file
          //
          if (groupKey) {
            if (last) {
              if (groups[queue.name]) {
                groups[queue.name].push(file);
                global.cache.set(groupKey, JSON.stringify(groups[queue.name]));
                groups[queue.name] = [];
              }
            }
            else {
              if (!groups[queue.name]) {
                groups[queue.name] = [];
              }
              groups[queue.name].push(file);
            }
          }
          console.timeEnd('init');
        }
        await commonDelay(50);
      }
      init();
    };

    init();

    // //
    // // Get all the exchange pairs (individual requests per pair per exchange)
    // // NOTE: Lots of requests, only do this once a day?
    // //
    // {
    //   let requests = 0;
    //   for await (const obj of itterateCryptocompareExchangePairs()) {
    //     if (obj === false) break;
    //     const { symbol1, symbol2, exchange } = obj;
    //     const data = {symbol1, symbol2, exchange};
    //     const uri = settings.tagUriCryptocompareTradingInfoSingle`${data}`;
    //     const key = settings.tagKeyCryptocompareTradingInfoSingle`${data}`;
    //     await scrapeJSON(uri, key, cacheForDays);
    //     await commonDelay(rateLimitDelayMs);
    //     requests++;
    //   }
    //   logger.info(`Number of requests: ${requests} requests made for tagUriCryptocompareTradingInfoSingle`);
    // }

    // const ids = Object.values(coinList.Data).map(v => v.Id);
    // for (const id of ids) {
    //   logger.info(`ScrapeCryptocompare: Scraping ${id}`);
    //   await scrapeJSON(settings.tagUriCryptocompareSnapshot`${id}`,    settings.tagKeyCryptocompareSnapshot`${id}`,    cacheForDays);
    //   await commonDelay(rateLimitDelayMs);
    //   await scrapeJSON(settings.tagUriCryptocompareSocialstats`${id}`, settings.tagKeyCryptocompareSocialstats`${id}`, cacheForDays);
    //   await commonDelay(rateLimitDelayMs);
    // }

    return true;
  }
  catch(error) {
    logger.error(`scrapeCryptocompare(): ${error}`);
    debugger;
    return {error: true, message: `scrapeCryptocompare(): ${error}`};
  }
}
