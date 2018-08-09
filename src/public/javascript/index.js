import { shortToFull } from '/javascript/utils/map-db-fields.js';

const socket = io();
let grid;
let rowData;
// let columnDefs;








let gridOptions = {
  enableFilter: true,
  enableSorting: true,
  deltaRowDataMode: true,
  enableFilter: true,
  floatingFilter: true,
  components: {
    currencyCellRenderer: function (params) {
      const usdFormatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
      });
      return usdFormatter.format(params.value);
    }
  },
  defaultColDef: {
    editable: false,
    filter: 'agTextColumnFilter'
    // filter: 'agNumberColumnFilter'
  },
  columnDefs: [

    // { headerName: '_id'             , field: '_id'                                                     },
    // { headerName: 'MARKET'          , field: 'M'          , type: 'numericColumn'                      },
    // { headerName: 'TOSYMBOL'        , field: 'TS'         , type: 'numericColumn'                      },
    // { headerName: 'LASTTRADEID'     , field: 'LTID'                                                   , headerTooltip: 'Fucking nora' },
    // { headerName: 'Last Volume'      , field: 'LV'         , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'Volume'       , field: 'V'          , type: 'numericColumn'                     , headerTooltip: 'Volume Today' },
    // { headerName: 'CHANGE24HOUR'    , field: 'C24H'       , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'CHANGEDAY'       , field: 'CD'         , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'CHANGEPCTDAY'    , field: 'CPD'        , type: 'numericColumn'                     , headerTooltip: 'Fucking nora' },
    // { headerName: 'Symbol ID'          , field: 'SID'        , type: 'numericColumn'                     , filter: 'agNumberColumnFilter'            , headerTooltip: 'Fucking nora' },
    {
      headerName: 'Symbol',
      field: 'FS',
      headerTooltip: 'Symbol'
    },
    // {
    //   headerName: 'TYPE',
    //   field: 'T',
    //   type: 'numericColumn'
    // },
    // {
    //   headerName: 'FLAGS',
    //   field: 'F',
    //   type: 'numericColumn'
    // },
    {
      headerName:    'Price (USD)',
      field:         'P',
      type:          'numericColumn',
      filter:        'agNumberColumnFilter',
      headerTooltip: 'Price (USD)',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName:    'Market Cap (USD)',
      field:         'MC',
      type:          'numericColumn',
      filter:        'agNumberColumnFilter',
      headerTooltip: 'The price in USD multiplied by the number of coins or tokens',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName: 'Total Volume 24h (USD)',
      field: 'TV24HT',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in USD',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName: 'Total Volume 24h (TOKEN)',
      field: 'TV24H',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'The amount the coin has been traded in 24 hours against ALL its trading pairs displayed in terms of the coin in question',
    },
    {
      headerName: 'Circulating Supply',
      field: 'S',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Circulating Supply',
    },
    // {
    //   headerName: 'VOLUME24HOUR',
    //   field: 'V24H',
    //   type: 'numericColumn',
    //   headerTooltip: '24 Hour volume traded against USD displayed in terms of the coin in question'
    // },
    // {
    //   headerName: 'Volume 24H (USD)',
    //   field: 'V24HT',
    //   type: 'numericColumn',
    //   filter: 'agNumberColumnFilter',
    //   headerTooltip: '24 Hour Volume traded against USD displayed in USD',
    //   cellRenderer:  'currencyCellRenderer',
    // },

  // _id:    '_id',
  // T:      'TYPE',
  // F:      'FLAGS',
  // M:      'MARKET',
  // TS:     'TOSYMBOL',
  // SID:    'SYMBOLID',
  // FS:     'FROMSYMBOL',
  // P:      'PRICE',
  // LU:     'LASTUPDATE',
  // LV:     'LASTVOLUME',
  // LVT:    'LASTVOLUMETO',
  // LTID:   'LASTTRADEID',
  // V:      'VOLUMEDAY',
  // VT:     'VOLUMEDAYTO',
  // V24H:   'VOLUME24HOUR',
  // V24HT:  'VOLUME24HOURTO',
  // O:      'OPENDAY',
  // H:      'HIGHDAY',
  // L:      'LOWDAY',
  // O24H:   'OPEN24HOUR',
  // H24H:   'HIGH24HOUR',
  // L24H:   'LOW24HOUR',
  // LM:     'LASTMARKET',
  // C24H:   'CHANGE24HOUR',
  // CP24H:  'CHANGEPCT24HOUR',
  // CD:     'CHANGEDAY',
  // CPD:    'CHANGEPCTDAY',
  // S:      'SUPPLY',
  // MC:     'MKTCAP',
  // TV24H:  'TOTALVOLUME24H',
  // TV24HT: 'TOTALVOLUME24HTO',

    {
      headerName: 'Open (Day, USD)',
      field: 'O',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Open - Day - USD',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName: 'High (Day, USD)',
      field: 'H',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'High so far today (USD)',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName: 'Low (Day, USD)',
      field: 'L',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Low so far today (USD)',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName: 'Last Update',
      field: 'LU',
      type: ['dateColumn', 'nonEditableColumn'],
      filter: 'agDateColumnFilter',
      headerTooltip: 'Last Update Time',
    },
    {
      headerName: 'Last Volume (USD)',
      field: 'LVT',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Volume of last trade (USD)',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName: 'Volume (USD)',
      field: 'VT',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Todays Volume so far in USD',
      cellRenderer:  'currencyCellRenderer',
    },
    {
      headerName: 'Open 24H',
      field: 'O24H',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Open price last 24 hours'
    },
    {
      headerName: 'High 24h',
      field: 'H24H',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'High price last 24 hours'
    },
    {
      headerName: 'Low 24h',
      field: 'L24H',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Low price last 24 hours'
    },
    {
      headerName: '24 Hour Change %',
      field: 'CP24H',
      type: 'numericColumn',
      filter: 'agNumberColumnFilter',
      headerTooltip: 'Percent change in the last 24 hours'
    },
    {
      headerName: 'Last Market',
      field: 'LM',
      filter: 'agTextColumnFilter',
      headerTooltip: 'Last transaction exchange'
    },
  ],
  rowData: [],
};













const eGridDiv = document.querySelector('#myGrid');

socket.on('data', data => {

  rowData = [];
  for (let [id, obj] of Object.entries(data.D[0])) {
    // if (!columnDefs) {
    //   columnDefs = [];
    //   const cols = Object.keys(obj);
    //   for (let [s, f] of Object.entries(shortToFull)) {
    //     // if (f === '_id') f = 'id';
    //     if (cols.includes(s)) {
    //       columnDefs.push({
    //         headerName: f, field: s
    //       });
    //     }
    //   }

    // }
    obj.id = obj._id;
    rowData.push(obj);
  }
  debugger;

  //
  // TODO: Check if the columns change and update if nessisary
  //
  if (!grid) {
    gridOptions.rowData = rowData;
    // gridOptions = {
    //   columnDefs: columnDefs,
    //   rowData: rowData
    // };
    grid = new agGrid.Grid(eGridDiv, gridOptions);
  }
  else {
    gridOptions.api.setRowData(rowData);
  }

});
