// Node
const fs = require('fs');

// Libs
const { to } = require('await-to-js');
const { commonDelay } = require.main.require('./utils/');

// CryptoHub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');
const {
  analyticsMergeDataByKey,
  analyticsUSDCurrencyTable,
  formatterCryptocomparePrice,
  formatterCryptocompareAllCoins,
  formatterCryptocompareSnapshot,
  formatterCryptocompareSocialstats,
  formatterCryptocompareFiatVolumeUSD,
  itterateCryptocompareExchangePairs,
} = require.main.require('./utils/');

const { TimeseriesFast } = require.main.require('./db-schema');
const { mapDbFields: { fullToShort:m } } = require.main.require('./utils/');

/**
 *
 * Watch a folder for files
 * Parse and save file data via handlers
 * Delete files
 *
 */
class Watcher {

  constructor(options) {
    this.options = options;
    this.queue = new Set([]);
    this.delay = options.delay || 1000;
    this.symbolIdMap = options.symbolIdMap;
    this.run();
  }

  addToQueue(files) {
    const len = Object.keys(files).length;
    if (len) {
      for (const [fileName, currentFile] of Object.entries(files)) {
        const fingerprint = JSON.stringify({[fileName]: currentFile});
        if (!this.queue.has(fingerprint)) {
          logger.info(`Adding to queue: ${fileName}`);
          this.queue.add(fingerprint);
        }
      }
    }
  }

  async parseQueueItems() {
    const formatHandler = this.options.formatHandler;
    const saveHandler = this.options.saveHandler;
    for (let itemStr of this.queue) {
      const itemObj = JSON.parse(itemStr);
      const fileName = Object.keys(itemObj)[0];
      const dataStr = itemObj[fileName];
      const dataObj = JSON.parse(dataStr);
      const timestamp = fileName.replace(/^cache.*<([0-9TZ:.-]*)>$/, '$1');
      const formattedData = formatHandler(dataObj, this.symbolIdMap);
      const [error, saved] = await to(saveHandler(formattedData, timestamp));
      if (!!formattedData && saved) {
        logger.info(`Deleting file and removing from queue: ${fileName}`);
        this.queue.delete(itemStr);
        fs.unlink(fileName, async error => {
          if (error) {
            logger.error(`Unable to delete ${fileName}: ${error}`);
            debugger;
            throw error;
          }
        });
      }
      else {
        logger.error(`Error saving ${fileName}: ${error}`);
      }
    }
  }

  async run() {

    logger.info('WatchFolder(): START ------------------------------------------- /');
    const files = settings.cache.get(...this.options.cacheArgs);

    if (files[0] !== false) {
      this.addToQueue(files);
      await this.parseQueueItems();
    }

    await commonDelay(this.options.delay);
    logger.info('WatchFolder(): END --------------------------------------------- /\n\n');
    this.run();

  }

}

/**
 *
 * This function is currently still in a test state
 *
 * NOTE: testing some queries
 * db.timeseriesfasts.find({}, {'D.1182.P', 1}).sort({_id: -1}).limit(5)
 *
 *
 */
const saveCryptocomparePrice = async function(data, timestamp) {

  const pad = n => `0${n}`.substr(-2);
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const _id = year + pad(month) + pad(day) + pad(hour) + pad(minutes) + pad(seconds);

  const query = {
    _id,
  };

  const update = {
    $set: {
      [m['_id']]:        _id,
      [m['MARKET']]:     data[m['MARKET']],
      [m['TOSYMBOL']]:   data[m['TOSYMBOL']],
    },
  };

  let path;
  for (let [id, val] of Object.entries(data[m['DATA']])) {
    path = `${m['DATA']}.${id}`;
    update.$set[path] = val;
  }

  const options = {
    new: true,    // true to return the modified document rather than the original. defaults to false
    upsert: true, // creates the object if it doesn't exist. defaults to false.
  };

  const [error, timeseries] = await to(TimeseriesFast.findOneAndUpdate(query, update, options).exec());
  if (error) {
    logger.error(`saveCryptocomparePrice() error saving new data : ${error}`);
    return {error: true, message: error};
  }
  else {
    logger.info(`saveCryptocomparePrice(): Saved new data`);
    return true;
  }

}

/**
 *
 * Parse cryptocompare data
 * @return {Object}
 *
 */
module.exports = async function cryptocompare() {
  try {

    //
    // Helper data
    //
    const idSymbolMap = {};
    const symbolIdMap = {};
    let cryptocompareList;
    {
      const [coinList] = settings.cache.get(settings.keyCryptocompareList);
      cryptocompareList = JSON.parse(coinList).Data;
      for (const [symbol, data] of Object.entries(cryptocompareList)) {
        idSymbolMap[data.Id] = symbol;
        symbolIdMap[symbol] = data.Id;
      };
    }

    // // Coinlist
    // new Watcher({
    //   symbolIdMap,
    //   delay: 1000,
    //   cacheArgs: [settings.keyCryptocompareList, 'all'],
    //   formatHandler: (data, symbolIdMap) => {
    //     console.log(data);
    //     debugger
    //     let result = {};
    //     // Algorithm : "SHA256"
    //     // BuiltOn : "N/A"
    //     // CoinName : "Bitcoin"
    //     // FullName : "Bitcoin (BTC)"
    //     // FullyPremined : "0"
    //     // Id : "1182"
    //     // ImageUrl : "/media/19633/btc.png"
    //     // IsTrading : true
    //     // Name : "BTC"
    //     // PreMinedValue : "N/A"
    //     // ProofType : "PoW"
    //     // SmartContractAddress : "N/A"
    //     // SortOrder : "1"
    //     // Sponsored : false
    //     // Symbol : "BTC"
    //     // TotalCoinSupply : "21000000"
    //     // TotalCoinsFreeFloat : "N/A"
    //     // Url : "/coins/btc/overview"

    //     let id;
    //     for ([symbol, val] of Object.entries(data.Data)) {
    //       id = symbolIdMap[symbol];
    //       if (id) {
    //         // if (!result[m['TOSYMBOL']]) {
    //         //   result = {
    //         //     [m['DATA'           ]]: {}
    //         //   };
    //         // }
    //         // result[m['DATA']][id] = {
    //         //   [m['PRICE'            ]]: val.PRICE,
    //         // }
    //       }
    //       else {
    //         throw error;
    //       }
    //     }
    //   },
    //   saveHandler: () => {},
    // });

    // Price
    new Watcher({
      symbolIdMap,
      delay: 100,
      cacheArgs: [settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`, 'all'],
      formatHandler: formatterCryptocomparePrice,
      saveHandler: saveCryptocomparePrice,
    });

    //
    // Watch folder new files
    // Add files to queue to be parsed
    // Parse files
    //
    // const queue = new Set([]);
    // const delay = 100;
    // let files;
    // async function watchFolder() {

    //   logger.info('WatchFolder(): START ------------------------------------------- /');
    //   files = settings.cache.get(settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`, 'all');

    //   if (files[0] !== false) {

    //     // Add files to queue
    //     const len = Object.keys(files).length;
    //     if (len) {
    //       for (const [fileName, currentFile] of Object.entries(files)) {
    //         const fingerprint = JSON.stringify({[fileName]: currentFile});
    //         if (!queue.has(fingerprint)) {
    //           logger.info(`Adding to queue: ${fileName}`);
    //           queue.add(fingerprint);
    //         }
    //       }
    //     }

    //     // Parse queue items
    //     for (let itemStr of queue) {
    //       const itemObj = JSON.parse(itemStr);
    //       const fileName = Object.keys(itemObj)[0];
    //       const dataStr = itemObj[fileName];
    //       const dataObj = JSON.parse(dataStr);
    //       const timestamp = fileName.replace(/^cache.*<([0-9TZ:.-]*)>$/, '$1');
    //       const formattedData = formatterCryptocomparePrice(dataObj, symbolIdMap);
    //       const [error, saved] = await to(saveCryptocomparePrice(formattedData, timestamp));
    //       if (!!formattedData && saved) {
    //         logger.info(`Deleting file and removing from queue: ${fileName}`);
    //         queue.delete(itemStr);
    //         fs.unlink(fileName, async error => {
    //           if (error) {
    //             logger.error(`Unable to delete ${fileName}: ${error}`);
    //             debugger;
    //             throw error;
    //           }
    //         });
    //       }
    //       else {
    //         logger.error(`Error saving ${fileName}: ${error}`);
    //       }
    //     }

    //   }

    //   await commonDelay(delay);
    //   logger.info('WatchFolder(): END --------------------------------------------- /\n\n');
    //   watchFolder();
    // }
    // watchFolder();

    // TODO: parse data in queue
    //       stick in DB
    //       delete file

    return

    // //
    // // Helper data
    // //
    // const idSymbolMap = {};
    // const symbolIdMap = {};
    // const exchangePairVolumeData = {};
    // let cryptocompareList;
    // {
    //   const [file] = settings.cache.get(settings.keyCryptocompareList);
    //   cryptocompareList = JSON.parse(file).Data;
    //   for (const [symbol, data] of Object.entries(cryptocompareList)) {
    //     idSymbolMap[data.Id] = symbol;
    //     symbolIdMap[symbol] = data.Id;
    //   };
    //   for await (const obj of itterateCryptocompareExchangePairs()) {
    //     if (obj === false) break; // finished
    //     const [exchangePairString] = settings.cache.get(obj.key);
    //     const exchangePair = JSON.parse(exchangePairString);
    //     exchangePairVolumeData[`${obj.from}${obj.to}`] = exchangePair.RAW;
    //   }
    // }

    // //
    // // Fields
    // //
    // let social = {};
    // let snapshot = {};
    // let allCoins = {};
    // let fiatVolumeUSD;

    // for (const id of Object.keys(idSymbolMap)) {
    //   let [fileSocial]   = settings.cache.get(settings.tagKeyCryptocompareSocialstats`${id}`);
    //   let [fileSnapshot] = settings.cache.get(settings.tagKeyCryptocompareSnapshot`${id}`);
    //   social[id]   = JSON.parse(fileSocial);
    //   snapshot[id] = JSON.parse(fileSnapshot);
    //   allCoins[id] = cryptocompareList[idSymbolMap[id]];
    // }

    // social        = formatterCryptocompareSocialstats(social);
    // snapshot      = formatterCryptocompareSnapshot(snapshot);
    // allCoins      = formatterCryptocompareAllCoins(allCoins);
    // fiatVolumeUSD = formatterCryptocompareFiatVolumeUSD(exchangePairVolumeData, analyticsUSDCurrencyTable(), symbolIdMap);

    // const result = analyticsMergeDataByKey([allCoins, social, snapshot, fiatVolumeUSD]);
    // return result;
  }
  catch(error) {
    debugger;
    logger.error(`cryptocompare: ${error}`);
    return false;
  }
}
