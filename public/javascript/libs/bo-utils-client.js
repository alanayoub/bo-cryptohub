(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bo"] = factory();
	else
		root["bo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.client.generated.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.client.generated.js":
/*!***********************************!*\
  !*** ./index.client.generated.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./src/array-average.js */ \"./src/array-average.js\"), __webpack_require__(/*! ./src/array-difference.js */ \"./src/array-difference.js\"), __webpack_require__(/*! ./src/array-normalize.js */ \"./src/array-normalize.js\"), __webpack_require__(/*! ./src/array-percent-range.js */ \"./src/array-percent-range.js\"), __webpack_require__(/*! ./src/array-to-object.js */ \"./src/array-to-object.js\"), __webpack_require__(/*! ./src/check-data-types-equal.js */ \"./src/check-data-types-equal.js\"), __webpack_require__(/*! ./src/create-svg-in-memory-node.js */ \"./src/create-svg-in-memory-node.js\"), __webpack_require__(/*! ./src/d3-simple-bar-chart.js */ \"./src/d3-simple-bar-chart.js\"), __webpack_require__(/*! ./src/d3-sparkline.js */ \"./src/d3-sparkline.js\"), __webpack_require__(/*! ./src/diff-numeric-strings.js */ \"./src/diff-numeric-strings.js\"), __webpack_require__(/*! ./src/format-number-as-currency.js */ \"./src/format-number-as-currency.js\"), __webpack_require__(/*! ./src/format-number-as.js */ \"./src/format-number-as.js\"), __webpack_require__(/*! ./src/get-random-int.js */ \"./src/get-random-int.js\"), __webpack_require__(/*! ./src/html-poll-element.js */ \"./src/html-poll-element.js\"), __webpack_require__(/*! ./src/html-toggle-class.js */ \"./src/html-toggle-class.js\"), __webpack_require__(/*! ./src/is-float.js */ \"./src/is-float.js\"), __webpack_require__(/*! ./src/is-integer.js */ \"./src/is-integer.js\"), __webpack_require__(/*! ./src/is-number.js */ \"./src/is-number.js\"), __webpack_require__(/*! ./src/number-group-digits.js */ \"./src/number-group-digits.js\"), __webpack_require__(/*! ./src/number-normalize.js */ \"./src/number-normalize.js\"), __webpack_require__(/*! ./src/number-scale.js */ \"./src/number-scale.js\"), __webpack_require__(/*! ./src/object-flatten-object.js */ \"./src/object-flatten-object.js\"), __webpack_require__(/*! ./src/object-get-nested-property.js */ \"./src/object-get-nested-property.js\"), __webpack_require__(/*! ./src/object-is-empty-object.js */ \"./src/object-is-empty-object.js\"), __webpack_require__(/*! ./src/object-is-object.js */ \"./src/object-is-object.js\"), __webpack_require__(/*! ./src/object-set-nested-property.js */ \"./src/object-set-nested-property.js\"), __webpack_require__(/*! ./src/object-to-array.js */ \"./src/object-to-array.js\"), __webpack_require__(/*! ./src/partial-application.js */ \"./src/partial-application.js\"), __webpack_require__(/*! ./src/string-camelcase.js */ \"./src/string-camelcase.js\"), __webpack_require__(/*! ./src/string-capitalize-first-letter.js */ \"./src/string-capitalize-first-letter.js\"), __webpack_require__(/*! ./src/time-ago.js */ \"./src/time-ago.js\"), __webpack_require__(/*! ./src/timeseries-prune.js */ \"./src/timeseries-prune.js\"), __webpack_require__(/*! ./src/timeseries-rescale.js */ \"./src/timeseries-rescale.js\"), __webpack_require__(/*! ./src/timeseries-scale.js */ \"./src/timeseries-scale.js\"), __webpack_require__(/*! ./src/timeseries-thin.js */ \"./src/timeseries-thin.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _arrayAverage, _arrayDifference, _arrayNormalize, _arrayPercentRange, _arrayToObject, _checkDataTypesEqual, _createSvgInMemoryNode, _d3SimpleBarChart, _d3Sparkline, _diffNumericStrings, _formatNumberAsCurrency, _formatNumberAs, _getRandomInt, _htmlPollElement, _htmlToggleClass, _isFloat, _isInteger, _isNumber, _numberGroupDigits, _numberNormalize, _numberScale, _objectFlattenObject, _objectGetNestedProperty, _objectIsEmptyObject, _objectIsObject, _objectSetNestedProperty, _objectToArray, _partialApplication, _stringCamelcase, _stringCapitalizeFirstLetter, _timeAgo, _timeseriesPrune, _timeseriesRescale, _timeseriesScale, _timeseriesThin) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  Object.defineProperty(_exports, \"arrayAverage\", {\n    enumerable: true,\n    get: function get() {\n      return _arrayAverage.default;\n    }\n  });\n  Object.defineProperty(_exports, \"arrayDifference\", {\n    enumerable: true,\n    get: function get() {\n      return _arrayDifference.default;\n    }\n  });\n  Object.defineProperty(_exports, \"arrayNormalize\", {\n    enumerable: true,\n    get: function get() {\n      return _arrayNormalize.default;\n    }\n  });\n  Object.defineProperty(_exports, \"arrayPercentRange\", {\n    enumerable: true,\n    get: function get() {\n      return _arrayPercentRange.default;\n    }\n  });\n  Object.defineProperty(_exports, \"arrayToObject\", {\n    enumerable: true,\n    get: function get() {\n      return _arrayToObject.default;\n    }\n  });\n  Object.defineProperty(_exports, \"checkDataTypesEqual\", {\n    enumerable: true,\n    get: function get() {\n      return _checkDataTypesEqual.default;\n    }\n  });\n  Object.defineProperty(_exports, \"createSvgInMemoryNode\", {\n    enumerable: true,\n    get: function get() {\n      return _createSvgInMemoryNode.default;\n    }\n  });\n  Object.defineProperty(_exports, \"d3SimpleBarChart\", {\n    enumerable: true,\n    get: function get() {\n      return _d3SimpleBarChart.default;\n    }\n  });\n  Object.defineProperty(_exports, \"d3Sparkline\", {\n    enumerable: true,\n    get: function get() {\n      return _d3Sparkline.default;\n    }\n  });\n  Object.defineProperty(_exports, \"diffNumericStrings\", {\n    enumerable: true,\n    get: function get() {\n      return _diffNumericStrings.default;\n    }\n  });\n  Object.defineProperty(_exports, \"formatNumberAsCurrency\", {\n    enumerable: true,\n    get: function get() {\n      return _formatNumberAsCurrency.default;\n    }\n  });\n  Object.defineProperty(_exports, \"formatNumberAs\", {\n    enumerable: true,\n    get: function get() {\n      return _formatNumberAs.default;\n    }\n  });\n  Object.defineProperty(_exports, \"getRandomInt\", {\n    enumerable: true,\n    get: function get() {\n      return _getRandomInt.default;\n    }\n  });\n  Object.defineProperty(_exports, \"htmlPollElement\", {\n    enumerable: true,\n    get: function get() {\n      return _htmlPollElement.default;\n    }\n  });\n  Object.defineProperty(_exports, \"htmlToggleClass\", {\n    enumerable: true,\n    get: function get() {\n      return _htmlToggleClass.default;\n    }\n  });\n  Object.defineProperty(_exports, \"isFloat\", {\n    enumerable: true,\n    get: function get() {\n      return _isFloat.default;\n    }\n  });\n  Object.defineProperty(_exports, \"isInteger\", {\n    enumerable: true,\n    get: function get() {\n      return _isInteger.default;\n    }\n  });\n  Object.defineProperty(_exports, \"isNumber\", {\n    enumerable: true,\n    get: function get() {\n      return _isNumber.default;\n    }\n  });\n  Object.defineProperty(_exports, \"numberGroupDigits\", {\n    enumerable: true,\n    get: function get() {\n      return _numberGroupDigits.default;\n    }\n  });\n  Object.defineProperty(_exports, \"numberNormalize\", {\n    enumerable: true,\n    get: function get() {\n      return _numberNormalize.default;\n    }\n  });\n  Object.defineProperty(_exports, \"numberScale\", {\n    enumerable: true,\n    get: function get() {\n      return _numberScale.default;\n    }\n  });\n  Object.defineProperty(_exports, \"objectFlattenObject\", {\n    enumerable: true,\n    get: function get() {\n      return _objectFlattenObject.default;\n    }\n  });\n  Object.defineProperty(_exports, \"objectGetNestedProperty\", {\n    enumerable: true,\n    get: function get() {\n      return _objectGetNestedProperty.default;\n    }\n  });\n  Object.defineProperty(_exports, \"objectIsEmptyObject\", {\n    enumerable: true,\n    get: function get() {\n      return _objectIsEmptyObject.default;\n    }\n  });\n  Object.defineProperty(_exports, \"objectIsObject\", {\n    enumerable: true,\n    get: function get() {\n      return _objectIsObject.default;\n    }\n  });\n  Object.defineProperty(_exports, \"objectSetNestedProperty\", {\n    enumerable: true,\n    get: function get() {\n      return _objectSetNestedProperty.default;\n    }\n  });\n  Object.defineProperty(_exports, \"objectToArray\", {\n    enumerable: true,\n    get: function get() {\n      return _objectToArray.default;\n    }\n  });\n  Object.defineProperty(_exports, \"partialApplication\", {\n    enumerable: true,\n    get: function get() {\n      return _partialApplication.default;\n    }\n  });\n  Object.defineProperty(_exports, \"stringCamelcase\", {\n    enumerable: true,\n    get: function get() {\n      return _stringCamelcase.default;\n    }\n  });\n  Object.defineProperty(_exports, \"stringCapitalizeFirstLetter\", {\n    enumerable: true,\n    get: function get() {\n      return _stringCapitalizeFirstLetter.default;\n    }\n  });\n  Object.defineProperty(_exports, \"timeAgo\", {\n    enumerable: true,\n    get: function get() {\n      return _timeAgo.default;\n    }\n  });\n  Object.defineProperty(_exports, \"timeseriesPrune\", {\n    enumerable: true,\n    get: function get() {\n      return _timeseriesPrune.default;\n    }\n  });\n  Object.defineProperty(_exports, \"timeseriesRescale\", {\n    enumerable: true,\n    get: function get() {\n      return _timeseriesRescale.default;\n    }\n  });\n  Object.defineProperty(_exports, \"timeseriesScale\", {\n    enumerable: true,\n    get: function get() {\n      return _timeseriesScale.default;\n    }\n  });\n  Object.defineProperty(_exports, \"timeseriesThin\", {\n    enumerable: true,\n    get: function get() {\n      return _timeseriesThin.default;\n    }\n  });\n  _arrayAverage = _interopRequireDefault(_arrayAverage);\n  _arrayDifference = _interopRequireDefault(_arrayDifference);\n  _arrayNormalize = _interopRequireDefault(_arrayNormalize);\n  _arrayPercentRange = _interopRequireDefault(_arrayPercentRange);\n  _arrayToObject = _interopRequireDefault(_arrayToObject);\n  _checkDataTypesEqual = _interopRequireDefault(_checkDataTypesEqual);\n  _createSvgInMemoryNode = _interopRequireDefault(_createSvgInMemoryNode);\n  _d3SimpleBarChart = _interopRequireDefault(_d3SimpleBarChart);\n  _d3Sparkline = _interopRequireDefault(_d3Sparkline);\n  _diffNumericStrings = _interopRequireDefault(_diffNumericStrings);\n  _formatNumberAsCurrency = _interopRequireDefault(_formatNumberAsCurrency);\n  _formatNumberAs = _interopRequireDefault(_formatNumberAs);\n  _getRandomInt = _interopRequireDefault(_getRandomInt);\n  _htmlPollElement = _interopRequireDefault(_htmlPollElement);\n  _htmlToggleClass = _interopRequireDefault(_htmlToggleClass);\n  _isFloat = _interopRequireDefault(_isFloat);\n  _isInteger = _interopRequireDefault(_isInteger);\n  _isNumber = _interopRequireDefault(_isNumber);\n  _numberGroupDigits = _interopRequireDefault(_numberGroupDigits);\n  _numberNormalize = _interopRequireDefault(_numberNormalize);\n  _numberScale = _interopRequireDefault(_numberScale);\n  _objectFlattenObject = _interopRequireDefault(_objectFlattenObject);\n  _objectGetNestedProperty = _interopRequireDefault(_objectGetNestedProperty);\n  _objectIsEmptyObject = _interopRequireDefault(_objectIsEmptyObject);\n  _objectIsObject = _interopRequireDefault(_objectIsObject);\n  _objectSetNestedProperty = _interopRequireDefault(_objectSetNestedProperty);\n  _objectToArray = _interopRequireDefault(_objectToArray);\n  _partialApplication = _interopRequireDefault(_partialApplication);\n  _stringCamelcase = _interopRequireDefault(_stringCamelcase);\n  _stringCapitalizeFirstLetter = _interopRequireDefault(_stringCapitalizeFirstLetter);\n  _timeAgo = _interopRequireDefault(_timeAgo);\n  _timeseriesPrune = _interopRequireDefault(_timeseriesPrune);\n  _timeseriesRescale = _interopRequireDefault(_timeseriesRescale);\n  _timeseriesScale = _interopRequireDefault(_timeseriesScale);\n  _timeseriesThin = _interopRequireDefault(_timeseriesThin);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n});\n\n//# sourceURL=webpack://bo/./index.client.generated.js?");

/***/ }),

/***/ "./src/array-average.js":
/*!******************************!*\
  !*** ./src/array-average.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n\n  /**\n   *\n   * Array Average\n   *\n   * Take the average of all the numbers in an array\n   *\n   * @param {Array} array - array of numbers\n   * @return {Number}\n   *\n   */\n  var _default = function _default(array) {\n    var total = 0;\n    array.forEach(function (x) {\n      return total += x;\n    });\n    return total / array.length;\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/array-average.js?");

/***/ }),

/***/ "./src/array-difference.js":
/*!*********************************!*\
  !*** ./src/array-difference.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  'use strict';\n  /**\n   *\n   * Remove the intersection of two arrays from the first array\n   *\n   **/\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = arrayDifference;\n\n  var _marked =\n  /*#__PURE__*/\n  regeneratorRuntime.mark(arrayDifference);\n\n  function arrayDifference(array, excludes) {\n    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;\n\n    return regeneratorRuntime.wrap(function arrayDifference$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _iteratorNormalCompletion = true;\n            _didIteratorError = false;\n            _iteratorError = undefined;\n            _context.prev = 3;\n            _iterator = array[Symbol.iterator]();\n\n          case 5:\n            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {\n              _context.next = 13;\n              break;\n            }\n\n            x = _step.value;\n\n            if (excludes.includes(x)) {\n              _context.next = 10;\n              break;\n            }\n\n            _context.next = 10;\n            return x;\n\n          case 10:\n            _iteratorNormalCompletion = true;\n            _context.next = 5;\n            break;\n\n          case 13:\n            _context.next = 19;\n            break;\n\n          case 15:\n            _context.prev = 15;\n            _context.t0 = _context[\"catch\"](3);\n            _didIteratorError = true;\n            _iteratorError = _context.t0;\n\n          case 19:\n            _context.prev = 19;\n            _context.prev = 20;\n\n            if (!_iteratorNormalCompletion && _iterator.return != null) {\n              _iterator.return();\n            }\n\n          case 22:\n            _context.prev = 22;\n\n            if (!_didIteratorError) {\n              _context.next = 25;\n              break;\n            }\n\n            throw _iteratorError;\n\n          case 25:\n            return _context.finish(22);\n\n          case 26:\n            return _context.finish(19);\n\n          case 27:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _marked, null, [[3, 15, 19, 27], [20,, 22, 26]]);\n  }\n});\n\n//# sourceURL=webpack://bo/./src/array-difference.js?");

/***/ }),

/***/ "./src/array-normalize.js":
/*!********************************!*\
  !*** ./src/array-normalize.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./number-normalize.js */ \"./src/number-normalize.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _numberNormalize) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n  _numberNormalize = _interopRequireDefault(_numberNormalize);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\n  function _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\n  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\n  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n  /**\n   *\n   * Array Normalize\n   *\n   * Applies the normalize function to an array of numbers\n   *\n   * @param {Array} array - the array to be normalized\n   * @param {Number} min - the min range to apply\n   * @param {Number} max - the max range to apply\n   * @return {Array} return the normalized array\n   *\n   */\n  var _default = function _default(array, min, max) {\n    var aMax = Math.max.apply(Math, _toConsumableArray(array));\n    var aMin = Math.min.apply(Math, _toConsumableArray(array));\n    var result = array.map(function (n) {\n      return (0, _numberNormalize.default)(n, min, max, aMin, aMax);\n    });\n    return result;\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/array-normalize.js?");

/***/ }),

/***/ "./src/array-percent-range.js":
/*!************************************!*\
  !*** ./src/array-percent-range.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n\n  /**\n   *\n   * Percent Range\n   *\n   * Calculate the percentage change between the maximum and minimum values\n   * in the array compared to the first value\n   *\n   * @param {Array} array - array of numbers\n   * @return {Number}\n   *\n   *\n   */\n  var _default = function _default(array) {\n    var oldest = array[0];\n    var min = d3.min(array);\n    var max = d3.max(array);\n    var diff = max - min;\n    var result = Math.round(diff / (oldest / 100));\n    return result;\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/array-percent-range.js?");

/***/ }),

/***/ "./src/array-to-object.js":
/*!********************************!*\
  !*** ./src/array-to-object.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n\n  /**\n   *\n   * Array to Object\n   *\n   * Convert an array of Objects to an Object of Objects\n   * via one of the Objects fields as the Id\n   *\n   * ```\n   * // input\n   * const array = [\n   *   {id: 1, foo: 'bar'},\n   *   {id: 2, baz: 'qux'},\n   * ]\n   *\n   * arrayToObject(array, 'id');\n   *\n   * // output\n   * {\n   *   1: {id: 1, foo: 'bar'}\n   *   2: {id: 2, baz: 'qux'}\n   * }\n   * ```\n   *\n   * @param {Array} array - an Array of Objects\n   * @param {field} field - field to use as a key\n   * @return {Objecct}\n   *\n   */\n  var _default = function _default(array, field) {\n    var result = {};\n    var obj;\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        obj = _step.value;\n        result[obj[field]] = obj;\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator.return != null) {\n          _iterator.return();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n\n    return result;\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/array-to-object.js?");

/***/ }),

/***/ "./src/check-data-types-equal.js":
/*!***************************************!*\
  !*** ./src/check-data-types-equal.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  'use strict';\n  /**\n   *\n   * Check Data Types Equal\n   *\n   * TODO: update to support an arbritary number of arguments\n   *\n   */\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = checkDataTypesEqual;\n\n  function checkDataTypesEqual(data1, data2) {\n    return Object.prototype.toString.call(data1) === Object.prototype.toString.call(data2);\n  }\n});\n\n//# sourceURL=webpack://bo/./src/check-data-types-equal.js?");

/***/ }),

/***/ "./src/create-svg-in-memory-node.js":
/*!******************************************!*\
  !*** ./src/create-svg-in-memory-node.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n\n  /**\n   *\n   * Create an SVG node without adding it to the DOM\n   * @param {String} type - the type of node to create, e.g. 'rect', 'g' etc\n   * @return {D3NodeObject} - a D3 node\n   *\n   */\n  var _default = function _default(type) {\n    var elm = document.createElementNS('http://www.w3.org/2000/svg', type);\n    return d3.select(elm);\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/create-svg-in-memory-node.js?");

/***/ }),

/***/ "./src/d3-simple-bar-chart.js":
/*!************************************!*\
  !*** ./src/d3-simple-bar-chart.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./create-svg-in-memory-node.js */ \"./src/create-svg-in-memory-node.js\"), __webpack_require__(/*! ./array-percent-range.js */ \"./src/array-percent-range.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _createSvgInMemoryNode, _arrayPercentRange) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n  _createSvgInMemoryNode = _interopRequireDefault(_createSvgInMemoryNode);\n  _arrayPercentRange = _interopRequireDefault(_arrayPercentRange);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\n  function _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\n  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\n  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n  /**\n   *\n   * D3 Simple Bar Chart\n   *\n   * @param {Array} data\n   * @param {Boolean} range - show the percent fluctuation of the data\n   * @param {Number} [width]\n   * @param {Number} [height]\n   * @param {String} [styles]\n   * @param {String} [fill]\n   * @return {SVGElement}\n   *\n   */\n  var _default = function _default(_ref) {\n    var data = _ref.data,\n        range = _ref.range,\n        _ref$width = _ref.width,\n        width = _ref$width === void 0 ? 100 : _ref$width,\n        _ref$height = _ref.height,\n        height = _ref$height === void 0 ? 30 : _ref$height,\n        _ref$styles = _ref.styles,\n        styles = _ref$styles === void 0 ? '' : _ref$styles,\n        _ref$fill = _ref.fill,\n        fill = _ref$fill === void 0 ? '#eee' : _ref$fill;\n    var rangeXOffset = range ? 20 : 0;\n    var xArray = data.map(function (d) {\n      return d.x;\n    });\n    var yArray = data.map(function (d) {\n      return d.y;\n    });\n    var yMax = Math.max.apply(Math, _toConsumableArray(yArray));\n    var yMin = Math.min.apply(Math, _toConsumableArray(yArray));\n    var svgElement = (0, _createSvgInMemoryNode.default)('svg').attr('style', 'position: absolute; bottom: 0');\n    var svg = svgElement.attr('width', width).attr('height', height).attr('style', styles).append('g');\n    var x = d3.scaleBand().rangeRound([rangeXOffset, width]).padding(0.1);\n    var y = d3.scaleLinear().rangeRound([height, 0]);\n    x.domain(xArray);\n    y.domain([0, yMax]);\n    svg.selectAll().data(data).enter().append('rect').attr('x', function (d) {\n      return x(d.x);\n    }).attr('y', function (d) {\n      return y(d.y);\n    }).attr('fill', fill).attr('width', x.bandwidth()).attr('height', function (d) {\n      return height - y(d.y);\n    });\n\n    if (range) {\n      var volumeArray = data.map(function (v) {\n        return v.y;\n      });\n      var percentSwing = (0, _arrayPercentRange.default)(volumeArray);\n      var rangeGroup = svg.append('g').attr('class', 'cryptohub-sparkline-range');\n      rangeGroup.append('title').text('Percent fluctuation over 7 days'); // rangeGroup.append('rect')\n      //   .attr('width', '20')\n      //   .attr('height', '12')\n      //   .attr('fill', '#fff')\n      //   .attr('fill-opacity', '0.8')\n      //   .attr('x', 0)\n      //   .attr('y', 0)\n      //   .attr('rx', 0)\n      //   .attr('ry', 0);\n\n      rangeGroup.append('text').attr('x', '2').attr('y', 8).attr('fill', '#00A3E5').attr('font-size', '10px').attr('text-anchor', 'start').text(percentSwing);\n    }\n\n    return svgElement;\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/d3-simple-bar-chart.js?");

/***/ }),

/***/ "./src/d3-sparkline.js":
/*!*****************************!*\
  !*** ./src/d3-sparkline.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./create-svg-in-memory-node.js */ \"./src/create-svg-in-memory-node.js\"), __webpack_require__(/*! ./array-percent-range.js */ \"./src/array-percent-range.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _createSvgInMemoryNode, _arrayPercentRange) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n  _createSvgInMemoryNode = _interopRequireDefault(_createSvgInMemoryNode);\n  _arrayPercentRange = _interopRequireDefault(_arrayPercentRange);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  /**\n   *\n   * D3 Sparkline\n   *\n   * @param {Array} data\n   * @param {Boolean} range - show the percent fluctuation of the data\n   * @param {Number} [width]\n   * @param {Number} [height]\n   * @param {String} [styles]\n   * @return {SVGElement}\n   *\n   */\n  var _default = function _default(_ref) {\n    var data = _ref.data,\n        range = _ref.range,\n        _ref$width = _ref.width,\n        width = _ref$width === void 0 ? 100 : _ref$width,\n        _ref$height = _ref.height,\n        height = _ref$height === void 0 ? 30 : _ref$height,\n        _ref$styles = _ref.styles,\n        styles = _ref$styles === void 0 ? '' : _ref$styles;\n    var rangeXOffset = range ? 20 : 0;\n    var svgElement = (0, _createSvgInMemoryNode.default)('svg');\n    var len = data.length;\n    if (!len) return svgElement; //initialize scales\n\n    var xExtent = d3.extent(data, function (d) {\n      return d.x;\n    });\n    var yExtent = d3.extent(data, function (d) {\n      return d.y;\n    });\n    var x = d3.scaleLinear().domain(xExtent).range([rangeXOffset, width - 2]);\n    var y = d3.scaleLinear().domain(yExtent).range([height - 4, 0]);\n    var line = d3.line().x(function (d) {\n      return x(d.x);\n    }).y(function (d) {\n      return y(d.y);\n    }).curve(d3.curveBasis);\n    var svg = svgElement.attr('width', width).attr('height', height).attr('style', styles).append('g').attr('transform', 'translate(0, 2)');\n    svg.append('path').datum(data).attr('class', 'cryptohub-sparkline').attr('fill', 'none').attr('stroke', '#000').attr('stroke-width', '0.5px').attr('d', line);\n    svg.append('circle').attr('class', 'cryptohub-sparkline-circle').attr('cx', x(data[len - 1].x)).attr('cy', y(data[len - 1].y)).attr('fill', '#00A3E5').attr('stroke', 'none').attr('r', 1.5);\n\n    if (range) {\n      var priceArray = data.map(function (v) {\n        return v.y;\n      });\n      var percentSwing = (0, _arrayPercentRange.default)(priceArray);\n      var rangeGroup = svg.append('g').attr('class', 'cryptohub-sparkline-range');\n      rangeGroup.append('title').text('Percent fluctuation over 7 days'); // rangeGroup.append('rect')\n      //   .attr('width', '20')\n      //   .attr('height', '12')\n      //   .attr('fill', '#fff')\n      //   .attr('fill-opacity', '0.8')\n      //   .attr('x', 0)\n      //   .attr('y', 0)\n      //   .attr('rx', 0)\n      //   .attr('ry', 0);\n\n      rangeGroup.append('text').attr('x', '2').attr('y', '8').attr('fill', '#555').attr('font-size', '10px').attr('text-anchor', 'start').text(percentSwing);\n    }\n\n    return svgElement;\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/d3-sparkline.js?");

/***/ }),

/***/ "./src/diff-numeric-strings.js":
/*!*************************************!*\
  !*** ./src/diff-numeric-strings.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = diffNumericStrings;\n\n  /**\n   *\n   * Diff Numeric Strings\n   * This function is for identifying the changes between 2 numbers\n   * For example in stock data if you wanted to know by how much a value\n   * has increased or decreased\n   *\n   * v1     v2     return\n   * 1234   1244   {start: 12, end: 44}\n   * 10010  11000  {start: 1,  end: 1000}\n   * 20000  12345  {start: ,   end: 12345}\n   *\n   * @param {String} v1\n   * @param {String} v2\n   * @return {Object}\n   *\n   */\n  function diffNumericStrings(v1, v2) {\n    var s1;\n    var s2;\n    v1 = String(v1);\n    v2 = String(v2);\n\n    if (v2.length > v1.length) {\n      s1 = '';\n      s2 = v2;\n    } else {\n      var i = v1.length - 1;\n      var idx;\n\n      for (; i > -1; i--) {\n        if (v1.charAt(i) !== v2.charAt(i)) {\n          idx = i;\n        }\n      }\n\n      s1 = v2.substring(0, idx);\n      s2 = v2.substring(idx);\n    }\n\n    if (s1 === s2) s1 = '';\n    return {\n      start: s1,\n      end: s2\n    };\n  }\n});\n\n//# sourceURL=webpack://bo/./src/diff-numeric-strings.js?");

/***/ }),

/***/ "./src/format-number-as-currency.js":
/*!******************************************!*\
  !*** ./src/format-number-as-currency.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = formatNumberAsCurrency;\n\n  /**\n   *\n   * Format Number as Bitcoin\n   *\n   * num      precision     return\n   * 12345    2             Ƀ12,345.00\n   * 0.001    2             Ƀ0.00\n   *\n   * @param {Number} num\n   * @param {String} code - currency code\n   * @param {Number} [precision]\n   * @return {String}\n   *\n   */\n  function formatNumberAsCurrency(num, code, precision) {\n    var special = {\n      'BTC': '฿',\n      'SAT': 'sat'\n    };\n\n    if (special[code]) {\n      if (!precision) {\n        if (code === 'BTC') precision = 8;\n        if (code === 'SAT') precision = 0;\n      }\n\n      var output = new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: 'USD',\n        minimumFractionDigits: precision,\n        maximumFractionDigits: precision\n      }).format(num).replace('$', '');\n      if (code === 'SAT') output += \" \".concat(special[code]);else output = special[code] + output;\n      return output;\n    } else {\n      if (!precision) {\n        precision = 2;\n      }\n\n      return new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: code,\n        minimumFractionDigits: precision,\n        maximumFractionDigits: precision\n      }).format(num);\n    }\n  }\n});\n\n//# sourceURL=webpack://bo/./src/format-number-as-currency.js?");

/***/ }),

/***/ "./src/format-number-as.js":
/*!*********************************!*\
  !*** ./src/format-number-as.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = formatNumberAsCurrency;\n\n  /**\n   *\n   * Format Number as Bitcoin\n   *\n   * num      precision     return\n   * 12345    2             Ƀ12,345.00\n   * 0.001    2             Ƀ0.00\n   *\n   * @param {Number} num\n   * @param {Number} precision\n   * @param {String} code - currency code\n   * @return {String}\n   *\n   */\n  function formatNumberAsCurrency(num, precision, code) {\n    var special = {\n      'BTC': 'Ƀ'\n    };\n\n    if (special[code]) {\n      return new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: 'USD',\n        minimumFractionDigits: precision\n      }).format(num).replace('$', 'Ƀ');\n    } else {\n      return new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: code,\n        minimumFractionDigits: precision\n      }).format(num);\n    }\n  }\n});\n\n//# sourceURL=webpack://bo/./src/format-number-as.js?");

/***/ }),

/***/ "./src/get-random-int.js":
/*!*******************************!*\
  !*** ./src/get-random-int.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = getRandomInt;\n\n  /**\n   *\n   * GET RANDOM INT\n   *\n   * Get a random integer between the min and max values provided\n   * If no values are provided it will return an integer between 0 and 1,000,000\n   *\n   * NOTE: The min and max are inclusive\n   *\n   * @param {Number} [min]\n   * @param {Number} [max]\n   * @return {Number}\n   *\n   */\n  function getRandomInt() {\n    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000000;\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/get-random-int.js?");

/***/ }),

/***/ "./src/html-poll-element.js":
/*!**********************************!*\
  !*** ./src/html-poll-element.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = htmlPollElement;\n\n  /**\n   *\n   * HTML POLL ELEMENT\n   *\n   * Repeatidly check if an element is available in the DOM.\n   * Call the callback function when it becomes available\n   * and clear the interval\n   *\n   * @param {String} selector\n   * @param {Number} interval\n   * @param {Function} callback\n   * @return {undefined}\n   *\n   */\n  function htmlPollElement(selector, interval, callback) {\n    var inter = setInterval(function () {\n      if (document.querySelectorAll(selector)[0]) {\n        clearInterval(inter);\n        callback();\n      }\n    }, interval);\n  }\n});\n\n//# sourceURL=webpack://bo/./src/html-poll-element.js?");

/***/ }),

/***/ "./src/html-toggle-class.js":
/*!**********************************!*\
  !*** ./src/html-toggle-class.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = htmlToggleClass;\n\n  /**\n  *\n  * HTML TOGGLE CLASS\n  *\n  * Toggle a class on a DOM node\n  *\n  * @param {HTMLElement} element\n  * @param {String} cssClass\n  * @return {undefined}\n  *\n  */\n  function htmlToggleClass(element, cssClass) {\n    element.classList.contains(cssClass) ? element.classList.remove(cssClass) : element.classList.add(cssClass);\n  }\n});\n\n//# sourceURL=webpack://bo/./src/html-toggle-class.js?");

/***/ }),

/***/ "./src/is-float.js":
/*!*************************!*\
  !*** ./src/is-float.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = isFloat;\n\n  /**\n   *\n   * Is Float\n   *\n   * @param {*} x\n   * @return {Boolean}\n   *\n   */\n  function isFloat(x) {\n    return Number(x) === x && x % 1 !== 0;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/is-float.js?");

/***/ }),

/***/ "./src/is-integer.js":
/*!***************************!*\
  !*** ./src/is-integer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = isInteger;\n\n  /**\n   *\n   * Is Integer\n   *\n   * @param {*} x\n   * @return {Boolean}\n   *\n   */\n  function isInteger(x) {\n    return Number(x) === x && x % 1 === 0;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/is-integer.js?");

/***/ }),

/***/ "./src/is-number.js":
/*!**************************!*\
  !*** ./src/is-number.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./is-integer.js */ \"./src/is-integer.js\"), __webpack_require__(/*! ./is-float.js */ \"./src/is-float.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _isInteger, _isFloat) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = isNumber;\n  _isInteger = _interopRequireDefault(_isInteger);\n  _isFloat = _interopRequireDefault(_isFloat);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  /**\n   *\n   * Is Number\n   * Check if the value is an Integer or a Float\n   *\n   * @param {*} x\n   * @return {Boolean}\n   *\n   */\n  function isNumber(x) {\n    return (0, _isInteger.default)(x) || (0, _isFloat.default)(x);\n  }\n});\n\n//# sourceURL=webpack://bo/./src/is-number.js?");

/***/ }),

/***/ "./src/number-group-digits.js":
/*!************************************!*\
  !*** ./src/number-group-digits.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./is-integer.js */ \"./src/is-integer.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _isInteger) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = numberGroupDigits;\n  _isInteger = _interopRequireDefault(_isInteger);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  /**\n   *\n   * NUMBER GROUP DIGITS\n   *\n   * Group numbers with a delimiter\n   *\n   * func(1234)      // 1,234\n   * func(123456)    // 123,456\n   * func(1234, ' ') // 1 234\n   *\n   * @see https://en.wikipedia.org/wiki/Decimal_separator for further enhancements\n   *\n   * @param {Number} number\n   * @param {String} [delimiter]\n   * @return {String|Boolean}\n   *\n   */\n  function numberGroupDigits(number) {\n    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';\n    number = Math.round(number);\n    if (!(0, _isInteger.default)(number)) return void false;\n    return Math.floor(number).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, \"$1\".concat(delimiter));\n  }\n\n  ;\n});\n\n//# sourceURL=webpack://bo/./src/number-group-digits.js?");

/***/ }),

/***/ "./src/number-normalize.js":
/*!*********************************!*\
  !*** ./src/number-normalize.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n\n  /**\n   *\n   * Number Normalize\n   *\n   * Normalize a number from one range to another\n   *\n   * @param {Number} num - the number to be normalized\n   * @param {Number} min - the min range of the original numbers\n   * @param {Number} max - the max range of the original number\n   * @param {Number} nMin - the new min range to apply\n   * @param {Number} nMax - the new max range to apply\n   * @return {Number} return the normalized number\n   *\n   */\n  var _default = function _default(num, min, max, nMin, nMax) {\n    var percent = (num - nMin) / (nMax - nMin);\n    var output = percent * (max - min) + min;\n    return output;\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/number-normalize.js?");

/***/ }),

/***/ "./src/number-scale.js":
/*!*****************************!*\
  !*** ./src/number-scale.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  'use strict';\n  /**\n   *\n   * Number Scale\n   *\n   * @param {Number} num\n   * @param {Number} min\n   * @param {Number} max\n   * @param {Number} newMin\n   * @param {Number} newMax\n   * @return {Nuber}\n   *\n   */\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = numberScale;\n\n  function numberScale(num, min, max) {\n    var newMin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;\n    var newMax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;\n    if (num < min) num = min;\n    if (num > max) num = max; // If the ranges suck\n\n    if (min === max) min *= 0.99, max *= 1.01;\n    if (newMin === newMax) throw new Error(\"numberScale(): Incorrect range \".concat(min, \"-\").concat(max));\n    var percent = (num - min) / (max - min);\n    return percent * (newMax - newMin) + newMin;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/number-scale.js?");

/***/ }),

/***/ "./src/object-flatten-object.js":
/*!**************************************!*\
  !*** ./src/object-flatten-object.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = objectFlattenObject;\n\n  /**\n   *\n   * Flatten Object\n   *\n   * Flattens a 2D object\n   *\n   * @param {Object} object - object to flatten\n   * @return {Object}\n   *\n   */\n  function objectFlattenObject(object) {\n    var output = {};\n\n    for (var _i = 0, _Object$values = Object.values(object); _i < _Object$values.length; _i++) {\n      var value = _Object$values[_i];\n      Object.assign(output, value);\n    }\n\n    return output;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/object-flatten-object.js?");

/***/ }),

/***/ "./src/object-get-nested-property.js":
/*!*******************************************!*\
  !*** ./src/object-get-nested-property.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = objectGetNestedProperty;\n\n  /**\n   *\n   * Get nested property\n   *\n   * @param {Object} obj\n   * @param {String} str\n   * @return {Object|String} return the property, can be any value\n   *\n   */\n  function objectGetNestedProperty(obj, str) {\n    var pathArr = str.split('.');\n    return pathArr.reduce(function (o, k) {\n      return o && o[k] !== void 0 ? o[k] : void 0;\n    }, obj);\n  }\n});\n\n//# sourceURL=webpack://bo/./src/object-get-nested-property.js?");

/***/ }),

/***/ "./src/object-is-empty-object.js":
/*!***************************************!*\
  !*** ./src/object-is-empty-object.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./object-is-object */ \"./src/object-is-object.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _objectIsObject) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = objectIsEmptyObject;\n  _objectIsObject = _interopRequireDefault(_objectIsObject);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  /**\n   *\n   * IS EMPTY OBJECT\n   *\n   * @param {Object} object - object or any other type\n   * @return {Boolean}\n   *\n   */\n  function objectIsEmptyObject(data) {\n    return (0, _objectIsObject.default)(data) && !Object.keys(data).length;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/object-is-empty-object.js?");

/***/ }),

/***/ "./src/object-is-object.js":
/*!*********************************!*\
  !*** ./src/object-is-object.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = objectIsObject;\n\n  /**\n   *\n   * objectIsObject\n   *\n   * @param {Object} object - object or any other type\n   * @return {Boolean}\n   *\n   */\n  function objectIsObject(object) {\n    return Object.prototype.toString.call(object) === '[object Object]';\n  }\n});\n\n//# sourceURL=webpack://bo/./src/object-is-object.js?");

/***/ }),

/***/ "./src/object-set-nested-property.js":
/*!*******************************************!*\
  !*** ./src/object-set-nested-property.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./object-is-object.js */ \"./src/object-is-object.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _objectIsObject) {\n  'use strict';\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = objectSetNestedProperty;\n  _objectIsObject = _interopRequireDefault(_objectIsObject);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\n  function _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\n  function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\n  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n  /**\n   *\n   * Set nested property\n   *\n   * @param {Object} obj\n   * @param {String} str\n   * @return {Object|String} return altered object\n   *\n   */\n  function objectSetNestedProperty(obj, str, val) {\n    var pathArr = str.split('.');\n    var ref = obj;\n\n    for (var _i = 0, _Object$entries = Object.entries(pathArr); _i < _Object$entries.length; _i++) {\n      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),\n          idx = _Object$entries$_i[0],\n          prop = _Object$entries$_i[1];\n\n      if (+idx + 1 === pathArr.length) {\n        ref[prop] = val;\n      } else if ((0, _objectIsObject.default)(ref[prop])) {\n        ref = ref[prop];\n        continue;\n      } else {\n        ref[prop] = {};\n        ref = ref[prop];\n      }\n    }\n\n    return obj;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/object-set-nested-property.js?");

/***/ }),

/***/ "./src/object-to-array.js":
/*!********************************!*\
  !*** ./src/object-to-array.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function () {\n  \"use strict\";\n\n  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\n  function _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\n  function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\n  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n  /**\n   *\n   * @param {Object} data\n   * @return {Array}\n   *\n   */\n  module.exports = function objectToArray(data) {\n    var arrayData = [];\n\n    for (var _i = 0, _Object$entries = Object.entries(data); _i < _Object$entries.length; _i++) {\n      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),\n          id = _Object$entries$_i[0],\n          obj = _Object$entries$_i[1];\n\n      obj.id = obj.Id;\n      arrayData.push(obj);\n    }\n\n    return arrayData;\n  };\n});\n\n//# sourceURL=webpack://bo/./src/object-to-array.js?");

/***/ }),

/***/ "./src/partial-application.js":
/*!************************************!*\
  !*** ./src/partial-application.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = void 0;\n\n  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\n  function _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\n  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\n  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n  /**\n   *\n   * partialApplication\n   *\n   * @param {Function} fn\n   * @param {Arguments} cache\n   * @return {Function}\n   *\n   */\n  var _default = function _default(fn) {\n    for (var _len = arguments.length, cache = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      cache[_key - 1] = arguments[_key];\n    }\n\n    return function () {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      var all = cache.concat(args);\n      return all.length >= fn.length ? fn.apply(void 0, _toConsumableArray(all)) : pApply.apply(void 0, [fn].concat(_toConsumableArray(all)));\n    };\n  };\n\n  _exports.default = _default;\n});\n\n//# sourceURL=webpack://bo/./src/partial-application.js?");

/***/ }),

/***/ "./src/string-camelcase.js":
/*!*********************************!*\
  !*** ./src/string-camelcase.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./string-capitalize-first-letter */ \"./src/string-capitalize-first-letter.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _stringCapitalizeFirstLetter) {\n  'use strict'; // bo-utils\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = camelcase;\n  _stringCapitalizeFirstLetter = _interopRequireDefault(_stringCapitalizeFirstLetter);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  /**\n   *\n   * @param {String} str\n   * @param {String} delimiter\n   * @return {String}\n   *\n   */\n  function camelcase(str, delimiter) {\n    return str.split('-').map(function (x, i) {\n      return !i ? x : (0, _stringCapitalizeFirstLetter.default)(x);\n    }).join('');\n  }\n});\n\n//# sourceURL=webpack://bo/./src/string-camelcase.js?");

/***/ }),

/***/ "./src/string-capitalize-first-letter.js":
/*!***********************************************!*\
  !*** ./src/string-capitalize-first-letter.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = capitalizeFirstLetter;\n\n  /**\n   *\n   * @param {String} str\n   * @return {String}\n   *\n   */\n  function capitalizeFirstLetter(str) {\n    return str.charAt(0).toUpperCase() + str.slice(1);\n  }\n});\n\n//# sourceURL=webpack://bo/./src/string-capitalize-first-letter.js?");

/***/ }),

/***/ "./src/time-ago.js":
/*!*************************!*\
  !*** ./src/time-ago.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  \"use strict\";\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = timeAgo;\n\n  /**\n   *\n   * Timeago\n   *\n   * NOTE: Requires moment\n   *\n   * @param {String|Date|Number} timestamp\n   * @return {String} e.g. 'a few seconds'\n   *\n   */\n  function timeAgo(timestamp) {\n    var timeago;\n\n    if (timestamp !== void 0) {\n      var startDate = moment(timestamp);\n      var endDate = moment(new Date());\n      var ms = Math.abs(startDate.diff(endDate));\n      var duration = moment.duration(ms).humanize();\n      timeago = \"\".concat(duration);\n    }\n\n    return timeago;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/time-ago.js?");

/***/ }),

/***/ "./src/timeseries-prune.js":
/*!*********************************!*\
  !*** ./src/timeseries-prune.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  'use strict';\n  /**\n   *\n   * Timeseries prune\n   *\n   * @param {Array} ts - Array of timeseries objects\n   * @param {Number} maxAge - Remove all items older than now - maxAge in ms\n   * @param {String} [timestampField] - The name of the timestamp field\n   *\n   */\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = timeseriesPrune;\n\n  function timeseriesPrune(ts, maxAge) {\n    var timestampField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'timestamp';\n    var timeNow = +new Date();\n    return ts.filter(function (v, i) {\n      return timeNow - v[timestampField] < maxAge;\n    });\n  }\n});\n\n//# sourceURL=webpack://bo/./src/timeseries-prune.js?");

/***/ }),

/***/ "./src/timeseries-rescale.js":
/*!***********************************!*\
  !*** ./src/timeseries-rescale.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./timeseries-thin */ \"./src/timeseries-thin.js\"), __webpack_require__(/*! ./timeseries-prune */ \"./src/timeseries-prune.js\"), __webpack_require__(/*! ./timeseries-scale */ \"./src/timeseries-scale.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _timeseriesThin, _timeseriesPrune, _timeseriesScale) {\n  'use strict';\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = timeseriesRescale;\n  _timeseriesThin = _interopRequireDefault(_timeseriesThin);\n  _timeseriesPrune = _interopRequireDefault(_timeseriesPrune);\n  _timeseriesScale = _interopRequireDefault(_timeseriesScale);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  /**\n   *\n   * Timeseries Rescale\n   *\n   * @param {Array} ts - Array of timeseries objects\n   * @return {Array} - Array of updated timeseries object\n   *\n   */\n  function timeseriesRescale(item) {\n    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;\n    var maxAge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24 * 7;\n    var price = item['cc-total-vol-full-PRICE'];\n    var volume = item['cc-total-vol-full-TOTALVOLUME24HTO'];\n    var ts = item['cryptohub-price-history'];\n    var minP = item['cryptohub-price-history-min'] || price - 1;\n    var maxP = item['cryptohub-price-history-max'] || price;\n    var minV = item['cryptohub-volume-history-min'] || volume - 1;\n    var maxV = item['cryptohub-volume-history-max'] || volume;\n    var timestamp = item['cc-total-vol-full-PRICE-timestamp'];\n    (0, _timeseriesPrune.default)(ts, maxAge);\n    (0, _timeseriesThin.default)(ts, limit); // scale up\n\n    (0, _timeseriesScale.default)({\n      ts: ts,\n      min: minP,\n      max: maxP,\n      scaleField: 'price'\n    });\n    (0, _timeseriesScale.default)({\n      ts: ts,\n      min: minV,\n      max: maxV,\n      scaleField: 'volume'\n    }); // add item\n\n    var last = ts[ts.length - 1];\n    var next = {\n      price: price,\n      volume: volume,\n      timestamp: +new Date(timestamp)\n    };\n    if (JSON.stringify(last) !== JSON.stringify(next)) ts.push(next); // scale down\n\n    (0, _timeseriesScale.default)({\n      ts: ts,\n      min: 0,\n      max: 1000,\n      scaleField: 'price'\n    });\n    (0, _timeseriesScale.default)({\n      ts: ts,\n      min: 0,\n      max: 1000,\n      scaleField: 'volume'\n    }); // return {\n    //   timeseries: tsArr,\n    //   priceMin: newPriceMin,\n    //   priceMax: newPriceMax,\n    //   volumeMin: newVolMin,\n    //   volumeMax: newVolMax,\n    // };\n  }\n});\n\n//# sourceURL=webpack://bo/./src/timeseries-rescale.js?");

/***/ }),

/***/ "./src/timeseries-scale.js":
/*!*********************************!*\
  !*** ./src/timeseries-scale.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./number-scale */ \"./src/number-scale.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports, _numberScale) {\n  'use strict';\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = timeseriesScale;\n  _numberScale = _interopRequireDefault(_numberScale);\n\n  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\n  function _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\n  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\n  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n  /**\n   *\n   * Timeseries Scale\n   *\n   * @param {Array} ts - Array of timeseries objects\n   * @param {Number} min - Minimum value of range to scale to\n   * @param {Number} max - Maximim value of the range to scale to\n   * @param {String} scaleField - The name of the field to scale\n   * @param {String} [timestampField] - The name of the timestamp field\n   * @param {String} [ceil] - Rount the value up\n   * @return {Array} - Array of updated timeseries object\n   *\n   */\n  function timeseriesScale(_ref) {\n    var ts = _ref.ts,\n        min = _ref.min,\n        max = _ref.max,\n        scaleField = _ref.scaleField,\n        _ref$timestampField = _ref.timestampField,\n        timestampField = _ref$timestampField === void 0 ? 'timestamp' : _ref$timestampField,\n        _ref$ceil = _ref.ceil,\n        ceil = _ref$ceil === void 0 ? true : _ref$ceil;\n    var arr = ts.map(function (x) {\n      return x[scaleField];\n    });\n    var minOld = Math.min.apply(Math, _toConsumableArray(arr));\n    var maxOld = Math.max.apply(Math, _toConsumableArray(arr));\n    var val;\n    var scale;\n\n    for (var _i = 0, _Object$values = Object.values(ts); _i < _Object$values.length; _i++) {\n      val = _Object$values[_i];\n      scale = (0, _numberScale.default)(val[scaleField], minOld, maxOld, min, max);\n      val[scaleField] = ceil ? Math.ceil(scale) : scale;\n    }\n\n    return ts;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/timeseries-scale.js?");

/***/ }),

/***/ "./src/timeseries-thin.js":
/*!********************************!*\
  !*** ./src/timeseries-thin.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_exports) {\n  'use strict';\n  /**\n   *\n   * Timeseries thin\n   *\n   * Remove the timeseries items that have the\n   * shortest time span between them and their siblings\n   * Keep removing until the limit has been reached\n   *\n   * @param {Array} ts\n   * @param {Number} limit\n   * @param {String} [timestampField]\n   * @return {Array}\n   *\n   */\n\n  Object.defineProperty(_exports, \"__esModule\", {\n    value: true\n  });\n  _exports.default = timeseriesThin;\n\n  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\n  function _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\n  function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\n  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n  function timeseriesThin(ts, limit) {\n    var timestampField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'timestamp';\n    var numToRemove = ts.length - limit;\n\n    if (!numToRemove) {\n      return ts;\n    } else {\n      var idx;\n      var diff;\n      var diffs = {};\n\n      for (var _i = 0, _Object$keys = Object.keys(ts); _i < _Object$keys.length; _i++) {\n        idx = _Object$keys[_i];\n\n        if (idx > 0) {\n          diff = Math.abs(ts[idx - 1][timestampField] - ts[idx][timestampField]);\n          diffs[diff] = idx;\n        }\n\n        ;\n      }\n\n      var i;\n      var itemsToRemove = Object.keys(diffs).sort().splice(0, numToRemove);\n\n      for (var _i2 = 0, _Object$entries = Object.entries(itemsToRemove); _i2 < _Object$entries.length; _i2++) {\n        var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2);\n\n        i = _Object$entries$_i[0];\n        idx = _Object$entries$_i[1];\n        ts.splice(diffs[idx] - i, 1);\n      }\n    }\n\n    return ts;\n  }\n});\n\n//# sourceURL=webpack://bo/./src/timeseries-thin.js?");

/***/ })

/******/ });
});