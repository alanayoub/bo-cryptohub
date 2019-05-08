/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/polyfill */ "@babel/polyfill");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bo_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bo-datatable */ "bo-datatable");
/* harmony import */ var bo_datatable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bo_datatable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bo-utils */ "bo-utils");
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bo_utils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings */ "./src/settings.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_data_on_handle_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/data-on-handle-data */ "./src/utils/data-on-handle-data.js");
/* harmony import */ var _utils_store_on_handle_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/store-on-handle-data */ "./src/utils/store-on-handle-data.js");
/* harmony import */ var _utils_data_on_before_emit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/data-on-before-emit.js */ "./src/utils/data-on-before-emit.js");
/* harmony import */ var _utils_store_on_before_emit_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/store-on-before-emit.js */ "./src/utils/store-on-before-emit.js");
/* harmony import */ var _utils_formatter_cryptocompare_bootstrap_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/formatter-cryptocompare-bootstrap.js */ "./src/utils/formatter-cryptocompare-bootstrap.js");
/* harmony import */ var _utils_formatter_cryptocompare_bootstrap_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_utils_formatter_cryptocompare_bootstrap_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_formatter_cryptocompare_section_price_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/formatter-cryptocompare-section-price.js */ "./src/utils/formatter-cryptocompare-section-price.js");
/* harmony import */ var _utils_formatter_cryptocompare_section_price_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_utils_formatter_cryptocompare_section_price_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_formatter_cryptocompare_section_coinlist_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/formatter-cryptocompare-section-coinlist.js */ "./src/utils/formatter-cryptocompare-section-coinlist.js");
/* harmony import */ var _utils_formatter_cryptocompare_section_coinlist_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_utils_formatter_cryptocompare_section_coinlist_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils_formatter_cryptocompare_section_exchanges_list_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/formatter-cryptocompare-section-exchanges-list.js */ "./src/utils/formatter-cryptocompare-section-exchanges-list.js");
/* harmony import */ var _utils_formatter_cryptocompare_section_exchanges_general_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/formatter-cryptocompare-section-exchanges-general.js */ "./src/utils/formatter-cryptocompare-section-exchanges-general.js");
/* harmony import */ var _utils_formatter_cryptocompare_section_exchanges_general_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_utils_formatter_cryptocompare_section_exchanges_general_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utils_formatter_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/formatter-cryptocompare-section-total-vol-full.js */ "./src/utils/formatter-cryptocompare-section-total-vol-full.js");
/* harmony import */ var _utils_formatter_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_utils_formatter_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _utils_formatter_xe_section_currency_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/formatter-xe-section-currency.js */ "./src/utils/formatter-xe-section-currency.js");
/* harmony import */ var _utils_formatter_xe_section_currency_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_utils_formatter_xe_section_currency_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _utils_formatter_messari_section_metrics_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/formatter-messari-section-metrics.js */ "./src/utils/formatter-messari-section-metrics.js");
/* harmony import */ var _utils_get_jobs_cryptocompare_section_price_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/get-jobs-cryptocompare-section-price.js */ "./src/utils/get-jobs-cryptocompare-section-price.js");
/* harmony import */ var _utils_get_jobs_cryptocompare_section_price_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_utils_get_jobs_cryptocompare_section_price_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _utils_get_jobs_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utils/get-jobs-cryptocompare-section-total-vol-full.js */ "./src/utils/get-jobs-cryptocompare-section-total-vol-full.js");
/* harmony import */ var _utils_get_jobs_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_utils_get_jobs_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _utils_get_jobs_messari_section_metrics_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/get-jobs-messari-section-metrics.js */ "./src/utils/get-jobs-messari-section-metrics.js");
/* harmony import */ var _utils_get_jobs_messari_section_metrics_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_utils_get_jobs_messari_section_metrics_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _utils_analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/analytics-merge-data-by-key */ "./src/utils/analytics-merge-data-by-key.js");
/* harmony import */ var _utils_analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_utils_analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_20__);
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


// Libs


// Binary Overdose Projects



// CryptoHub


// Handlers





// Formatters









// Job fetchers




// Other utils


const logger = __webpack_require__(/*! ./logger */ "./src/logger.js");
const { scrapeDir } = _settings__WEBPACK_IMPORTED_MODULE_4___default.a;

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
    formatter: _utils_formatter_cryptocompare_section_coinlist_js__WEBPACK_IMPORTED_MODULE_11___default.a
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
    watchDirs: [_settings__WEBPACK_IMPORTED_MODULE_4___default.a.keyCryptocompareExchangesList, 'all'],
    getJobs(queue, bootstrapData) {
      queue.push({uri: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.uriCryptocompareExchangesList, key: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.keyCryptocompareExchangesList, cacheForDays: 0});
    },
    formatter: _utils_formatter_cryptocompare_section_exchanges_list_js__WEBPACK_IMPORTED_MODULE_12__["default"]
  };

  //
  // EXCHANGES GENERAL
  //
  const cryptocompareExchangesGeneral = {
    event: 'data,store',
    name: 'exchanges-general',
    interval: 1000 * 60 * 60,
    watchDirs: [_settings__WEBPACK_IMPORTED_MODULE_4___default.a.keyCryptocompareExchangesGeneral, 'all'],
    getJobs(queue, bootstrapData) {
      queue.push({uri: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.uriCryptocompareExchangesGeneral, key: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.keyCryptocompareExchangesGeneral, cacheForDays: 0});
    },
    formatter: _utils_formatter_cryptocompare_section_exchanges_general_js__WEBPACK_IMPORTED_MODULE_13___default.a
  };

  //
  // TOP TOTAL VOLUME
  //
  const cryptocompareTopTotalVolume = {
    event: 'data',
    name: 'totalVolFull',
    interval: 1000 * 10,
    watchDirs: [_settings__WEBPACK_IMPORTED_MODULE_4___default.a.tagKeyCryptocompareTotalVolFullGrouped`${{}}`, 'all'],
    getJobs: _utils_get_jobs_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_18___default.a,
    handler(oldData, newData) {
      const merged = {...oldData, ...newData};
      return merged;
    },
    formatter: _utils_formatter_cryptocompare_section_total_vol_full_js__WEBPACK_IMPORTED_MODULE_14___default.a
  };

  //
  // XE CURRENCY
  //
  const xeCurrency = {
    event: 'data',
    name: 'currency',
    interval: 1000 * 60 * 60 * 24,
    watchDirs: [_settings__WEBPACK_IMPORTED_MODULE_4___default.a.tagKeyXeCurrencyTables`${'USD'}`, 'all'],
    getJobs(queue, bootstrapData) {
      queue.push({
        uri: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.tagUriXeCurrencyTables`${'USD'}`,
        key: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.tagKeyXeCurrencyTables`${'USD'}`,
        cacheForDays: 0
      });
    },
    formatter: _utils_formatter_xe_section_currency_js__WEBPACK_IMPORTED_MODULE_15___default.a
  };

  //
  // MESSARI METRICS
  //
  const messariMetrics = {
    event: 'data',
    name: 'messari-metrics',
    interval: 1000 * 5,
    watchDirs: [`${scrapeDir}/messari-metric/**/*`, 'all'],
    getJobs: _utils_get_jobs_messari_section_metrics_js__WEBPACK_IMPORTED_MODULE_19___default.a,
    formatter: _utils_formatter_messari_section_metrics_js__WEBPACK_IMPORTED_MODULE_16__["default"],
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

  function getFirstXRows(data, numRows) {

    let id;
    let ids;
    let rows;
    let output = {};

    const idField = 'cc-total-vol-full-Id';
    const volField = 'cc-total-vol-full-TOTALVOLUME24HTO';

    rows = Object
      .values(data)
      .sort((a, b) => b[volField] - a[volField])
      .splice(0, numRows);

    ids = rows.map(a => a[idField]);
    for (id of ids) output[id] = data[id];
    return output;
  }

  let initData = {};
  const dataTable = new bo_datatable__WEBPACK_IMPORTED_MODULE_2___default.a({

    dbDir: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.dbDir,
    cacheDir: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.cacheDir,
    generatedDir: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.generatedDir,

    server: {
      pub: Object(path__WEBPACK_IMPORTED_MODULE_0__["join"])(__dirname, '../dist/public'),
      port: 3001,
      index: '../dist/index.html',
    },

    //
    // TODO
    //
    // This is where you were.
    // make app wide bootstrap work, and clip data by maxRows or whatever its called.
    //
    bootstrap: _utils_formatter_cryptocompare_bootstrap_js__WEBPACK_IMPORTED_MODULE_9___default.a,

    events: {
      data: {
        onBeforeHandleData: _utils_analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_20___default.a,
        onHandleData: Object(bo_utils__WEBPACK_IMPORTED_MODULE_3__["partialApplication"])(_utils_data_on_handle_data__WEBPACK_IMPORTED_MODULE_5__["default"], {}),
        onAfterConnect(event, socket, data) {
          socket.emit(event, Object(_utils_data_on_before_emit_js__WEBPACK_IMPORTED_MODULE_7__["default"])({diff: false}, data, initData));
        },
        onBeforeEmit: Object(bo_utils__WEBPACK_IMPORTED_MODULE_3__["partialApplication"])(_utils_data_on_before_emit_js__WEBPACK_IMPORTED_MODULE_7__["default"], {}),
        onBeforeBootstrapSave: data => {
          initData = getFirstXRows(data, _settings__WEBPACK_IMPORTED_MODULE_4___default.a.maxRowsTemplatedIn);
          if (!_settings__WEBPACK_IMPORTED_MODULE_4___default.a.maxRowsTemplatedIn) return data;
          return initData;
        }
      },
      store: {
        onBeforeHandleData: data => data,
        onHandleData: Object(bo_utils__WEBPACK_IMPORTED_MODULE_3__["partialApplication"])(_utils_store_on_handle_data__WEBPACK_IMPORTED_MODULE_6__["default"], {}),
        onAfterConnect(event, socket, data) {
          socket.emit(event, Object(_utils_store_on_before_emit_js__WEBPACK_IMPORTED_MODULE_8__["default"])({diff: false}, data, {}));
        },
        onBeforeEmit: Object(bo_utils__WEBPACK_IMPORTED_MODULE_3__["partialApplication"])(_utils_store_on_before_emit_js__WEBPACK_IMPORTED_MODULE_8__["default"], {}),
        onBeforeBootstrapSave: (data) => {
          return data;
        }
      }
    },

    scrapeSites: {
      cryptocompare: {
        cacheFor: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.cacheForCryptocompare,
        bootstrap: _utils_formatter_cryptocompare_bootstrap_js__WEBPACK_IMPORTED_MODULE_9___default.a,
        rateLimitDelayMs: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.rateLimitCryptocompare,
        sections: [
          cryptocompareCoinlist,
          cryptocompareExchangesList,
          cryptocompareExchangesGeneral,
          cryptocompareTopTotalVolume,
        ]
      },
      messari: {
        cacheFor: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.cacheForMessari,
        bootstrap: cache => {
          return {}
        },
        rateLimitDelayMs: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.rateLimitMessari,
        sections: [
          messariMetrics
        ]
      },
      xe: {
        cacheFor: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.cacheForXe,
        bootstrap: () => {return {}},
        rateLimitDelayMs: _settings__WEBPACK_IMPORTED_MODULE_4___default.a.rateLimitXe,
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


/***/ }),

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Libs
const winston = __webpack_require__(/*! winston */ "winston");

// Cryptohub
const settings = __webpack_require__(/*! ./settings */ "./src/settings.js");

//
// {error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5}
//
const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  exitOnError: false,
  transports: [
    new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    // new winston.transports.File({filename: 'logs/debug.log', level: 'debug'}),
    // new winston.transports.File({filename: 'logs/info.log', level: 'info'}),
  ]
});

if (settings.logger) {
  logger.add(
    new winston.transports.Console({
      filename: 'logs/console.log',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'})
      ),
      level: 'info'
    })
  );
}

module.exports = logger;


/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Node
const path = __webpack_require__(/*! path */ "path");

// Libs
const argv = __webpack_require__(/*! argv */ "argv");

// Settings
global.githubClientId = 'c7a2c111a27dee50bba0';
global.githubClientSecret = '5e4b8b348c8165536391bdbf6041685f270503f0';

// Cache for days
// global.cacheForXe = 1;
global.cacheForGitlog = 7;
global.cacheForGithubRepo = 7;
global.cacheForGithubForks = 30;
// global.cacheForCryptocompare = 30;
// global.cacheForCoinmarketcap = 30;
// global.cacheForCoinmarketcapProjectsJson = 1;
// global.cacheForCoinmarketcapProjectHtml = 30;

// Leave in execution order
global.settingsScrapeCryptocompare = true;
global.settingsScrapeCoinmarketcap = false;
global.settingsScrapeXe = false;
// global.settingsGetRepoData = true;
// global.settingsCloneRepos = true;
// global.settingsGetLogData = true;
// global.settingsGetForkData = true;
// global.settingsSetFirstCommit = true;
// global.settingsSyncCommits = true;
// global.settingsHashFiles = true;

// Stuff we found while parsing the data
global.notes = [];

// Bitbucket :/
// Ardor: https://bitbucket.org/Jelurida/ardor/src
// NXT: https://bitbucket.org/JeanLucPicard/nxt/src
global.githubOverrides = {
  'gas':                   'https://github.com/neo-project',
  'kin':                   'https://github.com/kinecosystem',
  'tenx':                  'https://github.com/tenx-tech',
  'gnosis':                'https://github.com/gnosis',
  'aragon':                'https://github.com/aragon/aragon-network-token',
  'funfair':               'https://github.com/funfair-tech',
  'basic-attention-token': 'https://github.com/brave-intl',
}

const args = argv.option([
  {
    name: 'local',
    short: 'l',
    type: 'boolean',
    description: 'Changes required to mimic development build locally',
    example: `'script --local=true' or 'script -l true'`
  },
  {
    name: 'logger',
    short: 'L',
    type: 'boolean',
    description: 'Log to console',
    example: `'script --logger=true' or 'script -L true'`
  }
]).run();

const isProd =  false && false;

const cacheDir = isProd
  ? '/home/ubuntu/cryptohub-cache'
  : path.join(__dirname, '/../cache');

const generatedDir = `${cacheDir}/tmp-generated`;
const scrapeDir    = `${cacheDir}/tmp-scrape`;
const dbDir        = `${cacheDir}/db`;

const cryptocompareApiKey = 'b3ad47012cc134911a4775d955ef2b9cf8b85f54d383d81c1bf77338a59b1222';

let fieldWhitelist = [

  'cc-total-vol-full-Id',
  'cc-total-vol-full-FullName',
  'cc-total-vol-full-PRICE',
  'cc-total-vol-full-CHANGEPCTDAY',
  'cc-total-vol-full-TOTALVOLUME24HTO',
  'cc-total-vol-full-MKTCAP',
  'cc-total-vol-full-SUPPLY',
  'cc-total-vol-full-ProofType',
  'cc-total-vol-full-Algorithm',
  'cc-total-vol-full-NetHashesPerSecond',
  'cc-total-vol-full-ImageUrl',

  'cc-coinlist-Symbol',

  'm-metrics-sectors',
  // 'm-metrics-categories',
  // 'm-metrics-date-created',
  'm-metrics-ath-price',
  // 'm-metrics-ath-date',
  // 'm-metrics-ath-days',
  // 'm-metrics-ath-percent-down',
  // 'm-metrics-ath-breakeven-multiple',
  'm-metrics-cycle-low-price',
  // 'm-metrics-cycle-low-data',
  // 'm-metrics-cycle-low-percent-up',
  // 'm-metrics-cycle-low-days-since',
  // 'm-metrics-percent-change-last-1-week',
  // 'm-metrics-percent-change-last-1-month',
  // 'm-metrics-percent-change-last-3-months',
  // 'm-metrics-percent-change-last-1-year',
  'm-metrics-percent-change-btc-last-1-week',
  // 'm-metrics-percent-change-btc-last-1-month',
  // 'm-metrics-percent-change-btc-last-3-months',
  // 'm-metrics-percent-change-btc-last-1-year',

  'cc-total-vol-full-PRICE:last',
  'cc-total-vol-full-TOTALVOLUME24HTO:last',
  'cc-total-vol-full-MKTCAP:last',

  'cryptohub-price-btc',
  'cryptohub-price-history',
  'cryptohub-numberOfExchanges',
  'cryptohub-numberOfPairs',
  'cryptohub-numberOfFiatPairs',
  'cryptohub-numberOfFiatCurrencies',

  'cryptohub-exchangesListDex',
  'cryptohub-exchangesListAcceptsBoth',
  'cryptohub-exchangesListCryptoOnly',

  'cryptohub-price-btc:last',

];

// Keep the last value of each of these fields
// in a new field with the suffix `:last`
const fieldLastValue = [

  'cc-total-vol-full-PRICE',
  'cc-total-vol-full-TOTALVOLUME24HTO',
  'cc-total-vol-full-MKTCAP',
  'cryptohub-price-btc',

];

fieldWhitelist = [...fieldWhitelist, ...fieldWhitelist.map(v => v +='-timestamp')];

/**
 *
 *  uriCryptocompareList:
 *    Returns all the coins that CryptoCompare has added to the website
 *
 *  uriCryptocompareExchanges:
 *    Returns all the exchanges that CryptoCompare has integrated with and their status,
 *    including whether or not they are excluded from pricing and volumes
 *
 *  tagUriCryptocompareTradingInfoSingle:
 *    Compute the current trading info (price, vol, open, high, low etc) of the
 *    requested pair as a volume weighted average based on the exchanges requested
 *
 *
 *
 *  tagUriCryptocompareSnapshot:
 *    Get the general, subs (used to connect to the streamer and to figure out what exchanges we have
 *    data for and what are the exact coin pairs of the coin) and the aggregated prices for all pairs available
 *
 *  tagUriCryptocompareSocialstats:
 *    Get CryptoCompare website, Facebook, code repository, Twitter and Reddit data for coins
 *    If called with the id of a cryptopian you just get data from Cryptocompare website that is available to the public
 *
 */
const settings = {

  //
  // App settings
  //
  debug:                                       true, // TODO: Change this to an env var
  logger:                                      args.options.logger || false,
  maxRowsTemplatedIn:                          50,
  maxRecordsScraped:                           400,

  // The diff-json library has a bug where null field throw an error on add.
  // For now we are just not going to send null fields, lightens the load anyhow.
  removeNullFields: true,

  //
  // Directories & Paths
  //
  dbDir,
  appRoot:                                     path.resolve(__dirname),
  cacheDir,
  scrapeDir,
  generatedDir,

  //
  // Lists
  //
  fieldWhitelist,
  fieldLastValue,

  //
  // Cache
  // NOTE: we dont really need this if we are using rate limits. Using it for dev though
  //
  cacheForXe:                                  isProd ? 0 : 1000 * 60 * 10,
  cacheForMessari:                             isProd ? 0 : 1000 * 60 * 10,
  cacheForCryptocompare:                       isProd ? 0 : 1000 * 60 * 10,

  //
  // RateLimits
  //

  //
  // From cryptocompare.com:
  //   Caching: 10 seconds
  //   Rate limits:
  //     Month  - 100000
  //     Day    - 3200
  //     Hour   - 130
  //     Minute - 2
  //     Second - 0.038
  //
  //  26784 ms between requests :(
  //
  rateLimitCryptocompare:                      26784,

  // Unknow at the moment
  rateLimitMessari:                            1000 * 10,

  rateLimitXe:                                 1000 * 60 * 60 * 24,

  //
  // Queues
  //
  queueCoinmarketcap:                          1000 * 60 * 60,

  //
  // Messari
  //
  tagUriMessariMetrics:                        (str, id) => `https://data.messari.io/api/v1/assets/${id}/metrics`,
  tagKeyMessariMetrics:                        (str, id) => `${scrapeDir}/messari-metric/${id}/data.json`,
  tagKeyMessariMetricsGrouped:                 (str, ob) => `${scrapeDir}/messari-metric-grouped/data.json`,

  //
  // Cryptocompare
  //

  tagUriCryptocompareTotalVolFull:             (str, ob) => `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${ob.limit}&tsym=USD&page=${ob.page}`,
  tagKeyCryptocompareTotalVolFull:             (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull/page-${ob.page}.json`,
  tagKeyCryptocompareTotalVolFullGrouped:      (str, ob) => `${scrapeDir}/cryptocompare-totalvolfull-grouped/data.json`,

  uriCryptocompareList:                        'https://min-api.cryptocompare.com/data/all/coinlist',
  keyCryptocompareList:                        `${scrapeDir}/cryptocompare-coinlist/data.json`,

  uriCryptocompareExchangesList:               'https://min-api.cryptocompare.com/data/v2/all/exchanges',
  keyCryptocompareExchangesList:               `${scrapeDir}/cryptocompare-exchanges-list/data.json`,
  uriCryptocompareExchangesGeneral:            `https://min-api.cryptocompare.com/data/exchanges/general?api_key=${cryptocompareApiKey}`,
  keyCryptocompareExchangesGeneral:            `${scrapeDir}/cryptocompare-exchanges-general/data.json`,

  // uriCryptocompareExchangeStatus:              'https://min-api.cryptocompare.com/data/all/cccaggexchanges',
  // keyCryptocompareExchangeStatus:              `${scrapeDir}/cryptocompare-exchange-status/data.json`,

  tagUriCryptocompareTradingInfoSingle:        (str, ob) => `https://min-api.cryptocompare.com/data/generateAvg?fsym=${ob.symbol1}&tsym=${ob.symbol2}&e=${ob.exchange}`,
  tagKeyCryptocompareTradingInfoSingle:        (str, ob) => `${scrapeDir}/cryptocompare-exchange/${ob.exchange}-pairs-${ob.symbol1}-${ob.symbol2}.json`,
  tagKeyCryptocompareTradingInfoSingleGrouped: (str, ob) => `${scrapeDir}/cryptocompare-exchange-grouped/data.json`,

  tagUriCryptocompareTradingInfoMulti:         (str, ob) => `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ob.list1}&tsyms=${ob.list2}&e=${ob.exchange || 'CCCAGG'}`,
  tagKeyCryptocompareTradingInfoMulti:         (str, ob) => `${scrapeDir}/cryptocompare-trading-info-${ob.exchange || 'CCCAGG'}/${ob.cacheKey}.json`,
  tagKeyCryptocompareTradingInfoMultiGrouped:  (str, ob) => `${scrapeDir}/cryptocompare-trading-info-${ob.exchange || 'CCCAGG'}-grouped/data.json`,
  limitsCryptocompareTradingInfoMultiArr1:     300,
  limitsCryptocompareTradingInfoMultiArr2:     100,

  tagUriCryptocompareSnapshot:                 (str, id) => `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${id}`,
  tagKeyCryptocompareSnapshot:                 (str, id) => `${scrapeDir}/cryptocompare-snapshot/${id}.json`,
  tagKeyCryptocompareSnapshotGrouped:          (str, ob) => `${scrapeDir}/cryptocompare-snapshot-grouped/data.json`,

  tagUriCryptocompareSocialstats:              (str, id) => `https://www.cryptocompare.com/api/data/socialstats/?id=${id}`,
  tagKeyCryptocompareSocialstats:              (str, id) => `${scrapeDir}/cryptocompare-socialstats/${id}.json`,
  tagKeyCryptocompareSocialStatsGrouped:       (str, ob) => `${scrapeDir}/cryptocompare-socialstats-grouped/data.json`,

  //
  // Coinmarketcap
  //
  // tagUriCoinmarketcapTicker:                   (str, ob) => `https://api.coinmarketcap.com/v2/ticker/?start=${ob.start || 0}&limit=${ob.limit || 100}&sort=${ob.sort || 'id'}`,
  // tagKeyCoinmarketcapTicker:                   (str, ob) => `/coinmarketcap/ticker/${ob.cacheKey}.json`,
  // tagKeyCoinmarketcapTickerGrouped:            (str, ob) => `/coinmarketcap/ticker-grouped/data.json`,

  // uriCoinmarketcapList:                        'https://api.coinmarketcap.com/v2/listings/',
  // keyCoinmarketcapList:                        '/coinmarketcap/search/coins.json',
  // tagUriCoinmarketcapDetailsJSON:              (str, id) => `https://api.coinmarketcap.com/v2/ticker/${id}/`,
  // tagUriCoinmarketcapDetailsHTML:              (str, id) => `https://coinmarketcap.com/currencies/${id}/`,
  // tagKeyCoinmarketcapDetailsJSON:              (str, id) => `/coinmarketcap/details/${id}.json`,
  // tagKeyCoinmarketcapDetailsHTML:              (str, id) => `/coinmarketcap/details/${id}.html`,

  //
  // XE
  //
  tagUriXeCurrencyTables:                      (str, id) => `https://xe.com/currencytables/?from=${id}`,
  tagKeyXeCurrencyTables:                      (str, id) => `${scrapeDir}/xe-currencytables/${id}.html`,

  //
  // ISO
  //
  uriISO4217CurrencyCodes:                     `${path.resolve(__dirname)}/../iso/4217.txt`,

}

module.exports = settings;


/***/ }),

/***/ "./src/utils/analytics-merge-data-by-key.js":
/*!**************************************************!*\
  !*** ./src/utils/analytics-merge-data-by-key.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 *
 * NOTE: -- Comments need updateing --
 * Takes and array of data objects and returns an object
 * with the items identified via their keys
 * If any two keys are the same it merges the data and
 * the second item overrides the first
 *
 * @param {Object} data
 * @return {Object}
 *
 */
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");
module.exports = function mergeDataByKey(data) {
  try {
    const dataArray = Object.values(data);
    const result = {};
    for (const data of dataArray) {
      if (!data) {
        logger.warn(`mergeDataByKey: data should not be ${data}, skipping`);
        continue;
      }
      for (const [key, val] of Object.entries(data)) {
        if (!result[key]) result[key] = {};
        Object.assign(result[key], val);
      }
    }
    return result;
  }
  catch(error) {
    logger.error(`mergeDataByKey: ${error}`);
    if (true) debugger;
    return false;
  }
}


/***/ }),

/***/ "./src/utils/data-on-before-emit.js":
/*!******************************************!*\
  !*** ./src/utils/data-on-before-emit.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dataOnBeforeEmit; });
/* harmony import */ var bo_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bo-datatable */ "bo-datatable");
/* harmony import */ var bo_datatable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bo_datatable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_1__);


// Binary Overdose Projects


// CryptoHub


/**
 *
 * If these fields dont exist in a record the record
 * is useless to use at this time
 *
 */
function validData(item) {
  return !(
       item['cc-total-vol-full-TOTALVOLUME24HTO'] === 0
    || item['cc-total-vol-full-PRICE'] === void 0
    || item['cc-total-vol-full-Id'] === void 0
  )
}

/**
 *
 * We only want to display records that are updated regularly
 * Sometimes we will have some that have poped up into
 * the top x that we display and then dissappear  again. They
 * should be filtered out
 *
 */
function isFresh(item) {
  const now = +new Date();
  const longestAge = 1000 * 60 * 60 * 24;
  const timestamp = +new Date(item['cc-total-vol-full-PRICE-timestamp']);
  return now - timestamp < longestAge;
}

/**
 *
 * Remove bad records
 * Remove fields that are not currently used
 *
 * @param {Object} data
 * @return {Object}
 *
 */
function filterData(data) {

  let key;
  let item;
  let field;
  let fields;
  const whitelist = _settings__WEBPACK_IMPORTED_MODULE_1___default.a.fieldWhitelist;

  for ([key, item] of Object.entries(data)) {
    if (!validData(item) || !isFresh(item)) {
      // remove record
      delete data[key];
    }
    else {
      // remove fields that are not being used
      fields = Object.keys(data[key]);
      for (field of fields) {
        if (!whitelist.includes(field) || (_settings__WEBPACK_IMPORTED_MODULE_1___default.a.removeNullFields && data[key][field] === null)) {
          delete data[key][field];
          delete data[key][`${field}-timestamp`];
        }
      }
    }
  }

  return data;

}

/**
 *
 *
 *
 */
function dataOnBeforeEmit(options, newData, oldData) {

  const type = options.diff !== false ? 'changeset' : 'full';
  let data = filterData(newData);

  if (type === 'changeset') {
    data = bo_datatable__WEBPACK_IMPORTED_MODULE_0___default.a.diff(oldData, data);
  }

  data = JSON.stringify({data, type});

  return data;

}


/***/ }),

/***/ "./src/utils/data-on-handle-data.js":
/*!******************************************!*\
  !*** ./src/utils/data-on-handle-data.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dataOnHandleData; });
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bo-utils */ "bo-utils");
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bo_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger */ "./src/logger.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_2__);
// Binary Overdose







// Cryptohub util functions



/**
 *
 * Timeseries Rescale
 *
 * @param {Array} timeseries - Array of timeseries objects
 * @return {Array} - Array of updated timeseries object
 *
 */
function getNewTimeseriesData(item, limit = 50, maxAge = 1000 * 60 * 60 * 24 * 7) {

  const price      = item['cc-total-vol-full-PRICE'];
  const volume     = item['cc-total-vol-full-TOTALVOLUME24HTO'];
  const timestamp  = item['cc-total-vol-full-PRICE-timestamp'];
  const timeseries = item['cryptohub-price-history'] || [];
  if (timeseries[0] && timeseries[0].timestamp === null) timeseries.splice(0, 1);
  if (!price || !volume || !timestamp) {
    return timeseries;
  }

  Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["timeseriesPrune"])(timeseries, maxAge);
  Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["timeseriesThin"])(timeseries, limit);

  const last = timeseries[timeseries.length - 1];
  const next = {price, volume, timestamp: +new Date(timestamp)};
  if (JSON.stringify(last) !== JSON.stringify(next)) timeseries.push(next);

  return timeseries;

}

//
//
//
function priceInBitcoin(oldData = {}, newData, bitcoinPrice) {

  const output = {};
  const cryptoPrice = newData['cc-total-vol-full-PRICE'];
  const cryptoPriceTimestamp = newData['cc-total-vol-full-PRICE-timestamp'];

  if (bitcoinPrice && cryptoPrice) {

    const field = 'cryptohub-price-btc';

    // output.price = 1 / (bitcoinPrice / cryptoPrice); // btc
    output.price = Math.ceil((1 / (bitcoinPrice / cryptoPrice)) * 100000000); // sats

    if (_settings__WEBPACK_IMPORTED_MODULE_2___default.a.fieldLastValue.includes(field)) {
      output.lastPrice = oldData[field];
    }

    output.timestamp = +new Date(cryptoPriceTimestamp);

  }

  return output;

}

function getBitcoinPrice(data) {
  return data[1182] ? data[1182]['cc-total-vol-full-PRICE'] : false;
}

/**
 *
 * ADD CRYPTOHUB FIELDS
 *
 */
function addCryptohubFields(oldData, data) {

  function lastValueField(oldData, newData, field) {
    if (_settings__WEBPACK_IMPORTED_MODULE_2___default.a.fieldLastValue.includes(field)) {
      newData[`${field}:last`] = oldData[field];
    }
  }

  function timestampField(data, field) {
    const timestamp = +new Date(data['cc-total-vol-full-PRICE-timestamp']);
    data[`${field}-timestamp`] = timestamp;
  }


  let key;
  let item;
  const bitcoinPrice = getBitcoinPrice(data);
  for ([key, item] of Object.entries(data)) {

    // Timeseries
    const timeseries = getNewTimeseriesData(item);
    if (timeseries) item['cryptohub-price-history'] = timeseries;

    // Bitcoin price
    const { price, lastPrice, timestamp } = priceInBitcoin(oldData[key], item, bitcoinPrice);
    if (price)               item['cryptohub-price-btc']           = price;
    if (price !== lastPrice) item['cryptohub-price-btc:last']      = lastPrice;
    if (timestamp)           item['cryptohub-price-btc-timestamp'] = timestamp;

    // Circulating percent total
    const supplyTotal       = item['cc-coinlist-TotalCoinSupply'];
    const supplyCirculating = item['cc-total-vol-full-SUPPLY'];
    item['cryptohub-circulating-percent-total'] = (supplyCirculating / supplyTotal) * 100;

  }

  return data;

}

/**
 *
 * Backfill and format data
 *
 * When running a new instance of the ap the datastore starts off empty.
 * Some data takes longer to scrape than other therefore some items in the
 * datastore will stay empty for a while. To prevent this we backfill the datastore
 * with the last output datasource if any of the stores are empty
 *
 * NOTE:
 *   Regarding packing and diffing data
 *   We should never save packed data or data diffs
 *   We should only ever emit packed data or data diffs so knowing that
 *   all data we work with here should be full datasets of unpacked data
 *
 * @param {Object} [options]
 * @param {Object} data
 * @param {} cache
 *
 */
function dataOnHandleData(options = {}, data, cache, oldData = {}, appBootstrapData) {
  try {

    let newData = data;

    //
    // Backfill new data with old data
    //
    // NOTE:
    // We still need to do this even when we are emitting
    // a diff because the whole data should be available to be
    // used by functions like `addCryptohubFields()`
    for (let id of Object.keys(oldData)) {
      newData[id] = Object.assign({}, oldData[id], newData[id]);
      for (let field of _settings__WEBPACK_IMPORTED_MODULE_2___default.a.fieldLastValue) {
        if (oldData[id][field] !== newData[id][field]) {
          newData[id][`${field}:last`] = oldData[id][field];
        }
      }
    }

    // Add custom cryptohub fields
    newData = addCryptohubFields(oldData, newData);

    // Save file (the watcher will pick it up and emit it)
    const fileName = `${_settings__WEBPACK_IMPORTED_MODULE_2___default.a.generatedDir}/data/data.json`;
    cache.set(fileName, JSON.stringify(newData));

    // Create a list of x (settins.maxRecordsScraped) sorted symbols
    // We are doing this here as we don't the sort cryteria before this point
    let firstXSymbols;
    {
      const arr = [];
      const limit = _settings__WEBPACK_IMPORTED_MODULE_2___default.a.maxRecordsScraped;
      const fieldVol = 'cc-total-vol-full-TOTALVOLUME24HTO';
      const fieldSymbol = 'cc-coinlist-Symbol';
      const fieldTrading = 'cc-coinlist-IsTrading';
      let key;
      let item;
      for ([key, item] of Object.entries(newData)) {
        if (item[fieldTrading] === false) {
          delete newData[key]
        }
        else if (!item[fieldVol]) {
          // do nothing
        }
        else {
          arr.push(item);
        }
      }
      arr.sort((a, b) => b[fieldVol] - a[fieldVol]);
      firstXSymbols = arr.splice(0, limit).map(x => x[fieldSymbol]);
    }
    appBootstrapData.firstXSymbols = firstXSymbols;

  }
  catch(error) {
    const message = `dataOnHandleData(): ${error}`;
    _logger__WEBPACK_IMPORTED_MODULE_1___default.a.error(message);
    if (true) debugger;
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/formatter-cryptocompare-bootstrap.js":
/*!********************************************************!*\
  !*** ./src/utils/formatter-cryptocompare-bootstrap.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Cryptohub
const logger     = __webpack_require__(/*! ../logger */ "./src/logger.js");
const settings   = __webpack_require__(/*! ../settings */ "./src/settings.js");
const scrapeJSON = __webpack_require__(/*! ./scrape-json.js */ "./src/utils/scrape-json.js");

/**
 *
 * COINLIST
 *
 * Original Data
 * -------------
 *
 * Algorithm            : "SHA256"
 * BuiltOn              : "N/A"
 * CoinName             : "Bitcoin"
 * FullName             : "Bitcoin (BTC)"
 * FullyPremined        : "0"
 * Id                   : "1182"
 * ImageUrl             : "/media/19633/btc.png"
 * IsTrading            : true
 * Name                 : "BTC"
 * PreMinedValue        : "N/A"
 * ProofType            : "PoW"
 * SmartContractAddress : "N/A"
 * SortOrder            : "1"
 * Sponsored            : false
 * Symbol               : "BTC"
 * TotalCoinSupply      : "21000000"
 * TotalCoinsFreeFloat  : "N/A"
 * Url                  : "/coins/btc/overview"
 *
 * Prefix fields with "cc-coinlist-"
 * ----------------------------------
 * Algorithm -> cc-coinlist-Algorithm
 *
 * @param {String?} data
 * @param {String?} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
module.exports = async function formatterCryptocompareBootstrap(cache) {
  try {


    // Get coinList
    let coinList;
    try {
      coinList = await scrapeJSON(settings.uriCryptocompareList, settings.keyCryptocompareList, 0, cache);
      coinList = typeof coinList === 'string' ? JSON.parse(coinList).Data : coinList.Data;
    }
    catch (error) {
      logger.error(`formatter-cryptocompare-bootstrap: [Error scraping coinList] | ${error}`);
    }

    // // Get old data
    // let oldData;
    // try {
    //   const path = `${settings.dbDir}/data/data.json`;
    //   oldData = JSON.parse(cache.get(path)[0]);
    //   debugger;
    // }
    // catch(error) {
    //   logger.error(`formatter-cryptocompare-bootstrap: [Error getting file] ${path} | ${error}`);
    // }

    // Create maps
    const idSymbolMap = {};
    const symbolIdMap = {};
    for (const [symbol, data] of Object.entries(coinList)) {
      idSymbolMap[data.Id] = symbol;
      symbolIdMap[symbol] = data.Id;
    };

    return { idSymbolMap, symbolIdMap, coinList };

  }
  catch(error) {
    const message = `formatterCryptocompareBootstrap(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/formatter-cryptocompare-section-coinlist.js":
/*!***************************************************************!*\
  !*** ./src/utils/formatter-cryptocompare-section-coinlist.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Cryptohub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");

/**
 *
 * COINLIST
 *
 * Original Data
 * -------------
 *
 * Algorithm            : "SHA256"
 * BuiltOn              : "N/A"
 * CoinName             : "Bitcoin"
 * FullName             : "Bitcoin (BTC)"
 * FullyPremined        : "0"
 * Id                   : "1182"
 * ImageUrl             : "/media/19633/btc.png"
 * IsTrading            : true
 * Name                 : "BTC"
 * PreMinedValue        : "N/A"
 * ProofType            : "PoW"
 * SmartContractAddress : "N/A"
 * SortOrder            : "1"
 * Sponsored            : false
 * Symbol               : "BTC"
 * TotalCoinSupply      : "21000000"
 * TotalCoinsFreeFloat  : "N/A"
 * Url                  : "/coins/btc/overview"
 *
 * Prefix fields with "cc-coinlist-"
 * ----------------------------------
 * Algorithm -> cc-coinlist-Algorithm
 *
 * @param {String?} data
 * @param {String?} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionCoinlist(data, timestamp, bootstrapData, appBootstrapData = {}) {
  try {

    const { idSymbolMap, symbolIdMap } = bootstrapData;
    const prefix = 'cc-coinlist-';
    const objAllCoins = data.Data;
    const result = {};
    let currentCoinOut, currentCoinIn, key, val, id;
    for (id of Object.keys(idSymbolMap)) {
      currentCoinOut = {};
      currentCoinIn = objAllCoins[idSymbolMap[id]];
      if (currentCoinIn === void 0) {
        logger.error(`coinListWatcher.handler(): ${idSymbolMap[id]} is not in objAllCoins`);
        continue;
      }
      for ([key, val] of Object.entries(currentCoinIn)) {
        if (key === 'SortOrder') {
          val = +val; // Make SortOrder numeric
        }
        currentCoinOut[`${prefix}${key}-timestamp`] = timestamp;
        currentCoinOut[`${prefix}${key}`] = val;
        if (key === 'SortOrder' && isNaN(currentCoinOut[`${prefix}${key}`])) debugger;
      }
      result[id] = currentCoinOut;
    }
    // appBootstrapData.coinList = result;
    return {data: result, timestamp};

  }
  catch(error) {
    const message = `formatterCryptocompareSectionCoinlist(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/formatter-cryptocompare-section-exchanges-general.js":
/*!************************************************************************!*\
  !*** ./src/utils/formatter-cryptocompare-section-exchanges-general.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Cryptohub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");

/**
 *
 * EXCHANGES GENERAL
 *
 * @param {Object} response - response object
 * @param {String} timestamp - time data was received
 * @param {Object} bootstrapData - legacy bootstrap data (will be merged with appBootstrapData
 * @param {Object} addBootstrapData - data store for non row data
 * @param {String} fileName - file name of stored request
 * @param {String} event - type of event
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionExchangesGeneral(response, timestamp, bootstrapData, appBootstrapData, fileName, event) {
  try {

    const emptyReturn = {data: {}, timestamp};

    if ((!response && !response.Data) || response.Response !== 'Success') {
      return emptyReturn;
    }

    /**
     *
     * EXCHANGE MAPS
     *
     * response.Data: {
     *   2439: {
     *     Id:  "2439"
     *     Name:  "Kraken"
     *     Url: "/exchanges/kraken/overview"
     *     LogoUrl: "/media/35309563/kraken.png"
     *     ItemType: Array [5]
     *     CentralizationType: "Centralized"
     *     InternalName:  "Kraken"
     *     AffiliateUrl: "https://www.kraken.com"
     *     Country: "United States of America"
     *     OrderBook: true
     *     Trades: true
     *     Recommended: false
     *     Sponsored: false
     *   }
     * }
     *
     * output: {
     *   'Kraken': 2439,
     * }
     *
     * @param {Object} responseData
     * @return {Object}
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
     * @param {Object} responseData
     * @return {Object}
     *
     */
    function data(responseData) {
      let id;
      let obj;
      let field;
      let output = {};
      let fields = [
        'Id',
        'Name',
        'Url',
        'LogoUrl',
        'ItemType',
        'CentralizationType',
        'Country'
      ];
      for ([id, obj] of Object.entries(responseData)) {
        output[id] = {};
        for (field of fields) {
          output[id][field] = obj[field];
        }
      }
      return output;
    }

    const output = {
      maps: maps(response.Data),
      data: data(response.Data)
    };

    return { data: output, timestamp };

  }
  catch(error) {
    debugger;
    const message = `formatterCryptocompareSectionExchangesGeneral(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/formatter-cryptocompare-section-exchanges-list.js":
/*!*********************************************************************!*\
  !*** ./src/utils/formatter-cryptocompare-section-exchanges-list.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatterCryptocompareSectionExchangesList; });
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bo-utils */ "bo-utils");
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bo_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger */ "./src/logger.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_2__);
// Binary Overdose


// Cryptohub



/**
 *
 * addSymbol
 *
 */
function addSymbol(symbols, symbol) {
  if (!symbols[symbol]) {
    symbols[symbol] = {
      pairs: new Set(),
      exchangeListDex: new Set(),
      exchangeListFiatOnly: new Set(),
      exchangeListCryptoOnly: new Set(),
      exchangeListAcceptsBoth: new Set(),
      _fiatCurrencies: new Set(),
      _exchangesRank: 0,
      _numberOfExchanges: 0,
      _numberOfDex: 0,
      _numberOfPairs: 0,
      _numberOfFiatPairs: 0,
      _numberOfFiatCurrencies: 0,
    }
  }
}

/**
 *
 * addExchange
 *
 */
function addExchange(exchanges, name, id) {
  if (!name || !id)  return;
  exchanges[id] = {
    id,
    name,
    pairs: new Set(),
    _cryptoCurrencies: new Set(),
    _fiatCurrencies: new Set(),
    _points: 0,
    _numberOfPairs: 0,
    _numberOfFiatPairs: 0,
    _numberOfCryptoPairs: 0,
    _numberOfCurrencies: 0,
    _numberOfCryptoCurrencies: 0,
    _numberOfFiatCurrencies: 0,
  };
}

/**
 *
 * addExchangeToSymbol
 *
 */
function addExchangeToSymbol(symbols, symbol, id, type) {
  if (!symbol || !id || !type) return;
  if (type === 'fiat')               symbols[symbol].exchangeListFiatOnly.add(id);
  else if (type === 'Decentralized') symbols[symbol].exchangeListDex.add(id);
  else if (type === 'crypto')        symbols[symbol].exchangeListCryptoOnly.add(id);
  else if (type === 'both')          symbols[symbol].exchangeListAcceptsBoth.add(id);
}

/**
 *
 * addPairsToSymbol
 *
 */
function addPairsToSymbol(symbols, symbol, pair) {
  if (symbols[symbol]) symbols[symbol].pairs.add(pair);
  else {
    //logger.info(`addPairsToSymbol(): can't add pair ${pair} to symbol ${symbol}`);
  }
}

/**
 *
 * addPairsToExchange
 *
 */
function addPairsToExchange(exchanges, id, pair) {
  if (exchanges[id]) exchanges[id].pairs.add(pair);
  else {
    // logger.info(`addPairsToExchange(): can't add pair ${pair} to exchange id ${id}`);
  }
}

// TODO: val?
// function addCryptoVolume(currencyCodes, symbol1, symbol2) {
//   if (!(currencyCodes.includes(symbol2) || currencyCodes.includes(symbol1))) {
//     // For each pair record the volume in each currency
//     if (!cryptoVolume[symbol1])          cryptoVolume[symbol1]          = {};
//     if (!cryptoVolume[symbol2])          cryptoVolume[symbol2]          = {};
//     if (!cryptoVolume[symbol1][symbol2]) cryptoVolume[symbol1][symbol2] = 0;
//     if (!cryptoVolume[symbol2][symbol1]) cryptoVolume[symbol2][symbol1] = 0;
//     cryptoVolume[symbol1][symbol2] += val.VOLUME24HOURTO;
//     cryptoVolume[symbol2][symbol1] += val.VOLUME24HOUR;
//   }
// }

// TODO: val?
// function addFiatVolume(currencyCodes, symbol1, symbol2) {
//   if (currencyCodes.includes(symbol2)) {
//     if (!fiatVolume[symbol1])          fiatVolume[symbol1]          = {};
//     if (!fiatVolume[symbol1][symbol2]) fiatVolume[symbol1][symbol2] = 0;
//     fiatVolume[symbol1][symbol2]                                   += val.VOLUME24HOURTO;
//   }
//   if (currencyCodes.includes(symbol1)) {
//     if (!fiatVolume[symbol2])          fiatVolume[symbol2]          = {};
//     if (!fiatVolume[symbol2][symbol1]) fiatVolume[symbol2][symbol1] = 0;
//     fiatVolume[symbol2][symbol1]                                   += val.VOLUME24HOUR;
//   }
// }

/**
 *
 * EXCHANGES
 *
 * Format and save exchange data to appBootstrapData and return
 * exchange data for symbols to be merged with the main dataset
 *
 * Original exchanges data is in the below format:
 *
 * ```
 *   Data: {
 *     Kraken: {
 *       pairs: {
 *         etc: [btc, eth],
 *         powr: [btc, eth]
 *       }
 *     }
 *   }
 * ```
 *
 * @param {Object} response - response object
 * @param {String} timestamp - time data was received
 * @param {Object} bootstrapData - legacy bootstrap data (will be merged with appBootstrapData
 * @param {Object} addBootstrapData - data store for non row data
 * @param {String} fileName - file name of stored request
 * @param {String} event - type of event
 * @return {Object}
 *
 */
function formatterCryptocompareSectionExchangesList(response, timestamp, bootstrapData, appBootstrapData, fileName, event, cache) {
  try {

    const emptyReturn = {data: {}, timestamp};
    const store = JSON.parse(cache.get(`${_settings__WEBPACK_IMPORTED_MODULE_2___default.a.dbDir}/store/data.json`)[0]);
    const mapNameId = Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(store, 'exchange-map-nameId');

    if (!appBootstrapData.currency || !mapNameId || (!response && !response.Data) || response.Response !== 'Success') {
      return emptyReturn;
    }

    //
    // STEP 1: Extract data into the below 2 object structures
    //
    // symbols: {
    //   btc: {
    //     exchangesList: [1234, 4322],
    //   }
    // }
    //
    // exchanges: {
    //   1234: {
    //     pairs: {btc: [eth, ltc]},
    //   }
    // }
    //

    const symbols = {};
    const exchanges = {};
    // const fiatVolume = {};
    // const cryptoVolume = {};

    let data;
    let list;
    let pair;
    let symbol1;
    let symbol2;
    let exchangeId;
    let exchangeName;
    let centralizationType;
    const exclude0xSymbols = true;

    for ([exchangeName, data] of Object.entries(response.Data)) {
      exchangeId = mapNameId[exchangeName];
      centralizationType = Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(store, `exchanges.${exchangeId}.CentralizationType`);
      if (!data.is_active) continue;
      if (!exchanges[exchangeId]) addExchange(exchanges, exchangeName, exchangeId);
      data = data.pairs;

      for ([symbol1, list] of Object.entries(data)) {
        if (symbol1.startsWith('0x') && exclude0xSymbols) continue;
        addSymbol(symbols, symbol1);
        if (centralizationType === 'Decentralized') {
          addExchangeToSymbol(symbols, symbol1, exchangeId, centralizationType);
        }
        for (symbol2 of Object.values(list)) {
          if (symbol2.startsWith('0x') && exclude0xSymbols) continue;
          pair = `${symbol1},${symbol2}`;
          addSymbol(symbols, symbol2);
          if (centralizationType === 'Decentralized') {
            addExchangeToSymbol(symbols, symbol1, exchangeId, centralizationType);
          }
          addPairsToExchange(exchanges, exchangeId, pair);
          addPairsToSymbol(symbols, symbol1, pair);
          addPairsToSymbol(symbols, symbol2, pair);
        }

      }

    }

    //
    // STEP 2: With the data collected we can now annotate it
    //         with additional metrics as below
    //
    // symbols: {
    //   btc: {
    //     exchangesList: [1234, 4322],
    //     pairs: ['eth,ltc'],
    //     _fiatCurrencies: [usd, eur],
    //     _exchagnesRank: 87,
    //     _numberOfFiatCurrencies: 2,
    //     _numberOfExchanges: 33,
    //     _numberOfPairs: 123,
    //     _numberOfFiatPairs: 31
    //   }
    // }
    // exchanges: {
    // 1234: {
    //     pairs: ['eth,ltc'],
    //     _points: 84,
    //     _fiatCurrencies: [usd, eur],
    //     _cryptoCurrencies: [btc, ltc],
    //     _numberOfFiatCurrencies: 2,
    //     _numberOfSymbold: 34,
    //     _numberOfPairs: 32,
    //   }
    // }
    //

    let obj;
    const currencyCodes = Object.keys(appBootstrapData.currency) || [];

    // Symbols
    for (obj of Object.values(symbols)) {
      obj._numberOfPairs = obj.pairs.size;
      for (pair of obj.pairs.values()) {
        [symbol1, symbol2] = pair.split(',');

        // add to _fiatCurrencies or _cryptoCurrencies
        if (currencyCodes.includes(symbol1)) obj._fiatCurrencies.add(symbol1);
        if (currencyCodes.includes(symbol2)) obj._fiatCurrencies.add(symbol2);

        if (currencyCodes.includes(symbol1) || currencyCodes.includes(symbol2)) {
          obj._numberOfFiatPairs++;
        }
      }
      obj._numberOfFiatCurrencies = obj._fiatCurrencies.size;
      // _exchangesRank
    }

    // Exchanges
    for (obj of Object.values(exchanges)) {

      for (pair of obj.pairs.values()) {

        [symbol1, symbol2] = pair.split(',');

        if (currencyCodes.includes(symbol1) || currencyCodes.includes(symbol2)) {
          obj._numberOfFiatPairs++;
        }

        // add to _fiatCurrencies or _cryptoCurrencies
        if (currencyCodes.includes(symbol1)) obj._fiatCurrencies.add(symbol1);
        else obj._cryptoCurrencies.add(symbol1);

        if (currencyCodes.includes(symbol2)) obj._fiatCurrencies.add(symbol2);
        else obj._cryptoCurrencies.add(symbol2);

        //
        // Need per exchange volume to do this. Looks like too many requests
        // with the current API setup
        //
        // addCryptoVolume(currencyCodes, symbol1, symbol2);
        // addFiatVolume(currencyCodes, symbol1, symbol2);

      }
      obj._numberOfFiatCurrencies = obj._fiatCurrencies.size;
      obj._numberOfCryptoCurrencies = obj._cryptoCurrencies.size;
      obj._numberOfCurrencies = obj._numberOfFiatCurrencies + obj._numberOfCryptoCurrencies;

      obj._numberOfPairs = obj.pairs.size;
      obj._numberOfCryptoPairs = obj._numberOfPairs - obj._numberOfFiatPairs;

    }

    // Exchanges part 2
    // Now that we have calculated which exchanges have fiat / crypto pairs add this data
    let hasFiat;
    let hasCrypto;
    for ([exchangeId, obj] of Object.entries(exchanges)) {

      for (pair of obj.pairs.values()) {

        [symbol1, symbol2] = pair.split(',');

        hasFiat = hasCrypto = false;
        if (obj._numberOfFiatCurrencies) hasFiat = true;
        if (obj._numberOfCryptoCurrencies) hasCrypto = true;

        if (hasFiat && hasCrypto) addExchangeToSymbol(symbols, symbol1, exchangeId, 'both');
        else if (hasCrypto)       addExchangeToSymbol(symbols, symbol1, exchangeId, 'crypto');
        else if (hasFiat)         addExchangeToSymbol(symbols, symbol1, exchangeId, 'fiat');

      }

    }

    // Symbols part 2
    for (obj of Object.values(symbols)) {
      obj._numberOfExchanges = obj.exchangeListFiatOnly.size + obj.exchangeListCryptoOnly.size + obj.exchangeListAcceptsBoth.size;
      obj._numberOfDex = obj.exchangeListDex.size;
    }

    //
    // Step 3: Save exchange data to core dataset
    //
    // data: {
    //   1182: {
    //     'cryptohub-exchangesListFiatOnly': [],
    //     'cryptohub-exchangesListCryptoOnly': ['Binance'],
    //     'cryptohub-exchangesListAcceptsBoth': ['Kraken'],
    //     'cryptohub-numberOfFiatCurrencies': 32,
    //     'cryptohub-numberOfFiatCurrencies-timestamp': 1550696919978,
    //     'cryptohub-numberOfExchanges': 23,
    //     'cryptohub-numberOfExchanges-timestamp': 1550696919978,
    //     'cryptohub-numberOfPairs': 4,
    //     'cryptohub-numberOfPairs-timestamp': 1550696919978,
    //     'cryptohub-numberOfFiatPairs': 3,
    //     'cryptohub-numberOfFiatPairs-timestamp': 1550696919978
    //   }
    // }
    //
    function handleData(timestamp) {

      let result = {};
      const map = bootstrapData['symbolIdMap'];
      if (bootstrapData.coinList) {
        const coinList = bootstrapData.coinList;
        let id;
        let symbol;
        for ([symbol] of Object.entries(coinList)) {
          if (symbols[symbol]) {
            id = map[symbol];
            result[id] = {

              // 'cryptohub-pairs': symbols[symbol].pairs,
              // 'cryptohub-fiatCurrencies': symbols[symbol]._fiatCurrencies,
              // 'cryptohub-exchagnesRank': symbols[symbol]._exchagnesRank,

              'cryptohub-exchangesListDex': Array.from(symbols[symbol].exchangeListDex),
              'cryptohub-exchangesListFiatOnly': Array.from(symbols[symbol].exchangeListFiatOnly),
              'cryptohub-exchangesListCryptoOnly': Array.from(symbols[symbol].exchangeListCryptoOnly),
              'cryptohub-exchangesListAcceptsBoth': Array.from(symbols[symbol].exchangeListAcceptsBoth),

              'cryptohub-numberOfFiatCurrencies': symbols[symbol]._numberOfFiatCurrencies,
              'cryptohub-numberOfFiatCurrencies-timestamp': timestamp,

              'cryptohub-numberOfExchanges': symbols[symbol]._numberOfExchanges,
              'cryptohub-numberOfExchanges-timestamp': timestamp,

              'cryptohub-numberOfPairs': symbols[symbol]._numberOfPairs,
              'cryptohub-numberOfPairs-timestamp': timestamp,

              'cryptohub-numberOfFiatPairs': symbols[symbol]._numberOfFiatPairs,
              'cryptohub-numberOfFiatPairs-timestamp': timestamp,

              'cryptohub-numberOfDex': symbols[symbol]._numberOfExchanges,

            }
          }
        }
      }
      return {data: result, timestamp};

    }

    function handleStore(timestamp) {
      return {data: {data: exchanges}, timestamp};
    }

    switch (event) {
      case 'data':
        return handleData(timestamp) || emptyReturn;
      case 'store':
        return handleStore(timestamp) || emptyReturn;
    }

  }
  catch(error) {
    const message = `formatterCryptocompareSectionExchangesList(): ${error}`;
    _logger__WEBPACK_IMPORTED_MODULE_1___default.a.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/formatter-cryptocompare-section-price.js":
/*!************************************************************!*\
  !*** ./src/utils/formatter-cryptocompare-section-price.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Cryptohub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");

/**
 *
 * PRICE
 *
 * Original Data
 * -------------
 *
 * TYPE:  "5"
 * MARKET:  "CCCAGG"
 * FROMSYMBOL:  "BTC"
 * TOSYMBOL:  "USD"
 * FLAGS:  "4"
 * PRICE: 6429.49
 * LASTUPDATE: 1536222722
 * LASTVOLUME: 0.005
 * LASTVOLUMETO: 32.1245925
 * LASTTRADEID:  "290332570"
 * VOLUMEDAY: 73331.62846431609
 * VOLUMEDAYTO: 473214413.3407818
 * VOLUME24HOUR: 164542.97725276044
 * VOLUME24HOURTO: 1115586462.295549
 * OPENDAY: 6705.03
 * HIGHDAY: 6727.19
 * LOWDAY: 6295.11
 * OPEN24HOUR: 7385.55
 * HIGH24HOUR: 7388.15
 * LOW24HOUR: 6289.93
 * LASTMARKET:  "Bitfinex"
 * CHANGE24HOUR: -956.0600000000004
 * CHANGEPCT24HOUR: -12.945007480824048
 * CHANGEDAY: -275.53999999999996
 * CHANGEPCTDAY: -4.109452157559324
 * SUPPLY: 17252100
 * MKTCAP: 110922204429
 * TOTALVOLUME24H: 471769.84240143484
 * TOTALVOLUME24HTO: 3090898519.5002995
 * IMAGEURL: "/media/19633/btc.png"
 *
 * Prefix fields with "cc-price-"
 * ----------------------------------------------
 * PRICE -> cc-price-PRICE
 *
 * @param {Array} price is an array of the responses of batched cryptocompare api price data
 * @param {String} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionPrice(price, timestamp, bootstrapData) {
  try {

    let i;
    let id;
    let val;
    let field;
    let symbol;
    let fData = {};
    let batchRequestData;
    const prefix = 'cc-price-';
    if (!Array.isArray(price)) price = [price];
    for (i = 0; i < price.length; i++) {
      batchRequestData = price[i].RAW;
      if (!price[i].RAW) {
        const warning = price[i].Message;
        logger.warn(warning);
        continue;
      }
      for ([symbol, val] of Object.entries(batchRequestData)) {
        id = bootstrapData.symbolIdMap[symbol];
        if (id && val.USD) {
          val = val.USD;
          fData[id] = {};
          for (field of Object.keys(val)) {
            fData[id][`${prefix}${field}-timestamp`] = timestamp;
            fData[id][`${prefix}${field}`] = val[field];
          }
        }
        else {
          logger.error(`formatterCryptocomparePrice(): No id or val.USD for ${symbol}`);
        }
      }
    }
    return {data: fData, timestamp};

  }
  catch(error) {
    const message = `formatterCryptocompareSectionPrice(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/formatter-cryptocompare-section-total-vol-full.js":
/*!*********************************************************************!*\
  !*** ./src/utils/formatter-cryptocompare-section-total-vol-full.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Cryptohub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");

/**
 *
 * TOTAL VOL FULL
 *
 * Original Data
 * -------------
 *
 * CoinInfo: {
 *   Id: "925326",
 *   Name: "PSM",
 *   FullName: "Prasm",
 *   Internal: "PSM",
 *   ImageUrl: "/media/34478246/prasm.png",
 *   Url: "/coins/psm/overview",
 *   Algorithm: "N/A",
 *   ProofType: "N/A",
 *   NetHashesPerSecond: 0,
 *   BlockNumber: 0,
 *   BlockTime: 0,
 *   BlockReward: 0,
 *   Type: 1,
 *   DocumentType: "Webpagecoinp"
 * },
 * RAW: {
 *   USD: {
 *     TYPE: "5",
 *     MARKET: "CCCAGG",
 *     FROMSYMBOL: "PSM",
 *     TOSYMBOL: "USD",
 *     FLAGS: "2",
 *     PRICE: 0.00052371,
 *     LASTUPDATE: 1548407775,
 *     LASTVOLUME: 0,
 *     LASTVOLUMETO: 0,
 *     LASTTRADEID: 0,
 *     VOLUMEDAY: 0,
 *     VOLUMEDAYTO: 0,
 *     VOLUME24HOUR: 0,
 *     VOLUME24HOURTO: 0,
 *     OPENDAY: 0.0007867287999999999,
 *     HIGHDAY: 0.0007867287999999999,
 *     LOWDAY: 0.00052371,
 *     OPEN24HOUR: 0.00052371,
 *     HIGH24HOUR: 0.00052371,
 *     LOW24HOUR: 0.00052371,
 *     LASTMARKET: "IDAX",
 *     VOLUMEHOUR: 0,
 *     VOLUMEHOURTO: 0,
 *     OPENHOUR: 0.00052371,
 *     HIGHHOUR: 0.00052371,
 *     LOWHOUR: 0.00052371,
 *     CHANGE24HOUR: 0,
 *     CHANGEPCT24HOUR: 0,
 *     CHANGEDAY: -0.0002630187999999999,
 *     CHANGEPCTDAY: -33.43195266272188,
 *     SUPPLY: 4000000000,
 *     MKTCAP: 2094840.0000000002,
 *     TOTALVOLUME24H: 444,
 *     TOTALVOLUME24HTO: 0.23252724000000002,
 *     IMAGEURL: "/media/34478246/prasm.png"
 *   }
 * }
 *
 * Prefix fields with "cc-total-vol-full-"
 * ----------------------------------------------
 * PRICE -> cc-total-vol-full-ImageUrl
 *
 * @param {Array} price is an array of the responses of batched cryptocompare api price data
 * @param {String} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
module.exports = function formatterCryptocompareSectionTotalVolFull(price, timestamp, bootstrapData) {
  try {

    const prefix = 'cc-total-vol-full-';

    let fData = {};
    let idx;
    let dataItem;
    let RAW;
    let coinInfo;

    for ([idx, dataItem] of Object.entries(price.Data)) {

      try {
        RAW = price.Data[idx].RAW.USD;
        coinInfo = price.Data[idx].CoinInfo;
      }
      catch (error) {
        logger.error(`formatterCryptocompareSectionTotalVolFull(): idx:${idx}, ${error}`);
      }

      let key;
      let val;
      const id = coinInfo.Id;

      fData[id] = {};

      for ([key, val] of Object.entries(RAW)) {
        fData[id][`${prefix}${key}-timestamp`] = timestamp;
        fData[id][`${prefix}${key}`] = val;
      }

      for ([key, val] of Object.entries(coinInfo)) {
        fData[id][`${prefix}${key}-timestamp`] = timestamp;
        fData[id][`${prefix}${key}`] = val;
      }

    }

    return {data: fData, timestamp};

  }
  catch(error) {
    const message = `formatterCryptocompareSectionTotalVolFull(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/formatter-messari-section-metrics.js":
/*!********************************************************!*\
  !*** ./src/utils/formatter-messari-section-metrics.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatterMessariSectionMetrics; });
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bo-utils */ "bo-utils");
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bo_utils__WEBPACK_IMPORTED_MODULE_0__);
// Cryptohub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");



/**
 *
 * METRICS
 *
 * Original Data
 * -------------
 *
 * {
 *   "status": {
 *     "elapsed": "0",
 *     "timestamp": "2019-04-11T10:19:47.634532695Z"
 *   },
 *   "data": {
 *     "id": "1e31218a",
 *     "symbol": "btc",
 *     "name": "Bitcoin",
 *     "market_data": {
 *       "price_usd": 5091.098917763153,
 *       "price_btc": 1,
 *       "volume_last_24_hours": 16399320644,
 *       "real_volume_last_24_hours": 828943906.4819491,
 *       "volume_last_24_hours_overstatement_multiple": 19.78339006507566,
 *       "percent_change_usd_last_24_hours": -1.4378802987483073,
 *       "percent_change_btc_last_24_hours": 0
 *     },
 *     "marketcap": {
 *       "current_marketcap_usd": 89805009562.96193,
 *       "y_2050_marketcap_usd": 108575497584.61174,
 *       "y_plus10_marketcap_usd": 105767392638.06367,
 *       "liquid_marketcap_usd": 91263574016.9179,
 *       "volume_turnover_last_24_hours_percent": 0.9082965634550806
 *     },
 *     "supply": {
 *       "y_2050": 20983495.3984375,
 *       "y_plus10": 20440796,
 *       "liquid": 17637762,
 *       "circulating": 17639612,
 *       "y_2050_issued_percent": 84.06422126083676,
 *       "annual_inflation_percent": 3.8386389384322115,
 *       "y_plus10_issued_percent": 86.29611097336914
 *     },
 *     "blockchain_stats_24_hours": {
 *       "transaction_volume": 3423719699.2928834,
 *       "adjusted_transaction_volume": 1572846426.8066072,
 *       "nvt": 27.395889045691852,
 *       "adjusted_nvt": 60.61607813796638,
 *       "sum_of_fees": 150177.795038277,
 *       "median_tx_value": 164.00716844700003,
 *       "median_tx_fee": 0.23983012446160373,
 *       "count_of_active_addresses": 706754,
 *       "count_of_tx": 285567,
 *       "count_of_payments": 423315,
 *       "new_issuance": 9637186.770436611,
 *       "average_difficulty": 6071846049920.75,
 *       "kilobytes_added": 153443.952,
 *       "count_of_blocks_added": 149
 *     },
 *     "all_time_high": {
 *       "price": 20089,
 *       "at": "2017-12-17",
 *       "days_since": 479,
 *       "percent_down": 74.24297641819645,
 *       "breakeven_multiple": 3.882436170561514
 *     },
 *     "cycle_low": {
 *       "price": 3126.679993636258,
 *       "at": "2018-12-15",
 *       "percent_up": 65.4895441132397,
 *       "days_since": 116
 *     },
 *     "token_sale_stats": {
 *       "sale_proceeds_usd": null,
 *       "sale_start_date": null,
 *       "sale_end_date": null,
 *       "roi_since_sale_usd_percent": null,
 *       "roi_since_sale_btc_percent": null,
 *       "roi_since_sale_eth_percent": null
 *     },
 *     "staking_stats": {
 *       "staking_yield_percent": null,
 *       "staking_type": null,
 *       "staking_minimum": null,
 *       "tokens_staked": null,
 *       "tokens_staked_percent": 0,
 *       "real_staking_yield_percent": null
 *     },
 *     "mining_stats": {
 *       "mining_algo": "SHA-256",
 *       "network_hash_rate": "51,117 PH/s",
 *       "available_on_nicehash_percent": 0.0006888457166142784,
 *       "1_hour_attack_cost": 429329.6386353715,
 *       "24_hours_attack_cost": 10303911.327248916,
 *       "attack_appeal": 8858.106754394195
 *     },
 *     "developer_activity": {
 *       "stars": 37778,
 *       "watchers": 3525,
 *       "commits_last_3_months": 361,
 *       "commits_last_1_year": 1825,
 *       "lines_added_last_3_months": 23556,
 *       "lines_added_last_1_year": 98803,
 *       "lines_deleted_last_3_months": 8701,
 *       "lines_deleted_last_1_year": 71940
 *     },
 *     "roi_data": {
 *       "percent_change_last_1_week": 4.068800808149478,
 *       "percent_change_last_1_month": 34.48065939117886,
 *       "percent_change_last_3_months": 42.28001937093203,
 *       "percent_change_last_1_year": -24.822514997273164,
 *       "percent_change_btc_last_1_week": 0,
 *       "percent_change_btc_last_1_month": 0,
 *       "percent_change_btc_last_3_months": 0,
 *       "percent_change_btc_last_1_year": 0,
 *       "percent_change_month_to_date": 25.34399357274989,
 *       "percent_change_quarter_to_date": 25.34399357274989,
 *       "percent_change_year_to_date": 39.8379747316033
 *     },
 *     "roi_by_year": {
 *       "2018_usd_percent": -72.50923276595937,
 *       "2017_usd_percent": 1610.7690519883597,
 *       "2016_usd_percent": 89.7667,
 *       "2015_usd_percent": 35.44,
 *       "2014_usd_percent": -57.718,
 *       "2013_usd_percent": 5360.674,
 *       "2012_usd_percent": 174.8979,
 *       "2011_usd_percent": 1420.27027
 *     },
 *     "risk_metrics": {
 *       "sharpe_ratios": {
 *         "last_30_days": 7.2391861543371,
 *         "last_90_days": 3.859009530925087,
 *         "last_1_year": -0.44277420502195886,
 *         "last_3_years": 1.4592119414515123
 *       }
 *     },
 *     "misc_data": {
 *       "vladimir_club_cost": 10857549.758461175,
 *       "btc_current_normalized_supply_price_usd": 5174.328467348516,
 *       "btc_y2050_normalized_supply_price_usd": 5174.328467348516,
 *       "asset_created_at": "2009-01-03",
 *       "asset_age_days": 3749,
 *       "categories": [
 *         "Currency"
 *       ],
 *       "sectors": [
 *         "Currency"
 *       ]
 *     }
 *   }
 * }
 *
 * Prefix fields with "m-metrics-"
 * ----------------------------------------------
 * misc_data.sectors -> m-metrics-sectors
 *
 * NOTE:
 *   We need a master field list and we just map stuff from there.
 *   Have a think about it yo
 *
 * @param {Array} data - response from Messari api request
 * @param {String} timestamp
 * @param {Object} bootstrapData
 * @return {Object}
 *
 */
function formatterMessariSectionMetrics(data, timestamp, bootstrapData, appBootstrapData, fileName, event, cache) {

  try {

    function dataIsValid(data) {
      if (data.data && data.data.symbol) return true
      else return false;
    }

    if (!dataIsValid(data)) return;
    data = data.data;

    const symbol = data.symbol.toUpperCase();
    const sectors = Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'misc_data.sectors');
    const id = appBootstrapData.symbolIdMap[symbol]; // TODO: need proper mapping for ids

    const output = {
      [id]: {
        'm-metrics-sectors'                         : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'misc_data.sectors'),
        'm-metrics-categories'                      : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'misc_data.categories'),
        'm-metrics-date-created'                    : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'misc_data.asset_created_at'),
        'm-metrics-ath-price'                       : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'all_time_high.price'),
        'm-metrics-ath-date'                        : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'all_time_high.at'),
        'm-metrics-ath-days'                        : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'all_time_high.days_since'),
        'm-metrics-ath-percent-down'                : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'all_time_high.percent_down'),
        'm-metrics-ath-breakeven-multiple'          : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'all_time_high.breakeven_multiple'),
        'm-metrics-cycle-low-price'                 : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'cycle_low.price'),
        'm-metrics-cycle-low-date'                  : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'cycle_low.at'),
        'm-metrics-cycle-low-percent-up'            : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'cycle_low.percent_up'),
        'm-metrics-cycle-low-days-since'            : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'cycle_low.days_since'),
        'm-metrics-percent-change-last-1-week'      : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_last_1_week'),
        'm-metrics-percent-change-last-1-month'     : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_last_1_month'),
        'm-metrics-percent-change-last-3-months    ': Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_last_3_months'),
        'm-metrics-percent-change-last-1-year'      : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_last_1_year'),
        'm-metrics-percent-change-btc-last-1-week'  : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_btc_last_1_week'),
        'm-metrics-percent-change-btc-last-1-month' : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_btc_last_1_month'),
        'm-metrics-percent-change-btc-last-3-months': Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_btc_last_3_months'),
        'm-metrics-percent-change-btc-last-1-year'  : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'roi_data.percent_change_btc_last_1_year'),
        'm-metrics-ath-price-timestamp'             : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'all_time_high.at'),
        'm-metrics-cycle-low-price-timestamp'       : Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'cycle_low.at'),
      }
    };

    let item;
    let prop;
    for (item of Object.values(output)) {
      for (prop of Object.keys(item)) {
        item[`${prop}-timestamp`] = timestamp;
      }
    }

    return {data: output, timestamp};

  }

  catch(error) {

    const message = `formatterMessariMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}


/***/ }),

/***/ "./src/utils/formatter-xe-section-currency.js":
/*!****************************************************!*\
  !*** ./src/utils/formatter-xe-section-currency.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 *
 * USD Currency Table
 * @return {Object}
 *
 */

//
// NOTE: MAKE THIS A FORMATTER and put it on bootstrapData
//

// Libs
const cheerio = __webpack_require__(/*! cheerio */ "cheerio");

// CryptoHub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");
const settings = __webpack_require__(/*! ../settings */ "./src/settings.js");

//
// Xe
//
// Currency conversion data for USD
//
//  USD: {name: "US Dollar", unitsPerUSD": 1.0000000000", USDPerUnits: "1.0000000000"},
//  EUR: {name: "Euro",      unitsPerUSD: "0.8576784390", USDPerUnits: "1.1659381355"}
//
module.exports = function formatterXeSectionCurrency(response, timestamp, bootstrapData, appBootstrapData) {
  try {

    const data = {};
    const $ = cheerio.load(response);
    const trs = $('#historicalRateTbl tbody tr').toArray();
    for (const tr of trs) {
      const tds = $(tr).find('td').toArray();
      const code = $(tds[0]).text();
      const name = $(tds[1]).text();
      const unitsPerUSD = $(tds[2]).text();
      const USDPerUnits = $(tds[3]).text();
      data[code] = {
        name,
        unitsPerUSD,
        USDPerUnits
      }
    }
    appBootstrapData.currency = data;
    return {data, timestamp};
  }
  catch(error) {
    const message = `formatterXeSectionCurrency(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/get-jobs-cryptocompare-section-price.js":
/*!***********************************************************!*\
  !*** ./src/utils/get-jobs-cryptocompare-section-price.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Node
const crypto   = __webpack_require__(/*! crypto */ "crypto");

// Cryptohub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");
const settings = __webpack_require__(/*! ../settings */ "./src/settings.js");

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsCryptocompareSectionPrice(queue, bootstrapData, appBootstrapData) {
  try {

     let arr1 = [];
     let arr2 = ['USD'];
     let arr1StrLen = 0;
     let symbol1;
     let counter = 0;
     // Lowering by 10 so we don't need to worry about "can we add another in the remaining space" issue, come back and do it right laterz
     const arr1MaxLength = settings.limitsCryptocompareTradingInfoMultiArr1 - 10;
     const arr2MaxLength = settings.limitsCryptocompareTradingInfoMultiArr2;
     const groupKey = settings.tagKeyCryptocompareTradingInfoMultiGrouped`${{}}`;
     if (arr2.join().length > arr2MaxLength) {
       throw new Error(`scrapeCryptocompare(): The items in the arr2 array need to be smaller than ${arr2MaxLength} in total length`);
     }
     let jobs = 0;

     // filter first x by sortOrder
     const limit = settings.maxRecordsScraped;
     let items = [];
     let order;
     for (let item of Object.values(bootstrapData.coinList)) {
       order = item['SortOrder'];
       if (order < limit) {
         items[order] = item;
       }
     }
     items = items.filter(Boolean);
     const length = items.length;

     for (let v of items) {
       counter++;
       symbol1 = v.Symbol;
       arr1StrLen += symbol1.length + 1;
       let last = counter === length;
       if (arr1StrLen < arr1MaxLength) arr1.push(symbol1);
       if ((arr1StrLen > arr1MaxLength) || last) {
         const list1 = arr1.join();
         const list2 = arr2.join();
         const md5 = crypto.createHash('md5');
         const cacheKey = md5.update(list1 + list2).digest('hex');
         const data = {
           cacheKey, list1, list2
         }
         const uri = settings.tagUriCryptocompareTradingInfoMulti`${data}`;
         const key = settings.tagKeyCryptocompareTradingInfoMulti`${data}`;

         queue.push({uri, key: groupKey, cacheForDays: settings.cacheForCryptocompare});
         jobs++;
         arr1 = [];
         arr1StrLen = 0;

       }
     }
     logger.info(`getJobsCryptocompareSectionPrice(): ${jobs} price jobs created`);

  }
  catch(error) {
    const message = `getJobsCryptocompareSectionPrice(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/get-jobs-cryptocompare-section-total-vol-full.js":
/*!********************************************************************!*\
  !*** ./src/utils/get-jobs-cryptocompare-section-total-vol-full.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Node
const crypto   = __webpack_require__(/*! crypto */ "crypto");

// Cryptohub
const logger   = __webpack_require__(/*! ../logger */ "./src/logger.js");
const settings = __webpack_require__(/*! ../settings */ "./src/settings.js");

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsCryptocompareSectionTotalVolFull(queue, bootstrapData) {
  try {

    let page = 0;
    let jobs = 0;
    const limit = 100;
    const maxPages = 5;
    const groupKey = settings.tagKeyCryptocompareTotalVolFullGrouped`${{}}`;

    while (page < maxPages) {
      const data = {
        limit, page
      };
      const uri = settings.tagUriCryptocompareTotalVolFull`${data}`;
      const key = settings.tagKeyCryptocompareTotalVolFull`${data}`;
      queue.push({uri, key: groupKey, cacheForDays: settings.cacheForCryptocompare});
      jobs++;
      page++;
    }

    logger.info(`getJobsCryptocompareSectionTotalVolFull(): ${jobs} price jobs created`);

  }
  catch(error) {
    const message = `getJobsCryptocompareSectionTotalVolFull(): ${error}`;
    logger.error(message);
    return {message, error: true};
  }
}


/***/ }),

/***/ "./src/utils/get-jobs-messari-section-metrics.js":
/*!*******************************************************!*\
  !*** ./src/utils/get-jobs-messari-section-metrics.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Cryptohub
const logger = __webpack_require__(/*! ../logger */ "./src/logger.js");
const settings = __webpack_require__(/*! ../settings */ "./src/settings.js");

/**
 *
 * @param {Array} queue
 * @param {Object} bootstrapData
 *
 */
module.exports = async function getJobsMessariSectionMetrics(queue, bootstrapData, appBootstrapData) {

  try {

    if (!appBootstrapData.firstXSymbols) {
      console.log('waiting for bootstrap data');
      return;
    }
    else {

      let symbol;
      let jobs = 0;
      const symbols = appBootstrapData.firstXSymbols;
      // const groupKey = settings.tagKeyMessariMetricsGrouped`${{}}`;

      for (symbol of symbols) {
        queue.push({
          // groupKey,
          uri: settings.tagUriMessariMetrics`${symbol}`,
          key: settings.tagKeyMessariMetrics`${symbol}`,
          cacheForDays: settings.cacheForMessari,
        });
        jobs++;
      }

      logger.info(`getJobsMessariMetrics(): ${jobs} metrics jobs created`);

    }

  }
  catch(error) {

    const message = `getJobsMessariSectionMetrics(): ${error}`;
    logger.error(message);
    return {message, error: true};

  }

}


/***/ }),

/***/ "./src/utils/scrape-json.js":
/*!**********************************!*\
  !*** ./src/utils/scrape-json.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 *
 * @param {String} uri
 * @param {String} key
 * @param {String} cacheFor
 *
 */

// Libs
const rp = __webpack_require__(/*! request-promise */ "request-promise");
const { to } = __webpack_require__(/*! await-to-js */ "await-to-js");
const logger   = __webpack_require__(/*! ../logger */ "./src/logger.js");

module.exports = async function scrapeJSON(uri, key, cacheFor, cache) {
  try {
    let error;
    let [file, age] = cache.get(key);
    if (!file || age > cacheFor) {
      [error, file] = await to(rp({uri, json: true}));
      if (error) throw new Error(error);
      cache.set(key, JSON.stringify(file));
    }
    else {
      file = JSON.parse(file);
    }
    return file;
  }
  catch(error) {
    logger.error(`scrape-json.js: Failed to scrape ${uri}`);
    return {error: true, message: `scrapeJSON(): ${error}`};
  }
}


/***/ }),

/***/ "./src/utils/store-on-before-emit.js":
/*!*******************************************!*\
  !*** ./src/utils/store-on-before-emit.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return storeOnBeforeEmit; });
/* harmony import */ var bo_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bo-datatable */ "bo-datatable");
/* harmony import */ var bo_datatable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bo_datatable__WEBPACK_IMPORTED_MODULE_0__);


// Binary Overdose Projects


function storeOnBeforeEmit(options, newData, oldData) {

  const type = options.diff !== false ? 'changeset' : 'full';
  let data = newData;

  if (type === 'changeset') {
    data = bo_datatable__WEBPACK_IMPORTED_MODULE_0___default.a.diff(oldData, data);
  }

  data = JSON.stringify({data, type});

  return data;

}


/***/ }),

/***/ "./src/utils/store-on-handle-data.js":
/*!*******************************************!*\
  !*** ./src/utils/store-on-handle-data.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return storeOnHandleData; });
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bo-utils */ "bo-utils");
/* harmony import */ var bo_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bo_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analytics-merge-data-by-key */ "./src/utils/analytics-merge-data-by-key.js");
/* harmony import */ var _analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings */ "./src/settings.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_2__);


// Binary Overdose Projects


// Cryptohub



/**
 *
 *
 *
 */
function storeOnHandleData(options, data, cache, oldData = {}) {

  // Get old data
  const fileName = `${_settings__WEBPACK_IMPORTED_MODULE_2___default.a.generatedDir}/store/data.json`;

  // Maps
  const idName = Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'exchanges-general.maps.idName');
  const nameId = Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'exchanges-general.maps.nameId');

  // Exchanges object by Id
  const list = Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'exchanges-list.data') || {};
  const general = Object(bo_utils__WEBPACK_IMPORTED_MODULE_0__["objectGetNestedProperty"])(data, 'exchanges-general.data') || {};
  const exchanges = _analytics_merge_data_by_key__WEBPACK_IMPORTED_MODULE_1___default()([list, general]);

  const output = {
    ...oldData,
    ...exchanges && {exchanges},
    ...nameId && {'exchange-map-nameId': nameId},
    ...idName && {'exchange-map-idName': idName}
  }

  cache.set(fileName, JSON.stringify(output));

}


/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "argv":
/*!***********************!*\
  !*** external "argv" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("argv");

/***/ }),

/***/ "await-to-js":
/*!******************************!*\
  !*** external "await-to-js" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("await-to-js");

/***/ }),

/***/ "bo-datatable":
/*!*******************************!*\
  !*** external "bo-datatable" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bo-datatable");

/***/ }),

/***/ "bo-utils":
/*!***************************!*\
  !*** external "bo-utils" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bo-utils");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hbmFseXRpY3MtbWVyZ2UtZGF0YS1ieS1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2RhdGEtb24tYmVmb3JlLWVtaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2RhdGEtb24taGFuZGxlLWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLWJvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1jb2lubGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1leGNoYW5nZXMtZ2VuZXJhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1leGNoYW5nZXMtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1wcmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi10b3RhbC12b2wtZnVsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLW1lc3Nhcmktc2VjdGlvbi1tZXRyaWNzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9mb3JtYXR0ZXIteGUtc2VjdGlvbi1jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0LWpvYnMtY3J5cHRvY29tcGFyZS1zZWN0aW9uLXByaWNlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZXQtam9icy1jcnlwdG9jb21wYXJlLXNlY3Rpb24tdG90YWwtdm9sLWZ1bGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2dldC1qb2JzLW1lc3Nhcmktc2VjdGlvbi1tZXRyaWNzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zY3JhcGUtanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvc3RvcmUtb24tYmVmb3JlLWVtaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3N0b3JlLW9uLWhhbmRsZS1kYXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFyZ3ZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhd2FpdC10by1qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvLWRhdGF0YWJsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvLXV0aWxzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hlZXJpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZXF1ZXN0LXByb21pc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztB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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvL1xuLy9cbi8vIOKWiOKWiOKWiOKWiOKWiOKWiOKVlyDilojilojilZfilojilojilojilZcgICDilojilojilZcg4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKWiOKWiOKWiOKWiOKVlyDilojilojilZcgICDilojilojilZcg4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKVlyAgIOKWiOKWiOKVl+KWiOKWiOKWiOKWiOKWiOKWiOKWiOKVl+KWiOKWiOKWiOKWiOKWiOKWiOKVlyDilojilojilojilojilojilojilZcgIOKWiOKWiOKWiOKWiOKWiOKWiOKVlyDilojilojilojilojilojilojilojilZfilojilojilojilojilojilojilojilZdcbi8vIOKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkeKWiOKWiOKWiOKWiOKVlyAg4paI4paI4pWR4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4pWa4paI4paI4pWXIOKWiOKWiOKVlOKVneKWiOKWiOKVlOKVkOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkSAgIOKWiOKWiOKVkeKWiOKWiOKVlOKVkOKVkOKVkOKVkOKVneKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVlOKVkOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVlOKVkOKVkOKVkOKVkOKVneKWiOKWiOKVlOKVkOKVkOKVkOKVkOKVnVxuLy8g4paI4paI4paI4paI4paI4paI4pWU4pWd4paI4paI4pWR4paI4paI4pWU4paI4paI4pWXIOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVnSDilZrilojilojilojilojilZTilZ0g4paI4paI4pWRICAg4paI4paI4pWR4paI4paI4pWRICAg4paI4paI4pWR4paI4paI4paI4paI4paI4pWXICDilojilojilojilojilojilojilZTilZ3ilojilojilZEgIOKWiOKWiOKVkeKWiOKWiOKVkSAgIOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVl+KWiOKWiOKWiOKWiOKWiOKVl1xuLy8g4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4paI4paI4pWR4paI4paI4pWR4pWa4paI4paI4pWX4paI4paI4pWR4paI4paI4pWU4pWQ4pWQ4paI4paI4pWR4paI4paI4pWU4pWQ4pWQ4paI4paI4pWXICDilZrilojilojilZTilZ0gIOKWiOKWiOKVkSAgIOKWiOKWiOKVkeKVmuKWiOKWiOKVlyDilojilojilZTilZ3ilojilojilZTilZDilZDilZ0gIOKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkSAg4paI4paI4pWR4paI4paI4pWRICAg4paI4paI4pWR4pWa4pWQ4pWQ4pWQ4pWQ4paI4paI4pWR4paI4paI4pWU4pWQ4pWQ4pWdXG4vLyDilojilojilojilojilojilojilZTilZ3ilojilojilZHilojilojilZEg4pWa4paI4paI4paI4paI4pWR4paI4paI4pWRICDilojilojilZHilojilojilZEgIOKWiOKWiOKVkSAgIOKWiOKWiOKVkSAgIOKVmuKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVnSDilZrilojilojilojilojilZTilZ0g4paI4paI4paI4paI4paI4paI4paI4pWX4paI4paI4pWRICDilojilojilZHilojilojilojilojilojilojilZTilZ3ilZrilojilojilojilojilojilojilZTilZ3ilojilojilojilojilojilojilojilZHilojilojilojilojilojilojilojilZdcbi8vIOKVmuKVkOKVkOKVkOKVkOKVkOKVnSDilZrilZDilZ3ilZrilZDilZ0gIOKVmuKVkOKVkOKVkOKVneKVmuKVkOKVnSAg4pWa4pWQ4pWd4pWa4pWQ4pWdICDilZrilZDilZ0gICDilZrilZDilZ0gICAg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWdICAg4pWa4pWQ4pWQ4pWQ4pWdICDilZrilZDilZDilZDilZDilZDilZDilZ3ilZrilZDilZ0gIOKVmuKVkOKVneKVmuKVkOKVkOKVkOKVkOKVkOKVnSAg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWdIOKVmuKVkOKVkOKVkOKVkOKVkOKVkOKVneKVmuKVkOKVkOKVkOKVkOKVkOKVkOKVnVxuLy9cbi8vXG5cbi8vIE5vZGVcbmltcG9ydCB7IGpvaW4gfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAncGF0aCc7XG5cbi8vIExpYnNcbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcblxuLy8gQmluYXJ5IE92ZXJkb3NlIFByb2plY3RzXG5pbXBvcnQgRGF0YVRhYmxlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2JvLWRhdGF0YWJsZSc7XG5pbXBvcnQgeyBwYXJ0aWFsQXBwbGljYXRpb24gfSAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2JvLXV0aWxzJztcblxuLy8gQ3J5cHRvSHViXG5pbXBvcnQgc2V0dGluZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vc2V0dGluZ3MnO1xuXG4vLyBIYW5kbGVyc1xuaW1wb3J0IGRhdGFPbkhhbmRsZURhdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2RhdGEtb24taGFuZGxlLWRhdGEnO1xuaW1wb3J0IHN0b3JlT25IYW5kbGVEYXRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL3N0b3JlLW9uLWhhbmRsZS1kYXRhJztcbmltcG9ydCBkYXRhT25CZWZvcmVFbWl0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlscy9kYXRhLW9uLWJlZm9yZS1lbWl0LmpzJztcbmltcG9ydCBzdG9yZU9uQmVmb3JlRW1pdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlscy9zdG9yZS1vbi1iZWZvcmUtZW1pdC5qcyc7XG5cbi8vIEZvcm1hdHRlcnNcbmltcG9ydCBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlQm9vdHN0cmFwICAgICAgICAgICAgICAgZnJvbSAnLi91dGlscy9mb3JtYXR0ZXItY3J5cHRvY29tcGFyZS1ib290c3RyYXAuanMnO1xuaW1wb3J0IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uUHJpY2UgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLXNlY3Rpb24tcHJpY2UuanMnO1xuaW1wb3J0IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uQ29pbmxpc3QgICAgICAgICBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLXNlY3Rpb24tY29pbmxpc3QuanMnO1xuaW1wb3J0IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uRXhjaGFuZ2VzTGlzdCAgICBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLXNlY3Rpb24tZXhjaGFuZ2VzLWxpc3QuanMnO1xuaW1wb3J0IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uRXhjaGFuZ2VzR2VuZXJhbCBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLXNlY3Rpb24tZXhjaGFuZ2VzLWdlbmVyYWwuanMnO1xuaW1wb3J0IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsICAgICBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLXNlY3Rpb24tdG90YWwtdm9sLWZ1bGwuanMnO1xuaW1wb3J0IGZvcm1hdHRlclhlU2VjdGlvbkN1cnJlbmN5ICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci14ZS1zZWN0aW9uLWN1cnJlbmN5LmpzJztcbmltcG9ydCBmb3JtYXR0ZXJNZXNzYXJpU2VjdGlvbk1ldHJpY3MgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlscy9mb3JtYXR0ZXItbWVzc2FyaS1zZWN0aW9uLW1ldHJpY3MuanMnO1xuXG4vLyBKb2IgZmV0Y2hlcnNcbmltcG9ydCBnZXRKb2JzQ3J5cHRvY29tcGFyZVNlY3Rpb25QcmljZSAgICAgICAgICAgICAgZnJvbSAnLi91dGlscy9nZXQtam9icy1jcnlwdG9jb21wYXJlLXNlY3Rpb24tcHJpY2UuanMnO1xuaW1wb3J0IGdldEpvYnNDcnlwdG9jb21wYXJlU2VjdGlvblRvdGFsVm9sRnVsbCAgICAgICBmcm9tICcuL3V0aWxzL2dldC1qb2JzLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi10b3RhbC12b2wtZnVsbC5qcyc7XG5pbXBvcnQgZ2V0Sm9ic01lc3NhcmlTZWN0aW9uTWV0cmljcyAgICAgICAgICAgICAgICAgIGZyb20gJy4vdXRpbHMvZ2V0LWpvYnMtbWVzc2FyaS1zZWN0aW9uLW1ldHJpY3MuanMnO1xuXG4vLyBPdGhlciB1dGlsc1xuaW1wb3J0IGFuYWx5dGljc01lcmdlRGF0YUJ5S2V5ICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2FuYWx5dGljcy1tZXJnZS1kYXRhLWJ5LWtleSc7XG5cbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4vbG9nZ2VyJyk7XG5jb25zdCB7IHNjcmFwZURpciB9ID0gc2V0dGluZ3M7XG5cbnRyeSB7XG5cbiAgcHJvY2Vzcy5vbignd2FybmluZycsIGVycm9yID0+IHtcbiAgICBsb2dnZXIud2FybmluZyhgaW5kZXguanM6XFxuJHtlcnJvci5zdGFja31gKTtcbiAgfSk7XG5cbiAgLy9cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvL1xuICAvLyBPcmRlciBkYXRhIGlzIHByb2Nlc3NlZFxuICAvL1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vXG4gIC8vXG4gIC8vICMxIHNlY3Rpb25jb25maWcuZm9ybWF0dGVyKHJlc3BvbnNlLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERBdGEsIGFwcEJvb3RzdHJhcERhdGEsIGZpbGVOYW1lLCBldmVudClcbiAgLy8gICAgICByZXR1cm4geyBkYXRhLCB0aW1lc3RhbXAgfTtcbiAgLy9cbiAgLy8gICAgVGhlIGZvcm1hdHRlciByZWNlaXZlcyB0aGUgcmVzcG9uc2UgZGF0YSwgdGhlIGRhdGEgdGhhdCB3YXMgc2NyYXBlZCBiZWZvcmUgYW55IHByb2Nlc3NpbmcgaGFzIGhhcHBlbmVkXG4gIC8vICAgIFRoaXMgaXMgd2hlcmUgeW91IHNob3VsZCBmb3JtYXQgdGhlIGluZGl2aWR1YWwgcmVzcG9uc2VzIGludG8gYSBjb2hlc2l2ZSBmb3JtYXQgZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAvL1xuICAvL1xuICAvLyAjMiBzZWN0aW9uY29uZmlnLmhhbmRsZXIob2xkRGF0YSwgbmV3RGF0YSlcbiAgLy8gICAgICByZXR1cm4geyBtZXJnZWREYXRhIH07XG4gIC8vXG4gIC8vICAgIE5PVEU6IHJlbmFtZSBmcm9tIGhhbmRsZXIgdG8gPyAvLyBvbkZvcm1hdHRlZChvbGREYXRhLCBuZXdEYXRhKVxuICAvLyAgICBUaGlzIGhhbmRsZXIgcmVjZWl2ZXMgYSBjb3B5IG9mIHRoZSBwcmV2aW91cyBzZWN0aW9ucyBmb3JtYXR0ZWQgZGF0YSBhbmQgdGhlIG5ldyBmb3JtYXR0ZWQgZGF0YVxuICAvLyAgICBZb3UgY2FuIGRpc2d1YXJkIHRoZSBvbGQgZGF0YSBvciB1c2UgaXQgZm9yIHByb2Nlc3NpbmdcbiAgLy8gICAgQSBzaW5nbGUgbWVyZ2VkIHBpZWNlIG9mIGRhdGEgc2hvdWxkIGJlIHJldHVybmVkXG4gIC8vXG4gIC8vXG4gIC8vICMzIG1lcmdlSGFuZGxlcnNbZXZlbnROYW1lXShkYXRhKVxuICAvLyAgICAgIHJldHVybiBkYXRhO1xuICAvL1xuICAvLyAgICBUaGUgbWVyZ2UgaGFuZGxlciByZWNlaXZlcyBhbGwgdGhlIGZvcm1hdHRlZCBkYXRhIGZvciB0aGUgc2FtZSB0eXBlIG9mIGV2ZW50cyBpbiBhbiBvYmplY3RcbiAgLy8gICAgYGBgXG4gIC8vICAgIHtcbiAgLy8gICAgICBjb2luTGlzdDogY29pbkxpc3REYXRhLFxuICAvLyAgICAgIG90aGVyTmFtZTogb3RoZXJEYXRhXG4gIC8vICAgIH1cbiAgLy8gICAgYGBgXG4gIC8vXG4gIC8vICAgIEluIG1vc3QgY2FzZXMgeW91IHdvdWxkIG1lcmdlIHRoZSBkYXRhIGludG8gYSBzaW5nbGUgb2JqZWN0IG9yIGFycmF5IGFuZCByZXR1cm4gaXQuXG4gIC8vICAgIFlvdSBjYW4gaG93ZXZlciBlbGVjdCB0byBrZWVwIGl0IGFzIGlzXG4gIC8vXG4gIC8vXG4gIC8vICM0IGV2ZW50c1tldmVudE5hbWVdKGRhdGEsIGNhY2hlKVxuICAvLyAgICBjYWNoZS5zZXQoZmlsZU5hbWUsIGRhdGEpO1xuICAvLyAgICAvLyByZXR1cm4gZGF0YTtcbiAgLy9cbiAgLy8gICAgTk9URTogcmVuYW1lIHRvIGV2ZW50c0hhbmRsZXJzKCkgZm9yIGNvbnNpc3RlbmN5XG4gIC8vICAgIFRoZSBldmVudHMgaGFuZGxlciBidWlsZHMgdGhlIGZpbmFsIG91dHB1dCB0aGF0IGdldHMgZW1pdHRlZCBhbmQgc2F2ZWQgdG8gZmlsZVxuICAvLyAgICBUT0RPOiBjaGFuZ2Ugc28gdGhlIGRhdGEgaXMgcmV0dXJuZWQgYW5kIHRoZSBhcHBsaWNhdGlvbiBzYXZlcyB0aGUgZmlsZVxuICAvL1xuICAvL1xuXG4gIC8vXG4gIC8vIENPSU5MSVNUXG4gIC8vIEdldCB0aGUgZnVsbCBsaXN0IG9mIGNvaW5zIHdpdGggSURzXG4gIC8vXG4gIC8vIFRPRE86IGJvb3RzdHJhcERhdGEgbmVlZHMgdG8gY2hhbmdlIHdoZW4gY29pbmxpc3QgY2hhbmdlcyEhISFcbiAgLy9cbiAgY29uc3QgY3J5cHRvY29tcGFyZUNvaW5saXN0ID0ge1xuICAgIGV2ZW50OiAnZGF0YScsXG4gICAgbmFtZTogJ2NvaW5MaXN0JyxcbiAgICBpbnRlcnZhbDogMTAwMCAqIDUsXG4gICAgLy9cbiAgICAvLyBUT0RPOiBjYW4gd2UgcmVtb3ZlIHRoaXMgYW5kIGp1c3Qgc2VhcmNoIGZvciB0aGUga2V5P1xuICAgIC8vXG4gICAgd2F0Y2hEaXJzOiBbYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLWNvaW5saXN0L2RhdGEuanNvbmAsICdhbGwnXSxcbiAgICBnZXRKb2JzKHF1ZXVlLCBib290c3RyYXBEYXRhKSB7XG4gICAgICBxdWV1ZS5wdXNoKHtcbiAgICAgICAgdXJpOiAnaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvYWxsL2NvaW5saXN0JyxcbiAgICAgICAga2V5OiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtY29pbmxpc3QvZGF0YS5qc29uYCxcbiAgICAgICAgY2FjaGVGb3JEYXlzOiAwXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Db2lubGlzdFxuICB9O1xuXG4gIC8vXG4gIC8vIEVYQ0hBTkdFUyBMSVNUXG4gIC8vIEdldCBhbGwgdGhlIGV4Y2hhbmdlcyB0aGF0IENyeXB0b0NvbXBhcmUgaGFzIGludGVncmF0ZWQgd2l0aFxuICAvL1xuICAvLyBUT0RPOiBzZXBhcmF0ZSBpbnRvIGV4Y2hhbmdlc0xpc3QgJiBleGNoYW5nZXNHZW5lcmFsICYgaGF2ZSAyIGZvcm1hdHRlcnMsIHRoZW4gd2UgZG9uJ3QgbmVlZCB0aGUgZ2xvYlxuICAvLyBhbmQgd2UgY2FuIGtlZXAgdGhlIGRlZmF1bHQgZGF0YS5qc29uXG4gIC8vXG4gIGNvbnN0IGNyeXB0b2NvbXBhcmVFeGNoYW5nZXNMaXN0ID0ge1xuICAgIGV2ZW50OiAnZGF0YSxzdG9yZScsXG4gICAgbmFtZTogJ2V4Y2hhbmdlcy1saXN0JyxcbiAgICBpbnRlcnZhbDogMTAwMCAqIDYwICogMSxcbiAgICAvLyBUT0RPOiByZW5hbWUgdGhpcyBmdWNraW5nIGJpdCwgdGhpcyBpcyB3aGVyZSB0aGUgd2F0Y2hlciB3aWxsIGxvb2sgZm9yIGZpbGVzIHRvIGxvYWRcbiAgICAvLyBzbyBpZiB3ZSBhcmUgc2F2aW5nIHRoZW0gaW4gZGlmZmVyZW50IHBsYWNlcyB0aGV5IHdpbGwgbmV2ZXIgYmUgYWRkZWQhXG4gICAgd2F0Y2hEaXJzOiBbc2V0dGluZ3Mua2V5Q3J5cHRvY29tcGFyZUV4Y2hhbmdlc0xpc3QsICdhbGwnXSxcbiAgICBnZXRKb2JzKHF1ZXVlLCBib290c3RyYXBEYXRhKSB7XG4gICAgICBxdWV1ZS5wdXNoKHt1cmk6IHNldHRpbmdzLnVyaUNyeXB0b2NvbXBhcmVFeGNoYW5nZXNMaXN0LCBrZXk6IHNldHRpbmdzLmtleUNyeXB0b2NvbXBhcmVFeGNoYW5nZXNMaXN0LCBjYWNoZUZvckRheXM6IDB9KTtcbiAgICB9LFxuICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25FeGNoYW5nZXNMaXN0XG4gIH07XG5cbiAgLy9cbiAgLy8gRVhDSEFOR0VTIEdFTkVSQUxcbiAgLy9cbiAgY29uc3QgY3J5cHRvY29tcGFyZUV4Y2hhbmdlc0dlbmVyYWwgPSB7XG4gICAgZXZlbnQ6ICdkYXRhLHN0b3JlJyxcbiAgICBuYW1lOiAnZXhjaGFuZ2VzLWdlbmVyYWwnLFxuICAgIGludGVydmFsOiAxMDAwICogNjAgKiA2MCxcbiAgICB3YXRjaERpcnM6IFtzZXR0aW5ncy5rZXlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzR2VuZXJhbCwgJ2FsbCddLFxuICAgIGdldEpvYnMocXVldWUsIGJvb3RzdHJhcERhdGEpIHtcbiAgICAgIHF1ZXVlLnB1c2goe3VyaTogc2V0dGluZ3MudXJpQ3J5cHRvY29tcGFyZUV4Y2hhbmdlc0dlbmVyYWwsIGtleTogc2V0dGluZ3Mua2V5Q3J5cHRvY29tcGFyZUV4Y2hhbmdlc0dlbmVyYWwsIGNhY2hlRm9yRGF5czogMH0pO1xuICAgIH0sXG4gICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvbkV4Y2hhbmdlc0dlbmVyYWxcbiAgfTtcblxuICAvL1xuICAvLyBUT1AgVE9UQUwgVk9MVU1FXG4gIC8vXG4gIGNvbnN0IGNyeXB0b2NvbXBhcmVUb3BUb3RhbFZvbHVtZSA9IHtcbiAgICBldmVudDogJ2RhdGEnLFxuICAgIG5hbWU6ICd0b3RhbFZvbEZ1bGwnLFxuICAgIGludGVydmFsOiAxMDAwICogMTAsXG4gICAgd2F0Y2hEaXJzOiBbc2V0dGluZ3MudGFnS2V5Q3J5cHRvY29tcGFyZVRvdGFsVm9sRnVsbEdyb3VwZWRgJHt7fX1gLCAnYWxsJ10sXG4gICAgZ2V0Sm9iczogZ2V0Sm9ic0NyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsLFxuICAgIGhhbmRsZXIob2xkRGF0YSwgbmV3RGF0YSkge1xuICAgICAgY29uc3QgbWVyZ2VkID0gey4uLm9sZERhdGEsIC4uLm5ld0RhdGF9O1xuICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICB9LFxuICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Ub3RhbFZvbEZ1bGxcbiAgfTtcblxuICAvL1xuICAvLyBYRSBDVVJSRU5DWVxuICAvL1xuICBjb25zdCB4ZUN1cnJlbmN5ID0ge1xuICAgIGV2ZW50OiAnZGF0YScsXG4gICAgbmFtZTogJ2N1cnJlbmN5JyxcbiAgICBpbnRlcnZhbDogMTAwMCAqIDYwICogNjAgKiAyNCxcbiAgICB3YXRjaERpcnM6IFtzZXR0aW5ncy50YWdLZXlYZUN1cnJlbmN5VGFibGVzYCR7J1VTRCd9YCwgJ2FsbCddLFxuICAgIGdldEpvYnMocXVldWUsIGJvb3RzdHJhcERhdGEpIHtcbiAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICB1cmk6IHNldHRpbmdzLnRhZ1VyaVhlQ3VycmVuY3lUYWJsZXNgJHsnVVNEJ31gLFxuICAgICAgICBrZXk6IHNldHRpbmdzLnRhZ0tleVhlQ3VycmVuY3lUYWJsZXNgJHsnVVNEJ31gLFxuICAgICAgICBjYWNoZUZvckRheXM6IDBcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXJYZVNlY3Rpb25DdXJyZW5jeVxuICB9O1xuXG4gIC8vXG4gIC8vIE1FU1NBUkkgTUVUUklDU1xuICAvL1xuICBjb25zdCBtZXNzYXJpTWV0cmljcyA9IHtcbiAgICBldmVudDogJ2RhdGEnLFxuICAgIG5hbWU6ICdtZXNzYXJpLW1ldHJpY3MnLFxuICAgIGludGVydmFsOiAxMDAwICogNSxcbiAgICB3YXRjaERpcnM6IFtgJHtzY3JhcGVEaXJ9L21lc3NhcmktbWV0cmljLyoqLypgLCAnYWxsJ10sXG4gICAgZ2V0Sm9iczogZ2V0Sm9ic01lc3NhcmlTZWN0aW9uTWV0cmljcyxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlck1lc3NhcmlTZWN0aW9uTWV0cmljcyxcbiAgfTtcblxuICAvL1xuICAvLyBUT0RPOlxuICAvL1xuICAvLyBjb25zdCBkYXRhdGFibGUgPSBuZXcgRGF0YVRhYmxlKG9wdGlvbnMpO1xuICAvL1xuICAvLyBkYXRhdGFibGUuYXBpLm5ldyhjcnlwdG9jb21wYXJlKTtcbiAgLy8gZGF0YXRhYmxlLmFwaS5uZXcoeGUpO1xuICAvLyBkYXRhdGFibGUuYXBpLm5ldyhtZXNzYXJpKTtcblxuICAvLyBkYXRhdGFibGUuYXBpLmNyeXB0b2NvbXBhcmUuYWRkKCk7XG4gIC8vIGRhdGF0YWJsZS5hcGkuY3J5cHRvY29tcGFyZS5hZGQoKTtcbiAgLy8gZGF0YXRhYmxlLmFwaS5jcnlwdG9jb21wYXJlLmFkZCgpO1xuICAvLyBkYXRhdGFibGUuYXBpLnhlLmFkZCgpO1xuICAvLyBkYXRhdGFibGUuYXBpLm1lc3NhcmkuYWRkKCk7XG5cbiAgLy8gZGF0YXRhYmxlLmFwaS5vdXRwdXQoZGF0YSlcbiAgLy8gZGF0YXRhYmxlLmFwaS5vdXRwdXQoc3RvcmUpXG5cbiAgZnVuY3Rpb24gZ2V0Rmlyc3RYUm93cyhkYXRhLCBudW1Sb3dzKSB7XG5cbiAgICBsZXQgaWQ7XG4gICAgbGV0IGlkcztcbiAgICBsZXQgcm93cztcbiAgICBsZXQgb3V0cHV0ID0ge307XG5cbiAgICBjb25zdCBpZEZpZWxkID0gJ2NjLXRvdGFsLXZvbC1mdWxsLUlkJztcbiAgICBjb25zdCB2b2xGaWVsZCA9ICdjYy10b3RhbC12b2wtZnVsbC1UT1RBTFZPTFVNRTI0SFRPJztcblxuICAgIHJvd3MgPSBPYmplY3RcbiAgICAgIC52YWx1ZXMoZGF0YSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBiW3ZvbEZpZWxkXSAtIGFbdm9sRmllbGRdKVxuICAgICAgLnNwbGljZSgwLCBudW1Sb3dzKTtcblxuICAgIGlkcyA9IHJvd3MubWFwKGEgPT4gYVtpZEZpZWxkXSk7XG4gICAgZm9yIChpZCBvZiBpZHMpIG91dHB1dFtpZF0gPSBkYXRhW2lkXTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgbGV0IGluaXREYXRhID0ge307XG4gIGNvbnN0IGRhdGFUYWJsZSA9IG5ldyBEYXRhVGFibGUoe1xuXG4gICAgZGJEaXI6IHNldHRpbmdzLmRiRGlyLFxuICAgIGNhY2hlRGlyOiBzZXR0aW5ncy5jYWNoZURpcixcbiAgICBnZW5lcmF0ZWREaXI6IHNldHRpbmdzLmdlbmVyYXRlZERpcixcblxuICAgIHNlcnZlcjoge1xuICAgICAgcHViOiBqb2luKF9fZGlybmFtZSwgJy4uL2Rpc3QvcHVibGljJyksXG4gICAgICBwb3J0OiAzMDAxLFxuICAgICAgaW5kZXg6ICcuLi9kaXN0L2luZGV4Lmh0bWwnLFxuICAgIH0sXG5cbiAgICAvL1xuICAgIC8vIFRPRE9cbiAgICAvL1xuICAgIC8vIFRoaXMgaXMgd2hlcmUgeW91IHdlcmUuXG4gICAgLy8gbWFrZSBhcHAgd2lkZSBib290c3RyYXAgd29yaywgYW5kIGNsaXAgZGF0YSBieSBtYXhSb3dzIG9yIHdoYXRldmVyIGl0cyBjYWxsZWQuXG4gICAgLy9cbiAgICBib290c3RyYXA6IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVCb290c3RyYXAsXG5cbiAgICBldmVudHM6IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgb25CZWZvcmVIYW5kbGVEYXRhOiBhbmFseXRpY3NNZXJnZURhdGFCeUtleSxcbiAgICAgICAgb25IYW5kbGVEYXRhOiBwYXJ0aWFsQXBwbGljYXRpb24oZGF0YU9uSGFuZGxlRGF0YSwge30pLFxuICAgICAgICBvbkFmdGVyQ29ubmVjdChldmVudCwgc29ja2V0LCBkYXRhKSB7XG4gICAgICAgICAgc29ja2V0LmVtaXQoZXZlbnQsIGRhdGFPbkJlZm9yZUVtaXQoe2RpZmY6IGZhbHNlfSwgZGF0YSwgaW5pdERhdGEpKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVFbWl0OiBwYXJ0aWFsQXBwbGljYXRpb24oZGF0YU9uQmVmb3JlRW1pdCwge30pLFxuICAgICAgICBvbkJlZm9yZUJvb3RzdHJhcFNhdmU6IGRhdGEgPT4ge1xuICAgICAgICAgIGluaXREYXRhID0gZ2V0Rmlyc3RYUm93cyhkYXRhLCBzZXR0aW5ncy5tYXhSb3dzVGVtcGxhdGVkSW4pO1xuICAgICAgICAgIGlmICghc2V0dGluZ3MubWF4Um93c1RlbXBsYXRlZEluKSByZXR1cm4gZGF0YTtcbiAgICAgICAgICByZXR1cm4gaW5pdERhdGE7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzdG9yZToge1xuICAgICAgICBvbkJlZm9yZUhhbmRsZURhdGE6IGRhdGEgPT4gZGF0YSxcbiAgICAgICAgb25IYW5kbGVEYXRhOiBwYXJ0aWFsQXBwbGljYXRpb24oc3RvcmVPbkhhbmRsZURhdGEsIHt9KSxcbiAgICAgICAgb25BZnRlckNvbm5lY3QoZXZlbnQsIHNvY2tldCwgZGF0YSkge1xuICAgICAgICAgIHNvY2tldC5lbWl0KGV2ZW50LCBzdG9yZU9uQmVmb3JlRW1pdCh7ZGlmZjogZmFsc2V9LCBkYXRhLCB7fSkpO1xuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZUVtaXQ6IHBhcnRpYWxBcHBsaWNhdGlvbihzdG9yZU9uQmVmb3JlRW1pdCwge30pLFxuICAgICAgICBvbkJlZm9yZUJvb3RzdHJhcFNhdmU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2NyYXBlU2l0ZXM6IHtcbiAgICAgIGNyeXB0b2NvbXBhcmU6IHtcbiAgICAgICAgY2FjaGVGb3I6IHNldHRpbmdzLmNhY2hlRm9yQ3J5cHRvY29tcGFyZSxcbiAgICAgICAgYm9vdHN0cmFwOiBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlQm9vdHN0cmFwLFxuICAgICAgICByYXRlTGltaXREZWxheU1zOiBzZXR0aW5ncy5yYXRlTGltaXRDcnlwdG9jb21wYXJlLFxuICAgICAgICBzZWN0aW9uczogW1xuICAgICAgICAgIGNyeXB0b2NvbXBhcmVDb2lubGlzdCxcbiAgICAgICAgICBjcnlwdG9jb21wYXJlRXhjaGFuZ2VzTGlzdCxcbiAgICAgICAgICBjcnlwdG9jb21wYXJlRXhjaGFuZ2VzR2VuZXJhbCxcbiAgICAgICAgICBjcnlwdG9jb21wYXJlVG9wVG90YWxWb2x1bWUsXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBtZXNzYXJpOiB7XG4gICAgICAgIGNhY2hlRm9yOiBzZXR0aW5ncy5jYWNoZUZvck1lc3NhcmksXG4gICAgICAgIGJvb3RzdHJhcDogY2FjaGUgPT4ge1xuICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9LFxuICAgICAgICByYXRlTGltaXREZWxheU1zOiBzZXR0aW5ncy5yYXRlTGltaXRNZXNzYXJpLFxuICAgICAgICBzZWN0aW9uczogW1xuICAgICAgICAgIG1lc3NhcmlNZXRyaWNzXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB4ZToge1xuICAgICAgICBjYWNoZUZvcjogc2V0dGluZ3MuY2FjaGVGb3JYZSxcbiAgICAgICAgYm9vdHN0cmFwOiAoKSA9PiB7cmV0dXJuIHt9fSxcbiAgICAgICAgcmF0ZUxpbWl0RGVsYXlNczogc2V0dGluZ3MucmF0ZUxpbWl0WGUsXG4gICAgICAgIHNlY3Rpb25zOiBbXG4gICAgICAgICAgeGVDdXJyZW5jeVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfVxuICB9KTtcblxufVxuXG5jYXRjaCAoZXJyb3IpIHtcblxuICBsb2dnZXIuZXJyb3IoYFVtIHNvbWUgZXJyb3IgaGFwcGVuZWQgeW86ICR7ZXJyb3J9YCk7XG4gIHByb2Nlc3MuZXhpdCgxKTtcblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBMaWJzXG5jb25zdCB3aW5zdG9uID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG4vLyBDcnlwdG9odWJcbmNvbnN0IHNldHRpbmdzID0gcmVxdWlyZSgnLi9zZXR0aW5ncycpO1xuXG4vL1xuLy8ge2Vycm9yOiAwLCB3YXJuOiAxLCBpbmZvOiAyLCB2ZXJib3NlOiAzLCBkZWJ1ZzogNCwgc2lsbHk6IDV9XG4vL1xuY29uc3QgbG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICBsZXZlbDogJ3NpbGx5JyxcbiAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5qc29uKCksXG4gIGV4aXRPbkVycm9yOiBmYWxzZSxcbiAgdHJhbnNwb3J0czogW1xuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7ZmlsZW5hbWU6ICdsb2dzL2Vycm9yLmxvZycsIGxldmVsOiAnZXJyb3InfSksXG4gICAgLy8gbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtmaWxlbmFtZTogJ2xvZ3MvZGVidWcubG9nJywgbGV2ZWw6ICdkZWJ1Zyd9KSxcbiAgICAvLyBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoe2ZpbGVuYW1lOiAnbG9ncy9pbmZvLmxvZycsIGxldmVsOiAnaW5mbyd9KSxcbiAgXVxufSk7XG5cbmlmIChzZXR0aW5ncy5sb2dnZXIpIHtcbiAgbG9nZ2VyLmFkZChcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgZmlsZW5hbWU6ICdsb2dzL2NvbnNvbGUubG9nJyxcbiAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKCksXG4gICAgICAgIHdpbnN0b24uZm9ybWF0LnRpbWVzdGFtcCh7Zm9ybWF0OiAnWVlZWS1NTS1ERCBISDptbTpzcyd9KVxuICAgICAgKSxcbiAgICAgIGxldmVsOiAnaW5mbydcbiAgICB9KVxuICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2dlcjtcbiIsIi8vIE5vZGVcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbi8vIExpYnNcbmNvbnN0IGFyZ3YgPSByZXF1aXJlKCdhcmd2Jyk7XG5cbi8vIFNldHRpbmdzXG5nbG9iYWwuZ2l0aHViQ2xpZW50SWQgPSAnYzdhMmMxMTFhMjdkZWU1MGJiYTAnO1xuZ2xvYmFsLmdpdGh1YkNsaWVudFNlY3JldCA9ICc1ZTRiOGIzNDhjODE2NTUzNjM5MWJkYmY2MDQxNjg1ZjI3MDUwM2YwJztcblxuLy8gQ2FjaGUgZm9yIGRheXNcbi8vIGdsb2JhbC5jYWNoZUZvclhlID0gMTtcbmdsb2JhbC5jYWNoZUZvckdpdGxvZyA9IDc7XG5nbG9iYWwuY2FjaGVGb3JHaXRodWJSZXBvID0gNztcbmdsb2JhbC5jYWNoZUZvckdpdGh1YkZvcmtzID0gMzA7XG4vLyBnbG9iYWwuY2FjaGVGb3JDcnlwdG9jb21wYXJlID0gMzA7XG4vLyBnbG9iYWwuY2FjaGVGb3JDb2lubWFya2V0Y2FwID0gMzA7XG4vLyBnbG9iYWwuY2FjaGVGb3JDb2lubWFya2V0Y2FwUHJvamVjdHNKc29uID0gMTtcbi8vIGdsb2JhbC5jYWNoZUZvckNvaW5tYXJrZXRjYXBQcm9qZWN0SHRtbCA9IDMwO1xuXG4vLyBMZWF2ZSBpbiBleGVjdXRpb24gb3JkZXJcbmdsb2JhbC5zZXR0aW5nc1NjcmFwZUNyeXB0b2NvbXBhcmUgPSB0cnVlO1xuZ2xvYmFsLnNldHRpbmdzU2NyYXBlQ29pbm1hcmtldGNhcCA9IGZhbHNlO1xuZ2xvYmFsLnNldHRpbmdzU2NyYXBlWGUgPSBmYWxzZTtcbi8vIGdsb2JhbC5zZXR0aW5nc0dldFJlcG9EYXRhID0gdHJ1ZTtcbi8vIGdsb2JhbC5zZXR0aW5nc0Nsb25lUmVwb3MgPSB0cnVlO1xuLy8gZ2xvYmFsLnNldHRpbmdzR2V0TG9nRGF0YSA9IHRydWU7XG4vLyBnbG9iYWwuc2V0dGluZ3NHZXRGb3JrRGF0YSA9IHRydWU7XG4vLyBnbG9iYWwuc2V0dGluZ3NTZXRGaXJzdENvbW1pdCA9IHRydWU7XG4vLyBnbG9iYWwuc2V0dGluZ3NTeW5jQ29tbWl0cyA9IHRydWU7XG4vLyBnbG9iYWwuc2V0dGluZ3NIYXNoRmlsZXMgPSB0cnVlO1xuXG4vLyBTdHVmZiB3ZSBmb3VuZCB3aGlsZSBwYXJzaW5nIHRoZSBkYXRhXG5nbG9iYWwubm90ZXMgPSBbXTtcblxuLy8gQml0YnVja2V0IDovXG4vLyBBcmRvcjogaHR0cHM6Ly9iaXRidWNrZXQub3JnL0plbHVyaWRhL2FyZG9yL3NyY1xuLy8gTlhUOiBodHRwczovL2JpdGJ1Y2tldC5vcmcvSmVhbkx1Y1BpY2FyZC9ueHQvc3JjXG5nbG9iYWwuZ2l0aHViT3ZlcnJpZGVzID0ge1xuICAnZ2FzJzogICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZW8tcHJvamVjdCcsXG4gICdraW4nOiAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2tpbmVjb3N5c3RlbScsXG4gICd0ZW54JzogICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3RlbngtdGVjaCcsXG4gICdnbm9zaXMnOiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2dub3NpcycsXG4gICdhcmFnb24nOiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2FyYWdvbi9hcmFnb24tbmV0d29yay10b2tlbicsXG4gICdmdW5mYWlyJzogICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2Z1bmZhaXItdGVjaCcsXG4gICdiYXNpYy1hdHRlbnRpb24tdG9rZW4nOiAnaHR0cHM6Ly9naXRodWIuY29tL2JyYXZlLWludGwnLFxufVxuXG5jb25zdCBhcmdzID0gYXJndi5vcHRpb24oW1xuICB7XG4gICAgbmFtZTogJ2xvY2FsJyxcbiAgICBzaG9ydDogJ2wnLFxuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZXNjcmlwdGlvbjogJ0NoYW5nZXMgcmVxdWlyZWQgdG8gbWltaWMgZGV2ZWxvcG1lbnQgYnVpbGQgbG9jYWxseScsXG4gICAgZXhhbXBsZTogYCdzY3JpcHQgLS1sb2NhbD10cnVlJyBvciAnc2NyaXB0IC1sIHRydWUnYFxuICB9LFxuICB7XG4gICAgbmFtZTogJ2xvZ2dlcicsXG4gICAgc2hvcnQ6ICdMJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVzY3JpcHRpb246ICdMb2cgdG8gY29uc29sZScsXG4gICAgZXhhbXBsZTogYCdzY3JpcHQgLS1sb2dnZXI9dHJ1ZScgb3IgJ3NjcmlwdCAtTCB0cnVlJ2BcbiAgfVxuXSkucnVuKCk7XG5cbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgJiYgYXJncy5vcHRpb25zLmxvY2FsICE9PSB0cnVlO1xuXG5jb25zdCBjYWNoZURpciA9IGlzUHJvZFxuICA/ICcvaG9tZS91YnVudHUvY3J5cHRvaHViLWNhY2hlJ1xuICA6IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vY2FjaGUnKTtcblxuY29uc3QgZ2VuZXJhdGVkRGlyID0gYCR7Y2FjaGVEaXJ9L3RtcC1nZW5lcmF0ZWRgO1xuY29uc3Qgc2NyYXBlRGlyICAgID0gYCR7Y2FjaGVEaXJ9L3RtcC1zY3JhcGVgO1xuY29uc3QgZGJEaXIgICAgICAgID0gYCR7Y2FjaGVEaXJ9L2RiYDtcblxuY29uc3QgY3J5cHRvY29tcGFyZUFwaUtleSA9ICdiM2FkNDcwMTJjYzEzNDkxMWE0Nzc1ZDk1NWVmMmI5Y2Y4Yjg1ZjU0ZDM4M2Q4MWMxYmY3NzMzOGE1OWIxMjIyJztcblxubGV0IGZpZWxkV2hpdGVsaXN0ID0gW1xuXG4gICdjYy10b3RhbC12b2wtZnVsbC1JZCcsXG4gICdjYy10b3RhbC12b2wtZnVsbC1GdWxsTmFtZScsXG4gICdjYy10b3RhbC12b2wtZnVsbC1QUklDRScsXG4gICdjYy10b3RhbC12b2wtZnVsbC1DSEFOR0VQQ1REQVknLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtVE9UQUxWT0xVTUUyNEhUTycsXG4gICdjYy10b3RhbC12b2wtZnVsbC1NS1RDQVAnLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtU1VQUExZJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLVByb29mVHlwZScsXG4gICdjYy10b3RhbC12b2wtZnVsbC1BbGdvcml0aG0nLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtTmV0SGFzaGVzUGVyU2Vjb25kJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLUltYWdlVXJsJyxcblxuICAnY2MtY29pbmxpc3QtU3ltYm9sJyxcblxuICAnbS1tZXRyaWNzLXNlY3RvcnMnLFxuICAvLyAnbS1tZXRyaWNzLWNhdGVnb3JpZXMnLFxuICAvLyAnbS1tZXRyaWNzLWRhdGUtY3JlYXRlZCcsXG4gICdtLW1ldHJpY3MtYXRoLXByaWNlJyxcbiAgLy8gJ20tbWV0cmljcy1hdGgtZGF0ZScsXG4gIC8vICdtLW1ldHJpY3MtYXRoLWRheXMnLFxuICAvLyAnbS1tZXRyaWNzLWF0aC1wZXJjZW50LWRvd24nLFxuICAvLyAnbS1tZXRyaWNzLWF0aC1icmVha2V2ZW4tbXVsdGlwbGUnLFxuICAnbS1tZXRyaWNzLWN5Y2xlLWxvdy1wcmljZScsXG4gIC8vICdtLW1ldHJpY3MtY3ljbGUtbG93LWRhdGEnLFxuICAvLyAnbS1tZXRyaWNzLWN5Y2xlLWxvdy1wZXJjZW50LXVwJyxcbiAgLy8gJ20tbWV0cmljcy1jeWNsZS1sb3ctZGF5cy1zaW5jZScsXG4gIC8vICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtbGFzdC0xLXdlZWsnLFxuICAvLyAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWxhc3QtMS1tb250aCcsXG4gIC8vICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtbGFzdC0zLW1vbnRocycsXG4gIC8vICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtbGFzdC0xLXllYXInLFxuICAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWJ0Yy1sYXN0LTEtd2VlaycsXG4gIC8vICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtYnRjLWxhc3QtMS1tb250aCcsXG4gIC8vICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtYnRjLWxhc3QtMy1tb250aHMnLFxuICAvLyAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWJ0Yy1sYXN0LTEteWVhcicsXG5cbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLVBSSUNFOmxhc3QnLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtVE9UQUxWT0xVTUUyNEhUTzpsYXN0JyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLU1LVENBUDpsYXN0JyxcblxuICAnY3J5cHRvaHViLXByaWNlLWJ0YycsXG4gICdjcnlwdG9odWItcHJpY2UtaGlzdG9yeScsXG4gICdjcnlwdG9odWItbnVtYmVyT2ZFeGNoYW5nZXMnLFxuICAnY3J5cHRvaHViLW51bWJlck9mUGFpcnMnLFxuICAnY3J5cHRvaHViLW51bWJlck9mRmlhdFBhaXJzJyxcbiAgJ2NyeXB0b2h1Yi1udW1iZXJPZkZpYXRDdXJyZW5jaWVzJyxcblxuICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3REZXgnLFxuICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3RBY2NlcHRzQm90aCcsXG4gICdjcnlwdG9odWItZXhjaGFuZ2VzTGlzdENyeXB0b09ubHknLFxuXG4gICdjcnlwdG9odWItcHJpY2UtYnRjOmxhc3QnLFxuXG5dO1xuXG4vLyBLZWVwIHRoZSBsYXN0IHZhbHVlIG9mIGVhY2ggb2YgdGhlc2UgZmllbGRzXG4vLyBpbiBhIG5ldyBmaWVsZCB3aXRoIHRoZSBzdWZmaXggYDpsYXN0YFxuY29uc3QgZmllbGRMYXN0VmFsdWUgPSBbXG5cbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLVBSSUNFJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLVRPVEFMVk9MVU1FMjRIVE8nLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtTUtUQ0FQJyxcbiAgJ2NyeXB0b2h1Yi1wcmljZS1idGMnLFxuXG5dO1xuXG5maWVsZFdoaXRlbGlzdCA9IFsuLi5maWVsZFdoaXRlbGlzdCwgLi4uZmllbGRXaGl0ZWxpc3QubWFwKHYgPT4gdiArPSctdGltZXN0YW1wJyldO1xuXG4vKipcbiAqXG4gKiAgdXJpQ3J5cHRvY29tcGFyZUxpc3Q6XG4gKiAgICBSZXR1cm5zIGFsbCB0aGUgY29pbnMgdGhhdCBDcnlwdG9Db21wYXJlIGhhcyBhZGRlZCB0byB0aGUgd2Vic2l0ZVxuICpcbiAqICB1cmlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzOlxuICogICAgUmV0dXJucyBhbGwgdGhlIGV4Y2hhbmdlcyB0aGF0IENyeXB0b0NvbXBhcmUgaGFzIGludGVncmF0ZWQgd2l0aCBhbmQgdGhlaXIgc3RhdHVzLFxuICogICAgaW5jbHVkaW5nIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGV4Y2x1ZGVkIGZyb20gcHJpY2luZyBhbmQgdm9sdW1lc1xuICpcbiAqICB0YWdVcmlDcnlwdG9jb21wYXJlVHJhZGluZ0luZm9TaW5nbGU6XG4gKiAgICBDb21wdXRlIHRoZSBjdXJyZW50IHRyYWRpbmcgaW5mbyAocHJpY2UsIHZvbCwgb3BlbiwgaGlnaCwgbG93IGV0Yykgb2YgdGhlXG4gKiAgICByZXF1ZXN0ZWQgcGFpciBhcyBhIHZvbHVtZSB3ZWlnaHRlZCBhdmVyYWdlIGJhc2VkIG9uIHRoZSBleGNoYW5nZXMgcmVxdWVzdGVkXG4gKlxuICpcbiAqXG4gKiAgdGFnVXJpQ3J5cHRvY29tcGFyZVNuYXBzaG90OlxuICogICAgR2V0IHRoZSBnZW5lcmFsLCBzdWJzICh1c2VkIHRvIGNvbm5lY3QgdG8gdGhlIHN0cmVhbWVyIGFuZCB0byBmaWd1cmUgb3V0IHdoYXQgZXhjaGFuZ2VzIHdlIGhhdmVcbiAqICAgIGRhdGEgZm9yIGFuZCB3aGF0IGFyZSB0aGUgZXhhY3QgY29pbiBwYWlycyBvZiB0aGUgY29pbikgYW5kIHRoZSBhZ2dyZWdhdGVkIHByaWNlcyBmb3IgYWxsIHBhaXJzIGF2YWlsYWJsZVxuICpcbiAqICB0YWdVcmlDcnlwdG9jb21wYXJlU29jaWFsc3RhdHM6XG4gKiAgICBHZXQgQ3J5cHRvQ29tcGFyZSB3ZWJzaXRlLCBGYWNlYm9vaywgY29kZSByZXBvc2l0b3J5LCBUd2l0dGVyIGFuZCBSZWRkaXQgZGF0YSBmb3IgY29pbnNcbiAqICAgIElmIGNhbGxlZCB3aXRoIHRoZSBpZCBvZiBhIGNyeXB0b3BpYW4geW91IGp1c3QgZ2V0IGRhdGEgZnJvbSBDcnlwdG9jb21wYXJlIHdlYnNpdGUgdGhhdCBpcyBhdmFpbGFibGUgdG8gdGhlIHB1YmxpY1xuICpcbiAqL1xuY29uc3Qgc2V0dGluZ3MgPSB7XG5cbiAgLy9cbiAgLy8gQXBwIHNldHRpbmdzXG4gIC8vXG4gIGRlYnVnOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsIC8vIFRPRE86IENoYW5nZSB0aGlzIHRvIGFuIGVudiB2YXJcbiAgbG9nZ2VyOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5vcHRpb25zLmxvZ2dlciB8fCBmYWxzZSxcbiAgbWF4Um93c1RlbXBsYXRlZEluOiAgICAgICAgICAgICAgICAgICAgICAgICAgNTAsXG4gIG1heFJlY29yZHNTY3JhcGVkOiAgICAgICAgICAgICAgICAgICAgICAgICAgIDQwMCxcblxuICAvLyBUaGUgZGlmZi1qc29uIGxpYnJhcnkgaGFzIGEgYnVnIHdoZXJlIG51bGwgZmllbGQgdGhyb3cgYW4gZXJyb3Igb24gYWRkLlxuICAvLyBGb3Igbm93IHdlIGFyZSBqdXN0IG5vdCBnb2luZyB0byBzZW5kIG51bGwgZmllbGRzLCBsaWdodGVucyB0aGUgbG9hZCBhbnlob3cuXG4gIHJlbW92ZU51bGxGaWVsZHM6IHRydWUsXG5cbiAgLy9cbiAgLy8gRGlyZWN0b3JpZXMgJiBQYXRoc1xuICAvL1xuICBkYkRpcixcbiAgYXBwUm9vdDogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSksXG4gIGNhY2hlRGlyLFxuICBzY3JhcGVEaXIsXG4gIGdlbmVyYXRlZERpcixcblxuICAvL1xuICAvLyBMaXN0c1xuICAvL1xuICBmaWVsZFdoaXRlbGlzdCxcbiAgZmllbGRMYXN0VmFsdWUsXG5cbiAgLy9cbiAgLy8gQ2FjaGVcbiAgLy8gTk9URTogd2UgZG9udCByZWFsbHkgbmVlZCB0aGlzIGlmIHdlIGFyZSB1c2luZyByYXRlIGxpbWl0cy4gVXNpbmcgaXQgZm9yIGRldiB0aG91Z2hcbiAgLy9cbiAgY2FjaGVGb3JYZTogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcm9kID8gMCA6IDEwMDAgKiA2MCAqIDEwLFxuICBjYWNoZUZvck1lc3Nhcmk6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Byb2QgPyAwIDogMTAwMCAqIDYwICogMTAsXG4gIGNhY2hlRm9yQ3J5cHRvY29tcGFyZTogICAgICAgICAgICAgICAgICAgICAgIGlzUHJvZCA/IDAgOiAxMDAwICogNjAgKiAxMCxcblxuICAvL1xuICAvLyBSYXRlTGltaXRzXG4gIC8vXG5cbiAgLy9cbiAgLy8gRnJvbSBjcnlwdG9jb21wYXJlLmNvbTpcbiAgLy8gICBDYWNoaW5nOiAxMCBzZWNvbmRzXG4gIC8vICAgUmF0ZSBsaW1pdHM6XG4gIC8vICAgICBNb250aCAgLSAxMDAwMDBcbiAgLy8gICAgIERheSAgICAtIDMyMDBcbiAgLy8gICAgIEhvdXIgICAtIDEzMFxuICAvLyAgICAgTWludXRlIC0gMlxuICAvLyAgICAgU2Vjb25kIC0gMC4wMzhcbiAgLy9cbiAgLy8gIDI2Nzg0IG1zIGJldHdlZW4gcmVxdWVzdHMgOihcbiAgLy9cbiAgcmF0ZUxpbWl0Q3J5cHRvY29tcGFyZTogICAgICAgICAgICAgICAgICAgICAgMjY3ODQsXG5cbiAgLy8gVW5rbm93IGF0IHRoZSBtb21lbnRcbiAgcmF0ZUxpbWl0TWVzc2FyaTogICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwMCAqIDEwLFxuXG4gIHJhdGVMaW1pdFhlOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMDAgKiA2MCAqIDYwICogMjQsXG5cbiAgLy9cbiAgLy8gUXVldWVzXG4gIC8vXG4gIHF1ZXVlQ29pbm1hcmtldGNhcDogICAgICAgICAgICAgICAgICAgICAgICAgIDEwMDAgKiA2MCAqIDYwLFxuXG4gIC8vXG4gIC8vIE1lc3NhcmlcbiAgLy9cbiAgdGFnVXJpTWVzc2FyaU1ldHJpY3M6ICAgICAgICAgICAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGBodHRwczovL2RhdGEubWVzc2FyaS5pby9hcGkvdjEvYXNzZXRzLyR7aWR9L21ldHJpY3NgLFxuICB0YWdLZXlNZXNzYXJpTWV0cmljczogICAgICAgICAgICAgICAgICAgICAgICAoc3RyLCBpZCkgPT4gYCR7c2NyYXBlRGlyfS9tZXNzYXJpLW1ldHJpYy8ke2lkfS9kYXRhLmpzb25gLFxuICB0YWdLZXlNZXNzYXJpTWV0cmljc0dyb3VwZWQ6ICAgICAgICAgICAgICAgICAoc3RyLCBvYikgPT4gYCR7c2NyYXBlRGlyfS9tZXNzYXJpLW1ldHJpYy1ncm91cGVkL2RhdGEuanNvbmAsXG5cbiAgLy9cbiAgLy8gQ3J5cHRvY29tcGFyZVxuICAvL1xuXG4gIHRhZ1VyaUNyeXB0b2NvbXBhcmVUb3RhbFZvbEZ1bGw6ICAgICAgICAgICAgIChzdHIsIG9iKSA9PiBgaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvdG9wL3RvdGFsdm9sZnVsbD9saW1pdD0ke29iLmxpbWl0fSZ0c3ltPVVTRCZwYWdlPSR7b2IucGFnZX1gLFxuICB0YWdLZXlDcnlwdG9jb21wYXJlVG90YWxWb2xGdWxsOiAgICAgICAgICAgICAoc3RyLCBvYikgPT4gYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLXRvdGFsdm9sZnVsbC9wYWdlLSR7b2IucGFnZX0uanNvbmAsXG4gIHRhZ0tleUNyeXB0b2NvbXBhcmVUb3RhbFZvbEZ1bGxHcm91cGVkOiAgICAgIChzdHIsIG9iKSA9PiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtdG90YWx2b2xmdWxsLWdyb3VwZWQvZGF0YS5qc29uYCxcblxuICB1cmlDcnlwdG9jb21wYXJlTGlzdDogICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvYWxsL2NvaW5saXN0JyxcbiAga2V5Q3J5cHRvY29tcGFyZUxpc3Q6ICAgICAgICAgICAgICAgICAgICAgICAgYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLWNvaW5saXN0L2RhdGEuanNvbmAsXG5cbiAgdXJpQ3J5cHRvY29tcGFyZUV4Y2hhbmdlc0xpc3Q6ICAgICAgICAgICAgICAgJ2h0dHBzOi8vbWluLWFwaS5jcnlwdG9jb21wYXJlLmNvbS9kYXRhL3YyL2FsbC9leGNoYW5nZXMnLFxuICBrZXlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzTGlzdDogICAgICAgICAgICAgICBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtZXhjaGFuZ2VzLWxpc3QvZGF0YS5qc29uYCxcbiAgdXJpQ3J5cHRvY29tcGFyZUV4Y2hhbmdlc0dlbmVyYWw6ICAgICAgICAgICAgYGh0dHBzOi8vbWluLWFwaS5jcnlwdG9jb21wYXJlLmNvbS9kYXRhL2V4Y2hhbmdlcy9nZW5lcmFsP2FwaV9rZXk9JHtjcnlwdG9jb21wYXJlQXBpS2V5fWAsXG4gIGtleUNyeXB0b2NvbXBhcmVFeGNoYW5nZXNHZW5lcmFsOiAgICAgICAgICAgIGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS1leGNoYW5nZXMtZ2VuZXJhbC9kYXRhLmpzb25gLFxuXG4gIC8vIHVyaUNyeXB0b2NvbXBhcmVFeGNoYW5nZVN0YXR1czogICAgICAgICAgICAgICdodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9hbGwvY2NjYWdnZXhjaGFuZ2VzJyxcbiAgLy8ga2V5Q3J5cHRvY29tcGFyZUV4Y2hhbmdlU3RhdHVzOiAgICAgICAgICAgICAgYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLWV4Y2hhbmdlLXN0YXR1cy9kYXRhLmpzb25gLFxuXG4gIHRhZ1VyaUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb1NpbmdsZTogICAgICAgIChzdHIsIG9iKSA9PiBgaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvZ2VuZXJhdGVBdmc/ZnN5bT0ke29iLnN5bWJvbDF9JnRzeW09JHtvYi5zeW1ib2wyfSZlPSR7b2IuZXhjaGFuZ2V9YCxcbiAgdGFnS2V5Q3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvU2luZ2xlOiAgICAgICAgKHN0ciwgb2IpID0+IGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS1leGNoYW5nZS8ke29iLmV4Y2hhbmdlfS1wYWlycy0ke29iLnN5bWJvbDF9LSR7b2Iuc3ltYm9sMn0uanNvbmAsXG4gIHRhZ0tleUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb1NpbmdsZUdyb3VwZWQ6IChzdHIsIG9iKSA9PiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtZXhjaGFuZ2UtZ3JvdXBlZC9kYXRhLmpzb25gLFxuXG4gIHRhZ1VyaUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb011bHRpOiAgICAgICAgIChzdHIsIG9iKSA9PiBgaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvcHJpY2VtdWx0aWZ1bGw/ZnN5bXM9JHtvYi5saXN0MX0mdHN5bXM9JHtvYi5saXN0Mn0mZT0ke29iLmV4Y2hhbmdlIHx8ICdDQ0NBR0cnfWAsXG4gIHRhZ0tleUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb011bHRpOiAgICAgICAgIChzdHIsIG9iKSA9PiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtdHJhZGluZy1pbmZvLSR7b2IuZXhjaGFuZ2UgfHwgJ0NDQ0FHRyd9LyR7b2IuY2FjaGVLZXl9Lmpzb25gLFxuICB0YWdLZXlDcnlwdG9jb21wYXJlVHJhZGluZ0luZm9NdWx0aUdyb3VwZWQ6ICAoc3RyLCBvYikgPT4gYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLXRyYWRpbmctaW5mby0ke29iLmV4Y2hhbmdlIHx8ICdDQ0NBR0cnfS1ncm91cGVkL2RhdGEuanNvbmAsXG4gIGxpbWl0c0NyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb011bHRpQXJyMTogICAgIDMwMCxcbiAgbGltaXRzQ3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGlBcnIyOiAgICAgMTAwLFxuXG4gIHRhZ1VyaUNyeXB0b2NvbXBhcmVTbmFwc2hvdDogICAgICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgaHR0cHM6Ly93d3cuY3J5cHRvY29tcGFyZS5jb20vYXBpL2RhdGEvY29pbnNuYXBzaG90ZnVsbGJ5aWQvP2lkPSR7aWR9YCxcbiAgdGFnS2V5Q3J5cHRvY29tcGFyZVNuYXBzaG90OiAgICAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS1zbmFwc2hvdC8ke2lkfS5qc29uYCxcbiAgdGFnS2V5Q3J5cHRvY29tcGFyZVNuYXBzaG90R3JvdXBlZDogICAgICAgICAgKHN0ciwgb2IpID0+IGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS1zbmFwc2hvdC1ncm91cGVkL2RhdGEuanNvbmAsXG5cbiAgdGFnVXJpQ3J5cHRvY29tcGFyZVNvY2lhbHN0YXRzOiAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGBodHRwczovL3d3dy5jcnlwdG9jb21wYXJlLmNvbS9hcGkvZGF0YS9zb2NpYWxzdGF0cy8/aWQ9JHtpZH1gLFxuICB0YWdLZXlDcnlwdG9jb21wYXJlU29jaWFsc3RhdHM6ICAgICAgICAgICAgICAoc3RyLCBpZCkgPT4gYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLXNvY2lhbHN0YXRzLyR7aWR9Lmpzb25gLFxuICB0YWdLZXlDcnlwdG9jb21wYXJlU29jaWFsU3RhdHNHcm91cGVkOiAgICAgICAoc3RyLCBvYikgPT4gYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLXNvY2lhbHN0YXRzLWdyb3VwZWQvZGF0YS5qc29uYCxcblxuICAvL1xuICAvLyBDb2lubWFya2V0Y2FwXG4gIC8vXG4gIC8vIHRhZ1VyaUNvaW5tYXJrZXRjYXBUaWNrZXI6ICAgICAgICAgICAgICAgICAgIChzdHIsIG9iKSA9PiBgaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyLz9zdGFydD0ke29iLnN0YXJ0IHx8IDB9JmxpbWl0PSR7b2IubGltaXQgfHwgMTAwfSZzb3J0PSR7b2Iuc29ydCB8fCAnaWQnfWAsXG4gIC8vIHRhZ0tleUNvaW5tYXJrZXRjYXBUaWNrZXI6ICAgICAgICAgICAgICAgICAgIChzdHIsIG9iKSA9PiBgL2NvaW5tYXJrZXRjYXAvdGlja2VyLyR7b2IuY2FjaGVLZXl9Lmpzb25gLFxuICAvLyB0YWdLZXlDb2lubWFya2V0Y2FwVGlja2VyR3JvdXBlZDogICAgICAgICAgICAoc3RyLCBvYikgPT4gYC9jb2lubWFya2V0Y2FwL3RpY2tlci1ncm91cGVkL2RhdGEuanNvbmAsXG5cbiAgLy8gdXJpQ29pbm1hcmtldGNhcExpc3Q6ICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpLmNvaW5tYXJrZXRjYXAuY29tL3YyL2xpc3RpbmdzLycsXG4gIC8vIGtleUNvaW5tYXJrZXRjYXBMaXN0OiAgICAgICAgICAgICAgICAgICAgICAgICcvY29pbm1hcmtldGNhcC9zZWFyY2gvY29pbnMuanNvbicsXG4gIC8vIHRhZ1VyaUNvaW5tYXJrZXRjYXBEZXRhaWxzSlNPTjogICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvdGlja2VyLyR7aWR9L2AsXG4gIC8vIHRhZ1VyaUNvaW5tYXJrZXRjYXBEZXRhaWxzSFRNTDogICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgaHR0cHM6Ly9jb2lubWFya2V0Y2FwLmNvbS9jdXJyZW5jaWVzLyR7aWR9L2AsXG4gIC8vIHRhZ0tleUNvaW5tYXJrZXRjYXBEZXRhaWxzSlNPTjogICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgL2NvaW5tYXJrZXRjYXAvZGV0YWlscy8ke2lkfS5qc29uYCxcbiAgLy8gdGFnS2V5Q29pbm1hcmtldGNhcERldGFpbHNIVE1MOiAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGAvY29pbm1hcmtldGNhcC9kZXRhaWxzLyR7aWR9Lmh0bWxgLFxuXG4gIC8vXG4gIC8vIFhFXG4gIC8vXG4gIHRhZ1VyaVhlQ3VycmVuY3lUYWJsZXM6ICAgICAgICAgICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgaHR0cHM6Ly94ZS5jb20vY3VycmVuY3l0YWJsZXMvP2Zyb209JHtpZH1gLFxuICB0YWdLZXlYZUN1cnJlbmN5VGFibGVzOiAgICAgICAgICAgICAgICAgICAgICAoc3RyLCBpZCkgPT4gYCR7c2NyYXBlRGlyfS94ZS1jdXJyZW5jeXRhYmxlcy8ke2lkfS5odG1sYCxcblxuICAvL1xuICAvLyBJU09cbiAgLy9cbiAgdXJpSVNPNDIxN0N1cnJlbmN5Q29kZXM6ICAgICAgICAgICAgICAgICAgICAgYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSl9Ly4uL2lzby80MjE3LnR4dGAsXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXR0aW5ncztcbiIsIi8qKlxuICpcbiAqIE5PVEU6IC0tIENvbW1lbnRzIG5lZWQgdXBkYXRlaW5nIC0tXG4gKiBUYWtlcyBhbmQgYXJyYXkgb2YgZGF0YSBvYmplY3RzIGFuZCByZXR1cm5zIGFuIG9iamVjdFxuICogd2l0aCB0aGUgaXRlbXMgaWRlbnRpZmllZCB2aWEgdGhlaXIga2V5c1xuICogSWYgYW55IHR3byBrZXlzIGFyZSB0aGUgc2FtZSBpdCBtZXJnZXMgdGhlIGRhdGEgYW5kXG4gKiB0aGUgc2Vjb25kIGl0ZW0gb3ZlcnJpZGVzIHRoZSBmaXJzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuLi9sb2dnZXInKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VEYXRhQnlLZXkoZGF0YSkge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFBcnJheSA9IE9iamVjdC52YWx1ZXMoZGF0YSk7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBkYXRhIG9mIGRhdGFBcnJheSkge1xuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKGBtZXJnZURhdGFCeUtleTogZGF0YSBzaG91bGQgbm90IGJlICR7ZGF0YX0sIHNraXBwaW5nYCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgICAgIGlmICghcmVzdWx0W2tleV0pIHJlc3VsdFtrZXldID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcbiAgICBsb2dnZXIuZXJyb3IoYG1lcmdlRGF0YUJ5S2V5OiAke2Vycm9yfWApO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgZGVidWdnZXI7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEJpbmFyeSBPdmVyZG9zZSBQcm9qZWN0c1xuaW1wb3J0IERhdGFUYWJsZSBmcm9tICdiby1kYXRhdGFibGUnO1xuXG4vLyBDcnlwdG9IdWJcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi9zZXR0aW5ncyc7XG5cbi8qKlxuICpcbiAqIElmIHRoZXNlIGZpZWxkcyBkb250IGV4aXN0IGluIGEgcmVjb3JkIHRoZSByZWNvcmRcbiAqIGlzIHVzZWxlc3MgdG8gdXNlIGF0IHRoaXMgdGltZVxuICpcbiAqL1xuZnVuY3Rpb24gdmFsaWREYXRhKGl0ZW0pIHtcbiAgcmV0dXJuICEoXG4gICAgICAgaXRlbVsnY2MtdG90YWwtdm9sLWZ1bGwtVE9UQUxWT0xVTUUyNEhUTyddID09PSAwXG4gICAgfHwgaXRlbVsnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UnXSA9PT0gdm9pZCAwXG4gICAgfHwgaXRlbVsnY2MtdG90YWwtdm9sLWZ1bGwtSWQnXSA9PT0gdm9pZCAwXG4gIClcbn1cblxuLyoqXG4gKlxuICogV2Ugb25seSB3YW50IHRvIGRpc3BsYXkgcmVjb3JkcyB0aGF0IGFyZSB1cGRhdGVkIHJlZ3VsYXJseVxuICogU29tZXRpbWVzIHdlIHdpbGwgaGF2ZSBzb21lIHRoYXQgaGF2ZSBwb3BlZCB1cCBpbnRvXG4gKiB0aGUgdG9wIHggdGhhdCB3ZSBkaXNwbGF5IGFuZCB0aGVuIGRpc3NhcHBlYXIgIGFnYWluLiBUaGV5XG4gKiBzaG91bGQgYmUgZmlsdGVyZWQgb3V0XG4gKlxuICovXG5mdW5jdGlvbiBpc0ZyZXNoKGl0ZW0pIHtcbiAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XG4gIGNvbnN0IGxvbmdlc3RBZ2UgPSAxMDAwICogNjAgKiA2MCAqIDI0O1xuICBjb25zdCB0aW1lc3RhbXAgPSArbmV3IERhdGUoaXRlbVsnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UtdGltZXN0YW1wJ10pO1xuICByZXR1cm4gbm93IC0gdGltZXN0YW1wIDwgbG9uZ2VzdEFnZTtcbn1cblxuLyoqXG4gKlxuICogUmVtb3ZlIGJhZCByZWNvcmRzXG4gKiBSZW1vdmUgZmllbGRzIHRoYXQgYXJlIG5vdCBjdXJyZW50bHkgdXNlZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5mdW5jdGlvbiBmaWx0ZXJEYXRhKGRhdGEpIHtcblxuICBsZXQga2V5O1xuICBsZXQgaXRlbTtcbiAgbGV0IGZpZWxkO1xuICBsZXQgZmllbGRzO1xuICBjb25zdCB3aGl0ZWxpc3QgPSBzZXR0aW5ncy5maWVsZFdoaXRlbGlzdDtcblxuICBmb3IgKFtrZXksIGl0ZW1dIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgaWYgKCF2YWxpZERhdGEoaXRlbSkgfHwgIWlzRnJlc2goaXRlbSkpIHtcbiAgICAgIC8vIHJlbW92ZSByZWNvcmRcbiAgICAgIGRlbGV0ZSBkYXRhW2tleV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gcmVtb3ZlIGZpZWxkcyB0aGF0IGFyZSBub3QgYmVpbmcgdXNlZFxuICAgICAgZmllbGRzID0gT2JqZWN0LmtleXMoZGF0YVtrZXldKTtcbiAgICAgIGZvciAoZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgIGlmICghd2hpdGVsaXN0LmluY2x1ZGVzKGZpZWxkKSB8fCAoc2V0dGluZ3MucmVtb3ZlTnVsbEZpZWxkcyAmJiBkYXRhW2tleV1bZmllbGRdID09PSBudWxsKSkge1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2tleV1bZmllbGRdO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2tleV1bYCR7ZmllbGR9LXRpbWVzdGFtcGBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG5cbn1cblxuLyoqXG4gKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGFPbkJlZm9yZUVtaXQob3B0aW9ucywgbmV3RGF0YSwgb2xkRGF0YSkge1xuXG4gIGNvbnN0IHR5cGUgPSBvcHRpb25zLmRpZmYgIT09IGZhbHNlID8gJ2NoYW5nZXNldCcgOiAnZnVsbCc7XG4gIGxldCBkYXRhID0gZmlsdGVyRGF0YShuZXdEYXRhKTtcblxuICBpZiAodHlwZSA9PT0gJ2NoYW5nZXNldCcpIHtcbiAgICBkYXRhID0gRGF0YVRhYmxlLmRpZmYob2xkRGF0YSwgZGF0YSk7XG4gIH1cblxuICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoe2RhdGEsIHR5cGV9KTtcblxuICByZXR1cm4gZGF0YTtcblxufVxuIiwiLy8gQmluYXJ5IE92ZXJkb3NlXG5pbXBvcnQgeyBhcnJheVRvT2JqZWN0IH0gICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdiby11dGlscyc7XG5pbXBvcnQgeyBvYmplY3RJc09iamVjdCBhcyBpc09iamVjdCB9ICAgICAgICAgICBmcm9tICdiby11dGlscyc7XG5pbXBvcnQgeyBvYmplY3RJc0VtcHR5T2JqZWN0IGFzIGlzRW1wdHlPYmplY3QgfSBmcm9tICdiby11dGlscyc7XG5pbXBvcnQgeyB0aW1lc2VyaWVzVGhpbiB9ICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdiby11dGlscyc7XG5pbXBvcnQgeyB0aW1lc2VyaWVzUHJ1bmUgfSAgICAgICAgICAgICAgICAgICAgICBmcm9tICdiby11dGlscyc7XG5pbXBvcnQgeyB0aW1lc2VyaWVzU2NhbGUgfSAgICAgICAgICAgICAgICAgICAgICBmcm9tICdiby11dGlscyc7XG5cbi8vIENyeXB0b2h1YiB1dGlsIGZ1bmN0aW9uc1xuaW1wb3J0IGxvZ2dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCBzZXR0aW5ncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL3NldHRpbmdzJztcblxuLyoqXG4gKlxuICogVGltZXNlcmllcyBSZXNjYWxlXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdGltZXNlcmllcyAtIEFycmF5IG9mIHRpbWVzZXJpZXMgb2JqZWN0c1xuICogQHJldHVybiB7QXJyYXl9IC0gQXJyYXkgb2YgdXBkYXRlZCB0aW1lc2VyaWVzIG9iamVjdFxuICpcbiAqL1xuZnVuY3Rpb24gZ2V0TmV3VGltZXNlcmllc0RhdGEoaXRlbSwgbGltaXQgPSA1MCwgbWF4QWdlID0gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcpIHtcblxuICBjb25zdCBwcmljZSAgICAgID0gaXRlbVsnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UnXTtcbiAgY29uc3Qgdm9sdW1lICAgICA9IGl0ZW1bJ2NjLXRvdGFsLXZvbC1mdWxsLVRPVEFMVk9MVU1FMjRIVE8nXTtcbiAgY29uc3QgdGltZXN0YW1wICA9IGl0ZW1bJ2NjLXRvdGFsLXZvbC1mdWxsLVBSSUNFLXRpbWVzdGFtcCddO1xuICBjb25zdCB0aW1lc2VyaWVzID0gaXRlbVsnY3J5cHRvaHViLXByaWNlLWhpc3RvcnknXSB8fCBbXTtcbiAgaWYgKHRpbWVzZXJpZXNbMF0gJiYgdGltZXNlcmllc1swXS50aW1lc3RhbXAgPT09IG51bGwpIHRpbWVzZXJpZXMuc3BsaWNlKDAsIDEpO1xuICBpZiAoIXByaWNlIHx8ICF2b2x1bWUgfHwgIXRpbWVzdGFtcCkge1xuICAgIHJldHVybiB0aW1lc2VyaWVzO1xuICB9XG5cbiAgdGltZXNlcmllc1BydW5lKHRpbWVzZXJpZXMsIG1heEFnZSk7XG4gIHRpbWVzZXJpZXNUaGluKHRpbWVzZXJpZXMsIGxpbWl0KTtcblxuICBjb25zdCBsYXN0ID0gdGltZXNlcmllc1t0aW1lc2VyaWVzLmxlbmd0aCAtIDFdO1xuICBjb25zdCBuZXh0ID0ge3ByaWNlLCB2b2x1bWUsIHRpbWVzdGFtcDogK25ldyBEYXRlKHRpbWVzdGFtcCl9O1xuICBpZiAoSlNPTi5zdHJpbmdpZnkobGFzdCkgIT09IEpTT04uc3RyaW5naWZ5KG5leHQpKSB0aW1lc2VyaWVzLnB1c2gobmV4dCk7XG5cbiAgcmV0dXJuIHRpbWVzZXJpZXM7XG5cbn1cblxuLy9cbi8vXG4vL1xuZnVuY3Rpb24gcHJpY2VJbkJpdGNvaW4ob2xkRGF0YSA9IHt9LCBuZXdEYXRhLCBiaXRjb2luUHJpY2UpIHtcblxuICBjb25zdCBvdXRwdXQgPSB7fTtcbiAgY29uc3QgY3J5cHRvUHJpY2UgPSBuZXdEYXRhWydjYy10b3RhbC12b2wtZnVsbC1QUklDRSddO1xuICBjb25zdCBjcnlwdG9QcmljZVRpbWVzdGFtcCA9IG5ld0RhdGFbJ2NjLXRvdGFsLXZvbC1mdWxsLVBSSUNFLXRpbWVzdGFtcCddO1xuXG4gIGlmIChiaXRjb2luUHJpY2UgJiYgY3J5cHRvUHJpY2UpIHtcblxuICAgIGNvbnN0IGZpZWxkID0gJ2NyeXB0b2h1Yi1wcmljZS1idGMnO1xuXG4gICAgLy8gb3V0cHV0LnByaWNlID0gMSAvIChiaXRjb2luUHJpY2UgLyBjcnlwdG9QcmljZSk7IC8vIGJ0Y1xuICAgIG91dHB1dC5wcmljZSA9IE1hdGguY2VpbCgoMSAvIChiaXRjb2luUHJpY2UgLyBjcnlwdG9QcmljZSkpICogMTAwMDAwMDAwKTsgLy8gc2F0c1xuXG4gICAgaWYgKHNldHRpbmdzLmZpZWxkTGFzdFZhbHVlLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgb3V0cHV0Lmxhc3RQcmljZSA9IG9sZERhdGFbZmllbGRdO1xuICAgIH1cblxuICAgIG91dHB1dC50aW1lc3RhbXAgPSArbmV3IERhdGUoY3J5cHRvUHJpY2VUaW1lc3RhbXApO1xuXG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xuXG59XG5cbmZ1bmN0aW9uIGdldEJpdGNvaW5QcmljZShkYXRhKSB7XG4gIHJldHVybiBkYXRhWzExODJdID8gZGF0YVsxMTgyXVsnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UnXSA6IGZhbHNlO1xufVxuXG4vKipcbiAqXG4gKiBBREQgQ1JZUFRPSFVCIEZJRUxEU1xuICpcbiAqL1xuZnVuY3Rpb24gYWRkQ3J5cHRvaHViRmllbGRzKG9sZERhdGEsIGRhdGEpIHtcblxuICBmdW5jdGlvbiBsYXN0VmFsdWVGaWVsZChvbGREYXRhLCBuZXdEYXRhLCBmaWVsZCkge1xuICAgIGlmIChzZXR0aW5ncy5maWVsZExhc3RWYWx1ZS5pbmNsdWRlcyhmaWVsZCkpIHtcbiAgICAgIG5ld0RhdGFbYCR7ZmllbGR9Omxhc3RgXSA9IG9sZERhdGFbZmllbGRdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVzdGFtcEZpZWxkKGRhdGEsIGZpZWxkKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gK25ldyBEYXRlKGRhdGFbJ2NjLXRvdGFsLXZvbC1mdWxsLVBSSUNFLXRpbWVzdGFtcCddKTtcbiAgICBkYXRhW2Ake2ZpZWxkfS10aW1lc3RhbXBgXSA9IHRpbWVzdGFtcDtcbiAgfVxuXG5cbiAgbGV0IGtleTtcbiAgbGV0IGl0ZW07XG4gIGNvbnN0IGJpdGNvaW5QcmljZSA9IGdldEJpdGNvaW5QcmljZShkYXRhKTtcbiAgZm9yIChba2V5LCBpdGVtXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuXG4gICAgLy8gVGltZXNlcmllc1xuICAgIGNvbnN0IHRpbWVzZXJpZXMgPSBnZXROZXdUaW1lc2VyaWVzRGF0YShpdGVtKTtcbiAgICBpZiAodGltZXNlcmllcykgaXRlbVsnY3J5cHRvaHViLXByaWNlLWhpc3RvcnknXSA9IHRpbWVzZXJpZXM7XG5cbiAgICAvLyBCaXRjb2luIHByaWNlXG4gICAgY29uc3QgeyBwcmljZSwgbGFzdFByaWNlLCB0aW1lc3RhbXAgfSA9IHByaWNlSW5CaXRjb2luKG9sZERhdGFba2V5XSwgaXRlbSwgYml0Y29pblByaWNlKTtcbiAgICBpZiAocHJpY2UpICAgICAgICAgICAgICAgaXRlbVsnY3J5cHRvaHViLXByaWNlLWJ0YyddICAgICAgICAgICA9IHByaWNlO1xuICAgIGlmIChwcmljZSAhPT0gbGFzdFByaWNlKSBpdGVtWydjcnlwdG9odWItcHJpY2UtYnRjOmxhc3QnXSAgICAgID0gbGFzdFByaWNlO1xuICAgIGlmICh0aW1lc3RhbXApICAgICAgICAgICBpdGVtWydjcnlwdG9odWItcHJpY2UtYnRjLXRpbWVzdGFtcCddID0gdGltZXN0YW1wO1xuXG4gICAgLy8gQ2lyY3VsYXRpbmcgcGVyY2VudCB0b3RhbFxuICAgIGNvbnN0IHN1cHBseVRvdGFsICAgICAgID0gaXRlbVsnY2MtY29pbmxpc3QtVG90YWxDb2luU3VwcGx5J107XG4gICAgY29uc3Qgc3VwcGx5Q2lyY3VsYXRpbmcgPSBpdGVtWydjYy10b3RhbC12b2wtZnVsbC1TVVBQTFknXTtcbiAgICBpdGVtWydjcnlwdG9odWItY2lyY3VsYXRpbmctcGVyY2VudC10b3RhbCddID0gKHN1cHBseUNpcmN1bGF0aW5nIC8gc3VwcGx5VG90YWwpICogMTAwO1xuXG4gIH1cblxuICByZXR1cm4gZGF0YTtcblxufVxuXG4vKipcbiAqXG4gKiBCYWNrZmlsbCBhbmQgZm9ybWF0IGRhdGFcbiAqXG4gKiBXaGVuIHJ1bm5pbmcgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGFwIHRoZSBkYXRhc3RvcmUgc3RhcnRzIG9mZiBlbXB0eS5cbiAqIFNvbWUgZGF0YSB0YWtlcyBsb25nZXIgdG8gc2NyYXBlIHRoYW4gb3RoZXIgdGhlcmVmb3JlIHNvbWUgaXRlbXMgaW4gdGhlXG4gKiBkYXRhc3RvcmUgd2lsbCBzdGF5IGVtcHR5IGZvciBhIHdoaWxlLiBUbyBwcmV2ZW50IHRoaXMgd2UgYmFja2ZpbGwgdGhlIGRhdGFzdG9yZVxuICogd2l0aCB0aGUgbGFzdCBvdXRwdXQgZGF0YXNvdXJjZSBpZiBhbnkgb2YgdGhlIHN0b3JlcyBhcmUgZW1wdHlcbiAqXG4gKiBOT1RFOlxuICogICBSZWdhcmRpbmcgcGFja2luZyBhbmQgZGlmZmluZyBkYXRhXG4gKiAgIFdlIHNob3VsZCBuZXZlciBzYXZlIHBhY2tlZCBkYXRhIG9yIGRhdGEgZGlmZnNcbiAqICAgV2Ugc2hvdWxkIG9ubHkgZXZlciBlbWl0IHBhY2tlZCBkYXRhIG9yIGRhdGEgZGlmZnMgc28ga25vd2luZyB0aGF0XG4gKiAgIGFsbCBkYXRhIHdlIHdvcmsgd2l0aCBoZXJlIHNob3VsZCBiZSBmdWxsIGRhdGFzZXRzIG9mIHVucGFja2VkIGRhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQHBhcmFtIHt9IGNhY2hlXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRhT25IYW5kbGVEYXRhKG9wdGlvbnMgPSB7fSwgZGF0YSwgY2FjaGUsIG9sZERhdGEgPSB7fSwgYXBwQm9vdHN0cmFwRGF0YSkge1xuICB0cnkge1xuXG4gICAgbGV0IG5ld0RhdGEgPSBkYXRhO1xuXG4gICAgLy9cbiAgICAvLyBCYWNrZmlsbCBuZXcgZGF0YSB3aXRoIG9sZCBkYXRhXG4gICAgLy9cbiAgICAvLyBOT1RFOlxuICAgIC8vIFdlIHN0aWxsIG5lZWQgdG8gZG8gdGhpcyBldmVuIHdoZW4gd2UgYXJlIGVtaXR0aW5nXG4gICAgLy8gYSBkaWZmIGJlY2F1c2UgdGhlIHdob2xlIGRhdGEgc2hvdWxkIGJlIGF2YWlsYWJsZSB0byBiZVxuICAgIC8vIHVzZWQgYnkgZnVuY3Rpb25zIGxpa2UgYGFkZENyeXB0b2h1YkZpZWxkcygpYFxuICAgIGZvciAobGV0IGlkIG9mIE9iamVjdC5rZXlzKG9sZERhdGEpKSB7XG4gICAgICBuZXdEYXRhW2lkXSA9IE9iamVjdC5hc3NpZ24oe30sIG9sZERhdGFbaWRdLCBuZXdEYXRhW2lkXSk7XG4gICAgICBmb3IgKGxldCBmaWVsZCBvZiBzZXR0aW5ncy5maWVsZExhc3RWYWx1ZSkge1xuICAgICAgICBpZiAob2xkRGF0YVtpZF1bZmllbGRdICE9PSBuZXdEYXRhW2lkXVtmaWVsZF0pIHtcbiAgICAgICAgICBuZXdEYXRhW2lkXVtgJHtmaWVsZH06bGFzdGBdID0gb2xkRGF0YVtpZF1bZmllbGRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGN1c3RvbSBjcnlwdG9odWIgZmllbGRzXG4gICAgbmV3RGF0YSA9IGFkZENyeXB0b2h1YkZpZWxkcyhvbGREYXRhLCBuZXdEYXRhKTtcblxuICAgIC8vIFNhdmUgZmlsZSAodGhlIHdhdGNoZXIgd2lsbCBwaWNrIGl0IHVwIGFuZCBlbWl0IGl0KVxuICAgIGNvbnN0IGZpbGVOYW1lID0gYCR7c2V0dGluZ3MuZ2VuZXJhdGVkRGlyfS9kYXRhL2RhdGEuanNvbmA7XG4gICAgY2FjaGUuc2V0KGZpbGVOYW1lLCBKU09OLnN0cmluZ2lmeShuZXdEYXRhKSk7XG5cbiAgICAvLyBDcmVhdGUgYSBsaXN0IG9mIHggKHNldHRpbnMubWF4UmVjb3Jkc1NjcmFwZWQpIHNvcnRlZCBzeW1ib2xzXG4gICAgLy8gV2UgYXJlIGRvaW5nIHRoaXMgaGVyZSBhcyB3ZSBkb24ndCB0aGUgc29ydCBjcnl0ZXJpYSBiZWZvcmUgdGhpcyBwb2ludFxuICAgIGxldCBmaXJzdFhTeW1ib2xzO1xuICAgIHtcbiAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgY29uc3QgbGltaXQgPSBzZXR0aW5ncy5tYXhSZWNvcmRzU2NyYXBlZDtcbiAgICAgIGNvbnN0IGZpZWxkVm9sID0gJ2NjLXRvdGFsLXZvbC1mdWxsLVRPVEFMVk9MVU1FMjRIVE8nO1xuICAgICAgY29uc3QgZmllbGRTeW1ib2wgPSAnY2MtY29pbmxpc3QtU3ltYm9sJztcbiAgICAgIGNvbnN0IGZpZWxkVHJhZGluZyA9ICdjYy1jb2lubGlzdC1Jc1RyYWRpbmcnO1xuICAgICAgbGV0IGtleTtcbiAgICAgIGxldCBpdGVtO1xuICAgICAgZm9yIChba2V5LCBpdGVtXSBvZiBPYmplY3QuZW50cmllcyhuZXdEYXRhKSkge1xuICAgICAgICBpZiAoaXRlbVtmaWVsZFRyYWRpbmddID09PSBmYWxzZSkge1xuICAgICAgICAgIGRlbGV0ZSBuZXdEYXRhW2tleV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghaXRlbVtmaWVsZFZvbF0pIHtcbiAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFyci5zb3J0KChhLCBiKSA9PiBiW2ZpZWxkVm9sXSAtIGFbZmllbGRWb2xdKTtcbiAgICAgIGZpcnN0WFN5bWJvbHMgPSBhcnIuc3BsaWNlKDAsIGxpbWl0KS5tYXAoeCA9PiB4W2ZpZWxkU3ltYm9sXSk7XG4gICAgfVxuICAgIGFwcEJvb3RzdHJhcERhdGEuZmlyc3RYU3ltYm9scyA9IGZpcnN0WFN5bWJvbHM7XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZGF0YU9uSGFuZGxlRGF0YSgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgZGVidWdnZXI7XG4gICAgcmV0dXJuIHttZXNzYWdlLCBlcnJvcjogdHJ1ZX07XG4gIH1cbn1cbiIsIi8vIENyeXB0b2h1YlxuY29uc3QgbG9nZ2VyICAgICA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuY29uc3Qgc2V0dGluZ3MgICA9IHJlcXVpcmUoJy4uL3NldHRpbmdzJyk7XG5jb25zdCBzY3JhcGVKU09OID0gcmVxdWlyZSgnLi9zY3JhcGUtanNvbi5qcycpO1xuXG4vKipcbiAqXG4gKiBDT0lOTElTVFxuICpcbiAqIE9yaWdpbmFsIERhdGFcbiAqIC0tLS0tLS0tLS0tLS1cbiAqXG4gKiBBbGdvcml0aG0gICAgICAgICAgICA6IFwiU0hBMjU2XCJcbiAqIEJ1aWx0T24gICAgICAgICAgICAgIDogXCJOL0FcIlxuICogQ29pbk5hbWUgICAgICAgICAgICAgOiBcIkJpdGNvaW5cIlxuICogRnVsbE5hbWUgICAgICAgICAgICAgOiBcIkJpdGNvaW4gKEJUQylcIlxuICogRnVsbHlQcmVtaW5lZCAgICAgICAgOiBcIjBcIlxuICogSWQgICAgICAgICAgICAgICAgICAgOiBcIjExODJcIlxuICogSW1hZ2VVcmwgICAgICAgICAgICAgOiBcIi9tZWRpYS8xOTYzMy9idGMucG5nXCJcbiAqIElzVHJhZGluZyAgICAgICAgICAgIDogdHJ1ZVxuICogTmFtZSAgICAgICAgICAgICAgICAgOiBcIkJUQ1wiXG4gKiBQcmVNaW5lZFZhbHVlICAgICAgICA6IFwiTi9BXCJcbiAqIFByb29mVHlwZSAgICAgICAgICAgIDogXCJQb1dcIlxuICogU21hcnRDb250cmFjdEFkZHJlc3MgOiBcIk4vQVwiXG4gKiBTb3J0T3JkZXIgICAgICAgICAgICA6IFwiMVwiXG4gKiBTcG9uc29yZWQgICAgICAgICAgICA6IGZhbHNlXG4gKiBTeW1ib2wgICAgICAgICAgICAgICA6IFwiQlRDXCJcbiAqIFRvdGFsQ29pblN1cHBseSAgICAgIDogXCIyMTAwMDAwMFwiXG4gKiBUb3RhbENvaW5zRnJlZUZsb2F0ICA6IFwiTi9BXCJcbiAqIFVybCAgICAgICAgICAgICAgICAgIDogXCIvY29pbnMvYnRjL292ZXJ2aWV3XCJcbiAqXG4gKiBQcmVmaXggZmllbGRzIHdpdGggXCJjYy1jb2lubGlzdC1cIlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWxnb3JpdGhtIC0+IGNjLWNvaW5saXN0LUFsZ29yaXRobVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nP30gZGF0YVxuICogQHBhcmFtIHtTdHJpbmc/fSB0aW1lc3RhbXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBib290c3RyYXBEYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIGZvcm1hdHRlckNyeXB0b2NvbXBhcmVCb290c3RyYXAoY2FjaGUpIHtcbiAgdHJ5IHtcblxuXG4gICAgLy8gR2V0IGNvaW5MaXN0XG4gICAgbGV0IGNvaW5MaXN0O1xuICAgIHRyeSB7XG4gICAgICBjb2luTGlzdCA9IGF3YWl0IHNjcmFwZUpTT04oc2V0dGluZ3MudXJpQ3J5cHRvY29tcGFyZUxpc3QsIHNldHRpbmdzLmtleUNyeXB0b2NvbXBhcmVMaXN0LCAwLCBjYWNoZSk7XG4gICAgICBjb2luTGlzdCA9IHR5cGVvZiBjb2luTGlzdCA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGNvaW5MaXN0KS5EYXRhIDogY29pbkxpc3QuRGF0YTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYGZvcm1hdHRlci1jcnlwdG9jb21wYXJlLWJvb3RzdHJhcDogW0Vycm9yIHNjcmFwaW5nIGNvaW5MaXN0XSB8ICR7ZXJyb3J9YCk7XG4gICAgfVxuXG4gICAgLy8gLy8gR2V0IG9sZCBkYXRhXG4gICAgLy8gbGV0IG9sZERhdGE7XG4gICAgLy8gdHJ5IHtcbiAgICAvLyAgIGNvbnN0IHBhdGggPSBgJHtzZXR0aW5ncy5kYkRpcn0vZGF0YS9kYXRhLmpzb25gO1xuICAgIC8vICAgb2xkRGF0YSA9IEpTT04ucGFyc2UoY2FjaGUuZ2V0KHBhdGgpWzBdKTtcbiAgICAvLyAgIGRlYnVnZ2VyO1xuICAgIC8vIH1cbiAgICAvLyBjYXRjaChlcnJvcikge1xuICAgIC8vICAgbG9nZ2VyLmVycm9yKGBmb3JtYXR0ZXItY3J5cHRvY29tcGFyZS1ib290c3RyYXA6IFtFcnJvciBnZXR0aW5nIGZpbGVdICR7cGF0aH0gfCAke2Vycm9yfWApO1xuICAgIC8vIH1cblxuICAgIC8vIENyZWF0ZSBtYXBzXG4gICAgY29uc3QgaWRTeW1ib2xNYXAgPSB7fTtcbiAgICBjb25zdCBzeW1ib2xJZE1hcCA9IHt9O1xuICAgIGZvciAoY29uc3QgW3N5bWJvbCwgZGF0YV0gb2YgT2JqZWN0LmVudHJpZXMoY29pbkxpc3QpKSB7XG4gICAgICBpZFN5bWJvbE1hcFtkYXRhLklkXSA9IHN5bWJvbDtcbiAgICAgIHN5bWJvbElkTWFwW3N5bWJvbF0gPSBkYXRhLklkO1xuICAgIH07XG5cbiAgICByZXR1cm4geyBpZFN5bWJvbE1hcCwgc3ltYm9sSWRNYXAsIGNvaW5MaXN0IH07XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZUJvb3RzdHJhcCgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBDcnlwdG9odWJcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuXG4vKipcbiAqXG4gKiBDT0lOTElTVFxuICpcbiAqIE9yaWdpbmFsIERhdGFcbiAqIC0tLS0tLS0tLS0tLS1cbiAqXG4gKiBBbGdvcml0aG0gICAgICAgICAgICA6IFwiU0hBMjU2XCJcbiAqIEJ1aWx0T24gICAgICAgICAgICAgIDogXCJOL0FcIlxuICogQ29pbk5hbWUgICAgICAgICAgICAgOiBcIkJpdGNvaW5cIlxuICogRnVsbE5hbWUgICAgICAgICAgICAgOiBcIkJpdGNvaW4gKEJUQylcIlxuICogRnVsbHlQcmVtaW5lZCAgICAgICAgOiBcIjBcIlxuICogSWQgICAgICAgICAgICAgICAgICAgOiBcIjExODJcIlxuICogSW1hZ2VVcmwgICAgICAgICAgICAgOiBcIi9tZWRpYS8xOTYzMy9idGMucG5nXCJcbiAqIElzVHJhZGluZyAgICAgICAgICAgIDogdHJ1ZVxuICogTmFtZSAgICAgICAgICAgICAgICAgOiBcIkJUQ1wiXG4gKiBQcmVNaW5lZFZhbHVlICAgICAgICA6IFwiTi9BXCJcbiAqIFByb29mVHlwZSAgICAgICAgICAgIDogXCJQb1dcIlxuICogU21hcnRDb250cmFjdEFkZHJlc3MgOiBcIk4vQVwiXG4gKiBTb3J0T3JkZXIgICAgICAgICAgICA6IFwiMVwiXG4gKiBTcG9uc29yZWQgICAgICAgICAgICA6IGZhbHNlXG4gKiBTeW1ib2wgICAgICAgICAgICAgICA6IFwiQlRDXCJcbiAqIFRvdGFsQ29pblN1cHBseSAgICAgIDogXCIyMTAwMDAwMFwiXG4gKiBUb3RhbENvaW5zRnJlZUZsb2F0ICA6IFwiTi9BXCJcbiAqIFVybCAgICAgICAgICAgICAgICAgIDogXCIvY29pbnMvYnRjL292ZXJ2aWV3XCJcbiAqXG4gKiBQcmVmaXggZmllbGRzIHdpdGggXCJjYy1jb2lubGlzdC1cIlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWxnb3JpdGhtIC0+IGNjLWNvaW5saXN0LUFsZ29yaXRobVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nP30gZGF0YVxuICogQHBhcmFtIHtTdHJpbmc/fSB0aW1lc3RhbXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBib290c3RyYXBEYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uQ29pbmxpc3QoZGF0YSwgdGltZXN0YW1wLCBib290c3RyYXBEYXRhLCBhcHBCb290c3RyYXBEYXRhID0ge30pIHtcbiAgdHJ5IHtcblxuICAgIGNvbnN0IHsgaWRTeW1ib2xNYXAsIHN5bWJvbElkTWFwIH0gPSBib290c3RyYXBEYXRhO1xuICAgIGNvbnN0IHByZWZpeCA9ICdjYy1jb2lubGlzdC0nO1xuICAgIGNvbnN0IG9iakFsbENvaW5zID0gZGF0YS5EYXRhO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGxldCBjdXJyZW50Q29pbk91dCwgY3VycmVudENvaW5Jbiwga2V5LCB2YWwsIGlkO1xuICAgIGZvciAoaWQgb2YgT2JqZWN0LmtleXMoaWRTeW1ib2xNYXApKSB7XG4gICAgICBjdXJyZW50Q29pbk91dCA9IHt9O1xuICAgICAgY3VycmVudENvaW5JbiA9IG9iakFsbENvaW5zW2lkU3ltYm9sTWFwW2lkXV07XG4gICAgICBpZiAoY3VycmVudENvaW5JbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgY29pbkxpc3RXYXRjaGVyLmhhbmRsZXIoKTogJHtpZFN5bWJvbE1hcFtpZF19IGlzIG5vdCBpbiBvYmpBbGxDb2luc2ApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhjdXJyZW50Q29pbkluKSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnU29ydE9yZGVyJykge1xuICAgICAgICAgIHZhbCA9ICt2YWw7IC8vIE1ha2UgU29ydE9yZGVyIG51bWVyaWNcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50Q29pbk91dFtgJHtwcmVmaXh9JHtrZXl9LXRpbWVzdGFtcGBdID0gdGltZXN0YW1wO1xuICAgICAgICBjdXJyZW50Q29pbk91dFtgJHtwcmVmaXh9JHtrZXl9YF0gPSB2YWw7XG4gICAgICAgIGlmIChrZXkgPT09ICdTb3J0T3JkZXInICYmIGlzTmFOKGN1cnJlbnRDb2luT3V0W2Ake3ByZWZpeH0ke2tleX1gXSkpIGRlYnVnZ2VyO1xuICAgICAgfVxuICAgICAgcmVzdWx0W2lkXSA9IGN1cnJlbnRDb2luT3V0O1xuICAgIH1cbiAgICAvLyBhcHBCb290c3RyYXBEYXRhLmNvaW5MaXN0ID0gcmVzdWx0O1xuICAgIHJldHVybiB7ZGF0YTogcmVzdWx0LCB0aW1lc3RhbXB9O1xuXG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uQ29pbmxpc3QoKTogJHtlcnJvcn1gO1xuICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICByZXR1cm4ge21lc3NhZ2UsIGVycm9yOiB0cnVlfTtcbiAgfVxufVxuIiwiLy8gQ3J5cHRvaHViXG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuLi9sb2dnZXInKTtcblxuLyoqXG4gKlxuICogRVhDSEFOR0VTIEdFTkVSQUxcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSByZXNwb25zZSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aW1lc3RhbXAgLSB0aW1lIGRhdGEgd2FzIHJlY2VpdmVkXG4gKiBAcGFyYW0ge09iamVjdH0gYm9vdHN0cmFwRGF0YSAtIGxlZ2FjeSBib290c3RyYXAgZGF0YSAod2lsbCBiZSBtZXJnZWQgd2l0aCBhcHBCb290c3RyYXBEYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gYWRkQm9vdHN0cmFwRGF0YSAtIGRhdGEgc3RvcmUgZm9yIG5vbiByb3cgZGF0YVxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVOYW1lIC0gZmlsZSBuYW1lIG9mIHN0b3JlZCByZXF1ZXN0XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgLSB0eXBlIG9mIGV2ZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uRXhjaGFuZ2VzR2VuZXJhbChyZXNwb25zZSwgdGltZXN0YW1wLCBib290c3RyYXBEYXRhLCBhcHBCb290c3RyYXBEYXRhLCBmaWxlTmFtZSwgZXZlbnQpIHtcbiAgdHJ5IHtcblxuICAgIGNvbnN0IGVtcHR5UmV0dXJuID0ge2RhdGE6IHt9LCB0aW1lc3RhbXB9O1xuXG4gICAgaWYgKCghcmVzcG9uc2UgJiYgIXJlc3BvbnNlLkRhdGEpIHx8IHJlc3BvbnNlLlJlc3BvbnNlICE9PSAnU3VjY2VzcycpIHtcbiAgICAgIHJldHVybiBlbXB0eVJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEVYQ0hBTkdFIE1BUFNcbiAgICAgKlxuICAgICAqIHJlc3BvbnNlLkRhdGE6IHtcbiAgICAgKiAgIDI0Mzk6IHtcbiAgICAgKiAgICAgSWQ6ICBcIjI0MzlcIlxuICAgICAqICAgICBOYW1lOiAgXCJLcmFrZW5cIlxuICAgICAqICAgICBVcmw6IFwiL2V4Y2hhbmdlcy9rcmFrZW4vb3ZlcnZpZXdcIlxuICAgICAqICAgICBMb2dvVXJsOiBcIi9tZWRpYS8zNTMwOTU2My9rcmFrZW4ucG5nXCJcbiAgICAgKiAgICAgSXRlbVR5cGU6IEFycmF5IFs1XVxuICAgICAqICAgICBDZW50cmFsaXphdGlvblR5cGU6IFwiQ2VudHJhbGl6ZWRcIlxuICAgICAqICAgICBJbnRlcm5hbE5hbWU6ICBcIktyYWtlblwiXG4gICAgICogICAgIEFmZmlsaWF0ZVVybDogXCJodHRwczovL3d3dy5rcmFrZW4uY29tXCJcbiAgICAgKiAgICAgQ291bnRyeTogXCJVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2FcIlxuICAgICAqICAgICBPcmRlckJvb2s6IHRydWVcbiAgICAgKiAgICAgVHJhZGVzOiB0cnVlXG4gICAgICogICAgIFJlY29tbWVuZGVkOiBmYWxzZVxuICAgICAqICAgICBTcG9uc29yZWQ6IGZhbHNlXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqXG4gICAgICogb3V0cHV0OiB7XG4gICAgICogICAnS3Jha2VuJzogMjQzOSxcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VEYXRhXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWFwcyhyZXNwb25zZURhdGEpIHtcbiAgICAgIGNvbnN0IG5hbWVJZCA9IHt9O1xuICAgICAgY29uc3QgaWROYW1lID0ge307XG4gICAgICBsZXQgaWQ7XG4gICAgICBsZXQgb2JqO1xuICAgICAgZm9yIChbaWQsIG9ial0gb2YgT2JqZWN0LmVudHJpZXMocmVzcG9uc2VEYXRhKSkge1xuICAgICAgICBuYW1lSWRbb2JqLk5hbWVdID0gaWQ7XG4gICAgICAgIGlkTmFtZVtpZF0gPSBvYmouTmFtZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IG5hbWVJZCwgaWROYW1lIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFWENIQU5HRSBEQVRBXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VEYXRhXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGF0YShyZXNwb25zZURhdGEpIHtcbiAgICAgIGxldCBpZDtcbiAgICAgIGxldCBvYmo7XG4gICAgICBsZXQgZmllbGQ7XG4gICAgICBsZXQgb3V0cHV0ID0ge307XG4gICAgICBsZXQgZmllbGRzID0gW1xuICAgICAgICAnSWQnLFxuICAgICAgICAnTmFtZScsXG4gICAgICAgICdVcmwnLFxuICAgICAgICAnTG9nb1VybCcsXG4gICAgICAgICdJdGVtVHlwZScsXG4gICAgICAgICdDZW50cmFsaXphdGlvblR5cGUnLFxuICAgICAgICAnQ291bnRyeSdcbiAgICAgIF07XG4gICAgICBmb3IgKFtpZCwgb2JqXSBvZiBPYmplY3QuZW50cmllcyhyZXNwb25zZURhdGEpKSB7XG4gICAgICAgIG91dHB1dFtpZF0gPSB7fTtcbiAgICAgICAgZm9yIChmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgICBvdXRwdXRbaWRdW2ZpZWxkXSA9IG9ialtmaWVsZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgbWFwczogbWFwcyhyZXNwb25zZS5EYXRhKSxcbiAgICAgIGRhdGE6IGRhdGEocmVzcG9uc2UuRGF0YSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgZGF0YTogb3V0cHV0LCB0aW1lc3RhbXAgfTtcblxuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgZGVidWdnZXI7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvbkV4Y2hhbmdlc0dlbmVyYWwoKTogJHtlcnJvcn1gO1xuICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICByZXR1cm4ge21lc3NhZ2UsIGVycm9yOiB0cnVlfTtcbiAgfVxufVxuIiwiLy8gQmluYXJ5IE92ZXJkb3NlXG5pbXBvcnQgeyBvYmplY3RHZXROZXN0ZWRQcm9wZXJ0eSBhcyBnZXROZXN0ZWRQcm9wIH0gZnJvbSAnYm8tdXRpbHMnO1xuXG4vLyBDcnlwdG9odWJcbmltcG9ydCBsb2dnZXIgICBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4uL3NldHRpbmdzJztcblxuLyoqXG4gKlxuICogYWRkU3ltYm9sXG4gKlxuICovXG5mdW5jdGlvbiBhZGRTeW1ib2woc3ltYm9scywgc3ltYm9sKSB7XG4gIGlmICghc3ltYm9sc1tzeW1ib2xdKSB7XG4gICAgc3ltYm9sc1tzeW1ib2xdID0ge1xuICAgICAgcGFpcnM6IG5ldyBTZXQoKSxcbiAgICAgIGV4Y2hhbmdlTGlzdERleDogbmV3IFNldCgpLFxuICAgICAgZXhjaGFuZ2VMaXN0RmlhdE9ubHk6IG5ldyBTZXQoKSxcbiAgICAgIGV4Y2hhbmdlTGlzdENyeXB0b09ubHk6IG5ldyBTZXQoKSxcbiAgICAgIGV4Y2hhbmdlTGlzdEFjY2VwdHNCb3RoOiBuZXcgU2V0KCksXG4gICAgICBfZmlhdEN1cnJlbmNpZXM6IG5ldyBTZXQoKSxcbiAgICAgIF9leGNoYW5nZXNSYW5rOiAwLFxuICAgICAgX251bWJlck9mRXhjaGFuZ2VzOiAwLFxuICAgICAgX251bWJlck9mRGV4OiAwLFxuICAgICAgX251bWJlck9mUGFpcnM6IDAsXG4gICAgICBfbnVtYmVyT2ZGaWF0UGFpcnM6IDAsXG4gICAgICBfbnVtYmVyT2ZGaWF0Q3VycmVuY2llczogMCxcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKlxuICogYWRkRXhjaGFuZ2VcbiAqXG4gKi9cbmZ1bmN0aW9uIGFkZEV4Y2hhbmdlKGV4Y2hhbmdlcywgbmFtZSwgaWQpIHtcbiAgaWYgKCFuYW1lIHx8ICFpZCkgIHJldHVybjtcbiAgZXhjaGFuZ2VzW2lkXSA9IHtcbiAgICBpZCxcbiAgICBuYW1lLFxuICAgIHBhaXJzOiBuZXcgU2V0KCksXG4gICAgX2NyeXB0b0N1cnJlbmNpZXM6IG5ldyBTZXQoKSxcbiAgICBfZmlhdEN1cnJlbmNpZXM6IG5ldyBTZXQoKSxcbiAgICBfcG9pbnRzOiAwLFxuICAgIF9udW1iZXJPZlBhaXJzOiAwLFxuICAgIF9udW1iZXJPZkZpYXRQYWlyczogMCxcbiAgICBfbnVtYmVyT2ZDcnlwdG9QYWlyczogMCxcbiAgICBfbnVtYmVyT2ZDdXJyZW5jaWVzOiAwLFxuICAgIF9udW1iZXJPZkNyeXB0b0N1cnJlbmNpZXM6IDAsXG4gICAgX251bWJlck9mRmlhdEN1cnJlbmNpZXM6IDAsXG4gIH07XG59XG5cbi8qKlxuICpcbiAqIGFkZEV4Y2hhbmdlVG9TeW1ib2xcbiAqXG4gKi9cbmZ1bmN0aW9uIGFkZEV4Y2hhbmdlVG9TeW1ib2woc3ltYm9scywgc3ltYm9sLCBpZCwgdHlwZSkge1xuICBpZiAoIXN5bWJvbCB8fCAhaWQgfHwgIXR5cGUpIHJldHVybjtcbiAgaWYgKHR5cGUgPT09ICdmaWF0JykgICAgICAgICAgICAgICBzeW1ib2xzW3N5bWJvbF0uZXhjaGFuZ2VMaXN0RmlhdE9ubHkuYWRkKGlkKTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ0RlY2VudHJhbGl6ZWQnKSBzeW1ib2xzW3N5bWJvbF0uZXhjaGFuZ2VMaXN0RGV4LmFkZChpZCk7XG4gIGVsc2UgaWYgKHR5cGUgPT09ICdjcnlwdG8nKSAgICAgICAgc3ltYm9sc1tzeW1ib2xdLmV4Y2hhbmdlTGlzdENyeXB0b09ubHkuYWRkKGlkKTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ2JvdGgnKSAgICAgICAgICBzeW1ib2xzW3N5bWJvbF0uZXhjaGFuZ2VMaXN0QWNjZXB0c0JvdGguYWRkKGlkKTtcbn1cblxuLyoqXG4gKlxuICogYWRkUGFpcnNUb1N5bWJvbFxuICpcbiAqL1xuZnVuY3Rpb24gYWRkUGFpcnNUb1N5bWJvbChzeW1ib2xzLCBzeW1ib2wsIHBhaXIpIHtcbiAgaWYgKHN5bWJvbHNbc3ltYm9sXSkgc3ltYm9sc1tzeW1ib2xdLnBhaXJzLmFkZChwYWlyKTtcbiAgZWxzZSB7XG4gICAgLy9sb2dnZXIuaW5mbyhgYWRkUGFpcnNUb1N5bWJvbCgpOiBjYW4ndCBhZGQgcGFpciAke3BhaXJ9IHRvIHN5bWJvbCAke3N5bWJvbH1gKTtcbiAgfVxufVxuXG4vKipcbiAqXG4gKiBhZGRQYWlyc1RvRXhjaGFuZ2VcbiAqXG4gKi9cbmZ1bmN0aW9uIGFkZFBhaXJzVG9FeGNoYW5nZShleGNoYW5nZXMsIGlkLCBwYWlyKSB7XG4gIGlmIChleGNoYW5nZXNbaWRdKSBleGNoYW5nZXNbaWRdLnBhaXJzLmFkZChwYWlyKTtcbiAgZWxzZSB7XG4gICAgLy8gbG9nZ2VyLmluZm8oYGFkZFBhaXJzVG9FeGNoYW5nZSgpOiBjYW4ndCBhZGQgcGFpciAke3BhaXJ9IHRvIGV4Y2hhbmdlIGlkICR7aWR9YCk7XG4gIH1cbn1cblxuLy8gVE9ETzogdmFsP1xuLy8gZnVuY3Rpb24gYWRkQ3J5cHRvVm9sdW1lKGN1cnJlbmN5Q29kZXMsIHN5bWJvbDEsIHN5bWJvbDIpIHtcbi8vICAgaWYgKCEoY3VycmVuY3lDb2Rlcy5pbmNsdWRlcyhzeW1ib2wyKSB8fCBjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDEpKSkge1xuLy8gICAgIC8vIEZvciBlYWNoIHBhaXIgcmVjb3JkIHRoZSB2b2x1bWUgaW4gZWFjaCBjdXJyZW5jeVxuLy8gICAgIGlmICghY3J5cHRvVm9sdW1lW3N5bWJvbDFdKSAgICAgICAgICBjcnlwdG9Wb2x1bWVbc3ltYm9sMV0gICAgICAgICAgPSB7fTtcbi8vICAgICBpZiAoIWNyeXB0b1ZvbHVtZVtzeW1ib2wyXSkgICAgICAgICAgY3J5cHRvVm9sdW1lW3N5bWJvbDJdICAgICAgICAgID0ge307XG4vLyAgICAgaWYgKCFjcnlwdG9Wb2x1bWVbc3ltYm9sMV1bc3ltYm9sMl0pIGNyeXB0b1ZvbHVtZVtzeW1ib2wxXVtzeW1ib2wyXSA9IDA7XG4vLyAgICAgaWYgKCFjcnlwdG9Wb2x1bWVbc3ltYm9sMl1bc3ltYm9sMV0pIGNyeXB0b1ZvbHVtZVtzeW1ib2wyXVtzeW1ib2wxXSA9IDA7XG4vLyAgICAgY3J5cHRvVm9sdW1lW3N5bWJvbDFdW3N5bWJvbDJdICs9IHZhbC5WT0xVTUUyNEhPVVJUTztcbi8vICAgICBjcnlwdG9Wb2x1bWVbc3ltYm9sMl1bc3ltYm9sMV0gKz0gdmFsLlZPTFVNRTI0SE9VUjtcbi8vICAgfVxuLy8gfVxuXG4vLyBUT0RPOiB2YWw/XG4vLyBmdW5jdGlvbiBhZGRGaWF0Vm9sdW1lKGN1cnJlbmN5Q29kZXMsIHN5bWJvbDEsIHN5bWJvbDIpIHtcbi8vICAgaWYgKGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMikpIHtcbi8vICAgICBpZiAoIWZpYXRWb2x1bWVbc3ltYm9sMV0pICAgICAgICAgIGZpYXRWb2x1bWVbc3ltYm9sMV0gICAgICAgICAgPSB7fTtcbi8vICAgICBpZiAoIWZpYXRWb2x1bWVbc3ltYm9sMV1bc3ltYm9sMl0pIGZpYXRWb2x1bWVbc3ltYm9sMV1bc3ltYm9sMl0gPSAwO1xuLy8gICAgIGZpYXRWb2x1bWVbc3ltYm9sMV1bc3ltYm9sMl0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICs9IHZhbC5WT0xVTUUyNEhPVVJUTztcbi8vICAgfVxuLy8gICBpZiAoY3VycmVuY3lDb2Rlcy5pbmNsdWRlcyhzeW1ib2wxKSkge1xuLy8gICAgIGlmICghZmlhdFZvbHVtZVtzeW1ib2wyXSkgICAgICAgICAgZmlhdFZvbHVtZVtzeW1ib2wyXSAgICAgICAgICA9IHt9O1xuLy8gICAgIGlmICghZmlhdFZvbHVtZVtzeW1ib2wyXVtzeW1ib2wxXSkgZmlhdFZvbHVtZVtzeW1ib2wyXVtzeW1ib2wxXSA9IDA7XG4vLyAgICAgZmlhdFZvbHVtZVtzeW1ib2wyXVtzeW1ib2wxXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKz0gdmFsLlZPTFVNRTI0SE9VUjtcbi8vICAgfVxuLy8gfVxuXG4vKipcbiAqXG4gKiBFWENIQU5HRVNcbiAqXG4gKiBGb3JtYXQgYW5kIHNhdmUgZXhjaGFuZ2UgZGF0YSB0byBhcHBCb290c3RyYXBEYXRhIGFuZCByZXR1cm5cbiAqIGV4Y2hhbmdlIGRhdGEgZm9yIHN5bWJvbHMgdG8gYmUgbWVyZ2VkIHdpdGggdGhlIG1haW4gZGF0YXNldFxuICpcbiAqIE9yaWdpbmFsIGV4Y2hhbmdlcyBkYXRhIGlzIGluIHRoZSBiZWxvdyBmb3JtYXQ6XG4gKlxuICogYGBgXG4gKiAgIERhdGE6IHtcbiAqICAgICBLcmFrZW46IHtcbiAqICAgICAgIHBhaXJzOiB7XG4gKiAgICAgICAgIGV0YzogW2J0YywgZXRoXSxcbiAqICAgICAgICAgcG93cjogW2J0YywgZXRoXVxuICogICAgICAgfVxuICogICAgIH1cbiAqICAgfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIC0gcmVzcG9uc2Ugb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdGltZXN0YW1wIC0gdGltZSBkYXRhIHdhcyByZWNlaXZlZFxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGEgLSBsZWdhY3kgYm9vdHN0cmFwIGRhdGEgKHdpbGwgYmUgbWVyZ2VkIHdpdGggYXBwQm9vdHN0cmFwRGF0YVxuICogQHBhcmFtIHtPYmplY3R9IGFkZEJvb3RzdHJhcERhdGEgLSBkYXRhIHN0b3JlIGZvciBub24gcm93IGRhdGFcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlTmFtZSAtIGZpbGUgbmFtZSBvZiBzdG9yZWQgcmVxdWVzdFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IC0gdHlwZSBvZiBldmVudFxuICogQHJldHVybiB7T2JqZWN0fVxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25FeGNoYW5nZXNMaXN0KHJlc3BvbnNlLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERhdGEsIGFwcEJvb3RzdHJhcERhdGEsIGZpbGVOYW1lLCBldmVudCwgY2FjaGUpIHtcbiAgdHJ5IHtcblxuICAgIGNvbnN0IGVtcHR5UmV0dXJuID0ge2RhdGE6IHt9LCB0aW1lc3RhbXB9O1xuICAgIGNvbnN0IHN0b3JlID0gSlNPTi5wYXJzZShjYWNoZS5nZXQoYCR7c2V0dGluZ3MuZGJEaXJ9L3N0b3JlL2RhdGEuanNvbmApWzBdKTtcbiAgICBjb25zdCBtYXBOYW1lSWQgPSBnZXROZXN0ZWRQcm9wKHN0b3JlLCAnZXhjaGFuZ2UtbWFwLW5hbWVJZCcpO1xuXG4gICAgaWYgKCFhcHBCb290c3RyYXBEYXRhLmN1cnJlbmN5IHx8ICFtYXBOYW1lSWQgfHwgKCFyZXNwb25zZSAmJiAhcmVzcG9uc2UuRGF0YSkgfHwgcmVzcG9uc2UuUmVzcG9uc2UgIT09ICdTdWNjZXNzJykge1xuICAgICAgcmV0dXJuIGVtcHR5UmV0dXJuO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy8gU1RFUCAxOiBFeHRyYWN0IGRhdGEgaW50byB0aGUgYmVsb3cgMiBvYmplY3Qgc3RydWN0dXJlc1xuICAgIC8vXG4gICAgLy8gc3ltYm9sczoge1xuICAgIC8vICAgYnRjOiB7XG4gICAgLy8gICAgIGV4Y2hhbmdlc0xpc3Q6IFsxMjM0LCA0MzIyXSxcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyBleGNoYW5nZXM6IHtcbiAgICAvLyAgIDEyMzQ6IHtcbiAgICAvLyAgICAgcGFpcnM6IHtidGM6IFtldGgsIGx0Y119LFxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvL1xuXG4gICAgY29uc3Qgc3ltYm9scyA9IHt9O1xuICAgIGNvbnN0IGV4Y2hhbmdlcyA9IHt9O1xuICAgIC8vIGNvbnN0IGZpYXRWb2x1bWUgPSB7fTtcbiAgICAvLyBjb25zdCBjcnlwdG9Wb2x1bWUgPSB7fTtcblxuICAgIGxldCBkYXRhO1xuICAgIGxldCBsaXN0O1xuICAgIGxldCBwYWlyO1xuICAgIGxldCBzeW1ib2wxO1xuICAgIGxldCBzeW1ib2wyO1xuICAgIGxldCBleGNoYW5nZUlkO1xuICAgIGxldCBleGNoYW5nZU5hbWU7XG4gICAgbGV0IGNlbnRyYWxpemF0aW9uVHlwZTtcbiAgICBjb25zdCBleGNsdWRlMHhTeW1ib2xzID0gdHJ1ZTtcblxuICAgIGZvciAoW2V4Y2hhbmdlTmFtZSwgZGF0YV0gb2YgT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuRGF0YSkpIHtcbiAgICAgIGV4Y2hhbmdlSWQgPSBtYXBOYW1lSWRbZXhjaGFuZ2VOYW1lXTtcbiAgICAgIGNlbnRyYWxpemF0aW9uVHlwZSA9IGdldE5lc3RlZFByb3Aoc3RvcmUsIGBleGNoYW5nZXMuJHtleGNoYW5nZUlkfS5DZW50cmFsaXphdGlvblR5cGVgKTtcbiAgICAgIGlmICghZGF0YS5pc19hY3RpdmUpIGNvbnRpbnVlO1xuICAgICAgaWYgKCFleGNoYW5nZXNbZXhjaGFuZ2VJZF0pIGFkZEV4Y2hhbmdlKGV4Y2hhbmdlcywgZXhjaGFuZ2VOYW1lLCBleGNoYW5nZUlkKTtcbiAgICAgIGRhdGEgPSBkYXRhLnBhaXJzO1xuXG4gICAgICBmb3IgKFtzeW1ib2wxLCBsaXN0XSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgICBpZiAoc3ltYm9sMS5zdGFydHNXaXRoKCcweCcpICYmIGV4Y2x1ZGUweFN5bWJvbHMpIGNvbnRpbnVlO1xuICAgICAgICBhZGRTeW1ib2woc3ltYm9scywgc3ltYm9sMSk7XG4gICAgICAgIGlmIChjZW50cmFsaXphdGlvblR5cGUgPT09ICdEZWNlbnRyYWxpemVkJykge1xuICAgICAgICAgIGFkZEV4Y2hhbmdlVG9TeW1ib2woc3ltYm9scywgc3ltYm9sMSwgZXhjaGFuZ2VJZCwgY2VudHJhbGl6YXRpb25UeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHN5bWJvbDIgb2YgT2JqZWN0LnZhbHVlcyhsaXN0KSkge1xuICAgICAgICAgIGlmIChzeW1ib2wyLnN0YXJ0c1dpdGgoJzB4JykgJiYgZXhjbHVkZTB4U3ltYm9scykgY29udGludWU7XG4gICAgICAgICAgcGFpciA9IGAke3N5bWJvbDF9LCR7c3ltYm9sMn1gO1xuICAgICAgICAgIGFkZFN5bWJvbChzeW1ib2xzLCBzeW1ib2wyKTtcbiAgICAgICAgICBpZiAoY2VudHJhbGl6YXRpb25UeXBlID09PSAnRGVjZW50cmFsaXplZCcpIHtcbiAgICAgICAgICAgIGFkZEV4Y2hhbmdlVG9TeW1ib2woc3ltYm9scywgc3ltYm9sMSwgZXhjaGFuZ2VJZCwgY2VudHJhbGl6YXRpb25UeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkUGFpcnNUb0V4Y2hhbmdlKGV4Y2hhbmdlcywgZXhjaGFuZ2VJZCwgcGFpcik7XG4gICAgICAgICAgYWRkUGFpcnNUb1N5bWJvbChzeW1ib2xzLCBzeW1ib2wxLCBwYWlyKTtcbiAgICAgICAgICBhZGRQYWlyc1RvU3ltYm9sKHN5bWJvbHMsIHN5bWJvbDIsIHBhaXIpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gU1RFUCAyOiBXaXRoIHRoZSBkYXRhIGNvbGxlY3RlZCB3ZSBjYW4gbm93IGFubm90YXRlIGl0XG4gICAgLy8gICAgICAgICB3aXRoIGFkZGl0aW9uYWwgbWV0cmljcyBhcyBiZWxvd1xuICAgIC8vXG4gICAgLy8gc3ltYm9sczoge1xuICAgIC8vICAgYnRjOiB7XG4gICAgLy8gICAgIGV4Y2hhbmdlc0xpc3Q6IFsxMjM0LCA0MzIyXSxcbiAgICAvLyAgICAgcGFpcnM6IFsnZXRoLGx0YyddLFxuICAgIC8vICAgICBfZmlhdEN1cnJlbmNpZXM6IFt1c2QsIGV1cl0sXG4gICAgLy8gICAgIF9leGNoYWduZXNSYW5rOiA4NyxcbiAgICAvLyAgICAgX251bWJlck9mRmlhdEN1cnJlbmNpZXM6IDIsXG4gICAgLy8gICAgIF9udW1iZXJPZkV4Y2hhbmdlczogMzMsXG4gICAgLy8gICAgIF9udW1iZXJPZlBhaXJzOiAxMjMsXG4gICAgLy8gICAgIF9udW1iZXJPZkZpYXRQYWlyczogMzFcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy8gZXhjaGFuZ2VzOiB7XG4gICAgLy8gMTIzNDoge1xuICAgIC8vICAgICBwYWlyczogWydldGgsbHRjJ10sXG4gICAgLy8gICAgIF9wb2ludHM6IDg0LFxuICAgIC8vICAgICBfZmlhdEN1cnJlbmNpZXM6IFt1c2QsIGV1cl0sXG4gICAgLy8gICAgIF9jcnlwdG9DdXJyZW5jaWVzOiBbYnRjLCBsdGNdLFxuICAgIC8vICAgICBfbnVtYmVyT2ZGaWF0Q3VycmVuY2llczogMixcbiAgICAvLyAgICAgX251bWJlck9mU3ltYm9sZDogMzQsXG4gICAgLy8gICAgIF9udW1iZXJPZlBhaXJzOiAzMixcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy9cblxuICAgIGxldCBvYmo7XG4gICAgY29uc3QgY3VycmVuY3lDb2RlcyA9IE9iamVjdC5rZXlzKGFwcEJvb3RzdHJhcERhdGEuY3VycmVuY3kpIHx8IFtdO1xuXG4gICAgLy8gU3ltYm9sc1xuICAgIGZvciAob2JqIG9mIE9iamVjdC52YWx1ZXMoc3ltYm9scykpIHtcbiAgICAgIG9iai5fbnVtYmVyT2ZQYWlycyA9IG9iai5wYWlycy5zaXplO1xuICAgICAgZm9yIChwYWlyIG9mIG9iai5wYWlycy52YWx1ZXMoKSkge1xuICAgICAgICBbc3ltYm9sMSwgc3ltYm9sMl0gPSBwYWlyLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgLy8gYWRkIHRvIF9maWF0Q3VycmVuY2llcyBvciBfY3J5cHRvQ3VycmVuY2llc1xuICAgICAgICBpZiAoY3VycmVuY3lDb2Rlcy5pbmNsdWRlcyhzeW1ib2wxKSkgb2JqLl9maWF0Q3VycmVuY2llcy5hZGQoc3ltYm9sMSk7XG4gICAgICAgIGlmIChjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDIpKSBvYmouX2ZpYXRDdXJyZW5jaWVzLmFkZChzeW1ib2wyKTtcblxuICAgICAgICBpZiAoY3VycmVuY3lDb2Rlcy5pbmNsdWRlcyhzeW1ib2wxKSB8fCBjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDIpKSB7XG4gICAgICAgICAgb2JqLl9udW1iZXJPZkZpYXRQYWlycysrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvYmouX251bWJlck9mRmlhdEN1cnJlbmNpZXMgPSBvYmouX2ZpYXRDdXJyZW5jaWVzLnNpemU7XG4gICAgICAvLyBfZXhjaGFuZ2VzUmFua1xuICAgIH1cblxuICAgIC8vIEV4Y2hhbmdlc1xuICAgIGZvciAob2JqIG9mIE9iamVjdC52YWx1ZXMoZXhjaGFuZ2VzKSkge1xuXG4gICAgICBmb3IgKHBhaXIgb2Ygb2JqLnBhaXJzLnZhbHVlcygpKSB7XG5cbiAgICAgICAgW3N5bWJvbDEsIHN5bWJvbDJdID0gcGFpci5zcGxpdCgnLCcpO1xuXG4gICAgICAgIGlmIChjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDEpIHx8IGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMikpIHtcbiAgICAgICAgICBvYmouX251bWJlck9mRmlhdFBhaXJzKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdG8gX2ZpYXRDdXJyZW5jaWVzIG9yIF9jcnlwdG9DdXJyZW5jaWVzXG4gICAgICAgIGlmIChjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDEpKSBvYmouX2ZpYXRDdXJyZW5jaWVzLmFkZChzeW1ib2wxKTtcbiAgICAgICAgZWxzZSBvYmouX2NyeXB0b0N1cnJlbmNpZXMuYWRkKHN5bWJvbDEpO1xuXG4gICAgICAgIGlmIChjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDIpKSBvYmouX2ZpYXRDdXJyZW5jaWVzLmFkZChzeW1ib2wyKTtcbiAgICAgICAgZWxzZSBvYmouX2NyeXB0b0N1cnJlbmNpZXMuYWRkKHN5bWJvbDIpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIE5lZWQgcGVyIGV4Y2hhbmdlIHZvbHVtZSB0byBkbyB0aGlzLiBMb29rcyBsaWtlIHRvbyBtYW55IHJlcXVlc3RzXG4gICAgICAgIC8vIHdpdGggdGhlIGN1cnJlbnQgQVBJIHNldHVwXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGFkZENyeXB0b1ZvbHVtZShjdXJyZW5jeUNvZGVzLCBzeW1ib2wxLCBzeW1ib2wyKTtcbiAgICAgICAgLy8gYWRkRmlhdFZvbHVtZShjdXJyZW5jeUNvZGVzLCBzeW1ib2wxLCBzeW1ib2wyKTtcblxuICAgICAgfVxuICAgICAgb2JqLl9udW1iZXJPZkZpYXRDdXJyZW5jaWVzID0gb2JqLl9maWF0Q3VycmVuY2llcy5zaXplO1xuICAgICAgb2JqLl9udW1iZXJPZkNyeXB0b0N1cnJlbmNpZXMgPSBvYmouX2NyeXB0b0N1cnJlbmNpZXMuc2l6ZTtcbiAgICAgIG9iai5fbnVtYmVyT2ZDdXJyZW5jaWVzID0gb2JqLl9udW1iZXJPZkZpYXRDdXJyZW5jaWVzICsgb2JqLl9udW1iZXJPZkNyeXB0b0N1cnJlbmNpZXM7XG5cbiAgICAgIG9iai5fbnVtYmVyT2ZQYWlycyA9IG9iai5wYWlycy5zaXplO1xuICAgICAgb2JqLl9udW1iZXJPZkNyeXB0b1BhaXJzID0gb2JqLl9udW1iZXJPZlBhaXJzIC0gb2JqLl9udW1iZXJPZkZpYXRQYWlycztcblxuICAgIH1cblxuICAgIC8vIEV4Y2hhbmdlcyBwYXJ0IDJcbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIGNhbGN1bGF0ZWQgd2hpY2ggZXhjaGFuZ2VzIGhhdmUgZmlhdCAvIGNyeXB0byBwYWlycyBhZGQgdGhpcyBkYXRhXG4gICAgbGV0IGhhc0ZpYXQ7XG4gICAgbGV0IGhhc0NyeXB0bztcbiAgICBmb3IgKFtleGNoYW5nZUlkLCBvYmpdIG9mIE9iamVjdC5lbnRyaWVzKGV4Y2hhbmdlcykpIHtcblxuICAgICAgZm9yIChwYWlyIG9mIG9iai5wYWlycy52YWx1ZXMoKSkge1xuXG4gICAgICAgIFtzeW1ib2wxLCBzeW1ib2wyXSA9IHBhaXIuc3BsaXQoJywnKTtcblxuICAgICAgICBoYXNGaWF0ID0gaGFzQ3J5cHRvID0gZmFsc2U7XG4gICAgICAgIGlmIChvYmouX251bWJlck9mRmlhdEN1cnJlbmNpZXMpIGhhc0ZpYXQgPSB0cnVlO1xuICAgICAgICBpZiAob2JqLl9udW1iZXJPZkNyeXB0b0N1cnJlbmNpZXMpIGhhc0NyeXB0byA9IHRydWU7XG5cbiAgICAgICAgaWYgKGhhc0ZpYXQgJiYgaGFzQ3J5cHRvKSBhZGRFeGNoYW5nZVRvU3ltYm9sKHN5bWJvbHMsIHN5bWJvbDEsIGV4Y2hhbmdlSWQsICdib3RoJyk7XG4gICAgICAgIGVsc2UgaWYgKGhhc0NyeXB0bykgICAgICAgYWRkRXhjaGFuZ2VUb1N5bWJvbChzeW1ib2xzLCBzeW1ib2wxLCBleGNoYW5nZUlkLCAnY3J5cHRvJyk7XG4gICAgICAgIGVsc2UgaWYgKGhhc0ZpYXQpICAgICAgICAgYWRkRXhjaGFuZ2VUb1N5bWJvbChzeW1ib2xzLCBzeW1ib2wxLCBleGNoYW5nZUlkLCAnZmlhdCcpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBTeW1ib2xzIHBhcnQgMlxuICAgIGZvciAob2JqIG9mIE9iamVjdC52YWx1ZXMoc3ltYm9scykpIHtcbiAgICAgIG9iai5fbnVtYmVyT2ZFeGNoYW5nZXMgPSBvYmouZXhjaGFuZ2VMaXN0RmlhdE9ubHkuc2l6ZSArIG9iai5leGNoYW5nZUxpc3RDcnlwdG9Pbmx5LnNpemUgKyBvYmouZXhjaGFuZ2VMaXN0QWNjZXB0c0JvdGguc2l6ZTtcbiAgICAgIG9iai5fbnVtYmVyT2ZEZXggPSBvYmouZXhjaGFuZ2VMaXN0RGV4LnNpemU7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBTdGVwIDM6IFNhdmUgZXhjaGFuZ2UgZGF0YSB0byBjb3JlIGRhdGFzZXRcbiAgICAvL1xuICAgIC8vIGRhdGE6IHtcbiAgICAvLyAgIDExODI6IHtcbiAgICAvLyAgICAgJ2NyeXB0b2h1Yi1leGNoYW5nZXNMaXN0RmlhdE9ubHknOiBbXSxcbiAgICAvLyAgICAgJ2NyeXB0b2h1Yi1leGNoYW5nZXNMaXN0Q3J5cHRvT25seSc6IFsnQmluYW5jZSddLFxuICAgIC8vICAgICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3RBY2NlcHRzQm90aCc6IFsnS3Jha2VuJ10sXG4gICAgLy8gICAgICdjcnlwdG9odWItbnVtYmVyT2ZGaWF0Q3VycmVuY2llcyc6IDMyLFxuICAgIC8vICAgICAnY3J5cHRvaHViLW51bWJlck9mRmlhdEN1cnJlbmNpZXMtdGltZXN0YW1wJzogMTU1MDY5NjkxOTk3OCxcbiAgICAvLyAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkV4Y2hhbmdlcyc6IDIzLFxuICAgIC8vICAgICAnY3J5cHRvaHViLW51bWJlck9mRXhjaGFuZ2VzLXRpbWVzdGFtcCc6IDE1NTA2OTY5MTk5NzgsXG4gICAgLy8gICAgICdjcnlwdG9odWItbnVtYmVyT2ZQYWlycyc6IDQsXG4gICAgLy8gICAgICdjcnlwdG9odWItbnVtYmVyT2ZQYWlycy10aW1lc3RhbXAnOiAxNTUwNjk2OTE5OTc4LFxuICAgIC8vICAgICAnY3J5cHRvaHViLW51bWJlck9mRmlhdFBhaXJzJzogMyxcbiAgICAvLyAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkZpYXRQYWlycy10aW1lc3RhbXAnOiAxNTUwNjk2OTE5OTc4XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8vXG4gICAgZnVuY3Rpb24gaGFuZGxlRGF0YSh0aW1lc3RhbXApIHtcblxuICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgY29uc3QgbWFwID0gYm9vdHN0cmFwRGF0YVsnc3ltYm9sSWRNYXAnXTtcbiAgICAgIGlmIChib290c3RyYXBEYXRhLmNvaW5MaXN0KSB7XG4gICAgICAgIGNvbnN0IGNvaW5MaXN0ID0gYm9vdHN0cmFwRGF0YS5jb2luTGlzdDtcbiAgICAgICAgbGV0IGlkO1xuICAgICAgICBsZXQgc3ltYm9sO1xuICAgICAgICBmb3IgKFtzeW1ib2xdIG9mIE9iamVjdC5lbnRyaWVzKGNvaW5MaXN0KSkge1xuICAgICAgICAgIGlmIChzeW1ib2xzW3N5bWJvbF0pIHtcbiAgICAgICAgICAgIGlkID0gbWFwW3N5bWJvbF07XG4gICAgICAgICAgICByZXN1bHRbaWRdID0ge1xuXG4gICAgICAgICAgICAgIC8vICdjcnlwdG9odWItcGFpcnMnOiBzeW1ib2xzW3N5bWJvbF0ucGFpcnMsXG4gICAgICAgICAgICAgIC8vICdjcnlwdG9odWItZmlhdEN1cnJlbmNpZXMnOiBzeW1ib2xzW3N5bWJvbF0uX2ZpYXRDdXJyZW5jaWVzLFxuICAgICAgICAgICAgICAvLyAnY3J5cHRvaHViLWV4Y2hhZ25lc1JhbmsnOiBzeW1ib2xzW3N5bWJvbF0uX2V4Y2hhZ25lc1JhbmssXG5cbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1leGNoYW5nZXNMaXN0RGV4JzogQXJyYXkuZnJvbShzeW1ib2xzW3N5bWJvbF0uZXhjaGFuZ2VMaXN0RGV4KSxcbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1leGNoYW5nZXNMaXN0RmlhdE9ubHknOiBBcnJheS5mcm9tKHN5bWJvbHNbc3ltYm9sXS5leGNoYW5nZUxpc3RGaWF0T25seSksXG4gICAgICAgICAgICAgICdjcnlwdG9odWItZXhjaGFuZ2VzTGlzdENyeXB0b09ubHknOiBBcnJheS5mcm9tKHN5bWJvbHNbc3ltYm9sXS5leGNoYW5nZUxpc3RDcnlwdG9Pbmx5KSxcbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1leGNoYW5nZXNMaXN0QWNjZXB0c0JvdGgnOiBBcnJheS5mcm9tKHN5bWJvbHNbc3ltYm9sXS5leGNoYW5nZUxpc3RBY2NlcHRzQm90aCksXG5cbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkZpYXRDdXJyZW5jaWVzJzogc3ltYm9sc1tzeW1ib2xdLl9udW1iZXJPZkZpYXRDdXJyZW5jaWVzLFxuICAgICAgICAgICAgICAnY3J5cHRvaHViLW51bWJlck9mRmlhdEN1cnJlbmNpZXMtdGltZXN0YW1wJzogdGltZXN0YW1wLFxuXG4gICAgICAgICAgICAgICdjcnlwdG9odWItbnVtYmVyT2ZFeGNoYW5nZXMnOiBzeW1ib2xzW3N5bWJvbF0uX251bWJlck9mRXhjaGFuZ2VzLFxuICAgICAgICAgICAgICAnY3J5cHRvaHViLW51bWJlck9mRXhjaGFuZ2VzLXRpbWVzdGFtcCc6IHRpbWVzdGFtcCxcblxuICAgICAgICAgICAgICAnY3J5cHRvaHViLW51bWJlck9mUGFpcnMnOiBzeW1ib2xzW3N5bWJvbF0uX251bWJlck9mUGFpcnMsXG4gICAgICAgICAgICAgICdjcnlwdG9odWItbnVtYmVyT2ZQYWlycy10aW1lc3RhbXAnOiB0aW1lc3RhbXAsXG5cbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkZpYXRQYWlycyc6IHN5bWJvbHNbc3ltYm9sXS5fbnVtYmVyT2ZGaWF0UGFpcnMsXG4gICAgICAgICAgICAgICdjcnlwdG9odWItbnVtYmVyT2ZGaWF0UGFpcnMtdGltZXN0YW1wJzogdGltZXN0YW1wLFxuXG4gICAgICAgICAgICAgICdjcnlwdG9odWItbnVtYmVyT2ZEZXgnOiBzeW1ib2xzW3N5bWJvbF0uX251bWJlck9mRXhjaGFuZ2VzLFxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ge2RhdGE6IHJlc3VsdCwgdGltZXN0YW1wfTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0b3JlKHRpbWVzdGFtcCkge1xuICAgICAgcmV0dXJuIHtkYXRhOiB7ZGF0YTogZXhjaGFuZ2VzfSwgdGltZXN0YW1wfTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgcmV0dXJuIGhhbmRsZURhdGEodGltZXN0YW1wKSB8fCBlbXB0eVJldHVybjtcbiAgICAgIGNhc2UgJ3N0b3JlJzpcbiAgICAgICAgcmV0dXJuIGhhbmRsZVN0b3JlKHRpbWVzdGFtcCkgfHwgZW1wdHlSZXR1cm47XG4gICAgfVxuXG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uRXhjaGFuZ2VzTGlzdCgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBDcnlwdG9odWJcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuXG4vKipcbiAqXG4gKiBQUklDRVxuICpcbiAqIE9yaWdpbmFsIERhdGFcbiAqIC0tLS0tLS0tLS0tLS1cbiAqXG4gKiBUWVBFOiAgXCI1XCJcbiAqIE1BUktFVDogIFwiQ0NDQUdHXCJcbiAqIEZST01TWU1CT0w6ICBcIkJUQ1wiXG4gKiBUT1NZTUJPTDogIFwiVVNEXCJcbiAqIEZMQUdTOiAgXCI0XCJcbiAqIFBSSUNFOiA2NDI5LjQ5XG4gKiBMQVNUVVBEQVRFOiAxNTM2MjIyNzIyXG4gKiBMQVNUVk9MVU1FOiAwLjAwNVxuICogTEFTVFZPTFVNRVRPOiAzMi4xMjQ1OTI1XG4gKiBMQVNUVFJBREVJRDogIFwiMjkwMzMyNTcwXCJcbiAqIFZPTFVNRURBWTogNzMzMzEuNjI4NDY0MzE2MDlcbiAqIFZPTFVNRURBWVRPOiA0NzMyMTQ0MTMuMzQwNzgxOFxuICogVk9MVU1FMjRIT1VSOiAxNjQ1NDIuOTc3MjUyNzYwNDRcbiAqIFZPTFVNRTI0SE9VUlRPOiAxMTE1NTg2NDYyLjI5NTU0OVxuICogT1BFTkRBWTogNjcwNS4wM1xuICogSElHSERBWTogNjcyNy4xOVxuICogTE9XREFZOiA2Mjk1LjExXG4gKiBPUEVOMjRIT1VSOiA3Mzg1LjU1XG4gKiBISUdIMjRIT1VSOiA3Mzg4LjE1XG4gKiBMT1cyNEhPVVI6IDYyODkuOTNcbiAqIExBU1RNQVJLRVQ6ICBcIkJpdGZpbmV4XCJcbiAqIENIQU5HRTI0SE9VUjogLTk1Ni4wNjAwMDAwMDAwMDA0XG4gKiBDSEFOR0VQQ1QyNEhPVVI6IC0xMi45NDUwMDc0ODA4MjQwNDhcbiAqIENIQU5HRURBWTogLTI3NS41Mzk5OTk5OTk5OTk5NlxuICogQ0hBTkdFUENUREFZOiAtNC4xMDk0NTIxNTc1NTkzMjRcbiAqIFNVUFBMWTogMTcyNTIxMDBcbiAqIE1LVENBUDogMTEwOTIyMjA0NDI5XG4gKiBUT1RBTFZPTFVNRTI0SDogNDcxNzY5Ljg0MjQwMTQzNDg0XG4gKiBUT1RBTFZPTFVNRTI0SFRPOiAzMDkwODk4NTE5LjUwMDI5OTVcbiAqIElNQUdFVVJMOiBcIi9tZWRpYS8xOTYzMy9idGMucG5nXCJcbiAqXG4gKiBQcmVmaXggZmllbGRzIHdpdGggXCJjYy1wcmljZS1cIlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUFJJQ0UgLT4gY2MtcHJpY2UtUFJJQ0VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwcmljZSBpcyBhbiBhcnJheSBvZiB0aGUgcmVzcG9uc2VzIG9mIGJhdGNoZWQgY3J5cHRvY29tcGFyZSBhcGkgcHJpY2UgZGF0YVxuICogQHBhcmFtIHtTdHJpbmd9IHRpbWVzdGFtcFxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGFcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25QcmljZShwcmljZSwgdGltZXN0YW1wLCBib290c3RyYXBEYXRhKSB7XG4gIHRyeSB7XG5cbiAgICBsZXQgaTtcbiAgICBsZXQgaWQ7XG4gICAgbGV0IHZhbDtcbiAgICBsZXQgZmllbGQ7XG4gICAgbGV0IHN5bWJvbDtcbiAgICBsZXQgZkRhdGEgPSB7fTtcbiAgICBsZXQgYmF0Y2hSZXF1ZXN0RGF0YTtcbiAgICBjb25zdCBwcmVmaXggPSAnY2MtcHJpY2UtJztcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJpY2UpKSBwcmljZSA9IFtwcmljZV07XG4gICAgZm9yIChpID0gMDsgaSA8IHByaWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBiYXRjaFJlcXVlc3REYXRhID0gcHJpY2VbaV0uUkFXO1xuICAgICAgaWYgKCFwcmljZVtpXS5SQVcpIHtcbiAgICAgICAgY29uc3Qgd2FybmluZyA9IHByaWNlW2ldLk1lc3NhZ2U7XG4gICAgICAgIGxvZ2dlci53YXJuKHdhcm5pbmcpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoW3N5bWJvbCwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhiYXRjaFJlcXVlc3REYXRhKSkge1xuICAgICAgICBpZCA9IGJvb3RzdHJhcERhdGEuc3ltYm9sSWRNYXBbc3ltYm9sXTtcbiAgICAgICAgaWYgKGlkICYmIHZhbC5VU0QpIHtcbiAgICAgICAgICB2YWwgPSB2YWwuVVNEO1xuICAgICAgICAgIGZEYXRhW2lkXSA9IHt9O1xuICAgICAgICAgIGZvciAoZmllbGQgb2YgT2JqZWN0LmtleXModmFsKSkge1xuICAgICAgICAgICAgZkRhdGFbaWRdW2Ake3ByZWZpeH0ke2ZpZWxkfS10aW1lc3RhbXBgXSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGZEYXRhW2lkXVtgJHtwcmVmaXh9JHtmaWVsZH1gXSA9IHZhbFtmaWVsZF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcihgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVByaWNlKCk6IE5vIGlkIG9yIHZhbC5VU0QgZm9yICR7c3ltYm9sfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7ZGF0YTogZkRhdGEsIHRpbWVzdGFtcH07XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25QcmljZSgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBDcnlwdG9odWJcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuXG4vKipcbiAqXG4gKiBUT1RBTCBWT0wgRlVMTFxuICpcbiAqIE9yaWdpbmFsIERhdGFcbiAqIC0tLS0tLS0tLS0tLS1cbiAqXG4gKiBDb2luSW5mbzoge1xuICogICBJZDogXCI5MjUzMjZcIixcbiAqICAgTmFtZTogXCJQU01cIixcbiAqICAgRnVsbE5hbWU6IFwiUHJhc21cIixcbiAqICAgSW50ZXJuYWw6IFwiUFNNXCIsXG4gKiAgIEltYWdlVXJsOiBcIi9tZWRpYS8zNDQ3ODI0Ni9wcmFzbS5wbmdcIixcbiAqICAgVXJsOiBcIi9jb2lucy9wc20vb3ZlcnZpZXdcIixcbiAqICAgQWxnb3JpdGhtOiBcIk4vQVwiLFxuICogICBQcm9vZlR5cGU6IFwiTi9BXCIsXG4gKiAgIE5ldEhhc2hlc1BlclNlY29uZDogMCxcbiAqICAgQmxvY2tOdW1iZXI6IDAsXG4gKiAgIEJsb2NrVGltZTogMCxcbiAqICAgQmxvY2tSZXdhcmQ6IDAsXG4gKiAgIFR5cGU6IDEsXG4gKiAgIERvY3VtZW50VHlwZTogXCJXZWJwYWdlY29pbnBcIlxuICogfSxcbiAqIFJBVzoge1xuICogICBVU0Q6IHtcbiAqICAgICBUWVBFOiBcIjVcIixcbiAqICAgICBNQVJLRVQ6IFwiQ0NDQUdHXCIsXG4gKiAgICAgRlJPTVNZTUJPTDogXCJQU01cIixcbiAqICAgICBUT1NZTUJPTDogXCJVU0RcIixcbiAqICAgICBGTEFHUzogXCIyXCIsXG4gKiAgICAgUFJJQ0U6IDAuMDAwNTIzNzEsXG4gKiAgICAgTEFTVFVQREFURTogMTU0ODQwNzc3NSxcbiAqICAgICBMQVNUVk9MVU1FOiAwLFxuICogICAgIExBU1RWT0xVTUVUTzogMCxcbiAqICAgICBMQVNUVFJBREVJRDogMCxcbiAqICAgICBWT0xVTUVEQVk6IDAsXG4gKiAgICAgVk9MVU1FREFZVE86IDAsXG4gKiAgICAgVk9MVU1FMjRIT1VSOiAwLFxuICogICAgIFZPTFVNRTI0SE9VUlRPOiAwLFxuICogICAgIE9QRU5EQVk6IDAuMDAwNzg2NzI4Nzk5OTk5OTk5OSxcbiAqICAgICBISUdIREFZOiAwLjAwMDc4NjcyODc5OTk5OTk5OTksXG4gKiAgICAgTE9XREFZOiAwLjAwMDUyMzcxLFxuICogICAgIE9QRU4yNEhPVVI6IDAuMDAwNTIzNzEsXG4gKiAgICAgSElHSDI0SE9VUjogMC4wMDA1MjM3MSxcbiAqICAgICBMT1cyNEhPVVI6IDAuMDAwNTIzNzEsXG4gKiAgICAgTEFTVE1BUktFVDogXCJJREFYXCIsXG4gKiAgICAgVk9MVU1FSE9VUjogMCxcbiAqICAgICBWT0xVTUVIT1VSVE86IDAsXG4gKiAgICAgT1BFTkhPVVI6IDAuMDAwNTIzNzEsXG4gKiAgICAgSElHSEhPVVI6IDAuMDAwNTIzNzEsXG4gKiAgICAgTE9XSE9VUjogMC4wMDA1MjM3MSxcbiAqICAgICBDSEFOR0UyNEhPVVI6IDAsXG4gKiAgICAgQ0hBTkdFUENUMjRIT1VSOiAwLFxuICogICAgIENIQU5HRURBWTogLTAuMDAwMjYzMDE4Nzk5OTk5OTk5OSxcbiAqICAgICBDSEFOR0VQQ1REQVk6IC0zMy40MzE5NTI2NjI3MjE4OCxcbiAqICAgICBTVVBQTFk6IDQwMDAwMDAwMDAsXG4gKiAgICAgTUtUQ0FQOiAyMDk0ODQwLjAwMDAwMDAwMDIsXG4gKiAgICAgVE9UQUxWT0xVTUUyNEg6IDQ0NCxcbiAqICAgICBUT1RBTFZPTFVNRTI0SFRPOiAwLjIzMjUyNzI0MDAwMDAwMDAyLFxuICogICAgIElNQUdFVVJMOiBcIi9tZWRpYS8zNDQ3ODI0Ni9wcmFzbS5wbmdcIlxuICogICB9XG4gKiB9XG4gKlxuICogUHJlZml4IGZpZWxkcyB3aXRoIFwiY2MtdG90YWwtdm9sLWZ1bGwtXCJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFBSSUNFIC0+IGNjLXRvdGFsLXZvbC1mdWxsLUltYWdlVXJsXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcHJpY2UgaXMgYW4gYXJyYXkgb2YgdGhlIHJlc3BvbnNlcyBvZiBiYXRjaGVkIGNyeXB0b2NvbXBhcmUgYXBpIHByaWNlIGRhdGFcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aW1lc3RhbXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBib290c3RyYXBEYXRhXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsKHByaWNlLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERhdGEpIHtcbiAgdHJ5IHtcblxuICAgIGNvbnN0IHByZWZpeCA9ICdjYy10b3RhbC12b2wtZnVsbC0nO1xuXG4gICAgbGV0IGZEYXRhID0ge307XG4gICAgbGV0IGlkeDtcbiAgICBsZXQgZGF0YUl0ZW07XG4gICAgbGV0IFJBVztcbiAgICBsZXQgY29pbkluZm87XG5cbiAgICBmb3IgKFtpZHgsIGRhdGFJdGVtXSBvZiBPYmplY3QuZW50cmllcyhwcmljZS5EYXRhKSkge1xuXG4gICAgICB0cnkge1xuICAgICAgICBSQVcgPSBwcmljZS5EYXRhW2lkeF0uUkFXLlVTRDtcbiAgICAgICAgY29pbkluZm8gPSBwcmljZS5EYXRhW2lkeF0uQ29pbkluZm87XG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvblRvdGFsVm9sRnVsbCgpOiBpZHg6JHtpZHh9LCAke2Vycm9yfWApO1xuICAgICAgfVxuXG4gICAgICBsZXQga2V5O1xuICAgICAgbGV0IHZhbDtcbiAgICAgIGNvbnN0IGlkID0gY29pbkluZm8uSWQ7XG5cbiAgICAgIGZEYXRhW2lkXSA9IHt9O1xuXG4gICAgICBmb3IgKFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoUkFXKSkge1xuICAgICAgICBmRGF0YVtpZF1bYCR7cHJlZml4fSR7a2V5fS10aW1lc3RhbXBgXSA9IHRpbWVzdGFtcDtcbiAgICAgICAgZkRhdGFbaWRdW2Ake3ByZWZpeH0ke2tleX1gXSA9IHZhbDtcbiAgICAgIH1cblxuICAgICAgZm9yIChba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGNvaW5JbmZvKSkge1xuICAgICAgICBmRGF0YVtpZF1bYCR7cHJlZml4fSR7a2V5fS10aW1lc3RhbXBgXSA9IHRpbWVzdGFtcDtcbiAgICAgICAgZkRhdGFbaWRdW2Ake3ByZWZpeH0ke2tleX1gXSA9IHZhbDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiB7ZGF0YTogZkRhdGEsIHRpbWVzdGFtcH07XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Ub3RhbFZvbEZ1bGwoKTogJHtlcnJvcn1gO1xuICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICByZXR1cm4ge21lc3NhZ2UsIGVycm9yOiB0cnVlfTtcbiAgfVxufVxuIiwiLy8gQ3J5cHRvaHViXG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuLi9sb2dnZXInKTtcblxuaW1wb3J0IHsgb2JqZWN0R2V0TmVzdGVkUHJvcGVydHkgYXMgZ25wIH0gIGZyb20gJ2JvLXV0aWxzJztcblxuLyoqXG4gKlxuICogTUVUUklDU1xuICpcbiAqIE9yaWdpbmFsIERhdGFcbiAqIC0tLS0tLS0tLS0tLS1cbiAqXG4gKiB7XG4gKiAgIFwic3RhdHVzXCI6IHtcbiAqICAgICBcImVsYXBzZWRcIjogXCIwXCIsXG4gKiAgICAgXCJ0aW1lc3RhbXBcIjogXCIyMDE5LTA0LTExVDEwOjE5OjQ3LjYzNDUzMjY5NVpcIlxuICogICB9LFxuICogICBcImRhdGFcIjoge1xuICogICAgIFwiaWRcIjogXCIxZTMxMjE4YVwiLFxuICogICAgIFwic3ltYm9sXCI6IFwiYnRjXCIsXG4gKiAgICAgXCJuYW1lXCI6IFwiQml0Y29pblwiLFxuICogICAgIFwibWFya2V0X2RhdGFcIjoge1xuICogICAgICAgXCJwcmljZV91c2RcIjogNTA5MS4wOTg5MTc3NjMxNTMsXG4gKiAgICAgICBcInByaWNlX2J0Y1wiOiAxLFxuICogICAgICAgXCJ2b2x1bWVfbGFzdF8yNF9ob3Vyc1wiOiAxNjM5OTMyMDY0NCxcbiAqICAgICAgIFwicmVhbF92b2x1bWVfbGFzdF8yNF9ob3Vyc1wiOiA4Mjg5NDM5MDYuNDgxOTQ5MSxcbiAqICAgICAgIFwidm9sdW1lX2xhc3RfMjRfaG91cnNfb3ZlcnN0YXRlbWVudF9tdWx0aXBsZVwiOiAxOS43ODMzOTAwNjUwNzU2NixcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfdXNkX2xhc3RfMjRfaG91cnNcIjogLTEuNDM3ODgwMjk4NzQ4MzA3MyxcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfMjRfaG91cnNcIjogMFxuICogICAgIH0sXG4gKiAgICAgXCJtYXJrZXRjYXBcIjoge1xuICogICAgICAgXCJjdXJyZW50X21hcmtldGNhcF91c2RcIjogODk4MDUwMDk1NjIuOTYxOTMsXG4gKiAgICAgICBcInlfMjA1MF9tYXJrZXRjYXBfdXNkXCI6IDEwODU3NTQ5NzU4NC42MTE3NCxcbiAqICAgICAgIFwieV9wbHVzMTBfbWFya2V0Y2FwX3VzZFwiOiAxMDU3NjczOTI2MzguMDYzNjcsXG4gKiAgICAgICBcImxpcXVpZF9tYXJrZXRjYXBfdXNkXCI6IDkxMjYzNTc0MDE2LjkxNzksXG4gKiAgICAgICBcInZvbHVtZV90dXJub3Zlcl9sYXN0XzI0X2hvdXJzX3BlcmNlbnRcIjogMC45MDgyOTY1NjM0NTUwODA2XG4gKiAgICAgfSxcbiAqICAgICBcInN1cHBseVwiOiB7XG4gKiAgICAgICBcInlfMjA1MFwiOiAyMDk4MzQ5NS4zOTg0Mzc1LFxuICogICAgICAgXCJ5X3BsdXMxMFwiOiAyMDQ0MDc5NixcbiAqICAgICAgIFwibGlxdWlkXCI6IDE3NjM3NzYyLFxuICogICAgICAgXCJjaXJjdWxhdGluZ1wiOiAxNzYzOTYxMixcbiAqICAgICAgIFwieV8yMDUwX2lzc3VlZF9wZXJjZW50XCI6IDg0LjA2NDIyMTI2MDgzNjc2LFxuICogICAgICAgXCJhbm51YWxfaW5mbGF0aW9uX3BlcmNlbnRcIjogMy44Mzg2Mzg5Mzg0MzIyMTE1LFxuICogICAgICAgXCJ5X3BsdXMxMF9pc3N1ZWRfcGVyY2VudFwiOiA4Ni4yOTYxMTA5NzMzNjkxNFxuICogICAgIH0sXG4gKiAgICAgXCJibG9ja2NoYWluX3N0YXRzXzI0X2hvdXJzXCI6IHtcbiAqICAgICAgIFwidHJhbnNhY3Rpb25fdm9sdW1lXCI6IDM0MjM3MTk2OTkuMjkyODgzNCxcbiAqICAgICAgIFwiYWRqdXN0ZWRfdHJhbnNhY3Rpb25fdm9sdW1lXCI6IDE1NzI4NDY0MjYuODA2NjA3MixcbiAqICAgICAgIFwibnZ0XCI6IDI3LjM5NTg4OTA0NTY5MTg1MixcbiAqICAgICAgIFwiYWRqdXN0ZWRfbnZ0XCI6IDYwLjYxNjA3ODEzNzk2NjM4LFxuICogICAgICAgXCJzdW1fb2ZfZmVlc1wiOiAxNTAxNzcuNzk1MDM4Mjc3LFxuICogICAgICAgXCJtZWRpYW5fdHhfdmFsdWVcIjogMTY0LjAwNzE2ODQ0NzAwMDAzLFxuICogICAgICAgXCJtZWRpYW5fdHhfZmVlXCI6IDAuMjM5ODMwMTI0NDYxNjAzNzMsXG4gKiAgICAgICBcImNvdW50X29mX2FjdGl2ZV9hZGRyZXNzZXNcIjogNzA2NzU0LFxuICogICAgICAgXCJjb3VudF9vZl90eFwiOiAyODU1NjcsXG4gKiAgICAgICBcImNvdW50X29mX3BheW1lbnRzXCI6IDQyMzMxNSxcbiAqICAgICAgIFwibmV3X2lzc3VhbmNlXCI6IDk2MzcxODYuNzcwNDM2NjExLFxuICogICAgICAgXCJhdmVyYWdlX2RpZmZpY3VsdHlcIjogNjA3MTg0NjA0OTkyMC43NSxcbiAqICAgICAgIFwia2lsb2J5dGVzX2FkZGVkXCI6IDE1MzQ0My45NTIsXG4gKiAgICAgICBcImNvdW50X29mX2Jsb2Nrc19hZGRlZFwiOiAxNDlcbiAqICAgICB9LFxuICogICAgIFwiYWxsX3RpbWVfaGlnaFwiOiB7XG4gKiAgICAgICBcInByaWNlXCI6IDIwMDg5LFxuICogICAgICAgXCJhdFwiOiBcIjIwMTctMTItMTdcIixcbiAqICAgICAgIFwiZGF5c19zaW5jZVwiOiA0NzksXG4gKiAgICAgICBcInBlcmNlbnRfZG93blwiOiA3NC4yNDI5NzY0MTgxOTY0NSxcbiAqICAgICAgIFwiYnJlYWtldmVuX211bHRpcGxlXCI6IDMuODgyNDM2MTcwNTYxNTE0XG4gKiAgICAgfSxcbiAqICAgICBcImN5Y2xlX2xvd1wiOiB7XG4gKiAgICAgICBcInByaWNlXCI6IDMxMjYuNjc5OTkzNjM2MjU4LFxuICogICAgICAgXCJhdFwiOiBcIjIwMTgtMTItMTVcIixcbiAqICAgICAgIFwicGVyY2VudF91cFwiOiA2NS40ODk1NDQxMTMyMzk3LFxuICogICAgICAgXCJkYXlzX3NpbmNlXCI6IDExNlxuICogICAgIH0sXG4gKiAgICAgXCJ0b2tlbl9zYWxlX3N0YXRzXCI6IHtcbiAqICAgICAgIFwic2FsZV9wcm9jZWVkc191c2RcIjogbnVsbCxcbiAqICAgICAgIFwic2FsZV9zdGFydF9kYXRlXCI6IG51bGwsXG4gKiAgICAgICBcInNhbGVfZW5kX2RhdGVcIjogbnVsbCxcbiAqICAgICAgIFwicm9pX3NpbmNlX3NhbGVfdXNkX3BlcmNlbnRcIjogbnVsbCxcbiAqICAgICAgIFwicm9pX3NpbmNlX3NhbGVfYnRjX3BlcmNlbnRcIjogbnVsbCxcbiAqICAgICAgIFwicm9pX3NpbmNlX3NhbGVfZXRoX3BlcmNlbnRcIjogbnVsbFxuICogICAgIH0sXG4gKiAgICAgXCJzdGFraW5nX3N0YXRzXCI6IHtcbiAqICAgICAgIFwic3Rha2luZ195aWVsZF9wZXJjZW50XCI6IG51bGwsXG4gKiAgICAgICBcInN0YWtpbmdfdHlwZVwiOiBudWxsLFxuICogICAgICAgXCJzdGFraW5nX21pbmltdW1cIjogbnVsbCxcbiAqICAgICAgIFwidG9rZW5zX3N0YWtlZFwiOiBudWxsLFxuICogICAgICAgXCJ0b2tlbnNfc3Rha2VkX3BlcmNlbnRcIjogMCxcbiAqICAgICAgIFwicmVhbF9zdGFraW5nX3lpZWxkX3BlcmNlbnRcIjogbnVsbFxuICogICAgIH0sXG4gKiAgICAgXCJtaW5pbmdfc3RhdHNcIjoge1xuICogICAgICAgXCJtaW5pbmdfYWxnb1wiOiBcIlNIQS0yNTZcIixcbiAqICAgICAgIFwibmV0d29ya19oYXNoX3JhdGVcIjogXCI1MSwxMTcgUEgvc1wiLFxuICogICAgICAgXCJhdmFpbGFibGVfb25fbmljZWhhc2hfcGVyY2VudFwiOiAwLjAwMDY4ODg0NTcxNjYxNDI3ODQsXG4gKiAgICAgICBcIjFfaG91cl9hdHRhY2tfY29zdFwiOiA0MjkzMjkuNjM4NjM1MzcxNSxcbiAqICAgICAgIFwiMjRfaG91cnNfYXR0YWNrX2Nvc3RcIjogMTAzMDM5MTEuMzI3MjQ4OTE2LFxuICogICAgICAgXCJhdHRhY2tfYXBwZWFsXCI6IDg4NTguMTA2NzU0Mzk0MTk1XG4gKiAgICAgfSxcbiAqICAgICBcImRldmVsb3Blcl9hY3Rpdml0eVwiOiB7XG4gKiAgICAgICBcInN0YXJzXCI6IDM3Nzc4LFxuICogICAgICAgXCJ3YXRjaGVyc1wiOiAzNTI1LFxuICogICAgICAgXCJjb21taXRzX2xhc3RfM19tb250aHNcIjogMzYxLFxuICogICAgICAgXCJjb21taXRzX2xhc3RfMV95ZWFyXCI6IDE4MjUsXG4gKiAgICAgICBcImxpbmVzX2FkZGVkX2xhc3RfM19tb250aHNcIjogMjM1NTYsXG4gKiAgICAgICBcImxpbmVzX2FkZGVkX2xhc3RfMV95ZWFyXCI6IDk4ODAzLFxuICogICAgICAgXCJsaW5lc19kZWxldGVkX2xhc3RfM19tb250aHNcIjogODcwMSxcbiAqICAgICAgIFwibGluZXNfZGVsZXRlZF9sYXN0XzFfeWVhclwiOiA3MTk0MFxuICogICAgIH0sXG4gKiAgICAgXCJyb2lfZGF0YVwiOiB7XG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2xhc3RfMV93ZWVrXCI6IDQuMDY4ODAwODA4MTQ5NDc4LFxuICogICAgICAgXCJwZXJjZW50X2NoYW5nZV9sYXN0XzFfbW9udGhcIjogMzQuNDgwNjU5MzkxMTc4ODYsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2xhc3RfM19tb250aHNcIjogNDIuMjgwMDE5MzcwOTMyMDMsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2xhc3RfMV95ZWFyXCI6IC0yNC44MjI1MTQ5OTcyNzMxNjQsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2J0Y19sYXN0XzFfd2Vla1wiOiAwLFxuICogICAgICAgXCJwZXJjZW50X2NoYW5nZV9idGNfbGFzdF8xX21vbnRoXCI6IDAsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2J0Y19sYXN0XzNfbW9udGhzXCI6IDAsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2J0Y19sYXN0XzFfeWVhclwiOiAwLFxuICogICAgICAgXCJwZXJjZW50X2NoYW5nZV9tb250aF90b19kYXRlXCI6IDI1LjM0Mzk5MzU3Mjc0OTg5LFxuICogICAgICAgXCJwZXJjZW50X2NoYW5nZV9xdWFydGVyX3RvX2RhdGVcIjogMjUuMzQzOTkzNTcyNzQ5ODksXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX3llYXJfdG9fZGF0ZVwiOiAzOS44Mzc5NzQ3MzE2MDMzXG4gKiAgICAgfSxcbiAqICAgICBcInJvaV9ieV95ZWFyXCI6IHtcbiAqICAgICAgIFwiMjAxOF91c2RfcGVyY2VudFwiOiAtNzIuNTA5MjMyNzY1OTU5MzcsXG4gKiAgICAgICBcIjIwMTdfdXNkX3BlcmNlbnRcIjogMTYxMC43NjkwNTE5ODgzNTk3LFxuICogICAgICAgXCIyMDE2X3VzZF9wZXJjZW50XCI6IDg5Ljc2NjcsXG4gKiAgICAgICBcIjIwMTVfdXNkX3BlcmNlbnRcIjogMzUuNDQsXG4gKiAgICAgICBcIjIwMTRfdXNkX3BlcmNlbnRcIjogLTU3LjcxOCxcbiAqICAgICAgIFwiMjAxM191c2RfcGVyY2VudFwiOiA1MzYwLjY3NCxcbiAqICAgICAgIFwiMjAxMl91c2RfcGVyY2VudFwiOiAxNzQuODk3OSxcbiAqICAgICAgIFwiMjAxMV91c2RfcGVyY2VudFwiOiAxNDIwLjI3MDI3XG4gKiAgICAgfSxcbiAqICAgICBcInJpc2tfbWV0cmljc1wiOiB7XG4gKiAgICAgICBcInNoYXJwZV9yYXRpb3NcIjoge1xuICogICAgICAgICBcImxhc3RfMzBfZGF5c1wiOiA3LjIzOTE4NjE1NDMzNzEsXG4gKiAgICAgICAgIFwibGFzdF85MF9kYXlzXCI6IDMuODU5MDA5NTMwOTI1MDg3LFxuICogICAgICAgICBcImxhc3RfMV95ZWFyXCI6IC0wLjQ0Mjc3NDIwNTAyMTk1ODg2LFxuICogICAgICAgICBcImxhc3RfM195ZWFyc1wiOiAxLjQ1OTIxMTk0MTQ1MTUxMjNcbiAqICAgICAgIH1cbiAqICAgICB9LFxuICogICAgIFwibWlzY19kYXRhXCI6IHtcbiAqICAgICAgIFwidmxhZGltaXJfY2x1Yl9jb3N0XCI6IDEwODU3NTQ5Ljc1ODQ2MTE3NSxcbiAqICAgICAgIFwiYnRjX2N1cnJlbnRfbm9ybWFsaXplZF9zdXBwbHlfcHJpY2VfdXNkXCI6IDUxNzQuMzI4NDY3MzQ4NTE2LFxuICogICAgICAgXCJidGNfeTIwNTBfbm9ybWFsaXplZF9zdXBwbHlfcHJpY2VfdXNkXCI6IDUxNzQuMzI4NDY3MzQ4NTE2LFxuICogICAgICAgXCJhc3NldF9jcmVhdGVkX2F0XCI6IFwiMjAwOS0wMS0wM1wiLFxuICogICAgICAgXCJhc3NldF9hZ2VfZGF5c1wiOiAzNzQ5LFxuICogICAgICAgXCJjYXRlZ29yaWVzXCI6IFtcbiAqICAgICAgICAgXCJDdXJyZW5jeVwiXG4gKiAgICAgICBdLFxuICogICAgICAgXCJzZWN0b3JzXCI6IFtcbiAqICAgICAgICAgXCJDdXJyZW5jeVwiXG4gKiAgICAgICBdXG4gKiAgICAgfVxuICogICB9XG4gKiB9XG4gKlxuICogUHJlZml4IGZpZWxkcyB3aXRoIFwibS1tZXRyaWNzLVwiXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBtaXNjX2RhdGEuc2VjdG9ycyAtPiBtLW1ldHJpY3Mtc2VjdG9yc1xuICpcbiAqIE5PVEU6XG4gKiAgIFdlIG5lZWQgYSBtYXN0ZXIgZmllbGQgbGlzdCBhbmQgd2UganVzdCBtYXAgc3R1ZmYgZnJvbSB0aGVyZS5cbiAqICAgSGF2ZSBhIHRoaW5rIGFib3V0IGl0IHlvXG4gKlxuICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIHJlc3BvbnNlIGZyb20gTWVzc2FyaSBhcGkgcmVxdWVzdFxuICogQHBhcmFtIHtTdHJpbmd9IHRpbWVzdGFtcFxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGFcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdHRlck1lc3NhcmlTZWN0aW9uTWV0cmljcyhkYXRhLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERhdGEsIGFwcEJvb3RzdHJhcERhdGEsIGZpbGVOYW1lLCBldmVudCwgY2FjaGUpIHtcblxuICB0cnkge1xuXG4gICAgZnVuY3Rpb24gZGF0YUlzVmFsaWQoZGF0YSkge1xuICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuc3ltYm9sKSByZXR1cm4gdHJ1ZVxuICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhSXNWYWxpZChkYXRhKSkgcmV0dXJuO1xuICAgIGRhdGEgPSBkYXRhLmRhdGE7XG5cbiAgICBjb25zdCBzeW1ib2wgPSBkYXRhLnN5bWJvbC50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IHNlY3RvcnMgPSBnbnAoZGF0YSwgJ21pc2NfZGF0YS5zZWN0b3JzJyk7XG4gICAgY29uc3QgaWQgPSBhcHBCb290c3RyYXBEYXRhLnN5bWJvbElkTWFwW3N5bWJvbF07IC8vIFRPRE86IG5lZWQgcHJvcGVyIG1hcHBpbmcgZm9yIGlkc1xuXG4gICAgY29uc3Qgb3V0cHV0ID0ge1xuICAgICAgW2lkXToge1xuICAgICAgICAnbS1tZXRyaWNzLXNlY3RvcnMnICAgICAgICAgICAgICAgICAgICAgICAgIDogZ25wKGRhdGEsICdtaXNjX2RhdGEuc2VjdG9ycycpLFxuICAgICAgICAnbS1tZXRyaWNzLWNhdGVnb3JpZXMnICAgICAgICAgICAgICAgICAgICAgIDogZ25wKGRhdGEsICdtaXNjX2RhdGEuY2F0ZWdvcmllcycpLFxuICAgICAgICAnbS1tZXRyaWNzLWRhdGUtY3JlYXRlZCcgICAgICAgICAgICAgICAgICAgIDogZ25wKGRhdGEsICdtaXNjX2RhdGEuYXNzZXRfY3JlYXRlZF9hdCcpLFxuICAgICAgICAnbS1tZXRyaWNzLWF0aC1wcmljZScgICAgICAgICAgICAgICAgICAgICAgIDogZ25wKGRhdGEsICdhbGxfdGltZV9oaWdoLnByaWNlJyksXG4gICAgICAgICdtLW1ldHJpY3MtYXRoLWRhdGUnICAgICAgICAgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ2FsbF90aW1lX2hpZ2guYXQnKSxcbiAgICAgICAgJ20tbWV0cmljcy1hdGgtZGF5cycgICAgICAgICAgICAgICAgICAgICAgICA6IGducChkYXRhLCAnYWxsX3RpbWVfaGlnaC5kYXlzX3NpbmNlJyksXG4gICAgICAgICdtLW1ldHJpY3MtYXRoLXBlcmNlbnQtZG93bicgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ2FsbF90aW1lX2hpZ2gucGVyY2VudF9kb3duJyksXG4gICAgICAgICdtLW1ldHJpY3MtYXRoLWJyZWFrZXZlbi1tdWx0aXBsZScgICAgICAgICAgOiBnbnAoZGF0YSwgJ2FsbF90aW1lX2hpZ2guYnJlYWtldmVuX211bHRpcGxlJyksXG4gICAgICAgICdtLW1ldHJpY3MtY3ljbGUtbG93LXByaWNlJyAgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ2N5Y2xlX2xvdy5wcmljZScpLFxuICAgICAgICAnbS1tZXRyaWNzLWN5Y2xlLWxvdy1kYXRlJyAgICAgICAgICAgICAgICAgIDogZ25wKGRhdGEsICdjeWNsZV9sb3cuYXQnKSxcbiAgICAgICAgJ20tbWV0cmljcy1jeWNsZS1sb3ctcGVyY2VudC11cCcgICAgICAgICAgICA6IGducChkYXRhLCAnY3ljbGVfbG93LnBlcmNlbnRfdXAnKSxcbiAgICAgICAgJ20tbWV0cmljcy1jeWNsZS1sb3ctZGF5cy1zaW5jZScgICAgICAgICAgICA6IGducChkYXRhLCAnY3ljbGVfbG93LmRheXNfc2luY2UnKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1sYXN0LTEtd2VlaycgICAgICA6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfbGFzdF8xX3dlZWsnKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1sYXN0LTEtbW9udGgnICAgICA6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfbGFzdF8xX21vbnRoJyksXG4gICAgICAgICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtbGFzdC0zLW1vbnRocyAgICAnOiBnbnAoZGF0YSwgJ3JvaV9kYXRhLnBlcmNlbnRfY2hhbmdlX2xhc3RfM19tb250aHMnKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1sYXN0LTEteWVhcicgICAgICA6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfbGFzdF8xX3llYXInKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1idGMtbGFzdC0xLXdlZWsnICA6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfMV93ZWVrJyksXG4gICAgICAgICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtYnRjLWxhc3QtMS1tb250aCcgOiBnbnAoZGF0YSwgJ3JvaV9kYXRhLnBlcmNlbnRfY2hhbmdlX2J0Y19sYXN0XzFfbW9udGgnKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1idGMtbGFzdC0zLW1vbnRocyc6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfM19tb250aHMnKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1idGMtbGFzdC0xLXllYXInICA6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfMV95ZWFyJyksXG4gICAgICAgICdtLW1ldHJpY3MtYXRoLXByaWNlLXRpbWVzdGFtcCcgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ2FsbF90aW1lX2hpZ2guYXQnKSxcbiAgICAgICAgJ20tbWV0cmljcy1jeWNsZS1sb3ctcHJpY2UtdGltZXN0YW1wJyAgICAgICA6IGducChkYXRhLCAnY3ljbGVfbG93LmF0JyksXG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBpdGVtO1xuICAgIGxldCBwcm9wO1xuICAgIGZvciAoaXRlbSBvZiBPYmplY3QudmFsdWVzKG91dHB1dCkpIHtcbiAgICAgIGZvciAocHJvcCBvZiBPYmplY3Qua2V5cyhpdGVtKSkge1xuICAgICAgICBpdGVtW2Ake3Byb3B9LXRpbWVzdGFtcGBdID0gdGltZXN0YW1wO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7ZGF0YTogb3V0cHV0LCB0aW1lc3RhbXB9O1xuXG4gIH1cblxuICBjYXRjaChlcnJvcikge1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IGBmb3JtYXR0ZXJNZXNzYXJpTWV0cmljcygpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuXG4gIH1cblxufVxuIiwiLyoqXG4gKlxuICogVVNEIEN1cnJlbmN5IFRhYmxlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5cbi8vXG4vLyBOT1RFOiBNQUtFIFRISVMgQSBGT1JNQVRURVIgYW5kIHB1dCBpdCBvbiBib290c3RyYXBEYXRhXG4vL1xuXG4vLyBMaWJzXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuXG4vLyBDcnlwdG9IdWJcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuY29uc3Qgc2V0dGluZ3MgPSByZXF1aXJlKCcuLi9zZXR0aW5ncycpO1xuXG4vL1xuLy8gWGVcbi8vXG4vLyBDdXJyZW5jeSBjb252ZXJzaW9uIGRhdGEgZm9yIFVTRFxuLy9cbi8vICBVU0Q6IHtuYW1lOiBcIlVTIERvbGxhclwiLCB1bml0c1BlclVTRFwiOiAxLjAwMDAwMDAwMDBcIiwgVVNEUGVyVW5pdHM6IFwiMS4wMDAwMDAwMDAwXCJ9LFxuLy8gIEVVUjoge25hbWU6IFwiRXVyb1wiLCAgICAgIHVuaXRzUGVyVVNEOiBcIjAuODU3Njc4NDM5MFwiLCBVU0RQZXJVbml0czogXCIxLjE2NTkzODEzNTVcIn1cbi8vXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdHRlclhlU2VjdGlvbkN1cnJlbmN5KHJlc3BvbnNlLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERhdGEsIGFwcEJvb3RzdHJhcERhdGEpIHtcbiAgdHJ5IHtcblxuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKHJlc3BvbnNlKTtcbiAgICBjb25zdCB0cnMgPSAkKCcjaGlzdG9yaWNhbFJhdGVUYmwgdGJvZHkgdHInKS50b0FycmF5KCk7XG4gICAgZm9yIChjb25zdCB0ciBvZiB0cnMpIHtcbiAgICAgIGNvbnN0IHRkcyA9ICQodHIpLmZpbmQoJ3RkJykudG9BcnJheSgpO1xuICAgICAgY29uc3QgY29kZSA9ICQodGRzWzBdKS50ZXh0KCk7XG4gICAgICBjb25zdCBuYW1lID0gJCh0ZHNbMV0pLnRleHQoKTtcbiAgICAgIGNvbnN0IHVuaXRzUGVyVVNEID0gJCh0ZHNbMl0pLnRleHQoKTtcbiAgICAgIGNvbnN0IFVTRFBlclVuaXRzID0gJCh0ZHNbM10pLnRleHQoKTtcbiAgICAgIGRhdGFbY29kZV0gPSB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHVuaXRzUGVyVVNELFxuICAgICAgICBVU0RQZXJVbml0c1xuICAgICAgfVxuICAgIH1cbiAgICBhcHBCb290c3RyYXBEYXRhLmN1cnJlbmN5ID0gZGF0YTtcbiAgICByZXR1cm4ge2RhdGEsIHRpbWVzdGFtcH07XG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYGZvcm1hdHRlclhlU2VjdGlvbkN1cnJlbmN5KCk6ICR7ZXJyb3J9YDtcbiAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgcmV0dXJuIHttZXNzYWdlLCBlcnJvcjogdHJ1ZX07XG4gIH1cbn1cbiIsIi8vIE5vZGVcbmNvbnN0IGNyeXB0byAgID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cbi8vIENyeXB0b2h1YlxuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5jb25zdCBzZXR0aW5ncyA9IHJlcXVpcmUoJy4uL3NldHRpbmdzJyk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHF1ZXVlXG4gKiBAcGFyYW0ge09iamVjdH0gYm9vdHN0cmFwRGF0YVxuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBnZXRKb2JzQ3J5cHRvY29tcGFyZVNlY3Rpb25QcmljZShxdWV1ZSwgYm9vdHN0cmFwRGF0YSwgYXBwQm9vdHN0cmFwRGF0YSkge1xuICB0cnkge1xuXG4gICAgIGxldCBhcnIxID0gW107XG4gICAgIGxldCBhcnIyID0gWydVU0QnXTtcbiAgICAgbGV0IGFycjFTdHJMZW4gPSAwO1xuICAgICBsZXQgc3ltYm9sMTtcbiAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAvLyBMb3dlcmluZyBieSAxMCBzbyB3ZSBkb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IFwiY2FuIHdlIGFkZCBhbm90aGVyIGluIHRoZSByZW1haW5pbmcgc3BhY2VcIiBpc3N1ZSwgY29tZSBiYWNrIGFuZCBkbyBpdCByaWdodCBsYXRlcnpcbiAgICAgY29uc3QgYXJyMU1heExlbmd0aCA9IHNldHRpbmdzLmxpbWl0c0NyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb011bHRpQXJyMSAtIDEwO1xuICAgICBjb25zdCBhcnIyTWF4TGVuZ3RoID0gc2V0dGluZ3MubGltaXRzQ3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGlBcnIyO1xuICAgICBjb25zdCBncm91cEtleSA9IHNldHRpbmdzLnRhZ0tleUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb011bHRpR3JvdXBlZGAke3t9fWA7XG4gICAgIGlmIChhcnIyLmpvaW4oKS5sZW5ndGggPiBhcnIyTWF4TGVuZ3RoKSB7XG4gICAgICAgdGhyb3cgbmV3IEVycm9yKGBzY3JhcGVDcnlwdG9jb21wYXJlKCk6IFRoZSBpdGVtcyBpbiB0aGUgYXJyMiBhcnJheSBuZWVkIHRvIGJlIHNtYWxsZXIgdGhhbiAke2FycjJNYXhMZW5ndGh9IGluIHRvdGFsIGxlbmd0aGApO1xuICAgICB9XG4gICAgIGxldCBqb2JzID0gMDtcblxuICAgICAvLyBmaWx0ZXIgZmlyc3QgeCBieSBzb3J0T3JkZXJcbiAgICAgY29uc3QgbGltaXQgPSBzZXR0aW5ncy5tYXhSZWNvcmRzU2NyYXBlZDtcbiAgICAgbGV0IGl0ZW1zID0gW107XG4gICAgIGxldCBvcmRlcjtcbiAgICAgZm9yIChsZXQgaXRlbSBvZiBPYmplY3QudmFsdWVzKGJvb3RzdHJhcERhdGEuY29pbkxpc3QpKSB7XG4gICAgICAgb3JkZXIgPSBpdGVtWydTb3J0T3JkZXInXTtcbiAgICAgICBpZiAob3JkZXIgPCBsaW1pdCkge1xuICAgICAgICAgaXRlbXNbb3JkZXJdID0gaXRlbTtcbiAgICAgICB9XG4gICAgIH1cbiAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoQm9vbGVhbik7XG4gICAgIGNvbnN0IGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcblxuICAgICBmb3IgKGxldCB2IG9mIGl0ZW1zKSB7XG4gICAgICAgY291bnRlcisrO1xuICAgICAgIHN5bWJvbDEgPSB2LlN5bWJvbDtcbiAgICAgICBhcnIxU3RyTGVuICs9IHN5bWJvbDEubGVuZ3RoICsgMTtcbiAgICAgICBsZXQgbGFzdCA9IGNvdW50ZXIgPT09IGxlbmd0aDtcbiAgICAgICBpZiAoYXJyMVN0ckxlbiA8IGFycjFNYXhMZW5ndGgpIGFycjEucHVzaChzeW1ib2wxKTtcbiAgICAgICBpZiAoKGFycjFTdHJMZW4gPiBhcnIxTWF4TGVuZ3RoKSB8fCBsYXN0KSB7XG4gICAgICAgICBjb25zdCBsaXN0MSA9IGFycjEuam9pbigpO1xuICAgICAgICAgY29uc3QgbGlzdDIgPSBhcnIyLmpvaW4oKTtcbiAgICAgICAgIGNvbnN0IG1kNSA9IGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKTtcbiAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gbWQ1LnVwZGF0ZShsaXN0MSArIGxpc3QyKS5kaWdlc3QoJ2hleCcpO1xuICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgY2FjaGVLZXksIGxpc3QxLCBsaXN0MlxuICAgICAgICAgfVxuICAgICAgICAgY29uc3QgdXJpID0gc2V0dGluZ3MudGFnVXJpQ3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGlgJHtkYXRhfWA7XG4gICAgICAgICBjb25zdCBrZXkgPSBzZXR0aW5ncy50YWdLZXlDcnlwdG9jb21wYXJlVHJhZGluZ0luZm9NdWx0aWAke2RhdGF9YDtcblxuICAgICAgICAgcXVldWUucHVzaCh7dXJpLCBrZXk6IGdyb3VwS2V5LCBjYWNoZUZvckRheXM6IHNldHRpbmdzLmNhY2hlRm9yQ3J5cHRvY29tcGFyZX0pO1xuICAgICAgICAgam9icysrO1xuICAgICAgICAgYXJyMSA9IFtdO1xuICAgICAgICAgYXJyMVN0ckxlbiA9IDA7XG5cbiAgICAgICB9XG4gICAgIH1cbiAgICAgbG9nZ2VyLmluZm8oYGdldEpvYnNDcnlwdG9jb21wYXJlU2VjdGlvblByaWNlKCk6ICR7am9ic30gcHJpY2Ugam9icyBjcmVhdGVkYCk7XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZ2V0Sm9ic0NyeXB0b2NvbXBhcmVTZWN0aW9uUHJpY2UoKTogJHtlcnJvcn1gO1xuICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICByZXR1cm4ge21lc3NhZ2UsIGVycm9yOiB0cnVlfTtcbiAgfVxufVxuIiwiLy8gTm9kZVxuY29uc3QgY3J5cHRvICAgPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuLy8gQ3J5cHRvaHViXG5jb25zdCBsb2dnZXIgICA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuY29uc3Qgc2V0dGluZ3MgPSByZXF1aXJlKCcuLi9zZXR0aW5ncycpO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBxdWV1ZVxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGFcbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gZ2V0Sm9ic0NyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsKHF1ZXVlLCBib290c3RyYXBEYXRhKSB7XG4gIHRyeSB7XG5cbiAgICBsZXQgcGFnZSA9IDA7XG4gICAgbGV0IGpvYnMgPSAwO1xuICAgIGNvbnN0IGxpbWl0ID0gMTAwO1xuICAgIGNvbnN0IG1heFBhZ2VzID0gNTtcbiAgICBjb25zdCBncm91cEtleSA9IHNldHRpbmdzLnRhZ0tleUNyeXB0b2NvbXBhcmVUb3RhbFZvbEZ1bGxHcm91cGVkYCR7e319YDtcblxuICAgIHdoaWxlIChwYWdlIDwgbWF4UGFnZXMpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGxpbWl0LCBwYWdlXG4gICAgICB9O1xuICAgICAgY29uc3QgdXJpID0gc2V0dGluZ3MudGFnVXJpQ3J5cHRvY29tcGFyZVRvdGFsVm9sRnVsbGAke2RhdGF9YDtcbiAgICAgIGNvbnN0IGtleSA9IHNldHRpbmdzLnRhZ0tleUNyeXB0b2NvbXBhcmVUb3RhbFZvbEZ1bGxgJHtkYXRhfWA7XG4gICAgICBxdWV1ZS5wdXNoKHt1cmksIGtleTogZ3JvdXBLZXksIGNhY2hlRm9yRGF5czogc2V0dGluZ3MuY2FjaGVGb3JDcnlwdG9jb21wYXJlfSk7XG4gICAgICBqb2JzKys7XG4gICAgICBwYWdlKys7XG4gICAgfVxuXG4gICAgbG9nZ2VyLmluZm8oYGdldEpvYnNDcnlwdG9jb21wYXJlU2VjdGlvblRvdGFsVm9sRnVsbCgpOiAke2pvYnN9IHByaWNlIGpvYnMgY3JlYXRlZGApO1xuXG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYGdldEpvYnNDcnlwdG9jb21wYXJlU2VjdGlvblRvdGFsVm9sRnVsbCgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBDcnlwdG9odWJcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuY29uc3Qgc2V0dGluZ3MgPSByZXF1aXJlKCcuLi9zZXR0aW5ncycpO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBxdWV1ZVxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGFcbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gZ2V0Sm9ic01lc3NhcmlTZWN0aW9uTWV0cmljcyhxdWV1ZSwgYm9vdHN0cmFwRGF0YSwgYXBwQm9vdHN0cmFwRGF0YSkge1xuXG4gIHRyeSB7XG5cbiAgICBpZiAoIWFwcEJvb3RzdHJhcERhdGEuZmlyc3RYU3ltYm9scykge1xuICAgICAgY29uc29sZS5sb2coJ3dhaXRpbmcgZm9yIGJvb3RzdHJhcCBkYXRhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgICBsZXQgc3ltYm9sO1xuICAgICAgbGV0IGpvYnMgPSAwO1xuICAgICAgY29uc3Qgc3ltYm9scyA9IGFwcEJvb3RzdHJhcERhdGEuZmlyc3RYU3ltYm9scztcbiAgICAgIC8vIGNvbnN0IGdyb3VwS2V5ID0gc2V0dGluZ3MudGFnS2V5TWVzc2FyaU1ldHJpY3NHcm91cGVkYCR7e319YDtcblxuICAgICAgZm9yIChzeW1ib2wgb2Ygc3ltYm9scykge1xuICAgICAgICBxdWV1ZS5wdXNoKHtcbiAgICAgICAgICAvLyBncm91cEtleSxcbiAgICAgICAgICB1cmk6IHNldHRpbmdzLnRhZ1VyaU1lc3NhcmlNZXRyaWNzYCR7c3ltYm9sfWAsXG4gICAgICAgICAga2V5OiBzZXR0aW5ncy50YWdLZXlNZXNzYXJpTWV0cmljc2Ake3N5bWJvbH1gLFxuICAgICAgICAgIGNhY2hlRm9yRGF5czogc2V0dGluZ3MuY2FjaGVGb3JNZXNzYXJpLFxuICAgICAgICB9KTtcbiAgICAgICAgam9icysrO1xuICAgICAgfVxuXG4gICAgICBsb2dnZXIuaW5mbyhgZ2V0Sm9ic01lc3NhcmlNZXRyaWNzKCk6ICR7am9ic30gbWV0cmljcyBqb2JzIGNyZWF0ZWRgKTtcblxuICAgIH1cblxuICB9XG4gIGNhdGNoKGVycm9yKSB7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYGdldEpvYnNNZXNzYXJpU2VjdGlvbk1ldHJpY3MoKTogJHtlcnJvcn1gO1xuICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICByZXR1cm4ge21lc3NhZ2UsIGVycm9yOiB0cnVlfTtcblxuICB9XG5cbn1cbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSBjYWNoZUZvclxuICpcbiAqL1xuXG4vLyBMaWJzXG5jb25zdCBycCA9IHJlcXVpcmUoJ3JlcXVlc3QtcHJvbWlzZScpO1xuY29uc3QgeyB0byB9ID0gcmVxdWlyZSgnYXdhaXQtdG8tanMnKTtcbmNvbnN0IGxvZ2dlciAgID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gc2NyYXBlSlNPTih1cmksIGtleSwgY2FjaGVGb3IsIGNhY2hlKSB7XG4gIHRyeSB7XG4gICAgbGV0IGVycm9yO1xuICAgIGxldCBbZmlsZSwgYWdlXSA9IGNhY2hlLmdldChrZXkpO1xuICAgIGlmICghZmlsZSB8fCBhZ2UgPiBjYWNoZUZvcikge1xuICAgICAgW2Vycm9yLCBmaWxlXSA9IGF3YWl0IHRvKHJwKHt1cmksIGpzb246IHRydWV9KSk7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICBjYWNoZS5zZXQoa2V5LCBKU09OLnN0cmluZ2lmeShmaWxlKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZmlsZSA9IEpTT04ucGFyc2UoZmlsZSk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlO1xuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBzY3JhcGUtanNvbi5qczogRmFpbGVkIHRvIHNjcmFwZSAke3VyaX1gKTtcbiAgICByZXR1cm4ge2Vycm9yOiB0cnVlLCBtZXNzYWdlOiBgc2NyYXBlSlNPTigpOiAke2Vycm9yfWB9O1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEJpbmFyeSBPdmVyZG9zZSBQcm9qZWN0c1xuaW1wb3J0IERhdGFUYWJsZSBmcm9tICdiby1kYXRhdGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdG9yZU9uQmVmb3JlRW1pdChvcHRpb25zLCBuZXdEYXRhLCBvbGREYXRhKSB7XG5cbiAgY29uc3QgdHlwZSA9IG9wdGlvbnMuZGlmZiAhPT0gZmFsc2UgPyAnY2hhbmdlc2V0JyA6ICdmdWxsJztcbiAgbGV0IGRhdGEgPSBuZXdEYXRhO1xuXG4gIGlmICh0eXBlID09PSAnY2hhbmdlc2V0Jykge1xuICAgIGRhdGEgPSBEYXRhVGFibGUuZGlmZihvbGREYXRhLCBkYXRhKTtcbiAgfVxuXG4gIGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7ZGF0YSwgdHlwZX0pO1xuXG4gIHJldHVybiBkYXRhO1xuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIEJpbmFyeSBPdmVyZG9zZSBQcm9qZWN0c1xuaW1wb3J0IHsgb2JqZWN0R2V0TmVzdGVkUHJvcGVydHkgYXMgZ2V0TmVzdGVkUHJvcCB9ICBmcm9tICdiby11dGlscyc7XG5cbi8vIENyeXB0b2h1YlxuaW1wb3J0IGFuYWx5dGljc01lcmdlRGF0YUJ5S2V5ICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2FuYWx5dGljcy1tZXJnZS1kYXRhLWJ5LWtleSc7XG5pbXBvcnQgc2V0dGluZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL3NldHRpbmdzJztcblxuLyoqXG4gKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0b3JlT25IYW5kbGVEYXRhKG9wdGlvbnMsIGRhdGEsIGNhY2hlLCBvbGREYXRhID0ge30pIHtcblxuICAvLyBHZXQgb2xkIGRhdGFcbiAgY29uc3QgZmlsZU5hbWUgPSBgJHtzZXR0aW5ncy5nZW5lcmF0ZWREaXJ9L3N0b3JlL2RhdGEuanNvbmA7XG5cbiAgLy8gTWFwc1xuICBjb25zdCBpZE5hbWUgPSBnZXROZXN0ZWRQcm9wKGRhdGEsICdleGNoYW5nZXMtZ2VuZXJhbC5tYXBzLmlkTmFtZScpO1xuICBjb25zdCBuYW1lSWQgPSBnZXROZXN0ZWRQcm9wKGRhdGEsICdleGNoYW5nZXMtZ2VuZXJhbC5tYXBzLm5hbWVJZCcpO1xuXG4gIC8vIEV4Y2hhbmdlcyBvYmplY3QgYnkgSWRcbiAgY29uc3QgbGlzdCA9IGdldE5lc3RlZFByb3AoZGF0YSwgJ2V4Y2hhbmdlcy1saXN0LmRhdGEnKSB8fCB7fTtcbiAgY29uc3QgZ2VuZXJhbCA9IGdldE5lc3RlZFByb3AoZGF0YSwgJ2V4Y2hhbmdlcy1nZW5lcmFsLmRhdGEnKSB8fCB7fTtcbiAgY29uc3QgZXhjaGFuZ2VzID0gYW5hbHl0aWNzTWVyZ2VEYXRhQnlLZXkoW2xpc3QsIGdlbmVyYWxdKTtcblxuICBjb25zdCBvdXRwdXQgPSB7XG4gICAgLi4ub2xkRGF0YSxcbiAgICAuLi5leGNoYW5nZXMgJiYge2V4Y2hhbmdlc30sXG4gICAgLi4ubmFtZUlkICYmIHsnZXhjaGFuZ2UtbWFwLW5hbWVJZCc6IG5hbWVJZH0sXG4gICAgLi4uaWROYW1lICYmIHsnZXhjaGFuZ2UtbWFwLWlkTmFtZSc6IGlkTmFtZX1cbiAgfVxuXG4gIGNhY2hlLnNldChmaWxlTmFtZSwgSlNPTi5zdHJpbmdpZnkob3V0cHV0KSk7XG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcmd2XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF3YWl0LXRvLWpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvLWRhdGF0YWJsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiby11dGlsc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGVlcmlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlcXVlc3QtcHJvbWlzZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=