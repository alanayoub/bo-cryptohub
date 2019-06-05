'use strict';

//
// DEFAULT CONFIG
//

export default {
  window: {
    0: {
      columns: [
        {id: 'rowIndex'},
        {id: 'name'},

        {
          id: 'priceUSD',
          // filter: '>100500',
          selections: [
            // 10: {
            //   // selection options
            // }
          ]
        },
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
  }
}
