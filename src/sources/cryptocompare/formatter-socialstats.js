/**
 *
 * @return {Object} socialstats
 *
 */
const logger = require('../../logger');
module.exports = function formatterCryptocompareSocialstats(socialstats) {
  try {
    const data = {};
    for (let [key, val] of Object.entries(socialstats)) {
      if (!val.Data) {
        continue;
      }
      data[key] = {
        'Name':                                 val.Data.General.Name,
        'Reddit Points':                        val.Data.Reddit.Points,
        'Reddit Subscribers':                   val.Data.Reddit.subscribers,
        'Reddit Active Users':                  val.Data.Reddit.active_users,
        'Reddit Posts Per Day':                 val.Data.Reddit.posts_per_day,
        'Reddit Comments Per Day':              val.Data.Reddit.comments_per_day,
        'Reddit Community Creation':            val.Data.Reddit.community_creation,
        'Twitter Points':                       val.Data.Twitter.Points,
        'Twitter Statuses':                     val.Data.Twitter.statuses,
        'Twitter Followers':                    val.Data.Twitter.followers,
        'Twitter Account Creation':             val.Data.Twitter.account_creation,
        'Cryptocompare Posts':                  val.Data.CryptoCompare.Posts,
        'Cryptocompare Points':                 val.Data.CryptoCompare.Points,
        'Cryptocompare Comments':               val.Data.CryptoCompare.Comments,
        'Cryptocompare Followers':              val.Data.CryptoCompare.Followers,
        'Cryptocompare Page Views':             val.Data.CryptoCompare.PageViews,
        'Cryptocompare General Points':         val.Data.General.Points,
        'Cryptocompare Code Repository Points': val.Data.CodeRepository.Points,
      }
    }
    return data;
  }
  catch(error) {
    const message = `formatterCryptocompareSocialstats(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
