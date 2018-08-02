/**
 *
 * @param {Array} price is an array of the responses of batched cryptocompare api price data
 * @return {Object} data
 *
 */

// Cryptohub
const logger = require.main.require('./logger');
const mapDbFields = require.main.require('./utils/map-db-fields');
const m = mapDbFields.fullToShort;

module.exports = function formatterCryptocomparePrice(price, symbolIdMap) {
  try {
    let i;
    let id;
    let val;
    let symbol;
    let result = {};
    let batchRequestData;
    for (i = 0; i < price.length; i++) {
      batchRequestData = price[i].RAW;
      for ([symbol, val] of Object.entries(batchRequestData)) {
        id = symbolIdMap[symbol];
        if (id && val.USD) {
          val = val.USD;
          if (!result[m['TYPE']]) {
            result = {
              [m['TYPE'           ]]: val.TYPE,
              [m['MARKET'         ]]: val.MARKET,
              [m['FROMSYMBOL'     ]]: val.FROMSYMBOL,
              [m['TOSYMBOL'       ]]: val.TOSYMBOL,
              [m['FLAGS'          ]]: val.FLAGS,
              [m['DATA'           ]]: {}
            };
          }
          result[m['DATA']][id] = {
            [m['PRICE'            ]]: val.PRICE,
            [m['LASTUPDATE'       ]]: val.LASTUPDATE,
            [m['LASTVOLUME'       ]]: val.LASTVOLUME,
            [m['LASTVOLUMETO'     ]]: val.LASTVOLUMETO,
            [m['LASTTRADEID'      ]]: val.LASTTRADEID,
            [m['VOLUMEDAY'        ]]: val.VOLUMEDAY,
            [m['VOLUMEDAYTO'      ]]: val.VOLUMEDAYTO,
            [m['VOLUME24HOUR'     ]]: val.VOLUME24HOUR,
            [m['VOLUME24HOURTO'   ]]: val.VOLUME24HOURTO,
            [m['OPENDAY'          ]]: val.OPENDAY,
            [m['HIGHDAY'          ]]: val.HIGHDAY,
            [m['LOWDAY'           ]]: val.LOWDAY,
            [m['OPEN24HOUR'       ]]: val.OPEN24HOUR,
            [m['HIGH24HOUR'       ]]: val.HIGH24HOUR,
            [m['LOW24HOUR'        ]]: val.LOW24HOUR,
            [m['LASTMARKET'       ]]: val.LASTMARKET,
            [m['CHANGE24HOUR'     ]]: val.CHANGEPCT24HOUR,
            [m['CHANGEPCT24HOUR'  ]]: val.CHANGEPCT24HOUR,
            [m['CHANGEDAY'        ]]: val.CHANGEDAY,
            [m['CHANGEPCTDAY'     ]]: val.CHANGEPCTDAY,
            [m['SUPPLY'           ]]: val.SYPPLY,
            [m['MKTCAP'           ]]: val.MKTCAP,
            [m['TOTALVOLUME24H'   ]]: val.TOTALVOLUME24H,
            [m['TOTALVOLUME24HTO' ]]: val.TOTALVOLUME24HTO,
          }
        }
        else {
          throw error;
        }
      }
    }
    return result;
  }
  catch(error) {
    const message = `formatterCryptocomparePrice(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
