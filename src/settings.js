// node
const path = require('path');
const argv = require('argv');

const columnDependencies = require('./utils/columnDependencies.generated.js').default;
const defaultViews = require('./settings.views.default.js').default;

// Bitbucket :/
// Ardor: https://bitbucket.org/Jelurida/ardor/src
// NXT: https://bitbucket.org/JeanLucPicard/nxt/src
global.githubOverrides = {
  'gas': 'https://github.com/neo-project',
  'kin': 'https://github.com/kinecosystem',
  'tenx': 'https://github.com/tenx-tech',
  'gnosis': 'https://github.com/gnosis',
  'aragon': 'https://github.com/aragon/aragon-network-token',
  'funfair': 'https://github.com/funfair-tech',
  'basic-attention-token': 'https://github.com/brave-intl'
}

const args = argv.option([
  {
    name: 'local',
    short: 'l',
    type: 'boolean',
    description: 'Changes required to mimic development build locally',
    example: '\'script --local=true\' or \'script -l true\''
  },
  {
    name: 'logger',
    short: 'L',
    type: 'boolean',
    description: 'Log to console',
    example: '\'script --logger=true\' or \'script -L true\''
  }
]).run();

const isProd = process.env.NODE_ENV === 'production' && args.options.local !== true;

const cacheDir = isProd ? '/home/ubuntu/cryptohub-cache' : path.join(__dirname, '/../cache');
const cryptohubDir = isProd ? '/home/ubuntu/live/vps/web/src/bo-cryptohub/' : path.join(__dirname, '../');

const generatedDir = `${cacheDir}/tmp-generated`;
const scrapeDir    = `${cacheDir}/tmp-scrape`;
const dbDir        = `${cacheDir}/db`;

const coinmarketcapApiKey = '84e034e2-3972-47eb-9349-5e4dc20211cd';
const cryptocompareApiKey = 'b3ad47012cc134911a4775d955ef2b9cf8b85f54d383d81c1bf77338a59b1222';

const defaultTypes = 'String|Number|Boolean|Null|Undefined|Array';
const fieldTypeMap = {
  //
  // NOTE: Allowing String, Number and Boolean becaues none of the data sources can make their mind up :(
  // Once we have more data in the database we can see what it looks like
  //
  //
  // Custom
  //
  'cryptohub-name': defaultTypes,
  'cryptohub-symbol': defaultTypes,
  'cryptohub-coin-image-url': defaultTypes,
  'cryptohub-price-usd': defaultTypes,
  'cryptohub-price-history': defaultTypes,
  'cryptohub-exchanges': defaultTypes,
  'cryptohub-exchange-locations': defaultTypes,
  'cryptohub-numberOfExchanges': defaultTypes,
  'cryptohub-numberOfPairs': defaultTypes,
  'cryptohub-numberOfFiatPairs': defaultTypes,
  'cryptohub-numberOfFiatCurrencies': defaultTypes,
  'cryptohub-exchangesListDex': defaultTypes,
  'cryptohub-exchangesListAcceptsBoth': defaultTypes,
  'cryptohub-exchangesListCryptoOnly': defaultTypes,
  'cryptohub-numberOfDex': defaultTypes,
  'cryptohub-exchangesListFiatOnly': defaultTypes,
  'cryptohub-circulating-percent-total': defaultTypes,
  'cryptohub-cc-circulating-percent-total': defaultTypes,
  'cryptohub-m-price-history-BTC': defaultTypes,
  'cryptohub-m-price-history-USD': defaultTypes,
  'cryptohub-cmc-price-history-BTC': defaultTypes,
  'cryptohub-cmc-price-history-USD': defaultTypes,
  'cryptohub-cc-price-history-BTC': defaultTypes,
  'cryptohub-cc-price-history-USD': defaultTypes,
  'cryptohub-pairs': defaultTypes,
  'cryptohub-fiatCurrencies': defaultTypes,
  'cryptohub-exchagnesRank': defaultTypes,
  'cryptohub-wallets': defaultTypes,
  'cryptohub-wallets-supportedValidationTypes': defaultTypes,
  'cryptohub-wallets-numberOfWallets': defaultTypes,
  // 'cryptohub-wallets-cards': defaultTypes,
  'cryptohub-wallets-hasAttachedCard': defaultTypes,
  'cryptohub-wallets-maxWalletAnonymity': defaultTypes,
  'cryptohub-wallets-maxWalletEaseOfUse': defaultTypes,
  'cryptohub-wallets-maxWalletSecurity': defaultTypes,
  'cryptohub-wallets-maxWalletRating': defaultTypes,

  'cc-coinlist-Algorithm': defaultTypes,
  'cc-coinlist-BlockNumber': defaultTypes,
  'cc-coinlist-BlockReward': defaultTypes,
  'cc-coinlist-BlockTime': defaultTypes,
  'cc-coinlist-BuiltOn': defaultTypes,
  'cc-coinlist-ContentCreatedOn': defaultTypes,
  'cc-coinlist-CoinName': defaultTypes,
  'cc-coinlist-FullName': defaultTypes,
  'cc-coinlist-FullyPremined': defaultTypes,
  'cc-coinlist-Id': defaultTypes,
  'cc-coinlist-ImageUrl': defaultTypes,
  'cc-coinlist-IsTrading': defaultTypes,
  'cc-coinlist-Name': defaultTypes,
  'cc-coinlist-NetHashesPerSecond': defaultTypes,
  'cc-coinlist-PreMinedValue': defaultTypes,
  'cc-coinlist-ProofType': defaultTypes,
  'cc-coinlist-SmartContractAddress': defaultTypes,
  'cc-coinlist-SortOrder': defaultTypes,
  'cc-coinlist-Sponsored': defaultTypes,
  'cc-coinlist-Symbol': defaultTypes,
  'cc-coinlist-TotalCoinSupply': defaultTypes,
  'cc-coinlist-TotalCoinsFreeFloat': defaultTypes,
  'cc-coinlist-TotalCoinsMined': defaultTypes,
  'cc-coinlist-Url': defaultTypes,

  'cc-total-vol-full-PRICE-cryptohub-BTC': defaultTypes,
  'cc-total-vol-full-Algorithm': defaultTypes,
  'cc-total-vol-full-BlockNumber': defaultTypes,
  'cc-total-vol-full-BlockReward': defaultTypes,
  'cc-total-vol-full-BlockTime': defaultTypes,
  'cc-total-vol-full-Id': defaultTypes,
  'cc-total-vol-full-ImageUrl': defaultTypes,
  'cc-total-vol-full-Name': defaultTypes,
  'cc-total-vol-full-NetHashesPerSecond': defaultTypes,
  'cc-total-vol-full-ProofType': defaultTypes,
  'cc-total-vol-full-TYPE': defaultTypes,
  'cc-total-vol-full-Type': defaultTypes,
  'cc-total-vol-full-Url': defaultTypes,
  'cc-total-vol-full-CHANGE24HOUR': defaultTypes,
  'cc-total-vol-full-CHANGEDAY': defaultTypes,
  'cc-total-vol-full-CHANGEPCT24HOUR': defaultTypes,
  'cc-total-vol-full-CHANGEPCTHOUR': defaultTypes,
  'cc-total-vol-full-CHANGEPCTDAY': defaultTypes,
  'cc-total-vol-full-CHANGEHOUR': defaultTypes,
  'cc-total-vol-full-DocumentType': defaultTypes,
  'cc-total-vol-full-FLAGS': defaultTypes,
  'cc-total-vol-full-FROMSYMBOL': defaultTypes,
  'cc-total-vol-full-FullName': defaultTypes,
  'cc-total-vol-full-HIGH24HOUR': defaultTypes,
  'cc-total-vol-full-HIGHDAY': defaultTypes,
  'cc-total-vol-full-HIGHHOUR': defaultTypes,
  'cc-total-vol-full-IMAGEURL': defaultTypes,
  'cc-total-vol-full-Internal': defaultTypes,
  'cc-total-vol-full-LASTMARKET': defaultTypes,
  'cc-total-vol-full-LASTTRADEID': defaultTypes,
  'cc-total-vol-full-LASTUPDATE': defaultTypes,
  'cc-total-vol-full-LASTVOLUME': defaultTypes,
  'cc-total-vol-full-LASTVOLUMETO': defaultTypes,
  'cc-total-vol-full-LOW24HOUR': defaultTypes,
  'cc-total-vol-full-LOWDAY': defaultTypes,
  'cc-total-vol-full-LOWHOUR': defaultTypes,
  'cc-total-vol-full-MARKET': defaultTypes,
  'cc-total-vol-full-MKTCAP': defaultTypes,
  'cc-total-vol-full-OPEN24HOUR': defaultTypes,
  'cc-total-vol-full-OPENDAY': defaultTypes,
  'cc-total-vol-full-OPENHOUR': defaultTypes,
  'cc-total-vol-full-PRICE': defaultTypes,
  'cc-total-vol-full-SUPPLY': defaultTypes,
  'cc-total-vol-full-TOPTIERVOLUME24HOUR': defaultTypes,
  'cc-total-vol-full-TOPTIERVOLUME24HOURTO': defaultTypes,
  'cc-total-vol-full-TOSYMBOL': defaultTypes,
  'cc-total-vol-full-TOTALTOPTIERVOLUME24H': defaultTypes,
  'cc-total-vol-full-TOTALTOPTIERVOLUME24HTO': defaultTypes,
  'cc-total-vol-full-TOTALVOLUME24H': defaultTypes,
  'cc-total-vol-full-TOTALVOLUME24HTO': defaultTypes,
  'cc-total-vol-full-VOLUME24HOUR': defaultTypes,
  'cc-total-vol-full-VOLUME24HOURTO': defaultTypes,
  'cc-total-vol-full-VOLUMEDAY': defaultTypes,
  'cc-total-vol-full-VOLUMEDAYTO': defaultTypes,
  'cc-total-vol-full-VOLUMEHOUR': defaultTypes,
  'cc-total-vol-full-VOLUMEHOURTO': defaultTypes,

  'cc-social-General_Name': defaultTypes,
  'cc-social-General_CoinName': defaultTypes,
  'cc-social-General_Type': defaultTypes,
  'cc-social-General_Points': defaultTypes,
  'cc-social-CryptoCompare_Followers': defaultTypes,
  'cc-social-CryptoCompare_Posts': defaultTypes,
  'cc-social-CryptoCompare_Points': defaultTypes,
  'cc-social-CryptoCompare_Comments': defaultTypes,
  'cc-social-Twitter_account_creation': defaultTypes,
  'cc-social-Twitter_followers': defaultTypes,
  'cc-social-Twitter_statuses': defaultTypes,
  'cc-social-Twitter_link': defaultTypes,
  'cc-social-Twitter_lists': defaultTypes,
  'cc-social-Twitter_favourites': defaultTypes,
  'cc-social-Twitter_following': defaultTypes,
  'cc-social-Twitter_name': defaultTypes,
  'cc-social-Twitter_Points': defaultTypes,
  'cc-social-Reddit_posts_per_hour': defaultTypes,
  'cc-social-Reddit_comments_per_hour': defaultTypes,
  'cc-social-Reddit_comments_per_day': defaultTypes,
  'cc-social-Reddit_active_users': defaultTypes,
  'cc-social-Reddit_link': defaultTypes,
  'cc-social-Reddit_community_creation': defaultTypes,
  'cc-social-Reddit_posts_per_day': defaultTypes,
  'cc-social-Reddit_name': defaultTypes,
  'cc-social-Reddit_subscribers': defaultTypes,
  'cc-social-Reddit_Points': defaultTypes,
  'cc-social-Facebook_talking_about': defaultTypes,
  'cc-social-Facebook_is_closed': defaultTypes,
  'cc-social-Facebook_likes': defaultTypes,
  'cc-social-Facebook_name': defaultTypes,
  'cc-social-Facebook_link': defaultTypes,
  'cc-social-Facebook_Points': defaultTypes,
  'cc-social-CodeRepository_Points': defaultTypes,
  // 'cc-social-CryptoCompare_PageViews': defaultTypes,
  // 'cc-social-CryptoCompare_SimilarItems': defaultTypes,
  // 'cc-social-CryptoCompare_CryptopianFollowers': defaultTypes,
  // 'cc-social-CryptoCompare_PageViewsSplit': defaultTypes,
  // 'cc-social-CodeRepository_List': defaultTypes,

  'cc-snapshot-General_TotalCoinSupply': defaultTypes,
  'cc-snapshot-General_DifficultyAdjustment': defaultTypes,
  'cc-snapshot-General_BlockRewardReduction': defaultTypes,
  'cc-snapshot-General_StartDate': defaultTypes,
  'cc-snapshot-General_WebsiteUrl': defaultTypes,
  'cc-snapshot-General_Description': defaultTypes,
  'cc-snapshot-General_Features': defaultTypes,
  'cc-snapshot-General_Technology': defaultTypes,
  'cc-snapshot-ICO_Status': defaultTypes,
  'cc-snapshot-ICO_Description': defaultTypes,
  'cc-snapshot-ICO_TokenType': defaultTypes,
  'cc-snapshot-ICO_WebsiteLink': defaultTypes,
  'cc-snapshot-ICO_PublicPortfolioUrl': defaultTypes,
  'cc-snapshot-ICO_FundingTarget': defaultTypes,
  'cc-snapshot-ICO_FundingCap': defaultTypes,
  'cc-snapshot-ICO_ICOTokenSupply': defaultTypes,
  'cc-snapshot-ICO_TokenSupplyPostICO': defaultTypes,
  'cc-snapshot-ICO_TokenPercentageForInvestors': defaultTypes,
  'cc-snapshot-ICO_TokenReserveSplit': defaultTypes,
  'cc-snapshot-ICO_Date': defaultTypes,
  'cc-snapshot-ICO_EndDate': defaultTypes,
  'cc-snapshot-ICO_FundsRaisedList': defaultTypes,
  'cc-snapshot-ICO_FundsRaisedUSD': defaultTypes,
  'cc-snapshot-ICO_StartPrice': defaultTypes,
  'cc-snapshot-ICO_StartPriceCurrency': defaultTypes,
  'cc-snapshot-ICO_PaymentMethod': defaultTypes,
  'cc-snapshot-ICO_Jurisdiction': defaultTypes,
  'cc-snapshot-ICO_LegalAdvisers': defaultTypes,
  'cc-snapshot-ICO_LegalForm': defaultTypes,
  'cc-snapshot-ICO_SecurityAuditCompany': defaultTypes,
  'cc-snapshot-ICO_BlogLink': defaultTypes,
  'cc-snapshot-ICO_WhitePaperLink': defaultTypes,

  'cmc-listings-id': defaultTypes,
  'cmc-listings-name': defaultTypes,
  'cmc-listings-symbol': defaultTypes,
  'cmc-listings-slug': defaultTypes,
  'cmc-listings-num_market_pairs': defaultTypes,
  'cmc-listings-date_added': defaultTypes,
  'cmc-listings-tags': defaultTypes,
  'cmc-listings-max_supply': defaultTypes,
  'cmc-listings-circulating_supply': defaultTypes,
  'cmc-listings-total_supply': defaultTypes,
  'cmc-listings-platform': defaultTypes,
  'cmc-listings-cmc_rank': defaultTypes,
  'cmc-listings-last_updated': defaultTypes,
  'cmc-listings-quote_USD_price': defaultTypes,
  'cmc-listings-quote_USD_volume_24h': defaultTypes,
  'cmc-listings-quote_USD_percent_change_1h': defaultTypes,
  'cmc-listings-quote_USD_percent_change_24h': defaultTypes,
  'cmc-listings-quote_USD_percent_change_7d': defaultTypes,
  'cmc-listings-quote_USD_market_cap': defaultTypes,
  'cmc-listings-rank': defaultTypes,
  'cmc-listings-quote_USD_last_updated': defaultTypes,
  'cmc-listings-quote_USD_price_BTC': defaultTypes,

  'm-metrics-id': defaultTypes,
  'm-metrics-symbol': defaultTypes,
  'm-metrics-name': defaultTypes,
  'm-metrics-market_data_price_usd': defaultTypes,
  'm-metrics-market_data_price_btc': defaultTypes,
  'm-metrics-market_data_volume_last_24_hours': defaultTypes,
  'm-metrics-market_data_real_volume_last_24_hours': defaultTypes,
  'm-metrics-market_data_volume_last_24_hours_overstatement_multiple': defaultTypes,
  'm-metrics-market_data_percent_change_usd_last_24_hours': defaultTypes,
  'm-metrics-market_data_percent_change_btc_last_24_hours': defaultTypes,
  'm-metrics-marketcap_current_marketcap_usd': defaultTypes,
  'm-metrics-marketcap_y_2050_marketcap_usd': defaultTypes,
  'm-metrics-marketcap_y_plus10_marketcap_usd': defaultTypes,
  'm-metrics-marketcap_liquid_marketcap_usd': defaultTypes,
  'm-metrics-marketcap_volume_turnover_last_24_hours_percent': defaultTypes,
  'm-metrics-supply_y_2050': defaultTypes,
  'm-metrics-supply_y_plus10': defaultTypes,
  'm-metrics-supply_liquid': defaultTypes,
  'm-metrics-supply_circulating': defaultTypes,
  'm-metrics-supply_y_2050_issued_percent': defaultTypes,
  'm-metrics-supply_annual_inflation_percent': defaultTypes,
  'm-metrics-supply_y_plus10_issued_percent': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_transaction_volume': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_adjusted_transaction_volume': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_nvt': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_adjusted_nvt': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_sum_of_fees': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_median_tx_value': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_median_tx_fee': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_count_of_active_addresses': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_count_of_tx': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_count_of_payments': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_new_issuance': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_average_difficulty': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_kilobytes_added': defaultTypes,
  'm-metrics-blockchain_stats_24_hours_count_of_blocks_added': defaultTypes,
  'm-metrics-all_time_high_price': defaultTypes,
  'm-metrics-all_time_high_at': defaultTypes,
  'm-metrics-all_time_high_days_since': defaultTypes,
  'm-metrics-all_time_high_percent_down': defaultTypes,
  'm-metrics-all_time_high_breakeven_multiple': defaultTypes,
  'm-metrics-cycle_low_price': defaultTypes,
  'm-metrics-cycle_low_at': defaultTypes,
  'm-metrics-cycle_low_percent_up': defaultTypes,
  'm-metrics-cycle_low_days_since': defaultTypes,
  'm-metrics-token_sale_stats_sale_proceeds_usd': defaultTypes,
  'm-metrics-token_sale_stats_sale_start_date': defaultTypes,
  'm-metrics-token_sale_stats_sale_end_date': defaultTypes,
  'm-metrics-token_sale_stats_roi_since_sale_usd_percent': defaultTypes,
  'm-metrics-token_sale_stats_roi_since_sale_btc_percent': defaultTypes,
  'm-metrics-token_sale_stats_roi_since_sale_eth_percent': defaultTypes,
  'm-metrics-staking_stats_staking_yield_percent': defaultTypes,
  'm-metrics-staking_stats_staking_type': defaultTypes,
  'm-metrics-staking_stats_staking_minimum': defaultTypes,
  'm-metrics-staking_stats_tokens_staked': defaultTypes,
  'm-metrics-staking_stats_tokens_staked_percent': defaultTypes,
  'm-metrics-staking_stats_real_staking_yield_percent': defaultTypes,
  'm-metrics-mining_stats_mining_algo': defaultTypes,
  'm-metrics-mining_stats_network_hash_rate': defaultTypes,
  'm-metrics-mining_stats_available_on_nicehash_percent': defaultTypes,
  'm-metrics-mining_stats_1_hour_attack_cost': defaultTypes,
  'm-metrics-mining_stats_24_hours_attack_cost': defaultTypes,
  'm-metrics-mining_stats_attack_appeal': defaultTypes,
  'm-metrics-developer_activity_stars': defaultTypes,
  'm-metrics-developer_activity_watchers': defaultTypes,
  'm-metrics-developer_activity_commits_last_3_months': defaultTypes,
  'm-metrics-developer_activity_commits_last_1_year': defaultTypes,
  'm-metrics-developer_activity_lines_added_last_3_months': defaultTypes,
  'm-metrics-developer_activity_lines_added_last_1_year': defaultTypes,
  'm-metrics-developer_activity_lines_deleted_last_3_months': defaultTypes,
  'm-metrics-developer_activity_lines_deleted_last_1_year': defaultTypes,
  'm-metrics-roi_data_percent_change_last_1_week': defaultTypes,
  'm-metrics-roi_data_percent_change_last_1_month': defaultTypes,
  'm-metrics-roi_data_percent_change_last_3_months': defaultTypes,
  'm-metrics-roi_data_percent_change_last_1_year': defaultTypes,
  'm-metrics-roi_data_percent_change_btc_last_1_week': defaultTypes,
  'm-metrics-roi_data_percent_change_btc_last_1_month': defaultTypes,
  'm-metrics-roi_data_percent_change_btc_last_3_months': defaultTypes,
  'm-metrics-roi_data_percent_change_btc_last_1_year': defaultTypes,
  'm-metrics-roi_data_percent_change_month_to_date': defaultTypes,
  'm-metrics-roi_data_percent_change_quarter_to_date': defaultTypes,
  'm-metrics-roi_data_percent_change_year_to_date': defaultTypes,
  'm-metrics-roi_by_year_2018_usd_percent': defaultTypes,
  'm-metrics-roi_by_year_2017_usd_percent': defaultTypes,
  'm-metrics-roi_by_year_2016_usd_percent': defaultTypes,
  'm-metrics-roi_by_year_2015_usd_percent': defaultTypes,
  'm-metrics-roi_by_year_2014_usd_percent': defaultTypes,
  'm-metrics-roi_by_year_2013_usd_percent': defaultTypes,
  'm-metrics-roi_by_year_2012_usd_percent': defaultTypes,
  'm-metrics-roi_by_year_2011_usd_percent': defaultTypes,
  'm-metrics-risk_metrics_sharpe_ratios_last_30_days': defaultTypes,
  'm-metrics-risk_metrics_sharpe_ratios_last_90_days': defaultTypes,
  'm-metrics-risk_metrics_sharpe_ratios_last_1_year': defaultTypes,
  'm-metrics-risk_metrics_sharpe_ratios_last_3_years': defaultTypes,
  'm-metrics-misc_data_vladimir_club_cost': defaultTypes,
  'm-metrics-misc_data_btc_current_normalized_supply_price_usd': defaultTypes,
  'm-metrics-misc_data_btc_y2050_normalized_supply_price_usd': defaultTypes,
  'm-metrics-misc_data_asset_created_at': defaultTypes,
  'm-metrics-misc_data_asset_age_days': defaultTypes,
  'm-metrics-misc_data_categories': defaultTypes,
  'm-metrics-misc_data_sectors': defaultTypes,

  'm-assets-id': defaultTypes,
  'm-assets-symbol': defaultTypes,
  'm-assets-name': defaultTypes,
  'm-assets-slug': defaultTypes,
  'm-assets-metrics-market_data_price_usd': defaultTypes,
  'm-assets-metrics-market_data_price_btc': defaultTypes,
  'm-assets-metrics-market_data_volume_last_24_hours': defaultTypes,
  'm-assets-metrics-market_data_real_volume_last_24_hours': defaultTypes,
  'm-assets-metrics-market_data_volume_last_24_hours_overstatement_multiple': defaultTypes,
  'm-assets-metrics-market_data_percent_change_usd_last_24_hours': defaultTypes,
  'm-assets-metrics-market_data_percent_change_btc_last_24_hours': defaultTypes,
  'm-assets-metrics-market_data_last_trade_at': defaultTypes,
  'm-assets-metrics-marketcap_current_marketcap_usd': defaultTypes,
  'm-assets-metrics-marketcap_y_2050_marketcap_usd': defaultTypes,
  'm-assets-metrics-marketcap_y_plus10_marketcap_usd': defaultTypes,
  'm-assets-metrics-marketcap_liquid_marketcap_usd': defaultTypes,
  'm-assets-metrics-marketcap_volume_turnover_last_24_hours_percent': defaultTypes,
  'm-assets-metrics-supply_y_2050': defaultTypes,
  'm-assets-metrics-supply_y_plus10': defaultTypes,
  'm-assets-metrics-supply_liquid': defaultTypes,
  'm-assets-metrics-supply_circulating': defaultTypes,
  'm-assets-metrics-supply_y_2050_issued_percent': defaultTypes,
  'm-assets-metrics-supply_annual_inflation_percent': defaultTypes,
  'm-assets-metrics-supply_y_plus10_issued_percent': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_transaction_volume': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_adjusted_transaction_volume': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_nvt': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_adjusted_nvt': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_sum_of_fees': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_median_tx_value': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_median_tx_fee': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_count_of_active_addresses': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_count_of_tx': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_count_of_payments': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_new_issuance': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_average_difficulty': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_kilobytes_added': defaultTypes,
  'm-assets-metrics-blockchain_stats_24_hours_count_of_blocks_added': defaultTypes,
  'm-assets-metrics-all_time_high_price': defaultTypes,
  'm-assets-metrics-all_time_high_at': defaultTypes,
  'm-assets-metrics-all_time_high_days_since': defaultTypes,
  'm-assets-metrics-all_time_high_percent_down': defaultTypes,
  'm-assets-metrics-all_time_high_breakeven_multiple': defaultTypes,
  'm-assets-metrics-cycle_low_price': defaultTypes,
  'm-assets-metrics-cycle_low_at': defaultTypes,
  'm-assets-metrics-cycle_low_percent_up': defaultTypes,
  'm-assets-metrics-cycle_low_days_since': defaultTypes,
  'm-assets-metrics-token_sale_stats_sale_proceeds_usd': defaultTypes,
  'm-assets-metrics-token_sale_stats_sale_start_date': defaultTypes,
  'm-assets-metrics-token_sale_stats_sale_end_date': defaultTypes,
  'm-assets-metrics-token_sale_stats_roi_since_sale_usd_percent': defaultTypes,
  'm-assets-metrics-token_sale_stats_roi_since_sale_btc_percent': defaultTypes,
  'm-assets-metrics-token_sale_stats_roi_since_sale_eth_percent': defaultTypes,
  'm-assets-metrics-staking_stats_staking_yield_percent': defaultTypes,
  'm-assets-metrics-staking_stats_staking_type': defaultTypes,
  'm-assets-metrics-staking_stats_staking_minimum': defaultTypes,
  'm-assets-metrics-staking_stats_tokens_staked': defaultTypes,
  'm-assets-metrics-staking_stats_tokens_staked_percent': defaultTypes,
  'm-assets-metrics-staking_stats_real_staking_yield_percent': defaultTypes,
  'm-assets-metrics-mining_stats_mining_algo': defaultTypes,
  'm-assets-metrics-mining_stats_network_hash_rate': defaultTypes,
  'm-assets-metrics-mining_stats_available_on_nicehash_percent': defaultTypes,
  'm-assets-metrics-mining_stats_1_hour_attack_cost': defaultTypes,
  'm-assets-metrics-mining_stats_24_hours_attack_cost': defaultTypes,
  'm-assets-metrics-mining_stats_attack_appeal': defaultTypes,
  'm-assets-metrics-developer_activity_stars': defaultTypes,
  'm-assets-metrics-developer_activity_watchers': defaultTypes,
  'm-assets-metrics-developer_activity_commits_last_3_months': defaultTypes,
  'm-assets-metrics-developer_activity_commits_last_1_year': defaultTypes,
  'm-assets-metrics-developer_activity_lines_added_last_3_months': defaultTypes,
  'm-assets-metrics-developer_activity_lines_added_last_1_year': defaultTypes,
  'm-assets-metrics-developer_activity_lines_deleted_last_3_months': defaultTypes,
  'm-assets-metrics-developer_activity_lines_deleted_last_1_year': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_last_1_week': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_last_1_month': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_last_3_months': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_last_1_year': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_btc_last_1_week': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_btc_last_1_month': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_btc_last_3_months': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_btc_last_1_year': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_month_to_date': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_quarter_to_date': defaultTypes,
  'm-assets-metrics-roi_data_percent_change_year_to_date': defaultTypes,
  'm-assets-metrics-roi_by_year_2018_usd_percent': defaultTypes,
  'm-assets-metrics-roi_by_year_2017_usd_percent': defaultTypes,
  'm-assets-metrics-roi_by_year_2016_usd_percent': defaultTypes,
  'm-assets-metrics-roi_by_year_2015_usd_percent': defaultTypes,
  'm-assets-metrics-roi_by_year_2014_usd_percent': defaultTypes,
  'm-assets-metrics-roi_by_year_2013_usd_percent': defaultTypes,
  'm-assets-metrics-roi_by_year_2012_usd_percent': defaultTypes,
  'm-assets-metrics-roi_by_year_2011_usd_percent': defaultTypes,
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_30_days': defaultTypes,
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_90_days': defaultTypes,
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_1_year': defaultTypes,
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_3_years': defaultTypes,
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_30_days': defaultTypes,
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_90_days': defaultTypes,
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_1_year': defaultTypes,
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_3_years': defaultTypes,
  'm-assets-metrics-misc_data_vladimir_club_cost': defaultTypes,
  'm-assets-metrics-misc_data_btc_current_normalized_supply_price_usd': defaultTypes,
  'm-assets-metrics-misc_data_btc_y2050_normalized_supply_price_usd': defaultTypes,
  'm-assets-metrics-misc_data_asset_created_at': defaultTypes,
  'm-assets-metrics-misc_data_asset_age_days': defaultTypes,
  'm-assets-metrics-misc_data_categories': defaultTypes,
  'm-assets-metrics-misc_data_sectors': defaultTypes,
  'm-assets-profile-is_verified': defaultTypes,
  'm-assets-profile-tagline': defaultTypes,
  'm-assets-profile-token_distribution_sale_start': defaultTypes,
  'm-assets-profile-token_distribution_sale_end': defaultTypes,
  'm-assets-profile-token_distribution_initial_distribution': defaultTypes,
  'm-assets-profile-token_distribution_current_supply': defaultTypes,
  'm-assets-profile-token_distribution_max_supply': defaultTypes,
  'm-assets-profile-token_details_usage': defaultTypes,
  'm-assets-profile-token_details_type': defaultTypes,
  'm-assets-profile-token_details_sales_rounds': defaultTypes,
  'm-assets-profile-token_details_block_reward': defaultTypes,
  'm-assets-profile-token_details_targeted_block_time_in_sec': defaultTypes,
  'm-assets-profile-token_details_on_chain_governance_structure': defaultTypes,
  'm-assets-profile-token_details_is_treasury_decentralized': defaultTypes,
  'm-assets-profile-token_details_launch_style': defaultTypes,
  'm-assets-profile-token_details_initial_supply': defaultTypes,
  'm-assets-profile-token_details_percentage_allocated_to_investors_from_initial_supply': defaultTypes,
  'm-assets-profile-token_details_percentage_allocated_to_premined_or_airdrops_from_initial_supply': defaultTypes,
  'm-assets-profile-token_details_percentage_allocated_to_organizations_or_founders_supply': defaultTypes,
  'm-assets-profile-token_details_next_halving_date': defaultTypes,
  'm-assets-profile-token_details_genesis_block_date': defaultTypes,
  'm-assets-profile-token_details_is_victim_of_51_percent_attack': defaultTypes,
  'm-assets-profile-token_details_emission_type_general': defaultTypes,
  'm-assets-profile-token_details_emission_type_precise': defaultTypes,
  'm-assets-profile-token_details_is_capped_supply': defaultTypes,
  'm-assets-profile-token_details_max_supply': defaultTypes,
  'm-assets-profile-consensus_algorithm': defaultTypes,
  // 'm-assets-profile-organizations': defaultTypes,
  // 'm-assets-profile-people_founding_team': defaultTypes,
  // 'm-assets-profile-people_contributors': defaultTypes,
  // 'm-assets-profile-people_investors': defaultTypes,
  // 'm-assets-profile-people_advisors': defaultTypes,
  // 'm-assets-profile-relevant_resources': defaultTypes,
  // 'm-assets-profile-overview': defaultTypes,
  // 'm-assets-profile-packground': defaultTypes,
  // 'm-assets-profile-technology': defaultTypes,
  // 'm-assets-profile-token_distribution_description': defaultTypes,
  // 'm-assets-profile-organizations': defaultTypes,
  // 'm-assets-profile-people_founding_team': defaultTypes,
  // 'm-assets-profile-people_contributors': defaultTypes,
  // 'm-assets-profile-people_investors': defaultTypes,
  // 'm-assets-profile-people_advisors': defaultTypes,
  // 'm-assets-profile-relevant_resources': defaultTypes,

  'm-markets-id': defaultTypes,
  'm-markets-exchange': defaultTypes,
  'm-markets-exchange_id': defaultTypes,
  'm-markets-base': defaultTypes,
  'm-markets-base_asset_id': defaultTypes,
  'm-markets-quote': defaultTypes,
  'm-markets-quote_asset_id': defaultTypes,
  'm-markets-pair': defaultTypes,
  'm-markets-price_usd': defaultTypes,
  'm-markets-volume_last_24_hours': defaultTypes,
  'm-markets-deviation_from_vwap_percent': defaultTypes,
  'm-markets-last_trade_at': defaultTypes,
  'm-markets-excluded_from_price': defaultTypes,

  'm-prices-id': defaultTypes,
  'm-prices-symbol': defaultTypes,
  'm-prices-rank': defaultTypes,
  'm-prices-slug': defaultTypes,
  'm-prices-name': defaultTypes,
  'm-prices-priceUsd': defaultTypes,
  'm-prices-priceBtc': defaultTypes,
  'm-prices-percentageChange24HrUsd': defaultTypes,
  'm-prices-percentageChange24HrBtc': defaultTypes,
  'm-prices-percentageChange7dUsd': defaultTypes,
  'm-prices-percentageChange7dBtc': defaultTypes,
  'm-prices-percentageChange90dUsd': defaultTypes,
  'm-prices-percentageChange90dBtc': defaultTypes,
  'm-prices-percentageChange1yrUsd': defaultTypes,
  'm-prices-percentageChange1yrBtc': defaultTypes,
  'm-prices-y2050Marketcap': defaultTypes,
  'm-prices-currentMarketcap': defaultTypes,
  'm-prices-vol24HrUsd': defaultTypes,
  'm-prices-realVol24HrUsd': defaultTypes,
  'm-prices-volOverstatementMultiple': defaultTypes,
  'm-prices-age': defaultTypes,
  'm-prices-y2050Supply': defaultTypes,
  'm-prices-circulatingSupply': defaultTypes,
  'm-prices-supplyPercentageIssued': defaultTypes,
  'm-prices-instInflation': defaultTypes,
  'm-prices-vladimirClubCostUsd': defaultTypes,
  'm-prices-athUsd': defaultTypes,
  'm-prices-athTimestamp': defaultTypes,
  'm-prices-percentageDownFromAth': defaultTypes,
  'm-prices-breakevenMultiple': defaultTypes,
  'm-prices-txVol24hr': defaultTypes,
  'm-prices-adjustedTxVol24hr': defaultTypes,
  'm-prices-nvt24hr': defaultTypes,
  'm-prices-adjustedNvt24hr': defaultTypes,
  'm-prices-activeAddresses24hr': defaultTypes,
  'm-prices-txCount24hr': defaultTypes,
  'm-prices-newIssuance24hrUsd': defaultTypes,
  'm-prices-fees24hrUsd': defaultTypes,
  'm-prices-avgDifficulty24hr': defaultTypes,
  'm-prices-paymentCount24hr': defaultTypes,
  'm-prices-medianTx24hrUsd': defaultTypes,
  'm-prices-medianFee24hrUsd': defaultTypes,
  'm-prices-dataAdded24hrKb': defaultTypes,
  'm-prices-blockCount24hr': defaultTypes,
  'm-prices-githubStars': defaultTypes,
  'm-prices-githubWatchers': defaultTypes,
  'm-prices-githubCommits90d': defaultTypes,
  'm-prices-githubCommits365d': defaultTypes,
  'm-prices-githubAdditions90d': defaultTypes,
  'm-prices-githubAdditions365d': defaultTypes,
  'm-prices-githubDeletions90d': defaultTypes,
  'm-prices-githubDeletions365d': defaultTypes,
  'm-prices-roi2018': defaultTypes,
  'm-prices-priceBtcNormalizedSupply': defaultTypes,
  'm-prices-priceBtcNormalizedSupplyY2050': defaultTypes,
  'm-prices-cycleLowUsd': defaultTypes,
  'm-prices-cycleLowTimestamp': defaultTypes,
  'm-prices-percentageUpFromCycleLow': defaultTypes,
  'm-prices-miningAlg': defaultTypes,
  'm-prices-networkHashRate': defaultTypes,
  'm-prices-availableOnNicehash': defaultTypes,
  'm-prices-attackHourlyCost': defaultTypes,
  'm-prices-attackDailyCost': defaultTypes,
  'm-prices-percentageChangeMtdUsd': defaultTypes,
  'm-prices-percentageChangeQtdUsd': defaultTypes,
  'm-prices-percentageChangeYtdUsd': defaultTypes,
  'm-prices-stakingEngagedPercent': defaultTypes,
  'm-prices-flipsideGrade': defaultTypes,
  'm-prices-flipsideRating': defaultTypes,
  'm-prices-flipsideDevScore': defaultTypes,
  'm-prices-flipsideUtilityScore': defaultTypes,
  'm-prices-flipsideMaturityScore': defaultTypes,
  'm-prices-tokenInsightGrade': defaultTypes,
  'm-prices-tokenInsightTeamScore': defaultTypes,
  'm-prices-tokenInsightSubjectScore': defaultTypes,
  'm-prices-tokenInsightEcologyScore': defaultTypes,
  'm-prices-sharpe30d': defaultTypes,
  'm-prices-sharpe90d': defaultTypes,
  'm-prices-sharpe1yr': defaultTypes,
  'm-prices-volatility30d': defaultTypes,
  'm-prices-volatility90d': defaultTypes,
  'm-prices-volatility1yr': defaultTypes,
  'm-prices-y10Supply': defaultTypes,
  'm-prices-y10Marketcap': defaultTypes,
  'm-prices-supplyY10PercentageIssued': defaultTypes,
  'm-prices-liquidSupply': defaultTypes,
  'm-prices-liquidMarketcap': defaultTypes,
  'm-prices-vol24HrTurnover': defaultTypes,

  'xe-name': defaultTypes,
  'xe-unitsPerUSD': defaultTypes,
  'xe-USDPerUnits': defaultTypes,

}

// /**
//  *
//  * At the moment the data could be anything because the apis suck.
//  * Once we get enough data we can check each field to see what to expect
//  */
// const fieldTypeMap = {};
// for (var val of Object.values(columnDependencies)) {
//   val.forEach(field => {
//     fieldTypeMap[field] = 'String|Number|Boolean|Null|Undefined|Array';
//   });
// }

let fieldWhitelist = Object.keys(fieldTypeMap);

/**
 *
 *  uriCryptocompareList:
 *    Returns all the coins that CryptoCompare has added to the website
 *
 *  uriCryptocompareExchanges:
 *    Returns all the exchanges that CryptoCompare has integrated with and their status,
 *    including whether or not they are excluded from pricing and volumes
 *
 *  tagUriCryptocompareTradingInfoSingle:
 *    Compute the current trading info (price, vol, open, high, low etc) of the
 *    requested pair as a volume weighted average based on the exchanges requested
 *
 *
 *
 *  tagUriCryptocompareSnapshot:
 *    Get the general, subs (used to connect to the streamer and to figure out what exchanges we have
 *    data for and what are the exact coin pairs of the coin) and the aggregated prices for all pairs available
 *
 *  tagUriCryptocompareSocialstats:
 *    Get CryptoCompare website, Facebook, code repository, Twitter and Reddit data for coins
 *    If called with the id of a cryptopian you just get data from Cryptocompare website that is available to the public
 *
 */
const settings = {

  defaultViews,

  isProd,

  coinmarketcapApiKey,
  cryptocompareApiKey,

  //
  // App settings
  //
  debug: true, // TODO: Change this to an env var
  logger: args.options.logger || false,
  maxRowsTemplatedIn: 50,
  maxRecordsScraped: 5000,

  // The diff-json library has a bug where null field throw an error on add.
  // For now we are just not going to send null fields, lightens the load anyhow.
  removeNullFields: true,

  //
  // Directories & Paths
  //
  dbDir,
  appRoot: path.resolve(__dirname),
  cacheDir,
  scrapeDir,
  generatedDir,
  cryptohubDir,

  columnDependencies,

  //
  // Lists
  //
  fieldWhitelist,

  //
  // Maps
  //
  fieldTypeMap,

  //
  // Cache
  // NOTE: we dont really need this if we are using rate limits. Using it for dev though
  //
  cacheForXe: 0, // isProd ? 0 : 1000 * 60 * 10,
  cacheForMessari: 0, // isProd ? 0 : 1000 * 60 * 10,
  cacheForCryptocompare: 0, // isProd ? 0 : 1000 * 60 * 10,
  cacheForCoinmarketcap: 0, // isProd ? 0 : 1000 * 60 * 60 * 24,

  //
  // RateLimits
  //

  //
  // From cryptocompare.com:
  //   Caching: 10 seconds
  //   Rate limits:
  //     Month  - 100000
  //     Day    - 3200
  //     Hour   - 130
  //     Minute - 2
  //     Second - 0.038
  //
  //  26784 ms between requests :(
  //
  rateLimitCryptocompare: 26784,

  // Unknow at the moment
  rateLimitMessari: 1000 * 10,

  //
  // Based on credits so need to implement checks
  //
  // For cryptocurrency listings its 1 credit per 200 results
  //
  rateLimitCoinmarketcap: 1000 * 60 * 60,

  rateLimitXe: 1000 * 60 * 60 * 24,

  //
  // Queues
  //
  queueCoinmarketcap: 1000 * 60 * 60,

  //
  // ISO
  //
  uriISO4217CurrencyCodes: `${path.resolve(__dirname)}/../iso/4217.txt`

}

module.exports = settings;
