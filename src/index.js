//
//
// ██████╗ ██╗███╗   ██╗ █████╗ ██████╗ ██╗   ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ██████╗  ██████╗ ███████╗███████╗
// ██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝
// ██████╔╝██║██╔██╗ ██║███████║██████╔╝ ╚████╔╝ ██║   ██║██║   ██║█████╗  ██████╔╝██║  ██║██║   ██║███████╗█████╗
// ██╔══██╗██║██║╚██╗██║██╔══██║██╔══██╗  ╚██╔╝  ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║  ██║██║   ██║╚════██║██╔══╝
// ██████╔╝██║██║ ╚████║██║  ██║██║  ██║   ██║   ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██████╔╝╚██████╔╝███████║███████╗
// ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝╚══════╝
//
//

// Node
import { join }                                            from 'path';

// Libs
import '@babel/polyfill';

// Binary Overdose Projects
import DataTable                                           from 'bo-datatable';
import { partialApplication }                              from 'bo-utils';

// CryptoHub
import settings                                            from './settings';

// Handlers
import dataOnHandleData                                    from './utils/data-on-handle-data';
import storeOnHandleData                                   from './utils/store-on-handle-data';
import dataOnBeforeEmit                                    from './utils/data-on-before-emit.js';
import storeOnBeforeEmit                                   from './utils/store-on-before-emit.js';

// Formatters
import formatterCryptocompareBootstrap                     from './sources/cryptocompare/formatter-bootstrap.js';
import formatterXeSectionCurrency                          from './utils/formatter-xe-section-currency.js';
import formatterMessariSectionMetrics                      from './utils/formatter-messari-section-metrics.js';
import formatterCoinmarketcapSectionCryptocurrencyListings from './utils/formatter-coinmarketcap-section-cryptocurrency-listings.js';

// Job fetchers
import getJobsMessariSectionMetrics                        from './utils/get-jobs-messari-section-metrics.js';

// Other utils
import analyticsMergeDataByKey                             from './utils/analytics-merge-data-by-key';

import cryptocompare                                       from './sources/cryptocompare';

const logger = require('./logger');
const { scrapeDir } = settings;

try {

  process.on('warning', error => {
    logger.warning(`index.js:\n${error.stack}`);
  });

  //
  // -------------------------------------------------------------------------------------------------------
  //
  // Order data is processed
  //
  // -------------------------------------------------------------------------------------------------------
  //
  //
  // #1 sectionconfig.formatter(response, timestamp, bootstrapDAta, appBootstrapData, fileName, event)
  //      return { data, timestamp };
  //
  //    The formatter receives the response data, the data that was scraped before any processing has happened
  //    This is where you should format the individual responses into a cohesive format for further processing
  //
  //
  // #2 sectionconfig.handler(oldData, newData)
  //      return { mergedData };
  //
  //    NOTE: rename from handler to ? // onFormatted(oldData, newData)
  //    This handler receives a copy of the previous sections formatted data and the new formatted data
  //    You can disguard the old data or use it for processing
  //    A single merged piece of data should be returned
  //
  //
  // #3 mergeHandlers[eventName](data)
  //      return data;
  //
  //    The merge handler receives all the formatted data for the same type of events in an object
  //    ```
  //    {
  //      coinList: coinListData,
  //      otherName: otherData
  //    }
  //    ```
  //
  //    In most cases you would merge the data into a single object or array and return it.
  //    You can however elect to keep it as is
  //
  //
  // #4 events[eventName](data, cache)
  //    cache.set(fileName, data);
  //    // return data;
  //
  //    NOTE: rename to eventsHandlers() for consistency
  //    The events handler builds the final output that gets emitted and saved to file
  //    TODO: change so the data is returned and the application saves the file
  //
  //

  //
  // XE
  //
  const xe = {
    cacheFor: settings.cacheForXe,
    bootstrap: () => {return {}},
    rateLimitDelayMs: settings.rateLimitXe,
  };

  //
  // XE CURRENCY
  //
  const xeCurrency = {
    event: 'data',
    name: 'currency',
    interval: 1000 * 60 * 60 * 24,
    watchDirs: [settings.tagKeyXeCurrencyTables`${'USD'}`, 'all'],
    getJobs(queue, bootstrapData) {
      queue.push({
        uri: settings.tagUriXeCurrencyTables`${'USD'}`,
        key: settings.tagKeyXeCurrencyTables`${'USD'}`,
        cacheForDays: 0
      });
    },
    formatter: formatterXeSectionCurrency
  };

  //
  // MESSARI
  //
  const messari = {
    cacheFor: settings.cacheForMessari,
    bootstrap: cache => {return {}},
    rateLimitDelayMs: settings.rateLimitMessari,
  };

  //
  // MESSARI METRICS
  //
  const messariMetrics = {
    event: 'data',
    name: 'messari-metrics',
    interval: 1000 * 5,
    watchDirs: [`${scrapeDir}/messari-metric/**/*`, 'all'],
    getJobs: getJobsMessariSectionMetrics,
    formatter: formatterMessariSectionMetrics,
  };

  //
  // COINMARKETCAP
  //
  const coinmarketcap = {
    cacheFor: settings.cacheForCoinmarketcap,
    bootstrap: cache => {return {}},
    rateLimitDelayMs: settings.rateLimitCoinmarketcap,
  };

  //
  // COINMARKETCAP
  //
  const coinmarketcapCryptocurrencyListings = {
    event: 'data',
    name: 'cmc-listings',
    interval: 1000 * 5,
    watchDirs: [`${scrapeDir}/coinmarketcap-cryptocurrency-listings/**/*`, 'all'],
    getJobs: (queue, bootstrapData, appBootstrapData) => {
      queue.push({
        uri: settings.uriCoinmarketcapCryptocurrencyListings,
        key: settings.keyCoinmarketcapCryptocurrencyListings,
        cacheForDays: 30
      });
      logger.info(`getJobsCoinmarketcapCryptocurrencyListings(): 1 job created`);
    },
    formatter: formatterCoinmarketcapSectionCryptocurrencyListings,
  };

  //
  //
  //
  function getFirstXRows(data, numRows = 50) {

    let id;
    let ids;
    let rows;
    let output = {};

    const idField = 'cc-total-vol-full-Id';
    const volField = 'cc-total-vol-full-TOTALVOLUME24HTO';

    rows = Object
      .values(data)
      .filter(a => a[idField])
      .sort((a, b) => b[volField] - a[volField])
      .slice(0, numRows);

    ids = rows.map(a => a[idField]);
    for (id of ids) output[id] = data[id];
    return output;
  }

  //
  // TODO:
  //
  const options = {

    dbDir: settings.dbDir,
    cacheDir: settings.cacheDir,
    generatedDir: settings.generatedDir,

    server: {
      pub: join(__dirname, '../dist/public'),
      port: 3001,
      index: '../dist/index.html',
    },

    //
    // TODO
    //
    // This is where you were.
    // make app wide bootstrap work, and clip data by maxRows or whatever its called.
    //
    bootstrap: formatterCryptocompareBootstrap,

    events: {
      data: {
        onBeforeHandleData: analyticsMergeDataByKey,
        onHandleData: partialApplication(dataOnHandleData, {}),
        onAfterConnect(event, socket, data) {
          const emitData = dataOnBeforeEmit({diff: false}, socket, data, initData);
          if (emitData) socket.emit(event, emitData);
        },
        onBeforeEmit: partialApplication(dataOnBeforeEmit, {diff: true}),
        onBeforeBootstrapSave: data => {
          initData = getFirstXRows(data, settings.maxRowsTemplatedIn);
          if (!settings.maxRowsTemplatedIn) return data;
          return initData;
        }
      },
      store: {
        onBeforeHandleData: data => data,
        onHandleData: partialApplication(storeOnHandleData, {}),
        onAfterConnect(event, socket, data) {
          const emitData = storeOnBeforeEmit({diff: false}, socket, data, {});
          if (emitData) socket.emit(event, emitData);
        },
        onBeforeEmit: partialApplication(storeOnBeforeEmit, {diff: true}),
        onBeforeBootstrapSave: (data) => {
          return data;
        }
      }
    },

  };

  let initData = null;
  const datatable = new DataTable(options);

  datatable.newSource('cryptocompare', cryptocompare.config).then(() => {
    datatable.sources.cryptocompare.add(cryptocompare.coinList);
    datatable.sources.cryptocompare.add(cryptocompare.exchangesList);
    datatable.sources.cryptocompare.add(cryptocompare.topTotalVolume);
    datatable.sources.cryptocompare.add(cryptocompare.exchangesGeneral);
  });

  datatable.newSource('messari', messari).then(() => {
    datatable.sources.messari.add(messariMetrics);
  });

  datatable.newSource('coinmarketcap', coinmarketcap).then(() => {
    datatable.sources.coinmarketcap.add(coinmarketcapCryptocurrencyListings);
  });

  datatable.newSource('xe', xe).then(() => {
    datatable.sources.xe.add(xeCurrency);
  });

  // datatable.output(data)
  // datatable.output(store)

}

catch (error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}
