// Cryptohub
const logger = require('../logger');

/**
 *
 * EXCHANGES GENERAL
 *
 * @param {Object} response - response object
 * @param {String} timestamp - time data was received
 * @param {Object} bootstrapData - legacy bootstrap data (will be merged with appBootstrapData
 * @param {Object} addBootstrapData - data store for non row data
 * @param {String} fileName - file name of stored request
 * @param {String} event - type of event
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionExchangesGeneral(response, timestamp, bootstrapData, appBootstrapData, fileName, event) {
  try {

    const emptyReturn = {data: {}, timestamp};

    if ((!response && !response.Data) || response.Response !== 'Success') {
      return emptyReturn;
    }

    /**
     *
     * EXCHANGE MAPS
     *
     * response.Data: {
     *   2439: {
     *     Id:  "2439"
     *     Name:  "Kraken"
     *     Url: "/exchanges/kraken/overview"
     *     LogoUrl: "/media/35309563/kraken.png"
     *     ItemType: Array [5]
     *     CentralizationType: "Centralized"
     *     InternalName:  "Kraken"
     *     AffiliateUrl: "https://www.kraken.com"
     *     Country: "United States of America"
     *     OrderBook: true
     *     Trades: true
     *     Recommended: false
     *     Sponsored: false
     *   }
     * }
     *
     * output: {
     *   'Kraken': 2439,
     * }
     *
     * @param {Object} responseData
     * @return {Object}
     *
     */
    function maps(responseData) {
      const nameId = {};
      const idName = {};
      let id;
      let obj;
      for ([id, obj] of Object.entries(responseData)) {
        nameId[obj.Name] = id;
        idName[id] = obj.Name;
      }
      return { nameId, idName };
    }

    /**
     *
     * EXCHANGE DATA
     *
     * @param {Object} responseData
     * @return {Object}
     *
     */
    function data(responseData) {
      let id;
      let obj;
      let field;
      let output = {};
      let fields = [
        'Id',
        'Name',
        'Url',
        'LogoUrl',
        'ItemType',
        'CentralizationType',
        'Country'
      ];
      for ([id, obj] of Object.entries(responseData)) {
        output[id] = {};
        for (field of fields) {
          output[id][field] = obj[field];
        }
      }
      return output;
    }

    const output = {
      maps: maps(response.Data),
      data: data(response.Data)
    };

    return { data: output, timestamp };

  }
  catch(error) {
    debugger;
    const message = `formatterCryptocompareSectionExchangesGeneral(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
