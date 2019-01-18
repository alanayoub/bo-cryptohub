/**
 *
 * Data Handler
 * Gets called everytime the data is updated
 *
 * @param {Array} data
 *
 */
const logger   = require.main.require('./logger');
const settings = require.main.require('./settings');
module.exports = function dataHandler(data) {
  try {

    //
    // Backfill data
    //
    // When running a new instance of app-analytics the datastore starts off empty.
    // Some data takes longer to scrape than other therefore some items in the
    // datastore will stay empty for a while. To prevent this we backfill the datastore
    // with the last output datasource if any of the stores are empty
    //
    function arrayToObject(data, field) {
      var objData = {};
      for (let obj of data) {
        objData[obj[field]] = obj;
      }
      return objData;
    }
    function isEmptyObject(obj) {
      return Object.keys(obj).length;
    }
    if (!isEmptyObject(data)) {
      [ data ] = settings.cache.get(settings.keyCryptohubAnalyticsOut);
      data = JSON.parse(data);
      data = arrayToObject(data, 'cc-coinlist-Id');
    }

    const btcId = 1182;
    const btcItem = data[btcId];
    let btcPrice;
    if (btcItem) {
      btcPrice = btcItem['cc-price-PRICE'];
    }
    let ccRank;
    let ccRankTimestamp
    let ccPrice;
    let totalSupply;
    let circulatingSupply;
    for (let [key, item] of Object.entries(data)) {
      if (
           item['cc-coinlist-IsTrading']     === false
        || item['cc-price-TOTALVOLUME24HTO'] === 0
        || item['cc-price-PRICE']            === void 0
      ) {
        delete data[key];
      }
      else {
        ccRank  = item['cc-coinlist-SortOrder'] || 10000;
        ccRankTimestamp = item['cc-coinlist-SortOrder-timestamp'];
        ccPrice = item['cc-price-PRICE'];
        totalSupply = item['cc-coinlist-TotalCoinSupply'];
        circulatingSupply = item['cc-price-SUPPLY'];
        item['cryptohub-rank'] = ccRank;
        item['cryptohub-rank-timestamp'] = ccRankTimestamp;
        item['cryptohub-circulating-percent-total'] = (circulatingSupply / totalSupply) * 100;
        item['cryptohub-circulating-percent-total-timestamp'] = ccRankTimestamp;
        if (btcPrice && ccPrice) {
          item['cryptohub-price-btc'] = 1 / (btcPrice / ccPrice);
          item['cryptohub-price-btc-timestamp'] = item['cc-price-PRICE-timestamp'];
        }
      }
    }

    const arrayData = [];
    for (let [id, obj] of Object.entries(data)) {
      obj.id = obj.Id;
      arrayData.push(obj);
    }

    settings.cache.set(settings.keyCryptohubAnalyticsTmp, JSON.stringify(arrayData));

  }
  catch(error) {
    const message = `dataHandler(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
