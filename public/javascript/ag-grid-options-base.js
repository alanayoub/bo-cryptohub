'use strict';

// Binary Overdose Projects
import { objectFlattenObject as flatten } from './libs/bo-utils-client';

// ag-grid config
import columnLibrary                      from './columns/';

// Cryptohub util functions
import cellTooltip                        from './utils/cell-tooltip.js';
import shouldCellUpdate                   from './utils/should-cell-update.js';

// ag-grid valueFormatters
import valueFormatterPercentChange        from './utils/value-formatter-percent-change.js';

// ag-grid cell Renderer Classes
import CompoundCellRenderer               from './utils/class-compound-cell-renderer.js';

// ag-grid custom filters
import filterText                         from './utils/filter-text.js';
import filterNumber                       from './utils/filter-number.js';
import filterFloatingNumber               from './utils/filter-floating-number.js';

// ag-grid filter comparators
import sortNumbers                        from './utils/sort-numbers.js';

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
      sortingOrder: ['asc','desc'],

      // Style
      cellClass: 'cryptohub-align-right',

    },

    cryptohubPercentNoFormat: {
      valueFormatter: valueFormatterPercentChange,
      // TODO the compound renderer is not what I planned it to be, revisit
      cellRenderer: CompoundCellRenderer,
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

      // Filter
      filter: filterText,
      suppressMenu: true,

      // Floating filter
      floatingFilterComponent: filterFloatingNumber,
      floatingFilterComponentParams: {
        suppressMenu: true,
        suppressFilterButton: true
      },

    },

    cryptohubHover: {},

  },

  columnDefs: [],

  onCellMouseOver(params) {
    window.bo.inst.cellInteractions.mouseOver(params);
  },

  onCellMouseOut(params) {
    window.bo.inst.cellInteractions.mouseOut(params);
  },

  /**
   *
   * When cell HTML elements are removed from the DOM
   * - We need to remove all components attached to the elements. e.g. tippys
   *
   * TODO: manage url state
   *
   */
  onVirtualColumnsChanged(params) {
    const api = params.columnApi;
    const visibleColumns = api.getAllDisplayedVirtualColumns().map(v => v['colId']);
    const opts = window.bo.opts;
    for (let field of Object.keys(opts.openCells)) {
      if (!visibleColumns.includes(field)) {
        for (let obj of opts.openCells[field]) {
          const row = Object.keys(obj)[0];
          const $cell = obj[row];
          window.bo.clas.CellInteractions.close({$cell, row, field});
        }
      }
    }
  },

  /**
   *
   *
   * When cell HTML elements are removed from the DOM
   * - We need to remove all components attached to the elements. e.g. tippys
   *
   * TODO: manage url state
   *
   */
  onVirtualRowRemoved(params) {
    if (params.type === 'virtualRowRemoved') {

      window.bo.inst.cellInteractions.mouseOut(params);

      const removedRowIndex = params.rowIndex;
      const openCells = window.bo.opts.openCells;
      for (let [column, valueArray] of Object.entries(openCells)) {
        const rows = valueArray.map(v => +Object.keys(v)[0]);
        if (rows.includes(removedRowIndex)) {

          // Close popdivs
          for (let [field, cells] of Object.entries(openCells)) {
            for (let cell of cells) {
              const row = Object.keys(cell)[0];
              const $cell = cell[row];
              window.bo.clas.CellInteractions.close({$cell, row, field});
            }
          }

        }
      }
    }
  },

  /**
   *
   * On Sort Changed
   * Set BO state
   *
   */
  onSortChanged(params) {
    const sortModel = params.api.getSortModel()[0];
    if (!sortModel) return;
    const { colId:column, sort:direction } = sortModel;
    bo.inst.state.set('sort', {column, direction});
  },

  /**
   *
   *
   *
   */
  onFilterChanged(params) {
    // NOTE: This gets set in the floating filter
  },

  /**
   *
   *
   */
  onColumnResized(params) {
    // console.log('onColumnResized', params);
  },

  /**
   *
   * When a column has stopped being draged
   * Set the BO state
   *
   * NOTE: This could be a reorder or width change
   *
   */
  onDragStopped(params) {

    bo.inst.state.get().then(state => {

      const columns = [];

      // Generate brand new column states
      const colLib = flatten(columnLibrary);
      const libKeysWhitelist = Object.keys(colLib);
      const agGridColumnState = params.api.columnController.getColumnState();
      for (const [idx, field] of Object.entries(agGridColumnState)) {
         if (libKeysWhitelist.includes(field.colId) || /^c-\d{1,2}$/.test(field.colId)) {
           const col = {
             id: field.colId
           };
           if (field.width) col.width = field.width;
           columns.push(col);
         }
      }

      // Merge with previous states
      const libKeysPreviousState = state.columns.map(v => v.id);
      for (const [key, column] of Object.entries(columns)) {
        if (libKeysPreviousState.includes(column.id)) {
          const old = state.columns.filter(v => v.id === column.id)[0];
          columns[key] = Object.assign({}, old, column);
        }
      }

      bo.inst.state.set('columns', columns);

    })

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
    return data.id;
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
