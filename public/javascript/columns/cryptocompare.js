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
    field: 'cc-total-vol-full-FullName.value',
    headerName: 'Name',
    headerClass: 'CH-col',
    headerTooltip: 'Name',
    width: 180,
    pinned: 'left',
    lockPinned: true,
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
    field: 'cc-total-vol-full-ProofType.value',
    headerName: 'Proof',
    headerClass: 'CH-col',
    headerTooltip: 'Proof Type\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubText',
    ],
  },

  //
  // Algo
  //
  algoCC: {
    colId: 'algoCC',
    field: 'cc-total-vol-full-Algorithm.value',
    headerName: 'Algorithm',
    headerClass: 'CH-col',
    headerTooltip: 'Algorithm\n\nData Source: Cryptocompare',
    lockPinned: true,
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubText',
    ],
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
      const value = params.value && params.value.value;
      let output = ch.emptyCellValue;
      if (value && ch.projectMapIdName) {
        output = ch.projectMapIdName[value] || output;
      }
      return output;
    },
  },

}
