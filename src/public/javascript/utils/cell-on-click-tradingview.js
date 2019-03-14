'use strict';

import popDiv from './popdiv.js';

/**
 *
 * NOTE: Not currently used
 *
 */
function exchangeSupported(exchanges) {
  const get = bo.objectGetNestedProperty;
  const mapNameId = get(ch, 'exchange-map-nameId');
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
function tradingviewGetSymbol(params, symbolTo = 'BTC') {

  const get = bo.objectGetNestedProperty;
  const map = get(ch, 'exchange-map-idName');
  const symbolFrom = get(params, 'data.cc-coinlist-Symbol.value');

  //
  // NOTE: don't use exchange, tradingview finds a default
  //
  // Try an exchange that supports fiat first
  // const exchangeList1 = exchangeSupported(get(params, 'data.cryptohub-exchangesListAcceptsBoth'));
  // const exchangeList2 = exchangeSupported(get(params, 'data.cryptohub-exchangesListCryptoOnly'));

  // const exchange = map && exchangeList1.length
  //   ? map[exchangeList1[0]]
  //   : map && exchangeList2.length
  //     ? map[exchangeList2[0]]
  //     : void 0;

  if (symbolFrom && symbolTo) {
    const pair = symbolFrom.toUpperCase() + symbolTo.toUpperCase();
    const symbol = `${pair}`;
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
 * @param {STring} [symbolTo] - to symbol, defaults to BTC
 * @return {undefined}
 *
 */
function loadTradingview(params, container_id, symbolTo = 'BTC') {
  const symbol = tradingviewGetSymbol(params, symbolTo);
  if (symbol) {
    new TradingView.widget({
      symbol,
      container_id,
      autosize: true,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'Light',
      style: '1',
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

/**
 *
 *
 *
 *
 *
 */
export default function cellOnClickTradingview(symbolTo, params) {

  const id = `ch-tippy-${bo.getRandomInt()}`;
  const cssId = `#${id}`;
  const content = initPug['ch-tippy-click-tradingview']({id});
  const $cell = params.event.target.closest('.ag-cell');
  popDiv($cell, content);
  bo.htmlToggleClass($cell, 'ch-cell-active');
  bo.htmlPollElement(cssId, 100, bo.partialApplication(loadTradingview, params, id, symbolTo));

}
