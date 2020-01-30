'use strict';

// Binary Overdose Projects
import { getRandomInt }                   from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import cellRendererUrl                    from '../../utils/cell-renderer-url.js';
import cellRendererWalletName             from '../../utils/cell-renderer-wallet-name.js';

// Cryptohub
import popDiv  from '../../utils/popdiv.js';
import initPug from '../../generated/init-pug.generated.js';
import sortText from '../../utils/sort-text.js';

import style from './index.scss';

/**
 *
 * Generate PopDiv HTML with AG-GRID container
 *
 */
function html(params, gridId) {
  const name = gnp(params, 'data.cc-total-vol-full-FullName.value');
  const walletIds = gnp(params, 'data.cryptohub-wallets.value') || [];
  const total = walletIds.length;
  const output = {
    name,
    total,
    gridId,
  }
  const contentHtml = initPug['popdiv-wallets'](output);
  return contentHtml;
}

/**
 *
 * Build AG-GRID Options
 *
 */
function agGridOptions(params) {

  // Row Data
  const rowData = [];
  const walletIds = gnp(params, 'data.cryptohub-wallets.value') || [];
  for (const id of walletIds) {
    rowData.push(ch.wallets[id]);
  }

  // Column Defs
  const columnDefs = [
    {
      headerName: "SortOrder",
      headerClass: 'CH-col',
      field: "cc-SortOrder",
      hide: true,
      sort: 'desc'
    },
    {
      headerName: "Name",
      headerClass: 'CH-col',
      field: "cc-Name",
      pinned: 'left',
      cellRenderer: cellRendererWalletName,
      width: 160,
      type: [
        'cryptohubDefaults',
        'cryptohubText',
      ],
    },
    {
      headerName: "Type",
      headerClass: 'CH-col',
      field: "cc-ValidationType",
      width: 100,
    },
    {
      headerName: "Security",
      headerClass: 'CH-col',
      field: "cc-Security",
      width: 120,
    },
    {
      headerName: "Anonymity",
      headerClass: 'CH-col',
      field: "cc-Anonymity",
      width: 100,
    },
    {
      headerName: "EaseOfUse",
      headerClass: 'CH-col',
      field: "cc-EaseOfUse",
      width: 100,
    },
    {
      headerName: "Attched Card",
      headerClass: 'CH-col',
      field: "cc-HasAttchedCard",
      width: 100,
    },
    {
      headerName: "Trading Facilities",
      headerClass: 'CH-col',
      field: "cc-HasTradingFacilities",
      width: 100,
    },
    {
      headerName: "Vouchers & Offers",
      headerClass: 'CH-col',
      field: "cc-HasVouchersAndOffers",
      width: 100,
    },
    {
      headerName: "Source Code",
      headerClass: 'CH-col',
      field: "cc-SourceCodeUrl",
      width: 100,
      cellRenderer: cellRendererUrl,
    },
    {
      headerName: "Other Coins",
      headerClass: 'CH-col',
      field: "cc-MoreCoins",
      width: 100,
    }
  ];

  // Options
  const options = {
    rowData: rowData,
    columnDefs: columnDefs,
    rowHeight: 28,
    enableFilter: true,
    enableSorting: true,
    floatingFilter: true,
    enableColResize: true,
    animateRows: false,
    columnTypes: {
      cryptohubText: {
        suppressMenu: true,
        floatingFilterComponentParams: {
          suppressMenu: true,
          suppressFilterButton: true
        },
        comparator: sortText,
        sortingOrder: ['asc', 'desc'],
      },
    },
    defaultColDef: {
      sortable: true,
      editable: false,
      suppressMenu: true,
      floatingFilterComponentParams: {
        suppressMenu: true,
        suppressFilterButton: true
      },
    }
  }

  return options;

}

/**
 *
 * Build PopDiv with Wallet data in an AG-Grid
 *
 */
export default function popdivWallets(params) {

  const rand = getRandomInt();
  const id = `ch-tippy-${rand}`;
  const gridId = `grid-${rand}`;

  // Create popdiv
  const $cell = params.event.target.closest('.ag-cell');
  const contentPopdiv = initPug['ch-tippy-popdiv']({id});
  popDiv($cell, contentPopdiv);

  // Populate html content
  const cssId = `#${id}`;
  const content = html(params, gridId);
  document.querySelector(cssId).innerHTML = content;

  // Load Grid
  const gridOptions = agGridOptions(params);
  const gridElement = document.querySelector(`#${gridId}`);
  new window.Grid(gridElement, gridOptions);

}
