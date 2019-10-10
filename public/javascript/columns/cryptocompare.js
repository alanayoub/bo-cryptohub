'use strict';

// Binary Overdose Projects
import { partialApplication } from '../libs/bo-utils-client';

// ag-grid cell Renderers
import cellRendererName       from '../utils/cell-renderer-name.js';
import cellRendererNumber     from '../utils/cell-renderer-number.js';
import cellRendererCurrency   from '../utils/cell-renderer-currency.js';

import onCellClicked          from '../utils/on-cell-clicked.js';

// ag-grid filter comparators
import sortNumbers            from '../utils/sort-numbers.js';

import { number, currency, percent, date, text, url } from './templates';

export default {

  ////
  //// Sparkline (USD)
  ////
  //// 7 Day USD price & volume trend
  //// Top & bottom numbers are % swing in price (top) & volume (bottom)
  ////
  //sparklineUSDCC: {
  //  colId: 'sparklineUSDCC',
  //  field: 'cryptohub-cc-price-history-USD',
  //  headerName: '7D Trend $',
  //  headerClass: 'CH-col',
  //  headerTooltip: '7 Day USD price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
  //  lockPinned: true,
  //  width: 124,
  //  cellRenderer: CellRendererSparkline,
  //  cellRendererParams: {
  //    range: true,
  //    price: true,
  //    volume: true,
  //    days: 7,
  //  }
  //},

  //
  // Name
  // Asset icon, name & symbol
  //
  nameCC: {
    colId: 'nameCC',
    field: 'cc-total-vol-full-FullName',
    headerName: 'Name',
    headerClass: 'CH-col',
    headerTooltip: 'Name',
    width: 200,
    pinned: 'left',
    lockPinned: true,
    type: [
      'cryptohubDefaults',
      'cryptohubText',
    ],
    cellRenderer: cellRendererName,
  },

  //
  // USD Price
  //
  priceUSDCC: {
    colId: 'priceUSDCC',
    field: 'cc-total-vol-full-PRICE',
    headerName: 'Price $',
    headerClass: 'CH-col',
    headerTooltip: 'Price in USD\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
      symbolTo: 'USD'
    },
    onCellClicked,
  },

  //
  // BTC Price
  //
  priceBTCCC: {
    colId: 'priceBTCCC',
    field: 'cc-total-vol-full-PRICE-cryptohub-BTC',
    headerName: 'Price ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Price in BTC\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      inputCurrency: 'SAT',
      currency: 'SAT',
      symbolTo: 'BTC'
    },
    onCellClicked,
  },

  //
  // 24 Hour Percent Change (USD)
  // NOTE: We want percent change against BTC too!
  //
  percentChange24hUSDCC: {
    colId: 'percentChange24hUSDCC',
    field: 'cc-total-vol-full-CHANGEPCTDAY',
    headerName: 'Change 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against USD\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // Volume
  //
  // The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD
  //
  volume24hUSDCC: {
    colId: 'volume24hUSDCC',
    field: 'cc-total-vol-full-TOTALVOLUME24HTO',
    headerName: 'Volume 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
    },
  },

  //
  // Marketcap
  //
  marketcapUSDCC: {
    colId: 'marketcapUSDCC',
    field: 'cc-total-vol-full-MKTCAP',
    headerName: 'Market Cap $',
    headerClass: 'CH-col',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
    },
  },

  //
  // Circulating Supply
  //
  circulatingSupplyCC: {
    colId: 'circulatingSupplyCC',
    field: 'cc-total-vol-full-SUPPLY',
    headerName: 'Circulating Supply',
    headerClass: 'CH-col',
    headerTooltip: 'Circulating supply\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // Proof type
  //
  proofTypeCC: {
    colId: 'proofTypeCC',
    field: 'cc-total-vol-full-ProofType',
    headerName: 'Proof',
    headerClass: 'CH-col',
    headerTooltip: 'Proof Type\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubText',
    ],
    cellRenderer(params) {
      return params.value && params.value.value || ch.emptyCellValue;
    },
  },

  //
  // Algo
  //
  algoCC: {
    colId: 'algoCC',
    field: 'cc-total-vol-full-Algorithm',
    headerName: 'Algorithm',
    headerClass: 'CH-col',
    headerTooltip: 'Algorithm\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubText',
    ],
    cellRenderer(params) {
      return params.value && params.value.value || ch.emptyCellValue;
    },
  },

  //
  // Hashes per second
  //
  hashesPerSecondCC: {
    colId: 'hashesPerSecondCC',
    field: 'cc-total-vol-full-NetHashesPerSecond',
    headerName: 'Hashes per/s',
    headerClass: 'CH-col',
    headerTooltip: 'Net Hashes per/s\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 180,
    columnGroupShow: 'both',
    comparator: sortNumbers,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // Built on
  //
  builtOnCC: {
    colId: 'builtOnCC',
    field: 'cc-coinlist-BuiltOn',
    headerName: 'Built On',
    headerClass: 'CH-col',
    headerTooltip: 'Built on\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 180,
    columnGroupShow: 'both',
    type: [
      'cryptohubDefaults',
      'cryptohubText',
    ],
    cellRenderer(params) {
      return params.value && params.value.value || ch.emptyCellValue;
    },
  },

  //
  // Code repo points
  //
  codeRepoPointsCC: {
    colId: 'codeRepoPointsCC',
    field: 'cc-social-CodeRepository_Points',
    headerName: 'Code Repo Points',
    headerClass: 'CH-col',
    headerTooltip: 'Code Repository Points\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // General points
  //
  generalPointsCC: {
    colId: 'generalPointsCC',
    field: 'cc-social-General_Points',
    headerName: 'General Points',
    headerClass: 'CH-col',
    headerTooltip: 'General Points\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  ////
  //// General Name
  ////
  //generalNameCC: Object.assign({}, text, {
  //  colId: 'generalNameCC',
  //  field: 'cc-social-General_Name',
  //  headerName: 'Name',
  //  headerTooltip: 'Name',
  //  width: 120,
  //}),

  ////
  //// General Coin Name
  ////
  //generalCoinNameCC: Object.assign({}, text, {
  //  colId: 'generalCoinNameCC',
  //  field: 'cc-social-General_CoinName',
  //  headerName: 'Coin Name',
  //  headerTooltip: 'Coin Name',
  //  width: 120,
  //}),

  ////
  //// General Type
  ////
  //generalTypeCC: Object.assign({}, text, {
  //  colId: 'generalTypeCC',
  //  field: 'cc-social-General_Type',
  //  headerName: 'Type',
  //  headerTooltip: 'Type',
  //  width: 120,
  //}),

  //
  // Cryptocompare Followers
  //
  cryptocompareFollowersCC: Object.assign({}, number, {
    colId: 'cryptocompareFollowersCC',
    field: 'cc-social-CryptoCompare_Followers',
    headerName: 'Cryptocompare Followers',
    headerTooltip: 'Cryptocompare Followers',
    width: 120,
  }),

  //
  // Cryptocompare Posts
  //
  cryptocomparePostsCC: Object.assign({}, number, {
    colId: 'cryptocomparePostsCC',
    field: 'cc-social-CryptoCompare_Posts',
    headerName: 'Cryptocompare Posts',
    headerTooltip: 'Cryptocompare Posts',
    width: 120,
  }),

  //
  // Cryptocompare Points
  //
  cryptocomparePointsCC: Object.assign({}, number, {
    colId: 'cryptocomparePointsCC',
    field: 'cc-social-CryptoCompare_Points',
    headerName: 'Cryptocompare Points',
    headerTooltip: 'Cryptocompare Points',
    width: 120,
  }),

  //
  // Cryptocompare Comments
  //
  cryptocompareCommentsCC: Object.assign({}, number, {
    colId: 'cryptocompareCommentsCC',
    field: 'cc-social-CryptoCompare_Comments',
    headerName: 'Cryptocompare Comments',
    headerTooltip: 'Cryptocompare Comments',
    width: 120,
  }),

  //
  // Twitter Account Creation
  //
  twitterAccountCreationCC: Object.assign({}, date, {
    colId: 'twitterAccountCreationCC',
    field: 'cc-social-Twitter_account_creation',
    headerName: 'Twitter Account Creation',
    headerTooltip: 'Twitter Account Creation',
    width: 120,
  }),

  //
  // Twitter Followers
  //
  twitterFollowersCC: Object.assign({}, number, {
    colId: 'twitterFollowersCC',
    field: 'cc-social-Twitter_followers',
    headerName: 'Twitter Followers',
    headerTooltip: 'Twitter Followers',
    width: 120,
  }),

  //
  // Twitter Statuses
  //
  twitterStatusesCC: Object.assign({}, number, {
    colId: 'twitterStatusesCC',
    field: 'cc-social-Twitter_statuses',
    headerName: 'Twitter Statuses',
    headerTooltip: 'Twitter Statuses',
    width: 120,
  }),

  //
  // Twitter Link
  //
  twitterLinkCC: Object.assign({}, url, {
    colId: 'twitterLinkCC',
    field: 'cc-social-Twitter_link',
    headerName: 'Twitter Link',
    headerTooltip: 'Twitter Link',
    width: 120,
  }),

  //
  // Twitter Lists
  //
  twitterListsCC: Object.assign({}, number, {
    colId: 'twitterListsCC',
    field: 'cc-social-Twitter_lists',
    headerName: 'Twitter Lists',
    headerTooltip: 'Twitter Lists',
    width: 120,
  }),

  //
  // Twitter Favourites
  //
  twitterFavouritesCC: Object.assign({}, number, {
    colId: 'twitterFavouritesCC',
    field: 'cc-social-Twitter_favourites',
    headerName: 'Twitter Favourites',
    headerTooltip: 'Twitter Favourites',
    width: 120,
  }),

  //
  // Twitter Following
  //
  twitterFollowingCC: Object.assign({}, number, {
    colId: 'twitterFollowingCC',
    field: 'cc-social-Twitter_following',
    headerName: 'Twitter Following',
    headerTooltip: 'Twitter Following',
    width: 120,
  }),

  //
  // Twitter Name
  //
  twitterNameCC: Object.assign({}, text, {
    colId: 'twitterNameCC',
    field: 'cc-social-Twitter_name',
    headerName: 'Twitter Name',
    headerTooltip: 'Twitter Name',
    width: 120,
  }),

  //
  // Twitter Points
  //
  twitterPointsCC: Object.assign({}, number, {
    colId: 'twitterPointsCC',
    field: 'cc-social-Twitter_Points',
    headerName: 'Twitter Points',
    headerTooltip: 'Twitter Points',
    width: 120,
  }),

  //
  // Reddit Posts Per Hour
  //
  redditPostsPerHourCC: Object.assign({}, number, {
    colId: 'redditPostsPerHourCC',
    field: 'cc-social-Reddit_posts_per_hour',
    headerName: 'Reddit Posts Per Hour',
    headerTooltip: 'Reddit Posts Per Hour',
    width: 120,
  }),

  //
  // Reddit Comments Per Hour
  //
  redditCommentsPerHourCC: Object.assign({}, number, {
    colId: 'redditCommentsPerHourCC',
    field: 'cc-social-Reddit_comments_per_hour',
    headerName: 'Reddit Comments Per Hour',
    headerTooltip: 'Reddit Comments Per Hour',
    width: 120,
  }),

  //
  // reddit Comments Per Day
  //
  redditCommentsPerDayCC: Object.assign({}, number, {
    colId: 'redditCommentsPerDayCC',
    field: 'cc-social-Reddit_comments_per_day',
    headerName: 'Reddit Comments Per Day',
    headerTooltip: 'Reddit Comments Per Day',
    width: 120,
  }),

  //
  // Reddit Active Users
  //
  redditActiveUsersCC: Object.assign({}, number, {
    colId: 'redditActiveUsersCC',
    field: 'cc-social-Reddit_active_users',
    headerName: 'Reddit Active Users',
    headerTooltip: 'Reddit Active Users',
    width: 120,
  }),

  //
  // Reddit Link
  //
  redditLinkCC: Object.assign({}, url, {
    colId: 'redditLinkCC',
    field: 'cc-social-Reddit_link',
    headerName: 'Reddit Link',
    headerTooltip: 'Reddit Link',
    width: 120,
  }),

  //
  // Reddit Comunity Creation
  //
  redditCommunityCreationCC: Object.assign({}, date, {
    colId: 'redditCommunityCreationCC',
    field: 'cc-social-Reddit_community_creation',
    headerName: 'Reddit Community Creation',
    headerTooltip: 'Reddit Community Creation',
    width: 120,
  }),

  //
  // Reddit Posts Per Day
  //
  redditPostsPerDayCC: Object.assign({}, number, {
    colId: 'redditPostsPerDayCC',
    field: 'cc-social-Reddit_posts_per_day',
    headerName: 'Reddit Posts Per Day',
    headerTooltip: 'Reddit Posts Per Day',
    width: 120,
  }),

  //
  // Reddit Name
  //
  redditNameCC: Object.assign({}, text, {
    colId: 'redditNameCC',
    field: 'cc-social-Reddit_name',
    headerName: 'Reddit Name',
    headerTooltip: 'Reddit Name',
    width: 120,
  }),

  //
  // Reddit Subscribers
  //
  redditSubscribersCC: Object.assign({}, number, {
    colId: 'redditSubscribersCC',
    field: 'cc-social-token_sale_stats_roi_since_sale_eth_percent',
    headerName: 'Reddit Subscribers',
    headerTooltip: 'Reddit Subscribers',
    width: 120,
  }),

  //
  // Reddit Points
  //
  redditPointsCC: Object.assign({}, number, {
    colId: 'redditPointsCC',
    field: 'cc-social-Reddit_Points',
    headerName: 'Reddit Points',
    headerTooltip: 'Reddit Points',
    width: 120,
  }),

  //
  // Facebook Talking About
  //
  facebookTalkingAboutCC: Object.assign({}, number, {
    colId: 'facebookTalkingAboutCC',
    field: 'cc-social-Facebook_talking_about',
    headerName: 'Facebook Talking Points',
    headerTooltip: 'Facebook Talking Points',
    width: 120,
  }),

  //
  // Facebook Is Closed
  //
  facebookIsClosedCC: Object.assign({}, text, {
    colId: 'facebookIsClosedCC',
    field: 'cc-social-Facebook_is_closed',
    headerName: 'Facebook Is Closed',
    headerTooltip: 'Facebook Is Closed',
    width: 120,
  }),

  //
  // Facebook Likes
  //
  facebookLikesCC: Object.assign({}, number, {
    colId: 'facebookLikesCC',
    field: 'cc-social-Facebook_likes',
    headerName: 'Facebook Likes',
    headerTooltip: 'Facebook Likes',
    width: 120,
  }),

  //
  // Facebook Name
  //
  facebookNameCC: Object.assign({}, text, {
    colId: 'facebookNameCC',
    field: 'cc-social-Facebook_name',
    headerName: 'Facebook Name',
    headerTooltip: 'Facebook Name',
    width: 120,
  }),

  //
  // Facebook Link
  //
  facebookLinkCC: Object.assign({}, url, {
    colId: 'facebookLinkCC',
    field: 'cc-social-Facebook_link',
    headerName: 'Facebook Link',
    headerTooltip: 'Facebook Link',
    width: 120,
  }),

  //
  // Facebook Points
  //
  facebookPointsCC: Object.assign({}, number, {
    colId: 'facebookPointsCC',
    field: 'cc-social-Facebook_Points',
    headerName: 'Facebook Points',
    headerTooltip: 'Facebook Points',
    width: 120,
  }),

}
