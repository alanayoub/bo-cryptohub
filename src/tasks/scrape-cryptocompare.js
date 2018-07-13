// Libs
const rp = require('request-promise');
const { to } = require('await-to-js');

// CryptoHub
const { logHeader } = require('../utils.js');
const {
  scrapeJSON,
  formatterCryptocompareSnapshot,
  formatterCryptocompareSocialstats
} = require('../utils/index.js');

module.exports = async function scrapeCryptocompare(cacheFor) {

  try {
    console.log(logHeader('Scraping cryptocompare.com'));
    const uri = 'https://min-api.cryptocompare.com/data/all/coinlist';
    const key = '/cryptocompare/coinlist/coinlist.json';
    const file = await scrapeJSON(uri, key, cacheFor);
    const ids = Object.values(file.Data).map(v => v.Id);

    let social;
    {
      const data = {};
      for (const id of ids) {
        const uri = `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`;
        const key = `/cryptocompare/socialstats/${id}.json`;
        data[id] = await scrapeJSON(uri, key, cacheFor);
      }
      social = formatterCryptocompareSocialstats(data);
    }

    let snapshot;
    {
      const data = {};
      for (const id of ids) {
        const uri = `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`;
        const key = `/cryptocompare/snapshot/${id}.json`;
        data[id] = await scrapeJSON(uri, key, cacheFor);
      }
      snapshot = formatterCryptocompareSnapshot(data);
    }

    return {
      social, snapshot
    };
  }
  catch(error) {
    console.log(`scrapeCryptocompare(): ${error}`);
    return {error: true, message: `scrapeCryptocompare(): ${error}`};
  }

}
