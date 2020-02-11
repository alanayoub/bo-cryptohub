'use strict';

// ag-grid cell Renderer Classes
import CellRendererSparkline                    from '../utils/class-cell-renderer-sparkline.js';

// ag-grid cell Renderers
import cellRendererNumber                       from '../utils/cell-renderer-number.js';
import cellRendererCurrency                     from '../utils/cell-renderer-currency.js';
import cellRendererWallets                      from '../utils/cell-renderer-wallets.js';
import cellRendererExchanges                    from '../utils/cell-renderer-exchanges.js';
import cellRendererNumberOfExchanges            from '../utils/cell-renderer-number-of-exchanges.js';
import cellRendererExchangeLocations            from '../utils/cell-renderer-exchange-locations.js';

import onCellClicked                            from '../utils/on-cell-clicked.js';

import { number, currency, percent, array, custom, date, text, html, bool } from './templates';

export default {

  //
  // The numeric index for each row
  // stays the same during sort and filtering
  // always counts from 1 to rows.length
  //
  rowIndex: Object.assign({}, custom, {
    colId: 'rowIndex',
    field: 'rowIndex',
    valueGetter: 'node.rowIndex',
    headerName: '#',
    headerTooltip: 'Row Number',
    width: 40,
    pinned: 'left',
    lockPosition: true,
    suppressMenu: true,
    cellClass: 'CH-align-right',
    filter: false,
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
  }),

  //
  // Sparkline (USD)
  //
  // 7 Day USD price & volume trend
  // Top & bottom numbers are % swing in price (top) & volume (bottom)
  //
  sparklineUSD: Object.assign({}, custom, {
    colId: 'sparklineUSD',
    field: 'cryptohub-cc-price-history-USD',
    headerName: '7D Trend $',
    headerTooltip: '7 Day USD price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
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
  }),

  //
  // Sparkline (BTC)
  //
  // 7 Day BTC price & volume trend
  // Top & bottom numbers are % swing in price (top) & volume (bottom)
  //
  sparklineBTC: Object.assign({}, custom, {
    colId: 'sparklineBTC',
    field: 'cryptohub-cc-price-history-BTC',
    headerName: '7D Trend ฿',
    headerTooltip: '7 Day BTC price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
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
  }),

  // 'cryptohub-wallets': Array.from(symbols[sym].wallets),
  // 'cryptohub-wallets-supportedValidationTypes': Array.from(symbols[sym].supportedValidationTypes),
  // 'cryptohub-wallets-numberOfWallets': Array.from(symbols[sym].wallets).length,
  // // 'cryptohub-wallets-cards': Array.from(symbols[sym].cards),

  //
  // Wallets
  //
  wallets: Object.assign({}, text, {
    colId: 'wallets',
    field: 'cryptohub-wallets',
    headerName: 'Wallets',
    headerTooltip: 'List of Supported Wallets',
    width: 200,
    type: [
      'cryptohubDefaults',
      'cryptohubText',
      'cryptohubHover'
    ],
    cellRenderer: cellRendererWallets,
    cellRendererParams: {
      popdiv: 'wallets',
    },
    onCellClicked,
  }),

  //
  // Number of Wallets
  //
  numberOfWallets: Object.assign({}, number, {
    colId: 'numberOfWallets',
    field: 'cryptohub-wallets-numberOfWallets',
    headerName: 'Number of Wallets',
    headerTooltip: 'Number of Wallets',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubHover'
    ],
    dependencies: [
      'cryptohub-wallets',
    ],
    cellRendererParams: {
      popdiv: 'wallets',
    },
    onCellClicked,
  }),

  //
  // Wallets Supported Validation Types
  //
  walletsSupportedValidationTypes: Object.assign({}, text, {
    colId: 'walletsSupportedValidationTypes',
    field: 'cryptohub-wallets-supportedValidationTypes',
    headerName: 'Wallet Validation Types',
    headerTooltip: 'Wallet Validation Types',
    width: 200,
    type: [
      'cryptohubDefaults',
      'cryptohubText',
      'cryptohubHover'
    ],
    dependencies: [
      'cryptohub-wallets',
    ],
    cellRenderer: function (params) {
      let value = params.value && params.value.value;
      return value ? value.join(', ') : ch.emptyCellValue;
    },
    cellRendererParams: {
      popdiv: 'wallets',
    },
    onCellClicked,
  }),

  //
  // Wallets Has Attached Card
  //
  // NOTE: NO DATA
  //
  // walletsHasAttachedCard: Object.assign({}, bool, {
  //   colId: 'walletsHasAttachedCard',
  //   field: 'cryptohub-wallets-hasAttachedCard',
  //   headerName: 'Wallet Has Attached Card',
  //   headerTooltip: 'Wallet Has Attached Card',
  // }),

  //
  // Wallets Max Anonymity
  //
  walletsMaxAnonymity: Object.assign({}, text, {
    colId: 'walletsMaxAnonymity',
    field: 'cryptohub-wallets-maxWalletAnonymity',
    headerName: 'Wallet Max Anonymity',
    headerTooltip: 'Wallet Max Anonymity',
    type: [
      'cryptohubDefaults',
      'cryptohubText',
      'cryptohubHover'
    ],
    dependencies: [
      'cryptohub-wallets',
    ],
    cellRendererParams: {
      popdiv: 'wallets',
    },
    onCellClicked,
  }),

  //
  // Wallets Max Easy Of Use
  //
  walletsMaxEasyOfUse: Object.assign({}, text, {
    colId: 'walletsMaxEasyOfUse',
    field: 'cryptohub-wallets-maxWalletEaseOfUse',
    headerName: 'Wallet Max Easy Of Use',
    headerTooltip: 'Wallet Wallet Max Easy Of Use',
    type: [
      'cryptohubDefaults',
      'cryptohubText',
      'cryptohubHover'
    ],
    dependencies: [
      'cryptohub-wallets',
    ],
    cellRendererParams: {
      popdiv: 'wallets',
    },
    onCellClicked,
  }),

  //
  // Wallets Max Security
  //
  walletsMaxSecurity: Object.assign({}, text, {
    colId: 'walletsMaxSecurity',
    field: 'cryptohub-wallets-maxWalletSecurity',
    headerName: 'Wallet Max Security',
    headerTooltip: 'Wallet Max Security',
    type: [
      'cryptohubDefaults',
      'cryptohubText',
      'cryptohubHover'
    ],
    dependencies: [
      'cryptohub-wallets',
    ],
    cellRendererParams: {
      popdiv: 'wallets',
    },
    onCellClicked,
  }),

  //
  // Wallets Max Rating
  //
  walletsMaxRating: Object.assign({}, number, {
    colId: 'walletsMaxRating',
    field: 'cryptohub-wallets-maxWalletRating',
    headerName: 'Wallet Max Rating',
    headerTooltip: 'Wallet Max Rating',
    type: [
      'cryptohubDefaults',
      'cryptohubText',
      'cryptohubHover'
    ],
    dependencies: [
      'cryptohub-wallets',
    ],
    cellRendererParams: {
      popdiv: 'wallets',
    },
    onCellClicked,
  }),

  //
  // Exchanges
  //
  exchanges: Object.assign({}, array, {
    colId: 'exchanges',
    field: 'stub-exchanges',
    headerName: 'Exchanges',
    headerTooltip: 'List of Exchanges\n\nData Source: BinaryOverdose / Cryptocompare',
    width: 200,
    cellRenderer: cellRendererExchanges,
    cellRendererParams: {
      popdiv: 'exchanges',
    },
    dependencies: [
      'cryptohub-numberOfExchanges',
      'cryptohub-exchangesListDex',
      'cryptohub-exchangesListCryptoOnly',
      'cryptohub-exchangesListAcceptsBoth',
      'cryptohub-numberOfPairs'
    ]
  }),

  //
  // Exchange Locations
  //
  exchangeLocations: Object.assign({}, array, {
    colId: 'exchangeLocations',
    field: 'stub-exchange-locations',
    headerName: 'Exchange Locations',
    headerTooltip: 'Geographic Locations of Exchanges\n\nData Source: BinaryOverdose / Cryptocompare',
    width: 200,
    cellRenderer: cellRendererExchangeLocations,
    cellRendererParams: {
      popdiv: 'exchanges',
    },
    dependencies: [
      'cryptohub-exchangesListDex',
      'cryptohub-exchangesListCryptoOnly',
      'cryptohub-exchangesListAcceptsBoth'
    ]
  }),

  //
  // Number of Exchanges
  //
  numberOfExchanges: Object.assign({}, number, {
    colId: 'numberOfExchanges',
    field: 'cryptohub-numberOfExchanges',
    headerName: '# of Exchanges',
    headerTooltip: 'Number of Exchanges the token is listed on\n\nData Source: BinaryOverdose / Cryptocompare',
    width: 100,
    cellRenderer: cellRendererNumberOfExchanges,
    cellRendererParams: {
      popdiv: 'exchanges',
    },
    dependencies: [
      'cryptohub-numberOfExchanges',
      'cryptohub-exchangesListDex',
      'cryptohub-exchangesListCryptoOnly',
      'cryptohub-exchangesListAcceptsBoth',
      'cryptohub-numberOfPairs'
    ]
  }),

  //
  // Number of pairs
  //
  numberOfPairs: Object.assign({}, number, {
    colId: 'numberOfPairs',
    field: 'cryptohub-numberOfPairs',
    headerName: 'Pairs',
    headerTooltip: 'Number of pairs\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 100,
    columnGroupShow: 'closed',
    cellRenderer: cellRendererNumber,
    cellRendererParams: {
      popdiv: 'exchanges',
    }
  }),

  //
  // Number of Fiat pairs
  //
  numberOfFiatPairs: Object.assign({}, number, {
    colId: 'numberOfFiatPairs',
    field: 'cryptohub-numberOfFiatPairs',
    headerName: '# of Fiat pairs',
    headerTooltip: 'The number of fiat currencies this token can be directly exchanged for\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 100,
    cellRenderer: cellRendererNumber,
    cellRendererParams: {
      popdiv: 'exchanges',
    }
  }),

  //
  // Number of DEX
  //
  numberOfDex: Object.assign({}, number, {
    colId: 'numberOfDex',
    field: 'cryptohub-numberOfDex',
    headerName: '# of DEX',
    headerTooltip: 'Number of Decentralized Exchanges this project is listed on\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 100,
    cellRenderer: cellRendererNumber,
    cellRendererParams: {
      popdiv: 'exchanges',
    }
  }),

}
