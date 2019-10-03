'use strict';

//
// {
//   window: {
//     0: {
//       columns: [
//         {
//           id: 'd3h1',
//           title: 'Column header name',
//           hidden: 0,
//           width: 150,
//           filter: '>100500',
//           selections: [
//             10: {
//               // selection options
//             }
//           ]
//         },
//       ],
//       portfolio: [
//         {
//           id: 1182 // use cryptohub symbol I'd
//           in: 12145 // price in satochies
//           type: 'long' // default to long
//           exchange: 'binance' // at some stage we will support prices from exchanged
//         }
//       ],
//       favourites: [
//         ...
//       ],
//       sort: {
//         column: 'd31h',
//         direction: 'asc'
//       }
//     }
//     1: {
//       ...
//     }
//   }
// }
//

// window: {
//   0: {
//     columns: [
//       {id: 'rowIndex'},
//       {id: 'nameCC'},
//       {id: 'sparklineUSD'},
//       {id: 'volume24hUSDCC'},
//       {id: 'circulatingSupplyCMC'},
//       {id: 'sectorsMessari'},
//       {id: 'cycleLowUSDMessari'},
//       {id: 'marketcapUSDCMC'},
//       { // Custom Column
//         id: 'c-1',
//         headerName: '5x Marketcap',
//         sources: ['marketcapUSDCMC'],
//         type: 'currency',
//         calc: 'c0*5'
//       },
//       {id: 'codeRepoPointsCC'},
//       { // Custom Column
//         id: 'c-2',
//         headerName: 'RPV Ratio',
//         sources: ['marketcapUSDCMC', 'codeRepoPointsCC'],
//         type: 'number',
//         calc: 'c0/c1'
//       },
//       {id: 'circulatingSupplyCC'},
//       {id: 'maxSupplyCMC'},
//       // circulatingSupplyCMC
//       // circulatingSupplyCC
//       // totalSupplyCMC
//       // maxSupplyCMC
//       // totalSupplyCMC
//       { // Custom Column
//         id: 'c-3',
//         headerName: 'Circulating Supply %',
//         sources: ['maxSupplyCMC', 'circulatingSupplyCMC'],
//         type: 'percent',
//         calc: 'c1/(c0/100)'
//       },
//       {id: 'generalPointsCC'},
//       { // Custom Column
//         id: 'c-4',
//         headerName: 'GPV Ratio',
//         sources: ['marketcapUSDCMC', 'generalPointsCC'],
//         type: 'number',
//         calc: 'c0/c1'
//       },
//     ],
//     sort: {
//       column: 'volume24hUSDCC',
//       direction: 'desc'
//     }
//   }
// }

export default {
  window: {
    0: {
      columns: [
        {id: 'rowIndex'},
        {id: 'nameCC'},
        {id: 'priceUSDCC'},
        {id: 'priceBTCCC'},
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
