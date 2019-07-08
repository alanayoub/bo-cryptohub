'use strict';

// Binary Overdose Projects
import { partialApplication }    from '../libs/bo-utils-client';

// ag-grid cell Renderer Classes
import CellRendererSparkline     from '../utils/class-cell-renderer-sparkline.js';

// ag-grid cell Renderers
import cellRendererNumber        from '../utils/cell-renderer-number.js';
import cellRendererCurrency      from '../utils/cell-renderer-currency.js';
import cellRendererExchanges     from '../utils/cell-renderer-exchanges.js';

import onCellClicked             from '../utils/on-cell-clicked.js';

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
  },

  //
  // BTC Price
  //
  priceBTC: {
    colId: 'priceBTC',
    field: 'cryptohub-price-btc',
    headerName: 'Price ฿',
    headerClass: 'CH-col',
    headerTooltip: 'Price in BTC\n\nData Source: BinaryOverdose, calculated from Cryptocompare data',
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
  // Sparkline (USD)
  //
  // 7 Day USD price & volume trend
  // Top & bottom numbers are % swing in price (top) & volume (bottom)
  //
  sparklineUSD: {
    colId: 'sparklineUSD',
    field: 'cryptohub-price-history',
    headerName: '7D Trend $',
    headerClass: 'CH-col',
    headerTooltip: '7 Day USD price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
    lockPinned: true,
    width: 124,
    cellRenderer: CellRendererSparkline,
    cellRendererParams: {
      range: true,
      price: true,
      volume: true,
      volumeDays: 7,
    }
  },

  //
  // Number of Exchanges
  //
  numberOfExchanges: {
    colId: 'numberOfExchanges',
    field: 'cryptohub-numberOfExchanges',
    headerName: 'Exchanges',
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
    cellRenderer: cellRendererExchanges,
    onCellClicked,
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
    headerName: 'Fiat pairs',
    headerTooltip: 'Number of fiat pairs\n\nData Source: BinaryOverdose / Cryptocompare',
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
  // Number of Fiat currencies
  //
  numberOfFiatCurrencies: {
    colId: 'numberOfFiatCurrencies',
    field: 'cryptohub-numberOfFiatCurrencies',
    headerName: 'Fiat Currencies',
    headerTooltip: 'Number of fiat Currencies\n\nData Source: BinaryOverdose / Cryptocompare',
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