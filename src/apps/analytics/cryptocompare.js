// Node
const fs = require('fs');

// Libs
const { to } = require('await-to-js');

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
 * This function is currently still in a test state
 *
 */
const saveToDB = async function(data, timestamp) {

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
      [m['TYPE']]:       data[m['TYPE']],
      [m['FLAGS']]:      data[m['FLAGS']],
      [m['MARKET']]:     data[m['MARKET']],
      [m['TOSYMBOL']]:   data[m['TOSYMBOL']],
      [m['SYMBOLID']]:   data[m['SYMBOLID']],
      [m['FROMSYMBOL']]: data[m['FROMSYMBOL']],
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
    debugger
    return {error: true, message: error};
    console.log(`saveToDB() error saving new data : ${error}`);
  }
  else {
    console.log(`saveToDB(): Saved new data`);
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

    //
    // Watch folder x and y folders for new files
    // Currently just watching price folder, this is a test
    //

    const queue = new Set([]);
    const delay = 100;
    let files;
    const parseData = async (data, fileName) => {
      logger.info(`parsing ${fileName}`);
      data = JSON.parse(data);
      const timestamp = fileName.replace(/^cache.*<([0-9TZ:.-]*)>$/, '$1');
      const parsedData = formatterCryptocomparePrice(data, symbolIdMap);
      const saved = saveToDB(parsedData, timestamp);
      return !!parsedData;
    };
    //
    setInterval(() => {

      files = settings.cache.get(settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`, 'all');
      if (files[0] === false) return;

      // Add files to queue
      const len = Object.keys(files).length;
      if (len) {
        for (const [fileName, currentFile] of Object.entries(files)) {
          logger.info(`Adding to queue: ${fileName}`);
          const fingerprint = JSON.stringify({[fileName]: currentFile});
          if (!queue.has(fingerprint)) {
            queue.add(fingerprint);
          }
        }
      }

      // Parse queue items
      for (let item of queue) {
        const obj = JSON.parse(item);
        const fileName = Object.keys(obj)[0];
        const data = obj[fileName];
        const parsedOK = parseData(data, fileName);
        if (parsedOK) {
          queue.delete(item);
          fs.unlink(fileName, error => {
            if (error) {
              throw error;
            }
          });
        }
        else {
          // try again
        }
      }

    }, delay);

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
