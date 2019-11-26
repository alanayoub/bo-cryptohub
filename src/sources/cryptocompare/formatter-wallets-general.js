import logger from '../../logger';
import { mapSave, perSecondSave, walletSave } from '../../db/save';
import { getBidMap, getMaps, getExchanges, getCurrencies, getBidMatch } from '../../db/query';

/**
 *
 * @param {Object} responseData - request response data
 * @returns {Object} nameId and idName mappings
 *
 */
function maps(responseData) {
  const nameId = {};
  const idName = {};
  let id;
  let obj;
  for ([id, obj] of Object.entries(responseData)) {
    nameId[obj.Name] = id;
    idName[id] = obj.Name;
  }
  return { nameId, idName };
}

/**
 *
 * EXCHANGE DATA
 *
 * @param {Object} responseData - request response data
 * @returns {Object} formatted data
 *
 */
function data(responseData) {
  let id;
  let obj;
  let field;
  let output = {};
  let fields = [
    'Id',
    'Url',
    'LogoUrl',
    'Name',
    'Security',
    'Anonymity',
    'EaseOfUse',
    'HasAttchedCard',
    // AttachedCard: {},
    'HasTradingFacilities',
    'HasVouchersAndOffers',
    // WalletFeatures: ["Open Source"],
    // Coins: ["BTC"],
    // Platforms: ["Android"],
    'SourceCodeUrl',
    'ValidationType',
    'IsUsingOurApi',
    'AffiliateURL',
    'Recommended',
    'Sponsored',
    'MoreCoins',
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
    'SortOrder'
  ];
  for ([id, obj] of Object.entries(responseData)) {
    output[id] = {};
    for (field of fields) {
      output[id][`cc-${field}`] = obj[field];
    }
  }
  return output;
}

/**
 *
 * WALLETS GENERAL
 *
 * {
 *   Response: "Success",
 *   Message: "",
 *   Data: {
 *     2486: {
 *       Id: "2486"
 *       Url: "/wallets/schildbach-btc-wallet/"
 *       LogoUrl: "/media/19463/bitcoin-wallet.png"
 *       Name: "Schildbach BTC Wallet"
 *       Security: "Personal"
 *       Anonymity: "Medium"
 *       EaseOfUse: "Average"
 *       HasAttchedCard: false,
 *       AttachedCard: {},
 *       HasTradingFacilities: false,
 *       HasVouchersAndOffers: false,
 *       WalletFeatures: ["Open Source"],
 *       Coins: ["BTC"],
 *       Platforms: ["Android"],
 *       SourceCodeUrl: "https://github.com/bitcoin-wallet/bitcoin-wallet"
 *       ValidationType: "SPV"
 *       IsUsingOurApi: false
 *       AffiliateURL: "https://play.google.com/store/apps/details?id=de.schildbach.wallet"
 *       Recommended: false
 *       Sponsored: false
 *       MoreCoins: 0,
 *       CoinsToDisplay: [],
 *       Rating: {
 *         One: 0
 *         Two: 0
 *         Three: 0
 *         Four: 1
 *         Five: 0
 *         Avg: 3.1
 *         TotalUsers: 1
 *       },
 *       SortOrder: "7"
 *     }
 *   }
 * }
 *
 * @param {Object} response - response object
 * @param {String} timestamp - time data was received
 * @returns {Object} formatted data and timestamp
 *
 */
export default async function formatterCryptocompareSectionExchangesGeneral(response, timestamp) {
  try {

    const emptyReturn = {data: {}, timestamp};

    if (!response && !response.Data || response.Response !== 'Success') {
      return emptyReturn;
    }

    /**
     *
     * NORMALIZE
     *
     */
    const normalize = val => {
      return String(val).replace(/-/g, '').replace(/\s/g, '').toLowerCase();
    }

    function getMax(levels, current, test) {
      const idxCurrent = levels.indexOf(current);
      const idxTest = levels.indexOf(test);
      if (idxTest > idxCurrent) {
        return levels[idxTest];
      }
      else if (idxTest !== -1) {
        return levels[idxCurrent];
      }
    }

    /**
     *
     * addSymbol
     *
     */
    function addSymbol(symbols, symbol) {
      symbol = normalize(symbol);
      if (!symbols[symbol]) {
        symbols[symbol] = {
          wallets: new Set(),
          // typeSPV: new Set(),
          // typeFullNode: new Set(),
          // typeCentralized: new Set(),
          // anonymityLow: new Set(),
          // anonymityMedium: new Set(),
          // anonymityHigh: new Set(),
          // securityPersonal: new Set(),
          // securityThirdParty: new Set(),
          // securityThirdPartyEncrypted: new Set(),
          // easeOfUseEasy: new Set(),
          // easeOfUseAverage: new Set(),
          // easeOfUseHard: new Set(),
          // cards: new Set(),
          supportedValidationTypes: new Set(),
          hasAttachedCard: null,    // true, false
          maxWalletAnonymity: null, // "Low", "Medium", "High"
          maxWalletEaseOfUse: null, // "Easy", "Average", "Difficult"
          maxWalletSecurity: null,  // "Personal", "Third Party", "Third Party Encrypted"
          maxWalletRating: null,   // take max of Rating.Ave
        }
      }
    }

    /**
     *
     * addWalletToSymbol
     *
     */
    function addWalletToSymbol(symbols, symbol, wallet) {

      symbol = normalize(symbol);

      addSymbol(symbols, symbol);
      symbols[symbol].supportedValidationTypes.add(wallet.ValidationType);
      symbols[symbol].wallets.add(wallet.Id);

      if (wallet.hasAttachedCard) {
        symbols[symbol].hasAttachedCard = true;
      }

      const anonLevels = ['Low', 'Medium', 'High'];
      const currentAnonLevel = symbols[symbol].maxWalletAnonymity;
      symbols[symbol].maxWalletAnonymity = getMax(anonLevels, currentAnonLevel, wallet.Anonymity);

      const easeLevels = ['Easy', 'Average', 'Difficult'];
      const currentEaseLevel = symbols[symbol].maxWalletEaseOfUse;
      symbols[symbol].maxWalletEaseOfUse = getMax(easeLevels, currentEaseLevel, wallet.EaseOfUse);

      const securityLevels = ['Personal', 'Third Party', 'Difficult'];
      const currentSecurityLevel = symbols[symbol].maxWalletSecurity;
      symbols[symbol].maxWalletSecurity = getMax(securityLevels, currentSecurityLevel, wallet.Security);
      const currentRatingLevel = symbols[symbol].maxWalletRating;
      if (!isNaN(wallet.Rating.Avg)) {
        if (!isNaN(currentRatingLevel)) {
          symbols[symbol].maxWalletRating = Math.max(currentRatingLevel, wallet.Rating.Avg);
        }
        else {
          symbols[symbol].maxWalletRating = wallet.Rating.Avg;
        }
      }

    }

    const output = {
      maps: maps(response.Data),
      data: data(response.Data)
    };

    if (output.data) await walletSave(output.data);
    if (output.maps.nameId) await mapSave('walletMapNameId', JSON.stringify(output.maps.nameId));
    if (output.maps.idName) await mapSave('walletMapIdName', JSON.stringify(output.maps.idName));

    const symbols = {};
    const wallets = {};
    for (const [walletId, data] of Object.entries(response.Data)) {
      for (const symbol of data.Coins) {
        addWalletToSymbol(symbols, symbol, data);
      }
    }

    const symbolsArray = Object.keys(symbols).map(normalize);
    const bidMap = await getBidMap({source: 'cc', symbols: symbolsArray});

    let resultData = {};
    for (let [sym, id] of Object.entries(bidMap)) {
      if (symbols[sym]) {
        resultData[id] = {
          'cryptohub-wallets': Array.from(symbols[sym].wallets),
          'cryptohub-wallets-supportedValidationTypes': Array.from(symbols[sym].supportedValidationTypes),
          'cryptohub-wallets-numberOfWallets': Array.from(symbols[sym].wallets).length,
          // 'cryptohub-wallets-cards': Array.from(symbols[sym].cards),
          'cryptohub-wallets-hasAttachedCard': symbols[sym].hasAttachedCard,
          'cryptohub-wallets-maxWalletAnonymity': symbols[sym].maxWalletAnonymity,
          'cryptohub-wallets-maxWalletEaseOfUse': symbols[sym].maxWalletEaseOfUse,
          'cryptohub-wallets-maxWalletSecurity': symbols[sym].maxWalletSecurity,
          'cryptohub-wallets-maxWalletRating': symbols[sym].maxWalletRating,
        }
      }
    }

    await perSecondSave(resultData, timestamp);

    return { data: output, timestamp };

  }
  catch (error) {
    const message = `formatterWalletsGeneral(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}
