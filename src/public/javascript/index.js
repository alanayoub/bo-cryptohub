// Generic util functions
import timeago                     from './libs/bo-utils/time-ago.js';
import isObject                    from './libs/bo-utils/object-is-object.js';
import getNestedProperty           from './libs/bo-utils/object-get-nested-property.js';
import numberGroupDigits           from './libs/bo-utils/number-group-digits.js';
import partialApplication          from './libs/bo-utils/partial-application.js';

// Cryptohub util functions
import dataUnpack                  from './utils/data-unpack.js';
import cellTooltip                 from './utils/cell-tooltip.js';
import shouldCellUpdate            from './utils/should-cell-update.js';

// ag-grid valueFormatters
import valueFormatterBTC           from './utils/value-formatter-btc.js';
import valueFormatterPercentChange from './utils/value-formatter-percent-change.js';

// ag-grid cell Renderer Classes
import CompoundCellRenderer        from './utils/class-compound-cell-renderer.js';
import CellRendererSparkline       from './utils/class-cell-renderer-sparkline.js';

// ag-grid cell Renderers
import cellRendererName            from './utils/cell-renderer-name.js';
import cellRendererNumber          from './utils/cell-renderer-number.js';
import cellRendererCurrency        from './utils/cell-renderer-currency.js';
import cellRendererExchanges       from './utils/cell-renderer-exchanges.js';
import cellRendererTradingview     from './utils/cell-renderer-tradingview.js';

// ag-grid custom filters
import filterNumber                from './utils/filter-number.js';
import filterFloatingNumber        from './utils/filter-floating-number.js';

// ag-grid cell on click handlers
import cellOnClickExchanges        from './utils/cell-on-click-exchanges.js';
import cellOnClickTradingview      from './utils/cell-on-click-tradingview.js';

// ag-grid filter comparators
import sortNumbers from './utils/sort-numbers.js';

const refs = {
  oldDBValues: {},
  store: []
};

//
// AG-GRID Components
//
// You can create your own custom components to customise the behaviour of the grid.
// For example you can customise how cells are rendered, how values are edited and also create your own filters.
//
// The full list of component types you can provide in ag-Grid are as follows:
//
// Cell Renderer:        To customises the contents of a cell.
// Cell Editor:          To customises editing of a cell.
// Filter Component:     For custom column filter that appears inside the column menu.
// Floating Filter:      For custom column filter that appears inside the column menu.
// Date Component:       To customise the date selection component in the date filter.
// Header Component:     To customise the header of a column and column groups.
// Overlay Component:    To customise loading and no rows overlay components.
// Status Bar Component: For custom status bar components.
//
const components = {};

//
// AG-GRID columnTypes
//
// specific column types containing properties that column definitions can inherit.
//
const columnTypes = {

  cryptohubDefaults: {
    // NOTE: the equals property is not shown in the standard list of ag-grid options
    // @see: https://www.ag-grid.com/javascript-grid-change-detection/
    equals: shouldCellUpdate,
    tooltip: cellTooltip,
  },

  cryptohubNumeric: {

    // Filter
    filter: filterNumber,
    suppressMenu: true,

    // Floating filter
    floatingFilterComponent: filterFloatingNumber,
    floatingFilterComponentParams: {
      suppressMenu: true,
      suppressFilterButton: true
    },

    // Sort
    comparator: sortNumbers,

    // Style
    cellClass: 'cryptohub-align-right',

  },

  // TODO not all this stuff has to do with percent stuff
  cryptohubPercent: {
    cellClassRules: {
      'cryptohub-text-bad': x => x.value.value < 0,
      'cryptohub-text-good': x => x.value.value > 0,
    },
    valueFormatter: valueFormatterPercentChange,
    cellRenderer: CompoundCellRenderer,
  },

  cryptohubText: {
    filter: 'agTextColumnFilter',
  },

};

//
// AG-GRID columnDefs
//
// Each column in the grid is defined using a column definition.
// Columns are positioned in the grid according to the order the ColDef's are specified in the grid options
//
const columnDefs = [

  // Row Index
  {
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
      return `<div>${params.value}</div>`;
    },
  },

  // Name
  {
    field: 'cc-total-vol-full-FullName.value',
    headerName: 'Name',
    headerClass: 'CH-col',
    headerTooltip: '',
    width: 150,
    pinned: 'left',
    cellRenderer: cellRendererName,
  },

  // Symbol
  {
    field: 'cc-coinlist-Symbol.value',
    headerName: 'Symbol',
    headerClass: 'CH-col',
    headerTooltip: '',
    width: 90,
    pinned: 'left',
    type: ['cryptohubText'],
  },

  // USD Price
  {
    field: 'cc-total-vol-full-PRICE',
    headerName: 'Price (USD)',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptocompare',
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      countdown: true,
      currency: 'USD',
    },
    onCellClicked: partialApplication(cellOnClickTradingview, 'USD'),
  },

  // BTC Price
  {
    field: 'cryptohub-price-btc',
    headerName: 'Price (BTC)',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptohub, calculated from Coinmarketcap data',
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      countdown: true,
      currency: 'BTC',
    },
    onCellClicked: partialApplication(cellOnClickTradingview, 'BTC'),
  },

  // Percent Change
  // NOTE: We want percent change against BTC too!
  {
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

  // Sparkline
  {
    field: 'cryptohub-price-history',
    headerName: '7D Trend',
    headerClass: 'CH-col',
    width: 124,
    cellRenderer: CellRendererSparkline,
    cellRendererParams: {
      range: true,
      price: true,
      volume: true,
      volumeDays: 7,
    },
    resizable: false,
  },

  // Volume
  {
    field: 'cc-total-vol-full-TOTALVOLUME24HTO',
    headerName: 'Volume 24h',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Cryptocompare',
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      countdown: true,
      currency: 'USD',
    },
  },

  // Marketcap
  {
    field: 'cc-total-vol-full-MKTCAP',
    headerName: 'Market Cap',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptocompare - The price in USD multiplied by the number of coins or tokens',
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      countdown: true,
      currency: 'USD',
    },
  },

  // Circulating Supply
  {
    field: 'cc-total-vol-full-SUPPLY',
    headerName: 'Circulating Supply',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptocompare',
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],

    cellRenderer: cellRendererNumber,

  },

  // Proot type
  {
    field: 'cc-total-vol-full-ProofType.value',
    headerName: 'Proof',
    headerClass: 'CH-col',
    headerTooltip: 'Proof Type',
    width: 120,
    type: ['cryptohubText'],
  },

  // Algo
  {
    field: 'cc-total-vol-full-Algorithm.value',
    headerName: 'Algorithm',
    headerClass: 'CH-col',
    headerTooltip: '',
    width: 120,
    type: ['cryptohubText'],
  },

  // Hashes per second
  {
    field: 'cc-total-vol-full-NetHashesPerSecond',
    headerName: 'Hashes per/s',
    headerClass: 'CH-col',
    headerTooltip: 'Net Hashes per/s',
    width: 180,
    columngroupshow: 'both',
    comparator: sortNumbers,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  // Number of Exchanges
  {
    field: 'cryptohub-numberOfExchanges',
    headerName: 'Exchanges',
    headerClass: 'CH-col',
    headerTooltip: 'Number of Exchanges the token is listed on',
    width: 100,
    columngroupshow: 'closed',
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

  // Number of pairs
  {
    field: 'cryptohub-numberOfPairs',
    headerName: 'Pairs',
    headerTooltip: 'Number of pairs',
    headerClass: 'CH-col',
    width: 100,
    columngroupshow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  // Number of Fiat pairs
  {
    field: 'cryptohub-numberOfFiatPairs',
    headerName: 'Fiat pairs',
    headerTooltip: 'Number of fiat pairs',
    headerClass: 'CH-col',
    width: 100,
    columngroupshow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

  // Number of Fiat currencies
  {
    field: 'cryptohub-numberOfFiatCurrencies',
    headerName: 'Fiat Currencies',
    headerTooltip: 'Number of fiat Currencies',
    headerClass: 'CH-col',
    width: 100,
    columngroupshow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: cellRendererNumber,
  },

];

//
// AG-GRID OPTIONS
//
const agOptions = {

  components,
  columnDefs,
  columnTypes,

  onGridReady(params) {

    // autosize columns
    // let ids = [];
    // const blacklist = [
    //   'cc-total-vol-full-TOTALVOLUME24HTO',
    //   'cc-total-vol-full-FullName.value',
    //   'cc-coinlist-CoinName.value',
    //   'cc-coinlist-Symbol.value',
    //   'cc-total-vol-full-MKTCAP',
    //   'cryptohub-price-history',
    //   'cryptohub-rank.value',
    // ];
    // const cols = agOptions.columnApi.getAllColumns();
    // for (let col of cols) {
    //   const id = col.colId;
    //   if (!blacklist.includes(id)) ids.push(id);
    // }
    // agOptions.columnApi.autoSizeColumns(ids);

    // default sort order
    params.api.setSortModel([
      {colId: 'cc-total-vol-full-TOTALVOLUME24HTO', sort: 'desc'},
    ]);

    // NOTE: DO NOT CHANGE UNLESS YOU WANT TO UPDATE HOW DATA WORKS
    refs.store = dataUnpack(initData || []);
    params.api.setRowData(refs.store);

  },

  rowHeight: 35,

  // NOTE: DO NOT CHANGE UNLESS YOU WANT TO UPDATE HOW DATA WORKS
  rowData: refs.store,

  // Set to true to have cells flash after data changes. See Flashing Data Changes.
  enableCellChangeFlash: true,

  // Set to true when using Client-side Row Model to enable Row Filtering
  enableFilter: true,

  // Set to true when using Client-side Row Model to enable Row Sorting.
  // Clicking a column header will cause the grid to sort the data.
  enableSorting: true,

  // Floating Filter components allow you to add your own floating filter types to ag-Grid
  floatingFilter: true,

  // Set to true to allow column resizing by dragging the mouse at a columns headers edge.
  enableColResize: true,

  // If you turn on deltaRowDataMode, then when you call api.setRowData(rowData)
  // the grid will work out which items are to be added, removed and updated.
  // For this to work you must implement `getRowNodeId`.
  deltaRowDataMode: true,

  // Set to true to enable Row Animation.
  animateRows: false,

  // Type of Row Selection, set to either 'single' or 'multiple'.
  rowSelection: 'multiple',

  getRowNodeId: data => {
    return data['cc-total-vol-full-Id'].value;
  },

  // defaultColDef: contains column properties all columns will inherit.
  defaultColDef: {
    editable: false,
    floatingFilterComponentParams: {
      suppressMenu: true,
      suppressFilterButton: true
    },
  }

};

/**
 *
 * Updated
 * @param {Date} when
 * @return void
 *
 */
let timestamp;
const updated = function (when) {

  if (when === 'now') timestamp = new Date();
  const time = timeago(timestamp);
  document.querySelector('#updated').innerHTML = `Last Updated: ${time}`;

}

/**
 *
 * dataHandler
 *
 * @param {Object} data
 * @return void
 *
 */
const dataHandler = function (data) {

  updated('now');
  refs.store = dataUnpack(data);
  agOptions.api.setRowData(refs.store);

  refs.oldDBValues = refs.store.reduce((acc, val) => {
    const id = val['cc-total-vol-full-Id'].value;
    acc[id] = val;
    return acc;
  }, {});

}

window.ch = initStore;
if (!new agGrid.Grid(document.querySelector('#myGrid'), agOptions)) {

  throw new Error('Cant find grid');

}
else {

  updated('now');
  setInterval(updated, 1000 * 1);
  io()
    .on('data', dataHandler)
    .on('store', data => {
      window.ch.store = data;
      console.log('store event', data);
    });

}
