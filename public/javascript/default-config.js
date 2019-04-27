'use strict';

//
// DEFAULT CONFIG
//
export default {
  columns: [
    {id: 'rowIndex'},
    {id: 'name'},
    {id: 'sectors'},
    {id: 'priceUSD'},
    {id: 'priceBTC'},
    {id: 'athUSD'},
    {id: 'cycleLowUSD'},
    {id: 'percentChange24hUSD'},
    {id: 'percentChange7DUSD'},
    {id: 'sparklineUSD'},
    {id: 'volume24hUSD'},
    {id: 'marketcapUSD'},
    {id: 'circulatingSupply'},
    {id: 'proofType'},
    {id: 'algo'},
    {id: 'hashesPerSecond'},
    {id: 'numberOfExchanges'},
    {id: 'numberOfPairs'},
    {id: 'numberOfFiatPairs'},
    {id: 'numberOfFiatCurrencies'},
  ],
  portfolio: [
    {
      id: 1182,// use cryptohub symbol Id
      in: 12145, // price in satochies
      type: 'long',// default to long
      exchange: 'binance' // at some stage we will support prices from exchanged
    }
  ],
  favourites: [
    //...
  ],
  sort: {
    column: 'volume24hUSD',
    direction: 'desc'
  }
}
