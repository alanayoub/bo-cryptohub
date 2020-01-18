import { partialApplication } from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';
import cellRendererUrl from '../utils/cell-renderer-url.js';
import cellRendererDate from '../utils/cell-renderer-date.js';
import cellRendererNumber from '../utils/cell-renderer-number.js';
import cellRendererCurrency from '../utils/cell-renderer-currency.js';
import onCellClicked from '../utils/on-cell-clicked.js';

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
    'cryptohubText',
    'cryptohubHover'
  ],
  valueFormatter(params) {
    const value = gnp(params, 'value.value');
    if (value) {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed.join(', ').replace(/_/g, ' ');
      }
    }
    return ch.emptyCellValue;
  },
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
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
    'cryptohubHover'
  ],
  cellRenderer: partialApplication(cellRendererCurrency, window.refs),
  cellRendererParams: {
    popdiv: 'html',
    currency: 'USD',
  },
  onCellClicked,
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
    'cryptohubHover'
  ],
  cellRenderer: cellRendererDate,
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
};

const number = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  cellClass: 'CH-align-right',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
    'cryptohubNumeric',
    'cryptohubHover'
  ],
  cellRenderer: cellRendererNumber,
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
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
    'cryptohubPercent',
    'cryptohubHover'
  ],
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
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
    'cryptohubHover'
  ],
  cellRenderer(params) {
    const text = gnp(params, 'value.value');
    let output = ch.emptyCellValue;
    if (text) {
      output = text;
      if (output.length > 100) {
        output = output.substring(0, 100) + '...';
      }
    }
    return output;
  },
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
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
    'cryptohubHover'
  ],
  cellRenderer: cellRendererUrl,
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
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
    'cryptohubHover'
  ],
  cellRenderer(params) {
    let output;
    const html = gnp(params, 'value.value');
    if (html) {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      output = tmp.textContent || tmp.innerText || '';
      if (output.length > 100) {
        output = output.substring(0, 100) + '...';
      }
    }
    else {
      output = ch.emptyCellValue;
    }
    return output;
  },
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
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
    'cryptohubHover'
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
  cellRendererParams: {
    popdiv: 'html',
  },
  onCellClicked,
};

const custom = {
  colId: null,
  field: null,
  headerName: null,
  headerTooltip: null,
  headerClass: 'CH-col',
  lockPinned: true,
  width: 120,
  type: [
    'cryptohubDefaults',
  ],
};

export {
  array,
  custom,
  currency,
  date,
  number,
  percent,
  text,
  html,
  bool,
  url
}
