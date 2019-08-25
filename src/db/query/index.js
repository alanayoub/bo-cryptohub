'use strict';

// Binary Overdose
import getRows                                     from './rows';
import getBtc                                      from './btc';
import getIds                                      from './ids';
import { PerSecondModel, MapModel, ExchangeModel } from '../schema';
import { columnDependencies }                      from '../../settings';

/**
 *
 * GET MESSARI SYMBOLS
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
async function getMessariSymbols() {

  const query = {_id: {$regex: 'm-markets-base'}};
  const data = await PerSecondModel.find(query).lean();
  const symbols = new Set();

  for (const obj of Object.values(data)) {
    symbols.add(obj.samples[1][1]);
  }

  const output = Array.from(symbols);

  return output;

}

/**
 *
 * GET MAPS
 *
 * @param {Array} ids
 * @return {Object}
 *
 */
async function getMaps(ids) {

  if (!Array.isArray(ids)) ids = [ids];

  const query = {_id: {$regex: ids.join('|')}};
  let maps = await MapModel.find(query).lean();

  if (!Array.isArray(maps)) maps = [maps];

  for (const item of maps) {
    if (typeof item.map === 'string') {
      item.map = JSON.parse(item.map);
    }
  }

  return maps;

}

/**
 *
 * GET EXCHANGES
 *
 * @param {Array} columns
 * @param {String} sort
 * @return {Object}
 *
 */
async function getExchanges() {

  const regex = '^'+[
    'exchange',
    'cryptohub-pairs',
    'cryptohub-cryptoCurrencies',
    'cryptohub-fiatCurrencies',
    'cryptohub-numberOfCryptoCurrencies',
    'cryptohub-numberOfCryptoPairs',
    'cryptohub-numberOfCurrencies',
    'cryptohub-numberOfFiatCurrencies',
    'cryptohub-numberOfFiatPairs',
    'cryptohub-numberOfPairs',
    'cryptohub-points',
  ].join('|^');

  const query = {
    _id: {$regex: regex}
  }

  const data = await ExchangeModel.find(query).lean();

  let id;
  let item;
  const output = {};
  for (item of data) {
    id = item._id.split(':')[1];
    if (!output[id]) output[id] = {};
    output[id] = item;
  }

  return output;

}

/**
 *
 * GET CURRENCIES
 *
 * @return {Object}
 *
 */
async function getCurrencies() {

  const query = {
    _id: {$regex: "xe-"}
  }

  const data = await PerSecondModel.find(query).lean();

  let id;
  let field;
  const output = {};
  for (const item of data) {
    [field, id] = item._id.split(':');
    if (!output[id]) output[id] = {};
    output[id][field] = item.samples[1][1];
  }

  return output;

}

export {
  getBtc,
  getIds,
  getMaps,
  getRows,
  getExchanges,
  getMessariSymbols,
  getCurrencies,
}
