// Node
const EventEmitter = require('events');

// Libs
const cheerio = require('cheerio');
const flatten = require('flat');

// CryptoHub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');
const {
  classWatcher:Watcher,
  classDataStore:DataStore,
} = require.main.require('./utils/');

/**
 *
 * Parse coinmarketcap data
 * @return {Object}
 *
 */
module.exports = async function coinmarketcap() {
  try {

    const cc = new DataStore();
    const prefix = 'cmc-';

    //
    // COINMARKETCAP COINLIST
    //
    // Original Data prefixed with "cmc-"
    // -----------------------------------
    //
    // cmc-circulating_supply             : 17229712
    // cmc-id                             : 1
    // cmc-last_updated                   : 1535190141
    // cmc-max_supply                     : 21000000
    // cmc-name                           : "Bitcoin"
    // cmc-quotes.USD.market_cap          : 115968369271
    // cmc-quotes.USD.percent_change_1h   : 0.16
    // cmc-quotes.USD.percent_change_7d   : 3.5
    // cmc-quotes.USD.percent_change_24h  : 2.79
    // cmc-quotes.USD.price               : 6730.72012293
    // cmc-quotes.USD.volume_24h          : 4153097746.2317
    // cmc-rank                           : 1
    // cmc-symbol                         : "BTC"
    // cmc-total_supply                   : 17229712
    // cmc-website_slug                   : "bitcoin"
    //
    const coinListWatcher = new Watcher({
      delay: 5000,
      cacheArgs: [settings.tagKeyCoinmarketcapTickerGrouped`${{}}`, 'all'],
      handler: async (data, timestamp) => {
        let result = {};
        let valuesWithPrefixes;
        for (let req of Object.values(data)) {
          if (req.data) {
            for (let [key, val] of Object.entries(req.data)) {
              valuesWithPrefixes = {};
              for (let [k, v] of Object.entries(val)) {
                valuesWithPrefixes[`${prefix}${k}`] = v;
              }
              result[key] = flatten(valuesWithPrefixes, {delimiter: '-'});
            }
          }
        }
        return {data: result, timestamp};
      }
    });
    coinListWatcher.on('data', ({data, timestamp}) => {
      cc.data = {name: 'coinList', data};
      logger.info('emiting Coinmarketcap coinList data');
    });


    // //
    // // COINMARKETCAP LIST - not using API
    // //
    // // This fetches all the html pages so keep incase we need to scrape stuff from them
    // //
    // const coinListWatcher = new Watcher({
    //   delay: 5000,
    //   cacheArgs: [settings.keyCoinmarketcapList, 'all'],
    //   handler: async (data, timestamp) => {

    //     const slugs = data.map(v => v.slug);
    //     const result = {};

    //     for (const item of data) {
    //       const slug = item.slug;
    //       const [file] = settings.cache.get(settings.tagKeyCoinmarketcapDetailsHTML`${slug}`);

    //       if (!file) {
    //         logger.warn(`Class Watcher: no file ${slug}`);
    //         continue;
    //       }

    //       const $ = cheerio.load(file);

    //       //
    //       // Github URLs
    //       //
    //       const urls = [];
    //       const githubs = $('a[href^="https://github"]').toArray();
    //       // Coinmarketcap doens't have all the github urls so we
    //       // can add some manually in settings
    //       if (global.githubOverrides[slug]) {
    //         urls.push(global.githubOverrides[slug]);
    //         if (githubs.length) {
    //           logger.warn(`Found a github url that didn't exist before. Maybe we can remove the override for ${slug}`);
    //         }
    //       }
    //       githubs.forEach(a => urls.push(a.attribs.href));

    //       result[item.id] = {
    //         githubUrls: Array.from(new Set(urls)),
    //         name: item.name,
    //         symbol: item.symbol,
    //         slug: item.slug,
    //       }

    //     }

    //     // const fData = formatterCryptocomparePrice(data, symbolIdMap);
    //     // const [error, saved] = await to(saveCryptocomparePrice(fData, timestamp));

    //     return {data: result, timestamp};
    //   }
    // });
    // coinListWatcher.on('data', ({data, timestamp}) => {
    //   cc.data = {name: 'coinList', data};
    //   logger.info('emiting coinList data');
    // });

    return cc;

  }
  catch(error) {
    debugger;
    logger.error(`coinmarketcap: ${error}`);
    return false;
  }
}




