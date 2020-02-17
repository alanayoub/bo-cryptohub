'use strict';

import Gadget from '../../bo/common/gadgets/gadget';

// Binary Overdose Projects
import { htmlPollElement }                from '../../libs/bo-utils-client';
import { partialApplication }             from '../../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../../libs/bo-utils-client';
import { getRandomInt }                   from '../../libs/bo-utils-client';

// Cryptohub Util functions
import initPug from '../../generated/init-pug.generated.js';

import style from './index.scss';

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
 * @param {STring} [symbolTo] - to symbol, defaults to BTC
 * @return {String|undefined} symbol - tradingview symbol
 *
 */
function tradingviewGetSymbol({symbolFrom, symbolTo = '', exchange = ''}) {

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

function html({container_id, exchange, symbolTo, projectName}) {

  let v2 = '';
  if (symbolTo) v2 = ` ${symbolTo}`;
  else if (exchange) v2 = ` ${exchange}`;

  const title = `${projectName}${v2} Chart`;
  const output = {
    id: container_id,
    title,
  }
  const contentHtml = initPug['popdiv-tradingview'](output);
  return contentHtml;
}

export default class Tradingview extends Gadget {

  constructor({componentState}) {

    super({componentState})

    const container_id = `ch-gadget-${getRandomInt(100000, 999999)}`;
    const projectName = gnp(this.data, 'cryptohub-name.value');
    const symbolFrom = gnp(this.data, 'cc-coinlist-Symbol.value');
    const cellRendererParams = this.column.cellRendererParams;
    const {
      exchange,
      symbolTo,
      tradingviewStyle:style = 1,
      interval = 'D'
    } = cellRendererParams;
    const symbol = tradingviewGetSymbol({symbolFrom, symbolTo, exchange});
    const content = html({container_id, exchange, symbolTo, projectName});

    document.querySelector(this.selector).innerHTML = content;

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

    return this;

  }

}
