//
//
// ██████╗ ██╗███╗   ██╗ █████╗ ██████╗ ██╗   ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ██████╗  ██████╗ ███████╗███████╗
// ██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝
// ██████╔╝██║██╔██╗ ██║███████║██████╔╝ ╚████╔╝ ██║   ██║██║   ██║█████╗  ██████╔╝██║  ██║██║   ██║███████╗█████╗
// ██╔══██╗██║██║╚██╗██║██╔══██║██╔══██╗  ╚██╔╝  ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║  ██║██║   ██║╚════██║██╔══╝
// ██████╔╝██║██║ ╚████║██║  ██║██║  ██║   ██║   ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██████╔╝╚██████╔╝███████║███████╗
// ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝╚══════╝
//

// CryptoHub
const logger                                = require.main.require('./logger');
const settings                              = require.main.require('./settings');
const DataTable                             = require.main.require('./libs/dataTable/src');

// Handlers
const mergeHandler                          = require.main.require('./utils/merge-handler.js');
const dataHandler                           = require.main.require('./utils/data-handler.js');

// Formatters
const formatterCryptocompareBootstrap       = require.main.require('./utils/formatter-cryptocompare-bootstrap.js');
const formatterCryptocompareSectionPrice    = require.main.require('./utils/formatter-cryptocompare-section-price.js');
const formatterCryptocompareSectionCoinlist = require.main.require('./utils/formatter-cryptocompare-section-coinlist.js');

// Job fetchers
const getJobsCryptocompareSectionPrice      = require.main.require('./utils/get-jobs-cryptocompare-section-price.js');

process.on('warning', error => {
  logger.warning(`index.js:\n${error.stack}`);
});

try {

  //
  // TODO: expand and collapse data so we dont repeat object labels
  //
  new DataTable({
    server: {
      port: 3000
    },
    tmpDir: settings.keyCryptohubAnalyticsTmp,
    outDir: settings.keyCryptohubAnalyticsOut,
    cacheDir: 'cache',
    dataHandler,
    mergeHandler,
    defaultData: [],
    scrapeSites: {
      cryptocompare: {
        cacheFor: 0,
        rateLimitDelayMs: settings.rateLimitCryptocompare,
        bootstrap: formatterCryptocompareBootstrap,
        sections: [
          {
            //
            // COINLIST
            // Get the full list of coins with IDs
            //
            // TODO: bootstrappedData needs to change when coinlist changes!!!!
            //
            name: 'coinList',
            interval: 1000 * 5,
            cacheArgs: [settings.keyCryptocompareList, 'all'],
            getJobs(queue, bootstrappedData) {
              queue.push({uri: settings.uriCryptocompareList, key: settings.keyCryptocompareList, cacheForDays: 0});
            },
            formatter: formatterCryptocompareSectionCoinlist,
          },
          {
            //
            // PRICE
            // Get every token in USD only (batched requests)
            //
            name: 'price',
            interval: 1000 * 10,
            cacheArgs: [settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`, 'all'],
            getJobs: getJobsCryptocompareSectionPrice,
            formatter: formatterCryptocompareSectionPrice
          }
        ]
      },
      // xe: {
      //   cacheForDays: 1,
      //   rateLimitDelay: 1000 * 60 * 60 * 24,
      //   items: [
      //     {
      //       name: 'currency',
      //       interval: 1000 * 60 * 60 * 24,
      //       getJobs(queue) {},
      //       formatter(data, timestamp) {}
      //     }
      //   ]
      // }
    }
  });

}

catch(error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}

