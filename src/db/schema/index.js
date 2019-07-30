'use strict';

// Libs
import { Schema, model } from 'mongoose';

// Binary Overdose
import { fieldTypeMap } from '../../settings';

//
// Validators
//

const idsList = Object.keys(fieldTypeMap);

const validator = {

  id(val) {
    const [ field, projectId ] = val.split(':');
    const isValid = idsList.includes(field) && !isNaN(projectId) && projectId.length < 10;
    if (!isValid) {
      console.log(field, projectId, idsList);
      debugger;
    }
    return isValid;
  },

  samples(arr) {

    const tsItemIsValid = tsItem => {

      const arrayIsValid = (Array.isArray(tsItem) && tsItem.length === 2);
      let arrayDataIsValid;

      if (arrayIsValid) {

        let type = fieldTypeMap[this._id.split(':')[0]];
        type = type.includes('|') ? type.split('|') : [type];

        const [date, val] = tsItem;
        const dateType = Object.prototype.toString.call(date);
        const valType  = Object.prototype.toString.call(val);

        const validDate = dateType === '[object Number]';
        const validVal = type.some(v => valType === `[object ${v}]`);

        arrayDataIsValid = validDate && validVal;

        if (!(arrayIsValid && arrayDataIsValid)) {
          console.log(type, date, val, this._id, dateType, valType);
          debugger;
        }

      }

      return arrayIsValid && arrayDataIsValid;

    }

    const tsIsValid = Array.isArray(arr) && arr.length === 2 && tsItemIsValid(arr[0]) && tsItemIsValid(arr[1]);
    if (!tsIsValid) {
      debugger;
      throw new Error('fuck');
    }

    return tsIsValid;

  },

}

//
// Schema
//

const perSecondOptions = {
  _id: {
    type: String,
    required: true,
    validate: [validator.id, '{PATH} is not valid']
  },
  samples: {
    type: [[{
      type: Schema.Types.Mixed,
      required: true,
    }]],
    validate: [validator.samples, '{PATH} is not valid']
  },
}

const PerSecondSchema = new Schema(perSecondOptions, {collection: 'tsseconds'});
const PerSecondModel = model('PerSecond', PerSecondSchema);

//
// TODO: Write queries
//
// Regex Query
// { _id: { $regex: "^cc-total-vol-full-HIGHDAY:" } }
//
// { "_id" : { $regex: "cc-coinlist-Id|cc-coinlist-IsTrading|cc-total-vol-full-HIGHDAY", $options: "i" } }
//

export {
  PerSecondModel
}

// cc-coinlist-Algorithm: "SHA-256"
// cc-coinlist-Algorithm-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-BlockNumber: 585945
// cc-coinlist-BlockNumber-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-BlockReward: 12.5
// cc-coinlist-BlockReward-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-BlockTime: 600
// cc-coinlist-BlockTime-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-BuiltOn: "N/A"
// cc-coinlist-BuiltOn-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-CoinName: "Bitcoin"
// cc-coinlist-CoinName-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-FullName: "Bitcoin (BTC)"
// cc-coinlist-FullName-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-FullyPremined: "0"
// cc-coinlist-FullyPremined-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-Id: "1182"
// cc-coinlist-Id-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-ImageUrl: "/media/19633/btc.png"
// cc-coinlist-ImageUrl-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-IsTrading: true
// cc-coinlist-IsTrading-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-Name: "BTC"
// cc-coinlist-Name-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-NetHashesPerSecond: 64884773430.5641
// cc-coinlist-NetHashesPerSecond-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-PreMinedValue: "N/A"
// cc-coinlist-PreMinedValue-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-ProofType: "PoW"
// cc-coinlist-ProofType-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-SmartContractAddress: "N/A"
// cc-coinlist-SmartContractAddress-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-SortOrder: 1
// cc-coinlist-SortOrder-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-Sponsored: false
// cc-coinlist-Sponsored-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-Symbol: "BTC"
// cc-coinlist-Symbol-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-TotalCoinSupply: "21000000"
// cc-coinlist-TotalCoinSupply-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-TotalCoinsFreeFloat: "N/A"
// cc-coinlist-TotalCoinsFreeFloat-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-TotalCoinsMined: 17824325
// cc-coinlist-TotalCoinsMined-timestamp: "2019-07-18T15:02:10.457Z"
// cc-coinlist-Url: "/coins/btc/overview"
// cc-coinlist-Url-timestamp: "2019-07-18T15:02:10.457Z"
// cc-total-vol-full-Algorithm: "SHA-256"
// cc-total-vol-full-Algorithm-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-BlockNumber: 586289
// cc-total-vol-full-BlockNumber-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-BlockReward: 12.5
// cc-total-vol-full-BlockReward-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-BlockTime: 600
// cc-total-vol-full-BlockTime-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-CHANGE24HOUR: 250.8199999999997
// cc-total-vol-full-CHANGE24HOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-CHANGEDAY: 254.20999999999913
// cc-total-vol-full-CHANGEDAY-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-CHANGEPCT24HOUR: 2.3805252872679548
// cc-total-vol-full-CHANGEPCT24HOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-CHANGEPCTDAY: 2.413476199427692
// cc-total-vol-full-CHANGEPCTDAY-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-DocumentType: "Webpagecoinp"
// cc-total-vol-full-DocumentType-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-FLAGS: "2"
// cc-total-vol-full-FLAGS-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-FROMSYMBOL: "BTC"
// cc-total-vol-full-FROMSYMBOL-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-FullName: "Bitcoin"
// cc-total-vol-full-FullName-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-HIGH24HOUR: 11122.11
// cc-total-vol-full-HIGH24HOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-HIGHDAY: 11094.32
// cc-total-vol-full-HIGHDAY-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-HIGHHOUR: 11094.32
// cc-total-vol-full-HIGHHOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-IMAGEURL: "/media/19633/btc.png"
// cc-total-vol-full-IMAGEURL-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-Id: "1182"
// cc-total-vol-full-Id-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-ImageUrl: "/media/19633/btc.png"
// cc-total-vol-full-ImageUrl-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-Internal: "BTC"
// cc-total-vol-full-Internal-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LASTMARKET: "Bitfinex"
// cc-total-vol-full-LASTMARKET-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LASTTRADEID: "380349580"
// cc-total-vol-full-LASTTRADEID-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LASTUPDATE: 1563666895
// cc-total-vol-full-LASTUPDATE-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LASTVOLUME: 0.34424691
// cc-total-vol-full-LASTVOLUME-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LASTVOLUMETO: 3702.7197639600004
// cc-total-vol-full-LASTVOLUMETO-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LOW24HOUR: 10372.68
// cc-total-vol-full-LOW24HOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LOWDAY: 10379.19
// cc-total-vol-full-LOWDAY-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-LOWHOUR: 10663.33
// cc-total-vol-full-LOWHOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-MARKET: "CCCAGG"
// cc-total-vol-full-MARKET-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-MKTCAP: 192320052168.75
// cc-total-vol-full-MKTCAP-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-MKTCAP:last: 190903033053.75
// cc-total-vol-full-Name: "BTC"
// cc-total-vol-full-Name-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-NetHashesPerSecond: 64884773430.5641
// cc-total-vol-full-NetHashesPerSecond-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-OPEN24HOUR: 10536.33
// cc-total-vol-full-OPEN24HOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-OPENDAY: 10532.94
// cc-total-vol-full-OPENDAY-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-OPENHOUR: 11004.44
// cc-total-vol-full-OPENHOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-PRICE: 10787.15
// cc-total-vol-full-PRICE-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-PRICE:last: 10707.67
// cc-total-vol-full-ProofType: "PoW"
// cc-total-vol-full-ProofType-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-SUPPLY: 17828625
// cc-total-vol-full-SUPPLY-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOPTIERVOLUME24HOUR: 52562.86051016554
// cc-total-vol-full-TOPTIERVOLUME24HOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOPTIERVOLUME24HOURTO: 563818838.7708249
// cc-total-vol-full-TOPTIERVOLUME24HOURTO-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOSYMBOL: "USD"
// cc-total-vol-full-TOSYMBOL-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOTALTOPTIERVOLUME24H: 195521.9043362999
// cc-total-vol-full-TOTALTOPTIERVOLUME24H-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOTALTOPTIERVOLUME24HTO: 2105939488.37991
// cc-total-vol-full-TOTALTOPTIERVOLUME24HTO-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOTALVOLUME24H: 411037.63758137764
// cc-total-vol-full-TOTALVOLUME24H-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOTALVOLUME24HTO: 4430506065.158804
// cc-total-vol-full-TOTALVOLUME24HTO-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-TOTALVOLUME24HTO:last: 4301871877.618074
// cc-total-vol-full-TYPE: "5"
// cc-total-vol-full-TYPE-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-Type: 1
// cc-total-vol-full-Type-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-Url: "/coins/btc/overview"
// cc-total-vol-full-Url-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-VOLUME24HOUR: 56424.81418218754
// cc-total-vol-full-VOLUME24HOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-VOLUME24HOURTO: 605244347.2282308
// cc-total-vol-full-VOLUME24HOURTO-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-VOLUMEDAY: 56221.78718733446
// cc-total-vol-full-VOLUMEDAY-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-VOLUMEDAYTO: 603068296.4944367
// cc-total-vol-full-VOLUMEDAYTO-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-VOLUMEHOUR: 7116.193702263335
// cc-total-vol-full-VOLUMEHOUR-timestamp: "2019-07-20T23:55:51.261Z"
// cc-total-vol-full-VOLUMEHOURTO: 77502325.97363725
// cc-total-vol-full-VOLUMEHOURTO-timestamp: "2019-07-20T23:55:51.261Z"
// cmc-listings-circulating_supply: 17828587
// cmc-listings-circulating_supply-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-cmc_rank: 1
// cmc-listings-cmc_rank-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-date_added: "2013-04-28T00:00:00.000Z"
// cmc-listings-date_added-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-id: 1
// cmc-listings-id-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-last_updated: "2019-07-20T23:07:31.000Z"
// cmc-listings-last_updated-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-market_cap: 196603885542.89383
// cmc-listings-market_cap-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-market_cap:last: 195323472901.9299
// cmc-listings-max_supply: 21000000
// cmc-listings-max_supply-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-name: "Bitcoin"
// cmc-listings-name-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-num_market_pairs: 7729
// cmc-listings-num_market_pairs-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-percent_change_1h: 0.676421
// cmc-listings-percent_change_1h-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-percent_change_7d: -2.20533
// cmc-listings-percent_change_7d-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-percent_change_24h: 4.6224
// cmc-listings-percent_change_24h-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-tags: ["mineable"]
// cmc-listings-tags-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-total_supply: 17828587
// cmc-listings-total_supply-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-volume_24h: 19746349624.4394
// cmc-listings-volume_24h-timestamp: "2019-07-20T23:07:48.637Z"
// cmc-listings-volume_24h:last: 19620156717.0052
// cryptohub-circulating-percent-total: 84.89821428571429
// cryptohub-exchangesListAcceptsBoth: (63) ["2431", "2436", "2438", "2439", "2440", "2493", "2532", "2672", "2674", "3908"]
// cryptohub-exchangesListCryptoOnly: (26) ["28252", "43041", "75261", "283442", "387754", "415148", "863674", "892535", "898406"]
// cryptohub-exchangesListDex: (4) ["2532", "906645", "324742", "205932"]
// cryptohub-exchangesListFiatOnly: []
// cryptohub-numberOfDex: 89
// cryptohub-numberOfExchanges: 89
// cryptohub-numberOfExchanges-timestamp: "2019-07-18T15:01:18.676Z"
// cryptohub-numberOfFiatCurrencies: 124
// cryptohub-numberOfFiatCurrencies-timestamp: "2019-07-18T15:01:18.676Z"
// cryptohub-numberOfFiatPairs: 135
// cryptohub-numberOfFiatPairs-timestamp: "2019-07-18T15:01:18.676Z"
// cryptohub-numberOfPairs: 3575
// cryptohub-numberOfPairs-timestamp: "2019-07-18T15:01:18.676Z"
// cryptohub-price-btc: 100000000
// cryptohub-price-btc-timestamp: 1563666951261
// cryptohub-price-history: (50) [{…}, {…}]
// m-metrics-ath-breakeven-multiple: 1.8791457044370827
// m-metrics-ath-breakeven-multiple-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-ath-date: "2017-12-17"
// m-metrics-ath-date-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-ath-days: 580
// m-metrics-ath-days-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-ath-percent-down: 46.78432877031426
// m-metrics-ath-percent-down-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-ath-price: 20089
// m-metrics-ath-price-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-ath-price-timestamp-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-categories: ["Currency"]
// m-metrics-categories-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-current-marketcap-usd: 187826087562.6011
// m-metrics-current-marketcap-usd-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-current-marketcap-usd:last: 187826807831.80325
// m-metrics-cycle-low-date: "2018-12-15"
// m-metrics-cycle-low-date-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-cycle-low-days-since: 216
// m-metrics-cycle-low-days-since-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-cycle-low-percent-up: 241.9120669556836
// m-metrics-cycle-low-percent-up-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-cycle-low-price: 3126.679993636258
// m-metrics-cycle-low-price-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-cycle-low-price-timestamp-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-date-created: "2009-01-03"
// m-metrics-date-created-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-btc-last-1-month: 0
// m-metrics-percent-change-btc-last-1-month-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-btc-last-1-week: null
// m-metrics-percent-change-btc-last-1-week-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-btc-last-1-year: 0
// m-metrics-percent-change-btc-last-1-year-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-btc-last-3-months: 0
// m-metrics-percent-change-btc-last-3-months-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-btc-last-24-hours: 0
// m-metrics-percent-change-btc-last-24-hours-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-last-1-month: 14.307182339624125
// m-metrics-percent-change-last-1-month-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-last-1-week: null
// m-metrics-percent-change-last-1-week-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-last-1-year: 44.104690263080094
// m-metrics-percent-change-last-1-year-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-last-3-months: 102.14223802510251
// "m-metrics-percent-change-last-3-months ": 105.70718794584255
// m-metrics-percent-change-last-3-months -timestamp: "2019-07-16T06:59:09.324Z"
// m-metrics-percent-change-last-3-months-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-percent-change-usd-last-24-hours: 1.9787072779319383
// m-metrics-percent-change-usd-last-24-hours-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-price-btc: 1
// m-metrics-price-btc-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-price-usd: 10535.1452300804
// m-metrics-price-usd-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-real-volume-last-24-hours: 1038318103.792404
// m-metrics-real-volume-last-24-hours-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-real-volume-last-24-hours:last: 1063775181.6296422
// m-metrics-sectors: ["Currency"]
// m-metrics-sectors-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-volume-last-24-hours: 6273864145.401665
// m-metrics-volume-last-24-hours-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-volume-last-24-hours:last: 6389883061.836032
// m-metrics-y-2050-marketcap-usd: 221115944522.90533
// m-metrics-y-2050-marketcap-usd-timestamp: "2019-07-20T13:47:57.964Z"
// m-metrics-y-2050-marketcap-usd:last: 221116792450.9382
