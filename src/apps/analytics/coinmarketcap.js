// Node
const EventEmitter = require('events');

// Libs
const cheerio = require('cheerio');

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

    // https://api.coinmarketcap.com/v2/ticker/?start=0&limit=100&sort=id

    const cc = new DataStore();

    //
    // COINMARKETCAP LIST
    //
    // We should probably use the paginated api call instead of this, this only seems useful for the git urls (but check).
    // Also, we already have the git urls from cmc
    //
    const coinListWatcher = new Watcher({
      delay: 5000,
      cacheArgs: [settings.keyCoinmarketcapList, 'all'],
      handler: async (data, timestamp) => {

        const slugs = data.map(v => v.slug);
        const result = {};

        for (const item of data) {
          const slug = item.slug;
          const [file] = settings.cache.get(settings.tagKeyCoinmarketcapDetailsHTML`${slug}`);

          if (!file) {
            logger.warn(`Class Watcher: no file ${slug}`);
            continue;
          }

          const $ = cheerio.load(file);

          //
          // Github URLs
          //
          const urls = [];
          const githubs = $('a[href^="https://github"]').toArray();
          // Coinmarketcap doens't have all the github urls so we
          // can add some manually in settings
          if (global.githubOverrides[slug]) {
            urls.push(global.githubOverrides[slug]);
            if (githubs.length) {
              logger.warn(`Found a github url that didn't exist before. Maybe we can remove the override for ${slug}`);
            }
          }
          githubs.forEach(a => urls.push(a.attribs.href));

          result[item.id] = {
            githubUrls: Array.from(new Set(urls)),
            name: item.name,
            symbol: item.symbol,
            slug: item.slug,
          }

        }

        // const fData = formatterCryptocomparePrice(data, symbolIdMap);
        // const [error, saved] = await to(saveCryptocomparePrice(fData, timestamp));

        return {data: result, timestamp};
      }
    });
    coinListWatcher.on('data', ({data, timestamp}) => {
      cc.data = {name: 'coinList', data};
      logger.info('emiting coinList data');
    });

    return cc;

    //


    // const [file] = settings.cache.get(settings.keyCoinmarketcapList);
    // const json = JSON.parse(file).data;
    // const slugs = json.map(v => v.slug);
    // const result = {};

    // for (const item of json) {
    //   const slug = item.website_slug;
    //   const [file] = settings.cache.get(settings.tagKeyCoinmarketcapDetailsHTML`${slug}`);
    //   const $ = cheerio.load(file);

    //   //
    //   // Github URLs
    //   //
    //   const urls = [];
    //   const githubs = $('a[href^="https://github"]').toArray();
    //   // Coinmarketcap doens't have all the github urls so we
    //   // can add some manually in settings
    //   if (global.githubOverrides[slug]) {
    //     urls.push(global.githubOverrides[slug]);
    //     if (githubs.length) {
    //       logger.warn(`Found a github url that didn't exist before. Maybe we can remove the override for ${slug}`);
    //     }
    //   }
    //   githubs.forEach(a => urls.push(a.attribs.href));

    //   result[item.id] = {
    //     githubUrls: Array.from(new Set(urls)),
    //     name: item.name,
    //     symbol: item.symbol,
    //     website_slug: item.website_slug,
    //   }

    // }

    // // const result = analyticsMergeDataByKey([githubUrls]);
    // return result;
  }
  catch(error) {
    debugger;
    logger.error(`coinmarketcap: ${error}`);
    return false;
  }
}




