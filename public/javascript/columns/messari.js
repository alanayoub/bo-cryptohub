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
    field: 'm-metrics-sectors',
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
    field: 'm-metrics-ath-price',
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
    field: 'm-metrics-ath-percent-down',
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
    field: 'm-metrics-cycle-low-price',
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
    field: 'm-metrics-percent-change-btc-last-1-week',
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
    field: 'm-metrics-percent-change-btc-last-1-month',
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
    field: 'm-metrics-percent-change-btc-last-3-months',
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
    field: 'm-metrics-percent-change-btc-last-1-year',
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
    field: 'm-metrics-price-usd',
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
    field: 'm-metrics-price-btc',
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
    onCellClicked,
  },

  //
  // Volume
  //
  volume24hUSDMessari: {
    colId: 'volume24hUSDMessari',
    field: 'm-metrics-volume-last-24-hours',
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
    field: 'm-metrics-real-volume-last-24-hours',
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
    field: 'm-metrics-percent-change-usd-last-24-hours',
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
    field: 'm-metrics-percent-change-btc-last-24-hours',
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

}
