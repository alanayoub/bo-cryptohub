module.exports = {

  formatterJSONToTxt: require('./formatter-json-to-txt'),
  formatterCryptocompareSnapshot: require('./formatter-cryptocompare-snapshot'),
  formatterCryptocompareSocialstats: require('./formatter-cryptocompare-socialstats'),

  gitLog:            require('./git-log'),
  gitDiff:           require('./git-diff'),
  gitStatus:         require('./git-status'),
  gitCheckout:       require('./git-checkout'),
  gitCheckoutBranch: require('./git-checkout-branch'),

  scrapeHTML: require('./scrape-html'),
  scrapeJSON: require('./scrape-json'),

};
