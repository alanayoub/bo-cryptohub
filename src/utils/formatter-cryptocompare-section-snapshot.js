/**
 *
 * @return {Object} snapshot
 *
 */
const logger = require('../logger');
module.exports = function formatterCryptocompareSectionSnapshot(price, timestamp, bootstrapData) {
  try {

    let obj, key, val, id, i;
    let pairs, exchanges, section, baseImageUrl, symbolUrl;
    const result = {};
    const prefix = 'cc-snapshot-';
    const sections = ['General', 'SEO', 'ICO'];

    for (i = 0; i < price.length; i++) {

      obj = {};
      id = price[i].Data.General.Id;
      baseImageUrl = price[i].Data.SEO.BaseImageUrl;

      for (section of sections) {

        for ([key, val] of Object.entries(price[i].Data[section])) {

          obj[`${prefix}${section}-${key}`] = val;
          if (`${section}-${key}` === 'General-ImageUrl') {
            symbolUrl = `${baseImageUrl}${val}`;
          }

        }

      }

      // Extra cryptohub fields
      pairs = price[i].Data.Subs.map(a => a.split('~')[1]);
      exchanges = Array.from(new Set(pairs));
      obj['cryptohub-symbolUrl']         = symbolUrl;
      obj['cryptohub-NumberOfPairs']     = pairs.length;
      obj['cryptohub-NumberOfExchanges'] = exchanges.length;
      result[id] = obj;

    }
    return result;
  }
  catch(error) {
    const message = `formatterCryptocompareSectionSnapshot(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
