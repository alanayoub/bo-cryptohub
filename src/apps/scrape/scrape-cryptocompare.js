// CryptoHub
const settings = require('../../settings');
const logger = require('../../logger');
const { logHeader } = require('../../utils.js');
const { scrapeJSON } = require('../../utils/index.js');

module.exports = async function scrapeCryptocompare(cacheFor) {

  try {
    logHeader('Scraping cryptocompare.com');
    const uri = settings.uriCryptocompareList;
    const key = settings.keyCryptocompareList;
    const file = await scrapeJSON(uri, key, cacheFor);
    const ids = Object.values(file.Data).map(v => v.Id);
    for (const id of ids) {
      logger.info(`ScrpeCryptocompare: Scraping ${id}`);
      await scrapeJSON(settings.tagUriCryptocompareSocialstats`${id}`, `/cryptocompare/socialstats/${id}.json`, cacheFor);
      await scrapeJSON(settings.tagUriCryptocompareSnapshot`${id}`,    `/cryptocompare/snapshot/${id}.json`,    cacheFor);
    }
    return true;
  }
  catch(error) {
    logger.error(`scrapeCryptocompare(): ${error}`);
    return {error: true, message: `scrapeCryptocompare(): ${error}`};
  }

}
