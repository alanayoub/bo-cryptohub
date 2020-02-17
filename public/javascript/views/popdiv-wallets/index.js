'use strict';

import columnLibrary from '../../columns';
import { Grid } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

// Binary Overdose Projects
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import { objectFlattenObject as flatten } from '../../libs/bo-utils-client';
import cellRendererUrl from '../../utils/cell-renderer-url.js';
import cellRendererWalletName from '../../utils/cell-renderer-wallet-name.js';
import { getRandomInt } from '../../libs/bo-utils-client';

// Cryptohub
import initPug from '../../generated/init-pug.generated.js';
import sortText from '../../utils/sort-text.js';

import style from './index.scss';

/**
 *
 * Build AG-GRID Options
 *
 */
function agGridOptions(walletIds) {

  // Row Data
  const rowData = [];
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
    rowHeight: 32,
    headerHeight: 26,
    floatingFiltersHeight: 20,
    rowData: rowData,
    columnDefs: columnDefs,
    floatingFilter: true,
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
      resizable: true,
      sortable: true,
      filter: true,
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
export default class wallets {

  constructor({componentState}) {
    const { id, assetId, colId } = componentState;
    this.selector = `#gadget-container-${id}`;
    if (!colId) return;

    const data = refs.rowData.find(v => v.id === assetId);
    const colLib = flatten(columnLibrary);

    const containerId = `ch-wallets-${getRandomInt(100000, 999999)}`;

    const name = gnp(data, 'cc-total-vol-full-FullName.value');
    const walletIds = gnp(data, 'cryptohub-wallets.value') || [];
    const total = walletIds.length;
    const output = {
      name,
      total,
      containerId
    }
    const contentHtml = initPug['popdiv-wallets'](output);
    document.querySelector(this.selector).innerHTML = contentHtml;

    const gridOptions = agGridOptions(walletIds);
    const gridElement = document.querySelector(`#${containerId}`);
    new Grid(gridElement, gridOptions, {modules: AllCommunityModules});

    return this;

  }

  alive() {
    return !!document.querySelector(this.selector);
  }

}
