'use strict';

// Libs
import { model }        from 'mongoose';

// Binary Overdose
import MapSchema        from './map';
import PerDaySchema     from './perDay';
import ExchangeSchema   from './exchange';
import PerSecondSchema  from './perSecond';
import { fieldTypeMap } from '../../settings';

const MapModel = model('Map', MapSchema);
const PerDayModel = model('PerDay', PerDaySchema);
const ExchangeModel = model('Exchange', ExchangeSchema);
const PerSecondModel = model('PerSecond', PerSecondSchema);

export {
  MapModel,
  PerDayModel,
  ExchangeModel,
  PerSecondModel
}

//
// Just saving here incase of crash yo
//
// db.tsdays.aggregate([
//    {$match: {field: {$in: ["cc-total-vol-full-Id", "cc-total-vol-full-CHANGEPCTDAY", "cc-total-vol-full-FullName", "cc-coinlist-Symbol", "cc-total-vol-full-ImageUrl", "m-metrics-misc_data_sectors", "cryptohub-exchangesListDex", "cryptohub-exchangesListCryptoOnly", "cryptohub-exchangesListAcceptsBoth", "cc-total-vol-full-PRICE", "cc-total-vol-full-PRICE-cryptohub-BTC", "cc-total-vol-full-TOTALVOLUME24HTO", "cc-total-vol-full-MKTCAP", "cc-total-vol-full-SUPPLY", "cc-total-vol-full-ProofType", "cc-total-vol-full-Algorithm", "cc-total-vol-full-NetHashesPerSecond", "cc-coinlist-BuiltOn", "cmc-listings-quote_USD_market_cap"]}}},
//    {
//      $project:
//       {
//          id: 1,
//          field: 1,
//          month: { $arrayElemAt: [ "$samples", 7 ] }
//       }
//    },
//    {
//      $project:
//       {
//          _id: 0,
//          id: 1,
//          field: 1,
//          value: { $arrayElemAt: [ "$month", 25 ] }
//       }
//    },
//    {
//     "$group": {
//       "_id" : "$id",
//       "data" : {
//         "$push" : {"k" : "$field","v" : "$value"}
//       }
//     }
//    },
//    {
//      "$project": {
//        "id": "$_id",
//        "_id" : 0,
//        "data": {
//          "$arrayToObject" : "$data"
//        }
//      }
//    }
// ])
