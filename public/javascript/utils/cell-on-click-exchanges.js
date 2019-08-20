'use strict';

// Binary Overdose Projects
import { getRandomInt }                   from '../libs/bo-utils-client';
import { numberGroupDigits }              from '../libs/bo-utils-client';
import { objectGetNestedProperty as gnp } from '../libs/bo-utils-client';

// Cryptohub
import popDiv  from './popdiv.js';
import initPug from '../generated/init-pug.generated.js';

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
    // cryptoCurrencies : Set(6) {"XRP", "BTC", "ETH", "BCH", "BCHABC", …}
    // fiatCurrencies : Set(2) {"EUR", "USD"}
    // numberOfCryptoCurrencies : 6
    // numberOfCryptoPairs : 5
    // numberOfCurrencies : 8
    // numberOfFiatCurrencies : 2
    // numberOfFiatPairs : 13
    // numberOfPairs : 18
    // points : 0

    const fiatIds   = gnp(params, 'data.cryptohub-exchangesListAcceptsBoth.value') || [];
    const cryptoIds = gnp(params, 'data.cryptohub-exchangesListCryptoOnly.value') || [];
    const exchanges = gnp(window.ch, 'exchanges');

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
          country = exchange['cc-Country'];
          if (!outputObject[country]) {
            outputObject[country] = {
              fiat: [],
              crypto: []
            }
          }
          outputObject[country][type].push({
            // TODO: get exchange urls
            url: `https://www.cryptocompare.com${exchange['cc-Url']}`,
            name: exchange['cc-Name'],
            logoUrl: exchange['cc-LogoUrl'],
            dex: exchange['cc-CentralizationType'] === 'Decentralized',
            numberOfFiatCurrencies: exchange['cryptohub-numberOfFiatCurrencies'],
            numberOfCryptocurrencies: exchange['cryptohub-numberOfCryptoCurrencies']
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
      for (const [country, properties] of Object.entries(outputObject)) {
        outputArray.push({country, ...properties});
      }
    }

    return outputArray;

  }

  function exchangeHtmlContent() {

    const name          = gnp(params, 'data.cc-total-vol-full-FullName.value');
    const total         = numberGroupDigits(gnp(params, 'value.value'));
    const classes       = 'ch-numberofexchanges';
    const dexList       = gnp(params, 'data.cryptohub-exchangesListDex.value') || [];
    const fiatIds       = gnp(params, 'data.cryptohub-exchangesListAcceptsBoth.value') || [];
    const cryptoIds     = gnp(params, 'data.cryptohub-exchangesListCryptoOnly.value') || [];
    const outputArray   = exchangeDataModel();
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

  popDiv($cell, contentPopdiv);
  document.querySelector(cssId).innerHTML = contentExchange;

}
