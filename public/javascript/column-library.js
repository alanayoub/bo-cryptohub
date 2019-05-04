'use strict';

// Binary Overdose Projects
import { objectGetNestedProperty as gnp } from './libs/bo-utils-client';
import { partialApplication }             from './libs/bo-utils-client';

// ag-grid cell Renderer Classes
import CellRendererSparkline              from './utils/class-cell-renderer-sparkline.js';

// ag-grid cell Renderers
import cellRendererName                   from './utils/cell-renderer-name.js';
import cellRendererNumber                 from './utils/cell-renderer-number.js';
import cellRendererCurrency               from './utils/cell-renderer-currency.js';
import cellRendererExchanges              from './utils/cell-renderer-exchanges.js';
import cellRendererTradingview            from './utils/cell-renderer-tradingview.js';

// ag-grid cell on click handlers
import cellOnClickExchanges               from './utils/cell-on-click-exchanges.js';
import cellOnClickTradingview             from './utils/cell-on-click-tradingview.js';

// ag-grid filter comparators
import sortNumbers                        from './utils/sort-numbers.js';

const columnDefs = {

  //
  // TODO: hash the column name (i.e. rowIndex)
  //

  //
  // The numeric index for each row
  // stays the same during sort and filtering
  // always counts from 1 to rows.length
  //
  rowIndex: {
    valueGetter: 'node.rowIndex',
    headerName: '#',
    headerClass: 'CH-col',
    headerTooltip: 'Row Number',
    width: 40,
    pinned: 'left',
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
  // Name
  // Asset icon, name & symbol
  //
  name: {
    field: 'cc-total-vol-full-FullName.value',
    headerName: 'Name',
    headerClass: 'CH-col',
    headerTooltip: 'Name',
    width: 180,
    pinned: 'left',
    cellRenderer: cellRendererName,
  },

  //
  // Sector
  // A list of the assets sectors
  //
  sectors: {
    field: 'm-metrics-sectors',
    headerName: 'Sectors',
    headerClass: 'CH-col',
    headerTooltip: 'Sectors',
    width: 180,
    type: ['cryptohubText'],
    valueFormatter(params) {
      const value = gnp(params, 'value.value');
      if (!Array.isArray(value) || !value.length) return ch.emptyCellValue;
      else return value;
    }
  },

  //
  // USD Price
  //
  priceUSD: {
    field: 'cc-total-vol-full-PRICE',
    headerName: 'Price (USD)',
    headerClass: 'CH-col',
    headerTooltip: 'Price in USD\n\nData Source: Cryptocompare',
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'USD',
    },
    // onCellClicked: partialApplication(cellOnClickTradingview, 'USD'),

  },

  //
  // BTC Price
  //
  priceBTC: {
    field: 'cryptohub-price-btc',
    headerName: 'Price (BTC)',
    headerClass: 'CH-col',
    headerTooltip: 'Price in BTC\n\nData Source: BinaryOverdose, calculated from Cryptocompare data',
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, window.refs),
    cellRendererParams: {
      currency: 'SAT',
    },
    onCellClicked: partialApplication(cellOnClickTradingview, 'BTC'),
  },

  //
  // All Time High (USD)
  //
  athUSD: {
    field: 'm-metrics-ath-price',
    headerName: 'ATH',
    headerClass: 'CH-col',
    headerTooltip: 'All Time High (USD)\n\nData Source: OnChainFX',
    width: 120,
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
  cycleLowUSD: {
    field: 'm-metrics-cycle-low-price',
    headerName: 'Cycle Low',
    headerClass: 'CH-col',
    headerTooltip: 'The lowest trading price (in USD) of the asset since its All-Time-High\n\nData Source: OnChainFX',
    width: 120,
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
  // NOTE: We want percent change against BTC too!
  //
  percentChange24hUSD: {
    field: 'cc-total-vol-full-CHANGEPCTDAY',
    headerName: 'Δ 24h',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against USD\n\nData Source: Cryptocompare',
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
  percentChange7dUSD: {
    field: 'm-metrics-percent-change-btc-last-1-week',
    headerName: 'Δ 7D',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 7 days against BTC\n\nData Source: Messari',
    width: 80,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },

  //
  // Sparkline (USD)
  //
  // 7 Day USD price & volume trend
  // Top & bottom numbers are % swing in price (top) & volume (bottom)
  //
  sparklineUSD: {
    field: 'cryptohub-price-history',
    headerName: '7D Trend',
    headerClass: 'CH-col',
    headerTooltip: '7 Day USD price and volume trend\n\nTop & bottom numbers are % swing in price (top) & volume (bottom)\n\nData Source: BinaryOverdose / Cryptocompare',
    width: 124,
    cellRenderer: CellRendererSparkline,
    cellRendererParams: {
      range: true,
      price: true,
      volume: true,
      volumeDays: 7,
    },
    // NOTE: doesnt work yet this is what the docs say to do
    resizable: false,
  },

  //
  // Volume
  //
  // The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD
  //
  volume24hUSD: {
    field: 'cc-total-vol-full-TOTALVOLUME24HTO',
    headerName: 'Volume 24h',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Cryptocompare',
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
  marketcapUSD: {
    field: 'cc-total-vol-full-MKTCAP',
    headerName: 'Market Cap',
    headerClass: 'CH-col',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: Cryptocompare',
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
  circulatingSupply: {
    field: 'cc-total-vol-full-SUPPLY',
    headerName: 'Circulating Supply',
    headerClass: 'CH-col',
    headerTooltip: 'Circulating supply\n\nData Source: Cryptocompare',
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
  proofType: {
    field: 'cc-total-vol-full-ProofType.value',
    headerName: 'Proof',
    headerClass: 'CH-col',
    headerTooltip: 'Proof Type\n\nData Source: Cryptocompare',
    width: 120,
    type: ['cryptohubText'],
  },

  //
  // Algo
  //
  algo: {
    field: 'cc-total-vol-full-Algorithm.value',
    headerName: 'Algorithm',
    headerClass: 'CH-col',
    headerTooltip: 'Algorithm\n\nData Source: Cryptocompare',
    width: 120,
    type: ['cryptohubText'],
  },

  //
  // Hashes per second
  //
  hashesPerSecond: {
    field: 'cc-total-vol-full-NetHashesPerSecond',
    headerName: 'Hashes per/s',
    headerClass: 'CH-col',
    headerTooltip: 'Net Hashes per/s\n\nData Source: Cryptocompare',
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
  // Number of Exchanges
  //
  numberOfExchanges: {
    field: 'cryptohub-numberOfExchanges',
    headerName: 'Exchanges',
    headerClass: 'CH-col',
    headerTooltip: 'Number of Exchanges the token is listed on\n\nData Source: BinaryOverdose / Cryptocompare',
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellStyle: {
      padding: 0
    },
    cellRenderer: cellRendererExchanges,
    onCellClicked: cellOnClickExchanges,
  },

  //
  // Number of pairs
  //
  numberOfPairs: {
    field: 'cryptohub-numberOfPairs',
    headerName: 'Pairs',
    headerTooltip: 'Number of pairs\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
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
    field: 'cryptohub-numberOfFiatPairs',
    headerName: 'Fiat pairs',
    headerTooltip: 'Number of fiat pairs\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
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
    field: 'cryptohub-numberOfFiatCurrencies',
    headerName: 'Fiat Currencies',
    headerTooltip: 'Number of fiat Currencies\n\nData Source: BinaryOverdose / Cryptocompare',
    headerClass: 'CH-col',
    width: 100,
    columnGroupShow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

};

export default columnDefs;
