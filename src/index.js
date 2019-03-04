//
//
// ██████╗ ██╗███╗   ██╗ █████╗ ██████╗ ██╗   ██╗ ██████╗ ██╗   ██╗███████╗██████╗ ██████╗  ██████╗ ███████╗███████╗
// ██╔══██╗██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝
// ██████╔╝██║██╔██╗ ██║███████║██████╔╝ ╚████╔╝ ██║   ██║██║   ██║█████╗  ██████╔╝██║  ██║██║   ██║███████╗█████╗
// ██╔══██╗██║██║╚██╗██║██╔══██║██╔══██╗  ╚██╔╝  ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║  ██║██║   ██║╚════██║██╔══╝
// ██████╔╝██║██║ ╚████║██║  ██║██║  ██║   ██║   ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██████╔╝╚██████╔╝███████║███████╗
// ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚══════╝╚══════╝
//

// Node
import { join }                                      from 'path';

// CryptoHub
import logger                                        from './logger';
import settings                                      from './settings';
import DataTable                                     from './libs/dataTable/src';
import getNestedProp                                 from './libs/bo-utils/object-get-nested-property';
import pugCompileTemplates                           from './libs/bo-utils/pug-compile-templates';

// Handlers
import mergeHandler                                  from './utils/merge-handler';
import dataHandler                                   from './utils/data-handler';

// Formatters
import formatterCryptocompareBootstrap               from './utils/formatter-cryptocompare-bootstrap.js';
import formatterCryptocompareSectionPrice            from './utils/formatter-cryptocompare-section-price.js';
import formatterCryptocompareSectionCoinlist         from './utils/formatter-cryptocompare-section-coinlist.js';
import formatterCryptocompareSectionExchangesList    from './utils/formatter-cryptocompare-section-exchanges-list.js';
import formatterCryptocompareSectionExchangesGeneral from './utils/formatter-cryptocompare-section-exchanges-general.js';
import formatterCryptocompareSectionTotalVolFull     from './utils/formatter-cryptocompare-section-total-vol-full.js';
import formatterXeSectionCurrency                    from './utils/formatter-xe-section-currency.js';

// Job fetchers
import getJobsCryptocompareSectionPrice              from './utils/get-jobs-cryptocompare-section-price.js';
import getJobsCryptocompareSectionTotalVolFull       from './utils/get-jobs-cryptocompare-section-total-vol-full.js';

try {

  process.on('warning', error => {
    logger.warning(`index.js:\n${error.stack}`);
  });

  pugCompileTemplates({
    varName: 'initPug',
    pugGlob: `${__dirname}/pug/**/*.pug`,
    outFile: `${__dirname}/public/javascript/init-pug.generated.js`
  });

  //
  // dataHandler and tmpDir go hand in hand
  //
  // we should have an events thing:
  //   events: {
  //     Data: dataHandler(),
  //     Store: storeHandler()
  //   }
  //
  // the directory gets created on its own, so tmpData and tmpStore
  //
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
  const scrapeDir = '/tmp-scraped';
  const analyticsMergeDataByKey = require.main.require('./utils/analytics-merge-data-by-key');
  const dataTable = new DataTable({
    server: {
      pub: join(__dirname, './public'),
      port: 3000,
    },
    mergeHandlers: {
      data: analyticsMergeDataByKey,
      store: data => {
        return data;
      }
    },
    events: {
      data: dataHandler,
      store: (data, cache) => {

        // Get old data
        const fileName = '/tmp-generated/store/data.json';
        let [ oldData ] = cache.get(fileName);
        oldData = JSON.parse(oldData) || {};

        // Maps
        const idName = getNestedProp(data, 'exchanges-general.maps.idName');
        const nameId = getNestedProp(data, 'exchanges-general.maps.nameId');

        // Exchanges object by Id
        const list = getNestedProp(data, 'exchanges-list.data') || {};
        const general = getNestedProp(data, 'exchanges-general.data') || {};
        const exchanges = analyticsMergeDataByKey([list, general]);

        const output = {
          ...oldData,
          ...exchanges && {exchanges},
          ...nameId && {'exchange-map-nameId': nameId},
          ...idName && {'exchange-map-idName': idName}
        }

        cache.set(fileName, JSON.stringify(output));

      }
    },
    tmpDir: settings.keyCryptohubAnalyticsTmp,
    outDir: settings.keyCryptohubAnalyticsOut,
    cacheDir: join(__dirname, '../cache'),
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
            event: 'data',
            interval: 1000 * 5,
            //
            // TODO: can we remove this and just search for the key?
            //
            cacheArgs: [`${scrapeDir}/cryptocompare-coinlist/data.json`, 'all'],
            getJobs(queue, bootstrapData) {
              queue.push({
                uri: 'https://min-api.cryptocompare.com/data/all/coinlist',
                key: `${scrapeDir}/cryptocompare-coinlist/data.json`,
                cacheForDays: 0
              });
            },
            formatter: formatterCryptocompareSectionCoinlist
          },
          {
            //
            // EXCHANGES
            // Get all the exchanges that CryptoCompare has integrated with
            //
            // TODO: separate into exchangesList & exchangesGeneral & have 2 formatters, then we don't need the glob
            // and we can keep the default data.json
            //
            name: 'exchanges-list',
            event: 'data,store',
            interval: 1000 * 60 * 1,
            // TODO: rename this fucking bit, this is where the watcher will look for files to load
            // so if we are saving them in different places they will never be added!
            cacheArgs: [settings.keyCryptocompareExchangesList, 'all'],
            getJobs(queue, bootstrapData) {
              queue.push({uri: settings.uriCryptocompareExchangesList, key: settings.keyCryptocompareExchangesList, cacheForDays: 0});
            },
            formatter: formatterCryptocompareSectionExchangesList
          },
          {
            name: 'exchanges-general',
            event: 'data,store',
            interval: 1000 * 60 * 60,
            cacheArgs: [settings.keyCryptocompareExchangesGeneral, 'all'],
            getJobs(queue, bootstrapData) {
              queue.push({uri: settings.uriCryptocompareExchangesGeneral, key: settings.keyCryptocompareExchangesGeneral, cacheForDays: 0});
            },
            formatter: formatterCryptocompareSectionExchangesGeneral
          },
          {
            //
            // TopTotalVolume
            //
            name: 'totalVolFull',
            event: 'data',
            interval: 1000 * 10,
            cacheArgs: [settings.tagKeyCryptocompareTotalVolFullGrouped`${{}}`, 'all'],
            getJobs: getJobsCryptocompareSectionTotalVolFull,
            handler(oldData, newData) {
              const merged = {...oldData, ...newData};
              return merged;
            },
            formatter: formatterCryptocompareSectionTotalVolFull
          }
        ]
      },
      xe: {
        cacheFor: 0,
        rateLimitDelayMs: 1000 * 60 * 60 * 24,
        bootstrap: () => {return {}},
        sections: [
          {
            name: 'currency',
            event: 'data',
            interval: 1000 * 60 * 60 * 24,
            cacheArgs: [settings.tagKeyXeCurrencyTables`${'USD'}`, 'all'],
            getJobs(queue, bootstrapData) {
              queue.push({
                uri: settings.tagUriXeCurrencyTables`${'USD'}`,
                key: settings.tagKeyXeCurrencyTables`${'USD'}`,
                cacheForDays: 0
              });
            },
            formatter: formatterXeSectionCurrency
          }
        ]
      }
    }
  });

}

catch (error) {

  logger.error(`Um some error happened yo: ${error}`);
  process.exit(1);

}
