// Cryptohub
const logger = require('../../logger');

import { objectGetNestedProperty as gnp } from 'bo-utils';

import { getMaps }                        from '../../db/query';
import { perSecondSave }                  from '../../db/save';

/**
 *
 * ASSETS WITH METRICS
 *
 * Original Data
 * -------------
 *
 * [
 *   {
 *     id: "1e31218a-e44e-4285-820c-8282ee222035",
 *     symbol: "BTC",
 *     name: "Bitcoin",
 *     slug: "bitcoin",
 *     metrics: {
 *       market_data: {
 *         price_usd: 11376.32389439192,
 *         price_btc: 1,
 *         volume_last_24_hours: 4794524210.491628,
 *         real_volume_last_24_hours: 693951119.7302462,
 *         volume_last_24_hours_overstatement_multiple: 6.909022947257961,
 *         percent_change_usd_last_24_hours: 0.2749442488695433,
 *         percent_change_btc_last_24_hours: 0,
 *         last_trade_at: "2019-08-12T06:42:31.812Z"
 *       },
 *       marketcap: {
 *          current_marketcap_usd: 203333000500.07532,
 *          y_2050_marketcap_usd: 238781571131.4895,
 *          y_plus10_marketcap_usd: 232844207926.15704,
 *          liquid_marketcap_usd: 203244332897.49088,
 *          volume_turnover_last_24_hours_percent: 0.34143688526865357
 *       },
 *       supply: {
 *          y_2050: 20986335.65,
 *          y_plus10: 20464505.19,
 *          liquid: 17862994.07,
 *          circulating: 17870787,
 *          y_2050_issued_percent: 85.11726090686061,
 *          annual_inflation_percent: 3.315143909690616,
 *          y_plus10_issued_percent: 87.28769107365845
 *       },
 *       blockchain_stats_24_hours: {
 *          transaction_volume: 6480004306.713694,
 *          adjusted_transaction_volume: 2620978669.4887247,
 *          nvt: 31.14233700580015,
 *          adjusted_nvt: 80.54983231541924,
 *          sum_of_fees: 786251.9341766723,
 *          median_tx_value: 8910.125039527979,
 *          median_tx_fee: 1.3598671244555351,
 *          count_of_active_addresses: 815367,
 *          count_of_tx: 337539,
 *          count_of_payments: 727263,
 *          new_issuance: 20210702.05064536,
 *          average_difficulty: 9985348008059.525,
 *          kilobytes_added: 175531.594,
 *          count_of_blocks_added: 142
 *       },
 *       all_time_high: {
 *          price: 20089,
 *          at: "2017-12-17",
 *          days_since: 602,
 *          percent_down: 43.32066795535821,
 *          breakeven_multiple: 1.7643115469539756
 *       },
 *       cycle_low: {
 *          price: 3126.679993636258,
 *          at: "2018-12-15",
 *          percent_up: 264.1661774669197,
 *          days_since: 239
 *       },
 *       token_sale_stats: {
 *          sale_proceeds_usd: null,
 *          sale_start_date: null,
 *          sale_end_date: null,
 *          roi_since_sale_usd_percent: null,
 *          roi_since_sale_btc_percent: null,
 *          roi_since_sale_eth_percent: null
 *       },
 *       staking_stats: {
 *          staking_yield_percent: null,
 *          staking_type: null,
 *          staking_minimum: null,
 *          tokens_staked: null,
 *          tokens_staked_percent: 0,
 *          real_staking_yield_percent: null
 *       },
 *       mining_stats: {
 *          mining_algo: "SHA-256",
 *          network_hash_rate: "74,456 PH/s",
 *          available_on_nicehash_percent: 0.000635160799152795,
 *          1_hour_attack_cost: 873489.0552355951,
 *          24_hours_attack_cost: 20963737.325654283,
 *          attack_appeal: 9706.939273511389
 *       },
 *       developer_activity: {
 *          stars: 39632,
 *          watchers: 3519,
 *          commits_last_3_months: 299,
 *          commits_last_1_year: 1699,
 *          lines_added_last_3_months: 7983,
 *          lines_added_last_1_year: 74961,
 *          lines_deleted_last_3_months: 9130,
 *          lines_deleted_last_1_year: 43110
 *       },
 *       roi_data: {
 *          percent_change_last_1_week: -2.4469549236493777,
 *          percent_change_last_1_month: null,
 *          percent_change_last_3_months: 42.30495187062693,
 *          percent_change_last_1_year: 80.55415265658344,
 *          percent_change_btc_last_1_week: 0,
 *          percent_change_btc_last_1_month: null,
 *          percent_change_btc_last_3_months: 0,
 *          percent_change_btc_last_1_year: 0,
 *          percent_change_month_to_date: 12.923840448134664,
 *          percent_change_quarter_to_date: 6.528447411578281,
 *          percent_change_year_to_date: 207.71890149070495
 *       },
 *       roi_by_year: {
 *          2018_usd_percent: -72.50923276595937,
 *          2017_usd_percent: 1610.7690519883597,
 *          2016_usd_percent: 89.7667,
 *          2015_usd_percent: 35.44,
 *          2014_usd_percent: -57.718,
 *          2013_usd_percent: 5360.674,
 *          2012_usd_percent: 174.8979,
 *          2011_usd_percent: 1420.27027
 *       },
 *       risk_metrics: {
 *         sharpe_ratios: {
 *           last_30_days: 2.107940397528475,
 *           last_90_days: 2.2396790461863465,
 *           last_1_year: 1.2506863007576892,
 *           last_3_years: 1.7130143051810955
 *         },
 *         volatility_stats: {
 *           volatility_last_30_days: 0.6092812501347048,
 *           volatility_last_90_days: 0.772457510570271,
 *           volatility_last_1_year: 0.5969063560376546,
 *           volatility_last_3_years: 0.72417287169021
 *         }
 *       },
 *       misc_data: {
 *         vladimir_club_cost: 23892460.47768497,
 *         btc_current_normalized_supply_price_usd: 11386.311014448089,
 *         btc_y2050_normalized_supply_price_usd: 11386.311014448089,
 *         asset_created_at: "2009-01-03",
 *         asset_age_days: 3872,
 *         categories: ["currency"],
 *         sectors: ["currency"]
 *       }
 *     },
 *     profile: {
 *       is_verified: false,
 *       tagline: "Peer-to-peer electronic cash",
 *       overview: "...grammable, native currency.",
 *       background: "Bitcoin is a decentralized...",
 *       technology: "Bitcoin",
 *       token_distribution: {
 *         sale_start: "2009-01-03",
 *         sale_end: "2009-01-03",
 *         initial_distribution: 50,
 *         current_supply: 17350000,
 *         max_supply: 21000000,
 *         description: "Mining blocks is..."
 *       },
 *       token_details: {
 *         usage: "Payments",
 *         type: "Native",
 *         sales_rounds: null
 *       },
 *       organizations: null,
 *       people: {
 *         founding_team: null,
 *         contributors: [
 *           {
 *             first_name: "Giel",
 *             last_name: "van Schijndel",
 *             description: null,
 *             avatar_url: "https://messari.s3.amazonaws.com/images/agora-images/0%3RBhE",
 *             twitter: "https://twitter.com/muggenhor",
 *             github: "https://github.com/muggenhor",
 *             medium: null,
 *             linkedin: "https://www.linkedin.com/in/gielvanschijndel/"
 *           }
 *         ],
 *         investors: null,
 *         advisors: null
 *       },
 *       relevant_resources: [
 *         {
 *           name: "Whitepaper",
 *           url: "https://nakamotoinstitute.org/bitcoin/"
 *         },
 *         {
 *           name: "Github",
 *           url: "https://github.com/bitcoin/bitcoin"
 *         }
 *       ],
 *       consensus_algorithm: "PoW"
 *     }
 *   },
 * ]
 *
 *
 * Prefix fields with "m-metrics-"
 * ----------------------------------------------
 * misc_data.sectors -> m-metrics-sectors
 *
 * NOTE:
 *   We need a master field list and we just map stuff from there.
 *   Have a think about it yo
 *
 * @param {Array} data - response from Messari api request
 * @param {String} timestamp
 * @return {Object}
 *
 */
export default async function formatterMessariSectionMetrics(data, timestamp) {

  try {

    function dataIsValid(data) {
      if (Array.isArray(data.data)) return true;
      else return false;
    }

    if (!dataIsValid(data)) return;
    data = data.data;

    const maps = await getMaps(['projectMapSymbolId']);
    const symbolIdMap = maps[0].map;
    const prefix = 'm-assets-';
    let id;
    let item;
    let prop;
    let symbol;
    let result = {};
    for (item of data) {

      symbol = item.symbol.toUpperCase();
      id = symbolIdMap[symbol]; // TODO: need proper mapping for ids
      if (id === void 0) continue;

      result[id] = {
        [`${prefix}id`]                                                      : item.id,
        [`${prefix}symbol`]                                                  : item.symbol,
        [`${prefix}name`]                                                    : item.name,
        [`${prefix}slug`]                                                    : item.slug,

        [`${prefix}metrics-market_data_price_usd`]                                   : gnp(item, 'metrics.market_data.price_usd'),
        [`${prefix}metrics-market_data_price_btc`]                                   : gnp(item, 'metrics.market_data.price_btc'),
        [`${prefix}metrics-market_data_volume_last_24_hours`]                        : gnp(item, 'metrics.market_data.volume_last_24_hours'),
        [`${prefix}metrics-market_data_real_volume_last_24_hours`]                   : gnp(item, 'metrics.market_data.real_volume_last_24_hours'),
        [`${prefix}metrics-market_data_volume_last_24_hours_overstatement_multiple`] : gnp(item, 'metrics.market_data.volume_last_24_hours_overstatement_multiple'),
        [`${prefix}metrics-market_data_percent_change_usd_last_24_hours`]            : gnp(item, 'metrics.market_data.percent_change_usd_last_24_hours'),
        [`${prefix}metrics-market_data_percent_change_btc_last_24_hours`]            : gnp(item, 'metrics.market_data.percent_change_btc_last_24_hours'),
        [`${prefix}metrics-market_data_last_trade_at`]                               : gnp(item, 'metrics.market_data.last_trade_at'),

        [`${prefix}metrics-marketcap_current_marketcap_usd`]                         : gnp(item, 'metrics.marketcap.current_marketcap_usd'),
        [`${prefix}metrics-marketcap_y_2050_marketcap_usd`]                          : gnp(item, 'metrics.marketcap.y_2050_marketcap_usd'),
        [`${prefix}metrics-marketcap_y_plus10_marketcap_usd`]                        : gnp(item, 'metrics.marketcap.y_plus10_marketcap_usd'),
        [`${prefix}metrics-marketcap_liquid_marketcap_usd`]                          : gnp(item, 'metrics.marketcap.liquid_marketcap_usd'),
        [`${prefix}metrics-marketcap_volume_turnover_last_24_hours_percent`]         : gnp(item, 'metrics.marketcap.volume_turnover_last_24_hours_percent'),

        [`${prefix}metrics-supply_y_2050`]                                           : gnp(item, 'metrics.supply.y_2050'),
        [`${prefix}metrics-supply_y_plus10`]                                         : gnp(item, 'metrics.supply.y_plus10'),
        [`${prefix}metrics-supply_liquid`]                                           : gnp(item, 'metrics.supply.liquid'),
        [`${prefix}metrics-supply_circulating`]                                      : gnp(item, 'metrics.supply.circulating'),
        [`${prefix}metrics-supply_y_2050_issued_percent`]                            : gnp(item, 'metrics.supply.y_2050_issued_percent'),
        [`${prefix}metrics-supply_annual_inflation_percent`]                         : gnp(item, 'metrics.supply.annual_inflation_percent'),
        [`${prefix}metrics-supply_y_plus10_issued_percent`]                          : gnp(item, 'metrics.supply.y_plus10_issued_percent'),

        [`${prefix}metrics-blockchain_stats_24_hours_transaction_volume`]            : gnp(item, 'metrics.blockchain_stats_24_hours.transaction_volume'),
        [`${prefix}metrics-blockchain_stats_24_hours_adjusted_transaction_volume`]   : gnp(item, 'metrics.blockchain_stats_24_hours.adjusted_transaction_volume'),
        [`${prefix}metrics-blockchain_stats_24_hours_nvt`]                           : gnp(item, 'metrics.blockchain_stats_24_hours.nvt'),
        [`${prefix}metrics-blockchain_stats_24_hours_adjusted_nvt`]                  : gnp(item, 'metrics.blockchain_stats_24_hours.adjusted_nvt'),
        [`${prefix}metrics-blockchain_stats_24_hours_sum_of_fees`]                   : gnp(item, 'metrics.blockchain_stats_24_hours.sum_of_fees'),
        [`${prefix}metrics-blockchain_stats_24_hours_median_tx_value`]               : gnp(item, 'metrics.blockchain_stats_24_hours.median_tx_value'),
        [`${prefix}metrics-blockchain_stats_24_hours_median_tx_fee`]                 : gnp(item, 'metrics.blockchain_stats_24_hours.median_tx_fee'),
        [`${prefix}metrics-blockchain_stats_24_hours_count_of_active_addresses`]     : gnp(item, 'metrics.blockchain_stats_24_hours.count_of_active_addresses'),
        [`${prefix}metrics-blockchain_stats_24_hours_count_of_tx`]                   : gnp(item, 'metrics.blockchain_stats_24_hours.count_of_tx'),
        [`${prefix}metrics-blockchain_stats_24_hours_count_of_payments`]             : gnp(item, 'metrics.blockchain_stats_24_hours.count_of_payments'),
        [`${prefix}metrics-blockchain_stats_24_hours_new_issuance`]                  : gnp(item, 'metrics.blockchain_stats_24_hours.new_issuance'),
        [`${prefix}metrics-blockchain_stats_24_hours_average_difficulty`]            : gnp(item, 'metrics.blockchain_stats_24_hours.average_difficulty'),
        [`${prefix}metrics-blockchain_stats_24_hours_kilobytes_added`]               : gnp(item, 'metrics.blockchain_stats_24_hours.kilobytes_added'),
        [`${prefix}metrics-blockchain_stats_24_hours_count_of_blocks_added`]         : gnp(item, 'metrics.blockchain_stats_24_hours.count_of_blocks_added'),

        [`${prefix}metrics-all_time_high_price`]                                     : gnp(item, 'metrics.all_time_high.price'),
        [`${prefix}metrics-all_time_high_at`]                                        : gnp(item, 'metrics.all_time_high.at'),
        [`${prefix}metrics-all_time_high_days_since`]                                : gnp(item, 'metrics.all_time_high.days_since'),
        [`${prefix}metrics-all_time_high_percent_down`]                              : gnp(item, 'metrics.all_time_high.percent_down'),
        [`${prefix}metrics-all_time_high_breakeven_multiple`]                        : gnp(item, 'metrics.all_time_high.breakeven_multiple'),

        [`${prefix}metrics-cycle_low_price`]                                         : gnp(item, 'metrics.cycle_low.price'),
        [`${prefix}metrics-cycle_low_at`]                                            : gnp(item, 'metrics.cycle_low.at'),
        [`${prefix}metrics-cycle_low_percent_up`]                                    : gnp(item, 'metrics.cycle_low.percent_up'),
        [`${prefix}metrics-cycle_low_days_since`]                                    : gnp(item, 'metrics.cycle_low.days_since'),
        [`${prefix}metrics-token_sale_stats_sale_proceeds_usd`]                      : gnp(item, 'metrics.token_sale_stats.sale_proceeds_usd'),
        [`${prefix}metrics-token_sale_stats_sale_start_date`]                        : gnp(item, 'metrics.token_sale_stats.sale_start_date'),
        [`${prefix}metrics-token_sale_stats_sale_end_date`]                          : gnp(item, 'metrics.token_sale_stats.sale_end_date'),
        [`${prefix}metrics-token_sale_stats_roi_since_sale_usd_percent`]             : gnp(item, 'metrics.token_sale_stats.roi_since_sale_usd_percent'),
        [`${prefix}metrics-token_sale_stats_roi_since_sale_btc_percent`]             : gnp(item, 'metrics.token_sale_stats.roi_since_sale_btc_percent'),
        [`${prefix}metrics-token_sale_stats_roi_since_sale_eth_percent`]             : gnp(item, 'metrics.token_sale_stats.roi_since_sale_eth_percent'),

        [`${prefix}metrics-staking_stats_staking_yield_percent`]                     : gnp(item, 'metrics.staking_stats.staking_yield_percent'),
        [`${prefix}metrics-staking_stats_staking_type`]                              : gnp(item, 'metrics.staking_stats.staking_type'),
        [`${prefix}metrics-staking_stats_staking_minimum`]                           : gnp(item, 'metrics.staking_stats.staking_minimum'),
        [`${prefix}metrics-staking_stats_tokens_staked`]                             : gnp(item, 'metrics.staking_stats.tokens_staked'),
        [`${prefix}metrics-staking_stats_tokens_staked_percent`]                     : gnp(item, 'metrics.staking_stats.tokens_staked_percent'),
        [`${prefix}metrics-staking_stats_real_staking_yield_percent`]                : gnp(item, 'metrics.staking_stats.real_staking_yield_percent'),

        [`${prefix}metrics-mining_stats_mining_algo`]                                : gnp(item, 'metrics.mining_stats.mining_algo'),
        [`${prefix}metrics-mining_stats_network_hash_rate`]                          : gnp(item, 'metrics.mining_stats.network_hash_rate'),
        [`${prefix}metrics-mining_stats_available_on_nicehash_percent`]              : gnp(item, 'metrics.mining_stats.available_on_nicehash_percent'),
        [`${prefix}metrics-mining_stats_1_hour_attack_cost`]                         : gnp(item, 'metrics.mining_stats.1_hour_attack_cost'),
        [`${prefix}metrics-mining_stats_24_hours_attack_cost`]                       : gnp(item, 'metrics.mining_stats.24_hours_attack_cost'),
        [`${prefix}metrics-mining_stats_attack_appeal`]                              : gnp(item, 'metrics.mining_stats.attack_appeal'),

        [`${prefix}metrics-developer_activity_stars`]                                : gnp(item, 'metrics.developer_activity.stars'),
        [`${prefix}metrics-developer_activity_watchers`]                             : gnp(item, 'metrics.developer_activity.watchers'),
        [`${prefix}metrics-developer_activity_commits_last_3_months`]                : gnp(item, 'metrics.developer_activity.commits_last_3_months'),
        [`${prefix}metrics-developer_activity_commits_last_1_year`]                  : gnp(item, 'metrics.developer_activity.commits_last_1_year'),
        [`${prefix}metrics-developer_activity_lines_added_last_3_months`]            : gnp(item, 'metrics.developer_activity.lines_added_last_3_months'),
        [`${prefix}metrics-developer_activity_lines_added_last_1_year`]              : gnp(item, 'metrics.developer_activity.lines_added_last_1_year'),
        [`${prefix}metrics-developer_activity_lines_deleted_last_3_months`]          : gnp(item, 'metrics.developer_activity.lines_deleted_last_3_months'),
        [`${prefix}metrics-developer_activity_lines_deleted_last_1_year`]            : gnp(item, 'metrics.developer_activity.lines_deleted_last_1_year'),

        [`${prefix}metrics-roi_data_percent_change_last_1_week`]                     : gnp(item, 'metrics.roi_data.percent_change_last_1_week'),
        [`${prefix}metrics-roi_data_percent_change_last_1_month`]                    : gnp(item, 'metrics.roi_data.percent_change_last_1_month'),
        [`${prefix}metrics-roi_data_percent_change_last_3_months`]                   : gnp(item, 'metrics.roi_data.percent_change_last_3_months'),
        [`${prefix}metrics-roi_data_percent_change_last_1_year`]                     : gnp(item, 'metrics.roi_data.percent_change_last_1_year'),
        [`${prefix}metrics-roi_data_percent_change_btc_last_1_week`]                 : gnp(item, 'metrics.roi_data.percent_change_btc_last_1_week'),
        [`${prefix}metrics-roi_data_percent_change_btc_last_1_month`]                : gnp(item, 'metrics.roi_data.percent_change_btc_last_1_month'),
        [`${prefix}metrics-roi_data_percent_change_btc_last_3_months`]               : gnp(item, 'metrics.roi_data.percent_change_btc_last_3_months'),
        [`${prefix}metrics-roi_data_percent_change_btc_last_1_year`]                 : gnp(item, 'metrics.roi_data.percent_change_btc_last_1_year'),
        [`${prefix}metrics-roi_data_percent_change_month_to_date`]                   : gnp(item, 'metrics.roi_data.percent_change_month_to_date'),
        [`${prefix}metrics-roi_data_percent_change_quarter_to_date`]                 : gnp(item, 'metrics.roi_data.percent_change_quarter_to_date'),
        [`${prefix}metrics-roi_data_percent_change_year_to_date`]                    : gnp(item, 'metrics.roi_data.percent_change_year_to_date'),

        [`${prefix}metrics-roi_by_year_2018_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2018_usd_percent'),
        [`${prefix}metrics-roi_by_year_2017_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2017_usd_percent'),
        [`${prefix}metrics-roi_by_year_2016_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2016_usd_percent'),
        [`${prefix}metrics-roi_by_year_2015_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2015_usd_percent'),
        [`${prefix}metrics-roi_by_year_2014_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2014_usd_percent'),
        [`${prefix}metrics-roi_by_year_2013_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2013_usd_percent'),
        [`${prefix}metrics-roi_by_year_2012_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2012_usd_percent'),
        [`${prefix}metrics-roi_by_year_2011_usd_percent`]                            : gnp(item, 'metrics.roi_by_year.2011_usd_percent'),

        [`${prefix}metrics-risk_metrics_sharpe_ratios_last_30_days`]                 : gnp(item, 'metrics.risk_metrics.sharpe_ratios.last_30_days'),
        [`${prefix}metrics-risk_metrics_sharpe_ratios_last_90_days`]                 : gnp(item, 'metrics.risk_metrics.sharpe_ratios.last_90_days'),
        [`${prefix}metrics-risk_metrics_sharpe_ratios_last_1_year`]                  : gnp(item, 'metrics.risk_metrics.sharpe_ratios.last_1_year'),
        [`${prefix}metrics-risk_metrics_sharpe_ratios_last_3_years`]                 : gnp(item, 'metrics.risk_metrics.sharpe_ratios.last_3_years'),

        [`${prefix}metrics-risk_metrics_volatility_stats_volatility_last_30_days`]   : gnp(item, 'metrics.risk_metrics.volatility_stats.volatility_last_30_days'),
        [`${prefix}metrics-risk_metrics_volatility_stats_volatility_last_90_days`]   : gnp(item, 'metrics.risk_metrics.volatility_stats.volatility_last_90_days'),
        [`${prefix}metrics-risk_metrics_volatility_stats_volatility_last_1_year`]    : gnp(item, 'metrics.risk_metrics.volatility_stats.volatility_last_1_year'),
        [`${prefix}metrics-risk_metrics_volatility_stats_volatility_last_3_years`]   : gnp(item, 'metrics.risk_metrics.volatility_stats.volatility_last_3_years'),

        [`${prefix}metrics-misc_data_vladimir_club_cost`]                            : gnp(item, 'metrics.misc_data.vladimir_club_cost'),
        [`${prefix}metrics-misc_data_btc_current_normalized_supply_price_usd`]       : gnp(item, 'metrics.misc_data.btc_current_normalized_supply_price_usd'),
        [`${prefix}metrics-misc_data_btc_y2050_normalized_supply_price_usd`]         : gnp(item, 'metrics.misc_data.btc_y2050_normalized_supply_price_usd'),
        [`${prefix}metrics-misc_data_asset_created_at`]                              : gnp(item, 'metrics.misc_data.asset_created_at'),
        [`${prefix}metrics-misc_data_asset_age_days`]                                : gnp(item, 'metrics.misc_data.asset_age_days'),
        [`${prefix}metrics-misc_data_categories`]                                    : JSON.stringify(gnp(item, 'metrics.misc_data.categories')),
        [`${prefix}metrics-misc_data_sectors`]                                       : JSON.stringify(gnp(item, 'metrics.misc_data.sectors')),

        [`${prefix}profile-is_verified`]                                             : gnp(item, 'profile.is_verified'),
        [`${prefix}profile-tagline`]                                                 : gnp(item, 'profile.tagline'),
        // [`${prefix}profile-overview`]                                                : gnp(item, 'profile.overview'),
        // [`${prefix}profile-background`]                                              : gnp(item, 'profile.background'),
        // [`${prefix}profile-technology`]                                              : gnp(item, 'profile.technology'),
        [`${prefix}profile-token_distribution_sale_start`]                           : gnp(item, 'profile.token_distribution.sale_start'),
        [`${prefix}profile-token_distribution_sale_end`]                             : gnp(item, 'profile.token_distribution.sale_end'),
        // [`${prefix}profile-token_distribution_initial_distribution`]                 : gnp(item, 'profile.token_distribution.initial_distribution'),
        [`${prefix}profile-token_distribution_current_supply`]                       : gnp(item, 'profile.token_distribution.current_supply'),
        [`${prefix}profile-token_distribution_max_supply`]                           : gnp(item, 'profile.token_distribution.max_supply'),
        [`${prefix}profile-token_distribution_description`]                          : gnp(item, 'profile.token_distribution.description'),
        [`${prefix}profile-token_details_usage`]                                     : gnp(item, 'profile.token_details.usage'),
        [`${prefix}profile-token_details_type`]                                      : gnp(item, 'profile.token_details.type'),
        [`${prefix}profile-token_details_sales_rounds`]                              : gnp(item, 'profile.token_details.sales_rounds'),
        //
        // NOTE: Big Objects
        //
        // [`${prefix}profile-organizations`]                                           : JSON.stringify(gnp(item, 'profile.organizations')),
        // [`${prefix}profile-people_founding_team`]                                    : JSON.stringify(gnp(item, 'profile.people.founding_team')),
        // [`${prefix}profile-people_contributors`]                                     : JSON.stringify(gnp(item, 'profile.people.contributors')),
        // [`${prefix}profile-people_investors`]                                        : JSON.stringify(gnp(item, 'profile.people.investors')),
        // [`${prefix}profile-people_advisors`]                                         : JSON.stringify(gnp(item, 'profile.people.advisors')),
        // [`${prefix}profile-relevant_resources`]                                      : JSON.stringify(gnp(item, 'profile.relevant_resources')),
        [`${prefix}profile-consensus_algorithm`]                                     : gnp(item, 'profile.consensus_algorithm'),

      }

    }

    await perSecondSave(result, timestamp);

    return {data: result, timestamp};

  }

  catch(error) {

    const message = `formatterMessariMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
