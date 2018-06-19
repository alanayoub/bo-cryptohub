/**
 *
 * @return {Object} socialstats
 *
 */
const logger = require('../logger');
module.exports = function formatterCryptocompareSocialstats(socialstats) {
  try {
    const data = {};
    for (let [key, val] of Object.entries(socialstats)) {
      data[key] = {
        '_id':                       val.Data.General.Name,
        'Code Repository Points':    val.Data.CodeRepository.Points,
        'General Points':            val.Data.General.Points,
        'Reddit Points':             val.Data.Reddit.Points,
        'Reddit Active Users':       val.Data.Reddit.active_users,
        'Reddit Comments Per Day':   val.Data.Reddit.comments_per_day,
        'Reddit Community Creation': val.Data.Reddit.community_creation,
        'Reddit Posts Per Day':      val.Data.Reddit.posts_per_day,
        'Reddit Subscribers':        val.Data.Reddit.subscribers,
        'Twitter Points':            val.Data.Twitter.Points,
        'Twitter Account Creation':  val.Data.Twitter.account_creation,
        'Twitter Followers':         val.Data.Twitter.followers,
        'Twitter Statuses':          val.Data.Twitter.statuses,
        'Cryptocompare Points':      val.Data.CryptoCompare.Points,
        'Cryptocompare Posts':       val.Data.CryptoCompare.Posts,
        'Cryptocompare Page Views':  val.Data.CryptoCompare.PageViews,
        'Cryptocompare Followers':   val.Data.CryptoCompare.Followers,
        'Cryptocompare Comments':    val.Data.CryptoCompare.Comments
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
