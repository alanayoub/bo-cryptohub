/**
 *
 * @return {Object} snapshot
 *
 */
const logger = require('../logger');
module.exports = function formatterCryptocompareSnapshot(snapshot) {
  try {
    const data = {};
    for (let [key, val] of Object.entries(snapshot)) {
      const pairs = val.Data.Subs.map(a => a.split('~')[1]);
      const exchanges = Array.from(new Set(pairs));
      data[key] = {
        '_id':                 val.Data.General.Symbol,
        'Proof':               val.Data.General.ProofType,
        'Algorithm':           val.Data.General.Algorithm,
        'Start Date':          val.Data.General.StartDate,
        'Total Supply':        val.Data.General.TotalCoinSupply,
        'Hashes Per Second':   val.Data.General.NetHashesPerSecond,
        'Total coins Minted':  val.Data.General.TotalCoinsMined,
        'ICO':                 val.Data.ICO ? val.Data.ICO.Status : 'False',
        'Number of Pairs':     pairs.length,
        'Number of Exchanges': exchanges.length,
      }
    }
    return data;
  }
  catch(error) {
    const message = `formatterCryptocompareSnapshot(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
