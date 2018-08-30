// Cryptohub
const logger = require.main.require('./logger');

/**
 *
 * Map Coinmarketcap ids to Cryptocompare ids
 * @param {Object} cmc
 * @param {Object} cc
 * @return {Object} mapping
 *
 */
module.exports = function mapCMCToCC(cmc, cc) {

  try {

    const map = {};
    let regexIgnoreSpace     = /\s/g;
    let regexNonAlphaNumeric = /\W+/g;
    let symbol1, symbol2, symbol2b, name1, name2;

    for (let [k1, v1] of Object.entries(cmc)) {

      [symbol1, name1] = [v1['cmc-symbol'], v1['cmc-name']];
      name1 = name1.trim().replace(regexIgnoreSpace, '').toLowerCase();

      for (let [k2, v2] of Object.entries(cc)) {

        [symbol2, name2] = [v2['cc-coinlist-Symbol'], v2['cc-coinlist-Name']];
        if (!symbol2) continue;
        symbol2b = symbol2.replace(regexNonAlphaNumeric, '');
        name2 = name2.trim().replace(regexIgnoreSpace, '').toLowerCase();

        if ((symbol1 === symbol2) || (symbol1 === symbol2b && name1 === name2)) {
          map[k1] = parseInt(k2);
        }

      }

    }

    return map;

  }
  catch(error) {
    logger.error(`mapCMCToCC(): ${error}`);
    return {error};
  }

}
