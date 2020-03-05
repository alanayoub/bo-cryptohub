'use strict';

export default {
  layout: [{
    type: 'row',
    content: [
      {
        type: 'column',
        width: 70,
        content: [
          {
            sid: 0,
            type: 'stack',
            height: 70,
            content: [
              {
                id: '000',
                type: 'main',
                columns: [
                  {id: 'rowIndex', width: 40},
                  {id: 'nameCC', width: 236},
                  {id: 'priceUSDCC', width: 100},
                  {id: 'priceBTCCC', width: 120},
                  {id: 'percentChange7dBTCMessari', width: 80},
                  {id: 'percentChange1mBTCMessari', width: 80},
                  {id: 'marketcapUSDCC', width: 150},
                  {id: 'volume24hUSDCC', width: 150},
                  {id: 'numberOfExchanges', width: 117},
                  {id: 'nvtMessari', width: 95},
                  {id: 'sharpRatioLast30DaysMessari', width: 126},
                  {id: 'sectorsMessari', width: 250}
                ],
                sort: {
                  colId: 'volume24hUSDCC',
                  direction: 'desc'
                }
              }
            ]
          },
          {
            sid: 1,
            type: 'stack',
            content: [
              {
                id: '001',
                type: 'default'
              }
            ]
          }
        ]
      },
      {
        type: 'column',
        content: [
          {
            sid: 2,
            type: 'stack',
            content: [
              {
                id: '002',
                type: 'treemap'
              }
            ]
          },
          {
            sid: 3,
            type: 'stack',
            content: [
              {
                id: '003',
                colId: 'priceUSDCC',
                rowId: 'nb6ozglho',
                type: 'tradingview'
              }
            ]
          },
          {
            sid: 4,
            type: 'stack',
            content: [
              {
                id: '004',
                type: 'default'
              }
            ]
          }
        ]
      }
    ]
  }]
}
