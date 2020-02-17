'use strict';

import { Grid } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import cellRendererExchangesName from './cell-renderer-exchanges-name.js';
import Gadget from '../../bo/common/gadgets/gadget';
import initPug from '../../generated/init-pug.generated.js';
import sortText from '../../utils/sort-text.js';
import { numberGroupDigits } from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import { getRandomInt } from '../../libs/bo-utils-client';

import style from './index.scss';

/**
 *
 * Build AG-GRID Options
 *
 */
function agGridOptions(data) {

  const rowData = [];

  const dex = gnp(data, 'cryptohub-exchangesListDex.value') || [];
  const both = gnp(data, 'cryptohub-exchangesListAcceptsBoth.value') || [];
  const crypto = gnp(data, 'cryptohub-exchangesListCryptoOnly.value') || [];
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
    headerHeight: 32,
    floatingFiltersHeight: 32,
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

export default class Exchanges extends Gadget {

  constructor({componentState}) {

    super({componentState})

    const containerId = `ch-gadget-${getRandomInt(100000, 999999)}`;
    const name          = gnp(this.data, 'cc-total-vol-full-FullName.value');
    const dexList       = gnp(this.data, 'cryptohub-exchangesListDex.value') || [];
    const fiatIds       = gnp(this.data, 'cryptohub-exchangesListAcceptsBoth.value') || [];
    const cryptoIds     = gnp(this.data, 'cryptohub-exchangesListCryptoOnly.value') || [];
    const numberOfPairs = gnp(this.data, 'cryptohub-numberOfPairs.value');
    const total         = numberGroupDigits(gnp(this.data, 'cryptohub-numberOfExchanges.value'));
    const classes = 'ch-numberofexchanges';
    const context = {
      header: {
        name,
        total,
        classes,
        numberOfPairs,
        numberOfDex: dexList.length,
        numberOfFiat: fiatIds.length,
        numberOfCrypto: cryptoIds.length,
      },
      containerId
    }
    const contentHtml = initPug['popdiv-exchanges'](context);

    document.querySelector(this.selector).innerHTML = contentHtml;

    const gridOptions = agGridOptions(this.data);
    const gridElement = document.querySelector(`#${containerId}`);
    new Grid(gridElement, gridOptions, {modules: AllCommunityModules});

    return this;

  }

}
