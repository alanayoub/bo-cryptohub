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
import { join }                                      from 'path';

// Libs
import '@babel/polyfill';

// Binary Overdose Projects
import DataTable                                     from 'bo-datatable';
import { partialApplication }                        from 'bo-utils';

// CryptoHub
import settings                                      from './settings';

// Handlers
import dataOnHandleData                              from './utils/data-on-handle-data';
import storeOnHandleData                             from './utils/store-on-handle-data';
import dataOnBeforeEmit                              from './utils/data-on-before-emit.js';
import storeOnBeforeEmit                             from './utils/store-on-before-emit.js';

// Formatters
import formatterCryptocompareBootstrap               from './utils/formatter-cryptocompare-bootstrap.js';
import formatterCryptocompareSectionPrice            from './utils/formatter-cryptocompare-section-price.js';
import formatterCryptocompareSectionCoinlist         from './utils/formatter-cryptocompare-section-coinlist.js';
import formatterCryptocompareSectionExchangesList    from './utils/formatter-cryptocompare-section-exchanges-list.js';
import formatterCryptocompareSectionExchangesGeneral from './utils/formatter-cryptocompare-section-exchanges-general.js';
import formatterCryptocompareSectionTotalVolFull     from './utils/formatter-cryptocompare-section-total-vol-full.js';
import formatterXeSectionCurrency                    from './utils/formatter-xe-section-currency.js';
import formatterMessariSectionMetrics                from './utils/formatter-messari-section-metrics.js';

// Job fetchers
import getJobsCryptocompareSectionPrice              from './utils/get-jobs-cryptocompare-section-price.js';
import getJobsCryptocompareSectionTotalVolFull       from './utils/get-jobs-cryptocompare-section-total-vol-full.js';
import getJobsMessariSectionMetrics                  from './utils/get-jobs-messari-section-metrics.js';

// Other utils
import analyticsMergeDataByKey                       from './utils/analytics-merge-data-by-key';

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
  // COINLIST
  // Get the full list of coins with IDs
  //
  // TODO: bootstrapData needs to change when coinlist changes!!!!
  //
  const cryptocompareCoinlist = {
    event: 'data',
    name: 'coinList',
    interval: 1000 * 5,
    //
    // TODO: can we remove this and just search for the key?
    //
    watchDirs: [`${scrapeDir}/cryptocompare-coinlist/data.json`, 'all'],
    getJobs(queue, bootstrapData) {
      queue.push({
        uri: 'https://min-api.cryptocompare.com/data/all/coinlist',
        key: `${scrapeDir}/cryptocompare-coinlist/data.json`,
        cacheForDays: 0
      });
    },
    formatter: formatterCryptocompareSectionCoinlist
  };

  //
  // EXCHANGES LIST
  // Get all the exchanges that CryptoCompare has integrated with
  //
  // TODO: separate into exchangesList & exchangesGeneral & have 2 formatters, then we don't need the glob
  // and we can keep the default data.json
  //
  const cryptocompareExchangesList = {
    event: 'data,store',
    name: 'exchanges-list',
    interval: 1000 * 60 * 1,
    // TODO: rename this fucking bit, this is where the watcher will look for files to load
    // so if we are saving them in different places they will never be added!
    watchDirs: [settings.keyCryptocompareExchangesList, 'all'],
    getJobs(queue, bootstrapData) {
      queue.push({uri: settings.uriCryptocompareExchangesList, key: settings.keyCryptocompareExchangesList, cacheForDays: 0});
    },
    formatter: formatterCryptocompareSectionExchangesList
  };

  //
  // EXCHANGES GENERAL
  //
  const cryptocompareExchangesGeneral = {
    event: 'data,store',
    name: 'exchanges-general',
    interval: 1000 * 60 * 60,
    watchDirs: [settings.keyCryptocompareExchangesGeneral, 'all'],
    getJobs(queue, bootstrapData) {
      queue.push({uri: settings.uriCryptocompareExchangesGeneral, key: settings.keyCryptocompareExchangesGeneral, cacheForDays: 0});
    },
    formatter: formatterCryptocompareSectionExchangesGeneral
  };

  //
  // TOP TOTAL VOLUME
  //
  const cryptocompareTopTotalVolume = {
    event: 'data',
    name: 'totalVolFull',
    interval: 1000 * 10,
    watchDirs: [settings.tagKeyCryptocompareTotalVolFullGrouped`${{}}`, 'all'],
    getJobs: getJobsCryptocompareSectionTotalVolFull,
    handler(oldData, newData) {
      const merged = {...oldData, ...newData};
      return merged;
    },
    formatter: formatterCryptocompareSectionTotalVolFull
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
  // TODO:
  //
  // const datatable = new DataTable(options);
  //
  // datatable.api.new(cryptocompare);
  // datatable.api.new(xe);
  // datatable.api.new(messari);

  // datatable.api.cryptocompare.add();
  // datatable.api.cryptocompare.add();
  // datatable.api.cryptocompare.add();
  // datatable.api.xe.add();
  // datatable.api.messari.add();

  // datatable.api.output(data)
  // datatable.api.output(store)

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

  let initData = {};
  const dataTable = new DataTable({

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
          socket.emit(event, emitData);
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
          const emitData = storeOnBeforeEmit({diff: false}, data, {})
          socket.emit(event, emitData);
        },
        onBeforeEmit: partialApplication(storeOnBeforeEmit, {diff: true}),
        onBeforeBootstrapSave: (data) => {
          return data;
        }
      }
    },

    scrapeSites: {
      cryptocompare: {
        cacheFor: settings.cacheForCryptocompare,
        bootstrap: formatterCryptocompareBootstrap,
        rateLimitDelayMs: settings.rateLimitCryptocompare,
        sections: [
          cryptocompareCoinlist,
          cryptocompareExchangesList,
          cryptocompareExchangesGeneral,
          cryptocompareTopTotalVolume,
        ]
      },
      messari: {
        cacheFor: settings.cacheForMessari,
        bootstrap: cache => {
          return {}
        },
        rateLimitDelayMs: settings.rateLimitMessari,
        sections: [
          messariMetrics
        ]
      },
      xe: {
        cacheFor: settings.cacheForXe,
        bootstrap: () => {return {}},
        rateLimitDelayMs: settings.rateLimitXe,
        sections: [
          xeCurrency
        ]
      }
    }
  });

}

catch (error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}
