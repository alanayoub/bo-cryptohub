'use strict';

export default {
  window: {
    0: {
      columns: [
        {id: 'rowIndex'},
        {id: 'nameCC'},
        {id: 'priceUSDCC'},
        {id: 'priceBTC'},
        {id: 'percentChange24hBTCMessari'},
        {id: 'percentChange7dBTCMessari'},
        {id: 'sparklineUSD'},
        {id: 'volume24hUSDCC'},
        {id: 'marketcapUSDCMC'},
        {id: 'circulatingSupplyCMC'},
        {id: 'sectorsMessari'},
        {id: 'cycleLowUSDMessari'},
        {id: 'athUSDMessari'},
        {id: 'athPercentDownUSDMessari'},
      ],
      sort: {
        column: 'volume24hUSDCC',
        direction: 'desc'
      }
    }
  }
}
