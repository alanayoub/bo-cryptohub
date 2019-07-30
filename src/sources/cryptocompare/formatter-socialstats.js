'use strict';

import { perSecondSave } from '../../db';

/**
 *
 * SOCIAL STATS
 *
 * Original Data
 * -------------
 *
 * Data: {
 *   General: {
 *     Name: "BTC",
 *     CoinName: "Bitcoin",
 *     Type: "Webpagecoinp",
 *     Points: 8586102
 *   },
 *   CryptoCompare: {
 *      SimilarItems: [],
 *      CryptopianFollowers: [],
 *      PageViewsSplit: {},
 *      Followers: 71959,
 *      Posts: 104250,
 *      Points: 7223445,
 *      Comments: 281822,
 *      PageViews: 45058381
 *   },
 *   Twitter: {
 *     account_creation: "1313643968",
 *     followers: 844049,
 *     statuses: 20316,
 *     link: "https://twitter.com/bitcoin",
 *     lists: 6631,
 *     favourites: "1000",
 *     following: "165",
 *     name: "Bitcoin",
 *     Points: 91055
 *   },
 *   Reddit: {
 *     posts_per_hour: "4.82",
 *     comments_per_hour: "142.97",
 *     comments_per_day: 3431.29,
 *     active_users: 4309,
 *     link: "https://www.reddit.com/r/bitcoin/",
 *     community_creation: "1284042626",
 *     posts_per_day: "115.65",
 *     name: "Bitcoin",
 *     subscribers: 1092460,
 *     Points: 1112249
 *   },
 *   Facebook: {
 *     talking_about: "42",
 *     is_closed: "false",
 *     likes: 39995,
 *     name: "Bitcoin P2P Cryptocurrency",
 *     link: "https://www.facebook.com/bitcoins/",
 *     Points: 39995
 *   },
 *   CodeRepository: {
       Points: 114853,
 *     List: [
 *       {
 *          forks: 1944,
 *          last_update: "1564244557",
 *          open_total_issues: "299",
 *          subscribers: 336,
 *          fork: "false",
 *          closed_pull_issues: "739",
 *          parent: {},
 *          language: "Java",
 *          open_pull_issues: "0",
 *          stars: 3356,
 *          closed_issues: "674",
 *          url: "https://github.com/bitcoinj/bitcoinj",
 *          created_at: "1384835603",
 *          open_issues: "23",
 *          source: {},
 *          closed_total_issues: "1413",
 *          size: "20990",
 *          last_push: "1564172795"
 *       }
 *     ]
 *   }
 * }
 *
 *
 * @return {Object} socialstats
 *
 *
 */
const logger = require('../../logger');
module.exports = function formatterCryptocompareSocialstats(socialstats) {
  try {
    const prefix = 'cc-socialstats-';
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

     // General: {
     //   Name: "BTC",
     //   CoinName: "Bitcoin",
     //   Type: "Webpagecoinp",
     //   Points: 8586102
     // },
     // CryptoCompare: {
     //    SimilarItems: [],
     //    CryptopianFollowers: [],
     //    PageViewsSplit: {},
     //    Followers: 71959,
     //    Posts: 104250,
     //    Points: 7223445,
     //    Comments: 281822,
     //    PageViews: 45058381
     // },
     // Twitter: {
     //   account_creation: "1313643968",
     //   followers: 844049,
     //   statuses: 20316,
     //   link: "https://twitter.com/bitcoin",
     //   lists: 6631,
     //   favourites: "1000",
     //   following: "165",
     //   name: "Bitcoin",
     //   Points: 91055
     // },
     // Reddit: {
     //   posts_per_hour: "4.82",
     //   comments_per_hour: "142.97",
     //   comments_per_day: 3431.29,
     //   active_users: 4309,
     //   link: "https://www.reddit.com/r/bitcoin/",
     //   community_creation: "1284042626",
     //   posts_per_day: "115.65",
     //   name: "Bitcoin",
     //   subscribers: 1092460,
     //   Points: 1112249
     // },
     // Facebook: {
     //   talking_about: "42",
     //   is_closed: "false",
     //   likes: 39995,
     //   name: "Bitcoin P2P Cryptocurrency",
     //   link: "https://www.facebook.com/bitcoins/",
     //   Points: 39995
     // },
     // CodeRepository: {
     //   Points: 114853,
     //   List: [
     //     {
     //        forks: 1944,
     //        last_update: "1564244557",
     //        open_total_issues: "299",
     //        subscribers: 336,
     //        fork: "false",
     //        closed_pull_issues: "739",
     //        parent: {},
     //        language: "Java",
     //        open_pull_issues: "0",
     //        stars: 3356,
     //        closed_issues: "674",
     //        url: "https://github.com/bitcoinj/bitcoinj",
     //        created_at: "1384835603",
     //        open_issues: "23",
     //        source: {},
     //        closed_total_issues: "1413",
     //        size: "20990",
     //        last_push: "1564172795"
     //     }
     //   ]
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
