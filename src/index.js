//
//
//     d888888o.       ,o888888o.    8 888888888o.            .8.          8 888888888o   8 8888888888
//   .`8888:' `88.    8888     `88.  8 8888    `88.          .888.         8 8888    `88. 8 8888
//   8.`8888.   Y8 ,8 8888       `8. 8 8888     `88         :88888.        8 8888     `88 8 8888
//   `8.`8888.     88 8888           8 8888     ,88        . `88888.       8 8888     ,88 8 8888
//    `8.`8888.    88 8888           8 8888.   ,88'       .8. `88888.      8 8888.   ,88' 8 888888888888
//     `8.`8888.   88 8888           8 888888888P'       .8`8. `88888.     8 888888888P'  8 8888
//      `8.`8888.  88 8888           8 8888`8b          .8' `8. `88888.    8 8888         8 8888
//  8b   `8.`8888. `8 8888       .8' 8 8888 `8b.       .8'   `8. `88888.   8 8888         8 8888
//  `8b.  ;8.`8888    8888     ,88'  8 8888   `8b.    .888888888. `88888.  8 8888         8 8888
//   `Y8888P ,88P'     `8888888P'    8 8888     `88. .8'       `8. `88888. 8 8888         8 888888888888
//
//
// Create a number of scrapeQueues
// Each scrapeQueue takes a function that generates a scrape job ('uri' to scrape and 'key' to save file)
// The  scrapeQueues continuously run scraping at a predefined interval
//
// NOTE: Maybe change implementation to use save instead of spesifying a cache key
//

// Node
const crypto                             = require('crypto');

// CryptoHub
const logger                             = require.main.require('./logger');
const settings                           = require.main.require('./settings');
const scrapeJSON                         = require.main.require('./utils/scrape-json.js');
const formatterCryptocompareSectionPrice = require.main.require('./utils/formatter-cryptocompare-section-price.js');
const DataTable                          = require.main.require('./libs/dataTable/src');

process.on('warning', error => {
  logger.warning(`index.js:\n${error.stack}`);
});

try {

  /**
   *
   *
   *
   */
  async function formatterCryptocompareBootstrap() {

    const coinList = await scrapeJSON(settings.uriCryptocompareList, settings.keyCryptocompareList, 0)

    const idSymbolMap = {};
    const symbolIdMap = {};
    let cryptocompareList;
    {
      if (!coinList) {
        throw new Error('cryptocompare(): No coinList available. Probably need to run scrape');
      };
      cryptocompareList = typeof coinList === 'string' ? JSON.parse(coinList).Data : coinList.Data;
      for (const [symbol, data] of Object.entries(cryptocompareList)) {
        idSymbolMap[data.Id] = symbol;
        symbolIdMap[symbol] = data.Id;
      };
    }

    return { idSymbolMap, symbolIdMap, coinList };

  };

  /**
   *
   * COINLIST
   *
   * Original Data
   * -------------
   *
   * Algorithm            : "SHA256"
   * BuiltOn              : "N/A"
   * CoinName             : "Bitcoin"
   * FullName             : "Bitcoin (BTC)"
   * FullyPremined        : "0"
   * Id                   : "1182"
   * ImageUrl             : "/media/19633/btc.png"
   * IsTrading            : true
   * Name                 : "BTC"
   * PreMinedValue        : "N/A"
   * ProofType            : "PoW"
   * SmartContractAddress : "N/A"
   * SortOrder            : "1"
   * Sponsored            : false
   * Symbol               : "BTC"
   * TotalCoinSupply      : "21000000"
   * TotalCoinsFreeFloat  : "N/A"
   * Url                  : "/coins/btc/overview"
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
  function formatterCryptocompareSectionCoinList(data, timestamp, bootstrappedData) {

    const { idSymbolMap, symbolIdMap } = bootstrappedData;
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
    return {data: result, timestamp};
  };

  /**
   *
   * Merge Handler
   *
   * Everytime new data is scraped this function will
   * be used to merge it with the existing data
   *
   * @param {Array} dataArray
   * @param {Object} db
   * @return {Array} - the merged data
   *
   */
  function mergeHandler(dataArray, db) {
    let cc, cmc, map, json;
    // basically at the moment this is only if we are scraping coinmarketcap too
    // we are probably going to retire cmc as the api rate limit sucks
    if (dataArray.length === 2) {
      cmc = db.coinmarketcap;
      cc = db.cryptocompare;
      if (!map) {
        map = analyticsMapCmcToCc(cmc, cc);
      }
      cmc = commonSwapObjectKeys(cmc, map);
      json = analyticsMergeDataByKey([cc, cmc]);
      return json;
    }
    return dataArray[0];
  };

  /**
   *
   * Data Handler
   * Gets called everytime the data is updated
   *
   */
  function dataHandler(data) {

    //
    // Backfill data
    //
    // When running a new instance of app-analytics the datastore starts off empty.
    // Some data takes longer to scrape than other therefore some items in the
    // datastore will stay empty for a while. To prevent this we backfill the datastore
    // with the last output datasource if any of the stores are empty
    //
    // for (const db of Object.values(cc.db)) {
    //   if (Object.keys(db).length === 0) {
    //     let [ backFillData ] = settings.cache.get(settings.keyCryptohubAnalyticsOut);
    //     backFillData = JSON.parse(backFillData);
    //     backFillData = arrayToObject(backFillData, 'cc-snapshot-General-Id');
    //     data = Object.assign(backFillData, data);
    //     break;
    //   }
    // }

    const btcId = 1182;
    const btcItem = data[btcId];
    let btcPrice;
    if (btcItem) {
      btcPrice = btcItem['cc-price-PRICE'];
    }
    let ccRank;
    let ccPrice;
    let totalSupply;
    let circulatingSupply;
    for (let [key, item] of Object.entries(data)) {
      if (
           item['cc-coinlist-IsTrading']     === false
        || item['cc-price-TOTALVOLUME24HTO'] === 0
      ) {
        delete data[key];
      }
      else {
        ccRank  = item['cc-coinlist-SortOrder'] || 10000;
        ccPrice = item['cc-price-PRICE'];
        totalSupply = item['cc-coinlist-TotalCoinSupply'];
        circulatingSupply = item['cc-price-SUPPLY'];
        item['cryptohub-rank'] = ccRank;
        item['cryptohub-circulating-percent-total'] = (circulatingSupply / totalSupply) * 100;
        if (btcPrice) {
          item['cryptohub-price-btc'] = 1 / (btcPrice / ccPrice);
        }
      }
    }


    // TODO: move this
    function objectToArray(data) {
      const arrayData = [];
      for (let [id, obj] of Object.entries(data)) {
        obj.id = obj.Id;
        arrayData.push(obj);
      }
      return arrayData;
    }

    const arrayData = objectToArray(data);
    settings.cache.set(settings.keyCryptohubAnalyticsTmp, JSON.stringify(arrayData));
    logger.info(`app-analytics.js: Saving file ${settings.keyCryptohubAnalyticsTmp}`);

  };

  new DataTable({
    server: {
      port: 3000
    },
    tmpDir: settings.keyCryptohubAnalyticsTmp,
    outDir: settings.keyCryptohubAnalyticsOut,
    cacheDir: 'cache',
    defaultData: [],
    mergeHandler,
    dataHandler,
    scrapeSites: {
      cryptocompare: {
        cacheFor: 0,
        rateLimitDelayMs: settings.rateLimitCryptocompare,
        bootstrap: formatterCryptocompareBootstrap,
        sections: [
          {
            //
            // COINLIST
            // Get the full list of coins with IDs
            //
            //
            // TODO: bootstrappedData needs to change when coinlist changes!!!!
            //
            name: 'coinList',
            interval: 1000 * 5,
            cacheArgs: [settings.keyCryptocompareList, 'all'],
            getJobs(queue, bootstrappedData) {
              queue.push({uri: settings.uriCryptocompareList, key: settings.keyCryptocompareList, cacheForDays: 0});
            },
            formatter: formatterCryptocompareSectionCoinList,
          },
          {
            //
            // PRICE
            // Get every token in USD only (batched requests)
            //
            name: 'price',
            interval: 1000 * 10,
            cacheArgs: [settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`, 'all'],
            getJobs(queue, bootstrappedData) {
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
              logger.info(`scrape-cryptocompare(): ${jobs} price jobs created`);
            },
            formatter: formatterCryptocompareSectionPrice
          }
        ]
      },
      // xe: {
      //   cacheForDays: 1,
      //   rateLimitDelay: 1000 * 60 * 60 * 24,
      //   items: [
      //     {
      //       name: 'currency',
      //       interval: 1000 * 60 * 60 * 24,
      //       getJobs(queue) {},
      //       formatter(data, timestamp) {}
      //     }
      //   ]
      // }
    }
  });

}

catch(error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}

