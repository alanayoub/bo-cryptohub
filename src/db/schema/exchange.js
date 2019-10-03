import logger from '../../logger';
import { Schema } from 'mongoose';

const validator = {

  id(val) {
    const [ field, exchangeId ] = val.split(':');
    const isValid = field === 'exchange' && !isNaN(exchangeId) && exchangeId.length < 10;
    if (!isValid) {
      logger.warn('exchange schema: invalid id', field, exchangeId, idsList);
    }
    return isValid;
  }

}

const options = {

  _id: {
    type: String,
    required: true,
    validate: [validator.id, '{PATH} is not valid']
  },

  //
  // CRYPTOCOMPARE
  //
  // NOTE: note using
  //
  // GradePointsSplit: Object
  // Rating: Object
  //

  // CentralizationType: "Centralized"
  'cc-CentralizationType': {
    type: Schema.Types.Mixed
    // enum: ['Centralized', 'Decentralized'],
  },
  // Country: "United Kingdom"
  'cc-Country': {
    type: Schema.Types.Mixed
  },
  // Id: "2431"
  'cc-Id': {
    type: Schema.Types.Mixed
  },
  // ItemType: (2) ["Cryptocurrency", "Fiat"]
  'cc-ItemType': {
    type: [String]
  },
  // LogoUrl: "/media/34478497/bitstamp.jpg"
  'cc-LogoUrl': {
    type: Schema.Types.Mixed
  },
  // Name: "Bitstamp"
  'cc-Name': {
    type: Schema.Types.Mixed
  },
  // Url: "/exchanges/bitstamp/overview"
  'cc-Url': {
    type: Schema.Types.Mixed
  },
  // InternalName:  "Bitstamp"
  'cc-InternalName': {
    type: Schema.Types.Mixed
  },
  // GradePoints:  "59.60"
  'cc-GradePoints': {
    type: Schema.Types.Mixed
  },
  // Grade:  "AA"
  'cc-Grade': {
    type: Schema.Types.Mixed
  },
  // AffiliateURL: "https://www.bitstamp.net/"
  'cc-AffiliateUrl': {
    type: Schema.Types.Mixed
  },
  // OrderBook: true
  'cc-OrderBook': {
    type: Schema.Types.Mixed
  },
  // Trades: true
  'cc-Trades': {
    type: Schema.Types.Mixed
  },
  // Description:  "Bitstamp serves as the bridge between traditional finance and crypto."
  'cc-Description': {
    type: Schema.Types.Mixed
  },
  // FullAddress:  "Bitstamp"
  'cc-FullAddress': {
    type: Schema.Types.Mixed
  },
  // Fees:  "...charged as 0.12. The minimum allowable trade is $5 USD..."
  'cc-Fees': {
    type: Schema.Types.Mixed
  },
  // DepositMethods:  "...SEPA...."
  'cc-DepositMethods': {
    type: Schema.Types.Mixed
  },
  // Sponsored: false
  'cc-Sponsored': {
    type: Schema.Types.Mixed
  },
  // Recommended: false
  'cc-Recommended': {
    type: Schema.Types.Mixed
  },
  // SortOrder:  "2"
  'cc-SortOrder': {
    type: Schema.Types.Mixed
  },
  // TOTALVOLUME24HBTC: 17172.7226038021 // originally object
  'cc-TOTALVOLUME24HBTC': {
    type: Schema.Types.Mixed
  },
  // DISPLAYTOTALVOLUME24HBTC: "Ƀ 17.17 K" // originally object
  'cc-DISPLAYTOTALVOLUME24HBTC': {
    type: Schema.Types.Mixed
  },

  //
  // BINARYOVERDOSE
  //

  // pairs: {}
  'cryptohub-pairs': {
    type: [String]
  },
  // cryptoCurrencies: {}
  'cryptohub-cryptoCurrencies': {
    type: [String]
  },
  // fiatCurrencies: {}
  'cryptohub-fiatCurrencies': {
    type: [String]
  },
  // numberOfCryptoCurrencies: 6
  'cryptohub-numberOfCryptoCurrencies': {
    type: String
  },
  // numberOfCryptoPairs: 5
  'cryptohub-numberOfCryptoPairs': {
    type: String
  },
  // numberOfCurrencies: 8
  'cryptohub-numberOfCurrencies': {
    type: String
  },
  // numberOfFiatCurrencies: 2
  'cryptohub-numberOfFiatCurrencies': {
    type: String
  },
  // numberOfFiatPairs: 13
  'cryptohub-numberOfFiatPairs': {
    type: String
  },
  // numberOfPairs: 18
  'cryptohub-numberOfPairs': {
    type: String
  },
  // points: 0
  'cryptohub-points': {
    type: Number
  }

}

const Exchange = new Schema(options, {collection: 'exchanges'});
Exchange.set('versionKey', false);

export default Exchange;
