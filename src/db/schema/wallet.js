import logger from '../../logger';
import { Schema } from 'mongoose';

const validator = {

  id(val) {
    const [ field, walletId ] = val.split(':');
    const isValid = field === 'wallet' && !isNaN(walletId) && walletId.length < 10;
    if (!isValid) {
      logger.warn('exchange schema: invalid id', field, walletId);
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

  // Id: "2486"
  'cc-Id': {
    type: Schema.Types.Mixed
  },
  // Url: "/wallets/schildbach-btc-wallet/"
  'cc-Url': {
    type: Schema.Types.Mixed
  },
  // LogoUrl: "/media/19463/bitcoin-wallet.png"
  'cc-LogoUrl': {
    type: Schema.Types.Mixed
  },
  // Name: "Schildbach BTC Wallet"
  'cc-Name': {
    type: Schema.Types.Mixed
  },
  // Security: "Personal"
  'cc-Security': {
    type: Schema.Types.Mixed
  },
  // Anonymity: "Medium"
  'cc-Anonymity': {
    type: Schema.Types.Mixed
  },
  // EaseOfUse: "Average"
  'cc-EaseOfUse': {
    type: Schema.Types.Mixed
  },
  // HasAttchedCard: false,
  'cc-HasAttchedCard': {
    type: Schema.Types.Mixed
  },
  // AttachedCard: {},
  // HasTradingFacilities: false,
  'cc-HasTradingFacilities': {
    type: Schema.Types.Mixed
  },
  // HasVouchersAndOffers: false,
  'cc-HasVouchersAndOffers': {
    type: Schema.Types.Mixed
  },
  // WalletFeatures: ["Open Source"],
  'cc-WalletFeatures': {
    type: [String]
  },
  // Coins: ["BTC"],
  'cc-Coins': {
    type: [String]
  },
  // Platforms: ["Android"],
  'cc-Platforms': {
    type: [String]
  },
  // SourceCodeUrl: "https://github.com/bitcoin-wallet/bitcoin-wallet"
  'cc-SourceCodeUrl': {
    type: Schema.Types.Mixed
  },
  // ValidationType: "SPV"
  'cc-ValidationType': {
    type: Schema.Types.Mixed
  },
  // 'IsUsingOurApi',
  // 'AffiliateURL',
  // 'Recommended',
  // 'Sponsored',
  // MoreCoins: 0,
  'cc-MoreCoins': {
    type: Schema.Types.Mixed
  },
  // CoinsToDisplay: [],
  // Rating: {
  //   One: 0
  //   Two: 0
  //   Three: 0
  //   Four: 1
  //   Five: 0
  //   Avg: 3.1
  //   TotalUsers: 1
  // },
  // SortOrder:  "2"
  'cc-SortOrder': {
    type: Schema.Types.Mixed
  },

  //
  // BINARYOVERDOSE
  //

  // // pairs: {}
  // 'cryptohub-pairs': {
  //   type: [String]
  // },
  // // cryptoCurrencies: {}
  // 'cryptohub-cryptoCurrencies': {
  //   type: [String]
  // },

}

const Wallet = new Schema(options, {collection: 'wallets'});
Wallet.set('versionKey', false);

export default Wallet;
