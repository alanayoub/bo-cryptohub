/**
 *
 * @returns {Object} json
 *
 */
module.exports = function formatterJSONToTxt(json) {
  try {
    let txt = '';
    for (let [key, val] of Object.entries(json)) {
      // column names
      if (txt === '') {
        for (let prop of Object.keys(val)) {
          txt += `${prop}\t`;
        }
      }
      txt += '\n';
      // rows
      for (let value of Object.values(val)) {
        txt += `${value}\t`;
      }
    }
    return txt;
  }
  catch (error) {
    return {error: true, message: `formatterJSONToTxt(): ${error}`};
  }
}
