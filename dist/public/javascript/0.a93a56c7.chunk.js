(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./public/javascript/generated/init-pug.generated.js":
/*!***********************************************************!*\
  !*** ./public/javascript/generated/init-pug.generated.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  'ch-tippy-click-tradingview': function template(locals) {
    var pug_html = "",
        pug_mixins = {},
        pug_interp;
    var pug_debug_filename, pug_debug_line;

    try {
      ;
      var locals_for_with = locals || {};
      (function (id) {
        ;
        pug_debug_line = 1;
        pug_html = pug_html + "<div class=\"ch ch-tippy-click-tradingview\">";
        ;
        pug_debug_line = 2;
        pug_html = pug_html + "<div" + (" class=\"ch-abs-full\"" + pug.attr("id", id, true, false)) + "></div></div>";
      }).call(this, "id" in locals_for_with ? locals_for_with.id : typeof id !== "undefined" ? id : undefined);
    } catch (err) {
      pug.rethrow(err, pug_debug_filename, pug_debug_line);
    }

    ;
    return pug_html;
  },
  'ch-tippy-click': function template(locals) {
    var pug_html = "",
        pug_mixins = {},
        pug_interp;
    var pug_debug_filename, pug_debug_line;

    try {
      ;
      var locals_for_with = locals || {};
      (function (body, header) {
        ;
        pug_debug_line = 1;
        pug_html = pug_html + "<div class=\"ch ch-tippy-click\">";
        ;
        pug_debug_line = 3;
        pug_html = pug_html + "<header>";
        ;
        pug_debug_line = 4;
        pug_html = pug_html + "<h3>";
        ;
        pug_debug_line = 4;
        pug_html = pug_html + pug.escape(null == (pug_interp = header.name) ? "" : pug_interp) + "</h3>";
        ;
        pug_debug_line = 5;
        pug_html = pug_html + "<span>";
        ;
        pug_debug_line = 5;
        pug_html = pug_html + "listed on <strong>";
        ;
        pug_debug_line = 5;
        pug_html = pug_html + pug.escape(null == (pug_interp = header.total) ? "" : pug_interp);
        ;
        pug_debug_line = 5;
        pug_html = pug_html + "</strong> exchanges / ";
        ;
        pug_debug_line = 5;
        pug_html = pug_html + pug.escape(null == (pug_interp = header.numberOfPairs) ? "" : pug_interp);
        ;
        pug_debug_line = 5;
        pug_html = pug_html + " pairs</span>";
        ;
        pug_debug_line = 6;
        pug_html = pug_html + "<br/>";
        ;
        pug_debug_line = 7;
        pug_html = pug_html + "<span class=\"ch-fiat\">";
        ;
        pug_debug_line = 7;
        pug_html = pug_html + pug.escape(null == (pug_interp = header.numberOfFiat) ? "" : pug_interp);
        ;
        pug_debug_line = 7;
        pug_html = pug_html + " accept fiat</span>";
        ;
        pug_debug_line = 8;
        pug_html = pug_html + "<span>";
        ;
        pug_debug_line = 8;
        pug_html = pug_html + "&nbsp;/ ";
        ;
        pug_debug_line = 8;
        pug_html = pug_html + pug.escape(null == (pug_interp = header.numberOfCrypto) ? "" : pug_interp);
        ;
        pug_debug_line = 8;
        pug_html = pug_html + " crypto only</span>";
        ;
        pug_debug_line = 9;
        pug_html = pug_html + "<span class=\"ch-dex\">";
        ;
        pug_debug_line = 9;
        pug_html = pug_html + "&nbsp; (";
        ;
        pug_debug_line = 9;
        pug_html = pug_html + pug.escape(null == (pug_interp = header.numberOfDex) ? "" : pug_interp);
        ;
        pug_debug_line = 9;
        pug_html = pug_html + " of which are DEX's)</span></header>";
        ;
        pug_debug_line = 11;
        pug_html = pug_html + "<section>";
        ;
        pug_debug_line = 12; // iterate body

        ;
        (function () {
          var $$obj = body;

          if ('number' == typeof $$obj.length) {
            for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
              var val = $$obj[pug_index0];
              ;
              pug_debug_line = 13;
              pug_html = pug_html + "<div class=\"ch-country\">";
              ;
              pug_debug_line = 14;
              pug_html = pug_html + "<header>";
              ;
              pug_debug_line = 14;
              pug_html = pug_html + pug.escape(null == (pug_interp = val.country) ? "" : pug_interp) + "</header>";
              ;
              pug_debug_line = 15;
              pug_html = pug_html + "<table>";
              ;
              pug_debug_line = 16; // iterate val.fiat

              ;
              (function () {
                var $$obj = val.fiat;

                if ('number' == typeof $$obj.length) {
                  for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
                    var fiat = $$obj[pug_index1];
                    ;
                    pug_debug_line = 17;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 18;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 19;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 20;
                    pug_html = pug_html + "<a" + (pug.attr("href", fiat.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 21;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 23;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 24;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp) + "</span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                } else {
                  var $$l = 0;

                  for (var pug_index1 in $$obj) {
                    $$l++;
                    var fiat = $$obj[pug_index1];
                    ;
                    pug_debug_line = 17;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 18;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 19;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 20;
                    pug_html = pug_html + "<a" + (pug.attr("href", fiat.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 21;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 23;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 24;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp) + "</span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                }
              }).call(this);
              ;
              pug_debug_line = 28; // iterate val.crypto

              ;
              (function () {
                var $$obj = val.crypto;

                if ('number' == typeof $$obj.length) {
                  for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
                    var crypto = $$obj[pug_index2];
                    ;
                    pug_debug_line = 29;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 30;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 31;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 32;
                    pug_html = pug_html + "<a" + (pug.attr("href", crypto.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 33;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 35;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 36;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "0</span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                } else {
                  var $$l = 0;

                  for (var pug_index2 in $$obj) {
                    $$l++;
                    var crypto = $$obj[pug_index2];
                    ;
                    pug_debug_line = 29;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 30;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 31;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 32;
                    pug_html = pug_html + "<a" + (pug.attr("href", crypto.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 33;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 35;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 36;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "0</span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                }
              }).call(this);
              pug_html = pug_html + "</table></div>";
            }
          } else {
            var $$l = 0;

            for (var pug_index0 in $$obj) {
              $$l++;
              var val = $$obj[pug_index0];
              ;
              pug_debug_line = 13;
              pug_html = pug_html + "<div class=\"ch-country\">";
              ;
              pug_debug_line = 14;
              pug_html = pug_html + "<header>";
              ;
              pug_debug_line = 14;
              pug_html = pug_html + pug.escape(null == (pug_interp = val.country) ? "" : pug_interp) + "</header>";
              ;
              pug_debug_line = 15;
              pug_html = pug_html + "<table>";
              ;
              pug_debug_line = 16; // iterate val.fiat

              ;
              (function () {
                var $$obj = val.fiat;

                if ('number' == typeof $$obj.length) {
                  for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
                    var fiat = $$obj[pug_index3];
                    ;
                    pug_debug_line = 17;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 18;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 19;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 20;
                    pug_html = pug_html + "<a" + (pug.attr("href", fiat.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 21;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 23;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 24;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp) + "</span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                } else {
                  var $$l = 0;

                  for (var pug_index3 in $$obj) {
                    $$l++;
                    var fiat = $$obj[pug_index3];
                    ;
                    pug_debug_line = 17;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 18;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 19;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 20;
                    pug_html = pug_html + "<a" + (pug.attr("href", fiat.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 21;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 22;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 23;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 24;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + "<span class=\"ch-fiat\">";
                    ;
                    pug_debug_line = 25;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp) + "</span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 26;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 27;
                    pug_html = pug_html + pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                }
              }).call(this);
              ;
              pug_debug_line = 28; // iterate val.crypto

              ;
              (function () {
                var $$obj = val.crypto;

                if ('number' == typeof $$obj.length) {
                  for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
                    var crypto = $$obj[pug_index4];
                    ;
                    pug_debug_line = 29;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 30;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 31;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 32;
                    pug_html = pug_html + "<a" + (pug.attr("href", crypto.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 33;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 35;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 36;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "0</span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                } else {
                  var $$l = 0;

                  for (var pug_index4 in $$obj) {
                    $$l++;
                    var crypto = $$obj[pug_index4];
                    ;
                    pug_debug_line = 29;
                    pug_html = pug_html + "<tr></tr>";
                    ;
                    pug_debug_line = 30;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 31;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 32;
                    pug_html = pug_html + "<a" + (pug.attr("href", crypto.url, true, false) + " target=\"_blank\"") + ">";
                    ;
                    pug_debug_line = 33;
                    pug_html = pug_html + "<i class=\"fas fa-external-link-alt\"></i></a>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 34;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp) + "</span></span></td>";
                    ;
                    pug_debug_line = 35;
                    pug_html = pug_html + "<td>";
                    ;
                    pug_debug_line = 36;
                    pug_html = pug_html + "<span title=\"fiat / crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "<span class=\"ch-crypto\">";
                    ;
                    pug_debug_line = 37;
                    pug_html = pug_html + "0</span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 38;
                    pug_html = pug_html + "&nbsp;/&nbsp;</span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + "<span>";
                    ;
                    pug_debug_line = 39;
                    pug_html = pug_html + pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp) + "</span></span></td>";
                  }
                }
              }).call(this);
              pug_html = pug_html + "</table></div>";
            }
          }
        }).call(this);
        pug_html = pug_html + "</section>";
        ;
        pug_debug_line = 41;
        pug_html = pug_html + "<footer></footer></div>";
      }).call(this, "body" in locals_for_with ? locals_for_with.body : typeof body !== "undefined" ? body : undefined, "header" in locals_for_with ? locals_for_with.header : typeof header !== "undefined" ? header : undefined);
    } catch (err) {
      pug.rethrow(err, pug_debug_filename, pug_debug_line);
    }

    ;
    return pug_html;
  }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvamF2YXNjcmlwdC9nZW5lcmF0ZWQvaW5pdC1wdWcuZ2VuZXJhdGVkLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZW1wbGF0ZSIsImxvY2FscyIsInB1Z19odG1sIiwicHVnX21peGlucyIsInB1Z19pbnRlcnAiLCJwdWdfZGVidWdfZmlsZW5hbWUiLCJwdWdfZGVidWdfbGluZSIsImxvY2Fsc19mb3Jfd2l0aCIsImlkIiwicHVnIiwiYXR0ciIsImNhbGwiLCJ1bmRlZmluZWQiLCJlcnIiLCJyZXRocm93IiwiYm9keSIsImhlYWRlciIsImVzY2FwZSIsIm5hbWUiLCJ0b3RhbCIsIm51bWJlck9mUGFpcnMiLCJudW1iZXJPZkZpYXQiLCJudW1iZXJPZkNyeXB0byIsIm51bWJlck9mRGV4IiwiJCRvYmoiLCJsZW5ndGgiLCJwdWdfaW5kZXgwIiwiJCRsIiwidmFsIiwiY291bnRyeSIsImZpYXQiLCJwdWdfaW5kZXgxIiwidXJsIiwibnVtYmVyT2ZGaWF0Q3VycmVuY2llcyIsIm51bWJlck9mQ3J5cHRvY3VycmVuY2llcyIsImNyeXB0byIsInB1Z19pbmRleDIiLCJwdWdfaW5kZXgzIiwicHVnX2luZGV4NCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUFDLGdDQUE4QixTQUFTQyxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtBQUFDLFFBQUlDLFFBQVEsR0FBRyxFQUFmO0FBQUEsUUFBbUJDLFVBQVUsR0FBRyxFQUFoQztBQUFBLFFBQW9DQyxVQUFwQztBQUErQyxRQUFJQyxrQkFBSixFQUF3QkMsY0FBeEI7O0FBQXVDLFFBQUk7QUFBQztBQUFDLFVBQUlDLGVBQWUsR0FBSU4sTUFBTSxJQUFJLEVBQWpDO0FBQXNDLGlCQUFVTyxFQUFWLEVBQWM7QUFBQztBQUFDRixzQkFBYyxHQUFHLENBQWpCO0FBQzdOSixnQkFBUSxHQUFHQSxRQUFRLEdBQUcsK0NBQXRC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QWpCO0FBQ0RKLGdCQUFRLEdBQUdBLFFBQVEsR0FBRyx5QkFBdEI7QUFBeUYsT0F2WWdhLEVBdVkvWlMsSUF2WStaLENBdVkxWixJQXZZMFosRUF1WXJaLFVBQVVKLGVBQVYsR0FBMEJBLGVBQWUsQ0FBQ1EsSUFBMUMsR0FBK0MsT0FBT0EsSUFBUCxLQUFjLFdBQWQsR0FBMEJBLElBQTFCLEdBQStCSCxTQXZZdVUsRUF1WTdULFlBQVlMLGVBQVosR0FBNEJBLGVBQWUsQ0FBQ1MsTUFBNUMsR0FBbUQsT0FBT0EsTUFBUCxLQUFnQixXQUFoQixHQUE0QkEsTUFBNUIsR0FBbUNKLFNBdll1TyxDQUFEO0FBdVl6TixLQXZZOEssQ0F1WTdLLE9BQU9DLEdBQVAsRUFBWTtBQUFDSixTQUFHLENBQUNLLE9BQUosQ0FBWUQsR0FBWixFQUFpQlIsa0JBQWpCLEVBQXFDQyxjQUFyQztBQUFzRDs7QUFBQTtBQUFDLFdBQU9KLFFBQVA7QUFBaUI7QUExWXBXLENBQWpCLEMiLCJmaWxlIjoiamF2YXNjcmlwdC8wLmE5M2E1NmM3LmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7J2NoLXRpcHB5LWNsaWNrLXRyYWRpbmd2aWV3JzogZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO3ZhciBwdWdfZGVidWdfZmlsZW5hbWUsIHB1Z19kZWJ1Z19saW5lO3RyeSB7O3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGlkKSB7O3B1Z19kZWJ1Z19saW5lID0gMTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcImNoIGNoLXRpcHB5LWNsaWNrLXRyYWRpbmd2aWV3XFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZGl2XCIgKyAoXCIgY2xhc3M9XFxcImNoLWFicy1mdWxsXFxcIlwiK3B1Zy5hdHRyKFwiaWRcIiwgaWQsIHRydWUsIGZhbHNlKSkgKyBcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjt9LmNhbGwodGhpcyxcImlkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5pZDp0eXBlb2YgaWQhPT1cInVuZGVmaW5lZFwiP2lkOnVuZGVmaW5lZCkpO30gY2F0Y2ggKGVycikge3B1Zy5yZXRocm93KGVyciwgcHVnX2RlYnVnX2ZpbGVuYW1lLCBwdWdfZGVidWdfbGluZSk7fTtyZXR1cm4gcHVnX2h0bWw7fSwnY2gtdGlwcHktY2xpY2snOiBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHt2YXIgcHVnX2h0bWwgPSBcIlwiLCBwdWdfbWl4aW5zID0ge30sIHB1Z19pbnRlcnA7dmFyIHB1Z19kZWJ1Z19maWxlbmFtZSwgcHVnX2RlYnVnX2xpbmU7dHJ5IHs7dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYm9keSwgaGVhZGVyKSB7O3B1Z19kZWJ1Z19saW5lID0gMTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcImNoIGNoLXRpcHB5LWNsaWNrXFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDaGVhZGVyXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gNDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NoM1xcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGhlYWRlci5uYW1lKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGaDNcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSA1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSA1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwibGlzdGVkIG9uIFxcdTAwM0NzdHJvbmdcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSA1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBoZWFkZXIudG90YWwpID8gXCJcIiA6IHB1Z19pbnRlcnApKTtcbjtwdWdfZGVidWdfbGluZSA9IDU7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDXFx1MDAyRnN0cm9uZ1xcdTAwM0UgZXhjaGFuZ2VzIFxcdTAwMkYgXCI7XG47cHVnX2RlYnVnX2xpbmUgPSA1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBoZWFkZXIubnVtYmVyT2ZQYWlycykgPyBcIlwiIDogcHVnX2ludGVycCkpO1xuO3B1Z19kZWJ1Z19saW5lID0gNTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIiBwYWlyc1xcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDY7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYnJcXHUwMDJGXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gNztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIGNsYXNzPVxcXCJjaC1maWF0XFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGhlYWRlci5udW1iZXJPZkZpYXQpID8gXCJcIiA6IHB1Z19pbnRlcnApKTtcbjtwdWdfZGVidWdfbGluZSA9IDc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCIgYWNjZXB0IGZpYXRcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSA4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSA4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiJm5ic3A7XFx1MDAyRiBcIjtcbjtwdWdfZGVidWdfbGluZSA9IDg7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGhlYWRlci5udW1iZXJPZkNyeXB0bykgPyBcIlwiIDogcHVnX2ludGVycCkpO1xuO3B1Z19kZWJ1Z19saW5lID0gODtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIiBjcnlwdG8gb25seVxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtZGV4XFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCImbmJzcDsgKFwiO1xuO3B1Z19kZWJ1Z19saW5lID0gOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gaGVhZGVyLm51bWJlck9mRGV4KSA/IFwiXCIgOiBwdWdfaW50ZXJwKSk7XG47cHVnX2RlYnVnX2xpbmUgPSA5O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiIG9mIHdoaWNoIGFyZSBERVgncylcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZoZWFkZXJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAxMTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzZWN0aW9uXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMTI7XG4vLyBpdGVyYXRlIGJvZHlcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gYm9keTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIHB1Z19pbmRleDAgPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7IHB1Z19pbmRleDAgPCAkJGw7IHB1Z19pbmRleDArKykge1xuICAgICAgICB2YXIgdmFsID0gJCRvYmpbcHVnX2luZGV4MF07XG47cHVnX2RlYnVnX2xpbmUgPSAxMztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcImNoLWNvdW50cnlcXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMTQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDaGVhZGVyXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMTQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IHZhbC5jb3VudHJ5KSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGaGVhZGVyXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMTU7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdGFibGVcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAxNjtcbi8vIGl0ZXJhdGUgdmFsLmZpYXRcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gdmFsLmZpYXQ7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgxID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgxIDwgJCRsOyBwdWdfaW5kZXgxKyspIHtcbiAgICAgICAgdmFyIGZpYXQgPSAkJG9ialtwdWdfaW5kZXgxXTtcbjtwdWdfZGVidWdfbGluZSA9IDE3O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RyXFx1MDAzRVxcdTAwM0NcXHUwMDJGdHJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAxODtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDE5O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW4gY2xhc3M9XFxcImNoLWZpYXRcXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjA7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYVwiICsgKHB1Zy5hdHRyKFwiaHJlZlwiLCBmaWF0LnVybCwgdHJ1ZSwgZmFsc2UpK1wiIHRhcmdldD1cXFwiX2JsYW5rXFxcIlwiKSArIFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjE7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDaSBjbGFzcz1cXFwiZmFzIGZhLWV4dGVybmFsLWxpbmstYWx0XFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjI7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDIyO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBmaWF0Lm5hbWUpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnRkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjM7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIHRpdGxlPVxcXCJmaWF0IFxcdTAwMkYgY3J5cHRvXFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW4gY2xhc3M9XFxcImNoLWZpYXRcXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjU7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGZpYXQubnVtYmVyT2ZGaWF0Q3VycmVuY2llcykgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNjtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjY7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCImbmJzcDtcXHUwMDJGJm5ic3A7XFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI3O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBmaWF0Lm51bWJlck9mQ3J5cHRvY3VycmVuY2llcykgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGRcXHUwMDNFXCI7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4MSBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgZmlhdCA9ICQkb2JqW3B1Z19pbmRleDFdO1xuO3B1Z19kZWJ1Z19saW5lID0gMTc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdHJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0clxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDE4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMTk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtZmlhdFxcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NhXCIgKyAocHVnLmF0dHIoXCJocmVmXCIsIGZpYXQudXJsLCB0cnVlLCBmYWxzZSkrXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXCIpICsgXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NpIGNsYXNzPVxcXCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGaVxcdTAwM0VcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMjtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjI7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGZpYXQubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI0O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW4gdGl0bGU9XFxcImZpYXQgXFx1MDAyRiBjcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjU7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtZmlhdFxcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gZmlhdC5udW1iZXJPZkZpYXRDdXJyZW5jaWVzKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI2O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNjtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIiZuYnNwO1xcdTAwMkYmbmJzcDtcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGZpYXQubnVtYmVyT2ZDcnlwdG9jdXJyZW5jaWVzKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0ZFxcdTAwM0VcIjtcbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbjtwdWdfZGVidWdfbGluZSA9IDI4O1xuLy8gaXRlcmF0ZSB2YWwuY3J5cHRvXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHZhbC5jcnlwdG87XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBwdWdfaW5kZXgyID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyBwdWdfaW5kZXgyIDwgJCRsOyBwdWdfaW5kZXgyKyspIHtcbiAgICAgICAgdmFyIGNyeXB0byA9ICQkb2JqW3B1Z19pbmRleDJdO1xuO3B1Z19kZWJ1Z19saW5lID0gMjk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdHJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0clxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDMwO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzE7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtY3J5cHRvXFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDMyO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2FcIiArIChwdWcuYXR0cihcImhyZWZcIiwgY3J5cHRvLnVybCwgdHJ1ZSwgZmFsc2UpK1wiIHRhcmdldD1cXFwiX2JsYW5rXFxcIlwiKSArIFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzM7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDaSBjbGFzcz1cXFwiZmFzIGZhLWV4dGVybmFsLWxpbmstYWx0XFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM0O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBjcnlwdG8ubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzNTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM2O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW4gdGl0bGU9XFxcImZpYXQgXFx1MDAyRiBjcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtY3J5cHRvXFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM3O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiMFxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzODtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIiZuYnNwO1xcdTAwMkYmbmJzcDtcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGNyeXB0by5udW1iZXJPZkNyeXB0b2N1cnJlbmNpZXMpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnRkXFx1MDAzRVwiO1xuICAgICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyIHB1Z19pbmRleDIgaW4gJCRvYmopIHtcbiAgICAgICQkbCsrO1xuICAgICAgdmFyIGNyeXB0byA9ICQkb2JqW3B1Z19pbmRleDJdO1xuO3B1Z19kZWJ1Z19saW5lID0gMjk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdHJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0clxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDMwO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzE7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtY3J5cHRvXFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDMyO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2FcIiArIChwdWcuYXR0cihcImhyZWZcIiwgY3J5cHRvLnVybCwgdHJ1ZSwgZmFsc2UpK1wiIHRhcmdldD1cXFwiX2JsYW5rXFxcIlwiKSArIFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzM7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDaSBjbGFzcz1cXFwiZmFzIGZhLWV4dGVybmFsLWxpbmstYWx0XFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmlcXHUwMDNFXFx1MDAzQ1xcdTAwMkZhXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM0O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBjcnlwdG8ubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzNTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM2O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW4gdGl0bGU9XFxcImZpYXQgXFx1MDAyRiBjcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtY3J5cHRvXFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM3O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiMFxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzODtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIiZuYnNwO1xcdTAwMkYmbmJzcDtcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGNyeXB0by5udW1iZXJPZkNyeXB0b2N1cnJlbmNpZXMpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnRkXFx1MDAzRVwiO1xuICAgIH1cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ1xcdTAwMkZ0YWJsZVxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgwIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciB2YWwgPSAkJG9ialtwdWdfaW5kZXgwXTtcbjtwdWdfZGVidWdfbGluZSA9IDEzO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2RpdiBjbGFzcz1cXFwiY2gtY291bnRyeVxcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAxNDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NoZWFkZXJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAxNDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gdmFsLmNvdW50cnkpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZoZWFkZXJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAxNTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0YWJsZVxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDE2O1xuLy8gaXRlcmF0ZSB2YWwuZmlhdFxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSB2YWwuZmlhdDtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIHB1Z19pbmRleDMgPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7IHB1Z19pbmRleDMgPCAkJGw7IHB1Z19pbmRleDMrKykge1xuICAgICAgICB2YXIgZmlhdCA9ICQkb2JqW3B1Z19pbmRleDNdO1xuO3B1Z19kZWJ1Z19saW5lID0gMTc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdHJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0clxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDE4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMTk7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtZmlhdFxcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NhXCIgKyAocHVnLmF0dHIoXCJocmVmXCIsIGZpYXQudXJsLCB0cnVlLCBmYWxzZSkrXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXCIpICsgXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NpIGNsYXNzPVxcXCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGaVxcdTAwM0VcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMjtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjI7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGZpYXQubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI0O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW4gdGl0bGU9XFxcImZpYXQgXFx1MDAyRiBjcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjU7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiBjbGFzcz1cXFwiY2gtZmlhdFxcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gZmlhdC5udW1iZXJPZkZpYXRDdXJyZW5jaWVzKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI2O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNjtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIiZuYnNwO1xcdTAwMkYmbmJzcDtcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGZpYXQubnVtYmVyT2ZDcnlwdG9jdXJyZW5jaWVzKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0ZFxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgzIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciBmaWF0ID0gJCRvYmpbcHVnX2luZGV4M107XG47cHVnX2RlYnVnX2xpbmUgPSAxNztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0clxcdTAwM0VcXHUwMDNDXFx1MDAyRnRyXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMTg7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAxOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIGNsYXNzPVxcXCJjaC1maWF0XFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDIwO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2FcIiArIChwdWcuYXR0cihcImhyZWZcIiwgZmlhdC51cmwsIHRydWUsIGZhbHNlKStcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCJcIikgKyBcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDIxO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ2kgY2xhc3M9XFxcImZhcyBmYS1leHRlcm5hbC1saW5rLWFsdFxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZpXFx1MDAzRVxcdTAwM0NcXHUwMDJGYVxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDIyO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyMjtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gZmlhdC5uYW1lKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDIzO1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiB0aXRsZT1cXFwiZmlhdCBcXHUwMDJGIGNyeXB0b1xcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIGNsYXNzPVxcXCJjaC1maWF0XFxcIlxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIChwdWcuZXNjYXBlKG51bGwgPT0gKHB1Z19pbnRlcnAgPSBmaWF0Lm51bWJlck9mRmlhdEN1cnJlbmNpZXMpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMjY7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI2O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiJm5ic3A7XFx1MDAyRiZuYnNwO1xcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDI3O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAyNztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gZmlhdC5udW1iZXJPZkNyeXB0b2N1cnJlbmNpZXMpID8gXCJcIiA6IHB1Z19pbnRlcnApKSArIFwiXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnRkXFx1MDAzRVwiO1xuICAgIH1cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxuO3B1Z19kZWJ1Z19saW5lID0gMjg7XG4vLyBpdGVyYXRlIHZhbC5jcnlwdG9cbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gdmFsLmNyeXB0bztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIHB1Z19pbmRleDQgPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7IHB1Z19pbmRleDQgPCAkJGw7IHB1Z19pbmRleDQrKykge1xuICAgICAgICB2YXIgY3J5cHRvID0gJCRvYmpbcHVnX2luZGV4NF07XG47cHVnX2RlYnVnX2xpbmUgPSAyOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0clxcdTAwM0VcXHUwMDNDXFx1MDAyRnRyXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzA7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzMTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIGNsYXNzPVxcXCJjaC1jcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzI7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYVwiICsgKHB1Zy5hdHRyKFwiaHJlZlwiLCBjcnlwdG8udXJsLCB0cnVlLCBmYWxzZSkrXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXCIpICsgXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzMztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NpIGNsYXNzPVxcXCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGaVxcdTAwM0VcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzNDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGNyeXB0by5uYW1lKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzY7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiB0aXRsZT1cXFwiZmlhdCBcXHUwMDJGIGNyeXB0b1xcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzNztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIGNsYXNzPVxcXCJjaC1jcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCIwXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzg7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiJm5ic3A7XFx1MDAyRiZuYnNwO1xcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM5O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gY3J5cHRvLm51bWJlck9mQ3J5cHRvY3VycmVuY2llcykgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGRcXHUwMDNFXCI7XG4gICAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgcHVnX2luZGV4NCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7XG4gICAgICB2YXIgY3J5cHRvID0gJCRvYmpbcHVnX2luZGV4NF07XG47cHVnX2RlYnVnX2xpbmUgPSAyOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0N0clxcdTAwM0VcXHUwMDNDXFx1MDAyRnRyXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzA7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDdGRcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzMTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIGNsYXNzPVxcXCJjaC1jcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzI7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYVwiICsgKHB1Zy5hdHRyKFwiaHJlZlwiLCBjcnlwdG8udXJsLCB0cnVlLCBmYWxzZSkrXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXCIpICsgXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzMztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NpIGNsYXNzPVxcXCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGaVxcdTAwM0VcXHUwMDNDXFx1MDAyRmFcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzNDtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzQ7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IGNyeXB0by5uYW1lKSA/IFwiXCIgOiBwdWdfaW50ZXJwKSkgKyBcIlxcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZ0ZFxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM1O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3RkXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzY7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhbiB0aXRsZT1cXFwiZmlhdCBcXHUwMDJGIGNyeXB0b1xcXCJcXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzNztcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NzcGFuIGNsYXNzPVxcXCJjaC1jcnlwdG9cXFwiXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzc7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCIwXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gMzg7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM4O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiJm5ic3A7XFx1MDAyRiZuYnNwO1xcdTAwM0NcXHUwMDJGc3BhblxcdTAwM0VcIjtcbjtwdWdfZGVidWdfbGluZSA9IDM5O1xucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ3NwYW5cXHUwMDNFXCI7XG47cHVnX2RlYnVnX2xpbmUgPSAzOTtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyAocHVnLmVzY2FwZShudWxsID09IChwdWdfaW50ZXJwID0gY3J5cHRvLm51bWJlck9mQ3J5cHRvY3VycmVuY2llcykgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NcXHUwMDJGdGRcXHUwMDNFXCI7XG4gICAgfVxuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDXFx1MDAyRnRhYmxlXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO1xuICAgIH1cbiAgfVxufSkuY2FsbCh0aGlzKTtcblxucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ1xcdTAwMkZzZWN0aW9uXFx1MDAzRVwiO1xuO3B1Z19kZWJ1Z19saW5lID0gNDE7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDZm9vdGVyXFx1MDAzRVxcdTAwM0NcXHUwMDJGZm9vdGVyXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO30uY2FsbCh0aGlzLFwiYm9keVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYm9keTp0eXBlb2YgYm9keSE9PVwidW5kZWZpbmVkXCI/Ym9keTp1bmRlZmluZWQsXCJoZWFkZXJcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmhlYWRlcjp0eXBlb2YgaGVhZGVyIT09XCJ1bmRlZmluZWRcIj9oZWFkZXI6dW5kZWZpbmVkKSk7fSBjYXRjaCAoZXJyKSB7cHVnLnJldGhyb3coZXJyLCBwdWdfZGVidWdfZmlsZW5hbWUsIHB1Z19kZWJ1Z19saW5lKTt9O3JldHVybiBwdWdfaHRtbDt9fSJdLCJzb3VyY2VSb290IjoiIn0=