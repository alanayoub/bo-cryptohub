'use strict';

// Binary Overdose Projects
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';
import { partialApplication }             from '../libs/bo-utils-client';

import cellRendererCurrency               from '../utils/cell-renderer-currency.js';

import onCellClicked                      from '../utils/on-cell-clicked.js';

export default {

  //
  // Sector
  // A list of the assets sectors
  //
  sectorsMessari: {
    colId: 'sectorsMessari',
    field: 'm-metrics-misc_data_sectors',
    headerName: 'Sectors',
    headerClass: 'CH-col',
    headerTooltip: 'Sectors',
    lockPinned: true,
    width: 120,
    type: ['cryptohubText'],
    valueFormatter(params) {
      const value = gnp(params, 'value.value');
      if (!Array.isArray(value) || !value.length) return ch.emptyCellValue;
      else return value.join(', ');
    }
  },

  //
  // All Time High (USD)
  //
  athUSDMessari: {
    colId: 'athUSDMessari',
    field: 'm-metrics-all_time_high_price',
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
    field: 'm-metrics-all_time_high_percent_down',
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
    field: 'm-metrics-cycle_low_price',
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
  // 7 Day Percent change (BTC)
  //
  percentChange7dBTCMessari: {
    colId: 'percentChange7dBTCMessari',
    field: 'm-metrics-roi_data_percent_change_btc_last_1_week',
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
  // 1 Month Percent change (BTC)
  //
  percentChange1mBTCMessari: {
    colId: 'percentChange1mBTCMessari',
    field: 'm-metrics-roi_data_percent_change_btc_last_1_month',
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
  // 3 Month Percent change (BTC)
  //
  percentChange3mBTCMessari: {
    colId: 'percentChange3mBTCMessari',
    field: 'm-metrics-roi_data_percent_change_btc_last_3_months',
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
  // 1 Year Percent change (BTC)
  //
  percentChange1yBTCMessari: {
    colId: 'percentChange1yBTCMessari',
    field: 'm-metrics-roi_data_percent_change_btc_last_1_year',
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
    field: 'm-metrics-market_data_price_usd',
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
    field: 'm-metrics-market_data_price_btc',
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
      currency: 'SAT',
      symbolTo: 'BTC'
    },
    valueFormatter(params) {
      if (params.value) params.value.value *= 100000000;
      return params;
    },
    onCellClicked,
  },

  //
  // Volume
  //
  volume24hUSDMessari: {
    colId: 'volume24hUSDMessari',
    field: 'm-metrics-market_data_volume_last_24_hours',
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
    field: 'm-metrics-market_data_real_volume_last_24_hours',
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
  // 24 Hour Percent Change (USD)
  //
  percentChange24hUSDMessari: {
    colId: 'percentChange24hUSDMessari',
    field: 'm-metrics-market_data_percent_change_usd_last_24_hours',
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
    field: 'm-metrics-market_data_percent_change_btc_last_24_hours',
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

  marketcapUSDMessari: {
    colId: 'marketcapUSDMessari',
    field: 'm-metrics-marketcap_current_marketcap_usd',
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
    field: 'm-metrics-marketcap_y_2050_marketcap_usd',
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

}
