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
    const junk = ['-', 'N/A'];
    let value = params.value && params.value.value;
    if (junk.includes(value)) {
      value = null;
    }
    const url = value && value !== '-' ? `<a href="${value}" target="_blank">${value}</a>` : ch.emptyCellValue;
    return url;
  },
};

const html = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col CH-col-html',
  cellClass: 'CH-cell-html',
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

const bool = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
    'cryptohubBool',
  ],
  cellRenderer(params) {
    let value = params.value && params.value.value;
    if (value === null || value === void 0) {
      return ch.emptyCellValue;
    }
    else if (typeof value === 'boolean') {
      value = ''+value;
    }
    else if (value === 0) {
      value = 'false';
    }
    else if (value === 1) {
      value = 'true';
    }
    return value;
  },
};

export {
  array,
  currency,
  date,
  number,
  percent,
  text,
  html,
  bool,
  url
}
