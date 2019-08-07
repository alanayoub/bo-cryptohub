// Cryptohub
const logger = require('../../logger');

import { objectGetNestedProperty as gnp } from 'bo-utils';

import { perSecondSave }                  from '../../db';

/**
 *
 * METRICS
 *
 * Original Data
 * -------------
 *
 * {
 *   "status": {
 *     "elapsed": "0",
 *     "timestamp": "2019-04-11T10:19:47.634532695Z"
 *   },
 *   "data": {
 *     "id": "1e31218a",
 *     "symbol": "btc",
 *     "name": "Bitcoin",
 *     "market_data": {
 *       "price_usd": 5091.098917763153,
 *       "price_btc": 1,
 *       "volume_last_24_hours": 16399320644,
 *       "real_volume_last_24_hours": 828943906.4819491,
 *       "volume_last_24_hours_overstatement_multiple": 19.78339006507566,
 *       "percent_change_usd_last_24_hours": -1.4378802987483073,
 *       "percent_change_btc_last_24_hours": 0
 *     },
 *     "marketcap": {
 *       "current_marketcap_usd": 89805009562.96193,
 *       "y_2050_marketcap_usd": 108575497584.61174,
 *       "y_plus10_marketcap_usd": 105767392638.06367,
 *       "liquid_marketcap_usd": 91263574016.9179,
 *       "volume_turnover_last_24_hours_percent": 0.9082965634550806
 *     },
 *     "supply": {
 *       "y_2050": 20983495.3984375,
 *       "y_plus10": 20440796,
 *       "liquid": 17637762,
 *       "circulating": 17639612,
 *       "y_2050_issued_percent": 84.06422126083676,
 *       "annual_inflation_percent": 3.8386389384322115,
 *       "y_plus10_issued_percent": 86.29611097336914
 *     },
 *     "blockchain_stats_24_hours": {
 *       "transaction_volume": 3423719699.2928834,
 *       "adjusted_transaction_volume": 1572846426.8066072,
 *       "nvt": 27.395889045691852,
 *       "adjusted_nvt": 60.61607813796638,
 *       "sum_of_fees": 150177.795038277,
 *       "median_tx_value": 164.00716844700003,
 *       "median_tx_fee": 0.23983012446160373,
 *       "count_of_active_addresses": 706754,
 *       "count_of_tx": 285567,
 *       "count_of_payments": 423315,
 *       "new_issuance": 9637186.770436611,
 *       "average_difficulty": 6071846049920.75,
 *       "kilobytes_added": 153443.952,
 *       "count_of_blocks_added": 149
 *     },
 *     "all_time_high": {
 *       "price": 20089,
 *       "at": "2017-12-17",
 *       "days_since": 479,
 *       "percent_down": 74.24297641819645,
 *       "breakeven_multiple": 3.882436170561514
 *     },
 *     "cycle_low": {
 *       "price": 3126.679993636258,
 *       "at": "2018-12-15",
 *       "percent_up": 65.4895441132397,
 *       "days_since": 116
 *     },
 *     "token_sale_stats": {
 *       "sale_proceeds_usd": null,
 *       "sale_start_date": null,
 *       "sale_end_date": null,
 *       "roi_since_sale_usd_percent": null,
 *       "roi_since_sale_btc_percent": null,
 *       "roi_since_sale_eth_percent": null
 *     },
 *     "staking_stats": {
 *       "staking_yield_percent": null,
 *       "staking_type": null,
 *       "staking_minimum": null,
 *       "tokens_staked": null,
 *       "tokens_staked_percent": 0,
 *       "real_staking_yield_percent": null
 *     },
 *     "mining_stats": {
 *       "mining_algo": "SHA-256",
 *       "network_hash_rate": "51,117 PH/s",
 *       "available_on_nicehash_percent": 0.0006888457166142784,
 *       "1_hour_attack_cost": 429329.6386353715,
 *       "24_hours_attack_cost": 10303911.327248916,
 *       "attack_appeal": 8858.106754394195
 *     },
 *     "developer_activity": {
 *       "stars": 37778,
 *       "watchers": 3525,
 *       "commits_last_3_months": 361,
 *       "commits_last_1_year": 1825,
 *       "lines_added_last_3_months": 23556,
 *       "lines_added_last_1_year": 98803,
 *       "lines_deleted_last_3_months": 8701,
 *       "lines_deleted_last_1_year": 71940
 *     },
 *     "roi_data": {
 *       "percent_change_last_1_week": 4.068800808149478,
 *       "percent_change_last_1_month": 34.48065939117886,
 *       "percent_change_last_3_months": 42.28001937093203,
 *       "percent_change_last_1_year": -24.822514997273164,
 *       "percent_change_btc_last_1_week": 0,
 *       "percent_change_btc_last_1_month": 0,
 *       "percent_change_btc_last_3_months": 0,
 *       "percent_change_btc_last_1_year": 0,
 *       "percent_change_month_to_date": 25.34399357274989,
 *       "percent_change_quarter_to_date": 25.34399357274989,
 *       "percent_change_year_to_date": 39.8379747316033
 *     },
 *     "roi_by_year": {
 *       "2018_usd_percent": -72.50923276595937,
 *       "2017_usd_percent": 1610.7690519883597,
 *       "2016_usd_percent": 89.7667,
 *       "2015_usd_percent": 35.44,
 *       "2014_usd_percent": -57.718,
 *       "2013_usd_percent": 5360.674,
 *       "2012_usd_percent": 174.8979,
 *       "2011_usd_percent": 1420.27027
 *     },
 *     "risk_metrics": {
 *       "sharpe_ratios": {
 *         "last_30_days": 7.2391861543371,
 *         "last_90_days": 3.859009530925087,
 *         "last_1_year": -0.44277420502195886,
 *         "last_3_years": 1.4592119414515123
 *       }
 *     },
 *     "misc_data": {
 *       "vladimir_club_cost": 10857549.758461175,
 *       "btc_current_normalized_supply_price_usd": 5174.328467348516,
 *       "btc_y2050_normalized_supply_price_usd": 5174.328467348516,
 *       "asset_created_at": "2009-01-03",
 *       "asset_age_days": 3749,
 *       "categories": [
 *         "Currency"
 *       ],
 *       "sectors": [
 *         "Currency"
 *       ]
 *     }
 *   }
 * }
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
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
export default async function formatterMessariSectionMetrics(data, timestamp, bootstrapData, appBootstrapData, fileName, event, cache) {

  try {

    function dataIsValid(data) {
      if (data.data && data.data.symbol) return true;
      else return false;
    }

    if (!dataIsValid(data)) return;
    data = data.data;

    const symbol = data.symbol.toUpperCase();
    const sectors = gnp(data, 'misc_data.sectors');
    const id = appBootstrapData.symbolIdMap[symbol]; // TODO: need proper mapping for ids

    const prefix = 'm-metrics-';
    let result;

    if (id === void 0) {
      result = {};
    }
    else {
      result = {
        [id]: {

          [`${prefix}misc_data_sectors`]                            : gnp(data, 'misc_data.sectors'),
          [`${prefix}misc_data_categories`]                         : gnp(data, 'misc_data.categories'),
          [`${prefix}misc_data_asset_created_at`]                   : gnp(data, 'misc_data.asset_created_at'),

          [`${prefix}all_time_high_price`]                          : gnp(data, 'all_time_high.price'),
          [`${prefix}all_time_high_at`]                             : gnp(data, 'all_time_high.at'),
          [`${prefix}all_time_high_days_since`]                     : gnp(data, 'all_time_high.days_since'),
          [`${prefix}all_time_high_percent_down`]                   : gnp(data, 'all_time_high.percent_down'),
          [`${prefix}all_time_high_breakeven_multiple`]             : gnp(data, 'all_time_high.breakeven_multiple'),

          [`${prefix}cycle_low_price`]                              : gnp(data, 'cycle_low.price'),
          [`${prefix}cycle_low_at`]                                 : gnp(data, 'cycle_low.at'),
          [`${prefix}cycle_low_percent_up`]                         : gnp(data, 'cycle_low.percent_up'),
          [`${prefix}cycle_low_days_since`]                         : gnp(data, 'cycle_low.days_since'),

          [`${prefix}roi_data_percent_change_last_1_week`]          : gnp(data, 'roi_data.percent_change_last_1_week'),
          [`${prefix}roi_data_percent_change_last_1_month`]         : gnp(data, 'roi_data.percent_change_last_1_month'),
          [`${prefix}roi_data_percent_change_last_3_months`]        : gnp(data, 'roi_data.percent_change_last_3_months'),
          [`${prefix}roi_data_percent_change_last_1_year`]          : gnp(data, 'roi_data.percent_change_last_1_year'),
          [`${prefix}roi_data_percent_change_btc_last_1_week`]      : gnp(data, 'roi_data.percent_change_btc_last_1_week'),
          [`${prefix}roi_data_percent_change_btc_last_1_month`]     : gnp(data, 'roi_data.percent_change_btc_last_1_month'),
          [`${prefix}roi_data_percent_change_btc_last_3_months`]    : gnp(data, 'roi_data.percent_change_btc_last_3_months'),
          [`${prefix}roi_data_percent_change_btc_last_1_year`]      : gnp(data, 'roi_data.percent_change_btc_last_1_year'),

          [`${prefix}cycle_low_at`]                                 : gnp(data, 'cycle_low.at'),

          [`${prefix}market_data_price_usd`]                        : gnp(data, 'market_data.price_usd'),
          [`${prefix}market_data_price_btc`]                        : gnp(data, 'market_data.price_btc'),
          [`${prefix}market_data_volume_last_24_hours`]             : gnp(data, 'market_data.volume_last_24_hours'),
          [`${prefix}market_data_real_volume_last_24_hours`]        : gnp(data, 'market_data.real_volume_last_24_hours'),
          [`${prefix}market_data_percent_change_usd_last_24_hours`] : gnp(data, 'market_data.percent_change_usd_last_24_hours'),
          [`${prefix}market_data_percent_change_btc_last_24_hours`] : gnp(data, 'market_data.percent_change_btc_last_24_hours'),

          [`${prefix}marketcap_current_marketcap_usd`]              : gnp(data, 'marketcap.current_marketcap_usd'),
          [`${prefix}marketcap_y_2050_marketcap_usd`]               : gnp(data, 'marketcap.y_2050_marketcap_usd'),
          // 'm-metrics-y_plus10_marketcap_usd': gnp(data, 'marketcap.y_plus10_marketcap_usd'),
          // 'm-metrics-liquid_marketcap_usd': gnp(data, 'marketcap.liquid_marketcap_usd'),
          // 'm-metrics-volume_turnover_last_24_hours_percent': gnp(data, 'marketcap.volume_turnover_last_24_hours_percent')

        }
      };

      let item;
      let prop;
      for (item of Object.values(result)) {
        for (prop of Object.keys(item)) {
          item[`${prop}-timestamp`] = timestamp;
        }
      }
    }

    console.log('saving metrics');
    await perSecondSave(result, timestamp);

    return {data: result, timestamp};

  }

  catch(error) {

    const message = `formatterMessariMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}
