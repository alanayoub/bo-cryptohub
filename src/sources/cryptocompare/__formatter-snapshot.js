/**
 *
 * @return {Object} snapshot
 *
 */
const logger = require('../../logger');
module.exports = function formatterCryptocompareSnapshot(data) {
  try {

    let obj, key, val, id, i;
    let pairs, exchanges, section, baseImageUrl, symbolUrl;
    const result = {};
    const prefix = 'cc-snapshot-';
    const sections = ['General', 'SEO', 'ICO'];

    for (i = 0; i < data.length; i++) {

      obj = {};
      id = data[i].Data.General.Id;
      baseImageUrl = data[i].Data.SEO.BaseImageUrl;

      for (section of sections) {

        for ([key, val] of Object.entries(data[i].Data[section])) {

          obj[`${prefix}${section}-${key}`] = val;
          if (`${section}-${key}` === 'General-ImageUrl') {
            symbolUrl = `${baseImageUrl}${val}`;
          }

        }

      }

      // Extra cryptohub fields
      pairs = data[i].Data.Subs.map(a => a.split('~')[1]);
      exchanges = Array.from(new Set(pairs));
      obj['cryptohub-symbolUrl']         = symbolUrl;
      obj['cryptohub-NumberOfPairs']     = pairs.length;
      obj['cryptohub-NumberOfExchanges'] = exchanges.length;
      result[id] = obj;

    }
    return result;
  }
  catch(error) {
    const message = `formatterCryptocompareSnapshot(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
