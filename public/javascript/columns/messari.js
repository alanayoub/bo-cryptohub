'use strict';

import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';
import { partialApplication } from '../libs/bo-utils-client';
import cellRendererNumber from '../utils/cell-renderer-number.js';
import cellRendererCurrency from '../utils/cell-renderer-currency.js';
import onCellClicked from '../utils/on-cell-clicked.js';
import { number, currency, percent, array, date, text, html, bool } from './templates';

export default {

  //
  // Sector
  // A list of the assets sectors
  //
  sectorsMessari: Object.assign({}, array, {
    colId: 'sectorsMessari',
    field: 'm-assets-metrics-misc_data_sectors',
    headerName: 'Sectors',
    headerTooltip: 'Sectors',
    width: 120,
  }),

  //
  // All Time High (USD)
  //
  athUSDMessari: Object.assign({}, currency, {
    colId: 'athUSDMessari',
    field: 'm-assets-metrics-all_time_high_price',
    headerName: 'ATH $',
    headerTooltip: 'All Time High (USD)\n\nData Source: OnChainFX',
  }),

  //
  // All Time High Percent Down
  //
  athPercentDownUSDMessari: Object.assign({}, percent, {
    colId: 'athPercentDownUSDMessari',
    field: 'm-assets-metrics-all_time_high_percent_down',
    headerName: 'ATH % Down',
    headerTooltip: '% Down from All Time High (USD)\n\nData Source: OnChainFX',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercentNoFormat',
      'cryptohubHover',
    ],
  }),

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
  cycleLowUSDMessari: Object.assign({}, currency, {
    colId: 'cycleLowUSDMessari',
    field: 'm-assets-metrics-cycle_low_price',
    headerName: 'Cycle Low $',
    headerTooltip: 'The lowest trading price (in USD) of the asset since its All-Time-High\n\nData Source: OnChainFX',
  }),

  //
  // 24 Hour Percent Change (USD)
  //
  percentChange24hUSDMessari: Object.assign({}, percent, {
    colId: 'percentChange24hUSDMessari',
    field: 'm-assets-metrics-market_data_percent_change_usd_last_24_hours',
    headerName: 'Δ 24h $',
    headerTooltip: 'Percent change over 24 hours against USD\n\nData Source: Messari',
    width: 80,
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'USD',
      interval: 'D'
    },
  }),

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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'BTC',
      interval: 'D'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'USD',
      interval: 'W'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'BTC',
      interval: 'W'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'USD',
      interval: 'M'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'BTC',
      interval: 'M'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'USD',
      interval: 'M'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'BTC',
      interval: 'M'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'USD',
      interval: 'M'
    },
    onCellClicked,
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
      'cryptohubPercent',
      'cryptohubHover'
    ],
    cellRendererParams: {
      popdiv: 'tradingview',
      symbolTo: 'BTC',
      interval: 'M'
    },
    onCellClicked,
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
      popdiv: 'tradingview',
      currency: 'USD',
      symbolTo: 'USD',
      interval: 'D'
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
      popdiv: 'tradingview',
      inputCurrency: 'BTC',
      currency: 'SAT',
      symbolTo: 'BTC',
      interval: 'D'
    },
    onCellClicked,
  },

  //
  // Volume
  //
  volume24hUSDMessari: Object.assign({}, currency, {
    colId: 'volume24hUSDMessari',
    field: 'm-assets-metrics-market_data_volume_last_24_hours',
    headerName: 'Volume 24h $',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Messari',
    width: 150,
  }),

  //
  // Real Volume
  //
  realVolume24hUSDMessari: Object.assign({}, currency, {
    colId: 'realVolume24hUSDMessari',
    field: 'm-assets-metrics-market_data_real_volume_last_24_hours',
    headerName: 'Real Volume 24h $',
    headerTooltip: 'Real Volume according to Messari. 24 hours displayed in USD\n\nData Source: Messari',
    width: 150,
  }),

  //
  // Volume Overstatement Multiple
  //
  volume24hUSDOverstatementMultipleMessari: Object.assign({}, currency, {
    colId: 'volume24hUSDOverstatementMultipleMessari',
    field: 'm-assets-metrics-market_data_volume_last_24_hours_overstatement_multiple',
    headerName: 'Volume 24h $ Overstatement Multiple',
    headerTooltip: 'Volume according to Messari. 24 hours displayed in USD\n\nData Source: Messari',
    width: 150,
  }),

  marketcapUSDMessari: Object.assign({}, currency, {
    colId: 'marketcapUSDMessari',
    field: 'm-assets-metrics-marketcap_current_marketcap_usd',
    headerName: 'Market Cap $',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: Messari',
    width: 150,
    cellRendererParams: {
      exchange: 'CRYPTOCAP',
      currency: 'USD',
      popdiv: 'tradingview',
      interval: 'D'
    },
  }),

  marketcapUSD2050Messari: Object.assign({}, currency, {
    colId: 'marketcapUSD2050Messari',
    field: 'm-assets-metrics-marketcap_y_2050_marketcap_usd',
    headerName: 'Market Cap $ (Y2050)',
    headerTooltip: 'This is the fully diluted (Y2050) Marketcap, it takes into account known future dilution up to Jan 1, 2050.\n\nData Source: Messari',
    width: 150,
    cellRendererParams: {
      exchange: 'CRYPTOCAP',
      currency: 'USD',
      popdiv: 'tradingview',
      interval: 'D'
    },
  }),

  //
  // NVT
  //
  nvtMessari: Object.assign({}, number, {
    colId: 'nvtMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_nvt',
    headerName: 'NVT',
    headerTooltip: 'NVT Ratio (Network Value to Transactions Ratio) is the ratio of the Market Cap divided by the volume transmitted by the blockchain. Simplistically it could be seen as analogus to the PE Ratio used in equity markets. When an assets NVT is high, it indicates that its network valuation is outstripping the value being transmitted through its blockchain.  \n\nData Source: Messari',
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
  }),

  //
  // Sharp Ratio Last 30 Days
  //
  sharpRatioLast30DaysMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast30DaysMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_30_days',
    headerName: 'Sharpe Ratio 30D',
    headerTooltip: 'Sharpe Ratio Last 30 Days',
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
  }),

  //
  // Sharp Ratio Last 90 Days
  //
  sharpRatioLast90DaysMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast90DaysMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_90_days',
    headerName: 'Sharpe Ratio 90D',
    headerTooltip: 'Sharpe Ratio Last 90 Days',
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
  }),

  //
  // Sharp Ratio Last 1 Year
  //
  sharpRatioLast1YearMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast1YearMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_1_year',
    headerName: 'Sharpe Ratio 1Y',
    headerTooltip: 'Sharpe Ratio Last 1 Year',
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
  }),

  //
  // Sharp Ratio Last 3 Year
  //
  sharpRatioLast3YearsMessari: Object.assign({}, number, {
    colId: 'sharpRatioLast3YearsMessari',
    field: 'm-assets-metrics-risk_metrics_sharpe_ratios_last_3_years',
    headerName: 'Sharpe Ratio 3Y',
    headerTooltip: 'Sharpe Ratio Last 3 Years',
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        decimals: 2
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
  }),

  //
  // Blockchain Stats 24 Hour Average Difficulty
  //
  blockchainStats24HoursAverageDifficultyMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursAverageDifficultyMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_average_difficulty',
    headerName: 'Average Difficulty',
    headerTooltip: 'Blockchain 24 Hour Average Difficulty',
    width: 140,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
  }),

  //
  // Blockchain Stats 24 Hour Count of Blocks Added
  //
  blockchainStats24HoursCountOfBlocksAddedMessari: Object.assign({}, number, {
    colId: 'blockchainStats24HoursCountOfBlocksAddedMessari',
    field: 'm-assets-metrics-blockchain_stats_24_hours_count_of_blocks_added',
    headerName: 'Blocks Added 24H',
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
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

  //
  // Staking Yield Percent
  //
  stakingYieldPercentMessari: Object.assign({}, percent, {
    colId: 'stakingYieldPercentMessari',
    field: 'm-assets-metrics-staking_stats_staking_yield_percent',
    headerName: 'Staking Yield %',
    headerTooltip: 'Staking Yield Percent',
    width: 120,
  }),

  //
  // Staking Type
  //
  stakingTypeMessari: Object.assign({}, text, {
    colId: 'stakingTypeMessari',
    field: 'm-assets-metrics-staking_stats_staking_type',
    headerName: 'Staking Type',
    headerTooltip: 'Staking Type',
    width: 120,
  }),

  //
  // Staking Minimum
  //
  stakingMinimumMessari: Object.assign({}, number, {
    colId: 'stakingMinimumMessari',
    field: 'm-assets-metrics-staking_stats_staking_minimum',
    headerName: 'Staking Minimum',
    headerTooltip: 'Staking Minimum',
    width: 120,
  }),

  //
  // Tokens Staked
  //
  tokensStakedMessari: Object.assign({}, number, {
    colId: 'tokensStakedMessari',
    field: 'm-assets-metrics-staking_stats_tokens_staked',
    headerName: 'Tokens Staked',
    headerTooltip: 'Tokens Staked',
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
  }),

  //
  // Tokens Staked Percentage
  //
  tokensStakedPercentMessari: Object.assign({}, percent, {
    colId: 'tokensStakedPercentMessari',
    field: 'm-assets-metrics-staking_stats_tokens_staked_percent',
    headerName: 'Tokens Staked %',
    headerTooltip: 'Tokens Staked Percentage',
    width: 120,
  }),

  //
  // Real Staking Yield Percent
  //
  realStakingYieldPercentMessari: Object.assign({}, percent, {
    colId: 'realStakingYieldPercentMessari',
    field: 'm-assets-metrics-staking_stats_real_staking_yield_percent',
    headerName: 'Real Staking Yield %',
    headerTooltip: 'Real Staking Yield Percent',
    width: 120,
  }),

  //
  // Algorithm
  //
  algorithmMessari: Object.assign({}, text, {
    colId: 'algorithmMessari',
    field: 'm-assets-metrics-mining_stats_mining_algo',
    headerName: 'Algorithm',
    headerTooltip: 'Mining Algorithm',
    width: 120,
  }),

  //
  // Network Hash Rate
  //
  networkHashRateMessari: Object.assign({}, number, {
    colId: 'networkHashRateMessari',
    field: 'm-assets-metrics-mining_stats_network_hash_rate',
    headerName: 'Hash Rate',
    headerTooltip: 'Network Hash Rate',
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
  }),

  //
  // Nicehash Percent
  //
  nicehashPercentMessari: Object.assign({}, percent, {
    colId: 'nicehashPercentMessari',
    field: 'm-assets-metrics-mining_stats_available_on_nicehash_percent',
    headerName: 'Nicehash Percent',
    headerTooltip: 'Nicehash Percent',
    width: 120,
  }),

  //
  // Mining 1 Hour attack cost
  //
  mining1HourAttackCostMessari: Object.assign({}, currency, {
    colId: 'mining1HourAttackCostMessari',
    field: 'm-assets-metrics-mining_stats_1_hour_attack_cost',
    headerName: '1H attack cost',
    headerTooltip: 'Mining 1 hour attack cost',
    width: 120,
  }),

  //
  // Mining 24 Hour attack cost
  //
  mining24HourAttackCostMessari: Object.assign({}, currency, {
    colId: 'mining24HourAttackCostMessari',
    field: 'm-assets-metrics-mining_stats_24_hours_attack_cost',
    headerName: '24H attack cost',
    headerTooltip: 'Mining 24 hours attack cost',
    width: 120,
  }),

  //
  // Mining attack appeal
  //
  miningAttackAppealMessari: Object.assign({}, number, {
    colId: 'miningAttackAppealMessari',
    field: 'm-assets-metrics-mining_stats_attack_appeal',
    headerName: 'Attack Appeal',
    headerTooltip: `
      This is the ratio of the current marketcap to the daily cost of attack.

      In theory, it's more appealing to attack coins with higher-marketcaps per unit of cost an attacker might expend. This ratio captures that relationship. Higher numbers suggest attacks may be more appealing than for coins with lower Attack Appeal numbers.
      Datasources: Nicehash, Messari`,
    width: 120,
    cellRendererParams: {
      popdiv: 'html',
      bo: {
        floor: true
      }
    },
  }),

  //
  // Token Usage
  //
  tokenUsageMessari: Object.assign({}, text, {
    colId: 'tokenUsageMessari',
    field: 'm-assets-profile-token_details_usage',
    headerName: 'Token Usage',
    headerTooltip: 'Token Usage',
    width: 120,
  }),

  //
  // Token Type
  //
  tokenTypeMessari: Object.assign({}, text, {
    colId: 'tokenTypeMessari',
    field: 'm-assets-profile-token_details_type',
    headerName: 'Token Type',
    headerTooltip: 'Token Type',
    width: 120,
  }),

  //
  // Sales Rounds
  //
  salesRoundsMessari: Object.assign({}, number, {
    colId: 'salesRoundsMessari',
    field: 'm-assets-profile-token_details_sales_rounds',
    headerName: 'Sales Rounds',
    headerTooltip: 'Sales Rounds',
    width: 120,
  }),

  //
  // Block Reward
  //
  blockRewardMessari: Object.assign({}, number, {
    colId: 'blockRewardMessari',
    field: 'm-assets-profile-token_details_block_reward',
    headerName: 'Block Reward',
    headerTooltip: 'Block Reward',
    width: 120,
  }),

  //
  // Block Time in Seconds
  //
  blockTimeInSecondsMessari: Object.assign({}, number, {
    colId: 'blockTimeInSecondsMessari',
    field: 'm-assets-profile-token_details_targeted_block_time_in_sec',
    headerName: 'Block Time Seconds',
    headerTooltip: 'Block Time in Seconds',
    width: 120,
  }),

  //
  // On Chain Governance Structure
  //
  onChainGovernanceStructureMessari: Object.assign({}, text, {
    colId: 'onChainGovernanceStructureMessari',
    field: 'm-assets-profile-token_details_on_chain_governance_structure',
    headerName: 'Governance',
    headerTooltip: 'On Chain Governance Structure',
    width: 120,
  }),

  //
  // Is Treasury Decentralized
  //
  isTreasuryDecentralizedMessari: Object.assign({}, bool, {
    colId: 'isTreasuryDecentralizedMessari',
    field: 'm-assets-profile-token_details_is_treasury_decentralized',
    headerName: 'Decentralized Treasury',
    headerTooltip: 'Is Treasury Decentralized',
    width: 120,
  }),

  //
  // Token Laung Style
  //
  tokenLaunchStyleMessari: Object.assign({}, text, {
    colId: 'tokenLaunchStyleMessari',
    field: 'm-assets-profile-token_details_launch_style',
    headerName: 'Token Style',
    headerTooltip: 'Token Launch Style',
    width: 120,
  }),

  //
  // Initial Supply
  //
  initialSupplyMessari: Object.assign({}, number, {
    colId: 'initialSupplyMessari',
    field: 'm-assets-profile-token_details_initial_supply',
    headerName: 'Initial Supply',
    headerTooltip: 'Initial Supply',
    width: 120,
  }),

  //
  // Percentage allocated to investors from initial supply
  //
  percentageAllocatedToInvestorsFromInitialSupplyMessari: Object.assign({}, percent, {
    colId: 'percentageAllocatedToInvestorsFromInitialSupplyMessari',
    field: 'm-assets-profile-token_details_percentage_allocated_to_investors_from_initial_supply',
    headerName: '% allocated to investors',
    headerTooltip: 'Percentage allocated to investors from initial supply',
    width: 120,
  }),

  //
  // Percentage allocated to premined or airdrops from initial supply
  //
  percentageAllocatedToPreminedOrAirdropsFromInitialSupplyMessari: Object.assign({}, percent, {
    colId: 'percentageAllocatedToPreminedOrAirdropsFromInitialSupplyMessari',
    field: 'm-assets-profile-token_details_percentage_allocated_to_premined_or_airdrops_from_initial_supply',
    headerName: 'Premine/Airdrop %',
    headerTooltip: 'Percentage allocated to premine or airdrops from initial supply',
    width: 120,
  }),

  //
  // Usage
  //
  percentageAllocatedToOrgsOrFoundersSupplyMessari: Object.assign({}, percent, {
    colId: 'percentageAllocatedToOrgsOrFoundersSupplyMessari',
    field: 'm-assets-profile-token_details_percentage_allocated_to_organizations_or_founders_supply',
    headerName: '% Allocated Founders',
    headerTooltip: 'Percentage allocated to organizations or founders',
    width: 120,
  }),

  //
  // Next Halving Date
  //
  nextHalvingDateMessari: Object.assign({}, date, {
    colId: 'nextHalvingDateMessari',
    field: 'm-assets-profile-token_details_next_halving_date',
    headerName: 'Halving Date',
    headerTooltip: 'Next Halving Date',
    width: 120,
  }),

  //
  // Genisis Block Date Messari
  //
  genesisBlockDateMessari: Object.assign({}, date, {
    colId: 'genesisBlockDateMessari',
    field: 'm-assets-profile-token_details_genesis_block_date',
    headerName: 'Genisis Block Date',
    headerTooltip: 'Genisis Block Date',
    width: 120,
  }),

  //
  // Is Victim of 51% Attack
  //
  isVictimOf51PercentAttackMessari: Object.assign({}, bool, {
    colId: 'isVictimOf51PercentAttackMessari',
    field: 'm-assets-profile-token_details_is_victim_of_51_percent_attack',
    headerName: '51% Attacked',
    headerTooltip: 'Is Victim of 51% Attack',
    width: 120,
  }),

  //
  // Token Emission Type General
  //
  tokenEmissionTypeGeneralMessari: Object.assign({}, text, {
    colId: 'tokenEmissionTypeGeneralMessari',
    field: 'm-assets-profile-token_details_emission_type_general',
    headerName: 'Token Emission Type General',
    headerTooltip: 'Token Emission Type General',
    width: 120,
  }),

  //
  // Token Emission Type Precise
  //
  tokenEmissionTypePreciseMessari: Object.assign({}, text, {
    colId: 'tokenEmissionTypePreciseMessari',
    field: 'm-assets-profile-token_details_emission_type_precise',
    headerName: 'Emission Type Precise',
    headerTooltip: 'Token Emission Type Precise',
    width: 120,
  }),

  //
  // Is Capped Supply
  //
  isCappedSupplyMessari: Object.assign({}, text, {
    colId: 'isCappedSupplyMessari',
    field: 'm-assets-profile-token_details_is_capped_supply',
    headerName: 'Is Capped Supply',
    headerTooltip: 'Is Capped Supply',
    width: 120,
  }),

  ////
  //// Max Supply
  ////
  //maxSupplyMessari: Object.assign({}, number, {
  //  colId: 'maxSupplyMessari',
  //  field: 'm-assets-profile-token_details_max_supply',
  //  headerName: 'Max Supply',
  //  headerTooltip: 'Max Supply',
  //  width: 120,
  //}),

  //
  // Token Distribution Sale Start
  //
  tokenDistributionSaleStartMessari: Object.assign({}, date, {
    colId: 'tokenDistributionSaleStartMessari',
    field: 'm-assets-profile-token_distribution_sale_start`',
    headerName: 'Sale Start',
    headerTooltip: 'Token Distribution Sale Start',
    width: 120,
  }),

  //
  // Token Distribution Sale End
  //
  tokenDistributionSaleEndMessari: Object.assign({}, date, {
    colId: 'tokenDistributionSaleEndMessari',
    field: 'm-assets-profile-token_distribution_sale_end`',
    headerName: 'Sale End',
    headerTooltip: 'Token Distribution Sale End',
    width: 120,
  }),

  //
  // Initial Token Distribution
  //
  tokenDistributionInitialDistributionMessari: Object.assign({}, date, {
    colId: 'tokenDistributionInitialDistributionMessari',
    field: 'm-assets-profile-token_distribution_initial_distribution',
    headerName: 'Initial Distribution',
    headerTooltip: 'Initial Token Distribution',
    width: 120,
  }),

  //
  // Current Supply
  //
  currentSupplyMessari: Object.assign({}, number, {
    colId: 'currentSupplyMessari',
    field: 'm-assets-profile-token_distribution_current_supply',
    headerName: 'Current Supply',
    headerTooltip: 'Current Supply',
    width: 120,
  }),

  //
  // Current Supply
  //
  maxSupplyMessari: Object.assign({}, number, {
    colId: 'maxSupplyMessari',
    field: 'm-assets-profile-token_distribution_max_supply',
    headerName: 'Max Supply',
    headerTooltip: 'Max Supply',
    width: 120,
  }),

}
