'use strict';

export default {
  window: {
    0: {
      columns: [
        {id: 'rowIndex'},
        {id: 'name'},
        {id: 'priceUSD'},
        {id: 'priceBTC'},
        {id: 'sparklineUSD'},
        {id: 'cycleLowUSD'},
        {id: 'athUSD'},
        {id: 'athPercentDownUSD'},
        {id: 'messariPercentChange24hBTC'},
        {id: 'percentChange7dBTC'},
        {id: 'sectors'},
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
      sort: {
        column: 'volume24hUSD',
        direction: 'desc'
      }
    }
  }
}
