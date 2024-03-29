import logger from '../../logger';
import { mapSave, exchangeSave } from '../../db/save';

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
 * @param {Object} responseData - request response data
 * @returns {Object} nameId and idName mappings
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
 * @param {Object} responseData - request response data
 * @returns {Object} formatted data
 *
 */
function data(responseData) {
  let id;
  let obj;
  let field;
  let output = {};
  let fields = [
    'CentralizationType',
    'Country',
    'Id',
    'ItemType',
    'LogoUrl',
    'Name',
    'Url',
    'InternalName',
    'GradePoints',
    'Grade',
    'AffiliateUrl',
    'OrderBook',
    'Trades',
    'Description',
    'FullAddress',
    'Fees',
    'DepositMethods',
    'Sponsored',
    'Recommended',
    'SortOrder',
    'TOTALVOLUME24HBTC',
    'DISPLAYTOTALVOLUME24HBTC'
  ];
  for ([id, obj] of Object.entries(responseData)) {
    output[id] = {};
    for (field of fields) {
      output[id][`cc-${field}`] = obj[field];
    }
  }
  return output;
}

/**
 *
 * EXCHANGES GENERAL
 *
 * @param {Object} response - response object
 * @param {String} timestamp - time data was received
 * @returns {Object} formatted data and timestamp
 *
 */
export default async function formatterCryptocompareSectionExchangesGeneral(response, timestamp) {
  try {

    const emptyReturn = {data: {}, timestamp};

    if (!response && !response.Data || response.Response !== 'Success') {
      return emptyReturn;
    }

    const output = {
      maps: maps(response.Data),
      data: data(response.Data)
    };

    if (output.data) await exchangeSave(output.data);
    if (output.maps.nameId) await mapSave('exchangeMapNameId', JSON.stringify(output.maps.nameId));
    if (output.maps.idName) await mapSave('exchangeMapIdName', JSON.stringify(output.maps.idName));

    return { data: output, timestamp };

  }
  catch (error) {
    const message = `formatterCryptocompareSectionExchangesGeneral(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
