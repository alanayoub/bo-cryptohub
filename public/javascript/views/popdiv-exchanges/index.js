'use strict';

import { Grid } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/all-modules';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import cellRendererExchangesName from './cell-renderer-exchanges-name.js';

import popDiv from '../../utils/popdiv.js';
import initPug from '../../generated/init-pug.generated.js';
import sortText from '../../utils/sort-text.js';
import { getRandomInt } from '../../libs/bo-utils-client';
import { numberGroupDigits } from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

import style from './index.scss';

/**
 *
 * Generate PopDiv HTML with AG-GRID container
 *
 */
function html(params, gridId) {

  const name          = gnp(params, 'data.cc-total-vol-full-FullName.value');
  const total         = numberGroupDigits(gnp(params, 'data.cryptohub-numberOfExchanges.value'));
  const classes       = 'ch-numberofexchanges';
  const dexList       = gnp(params, 'data.cryptohub-exchangesListDex.value') || [];
  const fiatIds       = gnp(params, 'data.cryptohub-exchangesListAcceptsBoth.value') || [];
  const cryptoIds     = gnp(params, 'data.cryptohub-exchangesListCryptoOnly.value') || [];
  // const outputArray   = exchangeDataModel();
  const numberOfPairs = gnp(params, 'data.cryptohub-numberOfPairs.value');

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
    // body: outputArray,
    gridId
  }

  const contentHtml = initPug['popdiv-exchanges'](output);
  return contentHtml;

}

/**
 *
 * Build AG-GRID Options
 *
 */
function agGridOptions(params) {

  const rowData = [];

  const dex = gnp(params, 'data.cryptohub-exchangesListDex.value') || [];
  const both = gnp(params, 'data.cryptohub-exchangesListAcceptsBoth.value') || [];
  const crypto = gnp(params, 'data.cryptohub-exchangesListCryptoOnly.value') || [];
  const exchangeIds = Array.from(new Set([
    ...dex, ...both, ...crypto
  ]));

  for (const id of exchangeIds) {
    rowData.push(ch.exchanges[id]);
  }

  // Column Defs
  const columnDefs = [
    {
      headerName: "SortOrder",
      headerClass: 'CH-col-nested',
      field: "cc-SortOrder",
      hide: true,
      sort: 'desc'
    },
    {
      headerName: "Name",
      headerClass: 'CH-col',
      field: "cc-Name",
      pinned: 'left',
      cellRenderer: cellRendererExchangesName,
      width: 160,
      type: [
        'cryptohubDefaults',
        'cryptohubText',
      ],
    },
    {
      headerName: "Country",
      headerClass: 'CH-col',
      field: "cc-Country",
      width: 100,
    },
    {
      headerName: "Centralization",
      headerClass: 'CH-col',
      field: "cc-CentralizationType",
      width: 110,
    },
    {
      headerName: "Points",
      headerClass: 'CH-col',
      field: "cc-GradePoints",
      width: 100,
    },
    {
      headerName: "Grade",
      headerClass: 'CH-col',
      field: "cc-Grade",
      width: 100,
    },
    {
      headerName: "Item Type",
      headerClass: 'CH-col',
      field: "cc-ItemType",
      width: 100,
    },
    {
      headerName: "Order Book",
      headerClass: 'CH-col',
      field: "cc-OrderBook",
      width: 100,
    },
    {
      headerName: "Cryptocurrencies",
      headerClass: 'CH-col',
      field: "cryptohub-cryptoCurrencies",
      width: 100,
    },
    {
      headerName: "# of Cryptocurrencies",
      headerClass: 'CH-col',
      field: "cryptohub-numberOfCryptoCurrencies",
      width: 100,
    },
    {
      headerName: "Fiat Currencies",
      headerClass: 'CH-col',
      field: "cryptohub-fiatCurrencies",
      width: 100,
    },
    {
      headerName: "# of Fiat",
      headerClass: 'CH-col',
      field: "cryptohub-numberOfFiatCurrencies",
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
 *
 *
 *
 */
export default function cellOnClickExchanges(params) {

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
  new Grid(gridElement, gridOptions, {modules: AllCommunityModules});

}
