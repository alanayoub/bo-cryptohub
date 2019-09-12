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

export default {
  window: {
    0: {
      columns: [
        {id: 'rowIndex'},
        {id: 'nameCC'},
        {id: 'sparklineUSD'},
        {id: 'volume24hUSDCC'},
        {id: 'circulatingSupplyCMC'},
        {id: 'sectorsMessari'},
        {id: 'cycleLowUSDMessari'},
        {id: 'marketcapUSDCMC'},
        { // Custom Column
          id: 'c-1',
          headerName: '5x Marketcap',
          sources: ['marketcapUSDCMC'],
          type: 'currency',
          calc: 's0*5'
        },
        {id: 'codeRepoPointsCC'},
        { // Custom Column
          id: 'c-2',
          headerName: 'RPV Ratio',
          sources: ['marketcapUSDCMC', 'codeRepoPointsCC'],
          type: 'number',
          calc: 's0/s1'
        }
      ],
      sort: {
        column: 'volume24hUSDCC',
        direction: 'desc'
      }
    }
  }
}
