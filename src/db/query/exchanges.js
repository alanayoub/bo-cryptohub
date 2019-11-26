import { ExchangeModel } from '../schema';

/**
 *
 * GET EXCHANGES
 *
 * @param {Array} columns
 * @param {String} sort
 * @returns {Object}
 *
 */
export default async function getExchanges() {

  const regex = '^'+[
    'exchange',
    // 'cryptohub-pairs',
    // 'cryptohub-cryptoCurrencies',
    // 'cryptohub-fiatCurrencies',
    // 'cryptohub-numberOfCryptoCurrencies',
    // 'cryptohub-numberOfCryptoPairs',
    // 'cryptohub-numberOfCurrencies',
    // 'cryptohub-numberOfFiatCurrencies',
    // 'cryptohub-numberOfFiatPairs',
    // 'cryptohub-numberOfPairs',
    // 'cryptohub-points'
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
