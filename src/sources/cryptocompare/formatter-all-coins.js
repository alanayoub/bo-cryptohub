/**
 *
 * @return {Object} allcoins
 *
 */
const logger = require('../../logger');
module.exports = function formatterCryptocompareAllCoins(allcoins) {
  try {
    const data = {};
    for (let [key, val] of Object.entries(allcoins)) {
      data[key] = {
        'Name':                   val.Name,
        'Symbol':                 val.Symbol,
        'ImageUrl':               val.ImageUrl,
        'Coin Name':              val.CoinName,
        'Full Name':              val.FullName,
        'Algorithm':              val.Algorithm,
        'SortOrder':              val.SortOrder,
        'Proof Type':             val.ProofType,
        'Is Trading':             val.IsTrading,
        'Fully Premined':         val.FullyPremined,
        'Pre Mined Value':        val.PreMinedValue,
        'Total Coin Supply':      val.TotalCoinSupply,
        'Total Coins Free Float': val.TotalCoinsFreeFloat,
        'Url': val.Url,
      }
    }
    return data;
  }
  catch(error) {
    const message = `formatterCryptocompareAllCoins(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
