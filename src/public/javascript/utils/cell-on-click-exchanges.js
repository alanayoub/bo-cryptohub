import partialApplication from '../libs/bo-utils/partial-application.js';
import getNestedProperty  from '../libs/bo-utils/object-get-nested-property.js';
import numberGroupDigits  from '../libs/bo-utils/number-group-digits.js';
import htmlToggleClass    from '../libs/bo-utils/html-toggle-class.js';
import getRandomInt       from '../libs/bo-utils/get-random-int.js';
import popDiv             from './popdiv.js';

/**
 *
 *
 *
 *
 */
export default function cellOnClickExchanges(params) {

  function exchangeDataModel() {

    // Exchange data
    // -------------------
    // CentralizationType : "Centralized"
    // Country : "United Kingdom"
    // ItemType : (2) ["Cryptocurrency", "Fiat"]
    // Url: "/exchanges/bitstamp/overview"
    // LogoUrl : "/media/34478497/bitstamp.jpg"
    // Name : "Bitstamp"
    // id : "2431"
    // name : "Bitstamp"
    // pairs : Set(18) {"XRP,EUR", "XRP,BTC", "XRP,USD", "BTC,USD", "BTC,EUR", …}
    // _cryptoCurrencies : Set(6) {"XRP", "BTC", "ETH", "BCH", "BCHABC", …}
    // _fiatCurrencies : Set(2) {"EUR", "USD"}
    // _numberOfCryptoCurrencies : 6
    // _numberOfCryptoPairs : 5
    // _numberOfCurrencies : 8
    // _numberOfFiatCurrencies : 2
    // _numberOfFiatPairs : 13
    // _numberOfPairs : 18
    // _points : 0

    const fiatIds       = params.data['cryptohub-exchangesListAcceptsBoth'] || [];
    const cryptoIds     = params.data['cryptohub-exchangesListCryptoOnly'] || [];
    const exchanges     = getNestedProperty(window.ch, 'exchanges');

    //
    // Step 1: Create the below data structure
    //
    // ```
    // {
    //   UK: {fiat: [], crypto: []},
    //   US: {fiat: [], crypto: []},
    // }
    // ```
    //
    const outputObject = {};
    {
      let id;
      let ids;
      let type;
      let country;
      let exchange;
      for ([type, ids] of Object.entries({fiat: fiatIds, crypto: cryptoIds})) {
        for (id of ids) {
          exchange = exchanges[id];
          if (!exchange) continue;
          country = exchange.Country;
          if (!outputObject[country]) {
            outputObject[country] = {
              fiat: [],
              crypto: []
            }
          }
          outputObject[country][type].push({
            // TODO: get exchange urls
            url: `https://www.cryptocompare.com${exchange.Url}`,
            name: exchange.Name,
            logoUrl: exchange.LogoUrl,
            dex: exchange.CentralizationType === 'Decentralized',
            numberOfFiatCurrencies: exchange._numberOfFiatCurrencies,
            numberOfCryptocurrencies: exchange._numberOfCryptoCurrencies
          });
        }
      }
    }

    //
    // Step 2: Sort the data into an Array based on the most
    // popular geographic location (as below)
    //
    // ```
    // [
    //   {
    //     country: 'UK',
    //     fiat: [{name: 'Kraken', dex: true, url, fiatPairs: 3, cryptoPairs: 4}],
    //     crypto: [{name: 'Binance', dex: false, url, cryptoPairs: 55}],
    //   }
    // ]
    // ```
    //
    const outputArray = [];
    {
      let country;
      let properties;
      for ([country, properties] of Object.entries(outputObject)) {
        outputArray.push({country, ...properties});
      }
    }

    return outputArray;

  }

  function exchangeHtmlContent() {

    const name          = getNestedProperty(params, 'data.cc-total-vol-full-FullName.value');
    const total         = numberGroupDigits(getNestedProperty(params, 'value.value'));
    const classes       = 'ch-numberofexchanges';
    const dexList       = params.data['cryptohub-exchangesListDex'] || [];
    const fiatIds       = params.data['cryptohub-exchangesListAcceptsBoth'] || [];
    const cryptoIds     = params.data['cryptohub-exchangesListCryptoOnly'] || [];
    const outputArray   = exchangeDataModel();
    const numberOfPairs = getNestedProperty(params, 'data.cryptohub-numberOfPairs.value');

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
      body: outputArray
    }

    const contentHtml = initPug['ch-tippy-click'](output);
    return contentHtml;

  }

  const $cell = params.event.target.closest('.ag-cell');
  const id = `ch-tippy-${getRandomInt()}`;
  const cssId = `#${id}`;
  const contentPopdiv = initPug['ch-tippy-click-tradingview']({id});
  const contentExchange = exchangeHtmlContent();

  htmlToggleClass($cell, 'ch-cell-active');
  popDiv($cell, contentPopdiv);
  document.querySelector(cssId).innerHTML = contentExchange;

}
