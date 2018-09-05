// Libs
const { to }        = require('await-to-js');
const cheerio       = require('cheerio');

// CryptoHub
require('./settings');
require('./db-connect');
const logger        = require.main.require('./logger');
const settings      = require.main.require('./settings');
const cryptocompare = require.main.require('./apps/analytics/cryptocompare');
const coinmarketcap = require.main.require('./apps/analytics/coinmarketcap');
const {
  analyticsMapCmcToCc,
  commonSwapObjectKeys,
  analyticsMergeDataByKey, // TODO: make this function common?
  classDataStore:DataStore,
}                   = require.main.require('./utils/');

process.on('warning', error => {
  logger.warn(error.stack);
});

//
// 1. Parse all the data that has been scraped and convert into a single json document
// 2. Update the document as data changes
// 3. Make the document available through a socket
//
(async function() {

  try {

    logger.info('Starting Analytics');
    const dataStore = new DataStore((dataArray, db) => { // merge handler
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
    });

    let cc = await cryptocompare();
    let ccLength;
    cc.on('data', data => {
      ccLength = Object.keys(data).length;
      dataStore.data = {name: 'cryptocompare', data};
    });

    // let cmc = await coinmarketcap();
    // let cmcLength;
    // cmc.on('data', data => {
    //   cmcLength = Object.keys(data).length;
    //   dataStore.data = {name: 'coinmarketcap', data};
    // });

    dataStore.on('data', data => {
      const btcId = 1182;
      const btcItem = data[btcId];
      const btcPrice = btcItem['cc-price-PRICE'];
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
          item['cryptohub-price-btc'] = 1 / (btcPrice / ccPrice);
        }
      }

      // convert data to array
      const arrayData = [];
      for (let [id, obj] of Object.entries(data)) {
        obj.id = obj.Id;
        arrayData.push(obj);
      }

      settings.cache.set(settings.keyCryptohubAnalyticsTmp, JSON.stringify(arrayData));
    });

    return
    // let cmc = await coinmarketcap();
    // let map = analyticsMapCmcToCc(cmc, cc);
    // cmc = commonSwapObjectKeys(cmc, map);

    // let json = analyticsMergeDataByKey([cc, cmc]);
    // settings.cache.set(settings.keyCryptohubAnalyticsTmp, json);



    //
    // Shouldn't change, fetch every month
    // -----------------------------------------------------------
    //

    // Algorithm: "SHA256"
    // Coin Name: "Bitcoin"
    // Full Name: "Bitcoin (BTC)"
    // Fully Premined: "0"
    // ICO: "N/A"
    // ImageUrl: "/media/19633/btc.png"
    // Pre Mined Value: "N/A"
    // Proof Type: "PoW"
    // Start Date: "03/01/2009"
    // Total Coin Supply: "21000000"
    // Symbol: "BTC"
    // Url: "/coins/btc/overview"
    // githubUrls: ["https://github.com/bitcoin/"]
    // website_slug: "bitcoin"
    // symbol: "BTC"

    //
    // We only care about changes every day or week
    // --------------------------------------------------------
    //
    // Cryptocompare Code Repository Points: 95493
    // Cryptocompare Comments: "145549"
    // Cryptocompare Followers: 56955
    // Cryptocompare General Points: 5652853
    // Cryptocompare Page Views: 31740544
    // Cryptocompare Points: 4500265
    // Cryptocompare Posts: "64836"
    // Reddit Active Users: 19776
    // Reddit Comments Per Day: 2573.73
    // Reddit Community Creation: "1284042626"
    // Reddit Points: 925441
    // Reddit Posts Per Day: "151.41"
    // Reddit Subscribers: 860966
    // Twitter Account Creation: "1313643968"
    // Twitter Followers: 844049
    // Twitter Points: 91055
    // Twitter Statuses: 20316
    // Number of Exchanges: 98
    // Number of Pairs: 412


    //
    // What is this?
    // ----------------------------------------
    // Is Trading: true
    // Name: "BTC"
    // name: "Bitcoin"
    // SortOrder: "1"
    // Total Coins Free Float: "N/A"
    //

    //
    // Update every 2 seconds (or at max speed)
    // ----------------------------------------
    //
    // Fiat Volume USD: 109702867.40686625
    // Net Hashes Per Second: 35367482835.79367
    // Total coins Minted: 17094387

    // ATH
    // ATH 1 month
    // ATH 3 month
    // ATH 6 month
    // ATL
    // ATL 1 month
    // ATL 3 month
    // ATL 6 month

    // Rank
    // Mark
    // Name
    // Symbol
    // Price USD
    // Price BTC
    // 24h Volume USD
    // Market Cap USD
    // Circulating Supply
    // Total Supply
    // Circulating Supply %
    // Max Supply
    // Percent Change 1h
    // Percent Change 24h
    // Percent Change 7d
    // 24h Volume Btc
    // Market Cap Btc
    // Market Cap $
    // $ value per RP
    // $ value per GP
    // Code Repo Points
    // General Points
    // Algorithm
    // Proof
    // Years old
    // Hashes Per Second
    // ICO
    // Number of Pairs
    // Number of Exchanges
    // Instamine
    // Premine
    // Tags

  }

  catch(error) {

    logger.error(`Um some error happened yo: ${error}`);
    debugger
    process.exit(1);

  }

})();
