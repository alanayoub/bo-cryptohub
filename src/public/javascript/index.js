// Generic util functions
import timeago                     from './libs/bo-utils/time-ago.js';
import isObject                    from './libs/bo-utils/object-is-object.js';
import getRandomInt                from './libs/bo-utils/get-random-int.js';
import getNestedProperty           from './libs/bo-utils/object-get-nested-property.js';
import htmlPollElement             from './libs/bo-utils/html-poll-element.js';
import htmlToggleClass             from './libs/bo-utils/html-toggle-class.js';
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
import cellRendererCurrency        from './utils/cell-renderer-currency.js';
import cellRendererExchanges       from './utils/cell-renderer-exchanges.js';
import cellRendererTradingview     from './utils/cell-renderer-tradingview.js';

// ag-grid custom filters
import filterNumber                from './utils/filter-number.js';
import filterFloatingNumber        from './utils/filter-floating-number.js';

// ag-grid filter comparators
import sortNumbers from './utils/sort-numbers.js';

const refs = {
  oldDBValues: {},
  store: []
};

/**
 *
 * POPDIV
 *
 * Initialize a Tippy popdiv on a HTML element
 * By default the popdiv is shown on initialization via the `showOnInit` property
 *
 * @param {HTMLElement} element
 * @param {String|HTMLElement|Function} content
 * @param {Object} tippyOptions - use to overwrite the default options setup here
 *
 * @see https://atomiks.github.io/tippyjs/
 *
 */
function popDiv(element, content, tippyOptions = {}) {
  const boundary = document.querySelector('.ag-body');
  const defaultTippyOptions = {
    content,
    boundary,
    arrow: false,
    theme: 'light',
    trigger: 'click',
    allowHTML: true,
    placement: 'bottom-start',
    showOnInit: true,
    hideOnClick: 'toggle',
    interactive: true,
    interactiveBorder: 5,
    interactiveDebounce: 1,
  }
  tippy(element, Object.assign(defaultTippyOptions, tippyOptions));
}

/**
 *
 * TRADINGVIEW GET SYMBOL
 *
 * Tradingview symbols looks like:
 *
 *   Exchange:symbolFromSymbolTo
 *   ---------------------------
 *   COINBASE:BTCUSD
 *   KRAKEN:ETHBTC
 *
 * @param {Object} params - ag-grid cell params object
 * @param {STring} [symbolTo] - to symbol, defaults to BTC
 * @return {String|undefined} symbol - tradingview symbol
 *
 */
function tradingviewGetSymbol(params, symbolTo = 'BTC') {

  const get = getNestedProperty;
  const map = get(ch, 'exchange-map-idName');

  const symbolFrom = get(params, 'data.cc-coinlist-Symbol.value');
  const exchangeList1 = get(params, 'data.cryptohub-exchangesListAcceptsBoth');
  const exchangeList2 = get(params, 'data.cryptohub-exchangesListCryptoOnly');

  const exchange = map && exchangeList1.length
    ? map[exchangeList1[0]]
    : map && exchangeList2.length
      ? map[exchangeList2[0]]
      : void 0;

  if (exchange && symbolFrom && symbolTo) {
    const pair = symbolFrom.toUpperCase() + symbolTo.toUpperCase();
    const symbol = `${exchange.toUpperCase()}:${pair}`;
    return symbol;
  }
  else {
    logger.warn('Cannot construct tradingview symbol');
  }
}

/**
 *
 * LOAD TRADINGVIEW
 *
 * Load a trading view widget using ag-grid cell params as data
 *
 * @param {Object} params - ag-grid cell params object
 * @param {String} container_id - html id of where to load the widget
 * @param {STring} [symbolTo] - to symbol, defaults to BTC
 * @return {undefined}
 *
 */
function loadTradingview(params, container_id, symbolTo = 'BTC') {
  const symbol = tradingviewGetSymbol(params, symbolTo);
  if (symbol) {
    new TradingView.widget({
      symbol,
      container_id,
      autosize: true,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'Light',
      style: '1',
      locale: 'uk',
      toolbar_bg: 'rgba(255, 255, 255, 1)',
      enable_publishing: false,
      allow_symbol_change: true,
      save_image: false,
      studies: [
        'MAExp@tv-basicstudies'
      ],
    });
  }
  else {
    logger.warn('Cannot load tradingview window, missing initialization data');
  }
}

//
// TODO: Remove type property, its just confusing things
//

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
const components = {

  boolRenderer: params => {
    const value = getNestedProperty(params, 'value.value');
    return value == true ? 'True' : 'False';
  },

  checkboxRenderer: bool => {
    return `<input type='checkbox' ${bool ? 'checked' : ''} />`;
  },

  currencyCellRenderer: partialApplication(cellRendererCurrency, refs),

  compoundCellRenderer: CompoundCellRenderer,
  cellRendererSparkline: CellRendererSparkline,

  numberRenderer: params => {
    const val = params.value;
    const num = +val;
    return isNaN(num) ? void 0 : num;
  },

  numberFormattedRenderer: params => {
    const number = getNestedProperty(params, 'value.value');
    return numberGroupDigits(number) || '-';
  },

  imageRenderer: params => {
    const value = getNestedProperty(params, 'value.value');
    return `<img src="${value}" style="width: 22px; height: 22px; margin: 1px" />`;
  },

  linkRenderer: params => {
    const value = getNestedProperty(params, 'value.value');
    return `<a href=${value}" target="_blank">${value}</a>`;
  },

  nameRenderer: params => {
    const baseUrl = 'https://www.cryptocompare.com';
    let imgUrl = params.data['cc-total-vol-full-ImageUrl'];
    imgUrl = isObject(imgUrl) && imgUrl.value;
    imgUrl = `${baseUrl}${imgUrl}`;
    const val = params.value;
    const css = 'width: 22px; height: 22px; margin: 1px; margin: 1px 5px 1px 2px; vertical-align: bottom;';
    const img = `<img src="${imgUrl}" style="${css}" />${val}`;
    return imgUrl ? img : val;
  },

  twitterRenderer: params => {
    const value = getNestedProperty(params, 'value.value');
    if (!value) return '-';
    return `<a href="https://twitter.com/${value}" targer="_blank">${value}</a>`;
  }

};

//
// AG-GRID columnTypes
//
// specific column types containing properties that column definitions can inherit.
//
const columnTypes = {
  number: {
    filter: 'agNumberColumnFilter',
    cellClass: 'cryptohub-align-right',
    cellRenderer: 'numberRenderer',
  },
  numberFormatted: {
    filter: 'agNumberColumnFilter',
    cellClass: 'cryptohub-align-right',
    cellRenderer: 'numberFormattedRenderer',
  },
  textColumn: {
    filter: 'agTextColumnFilter',
  },
  usdColumn: {
    filter: 'agNumberColumnFilter',
    cellRenderer: 'currencyCellRenderer',
    cellRendererParams: {
      countdown: true,
      currency: 'USD',
    },
  },
  btcColumn: {
    filter: 'agNumberColumnFilter',
    // valueFormatter(params) {
    //   return params.value.value;
    // },
    cellRenderer: 'currencyCellRenderer',
    cellRendererParams: {
      countdown: true,
      currency: 'BTC',
    },
  },
  hiddenColumn: {
    hide: true
  },
  percentChangeColumn: {
    cellClassRules: {
      'cryptohub-text-bad': x => x.value.value < 0,
      'cryptohub-text-good': x => x.value.value > 0,
    },
    valueFormatter: valueFormatterPercentChange,
    filter: 'agNumberColumnFilter',
    cellRenderer: 'compoundCellRenderer',
    cellRendererParams: {
      countdown: true
    },
  },
  sparklinePrice: {
    cellRenderer: 'cellRendererSparkline',
    cellRendererParams: {
      range: true,
      price: true,
      volume: true,
      volumeDays: 7,
    }
  },

  //
  // New types
  //

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
    floatingFilterComponentParams:{
      suppressFilterButton:true
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
    cellRenderer: 'compoundCellRenderer',
  },

};

//
// AG-GRID columnDefs
//
// Each column in the grid is defined using a column definition.
// Columns are positioned in the grid according to the order the ColDef's are specified in the grid options
//
const columnDefs = [


  //
  // Column Group 1 (UNTITTLED)
  //
  {
    valueGetter: 'node.rowIndex',
    headerName: '#',
    headerClass: 'CH-col',
    headerTooltip: 'Row Number',
    pinned: 'left',
    lockPosition: true,
    suppressMenu: true,
    suppressFilter: true,
    cellClass: 'cryptohub-align-right',
    cellRenderer(params) {
      return `<div>${params.value}</div>`;
    },
  },
  {
    field: 'cc-total-vol-full-FullName.value',
    headerName: 'Name',
    headerClass: 'CH-col',
    headerTooltip: '',
    pinned: 'left',
    width: 150,
    cellRenderer: 'nameRenderer',
  },
  {
    field: 'cc-coinlist-Symbol.value',
    headerName: 'Symbol',
    headerClass: 'CH-col',
    headerTooltip: '',
    pinned: 'left',
    width: 90,
    type: ['textColumn'],
  },


  //
  // Column Group 2 (PRICE)
  //
  {
    field: 'cc-total-vol-full-PRICE',
    headerName: 'Price (USD)',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptocompare',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: 'currencyCellRenderer',
    cellRendererParams: {
      countdown: true,
      currency: 'USD',
    },
    onCellClicked(params) {
      const id = `ch-tippy-${getRandomInt()}`;
      console.log(id);
      const cssId = `#${id}`;
      const content = initPug['ch-tippy-click-tradingview']({id});
      const $cell = params.event.target.closest('.ag-cell');
      popDiv($cell, content);
      htmlToggleClass($cell, 'ch-cell-active');
      htmlPollElement(cssId, 100, partialApplication(loadTradingview, params, id, 'USD'));
    },
  },
  {
    field: 'cryptohub-price-btc',
    headerName: 'Price (BTC)',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptohub, calculated from Coinmarketcap data',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: partialApplication(cellRendererCurrency, refs),
    cellRendererParams: {
      countdown: true,
      currency: 'BTC',
    },
    onCellClicked(params) {
      const id = `ch-tippy-${getRandomInt()}`;
      console.log(id);
      const cssId = `#${id}`;
      const content = initPug['ch-tippy-click-tradingview']({id});
      const $cell = params.event.target.closest('.ag-cell');
      popDiv($cell, content);
      htmlToggleClass($cell, 'ch-cell-active');
      htmlPollElement(cssId, 100, partialApplication(loadTradingview, params, id));
    },
  },
  //
  // NOTE: We want percent change against BTC too!
  //
  {
    field: 'cc-total-vol-full-CHANGEPCTDAY',
    headerName: 'Δ 24h',
    headerClass: 'CH-col',
    headerTooltip: 'Percent change over 24 hours against USD\n\nData Source: Cryptocompare',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
      'cryptohubPercent'
    ],
  },
  {
    field: 'cryptohub-price-history',
    type: ['sparklinePrice'],
    headerName: '7D Trend',
    headerClass: 'CH-col',
    width: 124,
    resizable: false,
    filter: false,
  },
  {
    field: 'cc-total-vol-full-TOTALVOLUME24HTO',
    headerName: 'Volume 24h',
    headerClass: 'CH-col',
    headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD\n\nData Source: Cryptocompare',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: 'currencyCellRenderer',
    cellRendererParams: {
      countdown: true,
      currency: 'USD',
    },
    width: 150,
  },
  {
    field: 'cc-total-vol-full-MKTCAP',
    headerName: 'Market Cap',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptocompare - The price in USD multiplied by the number of coins or tokens',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: 'currencyCellRenderer',
    cellRendererParams: {
      countdown: true,
      currency: 'USD',
    },
    width: 150,
  },


  //
  // Column Group 3 (SUPPLY)
  //
  {
    field: 'cc-total-vol-full-SUPPLY',
    headerName: 'Circulating Supply',
    headerClass: 'CH-col',
    headerTooltip: 'Data Source: Cryptocompare',

    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],

    cellRenderer: 'numberFormattedRenderer',

  },

  //
  // Column Group 4 (TECHNICAL DATA)
  //
  // e.g. "PoA"
  {
    field: 'cc-total-vol-full-ProofType.value',
    headerName: 'Proof',
    headerClass: 'CH-col',
    headerTooltip: 'Proof Type',
    type: ['textColumn'],
  },
  // "Ethash"
  {
    field: 'cc-total-vol-full-Algorithm.value',
    headerName: 'Algorithm',
    headerClass: 'CH-col',
    headerTooltip: '',
    type: ['textColumn'],
  },

  //
  // Column Group 5 (FUNDAMENTALS)
  //
  {
    field: 'cc-total-vol-full-NetHashesPerSecond',
    headerName: 'Hashes per/s',
    headerClass: 'CH-col',
    headerTooltip: 'Net Hashes per/s',
    columngroupshow: 'both',
    comparator: sortNumbers,
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: 'numberFormattedRenderer',
  },
  {
    field: 'cryptohub-numberOfExchanges',
    headerName: 'Exchanges',
    headerClass: 'CH-col',
    headerTooltip: 'Number of Exchanges the token is listed on',
    columngroupshow: 'closed',

    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],

    cellStyle: {
      padding: 0
    },

    cellRenderer: cellRendererExchanges,
    onCellClicked(params) {

      /**
       *
       *
       *
       *
       */
      function exchangeDataModel() {

        // Exchange data
        // -------------------
        // CentralizationType : "Centralized"
        // Country : "United Kingdom"
        // ItemType : (2) ["Cryptocurrency", "Fiat"]
        // Url: "/exchanges/bitstamp/overview"
        // LogoUrl : "/media/34478497/bitstamp.jpg"
        // Name : "Bitstamp"
        // id : "2431"
        // name : "Bitstamp"
        // pairs : Set(18) {"XRP,EUR", "XRP,BTC", "XRP,USD", "BTC,USD", "BTC,EUR", …}
        // _cryptoCurrencies : Set(6) {"XRP", "BTC", "ETH", "BCH", "BCHABC", …}
        // _fiatCurrencies : Set(2) {"EUR", "USD"}
        // _numberOfCryptoCurrencies : 6
        // _numberOfCryptoPairs : 5
        // _numberOfCurrencies : 8
        // _numberOfFiatCurrencies : 2
        // _numberOfFiatPairs : 13
        // _numberOfPairs : 18
        // _points : 0

        const fiatIds       = params.data['cryptohub-exchangesListAcceptsBoth'] || [];
        const cryptoIds     = params.data['cryptohub-exchangesListCryptoOnly'] || [];
        const exchanges     = getNestedProperty(window.ch, 'exchanges');

        //
        // Step 1: Create the below data structure
        //
        // ```
        // {
        //   UK: {fiat: [], crypto: []},
        //   US: {fiat: [], crypto: []},
        // }
        // ```
        //
        const outputObject = {};
        {
          let id;
          let ids;
          let type;
          let country;
          let exchange;
          for ([type, ids] of Object.entries({fiat: fiatIds, crypto: cryptoIds})) {
            for (id of ids) {
              exchange = exchanges[id];
              if (!exchange) continue;
              country = exchange.Country;
              if (!outputObject[country]) {
                outputObject[country] = {
                  fiat: [],
                  crypto: []
                }
              }
              outputObject[country][type].push({
                // TODO: get exchange urls
                url: `https://www.cryptocompare.com${exchange.Url}`,
                name: exchange.Name,
                logoUrl: exchange.LogoUrl,
                dex: exchange.CentralizationType === 'Decentralized',
                numberOfFiatCurrencies: exchange._numberOfFiatCurrencies,
                numberOfCryptocurrencies: exchange._numberOfCryptoCurrencies
              });
            }
          }
        }

        //
        // Step 2: Sort the data into an Array based on the most
        // popular geographic location (as below)
        //
        // ```
        // [
        //   {
        //     country: 'UK',
        //     fiat: [{name: 'Kraken', dex: true, url, fiatPairs: 3, cryptoPairs: 4}],
        //     crypto: [{name: 'Binance', dex: false, url, cryptoPairs: 55}],
        //   }
        // ]
        // ```
        //
        const outputArray = [];
        {
          let country;
          let properties;
          for ([country, properties] of Object.entries(outputObject)) {
            outputArray.push({country, ...properties});
          }
        }

        return outputArray;

      }

      /**
       *
       *
       *
       *
       *
       */
      function exchangeHtmlContent() {

        const name          = getNestedProperty(params, 'data.cc-total-vol-full-FullName.value');
        const total         = numberGroupDigits(getNestedProperty(params, 'value.value'));
        const classes       = 'ch-numberofexchanges';
        const dexList       = params.data['cryptohub-exchangesListDex'] || [];
        const fiatIds       = params.data['cryptohub-exchangesListAcceptsBoth'] || [];
        const cryptoIds     = params.data['cryptohub-exchangesListCryptoOnly'] || [];
        const outputArray   = exchangeDataModel();
        const numberOfPairs = getNestedProperty(params, 'data.cryptohub-numberOfPairs.value');

        const output = {
          header: {
            name,
            total,
            classes,
            numberOfPairs,
            numberOfDex: dexList.length,
            numberOfFiat: fiatIds.length,
            numberOfCrypto: cryptoIds.length,
          },
          body: outputArray
        }

        const contentHtml = initPug['ch-tippy-click'](output);
        return contentHtml;

      }

      const $cell = params.event.target.closest('.ag-cell');
      const id = `ch-tippy-${getRandomInt()}`;
      const cssId = `#${id}`;
      const contentPopdiv = initPug['ch-tippy-click-tradingview']({id});
      const contentExchange = exchangeHtmlContent();

      htmlToggleClass($cell, 'ch-cell-active');
      popDiv($cell, contentPopdiv);
      document.querySelector(cssId).innerHTML = contentExchange;

    },

  },
  {
    field: 'cryptohub-numberOfPairs',
    headerName: 'Pairs',
    headerTooltip: 'Number of pairs',
    headerClass: 'CH-col',
    columngroupshow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: 'numberFormattedRenderer',
  },
  {
    field: 'cryptohub-numberOfFiatPairs',
    headerName: 'Fiat pairs',
    headerTooltip: 'Number of fiat pairs',
    headerClass: 'CH-col',
    columngroupshow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: 'numberFormattedRenderer',
  },
  {
    field: 'cryptohub-numberOfFiatCurrencies',
    headerName: 'Fiat Currencies',
    headerTooltip: 'Number of fiat Currencies',
    headerClass: 'CH-col',
    columngroupshow: 'closed',
    type: [
      'cryptohubDefaults',
      'cryptohubNumeric',
    ],
    cellRenderer: 'numberFormattedRenderer',
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
    let ids = [];
    const blacklist = [
      'cc-total-vol-full-TOTALVOLUME24HTO',
      'cc-total-vol-full-FullName.value',
      'cc-coinlist-CoinName.value',
      'cc-coinlist-Symbol.value',
      'cc-total-vol-full-MKTCAP',
      'cryptohub-price-history',
      'cryptohub-rank.value',
    ];
    const cols = agOptions.columnApi.getAllColumns();
    for (let col of cols) {
      const id = col.colId;
      if (!blacklist.includes(id)) ids.push(id);
    }
    agOptions.columnApi.autoSizeColumns(ids);

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
    filter: 'agTextColumnFilter'
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
