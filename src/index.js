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
const logger                                    = require.main.require('./logger');
const settings                                  = require.main.require('./settings');
const DataTable                                 = require.main.require('./libs/dataTable/src');

// Handlers
const mergeHandler                              = require.main.require('./utils/merge-handler.js');
const dataHandler                               = require.main.require('./utils/data-handler.js');

// Formatters
const formatterCryptocompareBootstrap           = require.main.require('./utils/formatter-cryptocompare-bootstrap.js');
const formatterCryptocompareSectionPrice        = require.main.require('./utils/formatter-cryptocompare-section-price.js');
const formatterCryptocompareSectionCoinlist     = require.main.require('./utils/formatter-cryptocompare-section-coinlist.js');
const formatterCryptocompareSectionExchanges    = require.main.require('./utils/formatter-cryptocompare-section-exchanges.js');
const formatterCryptocompareSectionTotalVolFull = require.main.require('./utils/formatter-cryptocompare-section-total-vol-full.js');
const formatterXeSectionCurrency                = require.main.require('./utils/formatter-xe-section-currency.js');

// Job fetchers
const getJobsCryptocompareSectionPrice          = require.main.require('./utils/get-jobs-cryptocompare-section-price.js');
const getJobsCryptocompareSectionTotalVolFull   = require.main.require('./utils/get-jobs-cryptocompare-section-total-vol-full.js');

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
    mergeHandler, // merge data from different sites
    dataHandler,  // handle merged data
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
            // TODO: bootstrapData needs to change when coinlist changes!!!!
            //
            name: 'coinList',
            interval: 1000 * 5,
            cacheArgs: [settings.keyCryptocompareList, 'all'],
            getJobs(queue, bootstrapData) {
              queue.push({uri: settings.uriCryptocompareList, key: settings.keyCryptocompareList, cacheForDays: 0});
            },
            formatter: formatterCryptocompareSectionCoinlist,
          },
          {
            //
            // EXCHANGES
            // Get all the exchanges that CryptoCompare has integrated with
            //
            name: 'exchanges',
            interval: 1000 * 60 * 60,
            cacheArgs: [settings.keyCryptocompareExchanges, 'all'],
            getJobs(queue, bootstrapData) {
              queue.push({uri: settings.uriCryptocompareExchanges, key: settings.keyCryptocompareExchanges, cacheForDays: 0});
            },
            formatter: formatterCryptocompareSectionExchanges,
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
            formatter: formatterCryptocompareSectionPrice,
            handler(oldData, newData) {
              const merged = {...oldData, ...newData};
              return merged;
            },
          },
          {
            //
            // TopTotalVolume
            //
            name: 'totalVolFull',
            interval: 1000 * 10,
            cacheArgs: [settings.tagKeyCryptocompareTotalVolFullGrouped`${{}}`, 'all'],
            getJobs: getJobsCryptocompareSectionTotalVolFull,
            formatter: formatterCryptocompareSectionTotalVolFull,
            handler(oldData, newData) {
              const merged = {...oldData, ...newData};
              return merged;
            },
          },
        ]
      },
      xe: {
        cacheFor: 0,
        // rateLimitDelayMs: 1000 * 10,
        rateLimitDelayMs: 1000 * 60 * 60 * 24,
        bootstrap: () => {return {}},
        sections: [
          {
            name: 'currency',
            // interval: 1000 * 10,
            interval: 1000 * 60 * 60 * 24,
            cacheArgs: [settings.tagKeyXeCurrencyTables`${'USD'}`, 'all'],
            getJobs(queue, bootstrapData) {
              queue.push({
                uri: settings.tagUriXeCurrencyTables`${'USD'}`,
                key: settings.tagKeyXeCurrencyTables`${'USD'}`,
                cacheForDays: 0
              });
            },
            formatter: formatterXeSectionCurrency,
          }
        ]
      }
    }
  });

}

catch(error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}

