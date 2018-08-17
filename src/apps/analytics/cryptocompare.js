// Node
const fs = require('fs');
const EventEmitter = require('events');

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

function isObject(object) {
  return Object.prototype.toString.call(object) === '[object Object]';
}

/**
 *
 * Watch a folder for files
 * Parse and save file data via handlers
 * Delete files
 *
 */
class Watcher extends EventEmitter {

  constructor(options) {
    super();
    this.options = options;
    this.queue = new Set([]);
    this.delay = options.delay || 1000;
    this.deleteFiles = options.deleteFiles === false ? false : true; // For debugging purposes
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
    const handler = this.options.handler;
    for (let itemStr of this.queue) {
      const itemObj = JSON.parse(itemStr);
      const fileName = Object.keys(itemObj)[0];
      const dataStr = itemObj[fileName];
      const dataObj = JSON.parse(dataStr);
      const timestamp = fileName.replace(/^cache.*<([0-9TZ:.-]*)>$/, '$1');
      const [error, data] = await to(handler(dataObj, timestamp));
      this.emit('data', data);
      if (data) {
        logger.info(`Deleting file and removing from queue: ${fileName}`);
        this.queue.delete(itemStr);
        if (this.deleteFiles) {
          fs.unlink(fileName, async error => {
            if (error) {
              logger.error(`Unable to delete ${fileName}: ${error}`);
              debugger;
              throw error;
            }
          });
        }
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
 */
class CryptocompareData extends EventEmitter {

  constructor() {
    super();
    this.cc;
    this.db = {};
  }

  mergeData() {
    const dataArray = Object.values(this.db);
    this.cc = analyticsMergeDataByKey(dataArray);
    this.emit('data', this.cc);
  }

  set data({name, data}) {
    if (!isObject(data)) {
      const msg = 'CryptocompareData: Trying to set non Object data';
      logger.error(msg);
      throw new Error(msg);
    }
    this.db[name] = data;
    this.mergeData();
  }

  get data() {
    return this.cc;
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
  return {data, timestamp};

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

    const cc = new CryptocompareData();

    const db = {
      price: {},
      coinList: {},
      snapshot: {},
      exchanges: {},
      socialStats: {},
      exchangePairs: {},
      exchangeStatus: {},
    };

    //
    // HELPER DATA
    //
    //
    //
    const idSymbolMap = {};
    const symbolIdMap = {};
    let cryptocompareList;
    {
      const [coinList] = settings.cache.get(settings.keyCryptocompareList);
      if (!coinList) {
        throw new Error('cryptocompare(): No coinList available. Probably need to run scrape');
      };
      cryptocompareList = JSON.parse(coinList).Data;
      for (const [symbol, data] of Object.entries(cryptocompareList)) {
        idSymbolMap[data.Id] = symbol;
        symbolIdMap[symbol] = data.Id;
      };
    }

    //
    // COINLIST
    //
    // Original Data
    // -------------
    //
    // Algorithm            : "SHA256"
    // BuiltOn              : "N/A"
    // CoinName             : "Bitcoin"
    // FullName             : "Bitcoin (BTC)"
    // FullyPremined        : "0"
    // Id                   : "1182"
    // ImageUrl             : "/media/19633/btc.png"
    // IsTrading            : true
    // Name                 : "BTC"
    // PreMinedValue        : "N/A"
    // ProofType            : "PoW"
    // SmartContractAddress : "N/A"
    // SortOrder            : "1"
    // Sponsored            : false
    // Symbol               : "BTC"
    // TotalCoinSupply      : "21000000"
    // TotalCoinsFreeFloat  : "N/A"
    // Url                  : "/coins/btc/overview"
    //
    // Prefix fields with "cc-coinlist-"
    // ----------------------------------
    // Algorithm -> cc-coinlist-Algorithm
    //
    const coinListWatcher = new Watcher({
      delay: 1000,
      cacheArgs: [settings.keyCryptocompareList, 'all'],
      handler: async (data, timestamp) => {
        let obj, key, val, id;
        const prefix = 'cc-coinlist-';
        const dataObj = data.Data;
        const result = {};
        for (id of Object.keys(idSymbolMap)) {
          obj = {};
          for ([key, val] of Object.entries(dataObj[idSymbolMap[id]])) {
            // if (val.split('/')[3] == 'boom.png') debugger;
            // if (val === '/media/20208/boom.png') debugger;
            if (key === 'SortOrder') {
                val = +val; // Make SortOrder numeric
                // if (isNaN(val)) debugger;
            }
            obj[`${prefix}${key}`] = val;
            if (key === 'SortOrder' && isNaN(obj[`${prefix}${key}`])) debugger;

          }
          result[id] = obj;
        }
        return {data: result, timestamp};
      },
    });
    coinListWatcher.on('data', ({data, timestamp}) => {
      db.coinList = {data, timestamp};
      cc.data = {name: 'coinList', data};
      logger.info('emiting coinList data');
    });

    //
    // PRICE
    //
    //
    //
    const priceWatcher = new Watcher({
      delay: 100,
      cacheArgs: [settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`, 'all'],
      handler: async (data, timestamp) => {
        const fData = formatterCryptocomparePrice(data, symbolIdMap);
        const [error, saved] = await to(saveCryptocomparePrice(fData, timestamp));
        return {data: fData, timestamp};
      }
    });
    priceWatcher.on('data', ({data, timestamp}) => {
      db.price = {data, timestamp};
      cc.data = {name: 'price', data};
      logger.info('emiting price data');
    });

    //
    // SNAPSHOT
    //
    // Original Data
    // -------------
    //
    // General
    //
    // Algorithm                 : "SHA256"
    // BaseAngularUrl            : "/coins/btc/"
    // BlockNumber               : 532714
    // BlockReward               : 12.5
    // BlockRewardReduction      : "50%"
    // BlockTime                 : 600
    // DangerTop                 : ""
    // Description               : "<p>Bitcoin uses peer-to-peer technology to operate!...</p>"
    // DifficultyAdjustment      : "2016 blocks"
    // DocumentType              : "Webpagecoinp"
    // Features                  : "<p><strong>Mobile payments made easy</strong>...</p>"
    // H1Text                    : "Bitcoin (BTC)"
    // Id                        : "1182"
    // ImageUrl                  : "/media/19633/btc.png"
    // IndividualSponsor         : {Text: "Trade Now!", Link: "https://ad.doubleclick.net", AffiliateLogo: "/media/34333440/etoro.png", ExcludedCountries: ""}
    // InfoTop                   : ""
    // LastBlockExplorerUpdateTS : 1532046992
    // Name                      : "Bitcoin"
    // NetHashesPerSecond        : 37070937121.61908
    // PreviousTotalCoinsMined   : 0
    // ProofType                 : "PoW"
    // Sponsor                   : {TextTop: "", Link: "https://goo.gl/x2wT5k", ImageUrl: "/media/34077388/100x65.gif"}
    // StartDate                 : "03/01/2009"
    // Symbol                    : "BTC"
    // Technology                : "<p><strong>Balances - block chain</strong>...</p>"
    // TotalCoinSupply           : "21000000"
    // TotalCoinsMined           : 17158925
    // Twitter                   : ""
    // Url                       : "/coins/btc/"
    // WarningTop                : ""
    // Website                   : "<a href='https://bitcoin.org/en/' target='_blank'>Bitcoin</a>"
    // WebsiteUrl                : "https://bitcoin.org/en/"
    //
    // SEO
    //
    // BaseImageUrl              : "https://www.cryptocompare.com"
    // BaseUrl                   : "https://www.cryptocompare.com"
    // OgImageHeight             : "300"
    // OgImageUrl                : "/media/19633/btc.png"
    // OgImageWidth              : "300"
    // PageDescription           : "Live Bitcoin prices from ..."
    // PageTitle                 : "Bitcoin (BTC) - Live Bitcoin price and market cap"
    //
    // ICO
    //
    // Status                    : "N/A"
    // WhitePaper                : "-"
    //
    //
    // Prefix fields with "cc-snapshot-[parent node]"
    // ----------------------------------------------
    // Algorithm -> cc-snapshot-General-Algorithm
    // BaseImageUrl -> cc-snapshot-SEO-BaseImageUrl
    //
    //
    // Cryptohub fields
    // ----------------
    // cryptohub-NumberOfPairs
    // cryptohub-NumberOfExchanges
    //
    const snapshotWatcher = new Watcher({
      delay: 100,
      deleteFiles: false,
      cacheArgs: [settings.tagKeyCryptocompareSnapshotGrouped`${{}}`, 'all'],
      handler: async (data, timestamp) => {
        data = formatterCryptocompareSnapshot(data);
        return {data, timestamp};
      },
    });
    snapshotWatcher.on('data', ({data, timestamp}) => {
      db.snapshot = {data, timestamp};
      cc.data = {name: 'snapshot', data};
      logger.info('emiting snapshot data');
    });

    return cc;

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
