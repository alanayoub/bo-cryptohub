'use strict';

import { objectFlattenObject as flatten } from '../../../../../libs/bo-utils-client';

import columnLibrary                      from '../../../../../columns/';
import generateColumnDefs                 from '../../../../../ag-grid-column-defs-generate.js';

import CellInteractions                   from '../../../../../classes/class-cell-interactions.js';
import CustomLoadingOverlay               from '../../../../../classes/class-custom-loading-overlay.js';

// Cryptohub util functions
import cellTooltip                        from '../../../../../utils/cell-tooltip.js';
import shouldCellUpdate                   from '../../../../../utils/should-cell-update.js';

// ag-grid valueFormatters
import valueFormatterPercentChange        from '../../../../../utils/value-formatter-percent-change.js';

// ag-grid cell Renderer Classes
import CompoundCellRenderer               from '../../../../../utils/class-compound-cell-renderer.js';

// ag-grid custom filters
import filterBool                         from '../../../../../utils/filter-bool.js';
import filterText                         from '../../../../../utils/filter-text.js';
import filterNumber                       from '../../../../../utils/filter-number.js';
import filterFloatingNumber               from '../../../../../utils/filter-floating-number.js';

// ag-grid filter comparators
import sortText                           from '../../../../../utils/sort-text.js';
import sortNumbers                        from '../../../../../utils/sort-numbers.js';
import segment                            from '../../../../../utils/segment.js';

/**
 *
 * Generate AgOptions
 *
 */
export default function getAgOptions(state, filterModel) {

  if (!window.bo) throw new Error('window.bo does not exist');
  if (!window.refs) throw new Error('window.refs does not exist');

  const mainState = state;
  const colLib = flatten(columnLibrary);

  const options = window.bo.agOptions = {

    onGridReady(params) {

      // default sort order
      const validColumns = [
        ...Object.keys(colLib),
        ...mainState.columns.filter(v => /^c-\d{1,2}$/.test(v.id)).map(v => v.id)
      ];
      const sortId = validColumns.includes(mainState.sort.column) ? mainState.sort.column : validColumns[0];
      params.api.setSortModel([
        {
          colId: sortId,
          sort: mainState.sort.direction
        }
      ]);

      // default filters
      params.api.setFilterModel(filterModel);

      window.bo.func.updated('now');

    },

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
    components: {
      customLoadingOverlay: CustomLoadingOverlay,
    },

    loadingOverlayComponent: 'customLoadingOverlay',

    loadingOverlayComponentParams: {
      loadingMessage: 'One moment please...'
    },

    //
    // AG-GRID columnTypes
    //
    // specific column types containing properties that column definitions can inherit.
    //
    columnTypes: {

      cryptohubDefaults: {
        // NOTE: the equals property is not shown in the standard list of ag-grid options
        // https://www.ag-grid.com/javascript-grid-change-detection/
        editable: false,
        equals: shouldCellUpdate,
        suppressMenu: true,
        tooltipValueGetter: cellTooltip,
        floatingFilterComponentParams: {
          suppressMenu: true,
          suppressFilterButton: true
        },
      },

      cryptohubDate: {

        // Filter
        filter: filterNumber,

        // Floating filter
        floatingFilterComponent: filterFloatingNumber,

        // Sort
        comparator: sortNumbers,
        sortingOrder: ['desc', 'asc'],

        // Style
        cellClass: 'CH-align-right',

      },

      cryptohubNumeric: {

        // Filter
        filter: filterNumber,

        // Floating filter
        floatingFilterComponent: filterFloatingNumber,

        // Sort
        comparator: sortNumbers,
        sortingOrder: ['desc', 'asc'],

        // Style
        cellClass: 'CH-align-right',

      },

      cryptohubPercentNoFormat: {
        valueFormatter: valueFormatterPercentChange,
        // TODO the compound renderer is not what I planned it to be, revisit
        cellRenderer: CompoundCellRenderer,
      },

      cryptohubPercent: {
        cellClassRules: {
          'CH-text-bad': x => x.value && x.value.value < 0,
          'CH-text-good': x => x.value && x.value.value > 0,
        },
        valueFormatter: valueFormatterPercentChange,
        // TODO the compound renderer is not what I planned it to be, revisit
        cellRenderer: CompoundCellRenderer,
      },

      cryptohubText: {

        // Filter
        filter: filterText,

        // Floating filter
        floatingFilterComponent: filterFloatingNumber,

        // Sort
        comparator: sortText,
        sortingOrder: ['asc', 'desc'],

      },

      cryptohubBool: {

        // Filter
        filter: filterBool,

        // Floating filter
        floatingFilterComponent: filterFloatingNumber,

        // Sort
        comparator: sortText,
        sortingOrder: ['asc', 'desc'],

      },

      cryptohubHover: {},

    },

    columnDefs: generateColumnDefs(mainState, true),
    deltaColumnMode: true,

    onCellMouseOver(params) {
      window.bo.inst.cellInteractions.mouseOver(params);
    },

    onCellMouseOut(params) {
      window.bo.inst.cellInteractions.mouseOut(params);
    },

    onBodyScroll(params) {

      function isElementInElement(el1, el2, buffer = 0) {
        var el1Rect = el1.getBoundingClientRect();
        var el2Rect = el2.getBoundingClientRect();
        return (
          el1Rect.top >= (el2Rect.top + buffer) &&
          el1Rect.left >= (el2Rect.left + buffer) &&
          el1Rect.bottom <= (el2Rect.bottom + buffer) &&
          el1Rect.right <= (el2Rect.right + buffer)
        );
      }
      // TODO: make them appear again if the cell gets back into the view
      for (const cell of bo.inst.cellInteractions.openItems) {
        const viewport = document.querySelector('.ag-body-viewport');
        const isOk = isElementInElement(cell, viewport, 10);
        if (!isOk) {
          CellInteractions.setMouseOutState(cell);
          if (cell.$popDivTippy) {
            cell.$popDivTippy.destroy();
          }
          cell.dataset.chOpen = false;
          const idx = bo.inst.cellInteractions.openItems.indexOf(cell);
          if (idx >-1) {
            bo.inst.cellInteractions.openItems.splice(idx, 1);
          }
        }
      }

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
      window.bo.inst.state.set('sort', {column, direction});
      segment.columnSorted(sortModel);
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
      if (params.finished) {
        segment.columnWidthResized();
      }
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

      window.bo.inst.state.get().then(state => {

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
        const libKeysPreviousState = state.window[0].columns.map(v => v.id);
        for (const [key, column] of Object.entries(columns)) {
          if (libKeysPreviousState.includes(column.id)) {
            const old = state.window[0].columns.filter(v => v.id === column.id)[0];
            columns[key] = Object.assign({}, old, column);
          }
        }

        window.bo.inst.state.set('columns', columns);

      });

      segment.columnMoved();

    },

    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    },

    rowHeight: 32,
    headerHeight: 32,
    floatingFiltersHeight: 32,

    // Set to true to have cells flash after data changes. See Flashing Data Changes.
    enableCellChangeFlash: true,

    // Floating Filter components allow you to add your own floating filter types to ag-Grid
    floatingFilter: true,

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

  }

  return options;

}
