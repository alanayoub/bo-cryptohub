import logger from '../../logger';
import { perSecondSave } from '../../db/save';
import { objectGetNestedProperty as gnp } from 'bo-utils';

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
 *     Points: 114853,
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
 * @param {Array} social - scraped social data
 * @param {String} timestamp
 * @return {Object}
 *
 */
export default async function social(social, timestamp, originUrl) {
  try {

    if (!social.Data) {
      return {data: {}, timestamp};
    }

    const id = originUrl.split('/').reverse()[1];
    const data = {};
    const prefix = 'cc-social-';

    const d = social.Data;
    const general = d.General;
    const cryptocompare = d.CryptoCompare;
    const twitter = d.Twitter;
    const reddit = d.Reddit;
    const facebook = d.Facebook;
    const codeRepository = d.CodeRepository;

    data[id] = {
      [`${prefix}General_Name`]: general.Name,
      [`${prefix}General_CoinName`]: general.CoinName,
      [`${prefix}General_Type`]: general.Type,
      [`${prefix}General_Points`]: general.Points,
      // [`${prefix}CryptoCompare_SimilarItems`]: cryptocompare.SimilarItems, // Array
      // [`${prefix}CryptoCompare_CryptopianFollowers`]: cryptocompare.CryptopianFollowers, // Array
      // [`${prefix}CryptoCompare_PageViewsSplit`]: cryptocompare.PageViewsSplit, // Array
      [`${prefix}CryptoCompare_Followers`]: cryptocompare.Followers,
      [`${prefix}CryptoCompare_Posts`]: cryptocompare.Posts,
      [`${prefix}CryptoCompare_Points`]: cryptocompare.Points,
      [`${prefix}CryptoCompare_Comments`]: cryptocompare.Comments,
      // [`${prefix}CryptoCompare_PageViews`]: cryptocompare.PageViews, // Array
      [`${prefix}Twitter_account_creation`]: twitter.account_creation,
      [`${prefix}Twitter_followers`]: twitter.followers,
      [`${prefix}Twitter_statuses`]: twitter.statuses,
      [`${prefix}Twitter_link`]: twitter.link,
      [`${prefix}Twitter_lists`]: twitter.lists,
      [`${prefix}Twitter_favourites`]: twitter.favourites,
      [`${prefix}Twitter_following`]: twitter.following,
      [`${prefix}Twitter_name`]: twitter.name,
      [`${prefix}Twitter_Points`]: twitter.Points,
      [`${prefix}Reddit_posts_per_hour`]: reddit.posts_per_hour,
      [`${prefix}Reddit_comments_per_hour`]: reddit.comments_per_hour,
      [`${prefix}Reddit_comments_per_day`]: reddit.comments_per_day,
      [`${prefix}Reddit_active_users`]: reddit.active_users,
      [`${prefix}Reddit_link`]: reddit.link,
      [`${prefix}Reddit_community_creation`]: reddit.community_creation,
      [`${prefix}Reddit_posts_per_day`]: reddit.posts_per_day,
      [`${prefix}Reddit_name`]: reddit.name,
      [`${prefix}Reddit_subscribers`]: reddit.subscribers,
      [`${prefix}Reddit_Points`]: reddit.Points,
      [`${prefix}Facebook_talking_about`]: facebook.talking_about,
      [`${prefix}Facebook_is_closed`]: facebook.is_closed,
      [`${prefix}Facebook_likes`]: facebook.likes,
      [`${prefix}Facebook_name`]: facebook.name,
      [`${prefix}Facebook_link`]: facebook.link,
      [`${prefix}Facebook_Points`]: facebook.Points,
      [`${prefix}CodeRepository_Points`]: codeRepository.Points
      // [`${prefix}CodeRepository_List`]: codeRepository.List // Array
    }

    await perSecondSave(data, timestamp);

    return {data, timestamp};

  }
  catch(error) {
    const message = `social(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
