'use strict';

// Cryptohub util functions
import cellTooltip                    from './utils/cell-tooltip.js';
import shouldCellUpdate               from './utils/should-cell-update.js';
import convertWorkingDataToRowData    from './utils/convert-working-data-to-row-data.js';

// ag-grid valueFormatters
import valueFormatterBTC              from './utils/value-formatter-btc.js';
import valueFormatterPercentChange    from './utils/value-formatter-percent-change.js';

// ag-grid cell Renderer Classes
import CompoundCellRenderer           from './utils/class-compound-cell-renderer.js';
import CellRendererSparkline          from './utils/class-cell-renderer-sparkline.js';

// ag-grid cell Renderers
import cellRendererName               from './utils/cell-renderer-name.js';
import cellRendererNumber             from './utils/cell-renderer-number.js';
import cellRendererCurrency           from './utils/cell-renderer-currency.js';
import cellRendererExchanges          from './utils/cell-renderer-exchanges.js';
import cellRendererTradingview        from './utils/cell-renderer-tradingview.js';

// ag-grid custom filters
import filterNumber                   from './utils/filter-number.js';
import filterFloatingNumber           from './utils/filter-floating-number.js';

// ag-grid cell on click handlers
import cellOnClickExchanges           from './utils/cell-on-click-exchanges.js';
import cellOnClickTradingview         from './utils/cell-on-click-tradingview.js';

// ag-grid filter comparators
import sortNumbers from './utils/sort-numbers.js';

const DataTable = window.DataTable.default;
const { objectIsObject: isObject } = bo;

/**
 *
 * @param {Object} data
 * @return {Object}
 *
 */
function updateOverview(data) {

  if (!isObject(data)) return false;

  let key;
  let val;
  let up = 0;
  let dn = 0;
  let nc = 0;
  for (key of Object.keys(data)) {
    if (!data[key]) continue;
    val = data[key]['cc-total-vol-full-CHANGEPCTDAY'];
    if (val > 0) up++;
    else if (val < 0) dn++;
    else nc++;
  }

  const total = up + dn + nc;
  const upPer = Math.floor(up / (total / 100));
  const dnPer = Math.floor(dn / (total / 100));
  const ncPer = Math.floor(nc / (total / 100));
  document.querySelector('.ch-direction .ch-up .ch-val').innerHTML = `${upPer}%`;
  document.querySelector('.ch-direction .ch-dn .ch-val').innerHTML = `${dnPer}%`;
  document.querySelector('.ch-direction .ch-nc .ch-val').innerHTML = `${ncPer}%`;
  document.querySelector('.ch-direction .ch-total .ch-val').innerHTML = `${total}`;

}

const refs = {
  // the last version of the unpacked data
  oldDBValues: {},
  // the last version of the packed data
  store: [],

  rowData: [],
  emitData: []

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

  cryptohubPercent: {
    cellClassRules: {
      'cryptohub-text-bad': x => x.value.value < 0,
      'cryptohub-text-good': x => x.value.value > 0,
    },
    valueFormatter: valueFormatterPercentChange,
    // TODO the compound renderer is not what I planned it to be, revisit
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
    headerTooltip: 'Name',
    width: 150,
    pinned: 'left',
    cellRenderer: cellRendererName,
  },

  // Symbol
  {
    field: 'cc-coinlist-Symbol.value',
    headerName: 'Symbol',
    headerClass: 'CH-col',
    headerTooltip: 'Symbol',
    width: 90,
    pinned: 'left',
    type: ['cryptohubText'],
  },

  // USD Price
  {
    field: 'cc-total-vol-full-PRICE',
    headerName: 'Price (USD)',
    headerClass: 'CH-col',
    headerTooltip: 'Price in USD\n\nData Source: Cryptocompare',
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: bo.partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      currency: 'USD',
    },
    onCellClicked: bo.partialApplication(cellOnClickTradingview, 'USD'),
  },

  // BTC Price
  {
    field: 'cryptohub-price-btc',
    headerName: 'Price (BTC)',
    headerClass: 'CH-col',
    headerTooltip: 'Price in BTC\n\nData Source: BinaryOverdose, calculated from Cryptocompare data',
    width: 120,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: bo.partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      currency: 'BTC',
    },
    onCellClicked: bo.partialApplication(cellOnClickTradingview, 'BTC'),
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
    cellRenderer: bo.partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      currency: 'USD',
    },
  },

  // Marketcap
  {
    field: 'cc-total-vol-full-MKTCAP',
    headerName: 'Market Cap',
    headerClass: 'CH-col',
    headerTooltip: 'The price in USD multiplied by the number of coins or tokens\n\nData Source: Cryptocompare',
    width: 150,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: bo.partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      currency: 'USD',
    },
  },

  // Circulating Supply
  {
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

  // Proot type
  {
    field: 'cc-total-vol-full-ProofType.value',
    headerName: 'Proof',
    headerClass: 'CH-col',
    headerTooltip: 'Proof Type\n\nData Source: Cryptocompare',
    width: 120,
    type: ['cryptohubText'],
  },

  // Algo
  {
    field: 'cc-total-vol-full-Algorithm.value',
    headerName: 'Algorithm',
    headerClass: 'CH-col',
    headerTooltip: 'Algorithm\n\nData Source: Cryptocompare',
    width: 120,
    type: ['cryptohubText'],
  },

  // Hashes per second
  {
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

  // Number of Exchanges
  {
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

  // Number of pairs
  {
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

  // Number of Fiat pairs
  {
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

  // Number of Fiat currencies
  {
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
    refs.workingData = initOldData;
    refs.rowData = convertWorkingDataToRowData(initOldData || []);
    params.api.setRowData(refs.rowData);

    // Do an update straight away
    // Two sets of data are used to bootstrap, the latest and an old set
    updated('now');

    refs.oldDBValues = JSON.parse(JSON.stringify(refs.workingData));
    refs.workingData = Object.assign({}, refs.oldDBValues, initData);
    refs.rowData = convertWorkingDataToRowData(refs.workingData);

    params.api.setRowData(refs.rowData);

    updateOverview(refs.workingData);

  },

  rowHeight: 35,

  // NOTE: DO NOT CHANGE UNLESS YOU WANT TO UPDATE HOW DATA WORKS
  rowData: refs.rowData,

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
    resizable: true,
    floatingFilterComponentParams: {
      suppressMenu: true,
      suppressFilterButton: true
    },
  }

};

window.ch = initStore;

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
  const time = bo.timeAgo(timestamp);
  document.querySelector('#updated').innerHTML = `Last Updated: ${time}`;

}

window.ch = initStore;
if (!new agGrid.Grid(document.querySelector('#myGrid'), agOptions)) {

  throw new Error('Cant find grid');

}
else {

  /**
   *
   *
   *
   */
  function arrayToObject(data, keyField) {
    let id;
    let val;
    const obj = {};
    for (val of data) {
      id = val[keyField].value;
      obj[id] = val;
    }
    return obj;
  }

  /**
   *
   *
   *
   */
  function objectToArray(data) {
    let val;
    const arr = [];
    for (val of Object.values(data)) {
      arr.push(val);
    }
    return arr;
  }

  /**
   *
   * Merge each object in the dataset with the new data
   * Only merges one level deep, each key gets its properties merged
   *
   * @param {Array} oldData - old ag-grid row data
   * @param {Array} newData - new ag-grid row data
   * @param {String} idField
   * @return {Array}
   *
   */
  function mergeData(oldData = [], newData = [], idField) {

    oldData = arrayToObject(oldData, idField);
    newData = arrayToObject(newData, idField);

    let key;
    let output = {};
    const allKeys = Array.from(new Set([
      ...Object.keys(oldData),
      ...Object.keys(newData)
    ]));

    for (key of allKeys) {
      output[key] = newData[key]
        ? Object.assign({}, oldData[key], newData[key])
        : oldData[key];
    }

    output = objectToArray(output);
    return output;
  }

  updated('now');
  setInterval(updated, 1000 * 1);
  io()
    .on('data', data => {

      updated('now');

      refs.oldDBValues = JSON.parse(JSON.stringify(refs.workingData));

      const newSocketData = JSON.parse(data);

      DataTable.changesets.applyChanges(refs.workingData, newSocketData);

      refs.rowData = convertWorkingDataToRowData(refs.workingData);
      agOptions.api.setRowData(refs.rowData);

      updateOverview(refs.workingData);

    })
    .on('store', data => {

      updated('now');

      const newSocketData = JSON.parse(data);
      DataTable.changesets.applyChanges(window.ch, newSocketData);

    });

}
