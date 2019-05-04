'use strict';

// Cryptohub util functions
import cellTooltip                 from './utils/cell-tooltip.js';
import shouldCellUpdate            from './utils/should-cell-update.js';

// ag-grid valueFormatters
import valueFormatterPercentChange from './utils/value-formatter-percent-change.js';

// ag-grid cell Renderer Classes
import CompoundCellRenderer        from './utils/class-compound-cell-renderer.js';

// ag-grid custom filters
import filterNumber                from './utils/filter-number.js';
import filterFloatingNumber        from './utils/filter-floating-number.js';

// ag-grid filter comparators
import sortNumbers                 from './utils/sort-numbers.js';

//
// AG-GRID BASE OPTIONS
//
// Default ag-grid options before any configuration is applied
//
export default {

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
  components: {},

  //
  // AG-GRID columnTypes
  //
  // specific column types containing properties that column definitions can inherit.
  //
  columnTypes: {

    cryptohubDefaults: {
      // NOTE: the equals property is not shown in the standard list of ag-grid options
      // https://www.ag-grid.com/javascript-grid-change-detection/
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
        'cryptohub-text-bad': x => x.value && x.value.value < 0,
        'cryptohub-text-good': x => x.value && x.value.value > 0,
      },
      valueFormatter: valueFormatterPercentChange,
      // TODO the compound renderer is not what I planned it to be, revisit
      cellRenderer: CompoundCellRenderer,
    },

    cryptohubText: {
      filter: 'agTextColumnFilter',
    },

  },

  columnDefs: [],

  onCellMouseOver(params) {
    const field = params.colDef.field;
    let action = null;
    if (field === 'cc-total-vol-full-PRICE') {
      action = 'tradingview'
    }
    window.bo.inst.cellInteractions.mouseOver(params, action);
  },

  onCellMouseOut(params) {
    window.bo.inst.cellInteractions.mouseOut(params);
  },

  onVirtualColumnsChanged(params) {
    console.log(params);
  },

  onVirtualRowRemoved(params) {
    console.log(params);
  },

  rowHeight: 35,

  // NOTE: DO NOT CHANGE UNLESS YOU WANT TO UPDATE HOW DATA WORKS
  rowData: window.refs.rowData,

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
