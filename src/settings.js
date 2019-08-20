// Node
const path = require('path');

// Libs
const argv = require('argv');

// Settings
global.githubClientId = 'c7a2c111a27dee50bba0';
global.githubClientSecret = '5e4b8b348c8165536391bdbf6041685f270503f0';

// Cache for days
// global.cacheForXe = 1;
global.cacheForGitlog = 7;
global.cacheForGithubRepo = 7;
global.cacheForGithubForks = 30;
// global.cacheForCryptocompare = 30;
// global.cacheForCoinmarketcap = 30;
// global.cacheForCoinmarketcapProjectsJson = 1;
// global.cacheForCoinmarketcapProjectHtml = 30;

// Leave in execution order
global.settingsScrapeCryptocompare = true;
global.settingsScrapeCoinmarketcap = false;
global.settingsScrapeXe = false;
// global.settingsGetRepoData = true;
// global.settingsCloneRepos = true;
// global.settingsGetLogData = true;
// global.settingsGetForkData = true;
// global.settingsSetFirstCommit = true;
// global.settingsSyncCommits = true;
// global.settingsHashFiles = true;

// Stuff we found while parsing the data
global.notes = [];

// Bitbucket :/
// Ardor: https://bitbucket.org/Jelurida/ardor/src
// NXT: https://bitbucket.org/JeanLucPicard/nxt/src
global.githubOverrides = {
  'gas':                   'https://github.com/neo-project',
  'kin':                   'https://github.com/kinecosystem',
  'tenx':                  'https://github.com/tenx-tech',
  'gnosis':                'https://github.com/gnosis',
  'aragon':                'https://github.com/aragon/aragon-network-token',
  'funfair':               'https://github.com/funfair-tech',
  'basic-attention-token': 'https://github.com/brave-intl',
}

const args = argv.option([
  {
    name: 'local',
    short: 'l',
    type: 'boolean',
    description: 'Changes required to mimic development build locally',
    example: `'script --local=true' or 'script -l true'`
  },
  {
    name: 'logger',
    short: 'L',
    type: 'boolean',
    description: 'Log to console',
    example: `'script --logger=true' or 'script -L true'`
  }
]).run();

const isProd = process.env.NODE_ENV === 'production' && args.options.local !== true;

const cacheDir = isProd
  ? '/home/ubuntu/cryptohub-cache'
  : path.join(__dirname, '/../cache');

const generatedDir = `${cacheDir}/tmp-generated`;
const scrapeDir    = `${cacheDir}/tmp-scrape`;
const dbDir        = `${cacheDir}/db`;

const coinmarketcapApiKey = '84e034e2-3972-47eb-9349-5e4dc20211cd';
const cryptocompareApiKey = 'b3ad47012cc134911a4775d955ef2b9cf8b85f54d383d81c1bf77338a59b1222';

// Keep the last value of each of these fields
// in a new field with the suffix `:last`
// This is used to show changes in values
const fieldLastValue = [

  'cc-total-vol-full-PRICE',
  'cryptohub-price-btc',

  // Volume
  'cc-total-vol-full-TOTALVOLUME24HTO',
  'cmc-listings-volume_24h',
  'm-metrics-real-volume-last-24-hours',
  'm-metrics-volume-last-24-hours',

  // Marketcap
  'cc-total-vol-full-MKTCAP',
  'cmc-listings-market_cap',
  'm-metrics-current-marketcap-usd',
  'm-metrics-y-2050-marketcap-usd',

];

const fieldTypeMap = {

  //
  // NOTE: Allowing String, Number and Boolean becaues none of the data sources can make their mind up :(
  // Once we have more data in the database we can see what it looks like
  //

  //
  // Custom
  //
  'cryptohub-price-btc'                        :'String|Number|Boolean|Null|Undefined',
  'cryptohub-price-history'                    :'String|Number|Boolean|Null|Undefined|Array',
  'cryptohub-exchanges'                        :'String|Number|Boolean|Null|Undefined',
  'cryptohub-exchange-locations'               :'String|Number|Boolean|Null|Undefined|Array',
  'cryptohub-numberOfExchanges'                :'String|Number|Boolean|Null|Undefined',
  'cryptohub-numberOfPairs'                    :'String|Number|Boolean|Null|Undefined',
  'cryptohub-numberOfFiatPairs'                :'String|Number|Boolean|Null|Undefined',
  'cryptohub-numberOfFiatCurrencies'           :'String|Number|Boolean|Null|Undefined',
  'cryptohub-exchangesListDex'                 :'String|Number|Boolean|Null|Undefined|Array',
  'cryptohub-exchangesListAcceptsBoth'         :'String|Number|Boolean|Null|Undefined|Array',
  'cryptohub-exchangesListCryptoOnly'          :'String|Number|Boolean|Null|Undefined|Array',
  'cryptohub-numberOfDex'                      :'String|Number|Boolean|Null|Undefined|Array',
  'cryptohub-exchangesListFiatOnly'            :'String|Number|Boolean|Null|Undefined|Array',
  'cryptohub-circulating-percent-total'        :'String|Number|Boolean|Null|Undefined|Array',

  'cryptohub-cc-circulating-percent-total'     :'String|Number',
  'cryptohub-m-price-history-BTC'              :'String|Number',
  'cryptohub-m-price-history-USD'              :'String|Number',
  'cryptohub-cmc-price-history-BTC'            :'String|Number',
  'cryptohub-cmc-price-history-USD'            :'String|Number',
  'cmc-listings-quote_USD_price_BTC'           :'String|Number',
  'cryptohub-cc-price-history-BTC'             :'String|Number',
  'cryptohub-cc-price-history-USD'             :'String|Number',
  'cc-total-vol-full-PRICE-cryptohub-BTC'      :'String|Number',

  // 'cryptohub-pairs': symbols[symbol].pairs,
  // 'cryptohub-fiatCurrencies': symbols[symbol]._fiatCurrencies,
  // 'cryptohub-exchagnesRank': symbols[symbol]._exchagnesRank,

  'cc-coinlist-Algorithm'                      :'String|Number|Boolean|Null|Undefined',      // :'String',  // "N/A"
  'cc-coinlist-BlockNumber'                    :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 0
  'cc-coinlist-BlockReward'                    :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 0
  'cc-coinlist-BlockTime'                      :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 0
  'cc-coinlist-BuiltOn'                        :'String|Number|Boolean|Null|Undefined',      // :'String',  // "7605"
  'cc-coinlist-ContentCreatedOn'               :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 1427211129
  'cc-coinlist-CoinName'                       :'String|Number|Boolean|Null|Undefined',      // :'String',  // "Quoine Liquid"
  'cc-coinlist-FullName'                       :'String|Number|Boolean|Null|Undefined',      // :'String',  // "Quoine Liquid (QASH)"
  'cc-coinlist-FullyPremined'                  :'String|Number|Boolean|Null|Undefined',      // :'String',  // "0"
  'cc-coinlist-Id'                             :'String|Number|Boolean|Null|Undefined',      // :'String',  // "402714"
  'cc-coinlist-ImageUrl'                       :'String|Number|Boolean|Null|Undefined',      // :'String',  // "/media/15887431/qash.png"
  'cc-coinlist-IsTrading'                      :'String|Number|Boolean|Null|Undefined',      // :'Boolean', // true
  'cc-coinlist-Name'                           :'String|Number|Boolean|Null|Undefined',      // :'String',  // "QASH"
  'cc-coinlist-NetHashesPerSecond'             :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 0
  'cc-coinlist-PreMinedValue'                  :'String|Number|Boolean|Null|Undefined',      // :'String',  // "N/A"
  'cc-coinlist-ProofType'                      :'String|Number|Boolean|Null|Undefined',      // :'String',  // "N/A"
  'cc-coinlist-SmartContractAddress'           :'String|Number|Boolean|Null|Undefined',      // :'String',  // "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6"
  'cc-coinlist-SortOrder'                      :'String|Number|Boolean|Null|Undefined',      // :'Number',  // "1877" --- NOTE: We have overwritten this to be a Number ---
  'cc-coinlist-Sponsored'                      :'String|Number|Boolean|Null|Undefined',      // :'Boolean', // false
  'cc-coinlist-Symbol'                         :'String|Number|Boolean|Null|Undefined',      // :'String',  // "QASH"
  'cc-coinlist-TotalCoinSupply'                :'String|Number|Boolean|Null|Undefined',      // :'String',  // "1000000000"
  'cc-coinlist-TotalCoinsFreeFloat'            :'String|Number|Boolean|Null|Undefined',      // :'String',  // "N/A"
  'cc-coinlist-TotalCoinsMined'                :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 1000000000
  'cc-coinlist-Url'                            :'String|Number|Boolean|Null|Undefined',      // :'String',  // "/coins/qash/overview"

  'cc-total-vol-full-Algorithm'                :'String|Number|Boolean|Null|Undefined',      // :'String',  // "SHA-256"
  'cc-total-vol-full-BlockNumber'              :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 587081
  'cc-total-vol-full-BlockReward'              :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 12.5
  'cc-total-vol-full-BlockTime'                :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 600
  'cc-total-vol-full-Id'                       :'String|Number|Boolean|Null|Undefined',      // :'String',  // "1182"
  'cc-total-vol-full-ImageUrl'                 :'String|Number|Boolean|Null|Undefined',      // :'String',  // "/media/19633/btc.png"
  'cc-total-vol-full-Name'                     :'String|Number|Boolean|Null|Undefined',      // :'String',  // "BTC"
  'cc-total-vol-full-NetHashesPerSecond'       :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 64524184803.7811
  'cc-total-vol-full-ProofType'                :'String|Number|Boolean|Null|Undefined',      // :'String',  // "PoW"
  'cc-total-vol-full-TYPE'                     :'String|Number|Boolean|Null|Undefined',      // :'String',  // "5"
  'cc-total-vol-full-Type'                     :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 1
  'cc-total-vol-full-Url'                      :'String|Number|Boolean|Null|Undefined',      // :'String',  // "/coins/btc/overview"
  'cc-total-vol-full-CHANGE24HOUR'             :'String|Number|Boolean|Null|Undefined',      // :'Number',  // -288.78999999999905
  'cc-total-vol-full-CHANGEDAY'                :'String|Number|Boolean|Null|Undefined',      // :'Number',  // -83.03000000000065
  'cc-total-vol-full-CHANGEPCT24HOUR'          :'String|Number|Boolean|Null|Undefined',      // :'Number',  // -2.8625521011443578
  'cc-total-vol-full-CHANGEPCTHOUR'            :'String|Number|Boolean|Null|Undefined',      // :'Number',  // -0.8401473672920365
  'cc-total-vol-full-CHANGEPCTDAY'             :'String|Number|Boolean|Null|Undefined',      // :'Number',  // -0.8401473672920365
  'cc-total-vol-full-CHANGEHOUR'               :'String|Number|Boolean|Null|Undefined',      // :'Number',  // -0.8401473672920365
  'cc-total-vol-full-DocumentType'             :'String|Number|Boolean|Null|Undefined',      // :'String',  // "Webpagecoinp"
  'cc-total-vol-full-FLAGS'                    :'String|Number|Boolean|Null|Undefined',      // :'String',  // "1"
  'cc-total-vol-full-FROMSYMBOL'               :'String|Number|Boolean|Null|Undefined',      // :'String',  // "BTC"
  'cc-total-vol-full-FullName'                 :'String|Number|Boolean|Null|Undefined',      // :'String',  // "Bitcoin"
  'cc-total-vol-full-HIGH24HOUR'               :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 10174.4
  'cc-total-vol-full-HIGHDAY'                  :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9882.79
  'cc-total-vol-full-HIGHHOUR'                 :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9811.55
  'cc-total-vol-full-IMAGEURL'                 :'String|Number|Boolean|Null|Undefined',      // :'String',  // "/media/19633/btc.png"
  'cc-total-vol-full-Internal'                 :'String|Number|Boolean|Null|Undefined',      // :'String',  // "BTC"
  'cc-total-vol-full-LASTMARKET'               :'String|Number|Boolean|Null|Undefined',      // :'String',  // "Bitstamp"
  'cc-total-vol-full-LASTTRADEID'              :'String|Number|Boolean|Null|Undefined',      // :'String',  // "94656047" --- NOTE: We have overwritten this to be a Number ---
  'cc-total-vol-full-LASTUPDATE'               :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 1564135004
  'cc-total-vol-full-LASTVOLUME'               :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 0.00699377
  'cc-total-vol-full-LASTVOLUMETO'             :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 68.538946
  'cc-total-vol-full-LOW24HOUR'                :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9647.05
  'cc-total-vol-full-LOWDAY'                   :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9668.52
  'cc-total-vol-full-LOWHOUR'                  :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9772.29
  'cc-total-vol-full-MARKET'                   :'String|Number|Boolean|Null|Undefined',      // :'String',  // "CCCAGG"
  'cc-total-vol-full-MKTCAP'                   :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 174813018760
  'cc-total-vol-full-OPEN24HOUR'               :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 10088.55
  'cc-total-vol-full-OPENDAY'                  :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9882.79
  'cc-total-vol-full-OPENHOUR'                 :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9798.61
  'cc-total-vol-full-PRICE'                    :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 9799.76
  'cc-total-vol-full-SUPPLY'                   :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 17838500
  'cc-total-vol-full-TOPTIERVOLUME24HOUR'      :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 34693.46712488547
  'cc-total-vol-full-TOPTIERVOLUME24HOURTO'    :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 342986884.10271114
  'cc-total-vol-full-TOSYMBOL'                 :'String|Number|Boolean|Null|Undefined',      // :'String',  // "USD"
  'cc-total-vol-full-TOTALTOPTIERVOLUME24H'    :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 145573.9073042986
  'cc-total-vol-full-TOTALTOPTIERVOLUME24HTO'  :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 1429588586.5553167
  'cc-total-vol-full-TOTALVOLUME24H'           :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 289044.02882536233
  'cc-total-vol-full-TOTALVOLUME24HTO'         :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 2835893441.3717556
  'cc-total-vol-full-VOLUME24HOUR'             :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 36648.859710940465
  'cc-total-vol-full-VOLUME24HOURTO'           :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 362481358.8910086
  'cc-total-vol-full-VOLUMEDAY'                :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 13338.414241986171
  'cc-total-vol-full-VOLUMEDAYTO'              :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 129927216.80335271
  'cc-total-vol-full-VOLUMEHOUR'               :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 833.5320880846975
  'cc-total-vol-full-VOLUMEHOURTO'             :'String|Number|Boolean|Null|Undefined',      // :'Number',  // 8163468.329335898

  'cmc-listings-id'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1,
  'cmc-listings-name'                          :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "Bitcoin",
  'cmc-listings-symbol'                        :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "BTC",
  'cmc-listings-slug'                          :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "bitcoin",
  'cmc-listings-num_market_pairs'              :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 7733,
  'cmc-listings-date_added'                    :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "2013-04-28T00:00:00.000Z",
  'cmc-listings-tags'                          :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : [ "mineable" ],
  'cmc-listings-max_supply'                    :'String|Number|Boolean|Null|Undefined|Array', // :'Number|Null',  // : 21000000,
  'cmc-listings-circulating_supply'            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 17843112,
  'cmc-listings-total_supply'                  :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 17843112,
  'cmc-listings-platform'                      :'String|Number|Boolean|Null|Undefined|Array', // :'String|Null',  // : null,
  'cmc-listings-cmc_rank'                      :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1,
  'cmc-listings-last_updated'                  :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "2019-07-28T13:58:32.000Z",
  'cmc-listings-quote_USD_price'               :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 9517.4595443,
  'cmc-listings-quote_USD_volume_24h'          :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 12547623223.4615,
  'cmc-listings-quote_USD_percent_change_1h'   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : -0.103109,
  'cmc-listings-quote_USD_percent_change_24h'  :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0.587142,
  'cmc-listings-quote_USD_percent_change_7d'   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : -9.68955,
  'cmc-listings-quote_USD_market_cap'          :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 169821096604|Array.41385,
  'cmc-listings-quote_USD_last_updated'        :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "2019-07-28T13:58:32.000Z"

  'm-metrics-id'                                                      :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "1e31218a",
  'm-metrics-symbol'                                                  :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "btc",
  'm-metrics-name'                                                    :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "Bitcoin",
  'm-metrics-market_data_price_usd'                                   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 5091.098917763153,
  'm-metrics-market_data_price_btc'                                   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1,
  'm-metrics-market_data_volume_last_24_hours'                        :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 16399320644,
  'm-metrics-market_data_real_volume_last_24_hours'                   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 828943906.4819491,
  'm-metrics-market_data_volume_last_24_hours_overstatement_multiple' :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 19.78339006507566,
  'm-metrics-market_data_percent_change_usd_last_24_hours'            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : -1.4378802987483073,
  'm-metrics-market_data_percent_change_btc_last_24_hours'            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0

  'm-metrics-marketcap_current_marketcap_usd'                         :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 89805009562.96193,
  'm-metrics-marketcap_y_2050_marketcap_usd'                          :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 108575497584.61174,
  'm-metrics-marketcap_y_plus10_marketcap_usd'                        :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 105767392638.06367,
  'm-metrics-marketcap_liquid_marketcap_usd'                          :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 91263574016.9179,
  'm-metrics-marketcap_volume_turnover_last_24_hours_percent'         :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0.9082965634550806

  'm-metrics-supply_y_2050'                                           :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 20983495.3984375,
  'm-metrics-supply_y_plus10'                                         :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 20440796,
  'm-metrics-supply_liquid'                                           :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 17637762,
  'm-metrics-supply_circulating'                                      :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 17639612,
  'm-metrics-supply_y_2050_issued_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 84.06422126083676,
  'm-metrics-supply_annual_inflation_percent'                         :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 3.8386389384322115,
  'm-metrics-supply_y_plus10_issued_percent'                          :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 86.29611097336914

  'm-metrics-blockchain_stats_24_hours_transaction_volume'            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 3423719699.2928834,
  'm-metrics-blockchain_stats_24_hours_adjusted_transaction_volume'   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1572846426.8066072,
  'm-metrics-blockchain_stats_24_hours_nvt'                           :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 27.395889045691852,
  'm-metrics-blockchain_stats_24_hours_adjusted_nvt'                  :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 60.61607813796638,
  'm-metrics-blockchain_stats_24_hours_sum_of_fees'                   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 150177.795038277,
  'm-metrics-blockchain_stats_24_hours_median_tx_value'               :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 164.00716844700003,
  'm-metrics-blockchain_stats_24_hours_median_tx_fee'                 :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0.23983012446160373,
  'm-metrics-blockchain_stats_24_hours_count_of_active_addresses'     :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 706754,
  'm-metrics-blockchain_stats_24_hours_count_of_tx'                   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 285567,
  'm-metrics-blockchain_stats_24_hours_count_of_payments'             :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 423315,
  'm-metrics-blockchain_stats_24_hours_new_issuance'                  :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 9637186.770436611,
  'm-metrics-blockchain_stats_24_hours_average_difficulty'            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 6071846049920.75,
  'm-metrics-blockchain_stats_24_hours_kilobytes_added'               :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 153443.952,
  'm-metrics-blockchain_stats_24_hours_count_of_blocks_added'         :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 149

  'm-metrics-all_time_high_price'                                     :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 20089,
  'm-metrics-all_time_high_at'                                        :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "2017-12-17",
  'm-metrics-all_time_high_days_since'                                :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 479,
  'm-metrics-all_time_high_percent_down'                              :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 74.24297641819645,
  'm-metrics-all_time_high_breakeven_multiple'                        :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 3.882436170561514

  'm-metrics-cycle_low_price'                                          :'String|Number|Boolean|Null|Undefine|Arrayd', // :'Number',       // : 3126.679993636258,
  'm-metrics-cycle_low_at'                                             :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : "2018-12-15",
  'm-metrics-cycle_low_percent_up'                                     :'String|Number|Boolean|Null|Undefine|Arrayd', // :'Number',       // : 65.4895441132397,
  'm-metrics-cycle_low_days_since'                                     :'String|Number|Boolean|Null|Undefine|Arrayd', // :'Number',       // : 116

  'm-metrics-token_sale_stats_sale_proceeds_usd'                       :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-token_sale_stats_sale_start_date'                         :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-token_sale_stats_sale_end_date'                           :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-token_sale_stats_roi_since_sale_usd_percent'              :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-token_sale_stats_roi_since_sale_btc_percent'              :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-token_sale_stats_roi_since_sale_eth_percent'              :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null

  'm-metrics-staking_stats_staking_yield_percent'                      :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-staking_stats_staking_type'                               :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-staking_stats_staking_minimum'                            :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-staking_stats_tokens_staked'                              :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null,
  'm-metrics-staking_stats_tokens_staked_percent'                      :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : 0,
  'm-metrics-staking_stats_real_staking_yield_percent'                 :'String|Number|Boolean|Null|Undefine|Arrayd', // :'String',       // : null

  'm-metrics-mining_stats_mining_algo'                                :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "SHA-256",
  'm-metrics-mining_stats_network_hash_rate'                          :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "51,117 PH/s",
  'm-metrics-mining_stats_available_on_nicehash_percent'              :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0.0006888457166142784,
  'm-metrics-mining_stats_1_hour_attack_cost'                         :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 429329.6386353715,
  'm-metrics-mining_stats_24_hours_attack_cost'                       :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 10303911.327248916,
  'm-metrics-mining_stats_attack_appeal'                              :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 8858.106754394195

  'm-metrics-developer_activity_stars'                                :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 37778,
  'm-metrics-developer_activity_watchers'                             :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 3525,
  'm-metrics-developer_activity_commits_last_3_months'                :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 361,
  'm-metrics-developer_activity_commits_last_1_year'                  :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1825,
  'm-metrics-developer_activity_lines_added_last_3_months'            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 23556,
  'm-metrics-developer_activity_lines_added_last_1_year'              :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 98803,
  'm-metrics-developer_activity_lines_deleted_last_3_months'          :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 8701,
  'm-metrics-developer_activity_lines_deleted_last_1_year'            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 71940

  'm-metrics-roi_data_percent_change_last_1_week'                     :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 4.068800808149478,
  'm-metrics-roi_data_percent_change_last_1_month'                    :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 34.48065939117886,
  'm-metrics-roi_data_percent_change_last_3_months'                   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 42.28001937093203,
  'm-metrics-roi_data_percent_change_last_1_year'                     :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : -24.822514997273164,
  'm-metrics-roi_data_percent_change_btc_last_1_week'                 :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0,
  'm-metrics-roi_data_percent_change_btc_last_1_month'                :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0,
  'm-metrics-roi_data_percent_change_btc_last_3_months'               :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0,
  'm-metrics-roi_data_percent_change_btc_last_1_year'                 :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 0,
  'm-metrics-roi_data_percent_change_month_to_date'                   :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 25.34399357274989,
  'm-metrics-roi_data_percent_change_quarter_to_date'                 :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 25.34399357274989,
  'm-metrics-roi_data_percent_change_year_to_date'                    :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 39.8379747316033

  'm-metrics-roi_by_year_2018_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : -72.50923276595937,
  'm-metrics-roi_by_year_2017_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1610.7690519883597,
  'm-metrics-roi_by_year_2016_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 89.7667,
  'm-metrics-roi_by_year_2015_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 35.44,
  'm-metrics-roi_by_year_2014_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : -57.718,
  'm-metrics-roi_by_year_2013_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 5360.674,
  'm-metrics-roi_by_year_2012_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 174.8979,
  'm-metrics-roi_by_year_2011_usd_percent'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1420.27027

  'm-metrics-risk_metrics_sharpe_ratios_last_30_days'                 :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 7.2391861543371,
  'm-metrics-risk_metrics_sharpe_ratios_last_90_days'                 :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 3.859009530925087,
  'm-metrics-risk_metrics_sharpe_ratios_last_1_year'                  :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : -0.44277420502195886,
  'm-metrics-risk_metrics_sharpe_ratios_last_3_years'                 :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 1.4592119414515123

  'm-metrics-misc_data_vladimir_club_cost'                            :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 10857549.758461175,
  'm-metrics-misc_data_btc_current_normalized_supply_price_usd'       :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 5174.328467348516,
  'm-metrics-misc_data_btc_y2050_normalized_supply_price_usd'         :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 5174.328467348516,
  'm-metrics-misc_data_asset_created_at'                              :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : "2009-01-03",
  'm-metrics-misc_data_asset_age_days'                                :'String|Number|Boolean|Null|Undefined|Array', // :'Number',       // : 3749,
  'm-metrics-misc_data_categories'                                    :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : [ "Currency" ],
  'm-metrics-misc_data_sectors'                                       :'String|Number|Boolean|Null|Undefined|Array', // :'String',       // : [ "Currency" ]

  'm-assets-id'                                                                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-symbol'                                                            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-name'                                                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-slug'                                                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_price_usd'                                     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_price_btc'                                     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_volume_last_24_hours'                          :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_real_volume_last_24_hours'                     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_volume_last_24_hours_overstatement_multiple'   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_percent_change_usd_last_24_hours'              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_percent_change_btc_last_24_hours'              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-market_data_last_trade_at'                                 :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-marketcap_current_marketcap_usd'                           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-marketcap_y_2050_marketcap_usd'                            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-marketcap_y_plus10_marketcap_usd'                          :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-marketcap_liquid_marketcap_usd'                            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-marketcap_volume_turnover_last_24_hours_percent'           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-supply_y_2050'                                             :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-supply_y_plus10'                                           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-supply_liquid'                                             :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-supply_circulating'                                        :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-supply_y_2050_issued_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-supply_annual_inflation_percent'                           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-supply_y_plus10_issued_percent'                            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_transaction_volume'              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_adjusted_transaction_volume'     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_nvt'                             :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_adjusted_nvt'                    :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_sum_of_fees'                     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_median_tx_value'                 :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_median_tx_fee'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_count_of_active_addresses'       :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_count_of_tx'                     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_count_of_payments'               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_new_issuance'                    :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_average_difficulty'              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_kilobytes_added'                 :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-blockchain_stats_24_hours_count_of_blocks_added'           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-all_time_high_price'                                       :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-all_time_high_at'                                          :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-all_time_high_days_since'                                  :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-all_time_high_percent_down'                                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-all_time_high_breakeven_multiple'                          :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-cycle_low_price'                                           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-cycle_low_at'                                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-cycle_low_percent_up'                                      :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-cycle_low_days_since'                                      :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-token_sale_stats_sale_proceeds_usd'                        :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-token_sale_stats_sale_start_date'                          :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-token_sale_stats_sale_end_date'                            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-token_sale_stats_roi_since_sale_usd_percent'               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-token_sale_stats_roi_since_sale_btc_percent'               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-token_sale_stats_roi_since_sale_eth_percent'               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-staking_stats_staking_yield_percent'                       :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-staking_stats_staking_type'                                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-staking_stats_staking_minimum'                             :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-staking_stats_tokens_staked'                               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-staking_stats_tokens_staked_percent'                       :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-staking_stats_real_staking_yield_percent'                  :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-mining_stats_mining_algo'                                  :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-mining_stats_network_hash_rate'                            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-mining_stats_available_on_nicehash_percent'                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-mining_stats_1_hour_attack_cost'                           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-mining_stats_24_hours_attack_cost'                         :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-mining_stats_attack_appeal'                                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_stars'                                  :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_watchers'                               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_commits_last_3_months'                  :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_commits_last_1_year'                    :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_lines_added_last_3_months'              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_lines_added_last_1_year'                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_lines_deleted_last_3_months'            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-developer_activity_lines_deleted_last_1_year'              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_last_1_week'                       :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_last_1_month'                      :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_last_3_months'                     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_last_1_year'                       :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_btc_last_1_week'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_btc_last_1_month'                  :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_btc_last_3_months'                 :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_btc_last_1_year'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_month_to_date'                     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_quarter_to_date'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_data_percent_change_year_to_date'                      :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2018_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2017_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2016_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2015_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2014_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2013_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2012_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-roi_by_year_2011_usd_percent'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_30_days'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_90_days'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_1_year'                    :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_sharpe_ratios_last_3_years'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_30_days'     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_90_days'     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_1_year'      :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_3_years'     :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-misc_data_vladimir_club_cost'                              :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-misc_data_btc_current_normalized_supply_price_usd'         :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-misc_data_btc_y2050_normalized_supply_price_usd'           :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-misc_data_asset_created_at'                                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-misc_data_asset_age_days'                                  :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-misc_data_categories'                                      :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-metrics-misc_data_sectors'                                         :'String|Number|Boolean|Null|Undefined|Array',

  'm-assets-profile-is_verified'                                               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-tagline'                                                   :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-overview'                                                  :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-packground'                                                :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-technology'                                                :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_distribution_sale_start'                             :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_distribution_sale_end'                               :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_distribution_initial_distribution'                   :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_distribution_current_supply'                         :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_distribution_max_supply'                             :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-token_distribution_description'                            :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_details_usage'                                       :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_details_type'                                        :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-token_details_sales_rounds'                                :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-organizations'                                             :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-people_founding_team'                                      :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-people_contributors'                                       :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-people_investors'                                          :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-people_advisors'                                           :'String|Number|Boolean|Null|Undefined|Array',
  // 'm-assets-profile-relevant_resources'                                        :'String|Number|Boolean|Null|Undefined|Array',
  'm-assets-profile-consensus_algorithm'                                       :'String|Number|Boolean|Null|Undefined|Array',

  'm-markets-id'                           :'String|Number|Boolean|Null|Undefined|Array', // "0019b21e-cdf4-44ef-aee6-11b4b3376e08",
  'm-markets-exchange'                     :'String|Number|Boolean|Null|Undefined|Array', // "bitstamp",
  'm-markets-exchange_id'                  :'String|Number|Boolean|Null|Undefined|Array', // "3663f00d-91fc-48a2-98a2-8af76325927a",
  'm-markets-base'                         :'String|Number|Boolean|Null|Undefined|Array', // "BTC",
  'm-markets-base_asset_id'                :'String|Number|Boolean|Null|Undefined|Array', // "1e31218a-e44e-4285-820c-8282ee222035",
  'm-markets-quote'                        :'String|Number|Boolean|Null|Undefined|Array', // "USD",
  'm-markets-quote_asset_id'               :'String|Number|Boolean|Null|Undefined|Array', // "60dcd17b-00f3-49f8-907c-f390c2521c59",
  'm-markets-pair'                         :'String|Number|Boolean|Null|Undefined|Array', // "BTC-USD",
  'm-markets-price_usd'                    :'String|Number|Boolean|Null|Undefined|Array', // 12292.23,
  'm-markets-volume_last_24_hours'         :'String|Number|Boolean|Null|Undefined|Array', // 191909552.5876635,
  'm-markets-deviation_from_vwap_percent'  :'String|Number|Boolean|Null|Undefined|Array', // 0.029333589373393965,
  'm-markets-last_trade_at'                :'String|Number|Boolean|Null|Undefined|Array', // "2019-08-06T10:08:14Z",
  'm-markets-excluded_from_price'          :'String|Number|Boolean|Null|Undefined|Array', // false

  'm-prices-id'                            :'String|Number|Boolean|Null|Undefined|Array', // "c8c7e9a1-844d-4cfd-9dbc-ce85a8a9613f",
  'm-prices-symbol'                        :'String|Number|Boolean|Null|Undefined|Array', // "BCH",
  'm-prices-rank'                          :'String|Number|Boolean|Null|Undefined|Array', // 4,
  'm-prices-slug'                          :'String|Number|Boolean|Null|Undefined|Array', // "bitcoin-cash",
  'm-prices-name'                          :'String|Number|Boolean|Null|Undefined|Array', // "Bitcoin Cash",
  'm-prices-priceUsd'                      :'String|Number|Boolean|Null|Undefined|Array', // 331.7928859141009,
  'm-prices-priceBtc'                      :'String|Number|Boolean|Null|Undefined|Array', // 0.02918531760176295,
  'm-prices-percentageChange24HrUsd'       :'String|Number|Boolean|Null|Undefined|Array', // 3.186926407609609,
  'm-prices-percentageChange24HrBtc'       :'String|Number|Boolean|Null|Undefined|Array', // 3.981337049918368,
  'm-prices-percentageChange7dUsd'         :'String|Number|Boolean|Null|Undefined|Array', // -4.435096827830578,
  'm-prices-percentageChange7dBtc'         :'String|Number|Boolean|Null|Undefined|Array', // -1.5893254767933307,
  'm-prices-percentageChange90dUsd'        :'String|Number|Boolean|Null|Undefined|Array', // -14.5099369682545,
  'm-prices-percentageChange90dBtc'        :'String|Number|Boolean|Null|Undefined|Array', // -39.64958800725293,
  'm-prices-percentageChange1yrUsd'        :'String|Number|Boolean|Null|Undefined|Array', // -42.026854119626265,
  'm-prices-percentageChange1yrBtc'        :'String|Number|Boolean|Null|Undefined|Array', // -67.7444834645597,
  'm-prices-y2050Marketcap'                :'String|Number|Boolean|Null|Undefined|Array', // 6963002570.293967,
  'm-prices-currentMarketcap'              :'String|Number|Boolean|Null|Undefined|Array', // 5953933676.388739,
  'm-prices-vol24HrUsd'                    :'String|Number|Boolean|Null|Undefined|Array', // 272227365.28458655,
  'm-prices-realVol24HrUsd'                :'String|Number|Boolean|Null|Undefined|Array', // 46563027.97335898,
  'm-prices-volOverstatementMultiple'      :'String|Number|Boolean|Null|Undefined|Array', // 5.846427458290327,
  'm-prices-age'                           :'String|Number|Boolean|Null|Undefined|Array', // 64022400,
  'm-prices-y2050Supply'                   :'String|Number|Boolean|Null|Undefined|Array', // 20982433.29,
  'm-prices-circulatingSupply'             :'String|Number|Boolean|Null|Undefined|Array', // 17941687.5,
  'm-prices-supplyPercentageIssued'        :'String|Number|Boolean|Null|Undefined|Array', // 85.4950356427417,
  'm-prices-instInflation'                 :'String|Number|Boolean|Null|Undefined|Array', // 3.040591394357619,
  'm-prices-vladimirClubCostUsd'           :'String|Number|Boolean|Null|Undefined|Array', // 696700.4252065952,
  'm-prices-athUsd'                        :'String|Number|Boolean|Null|Undefined|Array', // 4329.52,
  'm-prices-athTimestamp'                  :'String|Number|Boolean|Null|Undefined|Array', // 1513728000,
  'm-prices-percentageDownFromAth'         :'String|Number|Boolean|Null|Undefined|Array', // 92.33115859545865,
  'm-prices-breakevenMultiple'             :'String|Number|Boolean|Null|Undefined|Array', // 13.039779377988145,
  'm-prices-txVol24hr'                     :'String|Number|Boolean|Null|Undefined|Array', // 651995331.5443898,
  'm-prices-adjustedTxVol24hr'             :'String|Number|Boolean|Null|Undefined|Array', // 208894538.55943453,
  'm-prices-nvt24hr'                       :'String|Number|Boolean|Null|Undefined|Array', // 5.541230997868197,
  'm-prices-adjustedNvt24hr'               :'String|Number|Boolean|Null|Undefined|Array', // 29.09908568417022,
  'm-prices-activeAddresses24hr'           :'String|Number|Boolean|Null|Undefined|Array', // 33543,
  'm-prices-txCount24hr'                   :'String|Number|Boolean|Null|Undefined|Array', // 54177,
  'm-prices-newIssuance24hrUsd'            :'String|Number|Boolean|Null|Undefined|Array', // 597643.2402802181,
  'm-prices-fees24hrUsd'                   :'String|Number|Boolean|Null|Undefined|Array', // 165.44447256677824,
  'm-prices-avgDifficulty24hr'             :'String|Number|Boolean|Null|Undefined|Array', // 272077986089.4984,
  'm-prices-paymentCount24hr'              :'String|Number|Boolean|Null|Undefined|Array', // 68500,
  'm-prices-medianTx24hrUsd'               :'String|Number|Boolean|Null|Undefined|Array', // 9518.180021125188,
  'm-prices-medianFee24hrUsd'              :'String|Number|Boolean|Null|Undefined|Array', // 0.0009097458213154431,
  'm-prices-dataAdded24hrKb'               :'String|Number|Boolean|Null|Undefined|Array', // 18487.107,
  'm-prices-blockCount24hr'                :'String|Number|Boolean|Null|Undefined|Array', // 144,
  'm-prices-githubStars'                   :'String|Number|Boolean|Null|Undefined|Array', // 837,
  'm-prices-githubWatchers'                :'String|Number|Boolean|Null|Undefined|Array', // 151,
  'm-prices-githubCommits90d'              :'String|Number|Boolean|Null|Undefined|Array', // 357,
  'm-prices-githubCommits365d'             :'String|Number|Boolean|Null|Undefined|Array', // 1222,
  'm-prices-githubAdditions90d'            :'String|Number|Boolean|Null|Undefined|Array', // 13621,
  'm-prices-githubAdditions365d'           :'String|Number|Boolean|Null|Undefined|Array', // 74575,
  'm-prices-githubDeletions90d'            :'String|Number|Boolean|Null|Undefined|Array', // 10508,
  'm-prices-githubDeletions365d'           :'String|Number|Boolean|Null|Undefined|Array', // 54330,
  'm-prices-roi2018'                       :'String|Number|Boolean|Null|Undefined|Array', // -93.69886976147572,
  'm-prices-priceBtcNormalizedSupply'      :'String|Number|Boolean|Null|Undefined|Array', // 333.3428231033297,
  'm-prices-priceBtcNormalizedSupplyY2050' :'String|Number|Boolean|Null|Undefined|Array', // 332.023055252498,
  'm-prices-cycleLowUsd'                   :'String|Number|Boolean|Null|Undefined|Array', // 73.53692042800047,
  'm-prices-cycleLowTimestamp'             :'String|Number|Boolean|Null|Undefined|Array', // 1544832000,
  'm-prices-percentageUpFromCycleLow'      :'String|Number|Boolean|Null|Undefined|Array', // 351.5065635675912,
  'm-prices-miningAlg'                     :'String|Number|Boolean|Null|Undefined|Array', // "SHA-256",
  'm-prices-networkHashRate'               :'String|Number|Boolean|Null|Undefined|Array', // "2,258 PH/s",
  'm-prices-availableOnNicehash'           :'String|Number|Boolean|Null|Undefined|Array', // 2.094613750125146,
  'm-prices-attackHourlyCost'              :'String|Number|Boolean|Null|Undefined|Array', // 26487.2703304613,
  'm-prices-attackDailyCost'               :'String|Number|Boolean|Null|Undefined|Array', // 635694.4879310712,
  'm-prices-percentageChangeMtdUsd'        :'String|Number|Boolean|Null|Undefined|Array', // 2.3756319590136403,
  'm-prices-percentageChangeQtdUsd'        :'String|Number|Boolean|Null|Undefined|Array', // -18.213080336790576,
  'm-prices-percentageChangeYtdUsd'        :'String|Number|Boolean|Null|Undefined|Array', // 110.4621445887108,
  'm-prices-stakingEngagedPercent'         :'String|Number|Boolean|Null|Undefined|Array', // 0,
  'm-prices-flipsideGrade'                 :'String|Number|Boolean|Null|Undefined|Array', // "A",
  'm-prices-flipsideRating'                :'String|Number|Boolean|Null|Undefined|Array', // 860,
  'm-prices-flipsideDevScore'              :'String|Number|Boolean|Null|Undefined|Array', // 812,
  'm-prices-flipsideUtilityScore'          :'String|Number|Boolean|Null|Undefined|Array', // 935,
  'm-prices-flipsideMaturityScore'         :'String|Number|Boolean|Null|Undefined|Array', // 782,
  'm-prices-tokenInsightGrade'             :'String|Number|Boolean|Null|Undefined|Array', // "BBB",
  'm-prices-tokenInsightTeamScore'         :'String|Number|Boolean|Null|Undefined|Array', // 71,
  'm-prices-tokenInsightSubjectScore'      :'String|Number|Boolean|Null|Undefined|Array', // 84,
  'm-prices-tokenInsightEcologyScore'      :'String|Number|Boolean|Null|Undefined|Array', // 79,
  'm-prices-sharpe30d'                     :'String|Number|Boolean|Null|Undefined|Array', // 2.754162270016756,
  'm-prices-sharpe90d'                     :'String|Number|Boolean|Null|Undefined|Array', // -0.42058308317699905,
  'm-prices-sharpe1yr'                     :'String|Number|Boolean|Null|Undefined|Array', // 0.0772171135736047,
  'm-prices-volatility30d'                 :'String|Number|Boolean|Null|Undefined|Array', // 0.542888803834895,
  'm-prices-volatility90d'                 :'String|Number|Boolean|Null|Undefined|Array', // 0.8063010419732609,
  'm-prices-volatility1yr'                 :'String|Number|Boolean|Null|Undefined|Array', // 1.1662336844500807,
  'm-prices-y10Supply'                     :'String|Number|Boolean|Null|Undefined|Array', // 20452868.5,
  'm-prices-y10Marketcap'                  :'String|Number|Boolean|Null|Undefined|Array', // 6787266946.930182,
  'm-prices-supplyY10PercentageIssued'     :'String|Number|Boolean|Null|Undefined|Array', // 87.70866942209109,
  'm-prices-liquidSupply'                  :'String|Number|Boolean|Null|Undefined|Array', // 17938938.82,
  'm-prices-liquidMarketcap'               :'String|Number|Boolean|Null|Undefined|Array', // 5953021529.277849,
  'm-prices-vol24HrTurnover'               :'String|Number|Boolean|Null|Undefined|Array', // 0.7821746947219165

  'xe-name'       : 'String', // "US Dollar"
  'xe-unitsPerUSD': 'String', // "1.0000000000"
  'xe-USDPerUnits': 'String', // "1.0000000000"

}

let fieldWhitelist = [
  ...Object.keys(fieldTypeMap),
  ...fieldLastValue.map(field => `${field}:last`)
];

fieldWhitelist = [...fieldWhitelist, ...fieldWhitelist.map(v => v +='-timestamp'), ...fieldWhitelist.map(v => v +='-lastChecked')];

//
// This should be generated
//
const columnDependencies = {

  //
  // Binary Overdose
  // NOTE: Always send fields in rowIndex
  //
  rowIndex: [
    'rowIndex',
    'cc-total-vol-full-Id',
    'cc-total-vol-full-CHANGEPCTDAY',
  ],
  priceBTC: [
    'cryptohub-price-btc',
  ],
  sparklineUSD: [
    'cryptohub-cc-price-history-USD',
  ],
  sparklineBTC: [
    'cryptohub-cc-price-history-BTC',
  ],
  exchanges: [
    'cryptohub-exchangesListDex',
    'cryptohub-exchangesListCryptoOnly',
    'cryptohub-exchangesListAcceptsBoth',
  ],
  exchangeLocations: [
    'cryptohub-exchangesListDex',
    'cryptohub-exchangesListCryptoOnly',
    'cryptohub-exchangesListAcceptsBoth',
  ],
  numberOfExchanges: [
    'cryptohub-numberOfExchanges',
    'cryptohub-exchangesListDex',
    'cryptohub-exchangesListCryptoOnly',
    'cryptohub-exchangesListAcceptsBoth',
    'cryptohub-numberOfPairs',
    // 'cryptohub-exchangesListFiatOnly',
    // 'cryptohub-numberOfFiatCurrencies',
    // 'cryptohub-numberOfFiatPairs',
    // 'cryptohub-numberOfDex',
  ],
  numberOfPairs: [
    'cryptohub-numberOfPairs',
  ],
  numberOfFiatPairs: [
    'cryptohub-numberOfFiatPairs',
  ],
  numberOfFiatCurrencies: [
    'cryptohub-numberOfFiatCurrencies',
  ],

  //
  // CryptoCompare
  //
  nameCC: [
    'cc-total-vol-full-FullName',
    'cc-coinlist-Symbol',
    'cc-total-vol-full-ImageUrl',
  ],
  priceUSDCC: [
    'cc-total-vol-full-PRICE',
  ],
  percentChange24hUSDCC: [
    'cc-total-vol-full-CHANGEPCTDAY',
  ],
  volume24hUSDCC: [
    'cc-total-vol-full-TOTALVOLUME24HTO',
  ],
  marketcapUSDCC: [
    'cc-total-vol-full-MKTCAP',
  ],
  circulatingSupplyCC: [
    'cc-total-vol-full-SUPPLY',
  ],
  proofTypeCC: [
    'cc-total-vol-full-ProofType',
  ],
  algoCC: [
    'cc-total-vol-full-Algorithm',
  ],
  hashesPerSecondCC: [
    'cc-total-vol-full-NetHashesPerSecond',
  ],
  builtOnCC: [
    'cc-coinlist-BuiltOn',
  ],

  //
  // CoinMarketCap
  //
  marketcapUSDCMC: [
    'cmc-listings-quote_USD_market_cap',
  ],
  volume24HourCMC: [
    'cmc-listings-quote_USD_volume_24h',
  ],
  circulatingSupplyCMC: [
    'cmc-listings-circulating_supply',
  ],
  percentChange24HourCMC: [
    'cmc-listings-quote_USD_percent_change_24h',
  ],
  percentChange7DayCMC: [
    'cmc-listings-quote_USD_percent_change_7d',
  ],

  //
  // Messari
  //
  sectorsMessari: [
    'm-metrics-misc_data_sectors',
  ],
  athUSDMessari: [
    'm-prices-athUsd',
  ],
  athPercentDownUSDMessari: [
    'm-prices-percentageDownFromAth',
  ],
  cycleLowUSDMessari: [
    'm-prices-cycleLowUsd',
  ],
  percentChange7dUSDMessari: [
    'm-prices-percentageChange7dUsd',
  ],
  percentChange7dBTCMessari: [
    'm-prices-percentageChange7dBtc',
  ],
  percentChange1mUSDMessari: [
    'm-metrics-roi_data_percent_change_last_1_month',
  ],
  percentChange1mBTCMessari: [
    'm-metrics-roi_data_percent_change_btc_last_1_month',
  ],
  percentChange3mUSDMessari: [
    'm-prices-percentageChange90dUsd',
  ],
  percentChange3mBTCMessari: [
    'm-prices-percentageChange90dBtc',
  ],
  percentChange1yUSDMessari: [
    'm-prices-percentageChange1yrUsd',
  ],
  percentChange1yBTCMessari: [
    'm-prices-percentageChange1yrBtc',
  ],
  priceUSDMessari: [
    'm-prices-priceUsd',
  ],
  priceBTCMessari: [
    'm-prices-priceBtc',
  ],
  volume24hUSDMessari: [
    'm-prices-vol24HrUsd',
  ],
  realVolume24hUSDMessari: [
    'm-prices-realVol24HrUsd',
  ],
  volume24hUSDOverstatementMultipleMessari: [
    'm-prices-volOverstatementMultiple',
  ],
  percentChange24hUSDMessari: [
    'm-prices-percentageChange24HrUsd',
  ],
  percentChange24hBTCMessari: [
    'm-prices-percentageChange24HrBtc',
  ],
  marketcapUSDMessari: [
    'm-prices-currentMarketcap',
  ],
  marketcapUSD2050Messari: [
    'm-prices-y2050Marketcap',
  ],
}

//
// Add timestamp, :last and default fields
//
{
  let copy;
  for (const values of Object.values(columnDependencies)) {
    copy = [];
    for (const field of values) {
      copy.push(`${field}-timestamp`);
      if (fieldLastValue.includes(field)) {
        copy.push(`${field}:last`);
      }
    }
    values = values.push(...copy);
  }
}

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

  //
  // App settings
  //
  debug:                                       true, // TODO: Change this to an env var
  logger:                                      args.options.logger || false,
  maxRowsTemplatedIn:                          50,
  maxRecordsScraped:                           5000,

  // The diff-json library has a bug where null field throw an error on add.
  // For now we are just not going to send null fields, lightens the load anyhow.
  removeNullFields: true,

  //
  // Directories & Paths
  //
  dbDir,
  appRoot:                                     path.resolve(__dirname),
  cacheDir,
  scrapeDir,
  generatedDir,

  columnDependencies,

  //
  // Lists
  //
  fieldWhitelist,
  fieldLastValue,

  //
  // Maps
  //
  fieldTypeMap,

  //
  // Cache
  // NOTE: we dont really need this if we are using rate limits. Using it for dev though
  //
  cacheForXe:                                  isProd ? 0 : 1000 * 60 * 10,
  cacheForMessari:                             isProd ? 0 : 1000 * 60 * 10,
  cacheForCryptocompare:                       isProd ? 0 : 1000 * 60 * 10,
  cacheForCoinmarketcap:                       isProd ? 0 : 1000 * 60 * 60 * 24,

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
  rateLimitCryptocompare:                      26784,

  // Unknow at the moment
  rateLimitMessari:                            1000 * 10,

  //
  // Based on credits so need to implement checks
  //
  // For cryptocurrency listings its 1 credit per 200 results
  //
  rateLimitCoinmarketcap:                      1000 * 60 * 60,

  rateLimitXe:                                 1000 * 60 * 60 * 24,

  //
  // Queues
  //
  queueCoinmarketcap:                          1000 * 60 * 60,

  //
  // Messari
  //
  //
  uriMessariPrices:                            `https://data.messari.io/api/v1/markets/prices-legacy`,
  keyMessariPrices:                            `${scrapeDir}/messari-prices/data.json`,
  uriMessariAssetsWithMetrics:              `https://data.messari.io/api/v1/assets?with-metrics`,
  keyMessariAssetsWithMetrics:              `${scrapeDir}/messari-assets-with-metric/data.json`,
  tagUriMessariMetrics:                        (str, id) => `https://data.messari.io/api/v1/assets/${id}/metrics`,
  tagKeyMessariMetrics:                        (str, id) => `${scrapeDir}/messari-metric/${id}/data.json`,
  tagKeyMessariMetricsGrouped:                 (str, ob) => `${scrapeDir}/messari-metric-grouped/data.json`,
  uriMessariMarkets:                           `https://data.messari.io/api/v1/markets`,
  keyMessariMarkets:                           `${scrapeDir}/messari-markets/data.json`,

  //
  // Cryptocompare
  //

  tagUriCryptocompareTotalVolFull:             (str, ob) => `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${ob.limit}&tsym=USD&page=${ob.page}`,
  tagKeyCryptocompareTotalVolFull:             (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull/page-${ob.page}.json`,
  tagKeyCryptocompareTotalVolFullGrouped:      (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull-grouped/data.json`,

  uriCryptocompareList:                        'https://min-api.cryptocompare.com/data/all/coinlist',
  keyCryptocompareList:                        `${scrapeDir}/cryptocompare-coinlist/data.json`,

  uriCryptocompareExchangesList:               'https://min-api.cryptocompare.com/data/v2/all/exchanges',
  keyCryptocompareExchangesList:               `${scrapeDir}/cryptocompare-exchanges-list/data.json`,
  uriCryptocompareExchangesGeneral:            `https://min-api.cryptocompare.com/data/exchanges/general?api_key=${cryptocompareApiKey}`,
  keyCryptocompareExchangesGeneral:            `${scrapeDir}/cryptocompare-exchanges-general/data.json`,

  // uriCryptocompareExchangeStatus:              'https://min-api.cryptocompare.com/data/all/cccaggexchanges',
  // keyCryptocompareExchangeStatus:              `${scrapeDir}/cryptocompare-exchange-status/data.json`,

  tagUriCryptocompareTradingInfoSingle:        (str, ob) => `https://min-api.cryptocompare.com/data/generateAvg?fsym=${ob.symbol1}&tsym=${ob.symbol2}&e=${ob.exchange}`,
  tagKeyCryptocompareTradingInfoSingle:        (str, ob) => `${scrapeDir}/cryptocompare-exchange/${ob.exchange}-pairs-${ob.symbol1}-${ob.symbol2}.json`,
  tagKeyCryptocompareTradingInfoSingleGrouped: (str, ob) => `${scrapeDir}/cryptocompare-exchange-grouped/data.json`,

  tagUriCryptocompareTradingInfoMulti:         (str, ob) => `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ob.list1}&tsyms=${ob.list2}&e=${ob.exchange || 'CCCAGG'}`,
  tagKeyCryptocompareTradingInfoMulti:         (str, ob) => `${scrapeDir}/cryptocompare-trading-info-${ob.exchange || 'CCCAGG'}/${ob.cacheKey}.json`,
  tagKeyCryptocompareTradingInfoMultiGrouped:  (str, ob) => `${scrapeDir}/cryptocompare-trading-info-${ob.exchange || 'CCCAGG'}-grouped/data.json`,
  limitsCryptocompareTradingInfoMultiArr1:     300,
  limitsCryptocompareTradingInfoMultiArr2:     100,

  tagUriCryptocompareSnapshot:                 (str, id) => `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`,
  tagKeyCryptocompareSnapshot:                 (str, id) => `${scrapeDir}/cryptocompare-snapshot/${id}.json`,
  tagKeyCryptocompareSnapshotGrouped:          (str, ob) => `${scrapeDir}/cryptocompare-snapshot-grouped/data.json`,

  tagUriCryptocompareSocialstats:              (str, id) => `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`,
  tagKeyCryptocompareSocialstats:              (str, id) => `${scrapeDir}/cryptocompare-socialstats/${id}.json`,
  tagKeyCryptocompareSocialStatsGrouped:       (str, ob) => `${scrapeDir}/cryptocompare-socialstats-grouped/data.json`,

  //
  // Coinmarketcap
  //

  uriCoinmarketcapCryptocurrencyListings: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${coinmarketcapApiKey}&start=1&limit=1000&convert=USD`,
  keyCoinmarketcapCryptocurrencyListings: `${scrapeDir}/coinmarketcap-cryptocurrency-listings/data.json`,

  // uriCoinmarketcapList:                        'https://api.coinmarketcap.com/v2/listings/',
  // keyCoinmarketcapList:                        '/coinmarketcap/search/coins.json',
  // tagUriCoinmarketcapDetailsJSON:              (str, id) => `https://api.coinmarketcap.com/v2/ticker/${id}/`,
  // tagUriCoinmarketcapDetailsHTML:              (str, id) => `https://coinmarketcap.com/currencies/${id}/`,
  // tagKeyCoinmarketcapDetailsJSON:              (str, id) => `/coinmarketcap/details/${id}.json`,
  // tagKeyCoinmarketcapDetailsHTML:              (str, id) => `/coinmarketcap/details/${id}.html`,

  //
  // XE
  //
  tagUriXeCurrencyTables:                      (str, id) => `https://xe.com/currencytables/?from=${id}`,
  tagKeyXeCurrencyTables:                      (str, id) => `${scrapeDir}/xe-currencytables/${id}.html`,

  //
  // ISO
  //
  uriISO4217CurrencyCodes:                     `${path.resolve(__dirname)}/../iso/4217.txt`,

}

module.exports = settings;
