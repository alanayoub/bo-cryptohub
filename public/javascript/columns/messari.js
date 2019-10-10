'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';
import { partialApplication } from '../libs/bo-utils-client';

import cellRendererNumber from '../utils/cell-renderer-number.js';
import cellRendererCurrency from '../utils/cell-renderer-currency.js';

import onCellClicked from '../utils/on-cell-clicked.js';

import { number, currency, percent, date } from './templates';

export default {

  //
  // Sector
  // A list of the assets sectors
  //
  sectorsMessari: {
    colId: 'sectorsMessari',
    field: 'm-assets-metrics-misc_data_sectors',
    headerName: 'Sectors',
    headerClass: 'CH-col',
    headerTooltip: 'Sectors',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubText'
    ],
    valueFormatter(params) {
      const value = gnp(params, 'value.value');
      if (value) {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed) && parsed.length) {
          return parsed.join(', ');
        }
      }
      return ch.emptyCellValue;
    }
  },

  //
  // All Time High (USD)
  //
  athUSDMessari: {
    colId: 'athUSDMessari',
    field: 'm-assets-metrics-all_time_high_price',
    headerName: 'ATH $',
    headerClass: 'CH-col',
    headerTooltip: 'All Time High (USD)\n\nData Source: OnChainFX',
    lockPinned: true,
    width: 100,
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
  // All Time High Percent Down
  //
  athPercentDownUSDMessari: {
    colId: 'athPercentDownUSDMessari',
    field: 'm-assets-metrics-all_time_high_percent_down',
    headerName: 'ATH % Down',
    headerClass: 'CH-col',
    headerTooltip: '% Down from All Time High (USD)\n\nData Source: OnChainFX',
    lockPinned: true,
    width: 100,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercentNoFormat'
    ],
  },

  //
  // Cycle low (USD)
  //
  // This is the lowest trading price (in USD) of the asset since its All-Time-High.
  // Notes about how OnChainFX determines Cycle Low:
  //
  // The Cycle Low quote is not necessarily the absolute lowest single trade price.
  // Due to the nature of the historical data we analyze, we are not always able to look at every trade for an asset.
  // For some assets, the Cycle Low quoted may refer to the lowest daily average since the ATH,
  // or a price-sample on the day the Cycle Low occured.
  //
  cycleLowUSDMessari: {
    colId: 'cycleLowUSDMessari',
    field: 'm-assets-metrics-cycle_low_price',
    headerName: 'Cycle Low $',
    headerClass: 'CH-col',
    headerTooltip: 'The lowest trading price (in USD) of the asset since its All-Time-High\n\nData Source: OnChainFX',
    lockPinned: true,
    width: 100,
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
  // 24 Hour Percent Change (USD)
  //
  percentChange24hUSDMessari: {
    colId: 'percentChange24hUSDMessari',
    field: 'm-assets-metrics-market_data_percent_change_usd_last_24_hours',
    headerName: 'Δ 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against USD\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 24 Hour Percent Change (BTC)
  //
  percentChange24hBTCMessari: {
    colId: 'percentChange24hBTCMessari',
    field: 'm-assets-metrics-market_data_percent_change_btc_last_24_hours',
    headerName: 'Δ 24h ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 7 Day Percent change (USD)
  //
  percentChange7dUSDMessari: {
    colId: 'percentChange7dUSDMessari',
    field: 'm-assets-metrics-roi_data_percent_change_last_1_week',
    headerName: '7D Δ $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 7 days against USD\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 7 Day Percent change (BTC)
  //
  percentChange7dBTCMessari: {
    colId: 'percentChange7dBTCMessari',
    field: 'm-assets-metrics-roi_data_percent_change_btc_last_1_week',
    headerName: '7D Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 7 days against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 1 Month Percent change (USD)
  //
  percentChange1mUSDMessari: {
    colId: 'percentChange1mUSDMessari',
    field: 'm-assets-metrics-roi_data_percent_change_last_1_month',
    headerName: '1M Δ $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 1 month against USD\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 1 Month Percent change (BTC)
  //
  percentChange1mBTCMessari: {
    colId: 'percentChange1mBTCMessari',
    field: 'm-assets-metrics-roi_data_percent_change_btc_last_1_month',
    headerName: '1M Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 1 month against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 3 Month Percent change (USD)
  //
  percentChange3mUSDMessari: {
    colId: 'percentChange3mUSDMessari',
    field: 'm-assets-metrics-roi_data_percent_change_last_3_months',
    headerName: '3M Δ $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 3 months against USD\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 3 Month Percent change (BTC)
  //
  percentChange3mBTCMessari: {
    colId: 'percentChange3mBTCMessari',
    field: 'm-assets-metrics-roi_data_percent_change_btc_last_3_months',
    headerName: '3M Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 3 months against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 1 Year Percent change (USD)
  //
  percentChange1yUSDMessari: {
    colId: 'percentChange1yUSDMessari',
    field: 'm-assets-metrics-roi_data_percent_change_last_1_year',
    headerName: '1Y Δ $',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 1 year against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // 1 Year Percent change (BTC)
  //
  percentChange1yBTCMessari: {
    colId: 'percentChange1yBTCMessari',
    field: 'm-assets-metrics-roi_data_percent_change_btc_last_1_year',
    headerName: '1Y Δ ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over the last 1 year against BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // USD Price
  //
  priceUSDMessari: {
    colId: 'priceUSDMessari',
    field: 'm-assets-metrics-market_data_price_usd',
    headerName: 'Price $',
    headerClass: 'CH-col',
    headerTooltip: 'Price in USD\n\nData Source: Messari',
    lockPinned: true,
    width: 120,
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
  priceBTCMessari: {
    colId: 'priceBTCMessari',
    field: 'm-assets-metrics-market_data_price_btc',
    headerName: 'Price ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Price in BTC\n\nData Source: Messari',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      inputCurrency: 'BTC',
      currency: 'SAT',
      symbolTo: 'BTC'
    },
    onCellClicked,
  },

  //
  // Volume
  //
  volume24hUSDMessari: {
    colId: 'volume24hUSDMessari',
    field: 'm-assets-metrics-market_data_volume_last_24_hours',
    headerName: 'Volume 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Messari',
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
  // Real Volume
  //
  realVolume24hUSDMessari: {
    colId: 'realVolume24hUSDMessari',
    field: 'm-assets-metrics-market_data_real_volume_last_24_hours',
    headerName: 'Real Volume 24h $',
    headerClass: 'CH-col',
    headerTooltip: 'Real Volume according to Messari. 24 hours displayed in USD\n\nData Source: Messari',
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
  // Volume Overstatement Multiple
  //
  volume24hUSDOverstatementMultipleMessari: {
    colId: 'volume24hUSDOverstatementMultipleMessari',
    field: 'm-assets-metrics-market_data_volume_last_24_hours_overstatement_multiple',
    headerName: 'Volume 24h $ Overstatement Multiple',
    headerClass: 'CH-col',
    headerTooltip: 'Volume according to Messari. 24 hours displayed in USD\n\nData Source: Messari',
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

  marketcapUSDMessari: {
    colId: 'marketcapUSDMessari',
    field: 'm-assets-metrics-marketcap_current_marketcap_usd',
    headerName: 'Market Cap $',
    headerClass: 'CH-col',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: Messari',
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

  marketcapUSD2050Messari: {
    colId: 'marketcapUSD2050Messari',
    field: 'm-assets-metrics-marketcap_y_2050_marketcap_usd',
    headerName: 'Market Cap $ (Y2050)',
    headerClass: 'CH-col',
    headerTooltip: 'This is the fully diluted (Y2050) Marketcap, it takes into account known future dilution up to Jan 1, 2050.\n\nData Source: Messari',
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
  // NVT
  //
  nvtMessari: Object.assign({}, number, {
    colId: 'nvtMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_nvt',
    headerName: 'NVT',
    headerTooltip: 'NVT Ratio (Network Value to Transactions Ratio) is the ratio of the Market Cap divided by the volume transmitted by the blockchain. Simplistically it could be seen as analogus to the PE Ratio used in equity markets. When an assets NVT is high, it indicates that its network valuation is outstripping the value being transmitted through its blockchain.  \n\nData Source: Messari',
    width: 120,
  }),

  //
  // Adjusted NVT
  //
  adjustedNvtMessari: Object.assign({}, number, {
    colId: 'adjustedNvtMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_adjusted_nvt',
    headerName: 'NVT (Adjusted)',
    headerTooltip: 'Same as NVT but uses the adjusted transaction volume figures calculated by Coinmetrics.io\n\nData Source: Messari',
    width: 120,
  }),

  //
  // Sharp Ratio Last 30 Days
  //
  sharpRatioLast30DaysMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast30DaysMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_30_days',
    headerName: 'Sharp Ratio 30D',
    headerTooltip: 'Sharp Ratio Last 30 Days',
    width: 120,
  }),

  //
  // Sharp Ratio Last 90 Days
  //
  sharpRatioLast90DaysMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast90DaysMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_90_days',
    headerName: 'Sharp Ratio 90D',
    headerTooltip: 'Sharp Ratio Last 90 Days',
    width: 120,
  }),

  //
  // Sharp Ratio Last 1 Year
  //
  sharpRatioLast1YearMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast1YearMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_1_year',
    headerName: 'Sharp Ratio 1Y',
    headerTooltip: 'Sharp Ratio Last 1 Year',
    width: 120,
  }),

  //
  // Sharp Ratio Last 3 Year
  //
  sharpRatioLast3YearsMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast3YearsMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_3_years',
    headerName: 'Sharp Ratio 3Y',
    headerTooltip: 'Sharp Ratio Last 3 Years',
    width: 120,
  }),

  //
  // Volatility Last 30 Days
  //
  volatilityLast30DaysMessari: Object.assign({}, number, {
    colId: 'volatilityLast30DaysMessari',
    field: 'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_30_days',
    headerName: 'Volatility 30D',
    headerTooltip: 'Volatility Last 30 Days',
    width: 120,
  }),

  //
  // Volatility Last 90 Days
  //
  volatilityLast90DaysMessari: Object.assign({}, number, {
    colId: 'volatilityLast90DaysMessari',
    field: 'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_90_days',
    headerName: 'Volatility 90D',
    headerTooltip: 'Volatility Last 90 Days',
    width: 120,
  }),

  //
  // Volatility Last 1 Year
  //
  volatilityLast1YearMessari: Object.assign({}, number, {
    colId: 'volatilityLast1YearMessari',
    field: 'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_1_year',
    headerName: 'Volatility 1Y',
    headerTooltip: 'Volatility Last 1 Year',
    width: 120,
  }),

  //
  // Volatility Last 3 Years
  //
  volatilityLast3YearsMessari: Object.assign({}, number, {
    colId: 'volatilityLast3YearsMessari',
    field: 'm-assets-metrics-risk_metrics_volatility_stats_volatility_last_3_years',
    headerName: 'Volatility 3Y',
    headerTooltip: 'Volatility Last 3 Years',
    width: 120,
  }),

  //
  // Developer Activity Stars
  //
  developerActivityStarsMessari: Object.assign({}, number, {
    colId: 'developerActivityStarsMessari',
    field: 'm-assets-metrics-developer_activity_stars',
    headerName: 'Stars (Dev)',
    headerTooltip: 'Developer Activity Stars',
    width: 120,
  }),

  //
  // Developer Activity Watchers
  //
  developerActivityWatchersMessari: Object.assign({}, number, {
    colId: 'developerActivityWatchersMessari',
    field: 'm-assets-metrics-developer_activity_watchers',
    headerName: 'Watchers (Dev)',
    headerTooltip: 'Developer Activity Watchers',
    width: 120,
  }),

  //
  // Developer Activity Commits Last 3 Months
  //
  developerActivityCommitsLast3MonthsMessari: Object.assign({}, number, {
    colId: 'developerActivityCommitsLast3MonthsMessari',
    field: 'm-assets-metrics-developer_activity_commits_last_3_months',
    headerName: 'Commits 3M',
    headerTooltip: 'Developer Activity Commits Last 3 Months',
    width: 120,
  }),

  //
  // Developer Activity CommitsLast1Year
  //
  developerActivityCommitsLast1YearMessari: Object.assign({}, number, {
    colId: 'developerActivityCommitsLast1YearMessari',
    field: 'm-assets-metrics-developer_activity_commits_last_1_year',
    headerName: 'Commits 1Y',
    headerTooltip: 'Developer Activity Commits Last 1 Year',
    width: 120,
  }),

  //
  // Developer Activity Lines Added Last 3 Months
  //
  developerActivityLinesAddedLast3MonthsMessari: Object.assign({}, number, {
    colId: 'developerActivityLinesAddedLast3MonthsMessari',
    field: 'm-assets-metrics-developer_activity_lines_added_last_3_months',
    headerName: 'LOC Added 3M',
    headerTooltip: 'Developer Activity Lines Of Code Added Last 3 Months',
    width: 120,
  }),

  //
  // Developer Activity Lines Added Last 1 Year
  //
  developerActivityLinesAddedLast1YearMessari: Object.assign({}, number, {
    colId: 'developerActivityLinesAddedLast1YearMessari',
    field: 'm-assets-metrics-developer_activity_lines_added_last_1_year',
    headerName: 'LOC Added 1Y',
    headerTooltip: 'Developer Activity Lines Of Code Added Last 1 Year',
    width: 120,
  }),

  //
  // Developer Activity Lines Deleted Last 3 Months
  //
  developerActivityLinesDeletedLast3MonthsMessari: Object.assign({}, number, {
    colId: 'developerActivityLinesDeletedLast3MonthsMessari',
    field: 'm-assets-metrics-developer_activity_lines_deleted_last_3_months',
    headerName: 'LOC Deleted 3M',
    headerTooltip: 'Developer Activity Lines Of Code Deleted Last 3 Months',
    width: 120,
  }),

  //
  // Developer Activity Lines Deleted Last 1 Year
  //
  developerActivityLinesDeletedLast1YearMessari: Object.assign({}, number, {
    colId: 'developerActivityLinesDeletedLast1YearMessari',
    field: 'm-assets-metrics-developer_activity_lines_deleted_last_1_year',
    headerName: 'LOC Deleted 1Y',
    headerTooltip: 'Developer Activity Lines Of Code Deleted Last 1 Year',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Transaction Volume
  //
  blockchainStats24HoursTransactionVolumeMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursTransactionVolumeMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_transaction_volume',
    headerName: 'Tx Vol',
    headerTooltip: 'Blockchain 24 Hour Transaction Volume',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Adjusted Transaction Volume
  //
  blockchainStats24HoursAdjustedTransactionVolumeMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursAdjustedTransactionVolumeMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_adjusted_transaction_volume',
    headerName: 'Tx Vol Adj',
    headerTooltip: 'Blockchain 24 Hour Adjusted Transaction Volume',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Sum Of Fees
  //
  blockchainStats24HoursSumOfFeesMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursSumOfFeesMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_sum_of_fees',
    headerName: 'Sum Of Fees',
    headerTooltip: 'Blockchain 24 Hour Sum Of Fees',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Median Transaction Value
  //
  blockchainStats24HoursMedianTxValueMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursMedianTxValueMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_median_tx_value',
    headerName: 'Median Tx Vol',
    headerTooltip: 'Blockchain 24 Hour Median Transaction Value',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Median Transaction Fee
  //
  blockchainStats24HoursMedianTxFeeMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursMedianTxFeeMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_median_tx_fee',
    headerName: 'Median Tx Fee',
    headerTooltip: 'Blockchain 24 Hour Median Transaction Fee',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Transaction Volume
  //
  blockchainStats24HoursCountOfActiveAddressesMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursCountOfActiveAddressesMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_count_of_active_addresses',
    headerName: 'Active Addressese',
    headerTooltip: 'Blockchain 24 Hour Count Of Active Addressese',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Transaction Volume
  //
  blockchainStats24HoursCountOfTxMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursCountOfTxMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_count_of_tx',
    headerName: '# of Tx',
    headerTooltip: 'Blockchain 24 Hour Count of Transactions',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Count of Payments
  //
  blockchainStats24HoursCountOfPaymentsMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursCountOfPaymentsMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_count_of_payments',
    headerName: 'Count Of Payments',
    headerTooltip: 'Blockchain 24 Hour Count Of Payments',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour New Issuance
  //
  blockchainStats24HoursNewIssuanceMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursNewIssuanceMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_new_issuance',
    headerName: 'New Issuance',
    headerTooltip: 'Blockchain 24 Hour New Issuance',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Average Difficulty
  //
  blockchainStats24HoursAverageDifficultyMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursAverageDifficultyMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_average_difficulty',
    headerName: 'Average Difficulty',
    headerTooltip: 'Blockchain 24 Hour Average Difficulty',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Kilobytes Added
  //
  blockchainStats24HoursKilobytesAddedMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursKilobytesAddedMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_kilobytes_added',
    headerName: 'kb added',
    headerTooltip: 'Blockchain 24 Hour kilobytes added',
    width: 120,
  }),

  //
  // Blockchain Stats 24 Hour Count of Blocks Added
  //
  blockchainStats24HoursCountOfBlocksAddedMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursCountOfBlocksAddedMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_count_of_blocks_added',
    headerName: 'Count Of Blocks Added',
    headerTooltip: 'Blockchain 24 Hour Count Of Blocks Added',
    width: 120,
  }),

  //
  // Supply Y2050
  //
  supplyY2050Messari: Object.assign({}, number, {
    colId: 'supplyY2050Messari',
    field: 'm-assets-metrics-supply_y_2050',
    headerName: 'Supply Y2050',
    headerTooltip: 'Supply Y2050',
    width: 120,
  }),

  //
  // Supply Y Plus 10
  //
  supplyYPlus10Messari: Object.assign({}, number, {
    colId: 'supplyYPlus10Messari',
    field: 'm-assets-metrics-supply_y_plus10',
    headerName: 'Supply Y Plus 10',
    headerTooltip: 'Supply Y Plus 10',
    width: 120,
  }),

  //
  // Supply Liquid
  //
  supplyLiquidMessari: Object.assign({}, number, {
    colId: 'supplyLiquidMessari',
    field: 'm-assets-metrics-supply_liquid',
    headerName: 'Liquid Supply',
    headerTooltip: 'Supply Liquid',
    width: 120,
  }),

  //
  // Supply Circulating
  //
  supplyCirculatingMessari: Object.assign({}, number, {
    colId: 'supplyCirculatingMessari',
    field: 'm-assets-metrics-supply_circulating',
    headerName: 'Circulating Supply',
    headerTooltip: 'Circulating Supply',
    width: 120,
  }),

  //
  // Supply Y2050 Issued Percent
  //
  supplyY2050IssuedPercentMessari: Object.assign({}, percent, {
    colId: 'supplyY2050IssuedPercentMessari',
    field: 'm-assets-metrics-supply_y_2050_issued_percent',
    headerName: 'Supply Y2050 %',
    headerTooltip: 'Supply Y2050 Issued Percent',
    width: 120,
  }),

  //
  // Supply Annual Inflation Percent
  //
  supplyAnnualInflationPercentMessari: Object.assign({}, percent, {
    colId: 'supplyAnnualInflationPercentMessari',
    field: 'm-assets-metrics-supply_annual_inflation_percent',
    headerName: 'Supply Annual Inflation %',
    headerTooltip: 'Supply Annual Inflation Percent',
    width: 120,
  }),

  //
  // Supply Plus 10 Issued Percent
  //
  supplyYPlus10IssuedPercentMessari: Object.assign({}, percent, {
    colId: 'supplyYPlus10IssuedPercentMessari',
    field: 'm-assets-metrics-supply_y_plus10_issued_percent',
    headerName: 'Supply Plus 10 %',
    headerTooltip: 'Supply Plus 10 Issued Percent',
    width: 120,
  }),

  //
  // Token Sale Proceeds USD
  //
  tokenSaleProceedsUSDMessari: Object.assign({}, currency, {
    colId: 'tokenSaleProceedsUSDMessari',
    field: 'm-assets-metrics-token_sale_stats_sale_proceeds_usd',
    headerName: 'Token Sale USD',
    headerTooltip: 'Token Sale Proceeds USD',
    width: 120,
  }),

  //
  // Token Sale Start Date
  //
  tokenSaleStartDateMessari: Object.assign({}, date, {
    colId: 'tokenSaleStartDateMessari',
    field: 'm-assets-metrics-token_sale_stats_sale_start_date',
    headerName: 'Token Sale Start Date',
    headerTooltip: 'Token Sale Start Date',
    width: 120,
  }),

  //
  // Token Sale End Date
  //
  tokenSaleEndDateMessari: Object.assign({}, date, {
    colId: 'tokenSaleEndDateMessari',
    field: 'm-assets-metrics-token_sale_stats_sale_end_date',
    headerName: 'Token Sale End Date',
    headerTooltip: 'Token Sale end Date',
    width: 120,
  }),

  //
  // Token Sale ROI Since Sale USD
  //
  tokenSaleROISinceSaleUSDMessari: Object.assign({}, percent, {
    colId: 'tokenSaleROISinceSaleUSDMessari',
    field: 'm-assets-metrics-token_sale_stats_roi_since_sale_usd_percent',
    headerName: 'Token Sale ROI USD',
    headerTooltip: 'Token Sale ROI Since Sale USD',
    width: 120,
  }),

  //
  // Token Sale ROI Since Sale BTC
  //
  tokenSaleROISinceSaleBTCMessari: Object.assign({}, percent, {
    colId: 'tokenSaleROISinceSaleBTCMessari',
    field: 'm-assets-metrics-token_sale_stats_roi_since_sale_btc_percent',
    headerName: 'Token Sale ROI BTC',
    headerTooltip: 'Token Sale ROI Since Sale BTC',
    width: 120,
  }),

  //
  // Token Sale Proceeds USD
  //
  tokenSaleROISinceSaleETHMessari: Object.assign({}, percent, {
    colId: 'tokenSaleROISinceSaleETHMessari',
    field: 'm-assets-metrics-token_sale_stats_roi_since_sale_eth_percent',
    headerName: 'Token Sale ROI ETH',
    headerTooltip: 'Token Sale ROI Since Sale ETH',
    width: 120,
  }),

}
