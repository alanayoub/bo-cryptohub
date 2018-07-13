// Libs
const cheerio = require('cheerio');

// CryptoHub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');
const { analyticsMergeDataByKey } = require.main.require('./utils/');

/**
 *
 * Parse coinmarketcap data
 * @return {Object}
 *
 */
module.exports = async function coinmarketcap() {
  try {

    const [file] = settings.cache.get(settings.keyCoinmarketcapList);
    const json = JSON.parse(file).data;
    const slugs = json.map(v => v.slug);
    const result = {};

    for (const item of json) {
      const slug = item.website_slug;
      const [file] = settings.cache.get(settings.tagKeyCoinmarketcapDetailsHTML`${slug}`);
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
        website_slug: item.website_slug,
      }

    }

    // const result = analyticsMergeDataByKey([githubUrls]);
    return result;
  }
  catch(error) {
    debugger;
    logger.error(`coinmarketcap: ${error}`);
    return false;
  }
}




