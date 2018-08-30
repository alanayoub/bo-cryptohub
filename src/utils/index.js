module.exports = {

  analyticsMapCmcToCc:       require('./analytics-map-cmc-to-cc'),
  analyticsMergeDataByKey:   require('./analytics-merge-data-by-key'),
  analyticsUSDCurrencyTable: require('./analytics-usd-currency-table'),

  commonDelay:                 require('./common-delay'),
  commonSwapObjectKeys:        require('./common-swap-object-keys'),
  commonBinaryStringConverter: require('./common-binary-string-converter'),

  formatterJSONToTxt:                  require('./formatter-json-to-txt'),
  formatterCryptocomparePrice:         require('./formatter-cryptocompare-price'),
  formatterCryptocompareSnapshot:      require('./formatter-cryptocompare-snapshot'),
  formatterCryptocompareAllCoins:      require('./formatter-cryptocompare-all-coins'),
  formatterCryptocompareSocialstats:   require('./formatter-cryptocompare-socialstats'),
  formatterCryptocompareFiatVolumeUSD: require('./formatter-cryptocompare-fiat-volume-usd'),

  gitLog:            require('./git-log'),
  gitDiff:           require('./git-diff'),
  gitStatus:         require('./git-status'),
  gitCheckout:       require('./git-checkout'),
  gitCheckoutBranch: require('./git-checkout-branch'),

  scrapeHTML: require('./scrape-html'),
  scrapeJSON: require('./scrape-json'),

  itterateCryptocompareExchangePairs: require('./itterate-cryptocompare-exchange-pairs'),

  mapDbFields: require('./map-db-fields'),

  classWatcher:     require('./class-watcher'),
  classDataStore:   require('./class-data-store'),
  classScrapeQueue: require('./class-scrape-queue'),

};
