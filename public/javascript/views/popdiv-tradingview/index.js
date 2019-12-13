'use strict';

// Binary Overdose Projects
import { getRandomInt }                   from '../../libs/bo-utils-client';
import { htmlPollElement }                from '../../libs/bo-utils-client';
import { partialApplication }             from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';

// Cryptohub Util functions
import popDiv from '../../utils/popdiv.js';
import initPug from '../../generated/init-pug.generated.js';

import style from './index.css';

/**
 *
 * NOTE: Not currently used
 *
 */
function exchangeSupported(exchanges) {
  const mapNameId = gnp(ch, 'exchange-map-nameId');
  // TODO: rank by exchange ranking that we havnt created yet
  const supported = [
    'POLONIEX',
    'BINANCE',
    'BITFINEX',
    'BITSTAMP',
    'COINBASE',
    'BITFLYER',
    'KORBIT',
    'BITTREX',
    'MERCADO',
    'GEMINI',
    'BITHUMB',
    'CEX.IO',
    'BTCYOU',
    'BITSO',
    'OKCOIN',
    'COINFLOOR',
    'THEROCKTRADING',
    'ITBIT',
    'HITBTC',
    'HUOBI',
    'FOREXCOM',
  ];

  const map = Object.entries(mapNameId).reduce((acc, val) => {
    acc[val[0].toUpperCase()] = val[1];
    return acc;
  }, {});
  const supportedIds = supported.map(a => map[a])

  return supportedIds;
};

/**
 *
 * TRADINGVIEW GET SYMBOL
 *
 * Tradingview symbols looks like:
 *
 *   symbolFromSymbolTo
 *   ---------------------------
 *   BTCUSD
 *   ETHBTC
 *
 * @param {Object} params - ag-grid cell params object
 * @param {STring} [symbolTo] - to symbol, defaults to BTC
 * @return {String|undefined} symbol - tradingview symbol
 *
 */
function tradingviewGetSymbol(params) {

  const symbolFrom = gnp(params, 'data.cc-coinlist-Symbol.value');
  const rendererParams = params.colDef.cellRendererParams;
  const exchange = rendererParams.exchange || '';
  const symbolTo = rendererParams.symbolTo || '';

  //
  // NOTE: don't use exchange, tradingview finds a default
  //
  // Try an exchange that supports fiat first
  // const map = gnp(ch, 'exchangeMapIdName');
  // const exchangeList1 = exchangeSupported(gnp(params, 'data.cryptohub-exchangesListAcceptsBoth'));
  // const exchangeList2 = exchangeSupported(gnp(params, 'data.cryptohub-exchangesListCryptoOnly'));

  // const exchange = map && exchangeList1.length
  //   ? map[exchangeList1[0]]
  //   : map && exchangeList2.length
  //     ? map[exchangeList2[0]]
  //     : void 0;

  if (symbolFrom) {
    const pair = symbolFrom.toUpperCase() + symbolTo.toUpperCase();
    const symbol = exchange ? `${exchange}:${pair}` : pair;
    return symbol;
  }
  else {
    console.warn('Cannot construct tradingview symbol');
  }
}

/**
 *
 * LOAD TRADINGVIEW
 *
 * Load a trading view widget using ag-grid cell params as data
 *
 * @param {Object} params - ag-grid cell params object
 * @param {String} container_id - html id of where to load the widget
 * @return {undefined}
 *
 */
function loadTradingview(params, container_id) {
  const symbol = tradingviewGetSymbol(params);
  const interval = gnp(params, 'colDef.cellRendererParams.interval') || 'D';
  const style = gnp(params, 'colDef.cellRendererParams.tradingviewStyle') || 1;
  if (symbol) {
    new TradingView.widget({
      style,
      symbol,
      interval,
      container_id,
      autosize: true,
      timezone: 'Etc/UTC',
      theme: 'Light',
      locale: 'uk',
      toolbar_bg: 'rgba(255, 255, 255, 1)',
      enable_publishing: false,
      allow_symbol_change: true,
      save_image: false,
      studies: [
        'MAExp@tv-basicstudies'
      ],
    });
  }
  else {
    console.warn('Cannot load tradingview window, missing initialization data');
  }
}

function html(params, id) {

  const projectName = gnp(params, 'data.cryptohub-name.value');
  const value = gnp(params, 'value.value');
  const rendererParams = params.colDef.cellRendererParams;

  let v2 = '';
  const symbolTo = rendererParams.symbolTo;
  const exchange = rendererParams.exchange;
  if (symbolTo) v2 = ` ${symbolTo}`;
  else if (exchange) v2 = ` ${exchange}`;

  const title = `${projectName}${v2} Chart`;
  const output = {
    title,
    value,
    id,
  }
  const contentHtml = initPug['popdiv-tradingview'](output);
  return contentHtml;
}

/**
 *
 *
 *
 *
 *
 */
export default function cellOnClickTradingview(params) {

  const rand = getRandomInt();
  const id = `ch-tippy-${rand}`;
  const gridId = `grid-${rand}`;

  // Create popdiv
  const $cell = params.event.target.closest('.ag-cell');
  const contentPopdiv = initPug['ch-tippy-popdiv']({id});
  popDiv($cell, contentPopdiv);

  // Populate html content
  const idSelector = `#${id}`;
  const content = html(params, gridId);
  document.querySelector(idSelector).innerHTML = content;
  loadTradingview(params, gridId);

}
