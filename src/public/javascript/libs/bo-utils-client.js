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
/*! exports provided: arrayAverage, arrayNormalize, arrayPercentRange, arrayToObject, createSvgInMemoryNode, d3SimpleBarChart, d3Sparkline, diffNumericStrings, formatNumberAsCurrency, formatNumberAs, getRandomInt, htmlPollElement, htmlToggleClass, isFloat, isInteger, isNumber, numberGroupDigits, numberNormalize, objectGetNestedProperty, objectIsEmptyObject, objectIsObject, objectToArray, partialApplication, stringCamelcase, stringCapitalizeFirstLetter, timeAgo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_array_average_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/array-average.js */ \"./src/array-average.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"arrayAverage\", function() { return _src_array_average_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _src_array_normalize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/array-normalize.js */ \"./src/array-normalize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"arrayNormalize\", function() { return _src_array_normalize_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _src_array_percent_range_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/array-percent-range.js */ \"./src/array-percent-range.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"arrayPercentRange\", function() { return _src_array_percent_range_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _src_array_to_object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/array-to-object.js */ \"./src/array-to-object.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"arrayToObject\", function() { return _src_array_to_object_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _src_create_svg_in_memory_node_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/create-svg-in-memory-node.js */ \"./src/create-svg-in-memory-node.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createSvgInMemoryNode\", function() { return _src_create_svg_in_memory_node_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _src_d3_simple_bar_chart_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/d3-simple-bar-chart.js */ \"./src/d3-simple-bar-chart.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"d3SimpleBarChart\", function() { return _src_d3_simple_bar_chart_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _src_d3_sparkline_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/d3-sparkline.js */ \"./src/d3-sparkline.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"d3Sparkline\", function() { return _src_d3_sparkline_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _src_diff_numeric_strings_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/diff-numeric-strings.js */ \"./src/diff-numeric-strings.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"diffNumericStrings\", function() { return _src_diff_numeric_strings_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _src_format_number_as_currency_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/format-number-as-currency.js */ \"./src/format-number-as-currency.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"formatNumberAsCurrency\", function() { return _src_format_number_as_currency_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _src_format_number_as_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/format-number-as.js */ \"./src/format-number-as.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"formatNumberAs\", function() { return _src_format_number_as_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _src_get_random_int_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/get-random-int.js */ \"./src/get-random-int.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getRandomInt\", function() { return _src_get_random_int_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _src_html_poll_element_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/html-poll-element.js */ \"./src/html-poll-element.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"htmlPollElement\", function() { return _src_html_poll_element_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _src_html_toggle_class_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./src/html-toggle-class.js */ \"./src/html-toggle-class.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"htmlToggleClass\", function() { return _src_html_toggle_class_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _src_is_float_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./src/is-float.js */ \"./src/is-float.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isFloat\", function() { return _src_is_float_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n/* harmony import */ var _src_is_integer_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./src/is-integer.js */ \"./src/is-integer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isInteger\", function() { return _src_is_integer_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]; });\n\n/* harmony import */ var _src_is_number_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./src/is-number.js */ \"./src/is-number.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isNumber\", function() { return _src_is_number_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]; });\n\n/* harmony import */ var _src_number_group_digits_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./src/number-group-digits.js */ \"./src/number-group-digits.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"numberGroupDigits\", function() { return _src_number_group_digits_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]; });\n\n/* harmony import */ var _src_number_normalize_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./src/number-normalize.js */ \"./src/number-normalize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"numberNormalize\", function() { return _src_number_normalize_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]; });\n\n/* harmony import */ var _src_object_get_nested_property_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./src/object-get-nested-property.js */ \"./src/object-get-nested-property.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"objectGetNestedProperty\", function() { return _src_object_get_nested_property_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"]; });\n\n/* harmony import */ var _src_object_is_empty_object_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./src/object-is-empty-object.js */ \"./src/object-is-empty-object.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"objectIsEmptyObject\", function() { return _src_object_is_empty_object_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"]; });\n\n/* harmony import */ var _src_object_is_object_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./src/object-is-object.js */ \"./src/object-is-object.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"objectIsObject\", function() { return _src_object_is_object_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"]; });\n\n/* harmony import */ var _src_object_to_array_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./src/object-to-array.js */ \"./src/object-to-array.js\");\n/* harmony import */ var _src_object_to_array_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_src_object_to_array_js__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"objectToArray\", function() { return _src_object_to_array_js__WEBPACK_IMPORTED_MODULE_21___default.a; });\n/* harmony import */ var _src_partial_application_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./src/partial-application.js */ \"./src/partial-application.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"partialApplication\", function() { return _src_partial_application_js__WEBPACK_IMPORTED_MODULE_22__[\"default\"]; });\n\n/* harmony import */ var _src_string_camelcase_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./src/string-camelcase.js */ \"./src/string-camelcase.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"stringCamelcase\", function() { return _src_string_camelcase_js__WEBPACK_IMPORTED_MODULE_23__[\"default\"]; });\n\n/* harmony import */ var _src_string_capitalize_first_letter_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./src/string-capitalize-first-letter.js */ \"./src/string-capitalize-first-letter.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"stringCapitalizeFirstLetter\", function() { return _src_string_capitalize_first_letter_js__WEBPACK_IMPORTED_MODULE_24__[\"default\"]; });\n\n/* harmony import */ var _src_time_ago_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./src/time-ago.js */ \"./src/time-ago.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"timeAgo\", function() { return _src_time_ago_js__WEBPACK_IMPORTED_MODULE_25__[\"default\"]; });\n\n//\n// This is a generated file\n//\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://bo/./index.client.generated.js?");

/***/ }),

/***/ "./src/array-average.js":
/*!******************************!*\
  !*** ./src/array-average.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n *\n * Array Average\n *\n * Take the average of all the numbers in an array\n *\n * @param {Array} array - array of numbers\n * @return {Number}\n *\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (array) {\n  var total = 0;\n  array.forEach(function (x) {\n    return total += x;\n  });\n  return total / array.length;\n});\n\n//# sourceURL=webpack://bo/./src/array-average.js?");

/***/ }),

/***/ "./src/array-normalize.js":
/*!********************************!*\
  !*** ./src/array-normalize.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _number_normalize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number-normalize.js */ \"./src/number-normalize.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\n/**\n *\n * Array Normalize\n *\n * Applies the normalize function to an array of numbers\n *\n * @param {Array} array - the array to be normalized\n * @param {Number} min - the min range to apply\n * @param {Number} max - the max range to apply\n * @return {Array} return the normalized array\n *\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (array, min, max) {\n  var aMax = Math.max.apply(Math, _toConsumableArray(array));\n  var aMin = Math.min.apply(Math, _toConsumableArray(array));\n  var result = array.map(function (n) {\n    return Object(_number_normalize_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(n, min, max, aMin, aMax);\n  });\n  return result;\n});\n\n//# sourceURL=webpack://bo/./src/array-normalize.js?");

/***/ }),

/***/ "./src/array-percent-range.js":
/*!************************************!*\
  !*** ./src/array-percent-range.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n *\n * Percent Range\n *\n * Calculate the percentage change between the maximum and minimum values\n * in the array compared to the first value\n *\n * @param {Array} array - array of numbers\n * @return {Number}\n *\n *\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (array) {\n  var oldest = array[0];\n  var min = d3.min(array);\n  var max = d3.max(array);\n  var diff = max - min;\n  var result = Math.round(diff / (oldest / 100));\n  return result;\n});\n\n//# sourceURL=webpack://bo/./src/array-percent-range.js?");

/***/ }),

/***/ "./src/array-to-object.js":
/*!********************************!*\
  !*** ./src/array-to-object.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n *\n * Array to Object\n *\n * Convert an array of Objects to an Object of Objects\n * via one of the Objects fields as the Id\n *\n * ```\n * // input\n * const array = [\n *   {id: 1, foo: 'bar'},\n *   {id: 2, baz: 'qux'},\n * ]\n *\n * arrayToObject(array, 'id');\n *\n * // output\n * {\n *   1: {id: 1, foo: 'bar'}\n *   2: {id: 2, baz: 'qux'}\n * }\n * ```\n *\n * @param {Array} array - an Array of Objects\n * @param {field} field - field to use as a key\n * @return {Objecct}\n *\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (array, field) {\n  var result = {};\n  var obj;\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      obj = _step.value;\n      result[obj[field]] = obj;\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator.return != null) {\n        _iterator.return();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  return result;\n});\n\n//# sourceURL=webpack://bo/./src/array-to-object.js?");

/***/ }),

/***/ "./src/create-svg-in-memory-node.js":
/*!******************************************!*\
  !*** ./src/create-svg-in-memory-node.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n *\n * Create an SVG node without adding it to the DOM\n * @param {String} type - the type of node to create, e.g. 'rect', 'g' etc\n * @return {D3NodeObject} - a D3 node\n *\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (type) {\n  var elm = document.createElementNS('http://www.w3.org/2000/svg', type);\n  return d3.select(elm);\n});\n\n//# sourceURL=webpack://bo/./src/create-svg-in-memory-node.js?");

/***/ }),

/***/ "./src/d3-simple-bar-chart.js":
/*!************************************!*\
  !*** ./src/d3-simple-bar-chart.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create_svg_in_memory_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-svg-in-memory-node.js */ \"./src/create-svg-in-memory-node.js\");\n/* harmony import */ var _array_percent_range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array-percent-range.js */ \"./src/array-percent-range.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\n\n/**\n *\n * D3 Simple Bar Chart\n *\n * @param {Array} data\n * @param {Boolean} range - show the percent fluctuation of the data\n * @param {Number} [width]\n * @param {Number} [height]\n * @param {String} [styles]\n * @param {String} [fill]\n * @return {SVGElement}\n *\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var data = _ref.data,\n      range = _ref.range,\n      _ref$width = _ref.width,\n      width = _ref$width === void 0 ? 100 : _ref$width,\n      _ref$height = _ref.height,\n      height = _ref$height === void 0 ? 30 : _ref$height,\n      _ref$styles = _ref.styles,\n      styles = _ref$styles === void 0 ? '' : _ref$styles,\n      _ref$fill = _ref.fill,\n      fill = _ref$fill === void 0 ? '#eee' : _ref$fill;\n  var rangeXOffset = range ? 20 : 0;\n  var xArray = data.map(function (d) {\n    return d.x;\n  });\n  var yArray = data.map(function (d) {\n    return d.y;\n  });\n  var yMax = Math.max.apply(Math, _toConsumableArray(yArray));\n  var yMin = Math.min.apply(Math, _toConsumableArray(yArray));\n  var svgElement = Object(_create_svg_in_memory_node_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('svg').attr('style', 'position: absolute; bottom: 0');\n  var svg = svgElement.attr('width', width).attr('height', height).attr('style', styles).append('g');\n  var x = d3.scaleBand().rangeRound([rangeXOffset, width]).padding(0.1);\n  var y = d3.scaleLinear().rangeRound([height, 0]);\n  x.domain(xArray);\n  y.domain([0, yMax]);\n  svg.selectAll().data(data).enter().append('rect').attr('x', function (d) {\n    return x(d.x);\n  }).attr('y', function (d) {\n    return y(d.y);\n  }).attr('fill', fill).attr('width', x.bandwidth()).attr('height', function (d) {\n    return height - y(d.y);\n  });\n\n  if (range) {\n    var volumeArray = data.map(function (v) {\n      return v.y;\n    });\n    var percentSwing = Object(_array_percent_range_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(volumeArray);\n    var rangeGroup = svg.append('g').attr('class', 'cryptohub-sparkline-range');\n    rangeGroup.append('title').text('Percent fluctuation over 7 days'); // rangeGroup.append('rect')\n    //   .attr('width', '20')\n    //   .attr('height', '12')\n    //   .attr('fill', '#fff')\n    //   .attr('fill-opacity', '0.8')\n    //   .attr('x', 0)\n    //   .attr('y', 0)\n    //   .attr('rx', 0)\n    //   .attr('ry', 0);\n\n    rangeGroup.append('text').attr('x', '2').attr('y', 8).attr('fill', '#00A3E5').attr('font-size', '10px').attr('text-anchor', 'start').text(percentSwing);\n  }\n\n  return svgElement;\n});\n\n//# sourceURL=webpack://bo/./src/d3-simple-bar-chart.js?");

/***/ }),

/***/ "./src/d3-sparkline.js":
/*!*****************************!*\
  !*** ./src/d3-sparkline.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create_svg_in_memory_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-svg-in-memory-node.js */ \"./src/create-svg-in-memory-node.js\");\n/* harmony import */ var _array_percent_range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array-percent-range.js */ \"./src/array-percent-range.js\");\n\n\n/**\n *\n * D3 Sparkline\n *\n * @param {Array} data\n * @param {Boolean} range - show the percent fluctuation of the data\n * @param {Number} [width]\n * @param {Number} [height]\n * @param {String} [styles]\n * @return {SVGElement}\n *\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var data = _ref.data,\n      range = _ref.range,\n      _ref$width = _ref.width,\n      width = _ref$width === void 0 ? 100 : _ref$width,\n      _ref$height = _ref.height,\n      height = _ref$height === void 0 ? 30 : _ref$height,\n      _ref$styles = _ref.styles,\n      styles = _ref$styles === void 0 ? '' : _ref$styles;\n  var rangeXOffset = range ? 20 : 0;\n  var svgElement = Object(_create_svg_in_memory_node_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('svg');\n  var len = data.length; //initialize scales\n\n  var xExtent = d3.extent(data, function (d) {\n    return d.x;\n  });\n  var yExtent = d3.extent(data, function (d) {\n    return d.y;\n  });\n  var x = d3.scaleLinear().domain(xExtent).range([rangeXOffset, width - 2]);\n  var y = d3.scaleLinear().domain(yExtent).range([height - 4, 0]);\n  var line = d3.line().x(function (d) {\n    return x(d.x);\n  }).y(function (d) {\n    return y(d.y);\n  }).curve(d3.curveBasis);\n  var svg = svgElement.attr('width', width).attr('height', height).attr('style', styles).append('g').attr('transform', 'translate(0, 2)');\n  svg.append('path').datum(data).attr('class', 'cryptohub-sparkline').attr('fill', 'none').attr('stroke', '#000').attr('stroke-width', '0.5px').attr('d', line);\n  svg.append('circle').attr('class', 'cryptohub-sparkline-circle').attr('cx', x(data[len - 1].x)).attr('cy', y(data[len - 1].y)).attr('fill', '#00A3E5').attr('stroke', 'none').attr('r', 1.5);\n\n  if (range) {\n    var priceArray = data.map(function (v) {\n      return v.y;\n    });\n    var percentSwing = Object(_array_percent_range_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(priceArray);\n    var rangeGroup = svg.append('g').attr('class', 'cryptohub-sparkline-range');\n    rangeGroup.append('title').text('Percent fluctuation over 7 days'); // rangeGroup.append('rect')\n    //   .attr('width', '20')\n    //   .attr('height', '12')\n    //   .attr('fill', '#fff')\n    //   .attr('fill-opacity', '0.8')\n    //   .attr('x', 0)\n    //   .attr('y', 0)\n    //   .attr('rx', 0)\n    //   .attr('ry', 0);\n\n    rangeGroup.append('text').attr('x', '2').attr('y', '8').attr('fill', '#555').attr('font-size', '10px').attr('text-anchor', 'start').text(percentSwing);\n  }\n\n  return svgElement;\n});\n\n//# sourceURL=webpack://bo/./src/d3-sparkline.js?");

/***/ }),

/***/ "./src/diff-numeric-strings.js":
/*!*************************************!*\
  !*** ./src/diff-numeric-strings.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return diffNumericStrings; });\n/**\n *\n * Diff Numeric Strings\n * This function is for identifying the changes between 2 numbers\n * For example in stock data if you wanted to know by how much a value\n * has increased or decreased\n *\n * v1     v2     return\n * 1234   1244   {start: 12, end: 44}\n * 10010  11000  {start: 1,  end: 1000}\n * 20000  12345  {start: ,   end: 12345}\n *\n * @param {String} v1\n * @param {String} v2\n * @return {Object}\n *\n */\nfunction diffNumericStrings(v1, v2) {\n  var s1;\n  var s2;\n  v1 = String(v1);\n  v2 = String(v2);\n\n  if (v2.length > v1.length) {\n    s1 = '';\n    s2 = v2;\n  } else {\n    var i = v1.length - 1;\n    var idx;\n\n    for (; i > -1; i--) {\n      if (v1.charAt(i) !== v2.charAt(i)) {\n        idx = i;\n      }\n    }\n\n    s1 = v2.substring(0, idx);\n    s2 = v2.substring(idx);\n  }\n\n  if (s1 === s2) s1 = '';\n  return {\n    start: s1,\n    end: s2\n  };\n}\n\n//# sourceURL=webpack://bo/./src/diff-numeric-strings.js?");

/***/ }),

/***/ "./src/format-number-as-currency.js":
/*!******************************************!*\
  !*** ./src/format-number-as-currency.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return formatNumberAsCurrency; });\n/**\n *\n * Format Number as Bitcoin\n *\n * num      precision     return\n * 12345    2             Ƀ12,345.00\n * 0.001    2             Ƀ0.00\n *\n * @param {Number} num\n * @param {Number} precision\n * @param {String} code - currency code\n * @return {String}\n *\n */\nfunction formatNumberAsCurrency(num, precision, code) {\n  var special = {\n    'BTC': '฿'\n  };\n  if (special[code]) precision = 8; // ugh\n\n  if (special[code]) {\n    return new Intl.NumberFormat('en-US', {\n      style: 'currency',\n      currency: 'USD',\n      minimumFractionDigits: precision,\n      maximumFractionDigits: precision\n    }).format(num).replace('$', special[code]);\n  } else {\n    return new Intl.NumberFormat('en-US', {\n      style: 'currency',\n      currency: code,\n      minimumFractionDigits: precision,\n      maximumFractionDigits: precision\n    }).format(num);\n  }\n}\n\n//# sourceURL=webpack://bo/./src/format-number-as-currency.js?");

/***/ }),

/***/ "./src/format-number-as.js":
/*!*********************************!*\
  !*** ./src/format-number-as.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return formatNumberAsCurrency; });\n/**\n *\n * Format Number as Bitcoin\n *\n * num      precision     return\n * 12345    2             Ƀ12,345.00\n * 0.001    2             Ƀ0.00\n *\n * @param {Number} num\n * @param {Number} precision\n * @param {String} code - currency code\n * @return {String}\n *\n */\nfunction formatNumberAsCurrency(num, precision, code) {\n  var special = {\n    'BTC': 'Ƀ'\n  };\n\n  if (special[code]) {\n    return new Intl.NumberFormat('en-US', {\n      style: 'currency',\n      currency: 'USD',\n      minimumFractionDigits: precision\n    }).format(num).replace('$', 'Ƀ');\n  } else {\n    return new Intl.NumberFormat('en-US', {\n      style: 'currency',\n      currency: code,\n      minimumFractionDigits: precision\n    }).format(num);\n  }\n}\n\n//# sourceURL=webpack://bo/./src/format-number-as.js?");

/***/ }),

/***/ "./src/get-random-int.js":
/*!*******************************!*\
  !*** ./src/get-random-int.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getRandomInt; });\n/**\n *\n * GET RANDOM INT\n *\n * Get a random integer between the min and max values provided\n * If no values are provided it will return an integer between 0 and 1,000,000\n *\n * NOTE: The min and max are inclusive\n *\n * @param {Number} [min]\n * @param {Number} [max]\n * @return {Number}\n *\n */\nfunction getRandomInt() {\n  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000000;\n  min = Math.ceil(min);\n  max = Math.floor(max);\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n//# sourceURL=webpack://bo/./src/get-random-int.js?");

/***/ }),

/***/ "./src/html-poll-element.js":
/*!**********************************!*\
  !*** ./src/html-poll-element.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return htmlPollElement; });\n/**\n *\n * HTML POLL ELEMENT\n *\n * Repeatidly check if an element is available in the DOM.\n * Call the callback function when it becomes available\n * and clear the interval\n *\n * @param {String} selector\n * @param {Number} interval\n * @param {Function} callback\n * @return {undefined}\n *\n */\nfunction htmlPollElement(selector, interval, callback) {\n  var inter = setInterval(function () {\n    if (document.querySelectorAll(selector)[0]) {\n      clearInterval(inter);\n      callback();\n    }\n  }, interval);\n}\n\n//# sourceURL=webpack://bo/./src/html-poll-element.js?");

/***/ }),

/***/ "./src/html-toggle-class.js":
/*!**********************************!*\
  !*** ./src/html-toggle-class.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return htmlToggleClass; });\n/**\n*\n* HTML TOGGLE CLASS\n*\n* Toggle a class on a DOM node\n*\n* @param {HTMLElement} element\n* @param {String} cssClass\n* @return {undefined}\n*\n*/\nfunction htmlToggleClass(element, cssClass) {\n  element.classList.contains(cssClass) ? element.classList.remove(cssClass) : element.classList.add(cssClass);\n}\n\n//# sourceURL=webpack://bo/./src/html-toggle-class.js?");

/***/ }),

/***/ "./src/is-float.js":
/*!*************************!*\
  !*** ./src/is-float.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return isFloat; });\n/**\n *\n * Is Float\n *\n * @param {*} x\n * @return {Boolean}\n *\n */\nfunction isFloat(x) {\n  return Number(x) === x && x % 1 !== 0;\n}\n\n//# sourceURL=webpack://bo/./src/is-float.js?");

/***/ }),

/***/ "./src/is-integer.js":
/*!***************************!*\
  !*** ./src/is-integer.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return isInteger; });\n/**\n *\n * Is Integer\n *\n * @param {*} x\n * @return {Boolean}\n *\n */\nfunction isInteger(x) {\n  return Number(x) === x && x % 1 === 0;\n}\n\n//# sourceURL=webpack://bo/./src/is-integer.js?");

/***/ }),

/***/ "./src/is-number.js":
/*!**************************!*\
  !*** ./src/is-number.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return isNumber; });\n/* harmony import */ var _is_integer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-integer.js */ \"./src/is-integer.js\");\n/* harmony import */ var _is_float_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-float.js */ \"./src/is-float.js\");\n\n\n/**\n *\n * Is Number\n * Check if the value is an Integer or a Float\n *\n * @param {*} x\n * @return {Boolean}\n *\n */\n\nfunction isNumber(x) {\n  return Object(_is_integer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x) || Object(_is_float_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(x);\n}\n\n//# sourceURL=webpack://bo/./src/is-number.js?");

/***/ }),

/***/ "./src/number-group-digits.js":
/*!************************************!*\
  !*** ./src/number-group-digits.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return numberGroupDigits; });\n/* harmony import */ var _is_integer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-integer.js */ \"./src/is-integer.js\");\n\n/**\n *\n * NUMBER GROUP DIGITS\n *\n * Group numbers with a delimiter\n *\n * func(1234)      // 1,234\n * func(123456)    // 123,456\n * func(1234, ' ') // 1 234\n *\n * @see https://en.wikipedia.org/wiki/Decimal_separator for further enhancements\n *\n * @param {Number} number\n * @param {String} [delimiter]\n * @return {String|Boolean}\n *\n */\n\nfunction numberGroupDigits(number) {\n  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';\n  if (!Object(_is_integer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(number)) return void false;\n  return Math.floor(number).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, \"$1\".concat(delimiter));\n}\n;\n\n//# sourceURL=webpack://bo/./src/number-group-digits.js?");

/***/ }),

/***/ "./src/number-normalize.js":
/*!*********************************!*\
  !*** ./src/number-normalize.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n *\n * Number Normalize\n *\n * Normalize a number from one range to another\n *\n * @param {Number} num - the number to be normalized\n * @param {Number} min - the min range of the original numbers\n * @param {Number} max - the max range of the original number\n * @param {Number} nMin - the new min range to apply\n * @param {Number} nMax - the new max range to apply\n * @return {Number} return the normalized number\n *\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (num, min, max, nMin, nMax) {\n  var percent = (num - nMin) / (nMax - nMin);\n  var output = percent * (max - min) + min;\n  return output;\n});\n\n//# sourceURL=webpack://bo/./src/number-normalize.js?");

/***/ }),

/***/ "./src/object-get-nested-property.js":
/*!*******************************************!*\
  !*** ./src/object-get-nested-property.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return objectGetNestedProperty; });\n/**\n *\n * Get nested property\n *\n * @param {Object} obj\n * @param {String} str\n * @return {Object|String} return the property, can be any value\n *\n */\nfunction objectGetNestedProperty(obj, str) {\n  var pathArr = str.split('.');\n  return pathArr.reduce(function (o, k) {\n    return o && o[k] !== void 0 ? o[k] : void 0;\n  }, obj);\n}\n\n//# sourceURL=webpack://bo/./src/object-get-nested-property.js?");

/***/ }),

/***/ "./src/object-is-empty-object.js":
/*!***************************************!*\
  !*** ./src/object-is-empty-object.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return objectIsEmptyObject; });\n/* harmony import */ var _object_is_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object-is-object */ \"./src/object-is-object.js\");\n\n/**\n *\n * IS EMPTY OBJECT\n *\n * @param {Object} object - object or any other type\n * @return {Boolean}\n *\n */\n\nfunction objectIsEmptyObject(data) {\n  return Object(_object_is_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(data) && !Object.keys(data).length;\n}\n\n//# sourceURL=webpack://bo/./src/object-is-empty-object.js?");

/***/ }),

/***/ "./src/object-is-object.js":
/*!*********************************!*\
  !*** ./src/object-is-object.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return objectIsObject; });\n/**\n *\n * objectIsObject\n *\n * @param {Object} object - object or any other type\n * @return {Boolean}\n *\n */\nfunction objectIsObject(object) {\n  return Object.prototype.toString.call(object) === '[object Object]';\n}\n\n//# sourceURL=webpack://bo/./src/object-is-object.js?");

/***/ }),

/***/ "./src/object-to-array.js":
/*!********************************!*\
  !*** ./src/object-to-array.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n/**\n *\n * @param {Object} data\n * @return {Array}\n *\n */\nmodule.exports = function objectToArray(data) {\n  var arrayData = [];\n\n  var _arr = Object.entries(data);\n\n  for (var _i = 0; _i < _arr.length; _i++) {\n    var _arr$_i = _slicedToArray(_arr[_i], 2),\n        id = _arr$_i[0],\n        obj = _arr$_i[1];\n\n    obj.id = obj.Id;\n    arrayData.push(obj);\n  }\n\n  return arrayData;\n};\n\n//# sourceURL=webpack://bo/./src/object-to-array.js?");

/***/ }),

/***/ "./src/partial-application.js":
/*!************************************!*\
  !*** ./src/partial-application.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n/**\n *\n * partialApplication\n *\n * @param {Function} fn\n * @param {Arguments} cache\n * @return {Function}\n *\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (fn) {\n  for (var _len = arguments.length, cache = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    cache[_key - 1] = arguments[_key];\n  }\n\n  return function () {\n    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n      args[_key2] = arguments[_key2];\n    }\n\n    var all = cache.concat(args);\n    return all.length >= fn.length ? fn.apply(void 0, _toConsumableArray(all)) : pApply.apply(void 0, [fn].concat(_toConsumableArray(all)));\n  };\n});\n\n//# sourceURL=webpack://bo/./src/partial-application.js?");

/***/ }),

/***/ "./src/string-camelcase.js":
/*!*********************************!*\
  !*** ./src/string-camelcase.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return camelcase; });\n/* harmony import */ var _string_capitalize_first_letter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string-capitalize-first-letter */ \"./src/string-capitalize-first-letter.js\");\n // bo-utils\n\n\n/**\n *\n * @param {String} str\n * @param {String} delimiter\n * @return {String}\n *\n */\n\nfunction camelcase(str, delimiter) {\n  return str.split('-').map(function (x, i) {\n    return !i ? x : Object(_string_capitalize_first_letter__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x);\n  }).join('');\n}\n\n//# sourceURL=webpack://bo/./src/string-camelcase.js?");

/***/ }),

/***/ "./src/string-capitalize-first-letter.js":
/*!***********************************************!*\
  !*** ./src/string-capitalize-first-letter.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return capitalizeFirstLetter; });\n/**\n *\n * @param {String} str\n * @return {String}\n *\n */\nfunction capitalizeFirstLetter(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\n//# sourceURL=webpack://bo/./src/string-capitalize-first-letter.js?");

/***/ }),

/***/ "./src/time-ago.js":
/*!*************************!*\
  !*** ./src/time-ago.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return timeAgo; });\n/**\n *\n * Timeago\n *\n * NOTE: Requires moment\n *\n * @param {String|Date|Number} timestamp\n * @return {String} e.g. 'a few seconds'\n *\n */\nfunction timeAgo(timestamp) {\n  var timeago;\n\n  if (timestamp !== void 0) {\n    var startDate = moment(timestamp);\n    var endDate = moment(new Date());\n    var ms = Math.abs(startDate.diff(endDate));\n    var duration = moment.duration(ms).humanize();\n    timeago = \"\".concat(duration, \" (\").concat(ms / 1000, \"s)\");\n  }\n\n  return timeago;\n}\n\n//# sourceURL=webpack://bo/./src/time-ago.js?");

/***/ })

/******/ });
});