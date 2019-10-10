import { partialApplication } from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';
import cellRendererNumber from '../utils/cell-renderer-number.js';
import cellRendererDate from '../utils/cell-renderer-date.js';
import cellRendererCurrency from '../utils/cell-renderer-currency.js';

const array = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
    'cryptohubText'
  ],
  valueFormatter(params) {
    const value = gnp(params, 'value.value');
    if (value) {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed.join(', ');
      }
    }
    return ch.emptyCellValue;
  }
};

const currency = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 100,
  type: [
    'cryptohubDefaults',
    'cryptohubNumeric',
  ],
  cellRenderer: partialApplication(cellRendererCurrency, window.refs),
  cellRendererParams: {
    currency: 'USD',
  },
};

const date = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
    'cryptohubDate',
  ],
  cellRenderer: cellRendererDate,
};

const number = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
    'cryptohubNumeric',
  ],
  cellRenderer: cellRendererNumber,
};

const percent = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 100,
  type: [
    'cryptohubDefaults',
    'cryptohubNumeric',
    'cryptohubPercent'
  ],
};

const text = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
    'cryptohubText',
  ],
  cellRenderer(params) {
    return params.value && params.value.value || ch.emptyCellValue;
  },
};

const url = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
    'cryptohubText',
  ],
  cellRenderer(params) {
    return params.value && params.value.value || ch.emptyCellValue;
  },
};

export {
  array,
  currency,
  date,
  number,
  percent,
  text,
  url
}
