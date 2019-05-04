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
          debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hbmFseXRpY3MtbWVyZ2UtZGF0YS1ieS1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2RhdGEtb24tYmVmb3JlLWVtaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2RhdGEtb24taGFuZGxlLWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLWJvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1jb2lubGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1leGNoYW5nZXMtZ2VuZXJhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1leGNoYW5nZXMtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1wcmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi10b3RhbC12b2wtZnVsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZm9ybWF0dGVyLW1lc3Nhcmktc2VjdGlvbi1tZXRyaWNzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9mb3JtYXR0ZXIteGUtc2VjdGlvbi1jdXJyZW5jeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZ2V0LWpvYnMtY3J5cHRvY29tcGFyZS1zZWN0aW9uLXByaWNlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9nZXQtam9icy1jcnlwdG9jb21wYXJlLXNlY3Rpb24tdG90YWwtdm9sLWZ1bGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2dldC1qb2JzLW1lc3Nhcmktc2VjdGlvbi1tZXRyaWNzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zY3JhcGUtanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvc3RvcmUtb24tYmVmb3JlLWVtaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3N0b3JlLW9uLWhhbmRsZS1kYXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFyZ3ZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhd2FpdC10by1qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvLWRhdGF0YWJsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJvLXV0aWxzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hlZXJpb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZXF1ZXN0LXByb21pc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztB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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vXG4vL1xuLy8g4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKVl+KWiOKWiOKWiOKVlyAgIOKWiOKWiOKVlyDilojilojilojilojilojilZcg4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKVlyAgIOKWiOKWiOKVlyDilojilojilojilojilojilojilZcg4paI4paI4pWXICAg4paI4paI4pWX4paI4paI4paI4paI4paI4paI4paI4pWX4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKWiOKWiOKWiOKWiOKVlyAg4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVl+KWiOKWiOKWiOKWiOKWiOKWiOKWiOKVl1xuLy8g4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4paI4paI4pWR4paI4paI4paI4paI4pWXICDilojilojilZHilojilojilZTilZDilZDilojilojilZfilojilojilZTilZDilZDilojilojilZfilZrilojilojilZcg4paI4paI4pWU4pWd4paI4paI4pWU4pWQ4pWQ4pWQ4paI4paI4pWX4paI4paI4pWRICAg4paI4paI4pWR4paI4paI4pWU4pWQ4pWQ4pWQ4pWQ4pWd4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4paI4paI4pWU4pWQ4pWQ4pWQ4paI4paI4pWX4paI4paI4pWU4pWQ4pWQ4pWQ4pWQ4pWd4paI4paI4pWU4pWQ4pWQ4pWQ4pWQ4pWdXG4vLyDilojilojilojilojilojilojilZTilZ3ilojilojilZHilojilojilZTilojilojilZcg4paI4paI4pWR4paI4paI4paI4paI4paI4paI4paI4pWR4paI4paI4paI4paI4paI4paI4pWU4pWdIOKVmuKWiOKWiOKWiOKWiOKVlOKVnSDilojilojilZEgICDilojilojilZHilojilojilZEgICDilojilojilZHilojilojilojilojilojilZcgIOKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkSAg4paI4paI4pWR4paI4paI4pWRICAg4paI4paI4pWR4paI4paI4paI4paI4paI4paI4paI4pWX4paI4paI4paI4paI4paI4pWXXG4vLyDilojilojilZTilZDilZDilojilojilZfilojilojilZHilojilojilZHilZrilojilojilZfilojilojilZHilojilojilZTilZDilZDilojilojilZHilojilojilZTilZDilZDilojilojilZcgIOKVmuKWiOKWiOKVlOKVnSAg4paI4paI4pWRICAg4paI4paI4pWR4pWa4paI4paI4pWXIOKWiOKWiOKVlOKVneKWiOKWiOKVlOKVkOKVkOKVnSAg4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4paI4paI4pWRICDilojilojilZHilojilojilZEgICDilojilojilZHilZrilZDilZDilZDilZDilojilojilZHilojilojilZTilZDilZDilZ1cbi8vIOKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkeKWiOKWiOKVkSDilZrilojilojilojilojilZHilojilojilZEgIOKWiOKWiOKVkeKWiOKWiOKVkSAg4paI4paI4pWRICAg4paI4paI4pWRICAg4pWa4paI4paI4paI4paI4paI4paI4pWU4pWdIOKVmuKWiOKWiOKWiOKWiOKVlOKVnSDilojilojilojilojilojilojilojilZfilojilojilZEgIOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKVmuKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVl1xuLy8g4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWdIOKVmuKVkOKVneKVmuKVkOKVnSAg4pWa4pWQ4pWQ4pWQ4pWd4pWa4pWQ4pWdICDilZrilZDilZ3ilZrilZDilZ0gIOKVmuKVkOKVnSAgIOKVmuKVkOKVnSAgICDilZrilZDilZDilZDilZDilZDilZ0gICDilZrilZDilZDilZDilZ0gIOKVmuKVkOKVkOKVkOKVkOKVkOKVkOKVneKVmuKVkOKVnSAg4pWa4pWQ4pWd4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWdICDilZrilZDilZDilZDilZDilZDilZ0g4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWd4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdXG4vL1xuLy9cblxuLy8gTm9kZVxuaW1wb3J0IHsgam9pbiB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdwYXRoJztcblxuLy8gTGlic1xuaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xuXG4vLyBCaW5hcnkgT3ZlcmRvc2UgUHJvamVjdHNcbmltcG9ydCBEYXRhVGFibGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnYm8tZGF0YXRhYmxlJztcbmltcG9ydCB7IHBhcnRpYWxBcHBsaWNhdGlvbiB9ICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnYm8tdXRpbHMnO1xuXG4vLyBDcnlwdG9IdWJcbmltcG9ydCBzZXR0aW5ncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9zZXR0aW5ncyc7XG5cbi8vIEhhbmRsZXJzXG5pbXBvcnQgZGF0YU9uSGFuZGxlRGF0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdXRpbHMvZGF0YS1vbi1oYW5kbGUtZGF0YSc7XG5pbXBvcnQgc3RvcmVPbkhhbmRsZURhdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdXRpbHMvc3RvcmUtb24taGFuZGxlLWRhdGEnO1xuaW1wb3J0IGRhdGFPbkJlZm9yZUVtaXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2RhdGEtb24tYmVmb3JlLWVtaXQuanMnO1xuaW1wb3J0IHN0b3JlT25CZWZvcmVFbWl0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL3N0b3JlLW9uLWJlZm9yZS1lbWl0LmpzJztcblxuLy8gRm9ybWF0dGVyc1xuaW1wb3J0IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVCb290c3RyYXAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci1jcnlwdG9jb21wYXJlLWJvb3RzdHJhcC5qcyc7XG5pbXBvcnQgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25QcmljZSAgICAgICAgICAgIGZyb20gJy4vdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1wcmljZS5qcyc7XG5pbXBvcnQgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Db2lubGlzdCAgICAgICAgIGZyb20gJy4vdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1jb2lubGlzdC5qcyc7XG5pbXBvcnQgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25FeGNoYW5nZXNMaXN0ICAgIGZyb20gJy4vdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1leGNoYW5nZXMtbGlzdC5qcyc7XG5pbXBvcnQgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25FeGNoYW5nZXNHZW5lcmFsIGZyb20gJy4vdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1leGNoYW5nZXMtZ2VuZXJhbC5qcyc7XG5pbXBvcnQgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Ub3RhbFZvbEZ1bGwgICAgIGZyb20gJy4vdXRpbHMvZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi10b3RhbC12b2wtZnVsbC5qcyc7XG5pbXBvcnQgZm9ybWF0dGVyWGVTZWN0aW9uQ3VycmVuY3kgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdXRpbHMvZm9ybWF0dGVyLXhlLXNlY3Rpb24tY3VycmVuY3kuanMnO1xuaW1wb3J0IGZvcm1hdHRlck1lc3NhcmlTZWN0aW9uTWV0cmljcyAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2Zvcm1hdHRlci1tZXNzYXJpLXNlY3Rpb24tbWV0cmljcy5qcyc7XG5cbi8vIEpvYiBmZXRjaGVyc1xuaW1wb3J0IGdldEpvYnNDcnlwdG9jb21wYXJlU2VjdGlvblByaWNlICAgICAgICAgICAgICBmcm9tICcuL3V0aWxzL2dldC1qb2JzLWNyeXB0b2NvbXBhcmUtc2VjdGlvbi1wcmljZS5qcyc7XG5pbXBvcnQgZ2V0Sm9ic0NyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsICAgICAgIGZyb20gJy4vdXRpbHMvZ2V0LWpvYnMtY3J5cHRvY29tcGFyZS1zZWN0aW9uLXRvdGFsLXZvbC1mdWxsLmpzJztcbmltcG9ydCBnZXRKb2JzTWVzc2FyaVNlY3Rpb25NZXRyaWNzICAgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlscy9nZXQtam9icy1tZXNzYXJpLXNlY3Rpb24tbWV0cmljcy5qcyc7XG5cbi8vIE90aGVyIHV0aWxzXG5pbXBvcnQgYW5hbHl0aWNzTWVyZ2VEYXRhQnlLZXkgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdXRpbHMvYW5hbHl0aWNzLW1lcmdlLWRhdGEtYnkta2V5JztcblxuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi9sb2dnZXInKTtcbmNvbnN0IHsgc2NyYXBlRGlyIH0gPSBzZXR0aW5ncztcblxudHJ5IHtcblxuICBwcm9jZXNzLm9uKCd3YXJuaW5nJywgZXJyb3IgPT4ge1xuICAgIGxvZ2dlci53YXJuaW5nKGBpbmRleC5qczpcXG4ke2Vycm9yLnN0YWNrfWApO1xuICB9KTtcblxuICAvL1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vXG4gIC8vIE9yZGVyIGRhdGEgaXMgcHJvY2Vzc2VkXG4gIC8vXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy9cbiAgLy9cbiAgLy8gIzEgc2VjdGlvbmNvbmZpZy5mb3JtYXR0ZXIocmVzcG9uc2UsIHRpbWVzdGFtcCwgYm9vdHN0cmFwREF0YSwgYXBwQm9vdHN0cmFwRGF0YSwgZmlsZU5hbWUsIGV2ZW50KVxuICAvLyAgICAgIHJldHVybiB7IGRhdGEsIHRpbWVzdGFtcCB9O1xuICAvL1xuICAvLyAgICBUaGUgZm9ybWF0dGVyIHJlY2VpdmVzIHRoZSByZXNwb25zZSBkYXRhLCB0aGUgZGF0YSB0aGF0IHdhcyBzY3JhcGVkIGJlZm9yZSBhbnkgcHJvY2Vzc2luZyBoYXMgaGFwcGVuZWRcbiAgLy8gICAgVGhpcyBpcyB3aGVyZSB5b3Ugc2hvdWxkIGZvcm1hdCB0aGUgaW5kaXZpZHVhbCByZXNwb25zZXMgaW50byBhIGNvaGVzaXZlIGZvcm1hdCBmb3IgZnVydGhlciBwcm9jZXNzaW5nXG4gIC8vXG4gIC8vXG4gIC8vICMyIHNlY3Rpb25jb25maWcuaGFuZGxlcihvbGREYXRhLCBuZXdEYXRhKVxuICAvLyAgICAgIHJldHVybiB7IG1lcmdlZERhdGEgfTtcbiAgLy9cbiAgLy8gICAgTk9URTogcmVuYW1lIGZyb20gaGFuZGxlciB0byA/IC8vIG9uRm9ybWF0dGVkKG9sZERhdGEsIG5ld0RhdGEpXG4gIC8vICAgIFRoaXMgaGFuZGxlciByZWNlaXZlcyBhIGNvcHkgb2YgdGhlIHByZXZpb3VzIHNlY3Rpb25zIGZvcm1hdHRlZCBkYXRhIGFuZCB0aGUgbmV3IGZvcm1hdHRlZCBkYXRhXG4gIC8vICAgIFlvdSBjYW4gZGlzZ3VhcmQgdGhlIG9sZCBkYXRhIG9yIHVzZSBpdCBmb3IgcHJvY2Vzc2luZ1xuICAvLyAgICBBIHNpbmdsZSBtZXJnZWQgcGllY2Ugb2YgZGF0YSBzaG91bGQgYmUgcmV0dXJuZWRcbiAgLy9cbiAgLy9cbiAgLy8gIzMgbWVyZ2VIYW5kbGVyc1tldmVudE5hbWVdKGRhdGEpXG4gIC8vICAgICAgcmV0dXJuIGRhdGE7XG4gIC8vXG4gIC8vICAgIFRoZSBtZXJnZSBoYW5kbGVyIHJlY2VpdmVzIGFsbCB0aGUgZm9ybWF0dGVkIGRhdGEgZm9yIHRoZSBzYW1lIHR5cGUgb2YgZXZlbnRzIGluIGFuIG9iamVjdFxuICAvLyAgICBgYGBcbiAgLy8gICAge1xuICAvLyAgICAgIGNvaW5MaXN0OiBjb2luTGlzdERhdGEsXG4gIC8vICAgICAgb3RoZXJOYW1lOiBvdGhlckRhdGFcbiAgLy8gICAgfVxuICAvLyAgICBgYGBcbiAgLy9cbiAgLy8gICAgSW4gbW9zdCBjYXNlcyB5b3Ugd291bGQgbWVyZ2UgdGhlIGRhdGEgaW50byBhIHNpbmdsZSBvYmplY3Qgb3IgYXJyYXkgYW5kIHJldHVybiBpdC5cbiAgLy8gICAgWW91IGNhbiBob3dldmVyIGVsZWN0IHRvIGtlZXAgaXQgYXMgaXNcbiAgLy9cbiAgLy9cbiAgLy8gIzQgZXZlbnRzW2V2ZW50TmFtZV0oZGF0YSwgY2FjaGUpXG4gIC8vICAgIGNhY2hlLnNldChmaWxlTmFtZSwgZGF0YSk7XG4gIC8vICAgIC8vIHJldHVybiBkYXRhO1xuICAvL1xuICAvLyAgICBOT1RFOiByZW5hbWUgdG8gZXZlbnRzSGFuZGxlcnMoKSBmb3IgY29uc2lzdGVuY3lcbiAgLy8gICAgVGhlIGV2ZW50cyBoYW5kbGVyIGJ1aWxkcyB0aGUgZmluYWwgb3V0cHV0IHRoYXQgZ2V0cyBlbWl0dGVkIGFuZCBzYXZlZCB0byBmaWxlXG4gIC8vICAgIFRPRE86IGNoYW5nZSBzbyB0aGUgZGF0YSBpcyByZXR1cm5lZCBhbmQgdGhlIGFwcGxpY2F0aW9uIHNhdmVzIHRoZSBmaWxlXG4gIC8vXG4gIC8vXG5cbiAgLy9cbiAgLy8gQ09JTkxJU1RcbiAgLy8gR2V0IHRoZSBmdWxsIGxpc3Qgb2YgY29pbnMgd2l0aCBJRHNcbiAgLy9cbiAgLy8gVE9ETzogYm9vdHN0cmFwRGF0YSBuZWVkcyB0byBjaGFuZ2Ugd2hlbiBjb2lubGlzdCBjaGFuZ2VzISEhIVxuICAvL1xuICBjb25zdCBjcnlwdG9jb21wYXJlQ29pbmxpc3QgPSB7XG4gICAgZXZlbnQ6ICdkYXRhJyxcbiAgICBuYW1lOiAnY29pbkxpc3QnLFxuICAgIGludGVydmFsOiAxMDAwICogNSxcbiAgICAvL1xuICAgIC8vIFRPRE86IGNhbiB3ZSByZW1vdmUgdGhpcyBhbmQganVzdCBzZWFyY2ggZm9yIHRoZSBrZXk/XG4gICAgLy9cbiAgICB3YXRjaERpcnM6IFtgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtY29pbmxpc3QvZGF0YS5qc29uYCwgJ2FsbCddLFxuICAgIGdldEpvYnMocXVldWUsIGJvb3RzdHJhcERhdGEpIHtcbiAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICB1cmk6ICdodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9hbGwvY29pbmxpc3QnLFxuICAgICAgICBrZXk6IGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS1jb2lubGlzdC9kYXRhLmpzb25gLFxuICAgICAgICBjYWNoZUZvckRheXM6IDBcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvbkNvaW5saXN0XG4gIH07XG5cbiAgLy9cbiAgLy8gRVhDSEFOR0VTIExJU1RcbiAgLy8gR2V0IGFsbCB0aGUgZXhjaGFuZ2VzIHRoYXQgQ3J5cHRvQ29tcGFyZSBoYXMgaW50ZWdyYXRlZCB3aXRoXG4gIC8vXG4gIC8vIFRPRE86IHNlcGFyYXRlIGludG8gZXhjaGFuZ2VzTGlzdCAmIGV4Y2hhbmdlc0dlbmVyYWwgJiBoYXZlIDIgZm9ybWF0dGVycywgdGhlbiB3ZSBkb24ndCBuZWVkIHRoZSBnbG9iXG4gIC8vIGFuZCB3ZSBjYW4ga2VlcCB0aGUgZGVmYXVsdCBkYXRhLmpzb25cbiAgLy9cbiAgY29uc3QgY3J5cHRvY29tcGFyZUV4Y2hhbmdlc0xpc3QgPSB7XG4gICAgZXZlbnQ6ICdkYXRhLHN0b3JlJyxcbiAgICBuYW1lOiAnZXhjaGFuZ2VzLWxpc3QnLFxuICAgIGludGVydmFsOiAxMDAwICogNjAgKiAxLFxuICAgIC8vIFRPRE86IHJlbmFtZSB0aGlzIGZ1Y2tpbmcgYml0LCB0aGlzIGlzIHdoZXJlIHRoZSB3YXRjaGVyIHdpbGwgbG9vayBmb3IgZmlsZXMgdG8gbG9hZFxuICAgIC8vIHNvIGlmIHdlIGFyZSBzYXZpbmcgdGhlbSBpbiBkaWZmZXJlbnQgcGxhY2VzIHRoZXkgd2lsbCBuZXZlciBiZSBhZGRlZCFcbiAgICB3YXRjaERpcnM6IFtzZXR0aW5ncy5rZXlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzTGlzdCwgJ2FsbCddLFxuICAgIGdldEpvYnMocXVldWUsIGJvb3RzdHJhcERhdGEpIHtcbiAgICAgIHF1ZXVlLnB1c2goe3VyaTogc2V0dGluZ3MudXJpQ3J5cHRvY29tcGFyZUV4Y2hhbmdlc0xpc3QsIGtleTogc2V0dGluZ3Mua2V5Q3J5cHRvY29tcGFyZUV4Y2hhbmdlc0xpc3QsIGNhY2hlRm9yRGF5czogMH0pO1xuICAgIH0sXG4gICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvbkV4Y2hhbmdlc0xpc3RcbiAgfTtcblxuICAvL1xuICAvLyBFWENIQU5HRVMgR0VORVJBTFxuICAvL1xuICBjb25zdCBjcnlwdG9jb21wYXJlRXhjaGFuZ2VzR2VuZXJhbCA9IHtcbiAgICBldmVudDogJ2RhdGEsc3RvcmUnLFxuICAgIG5hbWU6ICdleGNoYW5nZXMtZ2VuZXJhbCcsXG4gICAgaW50ZXJ2YWw6IDEwMDAgKiA2MCAqIDYwLFxuICAgIHdhdGNoRGlyczogW3NldHRpbmdzLmtleUNyeXB0b2NvbXBhcmVFeGNoYW5nZXNHZW5lcmFsLCAnYWxsJ10sXG4gICAgZ2V0Sm9icyhxdWV1ZSwgYm9vdHN0cmFwRGF0YSkge1xuICAgICAgcXVldWUucHVzaCh7dXJpOiBzZXR0aW5ncy51cmlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzR2VuZXJhbCwga2V5OiBzZXR0aW5ncy5rZXlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzR2VuZXJhbCwgY2FjaGVGb3JEYXlzOiAwfSk7XG4gICAgfSxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uRXhjaGFuZ2VzR2VuZXJhbFxuICB9O1xuXG4gIC8vXG4gIC8vIFRPUCBUT1RBTCBWT0xVTUVcbiAgLy9cbiAgY29uc3QgY3J5cHRvY29tcGFyZVRvcFRvdGFsVm9sdW1lID0ge1xuICAgIGV2ZW50OiAnZGF0YScsXG4gICAgbmFtZTogJ3RvdGFsVm9sRnVsbCcsXG4gICAgaW50ZXJ2YWw6IDEwMDAgKiAxMCxcbiAgICB3YXRjaERpcnM6IFtzZXR0aW5ncy50YWdLZXlDcnlwdG9jb21wYXJlVG90YWxWb2xGdWxsR3JvdXBlZGAke3t9fWAsICdhbGwnXSxcbiAgICBnZXRKb2JzOiBnZXRKb2JzQ3J5cHRvY29tcGFyZVNlY3Rpb25Ub3RhbFZvbEZ1bGwsXG4gICAgaGFuZGxlcihvbGREYXRhLCBuZXdEYXRhKSB7XG4gICAgICBjb25zdCBtZXJnZWQgPSB7Li4ub2xkRGF0YSwgLi4ubmV3RGF0YX07XG4gICAgICByZXR1cm4gbWVyZ2VkO1xuICAgIH0sXG4gICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvblRvdGFsVm9sRnVsbFxuICB9O1xuXG4gIC8vXG4gIC8vIFhFIENVUlJFTkNZXG4gIC8vXG4gIGNvbnN0IHhlQ3VycmVuY3kgPSB7XG4gICAgZXZlbnQ6ICdkYXRhJyxcbiAgICBuYW1lOiAnY3VycmVuY3knLFxuICAgIGludGVydmFsOiAxMDAwICogNjAgKiA2MCAqIDI0LFxuICAgIHdhdGNoRGlyczogW3NldHRpbmdzLnRhZ0tleVhlQ3VycmVuY3lUYWJsZXNgJHsnVVNEJ31gLCAnYWxsJ10sXG4gICAgZ2V0Sm9icyhxdWV1ZSwgYm9vdHN0cmFwRGF0YSkge1xuICAgICAgcXVldWUucHVzaCh7XG4gICAgICAgIHVyaTogc2V0dGluZ3MudGFnVXJpWGVDdXJyZW5jeVRhYmxlc2AkeydVU0QnfWAsXG4gICAgICAgIGtleTogc2V0dGluZ3MudGFnS2V5WGVDdXJyZW5jeVRhYmxlc2AkeydVU0QnfWAsXG4gICAgICAgIGNhY2hlRm9yRGF5czogMFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlclhlU2VjdGlvbkN1cnJlbmN5XG4gIH07XG5cbiAgLy9cbiAgLy8gTUVTU0FSSSBNRVRSSUNTXG4gIC8vXG4gIGNvbnN0IG1lc3NhcmlNZXRyaWNzID0ge1xuICAgIGV2ZW50OiAnZGF0YScsXG4gICAgbmFtZTogJ21lc3NhcmktbWV0cmljcycsXG4gICAgaW50ZXJ2YWw6IDEwMDAgKiA1LFxuICAgIHdhdGNoRGlyczogW2Ake3NjcmFwZURpcn0vbWVzc2FyaS1tZXRyaWMvKiovKmAsICdhbGwnXSxcbiAgICBnZXRKb2JzOiBnZXRKb2JzTWVzc2FyaVNlY3Rpb25NZXRyaWNzLFxuICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyTWVzc2FyaVNlY3Rpb25NZXRyaWNzLFxuICB9O1xuXG4gIC8vXG4gIC8vIFRPRE86XG4gIC8vXG4gIC8vIGNvbnN0IGRhdGF0YWJsZSA9IG5ldyBEYXRhVGFibGUob3B0aW9ucyk7XG4gIC8vXG4gIC8vIGRhdGF0YWJsZS5hcGkubmV3KGNyeXB0b2NvbXBhcmUpO1xuICAvLyBkYXRhdGFibGUuYXBpLm5ldyh4ZSk7XG4gIC8vIGRhdGF0YWJsZS5hcGkubmV3KG1lc3NhcmkpO1xuXG4gIC8vIGRhdGF0YWJsZS5hcGkuY3J5cHRvY29tcGFyZS5hZGQoKTtcbiAgLy8gZGF0YXRhYmxlLmFwaS5jcnlwdG9jb21wYXJlLmFkZCgpO1xuICAvLyBkYXRhdGFibGUuYXBpLmNyeXB0b2NvbXBhcmUuYWRkKCk7XG4gIC8vIGRhdGF0YWJsZS5hcGkueGUuYWRkKCk7XG4gIC8vIGRhdGF0YWJsZS5hcGkubWVzc2FyaS5hZGQoKTtcblxuICAvLyBkYXRhdGFibGUuYXBpLm91dHB1dChkYXRhKVxuICAvLyBkYXRhdGFibGUuYXBpLm91dHB1dChzdG9yZSlcblxuICBmdW5jdGlvbiBnZXRGaXJzdFhSb3dzKGRhdGEsIG51bVJvd3MpIHtcblxuICAgIGxldCBpZDtcbiAgICBsZXQgaWRzO1xuICAgIGxldCByb3dzO1xuICAgIGxldCBvdXRwdXQgPSB7fTtcblxuICAgIGNvbnN0IGlkRmllbGQgPSAnY2MtdG90YWwtdm9sLWZ1bGwtSWQnO1xuICAgIGNvbnN0IHZvbEZpZWxkID0gJ2NjLXRvdGFsLXZvbC1mdWxsLVRPVEFMVk9MVU1FMjRIVE8nO1xuXG4gICAgcm93cyA9IE9iamVjdFxuICAgICAgLnZhbHVlcyhkYXRhKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGJbdm9sRmllbGRdIC0gYVt2b2xGaWVsZF0pXG4gICAgICAuc3BsaWNlKDAsIG51bVJvd3MpO1xuXG4gICAgaWRzID0gcm93cy5tYXAoYSA9PiBhW2lkRmllbGRdKTtcbiAgICBmb3IgKGlkIG9mIGlkcykgb3V0cHV0W2lkXSA9IGRhdGFbaWRdO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBsZXQgaW5pdERhdGEgPSB7fTtcbiAgY29uc3QgZGF0YVRhYmxlID0gbmV3IERhdGFUYWJsZSh7XG5cbiAgICBkYkRpcjogc2V0dGluZ3MuZGJEaXIsXG4gICAgY2FjaGVEaXI6IHNldHRpbmdzLmNhY2hlRGlyLFxuICAgIGdlbmVyYXRlZERpcjogc2V0dGluZ3MuZ2VuZXJhdGVkRGlyLFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBwdWI6IGpvaW4oX19kaXJuYW1lLCAnLi4vZGlzdC9wdWJsaWMnKSxcbiAgICAgIHBvcnQ6IDMwMDEsXG4gICAgICBpbmRleDogJy4uL2Rpc3QvaW5kZXguaHRtbCcsXG4gICAgfSxcblxuICAgIC8vXG4gICAgLy8gVE9ET1xuICAgIC8vXG4gICAgLy8gVGhpcyBpcyB3aGVyZSB5b3Ugd2VyZS5cbiAgICAvLyBtYWtlIGFwcCB3aWRlIGJvb3RzdHJhcCB3b3JrLCBhbmQgY2xpcCBkYXRhIGJ5IG1heFJvd3Mgb3Igd2hhdGV2ZXIgaXRzIGNhbGxlZC5cbiAgICAvL1xuICAgIGJvb3RzdHJhcDogZm9ybWF0dGVyQ3J5cHRvY29tcGFyZUJvb3RzdHJhcCxcblxuICAgIGV2ZW50czoge1xuICAgICAgZGF0YToge1xuICAgICAgICBvbkJlZm9yZUhhbmRsZURhdGE6IGFuYWx5dGljc01lcmdlRGF0YUJ5S2V5LFxuICAgICAgICBvbkhhbmRsZURhdGE6IHBhcnRpYWxBcHBsaWNhdGlvbihkYXRhT25IYW5kbGVEYXRhLCB7fSksXG4gICAgICAgIG9uQWZ0ZXJDb25uZWN0KGV2ZW50LCBzb2NrZXQsIGRhdGEpIHtcbiAgICAgICAgICBzb2NrZXQuZW1pdChldmVudCwgZGF0YU9uQmVmb3JlRW1pdCh7ZGlmZjogZmFsc2V9LCBkYXRhLCBpbml0RGF0YSkpO1xuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZUVtaXQ6IHBhcnRpYWxBcHBsaWNhdGlvbihkYXRhT25CZWZvcmVFbWl0LCB7fSksXG4gICAgICAgIG9uQmVmb3JlQm9vdHN0cmFwU2F2ZTogZGF0YSA9PiB7XG4gICAgICAgICAgaW5pdERhdGEgPSBnZXRGaXJzdFhSb3dzKGRhdGEsIHNldHRpbmdzLm1heFJvd3NUZW1wbGF0ZWRJbik7XG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5tYXhSb3dzVGVtcGxhdGVkSW4pIHJldHVybiBkYXRhO1xuICAgICAgICAgIHJldHVybiBpbml0RGF0YTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN0b3JlOiB7XG4gICAgICAgIG9uQmVmb3JlSGFuZGxlRGF0YTogZGF0YSA9PiBkYXRhLFxuICAgICAgICBvbkhhbmRsZURhdGE6IHBhcnRpYWxBcHBsaWNhdGlvbihzdG9yZU9uSGFuZGxlRGF0YSwge30pLFxuICAgICAgICBvbkFmdGVyQ29ubmVjdChldmVudCwgc29ja2V0LCBkYXRhKSB7XG4gICAgICAgICAgc29ja2V0LmVtaXQoZXZlbnQsIHN0b3JlT25CZWZvcmVFbWl0KHtkaWZmOiBmYWxzZX0sIGRhdGEsIHt9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlRW1pdDogcGFydGlhbEFwcGxpY2F0aW9uKHN0b3JlT25CZWZvcmVFbWl0LCB7fSksXG4gICAgICAgIG9uQmVmb3JlQm9vdHN0cmFwU2F2ZTogKGRhdGEpID0+IHtcbiAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzY3JhcGVTaXRlczoge1xuICAgICAgY3J5cHRvY29tcGFyZToge1xuICAgICAgICBjYWNoZUZvcjogc2V0dGluZ3MuY2FjaGVGb3JDcnlwdG9jb21wYXJlLFxuICAgICAgICBib290c3RyYXA6IGZvcm1hdHRlckNyeXB0b2NvbXBhcmVCb290c3RyYXAsXG4gICAgICAgIHJhdGVMaW1pdERlbGF5TXM6IHNldHRpbmdzLnJhdGVMaW1pdENyeXB0b2NvbXBhcmUsXG4gICAgICAgIHNlY3Rpb25zOiBbXG4gICAgICAgICAgY3J5cHRvY29tcGFyZUNvaW5saXN0LFxuICAgICAgICAgIGNyeXB0b2NvbXBhcmVFeGNoYW5nZXNMaXN0LFxuICAgICAgICAgIGNyeXB0b2NvbXBhcmVFeGNoYW5nZXNHZW5lcmFsLFxuICAgICAgICAgIGNyeXB0b2NvbXBhcmVUb3BUb3RhbFZvbHVtZSxcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIG1lc3Nhcmk6IHtcbiAgICAgICAgY2FjaGVGb3I6IHNldHRpbmdzLmNhY2hlRm9yTWVzc2FyaSxcbiAgICAgICAgYm9vdHN0cmFwOiBjYWNoZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgIH0sXG4gICAgICAgIHJhdGVMaW1pdERlbGF5TXM6IHNldHRpbmdzLnJhdGVMaW1pdE1lc3NhcmksXG4gICAgICAgIHNlY3Rpb25zOiBbXG4gICAgICAgICAgbWVzc2FyaU1ldHJpY3NcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHhlOiB7XG4gICAgICAgIGNhY2hlRm9yOiBzZXR0aW5ncy5jYWNoZUZvclhlLFxuICAgICAgICBib290c3RyYXA6ICgpID0+IHtyZXR1cm4ge319LFxuICAgICAgICByYXRlTGltaXREZWxheU1zOiBzZXR0aW5ncy5yYXRlTGltaXRYZSxcbiAgICAgICAgc2VjdGlvbnM6IFtcbiAgICAgICAgICB4ZUN1cnJlbmN5XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59XG5cbmNhdGNoIChlcnJvcikge1xuXG4gIGxvZ2dlci5lcnJvcihgVW0gc29tZSBlcnJvciBoYXBwZW5lZCB5bzogJHtlcnJvcn1gKTtcbiAgcHJvY2Vzcy5leGl0KDEpO1xuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIExpYnNcbmNvbnN0IHdpbnN0b24gPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbi8vIENyeXB0b2h1YlxuY29uc3Qgc2V0dGluZ3MgPSByZXF1aXJlKCcuL3NldHRpbmdzJyk7XG5cbi8vXG4vLyB7ZXJyb3I6IDAsIHdhcm46IDEsIGluZm86IDIsIHZlcmJvc2U6IDMsIGRlYnVnOiA0LCBzaWxseTogNX1cbi8vXG5jb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gIGxldmVsOiAnc2lsbHknLFxuICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0Lmpzb24oKSxcbiAgZXhpdE9uRXJyb3I6IGZhbHNlLFxuICB0cmFuc3BvcnRzOiBbXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtmaWxlbmFtZTogJ2xvZ3MvZXJyb3IubG9nJywgbGV2ZWw6ICdlcnJvcid9KSxcbiAgICAvLyBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoe2ZpbGVuYW1lOiAnbG9ncy9kZWJ1Zy5sb2cnLCBsZXZlbDogJ2RlYnVnJ30pLFxuICAgIC8vIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7ZmlsZW5hbWU6ICdsb2dzL2luZm8ubG9nJywgbGV2ZWw6ICdpbmZvJ30pLFxuICBdXG59KTtcblxuaWYgKHNldHRpbmdzLmxvZ2dlcikge1xuICBsb2dnZXIuYWRkKFxuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICBmaWxlbmFtZTogJ2xvZ3MvY29uc29sZS5sb2cnLFxuICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKSxcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQudGltZXN0YW1wKHtmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJ30pXG4gICAgICApLFxuICAgICAgbGV2ZWw6ICdpbmZvJ1xuICAgIH0pXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nZ2VyO1xuIiwiLy8gTm9kZVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuLy8gTGlic1xuY29uc3QgYXJndiA9IHJlcXVpcmUoJ2FyZ3YnKTtcblxuLy8gU2V0dGluZ3Ncbmdsb2JhbC5naXRodWJDbGllbnRJZCA9ICdjN2EyYzExMWEyN2RlZTUwYmJhMCc7XG5nbG9iYWwuZ2l0aHViQ2xpZW50U2VjcmV0ID0gJzVlNGI4YjM0OGM4MTY1NTM2MzkxYmRiZjYwNDE2ODVmMjcwNTAzZjAnO1xuXG4vLyBDYWNoZSBmb3IgZGF5c1xuLy8gZ2xvYmFsLmNhY2hlRm9yWGUgPSAxO1xuZ2xvYmFsLmNhY2hlRm9yR2l0bG9nID0gNztcbmdsb2JhbC5jYWNoZUZvckdpdGh1YlJlcG8gPSA3O1xuZ2xvYmFsLmNhY2hlRm9yR2l0aHViRm9ya3MgPSAzMDtcbi8vIGdsb2JhbC5jYWNoZUZvckNyeXB0b2NvbXBhcmUgPSAzMDtcbi8vIGdsb2JhbC5jYWNoZUZvckNvaW5tYXJrZXRjYXAgPSAzMDtcbi8vIGdsb2JhbC5jYWNoZUZvckNvaW5tYXJrZXRjYXBQcm9qZWN0c0pzb24gPSAxO1xuLy8gZ2xvYmFsLmNhY2hlRm9yQ29pbm1hcmtldGNhcFByb2plY3RIdG1sID0gMzA7XG5cbi8vIExlYXZlIGluIGV4ZWN1dGlvbiBvcmRlclxuZ2xvYmFsLnNldHRpbmdzU2NyYXBlQ3J5cHRvY29tcGFyZSA9IHRydWU7XG5nbG9iYWwuc2V0dGluZ3NTY3JhcGVDb2lubWFya2V0Y2FwID0gZmFsc2U7XG5nbG9iYWwuc2V0dGluZ3NTY3JhcGVYZSA9IGZhbHNlO1xuLy8gZ2xvYmFsLnNldHRpbmdzR2V0UmVwb0RhdGEgPSB0cnVlO1xuLy8gZ2xvYmFsLnNldHRpbmdzQ2xvbmVSZXBvcyA9IHRydWU7XG4vLyBnbG9iYWwuc2V0dGluZ3NHZXRMb2dEYXRhID0gdHJ1ZTtcbi8vIGdsb2JhbC5zZXR0aW5nc0dldEZvcmtEYXRhID0gdHJ1ZTtcbi8vIGdsb2JhbC5zZXR0aW5nc1NldEZpcnN0Q29tbWl0ID0gdHJ1ZTtcbi8vIGdsb2JhbC5zZXR0aW5nc1N5bmNDb21taXRzID0gdHJ1ZTtcbi8vIGdsb2JhbC5zZXR0aW5nc0hhc2hGaWxlcyA9IHRydWU7XG5cbi8vIFN0dWZmIHdlIGZvdW5kIHdoaWxlIHBhcnNpbmcgdGhlIGRhdGFcbmdsb2JhbC5ub3RlcyA9IFtdO1xuXG4vLyBCaXRidWNrZXQgOi9cbi8vIEFyZG9yOiBodHRwczovL2JpdGJ1Y2tldC5vcmcvSmVsdXJpZGEvYXJkb3Ivc3JjXG4vLyBOWFQ6IGh0dHBzOi8vYml0YnVja2V0Lm9yZy9KZWFuTHVjUGljYXJkL254dC9zcmNcbmdsb2JhbC5naXRodWJPdmVycmlkZXMgPSB7XG4gICdnYXMnOiAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL25lby1wcm9qZWN0JyxcbiAgJ2tpbic6ICAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va2luZWNvc3lzdGVtJyxcbiAgJ3RlbngnOiAgICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vdGVueC10ZWNoJyxcbiAgJ2dub3Npcyc6ICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vZ25vc2lzJyxcbiAgJ2FyYWdvbic6ICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vYXJhZ29uL2FyYWdvbi1uZXR3b3JrLXRva2VuJyxcbiAgJ2Z1bmZhaXInOiAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vZnVuZmFpci10ZWNoJyxcbiAgJ2Jhc2ljLWF0dGVudGlvbi10b2tlbic6ICdodHRwczovL2dpdGh1Yi5jb20vYnJhdmUtaW50bCcsXG59XG5cbmNvbnN0IGFyZ3MgPSBhcmd2Lm9wdGlvbihbXG4gIHtcbiAgICBuYW1lOiAnbG9jYWwnLFxuICAgIHNob3J0OiAnbCcsXG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2hhbmdlcyByZXF1aXJlZCB0byBtaW1pYyBkZXZlbG9wbWVudCBidWlsZCBsb2NhbGx5JyxcbiAgICBleGFtcGxlOiBgJ3NjcmlwdCAtLWxvY2FsPXRydWUnIG9yICdzY3JpcHQgLWwgdHJ1ZSdgXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnbG9nZ2VyJyxcbiAgICBzaG9ydDogJ0wnLFxuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZXNjcmlwdGlvbjogJ0xvZyB0byBjb25zb2xlJyxcbiAgICBleGFtcGxlOiBgJ3NjcmlwdCAtLWxvZ2dlcj10cnVlJyBvciAnc2NyaXB0IC1MIHRydWUnYFxuICB9XG5dKS5ydW4oKTtcblxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJiBhcmdzLm9wdGlvbnMubG9jYWwgIT09IHRydWU7XG5cbmNvbnN0IGNhY2hlRGlyID0gaXNQcm9kXG4gID8gJy9ob21lL3VidW50dS9jcnlwdG9odWItY2FjaGUnXG4gIDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy8uLi9jYWNoZScpO1xuXG5jb25zdCBnZW5lcmF0ZWREaXIgPSBgJHtjYWNoZURpcn0vdG1wLWdlbmVyYXRlZGA7XG5jb25zdCBzY3JhcGVEaXIgICAgPSBgJHtjYWNoZURpcn0vdG1wLXNjcmFwZWA7XG5jb25zdCBkYkRpciAgICAgICAgPSBgJHtjYWNoZURpcn0vZGJgO1xuXG5jb25zdCBjcnlwdG9jb21wYXJlQXBpS2V5ID0gJ2IzYWQ0NzAxMmNjMTM0OTExYTQ3NzVkOTU1ZWYyYjljZjhiODVmNTRkMzgzZDgxYzFiZjc3MzM4YTU5YjEyMjInO1xuXG5sZXQgZmllbGRXaGl0ZWxpc3QgPSBbXG5cbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLUlkJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLUZ1bGxOYW1lJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLVBSSUNFJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLUNIQU5HRVBDVERBWScsXG4gICdjYy10b3RhbC12b2wtZnVsbC1UT1RBTFZPTFVNRTI0SFRPJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLU1LVENBUCcsXG4gICdjYy10b3RhbC12b2wtZnVsbC1TVVBQTFknLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtUHJvb2ZUeXBlJyxcbiAgJ2NjLXRvdGFsLXZvbC1mdWxsLUFsZ29yaXRobScsXG4gICdjYy10b3RhbC12b2wtZnVsbC1OZXRIYXNoZXNQZXJTZWNvbmQnLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtSW1hZ2VVcmwnLFxuXG4gICdjYy1jb2lubGlzdC1TeW1ib2wnLFxuXG4gICdtLW1ldHJpY3Mtc2VjdG9ycycsXG4gIC8vICdtLW1ldHJpY3MtY2F0ZWdvcmllcycsXG4gIC8vICdtLW1ldHJpY3MtZGF0ZS1jcmVhdGVkJyxcbiAgJ20tbWV0cmljcy1hdGgtcHJpY2UnLFxuICAvLyAnbS1tZXRyaWNzLWF0aC1kYXRlJyxcbiAgLy8gJ20tbWV0cmljcy1hdGgtZGF5cycsXG4gIC8vICdtLW1ldHJpY3MtYXRoLXBlcmNlbnQtZG93bicsXG4gIC8vICdtLW1ldHJpY3MtYXRoLWJyZWFrZXZlbi1tdWx0aXBsZScsXG4gICdtLW1ldHJpY3MtY3ljbGUtbG93LXByaWNlJyxcbiAgLy8gJ20tbWV0cmljcy1jeWNsZS1sb3ctZGF0YScsXG4gIC8vICdtLW1ldHJpY3MtY3ljbGUtbG93LXBlcmNlbnQtdXAnLFxuICAvLyAnbS1tZXRyaWNzLWN5Y2xlLWxvdy1kYXlzLXNpbmNlJyxcbiAgLy8gJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1sYXN0LTEtd2VlaycsXG4gIC8vICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtbGFzdC0xLW1vbnRoJyxcbiAgLy8gJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1sYXN0LTMtbW9udGhzJyxcbiAgLy8gJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1sYXN0LTEteWVhcicsXG4gICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtYnRjLWxhc3QtMS13ZWVrJyxcbiAgLy8gJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1idGMtbGFzdC0xLW1vbnRoJyxcbiAgLy8gJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1idGMtbGFzdC0zLW1vbnRocycsXG4gIC8vICdtLW1ldHJpY3MtcGVyY2VudC1jaGFuZ2UtYnRjLWxhc3QtMS15ZWFyJyxcblxuICAnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0U6bGFzdCcsXG4gICdjYy10b3RhbC12b2wtZnVsbC1UT1RBTFZPTFVNRTI0SFRPOmxhc3QnLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtTUtUQ0FQOmxhc3QnLFxuXG4gICdjcnlwdG9odWItcHJpY2UtYnRjJyxcbiAgJ2NyeXB0b2h1Yi1wcmljZS1oaXN0b3J5JyxcbiAgJ2NyeXB0b2h1Yi1udW1iZXJPZkV4Y2hhbmdlcycsXG4gICdjcnlwdG9odWItbnVtYmVyT2ZQYWlycycsXG4gICdjcnlwdG9odWItbnVtYmVyT2ZGaWF0UGFpcnMnLFxuICAnY3J5cHRvaHViLW51bWJlck9mRmlhdEN1cnJlbmNpZXMnLFxuXG4gICdjcnlwdG9odWItZXhjaGFuZ2VzTGlzdERleCcsXG4gICdjcnlwdG9odWItZXhjaGFuZ2VzTGlzdEFjY2VwdHNCb3RoJyxcbiAgJ2NyeXB0b2h1Yi1leGNoYW5nZXNMaXN0Q3J5cHRvT25seScsXG5cbiAgJ2NyeXB0b2h1Yi1wcmljZS1idGM6bGFzdCcsXG5cbl07XG5cbi8vIEtlZXAgdGhlIGxhc3QgdmFsdWUgb2YgZWFjaCBvZiB0aGVzZSBmaWVsZHNcbi8vIGluIGEgbmV3IGZpZWxkIHdpdGggdGhlIHN1ZmZpeCBgOmxhc3RgXG5jb25zdCBmaWVsZExhc3RWYWx1ZSA9IFtcblxuICAnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UnLFxuICAnY2MtdG90YWwtdm9sLWZ1bGwtVE9UQUxWT0xVTUUyNEhUTycsXG4gICdjYy10b3RhbC12b2wtZnVsbC1NS1RDQVAnLFxuICAnY3J5cHRvaHViLXByaWNlLWJ0YycsXG5cbl07XG5cbmZpZWxkV2hpdGVsaXN0ID0gWy4uLmZpZWxkV2hpdGVsaXN0LCAuLi5maWVsZFdoaXRlbGlzdC5tYXAodiA9PiB2ICs9Jy10aW1lc3RhbXAnKV07XG5cbi8qKlxuICpcbiAqICB1cmlDcnlwdG9jb21wYXJlTGlzdDpcbiAqICAgIFJldHVybnMgYWxsIHRoZSBjb2lucyB0aGF0IENyeXB0b0NvbXBhcmUgaGFzIGFkZGVkIHRvIHRoZSB3ZWJzaXRlXG4gKlxuICogIHVyaUNyeXB0b2NvbXBhcmVFeGNoYW5nZXM6XG4gKiAgICBSZXR1cm5zIGFsbCB0aGUgZXhjaGFuZ2VzIHRoYXQgQ3J5cHRvQ29tcGFyZSBoYXMgaW50ZWdyYXRlZCB3aXRoIGFuZCB0aGVpciBzdGF0dXMsXG4gKiAgICBpbmNsdWRpbmcgd2hldGhlciBvciBub3QgdGhleSBhcmUgZXhjbHVkZWQgZnJvbSBwcmljaW5nIGFuZCB2b2x1bWVzXG4gKlxuICogIHRhZ1VyaUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb1NpbmdsZTpcbiAqICAgIENvbXB1dGUgdGhlIGN1cnJlbnQgdHJhZGluZyBpbmZvIChwcmljZSwgdm9sLCBvcGVuLCBoaWdoLCBsb3cgZXRjKSBvZiB0aGVcbiAqICAgIHJlcXVlc3RlZCBwYWlyIGFzIGEgdm9sdW1lIHdlaWdodGVkIGF2ZXJhZ2UgYmFzZWQgb24gdGhlIGV4Y2hhbmdlcyByZXF1ZXN0ZWRcbiAqXG4gKlxuICpcbiAqICB0YWdVcmlDcnlwdG9jb21wYXJlU25hcHNob3Q6XG4gKiAgICBHZXQgdGhlIGdlbmVyYWwsIHN1YnMgKHVzZWQgdG8gY29ubmVjdCB0byB0aGUgc3RyZWFtZXIgYW5kIHRvIGZpZ3VyZSBvdXQgd2hhdCBleGNoYW5nZXMgd2UgaGF2ZVxuICogICAgZGF0YSBmb3IgYW5kIHdoYXQgYXJlIHRoZSBleGFjdCBjb2luIHBhaXJzIG9mIHRoZSBjb2luKSBhbmQgdGhlIGFnZ3JlZ2F0ZWQgcHJpY2VzIGZvciBhbGwgcGFpcnMgYXZhaWxhYmxlXG4gKlxuICogIHRhZ1VyaUNyeXB0b2NvbXBhcmVTb2NpYWxzdGF0czpcbiAqICAgIEdldCBDcnlwdG9Db21wYXJlIHdlYnNpdGUsIEZhY2Vib29rLCBjb2RlIHJlcG9zaXRvcnksIFR3aXR0ZXIgYW5kIFJlZGRpdCBkYXRhIGZvciBjb2luc1xuICogICAgSWYgY2FsbGVkIHdpdGggdGhlIGlkIG9mIGEgY3J5cHRvcGlhbiB5b3UganVzdCBnZXQgZGF0YSBmcm9tIENyeXB0b2NvbXBhcmUgd2Vic2l0ZSB0aGF0IGlzIGF2YWlsYWJsZSB0byB0aGUgcHVibGljXG4gKlxuICovXG5jb25zdCBzZXR0aW5ncyA9IHtcblxuICAvL1xuICAvLyBBcHAgc2V0dGluZ3NcbiAgLy9cbiAgZGVidWc6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSwgLy8gVE9ETzogQ2hhbmdlIHRoaXMgdG8gYW4gZW52IHZhclxuICBsb2dnZXI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLm9wdGlvbnMubG9nZ2VyIHx8IGZhbHNlLFxuICBtYXhSb3dzVGVtcGxhdGVkSW46ICAgICAgICAgICAgICAgICAgICAgICAgICA1MCxcbiAgbWF4UmVjb3Jkc1NjcmFwZWQ6ICAgICAgICAgICAgICAgICAgICAgICAgICAgNDAwLFxuXG4gIC8vIFRoZSBkaWZmLWpzb24gbGlicmFyeSBoYXMgYSBidWcgd2hlcmUgbnVsbCBmaWVsZCB0aHJvdyBhbiBlcnJvciBvbiBhZGQuXG4gIC8vIEZvciBub3cgd2UgYXJlIGp1c3Qgbm90IGdvaW5nIHRvIHNlbmQgbnVsbCBmaWVsZHMsIGxpZ2h0ZW5zIHRoZSBsb2FkIGFueWhvdy5cbiAgcmVtb3ZlTnVsbEZpZWxkczogdHJ1ZSxcblxuICAvL1xuICAvLyBEaXJlY3RvcmllcyAmIFBhdGhzXG4gIC8vXG4gIGRiRGlyLFxuICBhcHBSb290OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lKSxcbiAgY2FjaGVEaXIsXG4gIHNjcmFwZURpcixcbiAgZ2VuZXJhdGVkRGlyLFxuXG4gIC8vXG4gIC8vIExpc3RzXG4gIC8vXG4gIGZpZWxkV2hpdGVsaXN0LFxuICBmaWVsZExhc3RWYWx1ZSxcblxuICAvL1xuICAvLyBDYWNoZVxuICAvLyBOT1RFOiB3ZSBkb250IHJlYWxseSBuZWVkIHRoaXMgaWYgd2UgYXJlIHVzaW5nIHJhdGUgbGltaXRzLiBVc2luZyBpdCBmb3IgZGV2IHRob3VnaFxuICAvL1xuICBjYWNoZUZvclhlOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Byb2QgPyAwIDogMTAwMCAqIDYwICogMTAsXG4gIGNhY2hlRm9yTWVzc2FyaTogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJvZCA/IDAgOiAxMDAwICogNjAgKiAxMCxcbiAgY2FjaGVGb3JDcnlwdG9jb21wYXJlOiAgICAgICAgICAgICAgICAgICAgICAgaXNQcm9kID8gMCA6IDEwMDAgKiA2MCAqIDEwLFxuXG4gIC8vXG4gIC8vIFJhdGVMaW1pdHNcbiAgLy9cblxuICAvL1xuICAvLyBGcm9tIGNyeXB0b2NvbXBhcmUuY29tOlxuICAvLyAgIENhY2hpbmc6IDEwIHNlY29uZHNcbiAgLy8gICBSYXRlIGxpbWl0czpcbiAgLy8gICAgIE1vbnRoICAtIDEwMDAwMFxuICAvLyAgICAgRGF5ICAgIC0gMzIwMFxuICAvLyAgICAgSG91ciAgIC0gMTMwXG4gIC8vICAgICBNaW51dGUgLSAyXG4gIC8vICAgICBTZWNvbmQgLSAwLjAzOFxuICAvL1xuICAvLyAgMjY3ODQgbXMgYmV0d2VlbiByZXF1ZXN0cyA6KFxuICAvL1xuICByYXRlTGltaXRDcnlwdG9jb21wYXJlOiAgICAgICAgICAgICAgICAgICAgICAyNjc4NCxcblxuICAvLyBVbmtub3cgYXQgdGhlIG1vbWVudFxuICByYXRlTGltaXRNZXNzYXJpOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAwICogMTAsXG5cbiAgcmF0ZUxpbWl0WGU6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwMCAqIDYwICogNjAgKiAyNCxcblxuICAvL1xuICAvLyBRdWV1ZXNcbiAgLy9cbiAgcXVldWVDb2lubWFya2V0Y2FwOiAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwMCAqIDYwICogNjAsXG5cbiAgLy9cbiAgLy8gTWVzc2FyaVxuICAvL1xuICB0YWdVcmlNZXNzYXJpTWV0cmljczogICAgICAgICAgICAgICAgICAgICAgICAoc3RyLCBpZCkgPT4gYGh0dHBzOi8vZGF0YS5tZXNzYXJpLmlvL2FwaS92MS9hc3NldHMvJHtpZH0vbWV0cmljc2AsXG4gIHRhZ0tleU1lc3NhcmlNZXRyaWNzOiAgICAgICAgICAgICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgJHtzY3JhcGVEaXJ9L21lc3NhcmktbWV0cmljLyR7aWR9L2RhdGEuanNvbmAsXG4gIHRhZ0tleU1lc3NhcmlNZXRyaWNzR3JvdXBlZDogICAgICAgICAgICAgICAgIChzdHIsIG9iKSA9PiBgJHtzY3JhcGVEaXJ9L21lc3NhcmktbWV0cmljLWdyb3VwZWQvZGF0YS5qc29uYCxcblxuICAvL1xuICAvLyBDcnlwdG9jb21wYXJlXG4gIC8vXG5cbiAgdGFnVXJpQ3J5cHRvY29tcGFyZVRvdGFsVm9sRnVsbDogICAgICAgICAgICAgKHN0ciwgb2IpID0+IGBodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS90b3AvdG90YWx2b2xmdWxsP2xpbWl0PSR7b2IubGltaXR9JnRzeW09VVNEJnBhZ2U9JHtvYi5wYWdlfWAsXG4gIHRhZ0tleUNyeXB0b2NvbXBhcmVUb3RhbFZvbEZ1bGw6ICAgICAgICAgICAgIChzdHIsIG9iKSA9PiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtdG90YWx2b2xmdWxsL3BhZ2UtJHtvYi5wYWdlfS5qc29uYCxcbiAgdGFnS2V5Q3J5cHRvY29tcGFyZVRvdGFsVm9sRnVsbEdyb3VwZWQ6ICAgICAgKHN0ciwgb2IpID0+IGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS10b3RhbHZvbGZ1bGwtZ3JvdXBlZC9kYXRhLmpzb25gLFxuXG4gIHVyaUNyeXB0b2NvbXBhcmVMaXN0OiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9hbGwvY29pbmxpc3QnLFxuICBrZXlDcnlwdG9jb21wYXJlTGlzdDogICAgICAgICAgICAgICAgICAgICAgICBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtY29pbmxpc3QvZGF0YS5qc29uYCxcblxuICB1cmlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzTGlzdDogICAgICAgICAgICAgICAnaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvdjIvYWxsL2V4Y2hhbmdlcycsXG4gIGtleUNyeXB0b2NvbXBhcmVFeGNoYW5nZXNMaXN0OiAgICAgICAgICAgICAgIGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS1leGNoYW5nZXMtbGlzdC9kYXRhLmpzb25gLFxuICB1cmlDcnlwdG9jb21wYXJlRXhjaGFuZ2VzR2VuZXJhbDogICAgICAgICAgICBgaHR0cHM6Ly9taW4tYXBpLmNyeXB0b2NvbXBhcmUuY29tL2RhdGEvZXhjaGFuZ2VzL2dlbmVyYWw/YXBpX2tleT0ke2NyeXB0b2NvbXBhcmVBcGlLZXl9YCxcbiAga2V5Q3J5cHRvY29tcGFyZUV4Y2hhbmdlc0dlbmVyYWw6ICAgICAgICAgICAgYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLWV4Y2hhbmdlcy1nZW5lcmFsL2RhdGEuanNvbmAsXG5cbiAgLy8gdXJpQ3J5cHRvY29tcGFyZUV4Y2hhbmdlU3RhdHVzOiAgICAgICAgICAgICAgJ2h0dHBzOi8vbWluLWFwaS5jcnlwdG9jb21wYXJlLmNvbS9kYXRhL2FsbC9jY2NhZ2dleGNoYW5nZXMnLFxuICAvLyBrZXlDcnlwdG9jb21wYXJlRXhjaGFuZ2VTdGF0dXM6ICAgICAgICAgICAgICBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtZXhjaGFuZ2Utc3RhdHVzL2RhdGEuanNvbmAsXG5cbiAgdGFnVXJpQ3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvU2luZ2xlOiAgICAgICAgKHN0ciwgb2IpID0+IGBodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9nZW5lcmF0ZUF2Zz9mc3ltPSR7b2Iuc3ltYm9sMX0mdHN5bT0ke29iLnN5bWJvbDJ9JmU9JHtvYi5leGNoYW5nZX1gLFxuICB0YWdLZXlDcnlwdG9jb21wYXJlVHJhZGluZ0luZm9TaW5nbGU6ICAgICAgICAoc3RyLCBvYikgPT4gYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLWV4Y2hhbmdlLyR7b2IuZXhjaGFuZ2V9LXBhaXJzLSR7b2Iuc3ltYm9sMX0tJHtvYi5zeW1ib2wyfS5qc29uYCxcbiAgdGFnS2V5Q3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvU2luZ2xlR3JvdXBlZDogKHN0ciwgb2IpID0+IGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS1leGNoYW5nZS1ncm91cGVkL2RhdGEuanNvbmAsXG5cbiAgdGFnVXJpQ3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGk6ICAgICAgICAgKHN0ciwgb2IpID0+IGBodHRwczovL21pbi1hcGkuY3J5cHRvY29tcGFyZS5jb20vZGF0YS9wcmljZW11bHRpZnVsbD9mc3ltcz0ke29iLmxpc3QxfSZ0c3ltcz0ke29iLmxpc3QyfSZlPSR7b2IuZXhjaGFuZ2UgfHwgJ0NDQ0FHRyd9YCxcbiAgdGFnS2V5Q3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGk6ICAgICAgICAgKHN0ciwgb2IpID0+IGAke3NjcmFwZURpcn0vY3J5cHRvY29tcGFyZS10cmFkaW5nLWluZm8tJHtvYi5leGNoYW5nZSB8fCAnQ0NDQUdHJ30vJHtvYi5jYWNoZUtleX0uanNvbmAsXG4gIHRhZ0tleUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb011bHRpR3JvdXBlZDogIChzdHIsIG9iKSA9PiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtdHJhZGluZy1pbmZvLSR7b2IuZXhjaGFuZ2UgfHwgJ0NDQ0FHRyd9LWdyb3VwZWQvZGF0YS5qc29uYCxcbiAgbGltaXRzQ3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGlBcnIxOiAgICAgMzAwLFxuICBsaW1pdHNDcnlwdG9jb21wYXJlVHJhZGluZ0luZm9NdWx0aUFycjI6ICAgICAxMDAsXG5cbiAgdGFnVXJpQ3J5cHRvY29tcGFyZVNuYXBzaG90OiAgICAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGBodHRwczovL3d3dy5jcnlwdG9jb21wYXJlLmNvbS9hcGkvZGF0YS9jb2luc25hcHNob3RmdWxsYnlpZC8/aWQ9JHtpZH1gLFxuICB0YWdLZXlDcnlwdG9jb21wYXJlU25hcHNob3Q6ICAgICAgICAgICAgICAgICAoc3RyLCBpZCkgPT4gYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLXNuYXBzaG90LyR7aWR9Lmpzb25gLFxuICB0YWdLZXlDcnlwdG9jb21wYXJlU25hcHNob3RHcm91cGVkOiAgICAgICAgICAoc3RyLCBvYikgPT4gYCR7c2NyYXBlRGlyfS9jcnlwdG9jb21wYXJlLXNuYXBzaG90LWdyb3VwZWQvZGF0YS5qc29uYCxcblxuICB0YWdVcmlDcnlwdG9jb21wYXJlU29jaWFsc3RhdHM6ICAgICAgICAgICAgICAoc3RyLCBpZCkgPT4gYGh0dHBzOi8vd3d3LmNyeXB0b2NvbXBhcmUuY29tL2FwaS9kYXRhL3NvY2lhbHN0YXRzLz9pZD0ke2lkfWAsXG4gIHRhZ0tleUNyeXB0b2NvbXBhcmVTb2NpYWxzdGF0czogICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtc29jaWFsc3RhdHMvJHtpZH0uanNvbmAsXG4gIHRhZ0tleUNyeXB0b2NvbXBhcmVTb2NpYWxTdGF0c0dyb3VwZWQ6ICAgICAgIChzdHIsIG9iKSA9PiBgJHtzY3JhcGVEaXJ9L2NyeXB0b2NvbXBhcmUtc29jaWFsc3RhdHMtZ3JvdXBlZC9kYXRhLmpzb25gLFxuXG4gIC8vXG4gIC8vIENvaW5tYXJrZXRjYXBcbiAgLy9cbiAgLy8gdGFnVXJpQ29pbm1hcmtldGNhcFRpY2tlcjogICAgICAgICAgICAgICAgICAgKHN0ciwgb2IpID0+IGBodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvP3N0YXJ0PSR7b2Iuc3RhcnQgfHwgMH0mbGltaXQ9JHtvYi5saW1pdCB8fCAxMDB9JnNvcnQ9JHtvYi5zb3J0IHx8ICdpZCd9YCxcbiAgLy8gdGFnS2V5Q29pbm1hcmtldGNhcFRpY2tlcjogICAgICAgICAgICAgICAgICAgKHN0ciwgb2IpID0+IGAvY29pbm1hcmtldGNhcC90aWNrZXIvJHtvYi5jYWNoZUtleX0uanNvbmAsXG4gIC8vIHRhZ0tleUNvaW5tYXJrZXRjYXBUaWNrZXJHcm91cGVkOiAgICAgICAgICAgIChzdHIsIG9iKSA9PiBgL2NvaW5tYXJrZXRjYXAvdGlja2VyLWdyb3VwZWQvZGF0YS5qc29uYCxcblxuICAvLyB1cmlDb2lubWFya2V0Y2FwTGlzdDogICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGkuY29pbm1hcmtldGNhcC5jb20vdjIvbGlzdGluZ3MvJyxcbiAgLy8ga2V5Q29pbm1hcmtldGNhcExpc3Q6ICAgICAgICAgICAgICAgICAgICAgICAgJy9jb2lubWFya2V0Y2FwL3NlYXJjaC9jb2lucy5qc29uJyxcbiAgLy8gdGFnVXJpQ29pbm1hcmtldGNhcERldGFpbHNKU09OOiAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGBodHRwczovL2FwaS5jb2lubWFya2V0Y2FwLmNvbS92Mi90aWNrZXIvJHtpZH0vYCxcbiAgLy8gdGFnVXJpQ29pbm1hcmtldGNhcERldGFpbHNIVE1MOiAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGBodHRwczovL2NvaW5tYXJrZXRjYXAuY29tL2N1cnJlbmNpZXMvJHtpZH0vYCxcbiAgLy8gdGFnS2V5Q29pbm1hcmtldGNhcERldGFpbHNKU09OOiAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGAvY29pbm1hcmtldGNhcC9kZXRhaWxzLyR7aWR9Lmpzb25gLFxuICAvLyB0YWdLZXlDb2lubWFya2V0Y2FwRGV0YWlsc0hUTUw6ICAgICAgICAgICAgICAoc3RyLCBpZCkgPT4gYC9jb2lubWFya2V0Y2FwL2RldGFpbHMvJHtpZH0uaHRtbGAsXG5cbiAgLy9cbiAgLy8gWEVcbiAgLy9cbiAgdGFnVXJpWGVDdXJyZW5jeVRhYmxlczogICAgICAgICAgICAgICAgICAgICAgKHN0ciwgaWQpID0+IGBodHRwczovL3hlLmNvbS9jdXJyZW5jeXRhYmxlcy8/ZnJvbT0ke2lkfWAsXG4gIHRhZ0tleVhlQ3VycmVuY3lUYWJsZXM6ICAgICAgICAgICAgICAgICAgICAgIChzdHIsIGlkKSA9PiBgJHtzY3JhcGVEaXJ9L3hlLWN1cnJlbmN5dGFibGVzLyR7aWR9Lmh0bWxgLFxuXG4gIC8vXG4gIC8vIElTT1xuICAvL1xuICB1cmlJU080MjE3Q3VycmVuY3lDb2RlczogICAgICAgICAgICAgICAgICAgICBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lKX0vLi4vaXNvLzQyMTcudHh0YCxcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldHRpbmdzO1xuIiwiLyoqXG4gKlxuICogTk9URTogLS0gQ29tbWVudHMgbmVlZCB1cGRhdGVpbmcgLS1cbiAqIFRha2VzIGFuZCBhcnJheSBvZiBkYXRhIG9iamVjdHMgYW5kIHJldHVybnMgYW4gb2JqZWN0XG4gKiB3aXRoIHRoZSBpdGVtcyBpZGVudGlmaWVkIHZpYSB0aGVpciBrZXlzXG4gKiBJZiBhbnkgdHdvIGtleXMgYXJlIHRoZSBzYW1lIGl0IG1lcmdlcyB0aGUgZGF0YSBhbmRcbiAqIHRoZSBzZWNvbmQgaXRlbSBvdmVycmlkZXMgdGhlIGZpcnN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZURhdGFCeUtleShkYXRhKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YUFycmF5ID0gT2JqZWN0LnZhbHVlcyhkYXRhKTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGRhdGEgb2YgZGF0YUFycmF5KSB7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oYG1lcmdlRGF0YUJ5S2V5OiBkYXRhIHNob3VsZCBub3QgYmUgJHtkYXRhfSwgc2tpcHBpbmdgKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgICAgaWYgKCFyZXN1bHRba2V5XSkgcmVzdWx0W2tleV0gPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRba2V5XSwgdmFsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGxvZ2dlci5lcnJvcihgbWVyZ2VEYXRhQnlLZXk6ICR7ZXJyb3J9YCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSBkZWJ1Z2dlcjtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gQmluYXJ5IE92ZXJkb3NlIFByb2plY3RzXG5pbXBvcnQgRGF0YVRhYmxlIGZyb20gJ2JvLWRhdGF0YWJsZSc7XG5cbi8vIENyeXB0b0h1YlxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4uL3NldHRpbmdzJztcblxuLyoqXG4gKlxuICogSWYgdGhlc2UgZmllbGRzIGRvbnQgZXhpc3QgaW4gYSByZWNvcmQgdGhlIHJlY29yZFxuICogaXMgdXNlbGVzcyB0byB1c2UgYXQgdGhpcyB0aW1lXG4gKlxuICovXG5mdW5jdGlvbiB2YWxpZERhdGEoaXRlbSkge1xuICByZXR1cm4gIShcbiAgICAgICBpdGVtWydjYy10b3RhbC12b2wtZnVsbC1UT1RBTFZPTFVNRTI0SFRPJ10gPT09IDBcbiAgICB8fCBpdGVtWydjYy10b3RhbC12b2wtZnVsbC1QUklDRSddID09PSB2b2lkIDBcbiAgICB8fCBpdGVtWydjYy10b3RhbC12b2wtZnVsbC1JZCddID09PSB2b2lkIDBcbiAgKVxufVxuXG4vKipcbiAqXG4gKiBXZSBvbmx5IHdhbnQgdG8gZGlzcGxheSByZWNvcmRzIHRoYXQgYXJlIHVwZGF0ZWQgcmVndWxhcmx5XG4gKiBTb21ldGltZXMgd2Ugd2lsbCBoYXZlIHNvbWUgdGhhdCBoYXZlIHBvcGVkIHVwIGludG9cbiAqIHRoZSB0b3AgeCB0aGF0IHdlIGRpc3BsYXkgYW5kIHRoZW4gZGlzc2FwcGVhciAgYWdhaW4uIFRoZXlcbiAqIHNob3VsZCBiZSBmaWx0ZXJlZCBvdXRcbiAqXG4gKi9cbmZ1bmN0aW9uIGlzRnJlc2goaXRlbSkge1xuICBjb25zdCBub3cgPSArbmV3IERhdGUoKTtcbiAgY29uc3QgbG9uZ2VzdEFnZSA9IDEwMDAgKiA2MCAqIDYwICogMjQ7XG4gIGNvbnN0IHRpbWVzdGFtcCA9ICtuZXcgRGF0ZShpdGVtWydjYy10b3RhbC12b2wtZnVsbC1QUklDRS10aW1lc3RhbXAnXSk7XG4gIHJldHVybiBub3cgLSB0aW1lc3RhbXAgPCBsb25nZXN0QWdlO1xufVxuXG4vKipcbiAqXG4gKiBSZW1vdmUgYmFkIHJlY29yZHNcbiAqIFJlbW92ZSBmaWVsZHMgdGhhdCBhcmUgbm90IGN1cnJlbnRseSB1c2VkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbmZ1bmN0aW9uIGZpbHRlckRhdGEoZGF0YSkge1xuXG4gIGxldCBrZXk7XG4gIGxldCBpdGVtO1xuICBsZXQgZmllbGQ7XG4gIGxldCBmaWVsZHM7XG4gIGNvbnN0IHdoaXRlbGlzdCA9IHNldHRpbmdzLmZpZWxkV2hpdGVsaXN0O1xuXG4gIGZvciAoW2tleSwgaXRlbV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICBpZiAoIXZhbGlkRGF0YShpdGVtKSB8fCAhaXNGcmVzaChpdGVtKSkge1xuICAgICAgLy8gcmVtb3ZlIHJlY29yZFxuICAgICAgZGVsZXRlIGRhdGFba2V5XTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyByZW1vdmUgZmllbGRzIHRoYXQgYXJlIG5vdCBiZWluZyB1c2VkXG4gICAgICBmaWVsZHMgPSBPYmplY3Qua2V5cyhkYXRhW2tleV0pO1xuICAgICAgZm9yIChmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgaWYgKCF3aGl0ZWxpc3QuaW5jbHVkZXMoZmllbGQpIHx8IChzZXR0aW5ncy5yZW1vdmVOdWxsRmllbGRzICYmIGRhdGFba2V5XVtmaWVsZF0gPT09IG51bGwpKSB7XG4gICAgICAgICAgZGVsZXRlIGRhdGFba2V5XVtmaWVsZF07XG4gICAgICAgICAgZGVsZXRlIGRhdGFba2V5XVtgJHtmaWVsZH0tdGltZXN0YW1wYF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcblxufVxuXG4vKipcbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YU9uQmVmb3JlRW1pdChvcHRpb25zLCBuZXdEYXRhLCBvbGREYXRhKSB7XG5cbiAgY29uc3QgdHlwZSA9IG9wdGlvbnMuZGlmZiAhPT0gZmFsc2UgPyAnY2hhbmdlc2V0JyA6ICdmdWxsJztcbiAgbGV0IGRhdGEgPSBmaWx0ZXJEYXRhKG5ld0RhdGEpO1xuXG4gIGlmICh0eXBlID09PSAnY2hhbmdlc2V0Jykge1xuICAgIGRhdGEgPSBEYXRhVGFibGUuZGlmZihvbGREYXRhLCBkYXRhKTtcbiAgfVxuXG4gIGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7ZGF0YSwgdHlwZX0pO1xuXG4gIHJldHVybiBkYXRhO1xuXG59XG4iLCIvLyBCaW5hcnkgT3ZlcmRvc2VcbmltcG9ydCB7IGFycmF5VG9PYmplY3QgfSAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2JvLXV0aWxzJztcbmltcG9ydCB7IG9iamVjdElzT2JqZWN0IGFzIGlzT2JqZWN0IH0gICAgICAgICAgIGZyb20gJ2JvLXV0aWxzJztcbmltcG9ydCB7IG9iamVjdElzRW1wdHlPYmplY3QgYXMgaXNFbXB0eU9iamVjdCB9IGZyb20gJ2JvLXV0aWxzJztcbmltcG9ydCB7IHRpbWVzZXJpZXNUaGluIH0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2JvLXV0aWxzJztcbmltcG9ydCB7IHRpbWVzZXJpZXNQcnVuZSB9ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2JvLXV0aWxzJztcbmltcG9ydCB7IHRpbWVzZXJpZXNTY2FsZSB9ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2JvLXV0aWxzJztcblxuLy8gQ3J5cHRvaHViIHV0aWwgZnVuY3Rpb25zXG5pbXBvcnQgbG9nZ2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHNldHRpbmdzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vc2V0dGluZ3MnO1xuXG4vKipcbiAqXG4gKiBUaW1lc2VyaWVzIFJlc2NhbGVcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0aW1lc2VyaWVzIC0gQXJyYXkgb2YgdGltZXNlcmllcyBvYmplY3RzXG4gKiBAcmV0dXJuIHtBcnJheX0gLSBBcnJheSBvZiB1cGRhdGVkIHRpbWVzZXJpZXMgb2JqZWN0XG4gKlxuICovXG5mdW5jdGlvbiBnZXROZXdUaW1lc2VyaWVzRGF0YShpdGVtLCBsaW1pdCA9IDUwLCBtYXhBZ2UgPSAxMDAwICogNjAgKiA2MCAqIDI0ICogNykge1xuXG4gIGNvbnN0IHByaWNlICAgICAgPSBpdGVtWydjYy10b3RhbC12b2wtZnVsbC1QUklDRSddO1xuICBjb25zdCB2b2x1bWUgICAgID0gaXRlbVsnY2MtdG90YWwtdm9sLWZ1bGwtVE9UQUxWT0xVTUUyNEhUTyddO1xuICBjb25zdCB0aW1lc3RhbXAgID0gaXRlbVsnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UtdGltZXN0YW1wJ107XG4gIGNvbnN0IHRpbWVzZXJpZXMgPSBpdGVtWydjcnlwdG9odWItcHJpY2UtaGlzdG9yeSddIHx8IFtdO1xuICBpZiAodGltZXNlcmllc1swXSAmJiB0aW1lc2VyaWVzWzBdLnRpbWVzdGFtcCA9PT0gbnVsbCkgdGltZXNlcmllcy5zcGxpY2UoMCwgMSk7XG4gIGlmICghcHJpY2UgfHwgIXZvbHVtZSB8fCAhdGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIHRpbWVzZXJpZXM7XG4gIH1cblxuICB0aW1lc2VyaWVzUHJ1bmUodGltZXNlcmllcywgbWF4QWdlKTtcbiAgdGltZXNlcmllc1RoaW4odGltZXNlcmllcywgbGltaXQpO1xuXG4gIGNvbnN0IGxhc3QgPSB0aW1lc2VyaWVzW3RpbWVzZXJpZXMubGVuZ3RoIC0gMV07XG4gIGNvbnN0IG5leHQgPSB7cHJpY2UsIHZvbHVtZSwgdGltZXN0YW1wOiArbmV3IERhdGUodGltZXN0YW1wKX07XG4gIGlmIChKU09OLnN0cmluZ2lmeShsYXN0KSAhPT0gSlNPTi5zdHJpbmdpZnkobmV4dCkpIHRpbWVzZXJpZXMucHVzaChuZXh0KTtcblxuICByZXR1cm4gdGltZXNlcmllcztcblxufVxuXG4vL1xuLy9cbi8vXG5mdW5jdGlvbiBwcmljZUluQml0Y29pbihvbGREYXRhID0ge30sIG5ld0RhdGEsIGJpdGNvaW5QcmljZSkge1xuXG4gIGNvbnN0IG91dHB1dCA9IHt9O1xuICBjb25zdCBjcnlwdG9QcmljZSA9IG5ld0RhdGFbJ2NjLXRvdGFsLXZvbC1mdWxsLVBSSUNFJ107XG4gIGNvbnN0IGNyeXB0b1ByaWNlVGltZXN0YW1wID0gbmV3RGF0YVsnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UtdGltZXN0YW1wJ107XG5cbiAgaWYgKGJpdGNvaW5QcmljZSAmJiBjcnlwdG9QcmljZSkge1xuXG4gICAgY29uc3QgZmllbGQgPSAnY3J5cHRvaHViLXByaWNlLWJ0Yyc7XG5cbiAgICAvLyBvdXRwdXQucHJpY2UgPSAxIC8gKGJpdGNvaW5QcmljZSAvIGNyeXB0b1ByaWNlKTsgLy8gYnRjXG4gICAgb3V0cHV0LnByaWNlID0gTWF0aC5jZWlsKCgxIC8gKGJpdGNvaW5QcmljZSAvIGNyeXB0b1ByaWNlKSkgKiAxMDAwMDAwMDApOyAvLyBzYXRzXG5cbiAgICBpZiAoc2V0dGluZ3MuZmllbGRMYXN0VmFsdWUuaW5jbHVkZXMoZmllbGQpKSB7XG4gICAgICBvdXRwdXQubGFzdFByaWNlID0gb2xkRGF0YVtmaWVsZF07XG4gICAgfVxuXG4gICAgb3V0cHV0LnRpbWVzdGFtcCA9ICtuZXcgRGF0ZShjcnlwdG9QcmljZVRpbWVzdGFtcCk7XG5cbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG5cbn1cblxuZnVuY3Rpb24gZ2V0Qml0Y29pblByaWNlKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGFbMTE4Ml0gPyBkYXRhWzExODJdWydjYy10b3RhbC12b2wtZnVsbC1QUklDRSddIDogZmFsc2U7XG59XG5cbi8qKlxuICpcbiAqIEFERCBDUllQVE9IVUIgRklFTERTXG4gKlxuICovXG5mdW5jdGlvbiBhZGRDcnlwdG9odWJGaWVsZHMob2xkRGF0YSwgZGF0YSkge1xuXG4gIGZ1bmN0aW9uIGxhc3RWYWx1ZUZpZWxkKG9sZERhdGEsIG5ld0RhdGEsIGZpZWxkKSB7XG4gICAgaWYgKHNldHRpbmdzLmZpZWxkTGFzdFZhbHVlLmluY2x1ZGVzKGZpZWxkKSkge1xuICAgICAgbmV3RGF0YVtgJHtmaWVsZH06bGFzdGBdID0gb2xkRGF0YVtmaWVsZF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdGltZXN0YW1wRmllbGQoZGF0YSwgZmllbGQpIHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSArbmV3IERhdGUoZGF0YVsnY2MtdG90YWwtdm9sLWZ1bGwtUFJJQ0UtdGltZXN0YW1wJ10pO1xuICAgIGRhdGFbYCR7ZmllbGR9LXRpbWVzdGFtcGBdID0gdGltZXN0YW1wO1xuICB9XG5cblxuICBsZXQga2V5O1xuICBsZXQgaXRlbTtcbiAgY29uc3QgYml0Y29pblByaWNlID0gZ2V0Qml0Y29pblByaWNlKGRhdGEpO1xuICBmb3IgKFtrZXksIGl0ZW1dIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG5cbiAgICAvLyBUaW1lc2VyaWVzXG4gICAgY29uc3QgdGltZXNlcmllcyA9IGdldE5ld1RpbWVzZXJpZXNEYXRhKGl0ZW0pO1xuICAgIGlmICh0aW1lc2VyaWVzKSBpdGVtWydjcnlwdG9odWItcHJpY2UtaGlzdG9yeSddID0gdGltZXNlcmllcztcblxuICAgIC8vIEJpdGNvaW4gcHJpY2VcbiAgICBjb25zdCB7IHByaWNlLCBsYXN0UHJpY2UsIHRpbWVzdGFtcCB9ID0gcHJpY2VJbkJpdGNvaW4ob2xkRGF0YVtrZXldLCBpdGVtLCBiaXRjb2luUHJpY2UpO1xuICAgIGlmIChwcmljZSkgICAgICAgICAgICAgICBpdGVtWydjcnlwdG9odWItcHJpY2UtYnRjJ10gICAgICAgICAgID0gcHJpY2U7XG4gICAgaWYgKHByaWNlICE9PSBsYXN0UHJpY2UpIGl0ZW1bJ2NyeXB0b2h1Yi1wcmljZS1idGM6bGFzdCddICAgICAgPSBsYXN0UHJpY2U7XG4gICAgaWYgKHRpbWVzdGFtcCkgICAgICAgICAgIGl0ZW1bJ2NyeXB0b2h1Yi1wcmljZS1idGMtdGltZXN0YW1wJ10gPSB0aW1lc3RhbXA7XG5cbiAgICAvLyBDaXJjdWxhdGluZyBwZXJjZW50IHRvdGFsXG4gICAgY29uc3Qgc3VwcGx5VG90YWwgICAgICAgPSBpdGVtWydjYy1jb2lubGlzdC1Ub3RhbENvaW5TdXBwbHknXTtcbiAgICBjb25zdCBzdXBwbHlDaXJjdWxhdGluZyA9IGl0ZW1bJ2NjLXRvdGFsLXZvbC1mdWxsLVNVUFBMWSddO1xuICAgIGl0ZW1bJ2NyeXB0b2h1Yi1jaXJjdWxhdGluZy1wZXJjZW50LXRvdGFsJ10gPSAoc3VwcGx5Q2lyY3VsYXRpbmcgLyBzdXBwbHlUb3RhbCkgKiAxMDA7XG5cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xuXG59XG5cbi8qKlxuICpcbiAqIEJhY2tmaWxsIGFuZCBmb3JtYXQgZGF0YVxuICpcbiAqIFdoZW4gcnVubmluZyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYXAgdGhlIGRhdGFzdG9yZSBzdGFydHMgb2ZmIGVtcHR5LlxuICogU29tZSBkYXRhIHRha2VzIGxvbmdlciB0byBzY3JhcGUgdGhhbiBvdGhlciB0aGVyZWZvcmUgc29tZSBpdGVtcyBpbiB0aGVcbiAqIGRhdGFzdG9yZSB3aWxsIHN0YXkgZW1wdHkgZm9yIGEgd2hpbGUuIFRvIHByZXZlbnQgdGhpcyB3ZSBiYWNrZmlsbCB0aGUgZGF0YXN0b3JlXG4gKiB3aXRoIHRoZSBsYXN0IG91dHB1dCBkYXRhc291cmNlIGlmIGFueSBvZiB0aGUgc3RvcmVzIGFyZSBlbXB0eVxuICpcbiAqIE5PVEU6XG4gKiAgIFJlZ2FyZGluZyBwYWNraW5nIGFuZCBkaWZmaW5nIGRhdGFcbiAqICAgV2Ugc2hvdWxkIG5ldmVyIHNhdmUgcGFja2VkIGRhdGEgb3IgZGF0YSBkaWZmc1xuICogICBXZSBzaG91bGQgb25seSBldmVyIGVtaXQgcGFja2VkIGRhdGEgb3IgZGF0YSBkaWZmcyBzbyBrbm93aW5nIHRoYXRcbiAqICAgYWxsIGRhdGEgd2Ugd29yayB3aXRoIGhlcmUgc2hvdWxkIGJlIGZ1bGwgZGF0YXNldHMgb2YgdW5wYWNrZWQgZGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge30gY2FjaGVcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGFPbkhhbmRsZURhdGEob3B0aW9ucyA9IHt9LCBkYXRhLCBjYWNoZSwgb2xkRGF0YSA9IHt9LCBhcHBCb290c3RyYXBEYXRhKSB7XG4gIHRyeSB7XG5cbiAgICBsZXQgbmV3RGF0YSA9IGRhdGE7XG5cbiAgICAvL1xuICAgIC8vIEJhY2tmaWxsIG5ldyBkYXRhIHdpdGggb2xkIGRhdGFcbiAgICAvL1xuICAgIC8vIE5PVEU6XG4gICAgLy8gV2Ugc3RpbGwgbmVlZCB0byBkbyB0aGlzIGV2ZW4gd2hlbiB3ZSBhcmUgZW1pdHRpbmdcbiAgICAvLyBhIGRpZmYgYmVjYXVzZSB0aGUgd2hvbGUgZGF0YSBzaG91bGQgYmUgYXZhaWxhYmxlIHRvIGJlXG4gICAgLy8gdXNlZCBieSBmdW5jdGlvbnMgbGlrZSBgYWRkQ3J5cHRvaHViRmllbGRzKClgXG4gICAgZm9yIChsZXQgaWQgb2YgT2JqZWN0LmtleXMob2xkRGF0YSkpIHtcbiAgICAgIG5ld0RhdGFbaWRdID0gT2JqZWN0LmFzc2lnbih7fSwgb2xkRGF0YVtpZF0sIG5ld0RhdGFbaWRdKTtcbiAgICAgIGZvciAobGV0IGZpZWxkIG9mIHNldHRpbmdzLmZpZWxkTGFzdFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGREYXRhW2lkXVtmaWVsZF0gIT09IG5ld0RhdGFbaWRdW2ZpZWxkXSkge1xuICAgICAgICAgIG5ld0RhdGFbaWRdW2Ake2ZpZWxkfTpsYXN0YF0gPSBvbGREYXRhW2lkXVtmaWVsZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgY3VzdG9tIGNyeXB0b2h1YiBmaWVsZHNcbiAgICBuZXdEYXRhID0gYWRkQ3J5cHRvaHViRmllbGRzKG9sZERhdGEsIG5ld0RhdGEpO1xuXG4gICAgLy8gU2F2ZSBmaWxlICh0aGUgd2F0Y2hlciB3aWxsIHBpY2sgaXQgdXAgYW5kIGVtaXQgaXQpXG4gICAgY29uc3QgZmlsZU5hbWUgPSBgJHtzZXR0aW5ncy5nZW5lcmF0ZWREaXJ9L2RhdGEvZGF0YS5qc29uYDtcbiAgICBjYWNoZS5zZXQoZmlsZU5hbWUsIEpTT04uc3RyaW5naWZ5KG5ld0RhdGEpKTtcblxuICAgIC8vIENyZWF0ZSBhIGxpc3Qgb2YgeCAoc2V0dGlucy5tYXhSZWNvcmRzU2NyYXBlZCkgc29ydGVkIHN5bWJvbHNcbiAgICAvLyBXZSBhcmUgZG9pbmcgdGhpcyBoZXJlIGFzIHdlIGRvbid0IHRoZSBzb3J0IGNyeXRlcmlhIGJlZm9yZSB0aGlzIHBvaW50XG4gICAgbGV0IGZpcnN0WFN5bWJvbHM7XG4gICAge1xuICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICBjb25zdCBsaW1pdCA9IHNldHRpbmdzLm1heFJlY29yZHNTY3JhcGVkO1xuICAgICAgY29uc3QgZmllbGRWb2wgPSAnY2MtdG90YWwtdm9sLWZ1bGwtVE9UQUxWT0xVTUUyNEhUTyc7XG4gICAgICBjb25zdCBmaWVsZFN5bWJvbCA9ICdjYy1jb2lubGlzdC1TeW1ib2wnO1xuICAgICAgY29uc3QgZmllbGRUcmFkaW5nID0gJ2NjLWNvaW5saXN0LUlzVHJhZGluZyc7XG4gICAgICBsZXQga2V5O1xuICAgICAgbGV0IGl0ZW07XG4gICAgICBmb3IgKFtrZXksIGl0ZW1dIG9mIE9iamVjdC5lbnRyaWVzKG5ld0RhdGEpKSB7XG4gICAgICAgIGlmIChpdGVtW2ZpZWxkVHJhZGluZ10gPT09IGZhbHNlKSB7XG4gICAgICAgICAgZGVsZXRlIG5ld0RhdGFba2V5XVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFpdGVtW2ZpZWxkVm9sXSkge1xuICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IGJbZmllbGRWb2xdIC0gYVtmaWVsZFZvbF0pO1xuICAgICAgZmlyc3RYU3ltYm9scyA9IGFyci5zcGxpY2UoMCwgbGltaXQpLm1hcCh4ID0+IHhbZmllbGRTeW1ib2xdKTtcbiAgICB9XG4gICAgYXBwQm9vdHN0cmFwRGF0YS5maXJzdFhTeW1ib2xzID0gZmlyc3RYU3ltYm9scztcblxuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBkYXRhT25IYW5kbGVEYXRhKCk6ICR7ZXJyb3J9YDtcbiAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSBkZWJ1Z2dlcjtcbiAgICByZXR1cm4ge21lc3NhZ2UsIGVycm9yOiB0cnVlfTtcbiAgfVxufVxuIiwiLy8gQ3J5cHRvaHViXG5jb25zdCBsb2dnZXIgICAgID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5jb25zdCBzZXR0aW5ncyAgID0gcmVxdWlyZSgnLi4vc2V0dGluZ3MnKTtcbmNvbnN0IHNjcmFwZUpTT04gPSByZXF1aXJlKCcuL3NjcmFwZS1qc29uLmpzJyk7XG5cbi8qKlxuICpcbiAqIENPSU5MSVNUXG4gKlxuICogT3JpZ2luYWwgRGF0YVxuICogLS0tLS0tLS0tLS0tLVxuICpcbiAqIEFsZ29yaXRobSAgICAgICAgICAgIDogXCJTSEEyNTZcIlxuICogQnVpbHRPbiAgICAgICAgICAgICAgOiBcIk4vQVwiXG4gKiBDb2luTmFtZSAgICAgICAgICAgICA6IFwiQml0Y29pblwiXG4gKiBGdWxsTmFtZSAgICAgICAgICAgICA6IFwiQml0Y29pbiAoQlRDKVwiXG4gKiBGdWxseVByZW1pbmVkICAgICAgICA6IFwiMFwiXG4gKiBJZCAgICAgICAgICAgICAgICAgICA6IFwiMTE4MlwiXG4gKiBJbWFnZVVybCAgICAgICAgICAgICA6IFwiL21lZGlhLzE5NjMzL2J0Yy5wbmdcIlxuICogSXNUcmFkaW5nICAgICAgICAgICAgOiB0cnVlXG4gKiBOYW1lICAgICAgICAgICAgICAgICA6IFwiQlRDXCJcbiAqIFByZU1pbmVkVmFsdWUgICAgICAgIDogXCJOL0FcIlxuICogUHJvb2ZUeXBlICAgICAgICAgICAgOiBcIlBvV1wiXG4gKiBTbWFydENvbnRyYWN0QWRkcmVzcyA6IFwiTi9BXCJcbiAqIFNvcnRPcmRlciAgICAgICAgICAgIDogXCIxXCJcbiAqIFNwb25zb3JlZCAgICAgICAgICAgIDogZmFsc2VcbiAqIFN5bWJvbCAgICAgICAgICAgICAgIDogXCJCVENcIlxuICogVG90YWxDb2luU3VwcGx5ICAgICAgOiBcIjIxMDAwMDAwXCJcbiAqIFRvdGFsQ29pbnNGcmVlRmxvYXQgIDogXCJOL0FcIlxuICogVXJsICAgICAgICAgICAgICAgICAgOiBcIi9jb2lucy9idGMvb3ZlcnZpZXdcIlxuICpcbiAqIFByZWZpeCBmaWVsZHMgd2l0aCBcImNjLWNvaW5saXN0LVwiXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBbGdvcml0aG0gLT4gY2MtY29pbmxpc3QtQWxnb3JpdGhtXG4gKlxuICogQHBhcmFtIHtTdHJpbmc/fSBkYXRhXG4gKiBAcGFyYW0ge1N0cmluZz99IHRpbWVzdGFtcFxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGFcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gZm9ybWF0dGVyQ3J5cHRvY29tcGFyZUJvb3RzdHJhcChjYWNoZSkge1xuICB0cnkge1xuXG5cbiAgICAvLyBHZXQgY29pbkxpc3RcbiAgICBsZXQgY29pbkxpc3Q7XG4gICAgdHJ5IHtcbiAgICAgIGNvaW5MaXN0ID0gYXdhaXQgc2NyYXBlSlNPTihzZXR0aW5ncy51cmlDcnlwdG9jb21wYXJlTGlzdCwgc2V0dGluZ3Mua2V5Q3J5cHRvY29tcGFyZUxpc3QsIDAsIGNhY2hlKTtcbiAgICAgIGNvaW5MaXN0ID0gdHlwZW9mIGNvaW5MaXN0ID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoY29pbkxpc3QpLkRhdGEgOiBjb2luTGlzdC5EYXRhO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgZm9ybWF0dGVyLWNyeXB0b2NvbXBhcmUtYm9vdHN0cmFwOiBbRXJyb3Igc2NyYXBpbmcgY29pbkxpc3RdIHwgJHtlcnJvcn1gKTtcbiAgICB9XG5cbiAgICAvLyAvLyBHZXQgb2xkIGRhdGFcbiAgICAvLyBsZXQgb2xkRGF0YTtcbiAgICAvLyB0cnkge1xuICAgIC8vICAgY29uc3QgcGF0aCA9IGAke3NldHRpbmdzLmRiRGlyfS9kYXRhL2RhdGEuanNvbmA7XG4gICAgLy8gICBvbGREYXRhID0gSlNPTi5wYXJzZShjYWNoZS5nZXQocGF0aClbMF0pO1xuICAgIC8vICAgZGVidWdnZXI7XG4gICAgLy8gfVxuICAgIC8vIGNhdGNoKGVycm9yKSB7XG4gICAgLy8gICBsb2dnZXIuZXJyb3IoYGZvcm1hdHRlci1jcnlwdG9jb21wYXJlLWJvb3RzdHJhcDogW0Vycm9yIGdldHRpbmcgZmlsZV0gJHtwYXRofSB8ICR7ZXJyb3J9YCk7XG4gICAgLy8gfVxuXG4gICAgLy8gQ3JlYXRlIG1hcHNcbiAgICBjb25zdCBpZFN5bWJvbE1hcCA9IHt9O1xuICAgIGNvbnN0IHN5bWJvbElkTWFwID0ge307XG4gICAgZm9yIChjb25zdCBbc3ltYm9sLCBkYXRhXSBvZiBPYmplY3QuZW50cmllcyhjb2luTGlzdCkpIHtcbiAgICAgIGlkU3ltYm9sTWFwW2RhdGEuSWRdID0gc3ltYm9sO1xuICAgICAgc3ltYm9sSWRNYXBbc3ltYm9sXSA9IGRhdGEuSWQ7XG4gICAgfTtcblxuICAgIHJldHVybiB7IGlkU3ltYm9sTWFwLCBzeW1ib2xJZE1hcCwgY29pbkxpc3QgfTtcblxuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlQm9vdHN0cmFwKCk6ICR7ZXJyb3J9YDtcbiAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgcmV0dXJuIHttZXNzYWdlLCBlcnJvcjogdHJ1ZX07XG4gIH1cbn1cbiIsIi8vIENyeXB0b2h1YlxuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5cbi8qKlxuICpcbiAqIENPSU5MSVNUXG4gKlxuICogT3JpZ2luYWwgRGF0YVxuICogLS0tLS0tLS0tLS0tLVxuICpcbiAqIEFsZ29yaXRobSAgICAgICAgICAgIDogXCJTSEEyNTZcIlxuICogQnVpbHRPbiAgICAgICAgICAgICAgOiBcIk4vQVwiXG4gKiBDb2luTmFtZSAgICAgICAgICAgICA6IFwiQml0Y29pblwiXG4gKiBGdWxsTmFtZSAgICAgICAgICAgICA6IFwiQml0Y29pbiAoQlRDKVwiXG4gKiBGdWxseVByZW1pbmVkICAgICAgICA6IFwiMFwiXG4gKiBJZCAgICAgICAgICAgICAgICAgICA6IFwiMTE4MlwiXG4gKiBJbWFnZVVybCAgICAgICAgICAgICA6IFwiL21lZGlhLzE5NjMzL2J0Yy5wbmdcIlxuICogSXNUcmFkaW5nICAgICAgICAgICAgOiB0cnVlXG4gKiBOYW1lICAgICAgICAgICAgICAgICA6IFwiQlRDXCJcbiAqIFByZU1pbmVkVmFsdWUgICAgICAgIDogXCJOL0FcIlxuICogUHJvb2ZUeXBlICAgICAgICAgICAgOiBcIlBvV1wiXG4gKiBTbWFydENvbnRyYWN0QWRkcmVzcyA6IFwiTi9BXCJcbiAqIFNvcnRPcmRlciAgICAgICAgICAgIDogXCIxXCJcbiAqIFNwb25zb3JlZCAgICAgICAgICAgIDogZmFsc2VcbiAqIFN5bWJvbCAgICAgICAgICAgICAgIDogXCJCVENcIlxuICogVG90YWxDb2luU3VwcGx5ICAgICAgOiBcIjIxMDAwMDAwXCJcbiAqIFRvdGFsQ29pbnNGcmVlRmxvYXQgIDogXCJOL0FcIlxuICogVXJsICAgICAgICAgICAgICAgICAgOiBcIi9jb2lucy9idGMvb3ZlcnZpZXdcIlxuICpcbiAqIFByZWZpeCBmaWVsZHMgd2l0aCBcImNjLWNvaW5saXN0LVwiXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBbGdvcml0aG0gLT4gY2MtY29pbmxpc3QtQWxnb3JpdGhtXG4gKlxuICogQHBhcmFtIHtTdHJpbmc/fSBkYXRhXG4gKiBAcGFyYW0ge1N0cmluZz99IHRpbWVzdGFtcFxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGFcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Db2lubGlzdChkYXRhLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERhdGEsIGFwcEJvb3RzdHJhcERhdGEgPSB7fSkge1xuICB0cnkge1xuXG4gICAgY29uc3QgeyBpZFN5bWJvbE1hcCwgc3ltYm9sSWRNYXAgfSA9IGJvb3RzdHJhcERhdGE7XG4gICAgY29uc3QgcHJlZml4ID0gJ2NjLWNvaW5saXN0LSc7XG4gICAgY29uc3Qgb2JqQWxsQ29pbnMgPSBkYXRhLkRhdGE7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgbGV0IGN1cnJlbnRDb2luT3V0LCBjdXJyZW50Q29pbkluLCBrZXksIHZhbCwgaWQ7XG4gICAgZm9yIChpZCBvZiBPYmplY3Qua2V5cyhpZFN5bWJvbE1hcCkpIHtcbiAgICAgIGN1cnJlbnRDb2luT3V0ID0ge307XG4gICAgICBjdXJyZW50Q29pbkluID0gb2JqQWxsQ29pbnNbaWRTeW1ib2xNYXBbaWRdXTtcbiAgICAgIGlmIChjdXJyZW50Q29pbkluID09PSB2b2lkIDApIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBjb2luTGlzdFdhdGNoZXIuaGFuZGxlcigpOiAke2lkU3ltYm9sTWFwW2lkXX0gaXMgbm90IGluIG9iakFsbENvaW5zYCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yIChba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGN1cnJlbnRDb2luSW4pKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdTb3J0T3JkZXInKSB7XG4gICAgICAgICAgdmFsID0gK3ZhbDsgLy8gTWFrZSBTb3J0T3JkZXIgbnVtZXJpY1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRDb2luT3V0W2Ake3ByZWZpeH0ke2tleX0tdGltZXN0YW1wYF0gPSB0aW1lc3RhbXA7XG4gICAgICAgIGN1cnJlbnRDb2luT3V0W2Ake3ByZWZpeH0ke2tleX1gXSA9IHZhbDtcbiAgICAgICAgaWYgKGtleSA9PT0gJ1NvcnRPcmRlcicgJiYgaXNOYU4oY3VycmVudENvaW5PdXRbYCR7cHJlZml4fSR7a2V5fWBdKSkgZGVidWdnZXI7XG4gICAgICB9XG4gICAgICByZXN1bHRbaWRdID0gY3VycmVudENvaW5PdXQ7XG4gICAgfVxuICAgIC8vIGFwcEJvb3RzdHJhcERhdGEuY29pbkxpc3QgPSByZXN1bHQ7XG4gICAgcmV0dXJuIHtkYXRhOiByZXN1bHQsIHRpbWVzdGFtcH07XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Db2lubGlzdCgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBDcnlwdG9odWJcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuXG4vKipcbiAqXG4gKiBFWENIQU5HRVMgR0VORVJBTFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSAtIHJlc3BvbnNlIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IHRpbWVzdGFtcCAtIHRpbWUgZGF0YSB3YXMgcmVjZWl2ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBib290c3RyYXBEYXRhIC0gbGVnYWN5IGJvb3RzdHJhcCBkYXRhICh3aWxsIGJlIG1lcmdlZCB3aXRoIGFwcEJvb3RzdHJhcERhdGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBhZGRCb290c3RyYXBEYXRhIC0gZGF0YSBzdG9yZSBmb3Igbm9uIHJvdyBkYXRhXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWUgLSBmaWxlIG5hbWUgb2Ygc3RvcmVkIHJlcXVlc3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCAtIHR5cGUgb2YgZXZlbnRcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25FeGNoYW5nZXNHZW5lcmFsKHJlc3BvbnNlLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERhdGEsIGFwcEJvb3RzdHJhcERhdGEsIGZpbGVOYW1lLCBldmVudCkge1xuICB0cnkge1xuXG4gICAgY29uc3QgZW1wdHlSZXR1cm4gPSB7ZGF0YToge30sIHRpbWVzdGFtcH07XG5cbiAgICBpZiAoKCFyZXNwb25zZSAmJiAhcmVzcG9uc2UuRGF0YSkgfHwgcmVzcG9uc2UuUmVzcG9uc2UgIT09ICdTdWNjZXNzJykge1xuICAgICAgcmV0dXJuIGVtcHR5UmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRVhDSEFOR0UgTUFQU1xuICAgICAqXG4gICAgICogcmVzcG9uc2UuRGF0YToge1xuICAgICAqICAgMjQzOToge1xuICAgICAqICAgICBJZDogIFwiMjQzOVwiXG4gICAgICogICAgIE5hbWU6ICBcIktyYWtlblwiXG4gICAgICogICAgIFVybDogXCIvZXhjaGFuZ2VzL2tyYWtlbi9vdmVydmlld1wiXG4gICAgICogICAgIExvZ29Vcmw6IFwiL21lZGlhLzM1MzA5NTYzL2tyYWtlbi5wbmdcIlxuICAgICAqICAgICBJdGVtVHlwZTogQXJyYXkgWzVdXG4gICAgICogICAgIENlbnRyYWxpemF0aW9uVHlwZTogXCJDZW50cmFsaXplZFwiXG4gICAgICogICAgIEludGVybmFsTmFtZTogIFwiS3Jha2VuXCJcbiAgICAgKiAgICAgQWZmaWxpYXRlVXJsOiBcImh0dHBzOi8vd3d3LmtyYWtlbi5jb21cIlxuICAgICAqICAgICBDb3VudHJ5OiBcIlVuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYVwiXG4gICAgICogICAgIE9yZGVyQm9vazogdHJ1ZVxuICAgICAqICAgICBUcmFkZXM6IHRydWVcbiAgICAgKiAgICAgUmVjb21tZW5kZWQ6IGZhbHNlXG4gICAgICogICAgIFNwb25zb3JlZDogZmFsc2VcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBvdXRwdXQ6IHtcbiAgICAgKiAgICdLcmFrZW4nOiAyNDM5LFxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZURhdGFcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXBzKHJlc3BvbnNlRGF0YSkge1xuICAgICAgY29uc3QgbmFtZUlkID0ge307XG4gICAgICBjb25zdCBpZE5hbWUgPSB7fTtcbiAgICAgIGxldCBpZDtcbiAgICAgIGxldCBvYmo7XG4gICAgICBmb3IgKFtpZCwgb2JqXSBvZiBPYmplY3QuZW50cmllcyhyZXNwb25zZURhdGEpKSB7XG4gICAgICAgIG5hbWVJZFtvYmouTmFtZV0gPSBpZDtcbiAgICAgICAgaWROYW1lW2lkXSA9IG9iai5OYW1lO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgbmFtZUlkLCBpZE5hbWUgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEVYQ0hBTkdFIERBVEFcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZURhdGFcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkYXRhKHJlc3BvbnNlRGF0YSkge1xuICAgICAgbGV0IGlkO1xuICAgICAgbGV0IG9iajtcbiAgICAgIGxldCBmaWVsZDtcbiAgICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICAgIGxldCBmaWVsZHMgPSBbXG4gICAgICAgICdJZCcsXG4gICAgICAgICdOYW1lJyxcbiAgICAgICAgJ1VybCcsXG4gICAgICAgICdMb2dvVXJsJyxcbiAgICAgICAgJ0l0ZW1UeXBlJyxcbiAgICAgICAgJ0NlbnRyYWxpemF0aW9uVHlwZScsXG4gICAgICAgICdDb3VudHJ5J1xuICAgICAgXTtcbiAgICAgIGZvciAoW2lkLCBvYmpdIG9mIE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlRGF0YSkpIHtcbiAgICAgICAgb3V0cHV0W2lkXSA9IHt9O1xuICAgICAgICBmb3IgKGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICAgIG91dHB1dFtpZF1bZmllbGRdID0gb2JqW2ZpZWxkXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICBtYXBzOiBtYXBzKHJlc3BvbnNlLkRhdGEpLFxuICAgICAgZGF0YTogZGF0YShyZXNwb25zZS5EYXRhKVxuICAgIH07XG5cbiAgICByZXR1cm4geyBkYXRhOiBvdXRwdXQsIHRpbWVzdGFtcCB9O1xuXG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBjb25zdCBtZXNzYWdlID0gYGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uRXhjaGFuZ2VzR2VuZXJhbCgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBCaW5hcnkgT3ZlcmRvc2VcbmltcG9ydCB7IG9iamVjdEdldE5lc3RlZFByb3BlcnR5IGFzIGdldE5lc3RlZFByb3AgfSBmcm9tICdiby11dGlscyc7XG5cbi8vIENyeXB0b2h1YlxuaW1wb3J0IGxvZ2dlciAgIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi4vc2V0dGluZ3MnO1xuXG4vKipcbiAqXG4gKiBhZGRTeW1ib2xcbiAqXG4gKi9cbmZ1bmN0aW9uIGFkZFN5bWJvbChzeW1ib2xzLCBzeW1ib2wpIHtcbiAgaWYgKCFzeW1ib2xzW3N5bWJvbF0pIHtcbiAgICBzeW1ib2xzW3N5bWJvbF0gPSB7XG4gICAgICBwYWlyczogbmV3IFNldCgpLFxuICAgICAgZXhjaGFuZ2VMaXN0RGV4OiBuZXcgU2V0KCksXG4gICAgICBleGNoYW5nZUxpc3RGaWF0T25seTogbmV3IFNldCgpLFxuICAgICAgZXhjaGFuZ2VMaXN0Q3J5cHRvT25seTogbmV3IFNldCgpLFxuICAgICAgZXhjaGFuZ2VMaXN0QWNjZXB0c0JvdGg6IG5ldyBTZXQoKSxcbiAgICAgIF9maWF0Q3VycmVuY2llczogbmV3IFNldCgpLFxuICAgICAgX2V4Y2hhbmdlc1Jhbms6IDAsXG4gICAgICBfbnVtYmVyT2ZFeGNoYW5nZXM6IDAsXG4gICAgICBfbnVtYmVyT2ZEZXg6IDAsXG4gICAgICBfbnVtYmVyT2ZQYWlyczogMCxcbiAgICAgIF9udW1iZXJPZkZpYXRQYWlyczogMCxcbiAgICAgIF9udW1iZXJPZkZpYXRDdXJyZW5jaWVzOiAwLFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqXG4gKiBhZGRFeGNoYW5nZVxuICpcbiAqL1xuZnVuY3Rpb24gYWRkRXhjaGFuZ2UoZXhjaGFuZ2VzLCBuYW1lLCBpZCkge1xuICBpZiAoIW5hbWUgfHwgIWlkKSAgcmV0dXJuO1xuICBleGNoYW5nZXNbaWRdID0ge1xuICAgIGlkLFxuICAgIG5hbWUsXG4gICAgcGFpcnM6IG5ldyBTZXQoKSxcbiAgICBfY3J5cHRvQ3VycmVuY2llczogbmV3IFNldCgpLFxuICAgIF9maWF0Q3VycmVuY2llczogbmV3IFNldCgpLFxuICAgIF9wb2ludHM6IDAsXG4gICAgX251bWJlck9mUGFpcnM6IDAsXG4gICAgX251bWJlck9mRmlhdFBhaXJzOiAwLFxuICAgIF9udW1iZXJPZkNyeXB0b1BhaXJzOiAwLFxuICAgIF9udW1iZXJPZkN1cnJlbmNpZXM6IDAsXG4gICAgX251bWJlck9mQ3J5cHRvQ3VycmVuY2llczogMCxcbiAgICBfbnVtYmVyT2ZGaWF0Q3VycmVuY2llczogMCxcbiAgfTtcbn1cblxuLyoqXG4gKlxuICogYWRkRXhjaGFuZ2VUb1N5bWJvbFxuICpcbiAqL1xuZnVuY3Rpb24gYWRkRXhjaGFuZ2VUb1N5bWJvbChzeW1ib2xzLCBzeW1ib2wsIGlkLCB0eXBlKSB7XG4gIGlmICghc3ltYm9sIHx8ICFpZCB8fCAhdHlwZSkgcmV0dXJuO1xuICBpZiAodHlwZSA9PT0gJ2ZpYXQnKSAgICAgICAgICAgICAgIHN5bWJvbHNbc3ltYm9sXS5leGNoYW5nZUxpc3RGaWF0T25seS5hZGQoaWQpO1xuICBlbHNlIGlmICh0eXBlID09PSAnRGVjZW50cmFsaXplZCcpIHN5bWJvbHNbc3ltYm9sXS5leGNoYW5nZUxpc3REZXguYWRkKGlkKTtcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ2NyeXB0bycpICAgICAgICBzeW1ib2xzW3N5bWJvbF0uZXhjaGFuZ2VMaXN0Q3J5cHRvT25seS5hZGQoaWQpO1xuICBlbHNlIGlmICh0eXBlID09PSAnYm90aCcpICAgICAgICAgIHN5bWJvbHNbc3ltYm9sXS5leGNoYW5nZUxpc3RBY2NlcHRzQm90aC5hZGQoaWQpO1xufVxuXG4vKipcbiAqXG4gKiBhZGRQYWlyc1RvU3ltYm9sXG4gKlxuICovXG5mdW5jdGlvbiBhZGRQYWlyc1RvU3ltYm9sKHN5bWJvbHMsIHN5bWJvbCwgcGFpcikge1xuICBpZiAoc3ltYm9sc1tzeW1ib2xdKSBzeW1ib2xzW3N5bWJvbF0ucGFpcnMuYWRkKHBhaXIpO1xuICBlbHNlIHtcbiAgICAvL2xvZ2dlci5pbmZvKGBhZGRQYWlyc1RvU3ltYm9sKCk6IGNhbid0IGFkZCBwYWlyICR7cGFpcn0gdG8gc3ltYm9sICR7c3ltYm9sfWApO1xuICB9XG59XG5cbi8qKlxuICpcbiAqIGFkZFBhaXJzVG9FeGNoYW5nZVxuICpcbiAqL1xuZnVuY3Rpb24gYWRkUGFpcnNUb0V4Y2hhbmdlKGV4Y2hhbmdlcywgaWQsIHBhaXIpIHtcbiAgaWYgKGV4Y2hhbmdlc1tpZF0pIGV4Y2hhbmdlc1tpZF0ucGFpcnMuYWRkKHBhaXIpO1xuICBlbHNlIHtcbiAgICAvLyBsb2dnZXIuaW5mbyhgYWRkUGFpcnNUb0V4Y2hhbmdlKCk6IGNhbid0IGFkZCBwYWlyICR7cGFpcn0gdG8gZXhjaGFuZ2UgaWQgJHtpZH1gKTtcbiAgfVxufVxuXG4vLyBUT0RPOiB2YWw/XG4vLyBmdW5jdGlvbiBhZGRDcnlwdG9Wb2x1bWUoY3VycmVuY3lDb2Rlcywgc3ltYm9sMSwgc3ltYm9sMikge1xuLy8gICBpZiAoIShjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDIpIHx8IGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMSkpKSB7XG4vLyAgICAgLy8gRm9yIGVhY2ggcGFpciByZWNvcmQgdGhlIHZvbHVtZSBpbiBlYWNoIGN1cnJlbmN5XG4vLyAgICAgaWYgKCFjcnlwdG9Wb2x1bWVbc3ltYm9sMV0pICAgICAgICAgIGNyeXB0b1ZvbHVtZVtzeW1ib2wxXSAgICAgICAgICA9IHt9O1xuLy8gICAgIGlmICghY3J5cHRvVm9sdW1lW3N5bWJvbDJdKSAgICAgICAgICBjcnlwdG9Wb2x1bWVbc3ltYm9sMl0gICAgICAgICAgPSB7fTtcbi8vICAgICBpZiAoIWNyeXB0b1ZvbHVtZVtzeW1ib2wxXVtzeW1ib2wyXSkgY3J5cHRvVm9sdW1lW3N5bWJvbDFdW3N5bWJvbDJdID0gMDtcbi8vICAgICBpZiAoIWNyeXB0b1ZvbHVtZVtzeW1ib2wyXVtzeW1ib2wxXSkgY3J5cHRvVm9sdW1lW3N5bWJvbDJdW3N5bWJvbDFdID0gMDtcbi8vICAgICBjcnlwdG9Wb2x1bWVbc3ltYm9sMV1bc3ltYm9sMl0gKz0gdmFsLlZPTFVNRTI0SE9VUlRPO1xuLy8gICAgIGNyeXB0b1ZvbHVtZVtzeW1ib2wyXVtzeW1ib2wxXSArPSB2YWwuVk9MVU1FMjRIT1VSO1xuLy8gICB9XG4vLyB9XG5cbi8vIFRPRE86IHZhbD9cbi8vIGZ1bmN0aW9uIGFkZEZpYXRWb2x1bWUoY3VycmVuY3lDb2Rlcywgc3ltYm9sMSwgc3ltYm9sMikge1xuLy8gICBpZiAoY3VycmVuY3lDb2Rlcy5pbmNsdWRlcyhzeW1ib2wyKSkge1xuLy8gICAgIGlmICghZmlhdFZvbHVtZVtzeW1ib2wxXSkgICAgICAgICAgZmlhdFZvbHVtZVtzeW1ib2wxXSAgICAgICAgICA9IHt9O1xuLy8gICAgIGlmICghZmlhdFZvbHVtZVtzeW1ib2wxXVtzeW1ib2wyXSkgZmlhdFZvbHVtZVtzeW1ib2wxXVtzeW1ib2wyXSA9IDA7XG4vLyAgICAgZmlhdFZvbHVtZVtzeW1ib2wxXVtzeW1ib2wyXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKz0gdmFsLlZPTFVNRTI0SE9VUlRPO1xuLy8gICB9XG4vLyAgIGlmIChjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDEpKSB7XG4vLyAgICAgaWYgKCFmaWF0Vm9sdW1lW3N5bWJvbDJdKSAgICAgICAgICBmaWF0Vm9sdW1lW3N5bWJvbDJdICAgICAgICAgID0ge307XG4vLyAgICAgaWYgKCFmaWF0Vm9sdW1lW3N5bWJvbDJdW3N5bWJvbDFdKSBmaWF0Vm9sdW1lW3N5bWJvbDJdW3N5bWJvbDFdID0gMDtcbi8vICAgICBmaWF0Vm9sdW1lW3N5bWJvbDJdW3N5bWJvbDFdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArPSB2YWwuVk9MVU1FMjRIT1VSO1xuLy8gICB9XG4vLyB9XG5cbi8qKlxuICpcbiAqIEVYQ0hBTkdFU1xuICpcbiAqIEZvcm1hdCBhbmQgc2F2ZSBleGNoYW5nZSBkYXRhIHRvIGFwcEJvb3RzdHJhcERhdGEgYW5kIHJldHVyblxuICogZXhjaGFuZ2UgZGF0YSBmb3Igc3ltYm9scyB0byBiZSBtZXJnZWQgd2l0aCB0aGUgbWFpbiBkYXRhc2V0XG4gKlxuICogT3JpZ2luYWwgZXhjaGFuZ2VzIGRhdGEgaXMgaW4gdGhlIGJlbG93IGZvcm1hdDpcbiAqXG4gKiBgYGBcbiAqICAgRGF0YToge1xuICogICAgIEtyYWtlbjoge1xuICogICAgICAgcGFpcnM6IHtcbiAqICAgICAgICAgZXRjOiBbYnRjLCBldGhdLFxuICogICAgICAgICBwb3dyOiBbYnRjLCBldGhdXG4gKiAgICAgICB9XG4gKiAgICAgfVxuICogICB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSByZXNwb25zZSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aW1lc3RhbXAgLSB0aW1lIGRhdGEgd2FzIHJlY2VpdmVkXG4gKiBAcGFyYW0ge09iamVjdH0gYm9vdHN0cmFwRGF0YSAtIGxlZ2FjeSBib290c3RyYXAgZGF0YSAod2lsbCBiZSBtZXJnZWQgd2l0aCBhcHBCb290c3RyYXBEYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gYWRkQm9vdHN0cmFwRGF0YSAtIGRhdGEgc3RvcmUgZm9yIG5vbiByb3cgZGF0YVxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVOYW1lIC0gZmlsZSBuYW1lIG9mIHN0b3JlZCByZXF1ZXN0XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgLSB0eXBlIG9mIGV2ZW50XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvbkV4Y2hhbmdlc0xpc3QocmVzcG9uc2UsIHRpbWVzdGFtcCwgYm9vdHN0cmFwRGF0YSwgYXBwQm9vdHN0cmFwRGF0YSwgZmlsZU5hbWUsIGV2ZW50LCBjYWNoZSkge1xuICB0cnkge1xuXG4gICAgY29uc3QgZW1wdHlSZXR1cm4gPSB7ZGF0YToge30sIHRpbWVzdGFtcH07XG4gICAgY29uc3Qgc3RvcmUgPSBKU09OLnBhcnNlKGNhY2hlLmdldChgJHtzZXR0aW5ncy5kYkRpcn0vc3RvcmUvZGF0YS5qc29uYClbMF0pO1xuICAgIGNvbnN0IG1hcE5hbWVJZCA9IGdldE5lc3RlZFByb3Aoc3RvcmUsICdleGNoYW5nZS1tYXAtbmFtZUlkJyk7XG5cbiAgICBpZiAoIWFwcEJvb3RzdHJhcERhdGEuY3VycmVuY3kgfHwgIW1hcE5hbWVJZCB8fCAoIXJlc3BvbnNlICYmICFyZXNwb25zZS5EYXRhKSB8fCByZXNwb25zZS5SZXNwb25zZSAhPT0gJ1N1Y2Nlc3MnKSB7XG4gICAgICByZXR1cm4gZW1wdHlSZXR1cm47XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBTVEVQIDE6IEV4dHJhY3QgZGF0YSBpbnRvIHRoZSBiZWxvdyAyIG9iamVjdCBzdHJ1Y3R1cmVzXG4gICAgLy9cbiAgICAvLyBzeW1ib2xzOiB7XG4gICAgLy8gICBidGM6IHtcbiAgICAvLyAgICAgZXhjaGFuZ2VzTGlzdDogWzEyMzQsIDQzMjJdLFxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGV4Y2hhbmdlczoge1xuICAgIC8vICAgMTIzNDoge1xuICAgIC8vICAgICBwYWlyczoge2J0YzogW2V0aCwgbHRjXX0sXG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8vXG5cbiAgICBjb25zdCBzeW1ib2xzID0ge307XG4gICAgY29uc3QgZXhjaGFuZ2VzID0ge307XG4gICAgLy8gY29uc3QgZmlhdFZvbHVtZSA9IHt9O1xuICAgIC8vIGNvbnN0IGNyeXB0b1ZvbHVtZSA9IHt9O1xuXG4gICAgbGV0IGRhdGE7XG4gICAgbGV0IGxpc3Q7XG4gICAgbGV0IHBhaXI7XG4gICAgbGV0IHN5bWJvbDE7XG4gICAgbGV0IHN5bWJvbDI7XG4gICAgbGV0IGV4Y2hhbmdlSWQ7XG4gICAgbGV0IGV4Y2hhbmdlTmFtZTtcbiAgICBsZXQgY2VudHJhbGl6YXRpb25UeXBlO1xuICAgIGNvbnN0IGV4Y2x1ZGUweFN5bWJvbHMgPSB0cnVlO1xuXG4gICAgZm9yIChbZXhjaGFuZ2VOYW1lLCBkYXRhXSBvZiBPYmplY3QuZW50cmllcyhyZXNwb25zZS5EYXRhKSkge1xuICAgICAgZXhjaGFuZ2VJZCA9IG1hcE5hbWVJZFtleGNoYW5nZU5hbWVdO1xuICAgICAgY2VudHJhbGl6YXRpb25UeXBlID0gZ2V0TmVzdGVkUHJvcChzdG9yZSwgYGV4Y2hhbmdlcy4ke2V4Y2hhbmdlSWR9LkNlbnRyYWxpemF0aW9uVHlwZWApO1xuICAgICAgaWYgKCFkYXRhLmlzX2FjdGl2ZSkgY29udGludWU7XG4gICAgICBpZiAoIWV4Y2hhbmdlc1tleGNoYW5nZUlkXSkgYWRkRXhjaGFuZ2UoZXhjaGFuZ2VzLCBleGNoYW5nZU5hbWUsIGV4Y2hhbmdlSWQpO1xuICAgICAgZGF0YSA9IGRhdGEucGFpcnM7XG5cbiAgICAgIGZvciAoW3N5bWJvbDEsIGxpc3RdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgICAgIGlmIChzeW1ib2wxLnN0YXJ0c1dpdGgoJzB4JykgJiYgZXhjbHVkZTB4U3ltYm9scykgY29udGludWU7XG4gICAgICAgIGFkZFN5bWJvbChzeW1ib2xzLCBzeW1ib2wxKTtcbiAgICAgICAgaWYgKGNlbnRyYWxpemF0aW9uVHlwZSA9PT0gJ0RlY2VudHJhbGl6ZWQnKSB7XG4gICAgICAgICAgYWRkRXhjaGFuZ2VUb1N5bWJvbChzeW1ib2xzLCBzeW1ib2wxLCBleGNoYW5nZUlkLCBjZW50cmFsaXphdGlvblR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoc3ltYm9sMiBvZiBPYmplY3QudmFsdWVzKGxpc3QpKSB7XG4gICAgICAgICAgaWYgKHN5bWJvbDIuc3RhcnRzV2l0aCgnMHgnKSAmJiBleGNsdWRlMHhTeW1ib2xzKSBjb250aW51ZTtcbiAgICAgICAgICBwYWlyID0gYCR7c3ltYm9sMX0sJHtzeW1ib2wyfWA7XG4gICAgICAgICAgYWRkU3ltYm9sKHN5bWJvbHMsIHN5bWJvbDIpO1xuICAgICAgICAgIGlmIChjZW50cmFsaXphdGlvblR5cGUgPT09ICdEZWNlbnRyYWxpemVkJykge1xuICAgICAgICAgICAgYWRkRXhjaGFuZ2VUb1N5bWJvbChzeW1ib2xzLCBzeW1ib2wxLCBleGNoYW5nZUlkLCBjZW50cmFsaXphdGlvblR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRQYWlyc1RvRXhjaGFuZ2UoZXhjaGFuZ2VzLCBleGNoYW5nZUlkLCBwYWlyKTtcbiAgICAgICAgICBhZGRQYWlyc1RvU3ltYm9sKHN5bWJvbHMsIHN5bWJvbDEsIHBhaXIpO1xuICAgICAgICAgIGFkZFBhaXJzVG9TeW1ib2woc3ltYm9scywgc3ltYm9sMiwgcGFpcik7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBTVEVQIDI6IFdpdGggdGhlIGRhdGEgY29sbGVjdGVkIHdlIGNhbiBub3cgYW5ub3RhdGUgaXRcbiAgICAvLyAgICAgICAgIHdpdGggYWRkaXRpb25hbCBtZXRyaWNzIGFzIGJlbG93XG4gICAgLy9cbiAgICAvLyBzeW1ib2xzOiB7XG4gICAgLy8gICBidGM6IHtcbiAgICAvLyAgICAgZXhjaGFuZ2VzTGlzdDogWzEyMzQsIDQzMjJdLFxuICAgIC8vICAgICBwYWlyczogWydldGgsbHRjJ10sXG4gICAgLy8gICAgIF9maWF0Q3VycmVuY2llczogW3VzZCwgZXVyXSxcbiAgICAvLyAgICAgX2V4Y2hhZ25lc1Jhbms6IDg3LFxuICAgIC8vICAgICBfbnVtYmVyT2ZGaWF0Q3VycmVuY2llczogMixcbiAgICAvLyAgICAgX251bWJlck9mRXhjaGFuZ2VzOiAzMyxcbiAgICAvLyAgICAgX251bWJlck9mUGFpcnM6IDEyMyxcbiAgICAvLyAgICAgX251bWJlck9mRmlhdFBhaXJzOiAzMVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyBleGNoYW5nZXM6IHtcbiAgICAvLyAxMjM0OiB7XG4gICAgLy8gICAgIHBhaXJzOiBbJ2V0aCxsdGMnXSxcbiAgICAvLyAgICAgX3BvaW50czogODQsXG4gICAgLy8gICAgIF9maWF0Q3VycmVuY2llczogW3VzZCwgZXVyXSxcbiAgICAvLyAgICAgX2NyeXB0b0N1cnJlbmNpZXM6IFtidGMsIGx0Y10sXG4gICAgLy8gICAgIF9udW1iZXJPZkZpYXRDdXJyZW5jaWVzOiAyLFxuICAgIC8vICAgICBfbnVtYmVyT2ZTeW1ib2xkOiAzNCxcbiAgICAvLyAgICAgX251bWJlck9mUGFpcnM6IDMyLFxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvL1xuXG4gICAgbGV0IG9iajtcbiAgICBjb25zdCBjdXJyZW5jeUNvZGVzID0gT2JqZWN0LmtleXMoYXBwQm9vdHN0cmFwRGF0YS5jdXJyZW5jeSkgfHwgW107XG5cbiAgICAvLyBTeW1ib2xzXG4gICAgZm9yIChvYmogb2YgT2JqZWN0LnZhbHVlcyhzeW1ib2xzKSkge1xuICAgICAgb2JqLl9udW1iZXJPZlBhaXJzID0gb2JqLnBhaXJzLnNpemU7XG4gICAgICBmb3IgKHBhaXIgb2Ygb2JqLnBhaXJzLnZhbHVlcygpKSB7XG4gICAgICAgIFtzeW1ib2wxLCBzeW1ib2wyXSA9IHBhaXIuc3BsaXQoJywnKTtcblxuICAgICAgICAvLyBhZGQgdG8gX2ZpYXRDdXJyZW5jaWVzIG9yIF9jcnlwdG9DdXJyZW5jaWVzXG4gICAgICAgIGlmIChjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDEpKSBvYmouX2ZpYXRDdXJyZW5jaWVzLmFkZChzeW1ib2wxKTtcbiAgICAgICAgaWYgKGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMikpIG9iai5fZmlhdEN1cnJlbmNpZXMuYWRkKHN5bWJvbDIpO1xuXG4gICAgICAgIGlmIChjdXJyZW5jeUNvZGVzLmluY2x1ZGVzKHN5bWJvbDEpIHx8IGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMikpIHtcbiAgICAgICAgICBvYmouX251bWJlck9mRmlhdFBhaXJzKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9iai5fbnVtYmVyT2ZGaWF0Q3VycmVuY2llcyA9IG9iai5fZmlhdEN1cnJlbmNpZXMuc2l6ZTtcbiAgICAgIC8vIF9leGNoYW5nZXNSYW5rXG4gICAgfVxuXG4gICAgLy8gRXhjaGFuZ2VzXG4gICAgZm9yIChvYmogb2YgT2JqZWN0LnZhbHVlcyhleGNoYW5nZXMpKSB7XG5cbiAgICAgIGZvciAocGFpciBvZiBvYmoucGFpcnMudmFsdWVzKCkpIHtcblxuICAgICAgICBbc3ltYm9sMSwgc3ltYm9sMl0gPSBwYWlyLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgaWYgKGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMSkgfHwgY3VycmVuY3lDb2Rlcy5pbmNsdWRlcyhzeW1ib2wyKSkge1xuICAgICAgICAgIG9iai5fbnVtYmVyT2ZGaWF0UGFpcnMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0byBfZmlhdEN1cnJlbmNpZXMgb3IgX2NyeXB0b0N1cnJlbmNpZXNcbiAgICAgICAgaWYgKGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMSkpIG9iai5fZmlhdEN1cnJlbmNpZXMuYWRkKHN5bWJvbDEpO1xuICAgICAgICBlbHNlIG9iai5fY3J5cHRvQ3VycmVuY2llcy5hZGQoc3ltYm9sMSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbmN5Q29kZXMuaW5jbHVkZXMoc3ltYm9sMikpIG9iai5fZmlhdEN1cnJlbmNpZXMuYWRkKHN5bWJvbDIpO1xuICAgICAgICBlbHNlIG9iai5fY3J5cHRvQ3VycmVuY2llcy5hZGQoc3ltYm9sMik7XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gTmVlZCBwZXIgZXhjaGFuZ2Ugdm9sdW1lIHRvIGRvIHRoaXMuIExvb2tzIGxpa2UgdG9vIG1hbnkgcmVxdWVzdHNcbiAgICAgICAgLy8gd2l0aCB0aGUgY3VycmVudCBBUEkgc2V0dXBcbiAgICAgICAgLy9cbiAgICAgICAgLy8gYWRkQ3J5cHRvVm9sdW1lKGN1cnJlbmN5Q29kZXMsIHN5bWJvbDEsIHN5bWJvbDIpO1xuICAgICAgICAvLyBhZGRGaWF0Vm9sdW1lKGN1cnJlbmN5Q29kZXMsIHN5bWJvbDEsIHN5bWJvbDIpO1xuXG4gICAgICB9XG4gICAgICBvYmouX251bWJlck9mRmlhdEN1cnJlbmNpZXMgPSBvYmouX2ZpYXRDdXJyZW5jaWVzLnNpemU7XG4gICAgICBvYmouX251bWJlck9mQ3J5cHRvQ3VycmVuY2llcyA9IG9iai5fY3J5cHRvQ3VycmVuY2llcy5zaXplO1xuICAgICAgb2JqLl9udW1iZXJPZkN1cnJlbmNpZXMgPSBvYmouX251bWJlck9mRmlhdEN1cnJlbmNpZXMgKyBvYmouX251bWJlck9mQ3J5cHRvQ3VycmVuY2llcztcblxuICAgICAgb2JqLl9udW1iZXJPZlBhaXJzID0gb2JqLnBhaXJzLnNpemU7XG4gICAgICBvYmouX251bWJlck9mQ3J5cHRvUGFpcnMgPSBvYmouX251bWJlck9mUGFpcnMgLSBvYmouX251bWJlck9mRmlhdFBhaXJzO1xuXG4gICAgfVxuXG4gICAgLy8gRXhjaGFuZ2VzIHBhcnQgMlxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgY2FsY3VsYXRlZCB3aGljaCBleGNoYW5nZXMgaGF2ZSBmaWF0IC8gY3J5cHRvIHBhaXJzIGFkZCB0aGlzIGRhdGFcbiAgICBsZXQgaGFzRmlhdDtcbiAgICBsZXQgaGFzQ3J5cHRvO1xuICAgIGZvciAoW2V4Y2hhbmdlSWQsIG9ial0gb2YgT2JqZWN0LmVudHJpZXMoZXhjaGFuZ2VzKSkge1xuXG4gICAgICBmb3IgKHBhaXIgb2Ygb2JqLnBhaXJzLnZhbHVlcygpKSB7XG5cbiAgICAgICAgW3N5bWJvbDEsIHN5bWJvbDJdID0gcGFpci5zcGxpdCgnLCcpO1xuXG4gICAgICAgIGhhc0ZpYXQgPSBoYXNDcnlwdG8gPSBmYWxzZTtcbiAgICAgICAgaWYgKG9iai5fbnVtYmVyT2ZGaWF0Q3VycmVuY2llcykgaGFzRmlhdCA9IHRydWU7XG4gICAgICAgIGlmIChvYmouX251bWJlck9mQ3J5cHRvQ3VycmVuY2llcykgaGFzQ3J5cHRvID0gdHJ1ZTtcblxuICAgICAgICBpZiAoaGFzRmlhdCAmJiBoYXNDcnlwdG8pIGFkZEV4Y2hhbmdlVG9TeW1ib2woc3ltYm9scywgc3ltYm9sMSwgZXhjaGFuZ2VJZCwgJ2JvdGgnKTtcbiAgICAgICAgZWxzZSBpZiAoaGFzQ3J5cHRvKSAgICAgICBhZGRFeGNoYW5nZVRvU3ltYm9sKHN5bWJvbHMsIHN5bWJvbDEsIGV4Y2hhbmdlSWQsICdjcnlwdG8nKTtcbiAgICAgICAgZWxzZSBpZiAoaGFzRmlhdCkgICAgICAgICBhZGRFeGNoYW5nZVRvU3ltYm9sKHN5bWJvbHMsIHN5bWJvbDEsIGV4Y2hhbmdlSWQsICdmaWF0Jyk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFN5bWJvbHMgcGFydCAyXG4gICAgZm9yIChvYmogb2YgT2JqZWN0LnZhbHVlcyhzeW1ib2xzKSkge1xuICAgICAgb2JqLl9udW1iZXJPZkV4Y2hhbmdlcyA9IG9iai5leGNoYW5nZUxpc3RGaWF0T25seS5zaXplICsgb2JqLmV4Y2hhbmdlTGlzdENyeXB0b09ubHkuc2l6ZSArIG9iai5leGNoYW5nZUxpc3RBY2NlcHRzQm90aC5zaXplO1xuICAgICAgb2JqLl9udW1iZXJPZkRleCA9IG9iai5leGNoYW5nZUxpc3REZXguc2l6ZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIFN0ZXAgMzogU2F2ZSBleGNoYW5nZSBkYXRhIHRvIGNvcmUgZGF0YXNldFxuICAgIC8vXG4gICAgLy8gZGF0YToge1xuICAgIC8vICAgMTE4Mjoge1xuICAgIC8vICAgICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3RGaWF0T25seSc6IFtdLFxuICAgIC8vICAgICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3RDcnlwdG9Pbmx5JzogWydCaW5hbmNlJ10sXG4gICAgLy8gICAgICdjcnlwdG9odWItZXhjaGFuZ2VzTGlzdEFjY2VwdHNCb3RoJzogWydLcmFrZW4nXSxcbiAgICAvLyAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkZpYXRDdXJyZW5jaWVzJzogMzIsXG4gICAgLy8gICAgICdjcnlwdG9odWItbnVtYmVyT2ZGaWF0Q3VycmVuY2llcy10aW1lc3RhbXAnOiAxNTUwNjk2OTE5OTc4LFxuICAgIC8vICAgICAnY3J5cHRvaHViLW51bWJlck9mRXhjaGFuZ2VzJzogMjMsXG4gICAgLy8gICAgICdjcnlwdG9odWItbnVtYmVyT2ZFeGNoYW5nZXMtdGltZXN0YW1wJzogMTU1MDY5NjkxOTk3OCxcbiAgICAvLyAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZlBhaXJzJzogNCxcbiAgICAvLyAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZlBhaXJzLXRpbWVzdGFtcCc6IDE1NTA2OTY5MTk5NzgsXG4gICAgLy8gICAgICdjcnlwdG9odWItbnVtYmVyT2ZGaWF0UGFpcnMnOiAzLFxuICAgIC8vICAgICAnY3J5cHRvaHViLW51bWJlck9mRmlhdFBhaXJzLXRpbWVzdGFtcCc6IDE1NTA2OTY5MTk5NzhcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLy9cbiAgICBmdW5jdGlvbiBoYW5kbGVEYXRhKHRpbWVzdGFtcCkge1xuXG4gICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICBjb25zdCBtYXAgPSBib290c3RyYXBEYXRhWydzeW1ib2xJZE1hcCddO1xuICAgICAgaWYgKGJvb3RzdHJhcERhdGEuY29pbkxpc3QpIHtcbiAgICAgICAgY29uc3QgY29pbkxpc3QgPSBib290c3RyYXBEYXRhLmNvaW5MaXN0O1xuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGxldCBzeW1ib2w7XG4gICAgICAgIGZvciAoW3N5bWJvbF0gb2YgT2JqZWN0LmVudHJpZXMoY29pbkxpc3QpKSB7XG4gICAgICAgICAgaWYgKHN5bWJvbHNbc3ltYm9sXSkge1xuICAgICAgICAgICAgaWQgPSBtYXBbc3ltYm9sXTtcbiAgICAgICAgICAgIHJlc3VsdFtpZF0gPSB7XG5cbiAgICAgICAgICAgICAgLy8gJ2NyeXB0b2h1Yi1wYWlycyc6IHN5bWJvbHNbc3ltYm9sXS5wYWlycyxcbiAgICAgICAgICAgICAgLy8gJ2NyeXB0b2h1Yi1maWF0Q3VycmVuY2llcyc6IHN5bWJvbHNbc3ltYm9sXS5fZmlhdEN1cnJlbmNpZXMsXG4gICAgICAgICAgICAgIC8vICdjcnlwdG9odWItZXhjaGFnbmVzUmFuayc6IHN5bWJvbHNbc3ltYm9sXS5fZXhjaGFnbmVzUmFuayxcblxuICAgICAgICAgICAgICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3REZXgnOiBBcnJheS5mcm9tKHN5bWJvbHNbc3ltYm9sXS5leGNoYW5nZUxpc3REZXgpLFxuICAgICAgICAgICAgICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3RGaWF0T25seSc6IEFycmF5LmZyb20oc3ltYm9sc1tzeW1ib2xdLmV4Y2hhbmdlTGlzdEZpYXRPbmx5KSxcbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1leGNoYW5nZXNMaXN0Q3J5cHRvT25seSc6IEFycmF5LmZyb20oc3ltYm9sc1tzeW1ib2xdLmV4Y2hhbmdlTGlzdENyeXB0b09ubHkpLFxuICAgICAgICAgICAgICAnY3J5cHRvaHViLWV4Y2hhbmdlc0xpc3RBY2NlcHRzQm90aCc6IEFycmF5LmZyb20oc3ltYm9sc1tzeW1ib2xdLmV4Y2hhbmdlTGlzdEFjY2VwdHNCb3RoKSxcblxuICAgICAgICAgICAgICAnY3J5cHRvaHViLW51bWJlck9mRmlhdEN1cnJlbmNpZXMnOiBzeW1ib2xzW3N5bWJvbF0uX251bWJlck9mRmlhdEN1cnJlbmNpZXMsXG4gICAgICAgICAgICAgICdjcnlwdG9odWItbnVtYmVyT2ZGaWF0Q3VycmVuY2llcy10aW1lc3RhbXAnOiB0aW1lc3RhbXAsXG5cbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkV4Y2hhbmdlcyc6IHN5bWJvbHNbc3ltYm9sXS5fbnVtYmVyT2ZFeGNoYW5nZXMsXG4gICAgICAgICAgICAgICdjcnlwdG9odWItbnVtYmVyT2ZFeGNoYW5nZXMtdGltZXN0YW1wJzogdGltZXN0YW1wLFxuXG4gICAgICAgICAgICAgICdjcnlwdG9odWItbnVtYmVyT2ZQYWlycyc6IHN5bWJvbHNbc3ltYm9sXS5fbnVtYmVyT2ZQYWlycyxcbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZlBhaXJzLXRpbWVzdGFtcCc6IHRpbWVzdGFtcCxcblxuICAgICAgICAgICAgICAnY3J5cHRvaHViLW51bWJlck9mRmlhdFBhaXJzJzogc3ltYm9sc1tzeW1ib2xdLl9udW1iZXJPZkZpYXRQYWlycyxcbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkZpYXRQYWlycy10aW1lc3RhbXAnOiB0aW1lc3RhbXAsXG5cbiAgICAgICAgICAgICAgJ2NyeXB0b2h1Yi1udW1iZXJPZkRleCc6IHN5bWJvbHNbc3ltYm9sXS5fbnVtYmVyT2ZFeGNoYW5nZXMsXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7ZGF0YTogcmVzdWx0LCB0aW1lc3RhbXB9O1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RvcmUodGltZXN0YW1wKSB7XG4gICAgICByZXR1cm4ge2RhdGE6IHtkYXRhOiBleGNoYW5nZXN9LCB0aW1lc3RhbXB9O1xuICAgIH1cblxuICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICByZXR1cm4gaGFuZGxlRGF0YSh0aW1lc3RhbXApIHx8IGVtcHR5UmV0dXJuO1xuICAgICAgY2FzZSAnc3RvcmUnOlxuICAgICAgICByZXR1cm4gaGFuZGxlU3RvcmUodGltZXN0YW1wKSB8fCBlbXB0eVJldHVybjtcbiAgICB9XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25FeGNoYW5nZXNMaXN0KCk6ICR7ZXJyb3J9YDtcbiAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgcmV0dXJuIHttZXNzYWdlLCBlcnJvcjogdHJ1ZX07XG4gIH1cbn1cbiIsIi8vIENyeXB0b2h1YlxuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5cbi8qKlxuICpcbiAqIFBSSUNFXG4gKlxuICogT3JpZ2luYWwgRGF0YVxuICogLS0tLS0tLS0tLS0tLVxuICpcbiAqIFRZUEU6ICBcIjVcIlxuICogTUFSS0VUOiAgXCJDQ0NBR0dcIlxuICogRlJPTVNZTUJPTDogIFwiQlRDXCJcbiAqIFRPU1lNQk9MOiAgXCJVU0RcIlxuICogRkxBR1M6ICBcIjRcIlxuICogUFJJQ0U6IDY0MjkuNDlcbiAqIExBU1RVUERBVEU6IDE1MzYyMjI3MjJcbiAqIExBU1RWT0xVTUU6IDAuMDA1XG4gKiBMQVNUVk9MVU1FVE86IDMyLjEyNDU5MjVcbiAqIExBU1RUUkFERUlEOiAgXCIyOTAzMzI1NzBcIlxuICogVk9MVU1FREFZOiA3MzMzMS42Mjg0NjQzMTYwOVxuICogVk9MVU1FREFZVE86IDQ3MzIxNDQxMy4zNDA3ODE4XG4gKiBWT0xVTUUyNEhPVVI6IDE2NDU0Mi45NzcyNTI3NjA0NFxuICogVk9MVU1FMjRIT1VSVE86IDExMTU1ODY0NjIuMjk1NTQ5XG4gKiBPUEVOREFZOiA2NzA1LjAzXG4gKiBISUdIREFZOiA2NzI3LjE5XG4gKiBMT1dEQVk6IDYyOTUuMTFcbiAqIE9QRU4yNEhPVVI6IDczODUuNTVcbiAqIEhJR0gyNEhPVVI6IDczODguMTVcbiAqIExPVzI0SE9VUjogNjI4OS45M1xuICogTEFTVE1BUktFVDogIFwiQml0ZmluZXhcIlxuICogQ0hBTkdFMjRIT1VSOiAtOTU2LjA2MDAwMDAwMDAwMDRcbiAqIENIQU5HRVBDVDI0SE9VUjogLTEyLjk0NTAwNzQ4MDgyNDA0OFxuICogQ0hBTkdFREFZOiAtMjc1LjUzOTk5OTk5OTk5OTk2XG4gKiBDSEFOR0VQQ1REQVk6IC00LjEwOTQ1MjE1NzU1OTMyNFxuICogU1VQUExZOiAxNzI1MjEwMFxuICogTUtUQ0FQOiAxMTA5MjIyMDQ0MjlcbiAqIFRPVEFMVk9MVU1FMjRIOiA0NzE3NjkuODQyNDAxNDM0ODRcbiAqIFRPVEFMVk9MVU1FMjRIVE86IDMwOTA4OTg1MTkuNTAwMjk5NVxuICogSU1BR0VVUkw6IFwiL21lZGlhLzE5NjMzL2J0Yy5wbmdcIlxuICpcbiAqIFByZWZpeCBmaWVsZHMgd2l0aCBcImNjLXByaWNlLVwiXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQUklDRSAtPiBjYy1wcmljZS1QUklDRVxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHByaWNlIGlzIGFuIGFycmF5IG9mIHRoZSByZXNwb25zZXMgb2YgYmF0Y2hlZCBjcnlwdG9jb21wYXJlIGFwaSBwcmljZSBkYXRhXG4gKiBAcGFyYW0ge1N0cmluZ30gdGltZXN0YW1wXG4gKiBAcGFyYW0ge09iamVjdH0gYm9vdHN0cmFwRGF0YVxuICogQHJldHVybiB7T2JqZWN0fVxuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvblByaWNlKHByaWNlLCB0aW1lc3RhbXAsIGJvb3RzdHJhcERhdGEpIHtcbiAgdHJ5IHtcblxuICAgIGxldCBpO1xuICAgIGxldCBpZDtcbiAgICBsZXQgdmFsO1xuICAgIGxldCBmaWVsZDtcbiAgICBsZXQgc3ltYm9sO1xuICAgIGxldCBmRGF0YSA9IHt9O1xuICAgIGxldCBiYXRjaFJlcXVlc3REYXRhO1xuICAgIGNvbnN0IHByZWZpeCA9ICdjYy1wcmljZS0nO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwcmljZSkpIHByaWNlID0gW3ByaWNlXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgcHJpY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJhdGNoUmVxdWVzdERhdGEgPSBwcmljZVtpXS5SQVc7XG4gICAgICBpZiAoIXByaWNlW2ldLlJBVykge1xuICAgICAgICBjb25zdCB3YXJuaW5nID0gcHJpY2VbaV0uTWVzc2FnZTtcbiAgICAgICAgbG9nZ2VyLndhcm4od2FybmluZyk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yIChbc3ltYm9sLCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGJhdGNoUmVxdWVzdERhdGEpKSB7XG4gICAgICAgIGlkID0gYm9vdHN0cmFwRGF0YS5zeW1ib2xJZE1hcFtzeW1ib2xdO1xuICAgICAgICBpZiAoaWQgJiYgdmFsLlVTRCkge1xuICAgICAgICAgIHZhbCA9IHZhbC5VU0Q7XG4gICAgICAgICAgZkRhdGFbaWRdID0ge307XG4gICAgICAgICAgZm9yIChmaWVsZCBvZiBPYmplY3Qua2V5cyh2YWwpKSB7XG4gICAgICAgICAgICBmRGF0YVtpZF1bYCR7cHJlZml4fSR7ZmllbGR9LXRpbWVzdGFtcGBdID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgZkRhdGFbaWRdW2Ake3ByZWZpeH0ke2ZpZWxkfWBdID0gdmFsW2ZpZWxkXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKGBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlUHJpY2UoKTogTm8gaWQgb3IgdmFsLlVTRCBmb3IgJHtzeW1ib2x9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtkYXRhOiBmRGF0YSwgdGltZXN0YW1wfTtcblxuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvblByaWNlKCk6ICR7ZXJyb3J9YDtcbiAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgcmV0dXJuIHttZXNzYWdlLCBlcnJvcjogdHJ1ZX07XG4gIH1cbn1cbiIsIi8vIENyeXB0b2h1YlxuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5cbi8qKlxuICpcbiAqIFRPVEFMIFZPTCBGVUxMXG4gKlxuICogT3JpZ2luYWwgRGF0YVxuICogLS0tLS0tLS0tLS0tLVxuICpcbiAqIENvaW5JbmZvOiB7XG4gKiAgIElkOiBcIjkyNTMyNlwiLFxuICogICBOYW1lOiBcIlBTTVwiLFxuICogICBGdWxsTmFtZTogXCJQcmFzbVwiLFxuICogICBJbnRlcm5hbDogXCJQU01cIixcbiAqICAgSW1hZ2VVcmw6IFwiL21lZGlhLzM0NDc4MjQ2L3ByYXNtLnBuZ1wiLFxuICogICBVcmw6IFwiL2NvaW5zL3BzbS9vdmVydmlld1wiLFxuICogICBBbGdvcml0aG06IFwiTi9BXCIsXG4gKiAgIFByb29mVHlwZTogXCJOL0FcIixcbiAqICAgTmV0SGFzaGVzUGVyU2Vjb25kOiAwLFxuICogICBCbG9ja051bWJlcjogMCxcbiAqICAgQmxvY2tUaW1lOiAwLFxuICogICBCbG9ja1Jld2FyZDogMCxcbiAqICAgVHlwZTogMSxcbiAqICAgRG9jdW1lbnRUeXBlOiBcIldlYnBhZ2Vjb2lucFwiXG4gKiB9LFxuICogUkFXOiB7XG4gKiAgIFVTRDoge1xuICogICAgIFRZUEU6IFwiNVwiLFxuICogICAgIE1BUktFVDogXCJDQ0NBR0dcIixcbiAqICAgICBGUk9NU1lNQk9MOiBcIlBTTVwiLFxuICogICAgIFRPU1lNQk9MOiBcIlVTRFwiLFxuICogICAgIEZMQUdTOiBcIjJcIixcbiAqICAgICBQUklDRTogMC4wMDA1MjM3MSxcbiAqICAgICBMQVNUVVBEQVRFOiAxNTQ4NDA3Nzc1LFxuICogICAgIExBU1RWT0xVTUU6IDAsXG4gKiAgICAgTEFTVFZPTFVNRVRPOiAwLFxuICogICAgIExBU1RUUkFERUlEOiAwLFxuICogICAgIFZPTFVNRURBWTogMCxcbiAqICAgICBWT0xVTUVEQVlUTzogMCxcbiAqICAgICBWT0xVTUUyNEhPVVI6IDAsXG4gKiAgICAgVk9MVU1FMjRIT1VSVE86IDAsXG4gKiAgICAgT1BFTkRBWTogMC4wMDA3ODY3Mjg3OTk5OTk5OTk5LFxuICogICAgIEhJR0hEQVk6IDAuMDAwNzg2NzI4Nzk5OTk5OTk5OSxcbiAqICAgICBMT1dEQVk6IDAuMDAwNTIzNzEsXG4gKiAgICAgT1BFTjI0SE9VUjogMC4wMDA1MjM3MSxcbiAqICAgICBISUdIMjRIT1VSOiAwLjAwMDUyMzcxLFxuICogICAgIExPVzI0SE9VUjogMC4wMDA1MjM3MSxcbiAqICAgICBMQVNUTUFSS0VUOiBcIklEQVhcIixcbiAqICAgICBWT0xVTUVIT1VSOiAwLFxuICogICAgIFZPTFVNRUhPVVJUTzogMCxcbiAqICAgICBPUEVOSE9VUjogMC4wMDA1MjM3MSxcbiAqICAgICBISUdISE9VUjogMC4wMDA1MjM3MSxcbiAqICAgICBMT1dIT1VSOiAwLjAwMDUyMzcxLFxuICogICAgIENIQU5HRTI0SE9VUjogMCxcbiAqICAgICBDSEFOR0VQQ1QyNEhPVVI6IDAsXG4gKiAgICAgQ0hBTkdFREFZOiAtMC4wMDAyNjMwMTg3OTk5OTk5OTk5LFxuICogICAgIENIQU5HRVBDVERBWTogLTMzLjQzMTk1MjY2MjcyMTg4LFxuICogICAgIFNVUFBMWTogNDAwMDAwMDAwMCxcbiAqICAgICBNS1RDQVA6IDIwOTQ4NDAuMDAwMDAwMDAwMixcbiAqICAgICBUT1RBTFZPTFVNRTI0SDogNDQ0LFxuICogICAgIFRPVEFMVk9MVU1FMjRIVE86IDAuMjMyNTI3MjQwMDAwMDAwMDIsXG4gKiAgICAgSU1BR0VVUkw6IFwiL21lZGlhLzM0NDc4MjQ2L3ByYXNtLnBuZ1wiXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBQcmVmaXggZmllbGRzIHdpdGggXCJjYy10b3RhbC12b2wtZnVsbC1cIlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUFJJQ0UgLT4gY2MtdG90YWwtdm9sLWZ1bGwtSW1hZ2VVcmxcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwcmljZSBpcyBhbiBhcnJheSBvZiB0aGUgcmVzcG9uc2VzIG9mIGJhdGNoZWQgY3J5cHRvY29tcGFyZSBhcGkgcHJpY2UgZGF0YVxuICogQHBhcmFtIHtTdHJpbmd9IHRpbWVzdGFtcFxuICogQHBhcmFtIHtPYmplY3R9IGJvb3RzdHJhcERhdGFcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0dGVyQ3J5cHRvY29tcGFyZVNlY3Rpb25Ub3RhbFZvbEZ1bGwocHJpY2UsIHRpbWVzdGFtcCwgYm9vdHN0cmFwRGF0YSkge1xuICB0cnkge1xuXG4gICAgY29uc3QgcHJlZml4ID0gJ2NjLXRvdGFsLXZvbC1mdWxsLSc7XG5cbiAgICBsZXQgZkRhdGEgPSB7fTtcbiAgICBsZXQgaWR4O1xuICAgIGxldCBkYXRhSXRlbTtcbiAgICBsZXQgUkFXO1xuICAgIGxldCBjb2luSW5mbztcblxuICAgIGZvciAoW2lkeCwgZGF0YUl0ZW1dIG9mIE9iamVjdC5lbnRyaWVzKHByaWNlLkRhdGEpKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIFJBVyA9IHByaWNlLkRhdGFbaWR4XS5SQVcuVVNEO1xuICAgICAgICBjb2luSW5mbyA9IHByaWNlLkRhdGFbaWR4XS5Db2luSW5mbztcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYGZvcm1hdHRlckNyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsKCk6IGlkeDoke2lkeH0sICR7ZXJyb3J9YCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBrZXk7XG4gICAgICBsZXQgdmFsO1xuICAgICAgY29uc3QgaWQgPSBjb2luSW5mby5JZDtcblxuICAgICAgZkRhdGFbaWRdID0ge307XG5cbiAgICAgIGZvciAoW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhSQVcpKSB7XG4gICAgICAgIGZEYXRhW2lkXVtgJHtwcmVmaXh9JHtrZXl9LXRpbWVzdGFtcGBdID0gdGltZXN0YW1wO1xuICAgICAgICBmRGF0YVtpZF1bYCR7cHJlZml4fSR7a2V5fWBdID0gdmFsO1xuICAgICAgfVxuXG4gICAgICBmb3IgKFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoY29pbkluZm8pKSB7XG4gICAgICAgIGZEYXRhW2lkXVtgJHtwcmVmaXh9JHtrZXl9LXRpbWVzdGFtcGBdID0gdGltZXN0YW1wO1xuICAgICAgICBmRGF0YVtpZF1bYCR7cHJlZml4fSR7a2V5fWBdID0gdmFsO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHtkYXRhOiBmRGF0YSwgdGltZXN0YW1wfTtcblxuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBmb3JtYXR0ZXJDcnlwdG9jb21wYXJlU2VjdGlvblRvdGFsVm9sRnVsbCgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBDcnlwdG9odWJcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJy4uL2xvZ2dlcicpO1xuXG5pbXBvcnQgeyBvYmplY3RHZXROZXN0ZWRQcm9wZXJ0eSBhcyBnbnAgfSAgZnJvbSAnYm8tdXRpbHMnO1xuXG4vKipcbiAqXG4gKiBNRVRSSUNTXG4gKlxuICogT3JpZ2luYWwgRGF0YVxuICogLS0tLS0tLS0tLS0tLVxuICpcbiAqIHtcbiAqICAgXCJzdGF0dXNcIjoge1xuICogICAgIFwiZWxhcHNlZFwiOiBcIjBcIixcbiAqICAgICBcInRpbWVzdGFtcFwiOiBcIjIwMTktMDQtMTFUMTA6MTk6NDcuNjM0NTMyNjk1WlwiXG4gKiAgIH0sXG4gKiAgIFwiZGF0YVwiOiB7XG4gKiAgICAgXCJpZFwiOiBcIjFlMzEyMThhXCIsXG4gKiAgICAgXCJzeW1ib2xcIjogXCJidGNcIixcbiAqICAgICBcIm5hbWVcIjogXCJCaXRjb2luXCIsXG4gKiAgICAgXCJtYXJrZXRfZGF0YVwiOiB7XG4gKiAgICAgICBcInByaWNlX3VzZFwiOiA1MDkxLjA5ODkxNzc2MzE1MyxcbiAqICAgICAgIFwicHJpY2VfYnRjXCI6IDEsXG4gKiAgICAgICBcInZvbHVtZV9sYXN0XzI0X2hvdXJzXCI6IDE2Mzk5MzIwNjQ0LFxuICogICAgICAgXCJyZWFsX3ZvbHVtZV9sYXN0XzI0X2hvdXJzXCI6IDgyODk0MzkwNi40ODE5NDkxLFxuICogICAgICAgXCJ2b2x1bWVfbGFzdF8yNF9ob3Vyc19vdmVyc3RhdGVtZW50X211bHRpcGxlXCI6IDE5Ljc4MzM5MDA2NTA3NTY2LFxuICogICAgICAgXCJwZXJjZW50X2NoYW5nZV91c2RfbGFzdF8yNF9ob3Vyc1wiOiAtMS40Mzc4ODAyOTg3NDgzMDczLFxuICogICAgICAgXCJwZXJjZW50X2NoYW5nZV9idGNfbGFzdF8yNF9ob3Vyc1wiOiAwXG4gKiAgICAgfSxcbiAqICAgICBcIm1hcmtldGNhcFwiOiB7XG4gKiAgICAgICBcImN1cnJlbnRfbWFya2V0Y2FwX3VzZFwiOiA4OTgwNTAwOTU2Mi45NjE5MyxcbiAqICAgICAgIFwieV8yMDUwX21hcmtldGNhcF91c2RcIjogMTA4NTc1NDk3NTg0LjYxMTc0LFxuICogICAgICAgXCJ5X3BsdXMxMF9tYXJrZXRjYXBfdXNkXCI6IDEwNTc2NzM5MjYzOC4wNjM2NyxcbiAqICAgICAgIFwibGlxdWlkX21hcmtldGNhcF91c2RcIjogOTEyNjM1NzQwMTYuOTE3OSxcbiAqICAgICAgIFwidm9sdW1lX3R1cm5vdmVyX2xhc3RfMjRfaG91cnNfcGVyY2VudFwiOiAwLjkwODI5NjU2MzQ1NTA4MDZcbiAqICAgICB9LFxuICogICAgIFwic3VwcGx5XCI6IHtcbiAqICAgICAgIFwieV8yMDUwXCI6IDIwOTgzNDk1LjM5ODQzNzUsXG4gKiAgICAgICBcInlfcGx1czEwXCI6IDIwNDQwNzk2LFxuICogICAgICAgXCJsaXF1aWRcIjogMTc2Mzc3NjIsXG4gKiAgICAgICBcImNpcmN1bGF0aW5nXCI6IDE3NjM5NjEyLFxuICogICAgICAgXCJ5XzIwNTBfaXNzdWVkX3BlcmNlbnRcIjogODQuMDY0MjIxMjYwODM2NzYsXG4gKiAgICAgICBcImFubnVhbF9pbmZsYXRpb25fcGVyY2VudFwiOiAzLjgzODYzODkzODQzMjIxMTUsXG4gKiAgICAgICBcInlfcGx1czEwX2lzc3VlZF9wZXJjZW50XCI6IDg2LjI5NjExMDk3MzM2OTE0XG4gKiAgICAgfSxcbiAqICAgICBcImJsb2NrY2hhaW5fc3RhdHNfMjRfaG91cnNcIjoge1xuICogICAgICAgXCJ0cmFuc2FjdGlvbl92b2x1bWVcIjogMzQyMzcxOTY5OS4yOTI4ODM0LFxuICogICAgICAgXCJhZGp1c3RlZF90cmFuc2FjdGlvbl92b2x1bWVcIjogMTU3Mjg0NjQyNi44MDY2MDcyLFxuICogICAgICAgXCJudnRcIjogMjcuMzk1ODg5MDQ1NjkxODUyLFxuICogICAgICAgXCJhZGp1c3RlZF9udnRcIjogNjAuNjE2MDc4MTM3OTY2MzgsXG4gKiAgICAgICBcInN1bV9vZl9mZWVzXCI6IDE1MDE3Ny43OTUwMzgyNzcsXG4gKiAgICAgICBcIm1lZGlhbl90eF92YWx1ZVwiOiAxNjQuMDA3MTY4NDQ3MDAwMDMsXG4gKiAgICAgICBcIm1lZGlhbl90eF9mZWVcIjogMC4yMzk4MzAxMjQ0NjE2MDM3MyxcbiAqICAgICAgIFwiY291bnRfb2ZfYWN0aXZlX2FkZHJlc3Nlc1wiOiA3MDY3NTQsXG4gKiAgICAgICBcImNvdW50X29mX3R4XCI6IDI4NTU2NyxcbiAqICAgICAgIFwiY291bnRfb2ZfcGF5bWVudHNcIjogNDIzMzE1LFxuICogICAgICAgXCJuZXdfaXNzdWFuY2VcIjogOTYzNzE4Ni43NzA0MzY2MTEsXG4gKiAgICAgICBcImF2ZXJhZ2VfZGlmZmljdWx0eVwiOiA2MDcxODQ2MDQ5OTIwLjc1LFxuICogICAgICAgXCJraWxvYnl0ZXNfYWRkZWRcIjogMTUzNDQzLjk1MixcbiAqICAgICAgIFwiY291bnRfb2ZfYmxvY2tzX2FkZGVkXCI6IDE0OVxuICogICAgIH0sXG4gKiAgICAgXCJhbGxfdGltZV9oaWdoXCI6IHtcbiAqICAgICAgIFwicHJpY2VcIjogMjAwODksXG4gKiAgICAgICBcImF0XCI6IFwiMjAxNy0xMi0xN1wiLFxuICogICAgICAgXCJkYXlzX3NpbmNlXCI6IDQ3OSxcbiAqICAgICAgIFwicGVyY2VudF9kb3duXCI6IDc0LjI0Mjk3NjQxODE5NjQ1LFxuICogICAgICAgXCJicmVha2V2ZW5fbXVsdGlwbGVcIjogMy44ODI0MzYxNzA1NjE1MTRcbiAqICAgICB9LFxuICogICAgIFwiY3ljbGVfbG93XCI6IHtcbiAqICAgICAgIFwicHJpY2VcIjogMzEyNi42Nzk5OTM2MzYyNTgsXG4gKiAgICAgICBcImF0XCI6IFwiMjAxOC0xMi0xNVwiLFxuICogICAgICAgXCJwZXJjZW50X3VwXCI6IDY1LjQ4OTU0NDExMzIzOTcsXG4gKiAgICAgICBcImRheXNfc2luY2VcIjogMTE2XG4gKiAgICAgfSxcbiAqICAgICBcInRva2VuX3NhbGVfc3RhdHNcIjoge1xuICogICAgICAgXCJzYWxlX3Byb2NlZWRzX3VzZFwiOiBudWxsLFxuICogICAgICAgXCJzYWxlX3N0YXJ0X2RhdGVcIjogbnVsbCxcbiAqICAgICAgIFwic2FsZV9lbmRfZGF0ZVwiOiBudWxsLFxuICogICAgICAgXCJyb2lfc2luY2Vfc2FsZV91c2RfcGVyY2VudFwiOiBudWxsLFxuICogICAgICAgXCJyb2lfc2luY2Vfc2FsZV9idGNfcGVyY2VudFwiOiBudWxsLFxuICogICAgICAgXCJyb2lfc2luY2Vfc2FsZV9ldGhfcGVyY2VudFwiOiBudWxsXG4gKiAgICAgfSxcbiAqICAgICBcInN0YWtpbmdfc3RhdHNcIjoge1xuICogICAgICAgXCJzdGFraW5nX3lpZWxkX3BlcmNlbnRcIjogbnVsbCxcbiAqICAgICAgIFwic3Rha2luZ190eXBlXCI6IG51bGwsXG4gKiAgICAgICBcInN0YWtpbmdfbWluaW11bVwiOiBudWxsLFxuICogICAgICAgXCJ0b2tlbnNfc3Rha2VkXCI6IG51bGwsXG4gKiAgICAgICBcInRva2Vuc19zdGFrZWRfcGVyY2VudFwiOiAwLFxuICogICAgICAgXCJyZWFsX3N0YWtpbmdfeWllbGRfcGVyY2VudFwiOiBudWxsXG4gKiAgICAgfSxcbiAqICAgICBcIm1pbmluZ19zdGF0c1wiOiB7XG4gKiAgICAgICBcIm1pbmluZ19hbGdvXCI6IFwiU0hBLTI1NlwiLFxuICogICAgICAgXCJuZXR3b3JrX2hhc2hfcmF0ZVwiOiBcIjUxLDExNyBQSC9zXCIsXG4gKiAgICAgICBcImF2YWlsYWJsZV9vbl9uaWNlaGFzaF9wZXJjZW50XCI6IDAuMDAwNjg4ODQ1NzE2NjE0Mjc4NCxcbiAqICAgICAgIFwiMV9ob3VyX2F0dGFja19jb3N0XCI6IDQyOTMyOS42Mzg2MzUzNzE1LFxuICogICAgICAgXCIyNF9ob3Vyc19hdHRhY2tfY29zdFwiOiAxMDMwMzkxMS4zMjcyNDg5MTYsXG4gKiAgICAgICBcImF0dGFja19hcHBlYWxcIjogODg1OC4xMDY3NTQzOTQxOTVcbiAqICAgICB9LFxuICogICAgIFwiZGV2ZWxvcGVyX2FjdGl2aXR5XCI6IHtcbiAqICAgICAgIFwic3RhcnNcIjogMzc3NzgsXG4gKiAgICAgICBcIndhdGNoZXJzXCI6IDM1MjUsXG4gKiAgICAgICBcImNvbW1pdHNfbGFzdF8zX21vbnRoc1wiOiAzNjEsXG4gKiAgICAgICBcImNvbW1pdHNfbGFzdF8xX3llYXJcIjogMTgyNSxcbiAqICAgICAgIFwibGluZXNfYWRkZWRfbGFzdF8zX21vbnRoc1wiOiAyMzU1NixcbiAqICAgICAgIFwibGluZXNfYWRkZWRfbGFzdF8xX3llYXJcIjogOTg4MDMsXG4gKiAgICAgICBcImxpbmVzX2RlbGV0ZWRfbGFzdF8zX21vbnRoc1wiOiA4NzAxLFxuICogICAgICAgXCJsaW5lc19kZWxldGVkX2xhc3RfMV95ZWFyXCI6IDcxOTQwXG4gKiAgICAgfSxcbiAqICAgICBcInJvaV9kYXRhXCI6IHtcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfbGFzdF8xX3dlZWtcIjogNC4wNjg4MDA4MDgxNDk0NzgsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2xhc3RfMV9tb250aFwiOiAzNC40ODA2NTkzOTExNzg4NixcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfbGFzdF8zX21vbnRoc1wiOiA0Mi4yODAwMTkzNzA5MzIwMyxcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfbGFzdF8xX3llYXJcIjogLTI0LjgyMjUxNDk5NzI3MzE2NCxcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfMV93ZWVrXCI6IDAsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX2J0Y19sYXN0XzFfbW9udGhcIjogMCxcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfM19tb250aHNcIjogMCxcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfMV95ZWFyXCI6IDAsXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX21vbnRoX3RvX2RhdGVcIjogMjUuMzQzOTkzNTcyNzQ5ODksXG4gKiAgICAgICBcInBlcmNlbnRfY2hhbmdlX3F1YXJ0ZXJfdG9fZGF0ZVwiOiAyNS4zNDM5OTM1NzI3NDk4OSxcbiAqICAgICAgIFwicGVyY2VudF9jaGFuZ2VfeWVhcl90b19kYXRlXCI6IDM5LjgzNzk3NDczMTYwMzNcbiAqICAgICB9LFxuICogICAgIFwicm9pX2J5X3llYXJcIjoge1xuICogICAgICAgXCIyMDE4X3VzZF9wZXJjZW50XCI6IC03Mi41MDkyMzI3NjU5NTkzNyxcbiAqICAgICAgIFwiMjAxN191c2RfcGVyY2VudFwiOiAxNjEwLjc2OTA1MTk4ODM1OTcsXG4gKiAgICAgICBcIjIwMTZfdXNkX3BlcmNlbnRcIjogODkuNzY2NyxcbiAqICAgICAgIFwiMjAxNV91c2RfcGVyY2VudFwiOiAzNS40NCxcbiAqICAgICAgIFwiMjAxNF91c2RfcGVyY2VudFwiOiAtNTcuNzE4LFxuICogICAgICAgXCIyMDEzX3VzZF9wZXJjZW50XCI6IDUzNjAuNjc0LFxuICogICAgICAgXCIyMDEyX3VzZF9wZXJjZW50XCI6IDE3NC44OTc5LFxuICogICAgICAgXCIyMDExX3VzZF9wZXJjZW50XCI6IDE0MjAuMjcwMjdcbiAqICAgICB9LFxuICogICAgIFwicmlza19tZXRyaWNzXCI6IHtcbiAqICAgICAgIFwic2hhcnBlX3JhdGlvc1wiOiB7XG4gKiAgICAgICAgIFwibGFzdF8zMF9kYXlzXCI6IDcuMjM5MTg2MTU0MzM3MSxcbiAqICAgICAgICAgXCJsYXN0XzkwX2RheXNcIjogMy44NTkwMDk1MzA5MjUwODcsXG4gKiAgICAgICAgIFwibGFzdF8xX3llYXJcIjogLTAuNDQyNzc0MjA1MDIxOTU4ODYsXG4gKiAgICAgICAgIFwibGFzdF8zX3llYXJzXCI6IDEuNDU5MjExOTQxNDUxNTEyM1xuICogICAgICAgfVxuICogICAgIH0sXG4gKiAgICAgXCJtaXNjX2RhdGFcIjoge1xuICogICAgICAgXCJ2bGFkaW1pcl9jbHViX2Nvc3RcIjogMTA4NTc1NDkuNzU4NDYxMTc1LFxuICogICAgICAgXCJidGNfY3VycmVudF9ub3JtYWxpemVkX3N1cHBseV9wcmljZV91c2RcIjogNTE3NC4zMjg0NjczNDg1MTYsXG4gKiAgICAgICBcImJ0Y195MjA1MF9ub3JtYWxpemVkX3N1cHBseV9wcmljZV91c2RcIjogNTE3NC4zMjg0NjczNDg1MTYsXG4gKiAgICAgICBcImFzc2V0X2NyZWF0ZWRfYXRcIjogXCIyMDA5LTAxLTAzXCIsXG4gKiAgICAgICBcImFzc2V0X2FnZV9kYXlzXCI6IDM3NDksXG4gKiAgICAgICBcImNhdGVnb3JpZXNcIjogW1xuICogICAgICAgICBcIkN1cnJlbmN5XCJcbiAqICAgICAgIF0sXG4gKiAgICAgICBcInNlY3RvcnNcIjogW1xuICogICAgICAgICBcIkN1cnJlbmN5XCJcbiAqICAgICAgIF1cbiAqICAgICB9XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBQcmVmaXggZmllbGRzIHdpdGggXCJtLW1ldHJpY3MtXCJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIG1pc2NfZGF0YS5zZWN0b3JzIC0+IG0tbWV0cmljcy1zZWN0b3JzXG4gKlxuICogTk9URTpcbiAqICAgV2UgbmVlZCBhIG1hc3RlciBmaWVsZCBsaXN0IGFuZCB3ZSBqdXN0IG1hcCBzdHVmZiBmcm9tIHRoZXJlLlxuICogICBIYXZlIGEgdGhpbmsgYWJvdXQgaXQgeW9cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gcmVzcG9uc2UgZnJvbSBNZXNzYXJpIGFwaSByZXF1ZXN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdGltZXN0YW1wXG4gKiBAcGFyYW0ge09iamVjdH0gYm9vdHN0cmFwRGF0YVxuICogQHJldHVybiB7T2JqZWN0fVxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0dGVyTWVzc2FyaVNlY3Rpb25NZXRyaWNzKGRhdGEsIHRpbWVzdGFtcCwgYm9vdHN0cmFwRGF0YSwgYXBwQm9vdHN0cmFwRGF0YSwgZmlsZU5hbWUsIGV2ZW50LCBjYWNoZSkge1xuXG4gIHRyeSB7XG5cbiAgICBmdW5jdGlvbiBkYXRhSXNWYWxpZChkYXRhKSB7XG4gICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5zeW1ib2wpIHJldHVybiB0cnVlXG4gICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWRhdGFJc1ZhbGlkKGRhdGEpKSByZXR1cm47XG4gICAgZGF0YSA9IGRhdGEuZGF0YTtcblxuICAgIGNvbnN0IHN5bWJvbCA9IGRhdGEuc3ltYm9sLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgc2VjdG9ycyA9IGducChkYXRhLCAnbWlzY19kYXRhLnNlY3RvcnMnKTtcbiAgICBjb25zdCBpZCA9IGFwcEJvb3RzdHJhcERhdGEuc3ltYm9sSWRNYXBbc3ltYm9sXTsgLy8gVE9ETzogbmVlZCBwcm9wZXIgbWFwcGluZyBmb3IgaWRzXG5cbiAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICBbaWRdOiB7XG4gICAgICAgICdtLW1ldHJpY3Mtc2VjdG9ycycgICAgICAgICAgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ21pc2NfZGF0YS5zZWN0b3JzJyksXG4gICAgICAgICdtLW1ldHJpY3MtY2F0ZWdvcmllcycgICAgICAgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ21pc2NfZGF0YS5jYXRlZ29yaWVzJyksXG4gICAgICAgICdtLW1ldHJpY3MtZGF0ZS1jcmVhdGVkJyAgICAgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ21pc2NfZGF0YS5hc3NldF9jcmVhdGVkX2F0JyksXG4gICAgICAgICdtLW1ldHJpY3MtYXRoLXByaWNlJyAgICAgICAgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ2FsbF90aW1lX2hpZ2gucHJpY2UnKSxcbiAgICAgICAgJ20tbWV0cmljcy1hdGgtZGF0ZScgICAgICAgICAgICAgICAgICAgICAgICA6IGducChkYXRhLCAnYWxsX3RpbWVfaGlnaC5hdCcpLFxuICAgICAgICAnbS1tZXRyaWNzLWF0aC1kYXlzJyAgICAgICAgICAgICAgICAgICAgICAgIDogZ25wKGRhdGEsICdhbGxfdGltZV9oaWdoLmRheXNfc2luY2UnKSxcbiAgICAgICAgJ20tbWV0cmljcy1hdGgtcGVyY2VudC1kb3duJyAgICAgICAgICAgICAgICA6IGducChkYXRhLCAnYWxsX3RpbWVfaGlnaC5wZXJjZW50X2Rvd24nKSxcbiAgICAgICAgJ20tbWV0cmljcy1hdGgtYnJlYWtldmVuLW11bHRpcGxlJyAgICAgICAgICA6IGducChkYXRhLCAnYWxsX3RpbWVfaGlnaC5icmVha2V2ZW5fbXVsdGlwbGUnKSxcbiAgICAgICAgJ20tbWV0cmljcy1jeWNsZS1sb3ctcHJpY2UnICAgICAgICAgICAgICAgICA6IGducChkYXRhLCAnY3ljbGVfbG93LnByaWNlJyksXG4gICAgICAgICdtLW1ldHJpY3MtY3ljbGUtbG93LWRhdGUnICAgICAgICAgICAgICAgICAgOiBnbnAoZGF0YSwgJ2N5Y2xlX2xvdy5hdCcpLFxuICAgICAgICAnbS1tZXRyaWNzLWN5Y2xlLWxvdy1wZXJjZW50LXVwJyAgICAgICAgICAgIDogZ25wKGRhdGEsICdjeWNsZV9sb3cucGVyY2VudF91cCcpLFxuICAgICAgICAnbS1tZXRyaWNzLWN5Y2xlLWxvdy1kYXlzLXNpbmNlJyAgICAgICAgICAgIDogZ25wKGRhdGEsICdjeWNsZV9sb3cuZGF5c19zaW5jZScpLFxuICAgICAgICAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWxhc3QtMS13ZWVrJyAgICAgIDogZ25wKGRhdGEsICdyb2lfZGF0YS5wZXJjZW50X2NoYW5nZV9sYXN0XzFfd2VlaycpLFxuICAgICAgICAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWxhc3QtMS1tb250aCcgICAgIDogZ25wKGRhdGEsICdyb2lfZGF0YS5wZXJjZW50X2NoYW5nZV9sYXN0XzFfbW9udGgnKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1sYXN0LTMtbW9udGhzICAgICc6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfbGFzdF8zX21vbnRocycpLFxuICAgICAgICAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWxhc3QtMS15ZWFyJyAgICAgIDogZ25wKGRhdGEsICdyb2lfZGF0YS5wZXJjZW50X2NoYW5nZV9sYXN0XzFfeWVhcicpLFxuICAgICAgICAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWJ0Yy1sYXN0LTEtd2VlaycgIDogZ25wKGRhdGEsICdyb2lfZGF0YS5wZXJjZW50X2NoYW5nZV9idGNfbGFzdF8xX3dlZWsnKSxcbiAgICAgICAgJ20tbWV0cmljcy1wZXJjZW50LWNoYW5nZS1idGMtbGFzdC0xLW1vbnRoJyA6IGducChkYXRhLCAncm9pX2RhdGEucGVyY2VudF9jaGFuZ2VfYnRjX2xhc3RfMV9tb250aCcpLFxuICAgICAgICAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWJ0Yy1sYXN0LTMtbW9udGhzJzogZ25wKGRhdGEsICdyb2lfZGF0YS5wZXJjZW50X2NoYW5nZV9idGNfbGFzdF8zX21vbnRocycpLFxuICAgICAgICAnbS1tZXRyaWNzLXBlcmNlbnQtY2hhbmdlLWJ0Yy1sYXN0LTEteWVhcicgIDogZ25wKGRhdGEsICdyb2lfZGF0YS5wZXJjZW50X2NoYW5nZV9idGNfbGFzdF8xX3llYXInKSxcbiAgICAgICAgJ20tbWV0cmljcy1hdGgtcHJpY2UtdGltZXN0YW1wJyAgICAgICAgICAgICA6IGducChkYXRhLCAnYWxsX3RpbWVfaGlnaC5hdCcpLFxuICAgICAgICAnbS1tZXRyaWNzLWN5Y2xlLWxvdy1wcmljZS10aW1lc3RhbXAnICAgICAgIDogZ25wKGRhdGEsICdjeWNsZV9sb3cuYXQnKSxcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IGl0ZW07XG4gICAgbGV0IHByb3A7XG4gICAgZm9yIChpdGVtIG9mIE9iamVjdC52YWx1ZXMob3V0cHV0KSkge1xuICAgICAgZm9yIChwcm9wIG9mIE9iamVjdC5rZXlzKGl0ZW0pKSB7XG4gICAgICAgIGl0ZW1bYCR7cHJvcH0tdGltZXN0YW1wYF0gPSB0aW1lc3RhbXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtkYXRhOiBvdXRwdXQsIHRpbWVzdGFtcH07XG5cbiAgfVxuXG4gIGNhdGNoKGVycm9yKSB7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYGZvcm1hdHRlck1lc3NhcmlNZXRyaWNzKCk6ICR7ZXJyb3J9YDtcbiAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgcmV0dXJuIHttZXNzYWdlLCBlcnJvcjogdHJ1ZX07XG5cbiAgfVxuXG59XG4iLCIvKipcbiAqXG4gKiBVU0QgQ3VycmVuY3kgVGFibGVcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKi9cblxuLy9cbi8vIE5PVEU6IE1BS0UgVEhJUyBBIEZPUk1BVFRFUiBhbmQgcHV0IGl0IG9uIGJvb3RzdHJhcERhdGFcbi8vXG5cbi8vIExpYnNcbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5cbi8vIENyeXB0b0h1YlxuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5jb25zdCBzZXR0aW5ncyA9IHJlcXVpcmUoJy4uL3NldHRpbmdzJyk7XG5cbi8vXG4vLyBYZVxuLy9cbi8vIEN1cnJlbmN5IGNvbnZlcnNpb24gZGF0YSBmb3IgVVNEXG4vL1xuLy8gIFVTRDoge25hbWU6IFwiVVMgRG9sbGFyXCIsIHVuaXRzUGVyVVNEXCI6IDEuMDAwMDAwMDAwMFwiLCBVU0RQZXJVbml0czogXCIxLjAwMDAwMDAwMDBcIn0sXG4vLyAgRVVSOiB7bmFtZTogXCJFdXJvXCIsICAgICAgdW5pdHNQZXJVU0Q6IFwiMC44NTc2Nzg0MzkwXCIsIFVTRFBlclVuaXRzOiBcIjEuMTY1OTM4MTM1NVwifVxuLy9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0dGVyWGVTZWN0aW9uQ3VycmVuY3kocmVzcG9uc2UsIHRpbWVzdGFtcCwgYm9vdHN0cmFwRGF0YSwgYXBwQm9vdHN0cmFwRGF0YSkge1xuICB0cnkge1xuXG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQocmVzcG9uc2UpO1xuICAgIGNvbnN0IHRycyA9ICQoJyNoaXN0b3JpY2FsUmF0ZVRibCB0Ym9keSB0cicpLnRvQXJyYXkoKTtcbiAgICBmb3IgKGNvbnN0IHRyIG9mIHRycykge1xuICAgICAgY29uc3QgdGRzID0gJCh0cikuZmluZCgndGQnKS50b0FycmF5KCk7XG4gICAgICBjb25zdCBjb2RlID0gJCh0ZHNbMF0pLnRleHQoKTtcbiAgICAgIGNvbnN0IG5hbWUgPSAkKHRkc1sxXSkudGV4dCgpO1xuICAgICAgY29uc3QgdW5pdHNQZXJVU0QgPSAkKHRkc1syXSkudGV4dCgpO1xuICAgICAgY29uc3QgVVNEUGVyVW5pdHMgPSAkKHRkc1szXSkudGV4dCgpO1xuICAgICAgZGF0YVtjb2RlXSA9IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgdW5pdHNQZXJVU0QsXG4gICAgICAgIFVTRFBlclVuaXRzXG4gICAgICB9XG4gICAgfVxuICAgIGFwcEJvb3RzdHJhcERhdGEuY3VycmVuY3kgPSBkYXRhO1xuICAgIHJldHVybiB7ZGF0YSwgdGltZXN0YW1wfTtcbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZm9ybWF0dGVyWGVTZWN0aW9uQ3VycmVuY3koKTogJHtlcnJvcn1gO1xuICAgIGxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICByZXR1cm4ge21lc3NhZ2UsIGVycm9yOiB0cnVlfTtcbiAgfVxufVxuIiwiLy8gTm9kZVxuY29uc3QgY3J5cHRvICAgPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuLy8gQ3J5cHRvaHViXG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCcuLi9sb2dnZXInKTtcbmNvbnN0IHNldHRpbmdzID0gcmVxdWlyZSgnLi4vc2V0dGluZ3MnKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcXVldWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBib290c3RyYXBEYXRhXG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIGdldEpvYnNDcnlwdG9jb21wYXJlU2VjdGlvblByaWNlKHF1ZXVlLCBib290c3RyYXBEYXRhLCBhcHBCb290c3RyYXBEYXRhKSB7XG4gIHRyeSB7XG5cbiAgICAgbGV0IGFycjEgPSBbXTtcbiAgICAgbGV0IGFycjIgPSBbJ1VTRCddO1xuICAgICBsZXQgYXJyMVN0ckxlbiA9IDA7XG4gICAgIGxldCBzeW1ib2wxO1xuICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgIC8vIExvd2VyaW5nIGJ5IDEwIHNvIHdlIGRvbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgXCJjYW4gd2UgYWRkIGFub3RoZXIgaW4gdGhlIHJlbWFpbmluZyBzcGFjZVwiIGlzc3VlLCBjb21lIGJhY2sgYW5kIGRvIGl0IHJpZ2h0IGxhdGVyelxuICAgICBjb25zdCBhcnIxTWF4TGVuZ3RoID0gc2V0dGluZ3MubGltaXRzQ3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGlBcnIxIC0gMTA7XG4gICAgIGNvbnN0IGFycjJNYXhMZW5ndGggPSBzZXR0aW5ncy5saW1pdHNDcnlwdG9jb21wYXJlVHJhZGluZ0luZm9NdWx0aUFycjI7XG4gICAgIGNvbnN0IGdyb3VwS2V5ID0gc2V0dGluZ3MudGFnS2V5Q3J5cHRvY29tcGFyZVRyYWRpbmdJbmZvTXVsdGlHcm91cGVkYCR7e319YDtcbiAgICAgaWYgKGFycjIuam9pbigpLmxlbmd0aCA+IGFycjJNYXhMZW5ndGgpIHtcbiAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNjcmFwZUNyeXB0b2NvbXBhcmUoKTogVGhlIGl0ZW1zIGluIHRoZSBhcnIyIGFycmF5IG5lZWQgdG8gYmUgc21hbGxlciB0aGFuICR7YXJyMk1heExlbmd0aH0gaW4gdG90YWwgbGVuZ3RoYCk7XG4gICAgIH1cbiAgICAgbGV0IGpvYnMgPSAwO1xuXG4gICAgIC8vIGZpbHRlciBmaXJzdCB4IGJ5IHNvcnRPcmRlclxuICAgICBjb25zdCBsaW1pdCA9IHNldHRpbmdzLm1heFJlY29yZHNTY3JhcGVkO1xuICAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICAgbGV0IG9yZGVyO1xuICAgICBmb3IgKGxldCBpdGVtIG9mIE9iamVjdC52YWx1ZXMoYm9vdHN0cmFwRGF0YS5jb2luTGlzdCkpIHtcbiAgICAgICBvcmRlciA9IGl0ZW1bJ1NvcnRPcmRlciddO1xuICAgICAgIGlmIChvcmRlciA8IGxpbWl0KSB7XG4gICAgICAgICBpdGVtc1tvcmRlcl0gPSBpdGVtO1xuICAgICAgIH1cbiAgICAgfVxuICAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcihCb29sZWFuKTtcbiAgICAgY29uc3QgbGVuZ3RoID0gaXRlbXMubGVuZ3RoO1xuXG4gICAgIGZvciAobGV0IHYgb2YgaXRlbXMpIHtcbiAgICAgICBjb3VudGVyKys7XG4gICAgICAgc3ltYm9sMSA9IHYuU3ltYm9sO1xuICAgICAgIGFycjFTdHJMZW4gKz0gc3ltYm9sMS5sZW5ndGggKyAxO1xuICAgICAgIGxldCBsYXN0ID0gY291bnRlciA9PT0gbGVuZ3RoO1xuICAgICAgIGlmIChhcnIxU3RyTGVuIDwgYXJyMU1heExlbmd0aCkgYXJyMS5wdXNoKHN5bWJvbDEpO1xuICAgICAgIGlmICgoYXJyMVN0ckxlbiA+IGFycjFNYXhMZW5ndGgpIHx8IGxhc3QpIHtcbiAgICAgICAgIGNvbnN0IGxpc3QxID0gYXJyMS5qb2luKCk7XG4gICAgICAgICBjb25zdCBsaXN0MiA9IGFycjIuam9pbigpO1xuICAgICAgICAgY29uc3QgbWQ1ID0gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpO1xuICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSBtZDUudXBkYXRlKGxpc3QxICsgbGlzdDIpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICBjYWNoZUtleSwgbGlzdDEsIGxpc3QyXG4gICAgICAgICB9XG4gICAgICAgICBjb25zdCB1cmkgPSBzZXR0aW5ncy50YWdVcmlDcnlwdG9jb21wYXJlVHJhZGluZ0luZm9NdWx0aWAke2RhdGF9YDtcbiAgICAgICAgIGNvbnN0IGtleSA9IHNldHRpbmdzLnRhZ0tleUNyeXB0b2NvbXBhcmVUcmFkaW5nSW5mb011bHRpYCR7ZGF0YX1gO1xuXG4gICAgICAgICBxdWV1ZS5wdXNoKHt1cmksIGtleTogZ3JvdXBLZXksIGNhY2hlRm9yRGF5czogc2V0dGluZ3MuY2FjaGVGb3JDcnlwdG9jb21wYXJlfSk7XG4gICAgICAgICBqb2JzKys7XG4gICAgICAgICBhcnIxID0gW107XG4gICAgICAgICBhcnIxU3RyTGVuID0gMDtcblxuICAgICAgIH1cbiAgICAgfVxuICAgICBsb2dnZXIuaW5mbyhgZ2V0Sm9ic0NyeXB0b2NvbXBhcmVTZWN0aW9uUHJpY2UoKTogJHtqb2JzfSBwcmljZSBqb2JzIGNyZWF0ZWRgKTtcblxuICB9XG4gIGNhdGNoKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBnZXRKb2JzQ3J5cHRvY29tcGFyZVNlY3Rpb25QcmljZSgpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuICB9XG59XG4iLCIvLyBOb2RlXG5jb25zdCBjcnlwdG8gICA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG4vLyBDcnlwdG9odWJcbmNvbnN0IGxvZ2dlciAgID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5jb25zdCBzZXR0aW5ncyA9IHJlcXVpcmUoJy4uL3NldHRpbmdzJyk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHF1ZXVlXG4gKiBAcGFyYW0ge09iamVjdH0gYm9vdHN0cmFwRGF0YVxuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBnZXRKb2JzQ3J5cHRvY29tcGFyZVNlY3Rpb25Ub3RhbFZvbEZ1bGwocXVldWUsIGJvb3RzdHJhcERhdGEpIHtcbiAgdHJ5IHtcblxuICAgIGxldCBwYWdlID0gMDtcbiAgICBsZXQgam9icyA9IDA7XG4gICAgY29uc3QgbGltaXQgPSAxMDA7XG4gICAgY29uc3QgbWF4UGFnZXMgPSA1O1xuICAgIGNvbnN0IGdyb3VwS2V5ID0gc2V0dGluZ3MudGFnS2V5Q3J5cHRvY29tcGFyZVRvdGFsVm9sRnVsbEdyb3VwZWRgJHt7fX1gO1xuXG4gICAgd2hpbGUgKHBhZ2UgPCBtYXhQYWdlcykge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgbGltaXQsIHBhZ2VcbiAgICAgIH07XG4gICAgICBjb25zdCB1cmkgPSBzZXR0aW5ncy50YWdVcmlDcnlwdG9jb21wYXJlVG90YWxWb2xGdWxsYCR7ZGF0YX1gO1xuICAgICAgY29uc3Qga2V5ID0gc2V0dGluZ3MudGFnS2V5Q3J5cHRvY29tcGFyZVRvdGFsVm9sRnVsbGAke2RhdGF9YDtcbiAgICAgIHF1ZXVlLnB1c2goe3VyaSwga2V5OiBncm91cEtleSwgY2FjaGVGb3JEYXlzOiBzZXR0aW5ncy5jYWNoZUZvckNyeXB0b2NvbXBhcmV9KTtcbiAgICAgIGpvYnMrKztcbiAgICAgIHBhZ2UrKztcbiAgICB9XG5cbiAgICBsb2dnZXIuaW5mbyhgZ2V0Sm9ic0NyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsKCk6ICR7am9ic30gcHJpY2Ugam9icyBjcmVhdGVkYCk7XG5cbiAgfVxuICBjYXRjaChlcnJvcikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZ2V0Sm9ic0NyeXB0b2NvbXBhcmVTZWN0aW9uVG90YWxWb2xGdWxsKCk6ICR7ZXJyb3J9YDtcbiAgICBsb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgcmV0dXJuIHttZXNzYWdlLCBlcnJvcjogdHJ1ZX07XG4gIH1cbn1cbiIsIi8vIENyeXB0b2h1YlxuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnLi4vbG9nZ2VyJyk7XG5jb25zdCBzZXR0aW5ncyA9IHJlcXVpcmUoJy4uL3NldHRpbmdzJyk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHF1ZXVlXG4gKiBAcGFyYW0ge09iamVjdH0gYm9vdHN0cmFwRGF0YVxuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBnZXRKb2JzTWVzc2FyaVNlY3Rpb25NZXRyaWNzKHF1ZXVlLCBib290c3RyYXBEYXRhLCBhcHBCb290c3RyYXBEYXRhKSB7XG5cbiAgdHJ5IHtcblxuICAgIGlmICghYXBwQm9vdHN0cmFwRGF0YS5maXJzdFhTeW1ib2xzKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2FpdGluZyBmb3IgYm9vdHN0cmFwIGRhdGEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICAgIGxldCBzeW1ib2w7XG4gICAgICBsZXQgam9icyA9IDA7XG4gICAgICBjb25zdCBzeW1ib2xzID0gYXBwQm9vdHN0cmFwRGF0YS5maXJzdFhTeW1ib2xzO1xuICAgICAgLy8gY29uc3QgZ3JvdXBLZXkgPSBzZXR0aW5ncy50YWdLZXlNZXNzYXJpTWV0cmljc0dyb3VwZWRgJHt7fX1gO1xuXG4gICAgICBmb3IgKHN5bWJvbCBvZiBzeW1ib2xzKSB7XG4gICAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICAgIC8vIGdyb3VwS2V5LFxuICAgICAgICAgIHVyaTogc2V0dGluZ3MudGFnVXJpTWVzc2FyaU1ldHJpY3NgJHtzeW1ib2x9YCxcbiAgICAgICAgICBrZXk6IHNldHRpbmdzLnRhZ0tleU1lc3NhcmlNZXRyaWNzYCR7c3ltYm9sfWAsXG4gICAgICAgICAgY2FjaGVGb3JEYXlzOiBzZXR0aW5ncy5jYWNoZUZvck1lc3NhcmksXG4gICAgICAgIH0pO1xuICAgICAgICBqb2JzKys7XG4gICAgICB9XG5cbiAgICAgIGxvZ2dlci5pbmZvKGBnZXRKb2JzTWVzc2FyaU1ldHJpY3MoKTogJHtqb2JzfSBtZXRyaWNzIGpvYnMgY3JlYXRlZGApO1xuXG4gICAgfVxuXG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgZ2V0Sm9ic01lc3NhcmlTZWN0aW9uTWV0cmljcygpOiAke2Vycm9yfWA7XG4gICAgbG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIHJldHVybiB7bWVzc2FnZSwgZXJyb3I6IHRydWV9O1xuXG4gIH1cblxufVxuIiwiLyoqXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IGNhY2hlRm9yXG4gKlxuICovXG5cbi8vIExpYnNcbmNvbnN0IHJwID0gcmVxdWlyZSgncmVxdWVzdC1wcm9taXNlJyk7XG5jb25zdCB7IHRvIH0gPSByZXF1aXJlKCdhd2FpdC10by1qcycpO1xuY29uc3QgbG9nZ2VyICAgPSByZXF1aXJlKCcuLi9sb2dnZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBzY3JhcGVKU09OKHVyaSwga2V5LCBjYWNoZUZvciwgY2FjaGUpIHtcbiAgdHJ5IHtcbiAgICBsZXQgZXJyb3I7XG4gICAgbGV0IFtmaWxlLCBhZ2VdID0gY2FjaGUuZ2V0KGtleSk7XG4gICAgaWYgKCFmaWxlIHx8IGFnZSA+IGNhY2hlRm9yKSB7XG4gICAgICBbZXJyb3IsIGZpbGVdID0gYXdhaXQgdG8ocnAoe3VyaSwganNvbjogdHJ1ZX0pKTtcbiAgICAgIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgIGNhY2hlLnNldChrZXksIEpTT04uc3RyaW5naWZ5KGZpbGUpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmaWxlID0gSlNPTi5wYXJzZShmaWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cbiAgY2F0Y2goZXJyb3IpIHtcbiAgICBsb2dnZXIuZXJyb3IoYHNjcmFwZS1qc29uLmpzOiBGYWlsZWQgdG8gc2NyYXBlICR7dXJpfWApO1xuICAgIHJldHVybiB7ZXJyb3I6IHRydWUsIG1lc3NhZ2U6IGBzY3JhcGVKU09OKCk6ICR7ZXJyb3J9YH07XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gQmluYXJ5IE92ZXJkb3NlIFByb2plY3RzXG5pbXBvcnQgRGF0YVRhYmxlIGZyb20gJ2JvLWRhdGF0YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0b3JlT25CZWZvcmVFbWl0KG9wdGlvbnMsIG5ld0RhdGEsIG9sZERhdGEpIHtcblxuICBjb25zdCB0eXBlID0gb3B0aW9ucy5kaWZmICE9PSBmYWxzZSA/ICdjaGFuZ2VzZXQnIDogJ2Z1bGwnO1xuICBsZXQgZGF0YSA9IG5ld0RhdGE7XG5cbiAgaWYgKHR5cGUgPT09ICdjaGFuZ2VzZXQnKSB7XG4gICAgZGF0YSA9IERhdGFUYWJsZS5kaWZmKG9sZERhdGEsIGRhdGEpO1xuICB9XG5cbiAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHtkYXRhLCB0eXBlfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG5cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gQmluYXJ5IE92ZXJkb3NlIFByb2plY3RzXG5pbXBvcnQgeyBvYmplY3RHZXROZXN0ZWRQcm9wZXJ0eSBhcyBnZXROZXN0ZWRQcm9wIH0gIGZyb20gJ2JvLXV0aWxzJztcblxuLy8gQ3J5cHRvaHViXG5pbXBvcnQgYW5hbHl0aWNzTWVyZ2VEYXRhQnlLZXkgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYW5hbHl0aWNzLW1lcmdlLWRhdGEtYnkta2V5JztcbmltcG9ydCBzZXR0aW5ncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vc2V0dGluZ3MnO1xuXG4vKipcbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RvcmVPbkhhbmRsZURhdGEob3B0aW9ucywgZGF0YSwgY2FjaGUsIG9sZERhdGEgPSB7fSkge1xuXG4gIC8vIEdldCBvbGQgZGF0YVxuICBjb25zdCBmaWxlTmFtZSA9IGAke3NldHRpbmdzLmdlbmVyYXRlZERpcn0vc3RvcmUvZGF0YS5qc29uYDtcblxuICAvLyBNYXBzXG4gIGNvbnN0IGlkTmFtZSA9IGdldE5lc3RlZFByb3AoZGF0YSwgJ2V4Y2hhbmdlcy1nZW5lcmFsLm1hcHMuaWROYW1lJyk7XG4gIGNvbnN0IG5hbWVJZCA9IGdldE5lc3RlZFByb3AoZGF0YSwgJ2V4Y2hhbmdlcy1nZW5lcmFsLm1hcHMubmFtZUlkJyk7XG5cbiAgLy8gRXhjaGFuZ2VzIG9iamVjdCBieSBJZFxuICBjb25zdCBsaXN0ID0gZ2V0TmVzdGVkUHJvcChkYXRhLCAnZXhjaGFuZ2VzLWxpc3QuZGF0YScpIHx8IHt9O1xuICBjb25zdCBnZW5lcmFsID0gZ2V0TmVzdGVkUHJvcChkYXRhLCAnZXhjaGFuZ2VzLWdlbmVyYWwuZGF0YScpIHx8IHt9O1xuICBjb25zdCBleGNoYW5nZXMgPSBhbmFseXRpY3NNZXJnZURhdGFCeUtleShbbGlzdCwgZ2VuZXJhbF0pO1xuXG4gIGNvbnN0IG91dHB1dCA9IHtcbiAgICAuLi5vbGREYXRhLFxuICAgIC4uLmV4Y2hhbmdlcyAmJiB7ZXhjaGFuZ2VzfSxcbiAgICAuLi5uYW1lSWQgJiYgeydleGNoYW5nZS1tYXAtbmFtZUlkJzogbmFtZUlkfSxcbiAgICAuLi5pZE5hbWUgJiYgeydleGNoYW5nZS1tYXAtaWROYW1lJzogaWROYW1lfVxuICB9XG5cbiAgY2FjaGUuc2V0KGZpbGVOYW1lLCBKU09OLnN0cmluZ2lmeShvdXRwdXQpKTtcblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFyZ3ZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXdhaXQtdG8tanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm8tZGF0YXRhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvLXV0aWxzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWVyaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVxdWVzdC1wcm9taXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==