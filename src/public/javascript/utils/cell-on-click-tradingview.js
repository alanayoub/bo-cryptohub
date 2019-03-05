import partialApplication from '../libs/bo-utils/partial-application.js';
import getNestedProperty  from '../libs/bo-utils/object-get-nested-property.js';
import htmlToggleClass    from '../libs/bo-utils/html-toggle-class.js';
import htmlPollElement    from '../libs/bo-utils/html-poll-element.js';
import getRandomInt       from '../libs/bo-utils/get-random-int.js';
import popDiv             from './popdiv.js';

/**
 *
 *
 *
 *
 *
 */
export default function cellOnClickTradingview(symbolTo, params) {

  /**
   *
   * TRADINGVIEW GET SYMBOL
   *
   * Tradingview symbols looks like:
   *
   *   Exchange:symbolFromSymbolTo
   *   ---------------------------
   *   COINBASE:BTCUSD
   *   KRAKEN:ETHBTC
   *
   * @param {Object} params - ag-grid cell params object
   * @param {STring} [symbolTo] - to symbol, defaults to BTC
   * @return {String|undefined} symbol - tradingview symbol
   *
   */
  function tradingviewGetSymbol(params, symbolTo = 'BTC') {

    const get = getNestedProperty;
    const map = get(ch, 'exchange-map-idName');

    const symbolFrom = get(params, 'data.cc-coinlist-Symbol.value');
    const exchangeList1 = get(params, 'data.cryptohub-exchangesListAcceptsBoth');
    const exchangeList2 = get(params, 'data.cryptohub-exchangesListCryptoOnly');

    const exchange = map && exchangeList1.length
      ? map[exchangeList1[0]]
      : map && exchangeList2.length
        ? map[exchangeList2[0]]
        : void 0;

    if (exchange && symbolFrom && symbolTo) {
      const pair = symbolFrom.toUpperCase() + symbolTo.toUpperCase();
      const symbol = `${exchange.toUpperCase()}:${pair}`;
      return symbol;
    }
    else {
      logger.warn('Cannot construct tradingview symbol');
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
      logger.warn('Cannot load tradingview window, missing initialization data');
    }
  }

  const id = `ch-tippy-${getRandomInt()}`;
  const cssId = `#${id}`;
  const content = initPug['ch-tippy-click-tradingview']({id});
  const $cell = params.event.target.closest('.ag-cell');
  popDiv($cell, content);
  htmlToggleClass($cell, 'ch-cell-active');
  htmlPollElement(cssId, 100, partialApplication(loadTradingview, params, id, symbolTo));

}
