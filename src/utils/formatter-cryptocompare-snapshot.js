/**
 *
 * @return {Object} snapshot
 *
 */
const logger = require.main.require('./logger');
module.exports = function formatterCryptocompareSnapshot(snapshot) {
  try {
    const data = {};
    for (let [key, val] of Object.entries(snapshot)) {
      const pairs = val.Data.Subs.map(a => a.split('~')[1]);
      const exchanges = Array.from(new Set(pairs));
      data[key] = {
        'ICO':                   val.Data.ICO ? val.Data.ICO.Status : 'False',
        'Algorithm':             val.Data.General.Algorithm,
        'Proof Type':            val.Data.General.ProofType,
        'Start Date':            val.Data.General.StartDate,
        'Number of Pairs':       pairs.length,
        'Total Coin Supply':     val.Data.General.TotalCoinSupply,
        'Total coins Minted':    val.Data.General.TotalCoinsMined,
        'Number of Exchanges':   exchanges.length,
        'Net Hashes Per Second': val.Data.General.NetHashesPerSecond,
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
