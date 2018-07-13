// CryptoHub
const settings = require('../../settings');
const logger = require('../../logger');
const { commonDelay, itterateCryptocompareExchangePairs } = require('../../utils/');
const { logHeader } = require('../../utils.js'); // this utils needs to go yo
const { scrapeJSON } = require('../../utils/index.js');

module.exports = async function scrapeCryptocompare(cacheForDays, rateLimitDelayMs) {
  try {

    logHeader('Scraping cryptocompare.com');

    const coinList       = await scrapeJSON(settings.uriCryptocompareList,           settings.keyCryptocompareList,           cacheForDays);
    const exchanges      = await scrapeJSON(settings.uriCryptocompareExchanges,      settings.keyCryptocompareExchanges,      cacheForDays);
    const exchangeStatus = await scrapeJSON(settings.uriCryptocompareExchangeStatus, settings.keyCryptocompareExchangeStatus, cacheForDays);

    for await (const obj of itterateCryptocompareExchangePairs()) {
      await scrapeJSON(obj.uri, obj.key, cacheForDays);
      await commonDelay(rateLimitDelayMs);
    }

    const ids = Object.values(coinList.Data).map(v => v.Id);
    for (const id of ids) {
      logger.info(`ScrapeCryptocompare: Scraping ${id}`);
      await scrapeJSON(settings.tagUriCryptocompareSnapshot`${id}`,    settings.tagKeyCryptocompareSnapshot`${id}`,    cacheForDays);
      await commonDelay(rateLimitDelayMs);
      await scrapeJSON(settings.tagUriCryptocompareSocialstats`${id}`, settings.tagKeyCryptocompareSocialstats`${id}`, cacheForDays);
      await commonDelay(rateLimitDelayMs);
    }

    return true;
  }
  catch(error) {
    logger.error(`scrapeCryptocompare(): ${error}`);
    return {error: true, message: `scrapeCryptocompare(): ${error}`};
  }
}
