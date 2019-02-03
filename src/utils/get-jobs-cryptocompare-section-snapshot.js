// Cryptohub
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsCryptocompareSectionSnapshot(queue, bootstrapData) {
  try {

    let jobs = 0;
    let counter = 0;
    const groupKey = settings.tagKeyCryptocompareSnapshotGrouped`${{}}`;
    const ids = Object.values(bootstrapData.coinList.Data).map(v => v.Id);
    const length = ids.length;
    for (const id of ids) {
      counter++;
      const last = counter === length;
      const uri = settings.tagUriCryptocompareSnapshot`${id}`;
      const key = settings.tagKeyCryptocompareSnapshot`${id}`;
      queue.push({uri, key, cacheForDays: settings.cacheForCryptocompare, groupKey, last});
      jobs++;
    }
    logger.info(`scrape-cryptocompare(): ${jobs} snapshot jobs created`);

  }
  catch(error) {
    const message = `getJobsCryptocompareSectionSnapshot(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
