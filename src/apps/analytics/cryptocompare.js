// Node
const EventEmitter = require('events');

// Libs
const { to } = require('await-to-js');

// CryptoHub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');
const {
  classWatcher:Watcher,
  classDataStore:DataStore,
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

// /**
//  *
//  * This function is currently still in a test state
//  *
//  * NOTE: testing some queries
//  * db.timeseriesfasts.find({}, {'D.1182.P', 1}).sort({_id: -1}).limit(5)
//  *
//  *
//  */
// const saveCryptocomparePrice = async function(data, timestamp) {
//   return {data, timestamp};

//   const pad = n => `0${n}`.substr(-2);
//   const date = new Date(timestamp);
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDay();
//   const hour = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   const _id = year + pad(month) + pad(day) + pad(hour) + pad(minutes) + pad(seconds);

//   const query = {
//     _id,
//   };

//   const update = {
//     $set: {
//       [m['_id']]:        _id,
//       [m['MARKET']]:     data[m['MARKET']],
//       [m['TOSYMBOL']]:   data[m['TOSYMBOL']],
//     },
//   };

//   let path;
//   for (let [id, val] of Object.entries(data[m['DATA']])) {
//     path = `${m['DATA']}.${id}`;
//     update.$set[path] = val;
//   }

//   const options = {
//     new: true,    // true to return the modified document rather than the original. defaults to false
//     upsert: true, // creates the object if it doesn't exist. defaults to false.
//   };

//   const [error, timeseries] = await to(TimeseriesFast.findOneAndUpdate(query, update, options).exec());
//   if (error) {
//     logger.error(`saveCryptocomparePrice() error saving new data : ${error}`);
//     return {error: true, message: error};
//   }
//   else {
//     logger.info(`saveCryptocomparePrice(): Saved new data`);
//     return true;
//   }

// }

/**
 *
 * Parse cryptocompare data
 * @return {Object}
 *
 */
module.exports = async function cryptocompare() {
  try {

    const cc = new DataStore();

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
            if (key === 'SortOrder') {
              val = +val; // Make SortOrder numeric
            }
            obj[`${prefix}${key}`] = val;
            if (key === 'SortOrder' && isNaN(obj[`${prefix}${key}`])) debugger;
          }
          result[id] = obj;
        }
        return {data: result, timestamp};
      },
    });
    cc.data = {name: 'coinList', data: {}};
    coinListWatcher.on('data', ({data, timestamp}) => {
      cc.data = {name: 'coinList', data};
      logger.debug('cryptocompare.js: emiting coinList data');
    });

    //
    // PRICE
    //
    // Original Data
    // -------------
    //
    // TYPE:  "5"
    // MARKET:  "CCCAGG"
    // FROMSYMBOL:  "BTC"
    // TOSYMBOL:  "USD"
    // FLAGS:  "4"
    // PRICE: 6429.49
    // LASTUPDATE: 1536222722
    // LASTVOLUME: 0.005
    // LASTVOLUMETO: 32.1245925
    // LASTTRADEID:  "290332570"
    // VOLUMEDAY: 73331.62846431609
    // VOLUMEDAYTO: 473214413.3407818
    // VOLUME24HOUR: 164542.97725276044
    // VOLUME24HOURTO: 1115586462.295549
    // OPENDAY: 6705.03
    // HIGHDAY: 6727.19
    // LOWDAY: 6295.11
    // OPEN24HOUR: 7385.55
    // HIGH24HOUR: 7388.15
    // LOW24HOUR: 6289.93
    // LASTMARKET:  "Bitfinex"
    // CHANGE24HOUR: -956.0600000000004
    // CHANGEPCT24HOUR: -12.945007480824048
    // CHANGEDAY: -275.53999999999996
    // CHANGEPCTDAY: -4.109452157559324
    // SUPPLY: 17252100
    // MKTCAP: 110922204429
    // TOTALVOLUME24H: 471769.84240143484
    // TOTALVOLUME24HTO: 3090898519.5002995
    //
    // Prefix fields with "cc-price-"
    // ----------------------------------------------
    // PRICE -> cc-price-PRICE
    //
    const priceWatcher = new Watcher({
      delay: 100,
      cacheArgs: [settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`, 'all'],
      handler: async (data, timestamp) => {
        const fData = formatterCryptocomparePrice(data, symbolIdMap);
        // const [error, saved] = await to(saveCryptocomparePrice(fData, timestamp));
        return {data: fData, timestamp};
      }
    });
    cc.data = {name: 'price', data: {}};
    priceWatcher.on('data', ({data, timestamp}) => {
      cc.data = {name: 'price', data};
      logger.debug('cryptocompare.js: emiting price data');
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
      cacheArgs: [settings.tagKeyCryptocompareSnapshotGrouped`${{}}`, 'all'],
      handler: async (data, timestamp) => {
        data = formatterCryptocompareSnapshot(data);
        return {data, timestamp};
      },
    });
    cc.data = {name: 'snapshot', data: {}};
    snapshotWatcher.on('data', ({data, timestamp}) => {
      cc.data = {name: 'snapshot', data};
      logger.debug('cryptocompare.js: emiting snapshot data');
    });

    return cc;

    // Calculate exchange points
    //   for each exchange:
    //     for each crypto:
    //       get the number of exchanges it's on crypto1:100, crypto2:10, crypto3:1 = 111 points
    //       get the number of different fiat currencies accepted. points? 10 points per fiat pair? or 2 points?
    //       get the total number of pairs. points? 1 point per pair?

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
    logger.error(`cryptocompare.js: ${error}`);
    return false;
  }
}
