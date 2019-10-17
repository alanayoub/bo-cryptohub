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

import { number, currency, percent, date, text, html, url } from './templates';

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
    dependencies: [
      'cc-coinlist-Symbol',
      'cryptohub-coin-image-url',
    ]
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
  circulatingSupplyCC: Object.assign({}, number, {
    colId: 'circulatingSupplyCC',
    field: 'cc-total-vol-full-SUPPLY',
    headerName: 'Circulating Supply',
    headerTooltip: 'Circulating supply\n\nData Source: Cryptocompare',
    cellRendererParams: {
      bo: {
        floor: true
      }
    },
  }),

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
  hashesPerSecondCC: Object.assign({}, number, {
    colId: 'hashesPerSecondCC',
    field: 'cc-total-vol-full-NetHashesPerSecond',
    headerName: 'Hashes per/s',
    headerTooltip: 'Net Hashes per/s\n\nData Source: Cryptocompare',
    width: 180,
    cellRendererParams: {
      bo: {
        floor: true
      }
    },
  }),

  // 'cc-coinlist-Algorithm'
  // 'cc-coinlist-CoinName'
  // 'cc-coinlist-FullName'
  // 'cc-coinlist-Id'
  // 'cc-coinlist-ImageUrl'
  // 'cc-coinlist-Name'
  // 'cc-coinlist-NetHashesPerSecond'
  // 'cc-coinlist-ProofType'
  // 'cc-coinlist-Sponsored'
  // 'cc-coinlist-Symbol'
  // 'cc-coinlist-Url'

  //
  // Built on
  //
  builtOnCC: Object.assign({}, text, {
    colId: 'builtOnCC',
    field: 'cc-coinlist-BuiltOn',
    headerName: 'Built On',
    headerTooltip: 'Built on\n\nData Source: Cryptocompare',
  }),

  //
  // Block Number
  //
  blockNumberCC: Object.assign({}, number, {
    colId: 'blockNumberCC',
    field: 'cc-coinlist-BlockNumber',
    headerName: 'Block Number',
    headerTooltip: 'Block Number',
  }),

  //
  // Block Reward
  //
  blockRewardCC: Object.assign({}, number, {
    colId: 'blockRewardCC',
    field: 'cc-coinlist-BlockReward',
    headerName: 'Block Reward',
    headerTooltip: 'Block Reward',
    cellRendererParams: {
      bo: {
        floor: true
      }
    },
  }),

  //
  // Block Time
  //
  blockTimeCC: Object.assign({}, number, {
    colId: 'blockTimeCC',
    field: 'cc-coinlist-BlockTime',
    headerName: 'Block Time',
    headerTooltip: 'Block Time',
  }),

  //
  // Content Created On
  //
  contentCreatedOnCC: Object.assign({}, date, {
    colId: 'contentCreatedOnCC',
    field: 'cc-coinlist-ContentCreatedOn',
    headerName: 'Created On',
    headerTooltip: 'Content Created On',
  }),

  //
  // Fully Premined
  //
  fullyPreminedCC: Object.assign({}, text, {
    colId: 'fullyPreminedCC',
    field: 'cc-coinlist-FullyPremined',
    headerName: 'Fully Premined',
    headerTooltip: 'Fully Premined',
  }),

  //
  // Is Trading
  //
  isTradingCC: Object.assign({}, text, {
    colId: 'isTradingCC',
    field: 'cc-coinlist-IsTrading',
    headerName: 'Is Trading',
    headerTooltip: 'Is Trading',
  }),

  //
  // PreMined Value
  //
  preminedValueCC: Object.assign({}, text, {
    colId: 'preminedValueCC',
    field: 'cc-coinlist-PreMinedValue',
    headerName: 'PreMined Value',
    headerTooltip: 'PreMined Value',
  }),

  //
  // Smart Contract Addresses
  //
  smartContractAddressesCC: Object.assign({}, text, {
    colId: 'smartContractAddressesCC',
    field: 'cc-coinlist-SmartContractAddress',
    headerName: 'Smart Contract Addresses',
    headerTooltip: 'Smart Contract Addresses',
  }),

  //
  // ICO Whitepaper URL
  //
  sortOrderCC: Object.assign({}, number, {
    colId: 'sortOrderCC',
    field: 'cc-coinlist-SortOrder',
    headerName: 'Sort Order CryptoCompare',
    headerTooltip: 'Sort Order CryptoCompare'
  }),

  //
  // Total Coin Supply
  //
  totalCoinSupplyCC: Object.assign({}, number, {
    colId: 'totalCoinSupplyCC',
    field: 'cc-coinlist-TotalCoinSupply',
    headerName: 'Total Coin Supply',
    headerTooltip: 'Total Coin Supply',
    cellRendererParams: {
      bo: {
        floor: true
      }
    },
  }),

  //
  // Total Coins Free Float
  //
  totalCoinsFreeFloatCC: Object.assign({}, number, {
    colId: 'totalCoinsFreeFloatCC',
    field: 'cc-coinlist-TotalCoinsFreeFloat',
    headerName: 'Total Coins Free Float',
    headerTooltip: 'Total Coins Free Float',
  }),

  //
  // Total Coins Mined
  //
  totalCoinsMinedCC: Object.assign({}, number, {
    colId: 'totalCoinsMinedCC',
    field: 'cc-coinlist-TotalCoinsMined',
    headerName: 'Total Coins Mined',
    headerTooltip: 'Total Coins Mined',
    cellRendererParams: {
      bo: {
        floor: true
      }
    },
  }),

  //
  // Code repo points
  //
  codeRepoPointsCC: Object.assign({}, number, {
    colId: 'codeRepoPointsCC',
    field: 'cc-social-CodeRepository_Points',
    headerName: 'Code Repo Points',
    headerTooltip: 'Code Repository Points\n\nData Source: Cryptocompare',
  }),

  //
  // General points
  //
  generalPointsCC: Object.assign({}, number, {
    colId: 'generalPointsCC',
    field: 'cc-social-General_Points',
    headerName: 'General Points',
    headerTooltip: 'General Points\n\nData Source: Cryptocompare',
  }),

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
  }),

  //
  // Cryptocompare Posts
  //
  cryptocomparePostsCC: Object.assign({}, number, {
    colId: 'cryptocomparePostsCC',
    field: 'cc-social-CryptoCompare_Posts',
    headerName: 'Cryptocompare Posts',
    headerTooltip: 'Cryptocompare Posts',
  }),

  //
  // Cryptocompare Points
  //
  cryptocomparePointsCC: Object.assign({}, number, {
    colId: 'cryptocomparePointsCC',
    field: 'cc-social-CryptoCompare_Points',
    headerName: 'Cryptocompare Points',
    headerTooltip: 'Cryptocompare Points',
  }),

  //
  // Cryptocompare Comments
  //
  cryptocompareCommentsCC: Object.assign({}, number, {
    colId: 'cryptocompareCommentsCC',
    field: 'cc-social-CryptoCompare_Comments',
    headerName: 'Cryptocompare Comments',
    headerTooltip: 'Cryptocompare Comments',
  }),

  //
  // Twitter Account Creation
  //
  twitterAccountCreationCC: Object.assign({}, date, {
    colId: 'twitterAccountCreationCC',
    field: 'cc-social-Twitter_account_creation',
    headerName: 'Twitter Account Creation',
    headerTooltip: 'Twitter Account Creation',
  }),

  //
  // Twitter Followers
  //
  twitterFollowersCC: Object.assign({}, number, {
    colId: 'twitterFollowersCC',
    field: 'cc-social-Twitter_followers',
    headerName: 'Twitter Followers',
    headerTooltip: 'Twitter Followers',
  }),

  //
  // Twitter Statuses
  //
  twitterStatusesCC: Object.assign({}, number, {
    colId: 'twitterStatusesCC',
    field: 'cc-social-Twitter_statuses',
    headerName: 'Twitter Statuses',
    headerTooltip: 'Twitter Statuses',
  }),

  //
  // Twitter Link
  //
  twitterLinkCC: Object.assign({}, url, {
    colId: 'twitterLinkCC',
    field: 'cc-social-Twitter_link',
    headerName: 'Twitter URL',
    headerTooltip: 'Twitter URL',
  }),

  //
  // Twitter Lists
  //
  twitterListsCC: Object.assign({}, number, {
    colId: 'twitterListsCC',
    field: 'cc-social-Twitter_lists',
    headerName: 'Twitter Lists',
    headerTooltip: 'Twitter Lists',
  }),

  //
  // Twitter Favourites
  //
  twitterFavouritesCC: Object.assign({}, number, {
    colId: 'twitterFavouritesCC',
    field: 'cc-social-Twitter_favourites',
    headerName: 'Twitter Favourites',
    headerTooltip: 'Twitter Favourites',
  }),

  //
  // Twitter Following
  //
  twitterFollowingCC: Object.assign({}, number, {
    colId: 'twitterFollowingCC',
    field: 'cc-social-Twitter_following',
    headerName: 'Twitter Following',
    headerTooltip: 'Twitter Following',
  }),

  //
  // Twitter Name
  //
  twitterNameCC: Object.assign({}, text, {
    colId: 'twitterNameCC',
    field: 'cc-social-Twitter_name',
    headerName: 'Twitter Name',
    headerTooltip: 'Twitter Name',
  }),

  //
  // Twitter Points
  //
  twitterPointsCC: Object.assign({}, number, {
    colId: 'twitterPointsCC',
    field: 'cc-social-Twitter_Points',
    headerName: 'Twitter Points',
    headerTooltip: 'Twitter Points',
  }),

  //
  // Reddit Posts Per Hour
  //
  redditPostsPerHourCC: Object.assign({}, number, {
    colId: 'redditPostsPerHourCC',
    field: 'cc-social-Reddit_posts_per_hour',
    headerName: 'Reddit Posts Per Hour',
    headerTooltip: 'Reddit Posts Per Hour',
  }),

  //
  // Reddit Comments Per Hour
  //
  redditCommentsPerHourCC: Object.assign({}, number, {
    colId: 'redditCommentsPerHourCC',
    field: 'cc-social-Reddit_comments_per_hour',
    headerName: 'Reddit Comments Per Hour',
    headerTooltip: 'Reddit Comments Per Hour',
  }),

  //
  // reddit Comments Per Day
  //
  redditCommentsPerDayCC: Object.assign({}, number, {
    colId: 'redditCommentsPerDayCC',
    field: 'cc-social-Reddit_comments_per_day',
    headerName: 'Reddit Comments Per Day',
    headerTooltip: 'Reddit Comments Per Day',
  }),

  //
  // Reddit Active Users
  //
  redditActiveUsersCC: Object.assign({}, number, {
    colId: 'redditActiveUsersCC',
    field: 'cc-social-Reddit_active_users',
    headerName: 'Reddit Active Users',
    headerTooltip: 'Reddit Active Users',
  }),

  //
  // Reddit Link
  //
  redditLinkCC: Object.assign({}, url, {
    colId: 'redditLinkCC',
    field: 'cc-social-Reddit_link',
    headerName: 'Reddit URL',
    headerTooltip: 'Reddit URL',
  }),

  //
  // Reddit Comunity Creation
  //
  redditCommunityCreationCC: Object.assign({}, date, {
    colId: 'redditCommunityCreationCC',
    field: 'cc-social-Reddit_community_creation',
    headerName: 'Reddit Community Creation',
    headerTooltip: 'Reddit Community Creation',
  }),

  //
  // Reddit Posts Per Day
  //
  redditPostsPerDayCC: Object.assign({}, number, {
    colId: 'redditPostsPerDayCC',
    field: 'cc-social-Reddit_posts_per_day',
    headerName: 'Reddit Posts Per Day',
    headerTooltip: 'Reddit Posts Per Day',
  }),

  //
  // Reddit Name
  //
  redditNameCC: Object.assign({}, text, {
    colId: 'redditNameCC',
    field: 'cc-social-Reddit_name',
    headerName: 'Reddit Name',
    headerTooltip: 'Reddit Name',
  }),

  //
  // Reddit Subscribers
  //
  redditSubscribersCC: Object.assign({}, number, {
    colId: 'redditSubscribersCC',
    field: 'cc-social-token_sale_stats_roi_since_sale_eth_percent',
    headerName: 'Reddit Subscribers',
    headerTooltip: 'Reddit Subscribers',
  }),

  //
  // Reddit Points
  //
  redditPointsCC: Object.assign({}, number, {
    colId: 'redditPointsCC',
    field: 'cc-social-Reddit_Points',
    headerName: 'Reddit Points',
    headerTooltip: 'Reddit Points',
  }),

  //
  // Facebook Talking About
  //
  facebookTalkingAboutCC: Object.assign({}, number, {
    colId: 'facebookTalkingAboutCC',
    field: 'cc-social-Facebook_talking_about',
    headerName: 'Facebook Talking Points',
    headerTooltip: 'Facebook Talking Points',
  }),

  //
  // Facebook Is Closed
  //
  facebookIsClosedCC: Object.assign({}, text, {
    colId: 'facebookIsClosedCC',
    field: 'cc-social-Facebook_is_closed',
    headerName: 'Facebook Is Closed',
    headerTooltip: 'Facebook Is Closed',
  }),

  //
  // Facebook Likes
  //
  facebookLikesCC: Object.assign({}, number, {
    colId: 'facebookLikesCC',
    field: 'cc-social-Facebook_likes',
    headerName: 'Facebook Likes',
    headerTooltip: 'Facebook Likes',
  }),

  //
  // Facebook Name
  //
  facebookNameCC: Object.assign({}, text, {
    colId: 'facebookNameCC',
    field: 'cc-social-Facebook_name',
    headerName: 'Facebook Name',
    headerTooltip: 'Facebook Name',
  }),

  //
  // Facebook Link
  //
  facebookLinkCC: Object.assign({}, url, {
    colId: 'facebookLinkCC',
    field: 'cc-social-Facebook_link',
    headerName: 'Facebook URL',
    headerTooltip: 'Facebook URL',
  }),

  //
  // Facebook Points
  //
  facebookPointsCC: Object.assign({}, number, {
    colId: 'facebookPointsCC',
    field: 'cc-social-Facebook_Points',
    headerName: 'Facebook Points',
    headerTooltip: 'Facebook Points',
  }),

  //
  // Adjustment Difficulty
  //
  adjustmentDifficultyCC: Object.assign({}, text, {
    colId: 'adjustmentDifficultyCC',
    field: 'cc-snapshot-General_DifficultyAdjustment',
    headerName: 'Adjustment Difficulty',
    headerTooltip: 'Adjustment Difficulty',
  }),

  //
  // Block Reward Reduction
  //
  blockRewardReductionCC: Object.assign({}, text, {
    colId: 'blockRewardReductionCC',
    field: 'cc-snapshot-General_BlockRewardReduction',
    headerName: 'Block Reward Reduction',
    headerTooltip: 'Block Reward Reduction',
  }),

  //
  // Start Date
  //
  startDateCC: Object.assign({}, date, {
    colId: 'startDateCC',
    field: 'cc-snapshot-General_StartDate',
    headerName: 'Start Date',
    headerTooltip: 'Start Date',
  }),

  //
  // Website URL
  //
  websiteUrlCC: Object.assign({}, url, {
    colId: 'websiteUrlCC',
    field: 'cc-snapshot-General_WebsiteUrl',
    headerName: 'Website URL',
    headerTooltip: 'Website URL',
  }),

  //
  // Description
  //
  generalDescriptionCC: Object.assign({}, html, {
    colId: 'generalDescriptionCC',
    field: 'cc-snapshot-General_Description',
    headerName: 'Description',
    headerTooltip: 'Description',
  }),

  //
  // Features
  //
  generalFeaturesCC: Object.assign({}, html, {
    colId: 'generalFeaturesCC',
    field: 'cc-snapshot-General_Features',
    headerName: 'Features',
    headerTooltip: 'Features',
  }),

  //
  // Technology
  //
  generalTechnologyCC: Object.assign({}, html, {
    colId: 'generalTechnologyCC',
    field: 'cc-snapshot-General_Technology',
    headerName: 'Technology',
    headerTooltip: 'Technology',
  }),

  //
  // ICO Status
  //
  icoStatusCC: Object.assign({}, text, {
    colId: 'icoStatusCC',
    field: 'cc-snapshot-ICO_Status',
    headerName: 'ICO Status',
    headerTooltip: 'ICO Status',
  }),

  //
  // ICO Description
  //
  icoDescriptionCC: Object.assign({}, html, {
    colId: 'icoDescriptionCC',
    field: 'cc-snapshot-ICO_Description',
    headerName: 'ICO Description',
    headerTooltip: 'ICO Description',
  }),

  //
  // ICO Token Type
  //
  icoTokenTypeCC: Object.assign({}, text, {
    colId: 'icoTokenTypeCC',
    field: 'cc-snapshot-ICO_TokenType',
    headerName: 'ICO Token Type',
    headerTooltip: 'ICO Token Type',
  }),

  //
  // ICO Website URL
  //
  icoWebsiteUrlCC: Object.assign({}, url, {
    colId: 'icoWebsiteUrlCC',
    field: 'cc-snapshot-ICO_WebsiteLink',
    headerName: 'ICO Website URL',
    headerTooltip: 'ICO Website URL',
  }),

  //
  // ICO Publick Portfolio URL
  //
  icoPublicPortfolioUrlCC: Object.assign({}, url, {
    colId: 'icoPublicPortfolioUrlCC',
    field: 'cc-snapshot-ICO_PublicPortfolioUrl',
    headerName: 'ICO Portfolio URL',
    headerTooltip: 'ICO Public Portfolio URL',
  }),

  //
  // ICO Funding Target
  //
  icoFundingTargetCC: Object.assign({}, text, {
    colId: 'icoFundingTargetCC',
    field: 'cc-snapshot-ICO_FundingTarget',
    headerName: 'ICO Funding Target',
    headerTooltip: 'ICO Funding Target',
  }),

  //
  // ICO Funding Cap
  //
  icoFundingCapCC: Object.assign({}, text, {
    colId: 'icoFundingCapCC',
    field: 'cc-snapshot-ICO_FundingCap',
    headerName: 'ICO Funding Cap',
    headerTooltip: 'ICO Funding Cap',
  }),

  //
  // ICO Token Supply
  //
  icoIcoTokenSupplyCC: Object.assign({}, number, {
    colId: 'icoIcoTokenSupplyCC',
    field: 'cc-snapshot-ICO_ICOTokenSupply',
    headerName: 'ICO Token Supply',
    headerTooltip: 'ICO Token Supply',
  }),

  //
  // ICO Token Supply Post ICO
  //
  icoTokenSupplyPostIcoCC: Object.assign({}, number, {
    colId: 'icoTokenSupplyPostIcoCC',
    field: 'cc-snapshot-ICO_TokenSupplyPostICO',
    headerName: 'ICO Token Supply Post ICO',
    headerTooltip: 'ICO Token Supply Post ICO',
  }),

  //
  // ICO Token Supply For Investors
  //
  icoTokenPercentageForInvestorsCC: Object.assign({}, number, {
    colId: 'icoTokenPercentageForInvestorsCC',
    field: 'cc-snapshot-ICO_TokenPercentageForInvestors',
    headerName: 'ICO Token % for Investors',
    headerTooltip: 'ICO Token Percentage for Investors',
  }),

  //
  // ICO Token Reserve Split
  //
  icoTokenReserveSplitCC: Object.assign({}, text, {
    colId: 'icoTokenReserveSplitCC',
    field: 'cc-snapshot-ICO_TokenReserveSplit',
    headerName: 'ICO Token Reserve Split',
    headerTooltip: 'ICO Token Reserve Split',
  }),

  //
  // ICO Start Date
  //
  icoStartDateCC: Object.assign({}, date, {
    colId: 'icoStartDateCC',
    field: 'cc-snapshot-ICO_Date',
    headerName: 'ICO Start Date',
    headerTooltip: 'ICO Start Date',
  }),

  //
  // ICO End Date
  //
  icoEndDateCC: Object.assign({}, date, {
    colId: 'icoEndDateCC',
    field: 'cc-snapshot-ICO_EndDate',
    headerName: 'ICO End Date',
    headerTooltip: 'ICO End Date',
  }),

  //
  // ICO Funds Raised List
  //
  icoFundsRaisedListCC: Object.assign({}, text, {
    colId: 'icoFundsRaisedListCC',
    field: 'cc-snapshot-ICO_FundsRaisedList',
    headerName: 'ICO Funds Raised List',
    headerTooltip: 'ICO Funds Raised List',
  }),

  //
  // ICO Funds Raised USD
  //
  icoFundsRaisedUsdCC: Object.assign({}, currency, {
    colId: 'icoFundsRaisedUsdCC',
    field: 'cc-snapshot-ICO_FundsRaisedUSD',
    headerName: 'ICO Funds Raised USD',
    headerTooltip: 'ICO Funds Raised USD',
  }),

  //
  // ICO Start Price
  //
  icoStartPriceCC: Object.assign({}, number, {
    colId: 'icoStartPriceCC',
    field: 'cc-snapshot-ICO_StartPrice',
    headerName: 'ICO Start Price',
    headerTooltip: 'ICO Start Price',
  }),

  //
  // ICO Start Price Currency
  //
  icoStartPriceCurrencyCC: Object.assign({}, text, {
    colId: 'icoStartPriceCurrencyCC',
    field: 'cc-snapshot-ICO_StartPriceCurrency',
    headerName: 'ICO Start Price Currency',
    headerTooltip: 'ICO Start Price Currency',
  }),

  //
  // ICO Payment Method
  //
  icoPaymentMethodCC: Object.assign({}, text, {
    colId: 'icoPaymentMethodCC',
    field: 'cc-snapshot-ICO_PaymentMethod',
    headerName: 'ICO Payment Method',
    headerTooltip: 'ICO Payment Method',
  }),

  //
  // ICO Jurisdiction
  //
  icoJurisdictionCC: Object.assign({}, text, {
    colId: 'icoJurisdictionCC',
    field: 'cc-snapshot-ICO_Jurisdiction',
    headerName: 'ICO Jurisdiction',
    headerTooltip: 'ICO Jurisdiction',
  }),

  //
  // ICO Legal Advisers
  //
  icoLegalAdvisersCC: Object.assign({}, text, {
    colId: 'icoLegalAdvisersCC',
    field: 'cc-snapshot-ICO_LegalAdvisers',
    headerName: 'ICO Legal Advisers',
    headerTooltip: 'ICO Legal Advisers',
  }),

  //
  // ICO Legal Form
  //
  icoLegalFormCC: Object.assign({}, text, {
    colId: 'icoLegalFormCC',
    field: 'cc-snapshot-ICO_LegalForm',
    headerName: 'ICO Legal Form',
    headerTooltip: 'ICO Legal Form',
  }),

  //
  // ICO Security Audit Company
  //
  icoSecurityAuditCompanyCC: Object.assign({}, text, {
    colId: 'icoSecurityAuditCompanyCC',
    field: 'cc-snapshot-ICO_SecurityAuditCompany',
    headerName: 'ICO Security Audit Company',
    headerTooltip: 'ICO Security Audit Company',
  }),

  //
  // ICO Blog URL
  //
  icoBlogUrlCC: Object.assign({}, url, {
    colId: 'icoBlogUrlCC',
    field: 'cc-snapshot-ICO_BlogLink',
    headerName: 'ICO Blog URL',
    headerTooltip: 'ICO Blog URL',
  }),

  //
  // ICO Whitepaper URL
  //
  icoWhitepaperUrlCC: Object.assign({}, url, {
    colId: 'icoWhitepaperUrlCC',
    field: 'cc-snapshot-ICO_WhitePaperLink',
    headerName: 'ICO Whitepaper URL',
    headerTooltip: 'ICO Whitepaper URL',
  }),

}
