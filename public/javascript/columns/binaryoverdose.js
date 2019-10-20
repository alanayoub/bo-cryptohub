'use strict';

// ag-grid cell Renderer Classes
import CellRendererSparkline                    from '../utils/class-cell-renderer-sparkline.js';

// ag-grid cell Renderers
import cellRendererNumber                       from '../utils/cell-renderer-number.js';
import cellRendererCurrency                     from '../utils/cell-renderer-currency.js';
import cellRendererExchanges                    from '../utils/cell-renderer-exchanges.js';
import cellRendererNumberOfExchanges            from '../utils/cell-renderer-number-of-exchanges.js';
import cellRendererExchangeLocations            from '../utils/cell-renderer-exchange-locations.js';

import onCellClicked                            from '../utils/on-cell-clicked.js';

export default {

  //
  // The numeric index for each row
  // stays the same during sort and filtering
  // always counts from 1 to rows.length
  //
  rowIndex: {
    colId: 'rowIndex',
    field: 'rowIndex',
    valueGetter: 'node.rowIndex',
    headerName: '#',
    headerClass: 'CH-col',
    headerTooltip: 'Row Number',
    width: 40,
    pinned: 'left',
    lockPinned: true,
    lockPosition: true,
    suppressMenu: true,
    suppressFilter: true,
    cellClass: 'cryptohub-align-right',
    cellRenderer(params) {
      return params.value + 1;
    },
    type: [
      'cryptohubNumeric',
    ],
    dependencies: [
      'cryptohub-name',
      'cryptohub-symbol',
      'cc-total-vol-full-CHANGEPCTDAY',
      'cc-total-vol-full-TOTALVOLUME24HTO'
    ]
  },

  //
  // Sparkline (USD)
  //
  // 7 Day USD price & volume trend
  // Top & bottom numbers are % swing in price (top) & volume (bottom)
  //
  sparklineUSD: {
    colId: 'sparklineUSD',
    field: 'cryptohub-cc-price-history-USD',
    headerName: '7D Trend $',
    headerClass: 'CH-col',
    headerTooltip: '7 Day USD price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 124,
    type: [
      'cryptohubDefaults',
    ],
    cellRenderer: CellRendererSparkline,
    cellRendererParams: {
      range: true,
      price: true,
      volume: true,
      days: 7,
    }
  },

  //
  // Sparkline (BTC)
  //
  // 7 Day BTC price & volume trend
  // Top & bottom numbers are % swing in price (top) & volume (bottom)
  //
  sparklineBTC: {
    colId: 'sparklineBTC',
    field: 'cryptohub-cc-price-history-BTC',
    headerName: '7D Trend ฿',
    headerClass: 'CH-col',
    headerTooltip: '7 Day BTC price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 124,
    type: [
      'cryptohubDefaults',
    ],
    cellRenderer: CellRendererSparkline,
    cellRendererParams: {
      range: true,
      price: true,
      volume: true,
      days: 7,
    }
  },

  //
  // Exchanges
  //
  exchanges: {
    colId: 'exchanges',
    field: 'stub-exchanges',
    headerName: 'Exchanges',
    headerClass: 'CH-col',
    headerTooltip: 'List of Exchanges\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 200,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubText'
    ],
    cellRenderer: cellRendererExchanges,
    dependencies: [
      'cryptohub-exchangesListDex',
      'cryptohub-exchangesListCryptoOnly',
      'cryptohub-exchangesListAcceptsBoth'
    ]
  },

  //
  // Exchange Locations
  //
  exchangeLocations: {
    colId: 'exchangeLocations',
    field: 'stub-exchange-locations',
    headerName: 'Exchange Locations',
    headerClass: 'CH-col',
    headerTooltip: 'Geographic Locations of Exchanges\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 200,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubText'
    ],
    cellRenderer: cellRendererExchangeLocations,
    dependencies: [
      'cryptohub-exchangesListDex',
      'cryptohub-exchangesListCryptoOnly',
      'cryptohub-exchangesListAcceptsBoth'
    ]
  },

  //
  // Number of Exchanges
  //
  numberOfExchanges: {
    colId: 'numberOfExchanges',
    field: 'cryptohub-numberOfExchanges',
    headerName: '# of Exchanges',
    headerClass: 'CH-col',
    headerTooltip: 'Number of Exchanges the token is listed on\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    cellStyle: {
      padding: 0
    },
    cellRenderer: cellRendererNumberOfExchanges,
    onCellClicked,
    dependencies: [
      'cryptohub-numberOfExchanges',
      'cryptohub-exchangesListDex',
      'cryptohub-exchangesListCryptoOnly',
      'cryptohub-exchangesListAcceptsBoth',
      'cryptohub-numberOfPairs'
    ]
  },

  //
  // Number of pairs
  //
  numberOfPairs: {
    colId: 'numberOfPairs',
    field: 'cryptohub-numberOfPairs',
    headerName: 'Pairs',
    headerTooltip: 'Number of pairs\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  //
  // Number of Fiat pairs
  //
  numberOfFiatPairs: {
    colId: 'numberOfFiatPairs',
    field: 'cryptohub-numberOfFiatPairs',
    headerName: '# of Fiat pairs',
    headerTooltip: 'The number of fiat currencies this token can be directly exchanged for\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  ////
  //// Number of Fiat currencies
  ////
  //// Kind of useless? commenting out for now
  ////
  //numberOfFiatCurrencies: {
  //  colId: 'numberOfFiatCurrencies',
  //  field: 'cryptohub-numberOfFiatCurrencies',
  //  headerName: '# of Fiat Currencies',
  //  headerTooltip: 'The number of fiat currencies available to trade with on the same exchanges as the token\n\nData Source: BinaryOverdose / Cryptocompare',
  //  headerClass: 'CH-col',
  //  lockPinned: true,
  //  width: 100,
  //  columnGroupShow: 'closed',
  //  type: [
  //    'cryptohubDefaults',
  //    'cryptohubNumeric',
  //  ],
  //  cellRenderer: cellRendererNumber,
  //},

  //
  // Number of DEX
  //
  numberOfDex: {
    colId: 'numberOfDex',
    field: 'cryptohub-numberOfDex',
    headerName: '# of DEX',
    headerTooltip: 'Number of Decentralized Exchanges this project is listed on\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

}
