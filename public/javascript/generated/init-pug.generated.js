module.exports = {'ch-tippy-click-tradingview': function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (id) {;pug_debug_line = 1;
pug_html = pug_html + "\u003Cdiv class=\"ch ch-tippy-click-tradingview\"\u003E";
;pug_debug_line = 2;
pug_html = pug_html + "\u003Cdiv" + (" class=\"ch-abs-full\""+pug.attr("id", id, true, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;},'ch-tippy-click': function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (body, header) {;pug_debug_line = 1;
pug_html = pug_html + "\u003Cdiv class=\"ch ch-tippy-click\"\u003E";
;pug_debug_line = 3;
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 4;
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 4;
pug_html = pug_html + (pug.escape(null == (pug_interp = header.name) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 5;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 5;
pug_html = pug_html + "listed on \u003Cstrong\u003E";
;pug_debug_line = 5;
pug_html = pug_html + (pug.escape(null == (pug_interp = header.total) ? "" : pug_interp));
;pug_debug_line = 5;
pug_html = pug_html + "\u003C\u002Fstrong\u003E exchanges \u002F ";
;pug_debug_line = 5;
pug_html = pug_html + (pug.escape(null == (pug_interp = header.numberOfPairs) ? "" : pug_interp));
;pug_debug_line = 5;
pug_html = pug_html + " pairs\u003C\u002Fspan\u003E";
;pug_debug_line = 6;
pug_html = pug_html + "\u003Cbr\u002F\u003E";
;pug_debug_line = 7;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 7;
pug_html = pug_html + (pug.escape(null == (pug_interp = header.numberOfFiat) ? "" : pug_interp));
;pug_debug_line = 7;
pug_html = pug_html + " accept fiat\u003C\u002Fspan\u003E";
;pug_debug_line = 8;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 8;
pug_html = pug_html + "&nbsp;\u002F ";
;pug_debug_line = 8;
pug_html = pug_html + (pug.escape(null == (pug_interp = header.numberOfCrypto) ? "" : pug_interp));
;pug_debug_line = 8;
pug_html = pug_html + " crypto only\u003C\u002Fspan\u003E";
;pug_debug_line = 9;
pug_html = pug_html + "\u003Cspan class=\"ch-dex\"\u003E";
;pug_debug_line = 9;
pug_html = pug_html + "&nbsp; (";
;pug_debug_line = 9;
pug_html = pug_html + (pug.escape(null == (pug_interp = header.numberOfDex) ? "" : pug_interp));
;pug_debug_line = 9;
pug_html = pug_html + " of which are DEX's)\u003C\u002Fspan\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 11;
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 12;
// iterate body
;(function(){
  var $$obj = body;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var val = $$obj[pug_index0];
;pug_debug_line = 13;
pug_html = pug_html + "\u003Cdiv class=\"ch-country\"\u003E";
;pug_debug_line = 14;
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 14;
pug_html = pug_html + (pug.escape(null == (pug_interp = val.country) ? "" : pug_interp)) + "\u003C\u002Fheader\u003E";
;pug_debug_line = 15;
pug_html = pug_html + "\u003Ctable\u003E";
;pug_debug_line = 16;
// iterate val.fiat
;(function(){
  var $$obj = val.fiat;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var fiat = $$obj[pug_index1];
;pug_debug_line = 17;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 18;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 20;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", fiat.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 21;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 22;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 22;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 23;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 24;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var fiat = $$obj[pug_index1];
;pug_debug_line = 17;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 18;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 20;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", fiat.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 21;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 22;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 22;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 23;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 24;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

;pug_debug_line = 28;
// iterate val.crypto
;(function(){
  var $$obj = val.crypto;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var crypto = $$obj[pug_index2];
;pug_debug_line = 29;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 30;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 31;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 32;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", crypto.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 33;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 34;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 34;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 35;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 36;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var crypto = $$obj[pug_index2];
;pug_debug_line = 29;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 30;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 31;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 32;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", crypto.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 33;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 34;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 34;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 35;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 36;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var val = $$obj[pug_index0];
;pug_debug_line = 13;
pug_html = pug_html + "\u003Cdiv class=\"ch-country\"\u003E";
;pug_debug_line = 14;
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 14;
pug_html = pug_html + (pug.escape(null == (pug_interp = val.country) ? "" : pug_interp)) + "\u003C\u002Fheader\u003E";
;pug_debug_line = 15;
pug_html = pug_html + "\u003Ctable\u003E";
;pug_debug_line = 16;
// iterate val.fiat
;(function(){
  var $$obj = val.fiat;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var fiat = $$obj[pug_index3];
;pug_debug_line = 17;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 18;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 20;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", fiat.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 21;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 22;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 22;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 23;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 24;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var fiat = $$obj[pug_index3];
;pug_debug_line = 17;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 18;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 20;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", fiat.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 21;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 22;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 22;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 23;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 24;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + "\u003Cspan class=\"ch-fiat\"\u003E";
;pug_debug_line = 25;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfFiatCurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 26;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 27;
pug_html = pug_html + (pug.escape(null == (pug_interp = fiat.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

;pug_debug_line = 28;
// iterate val.crypto
;(function(){
  var $$obj = val.crypto;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var crypto = $$obj[pug_index4];
;pug_debug_line = 29;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 30;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 31;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 32;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", crypto.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 33;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 34;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 34;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 35;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 36;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var crypto = $$obj[pug_index4];
;pug_debug_line = 29;
pug_html = pug_html + "\u003Ctr\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 30;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 31;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 32;
pug_html = pug_html + "\u003Ca" + (pug.attr("href", crypto.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 33;
pug_html = pug_html + "\u003Ci class=\"fas fa-external-link-alt\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 34;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 34;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 35;
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 36;
pug_html = pug_html + "\u003Cspan title=\"fiat \u002F crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "\u003Cspan class=\"ch-crypto\"\u003E";
;pug_debug_line = 37;
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 38;
pug_html = pug_html + "&nbsp;\u002F&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 39;
pug_html = pug_html + (pug.escape(null == (pug_interp = crypto.numberOfCryptocurrencies) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Ftd\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fsection\u003E";
;pug_debug_line = 41;
pug_html = pug_html + "\u003Cfooter\u003E\u003C\u002Ffooter\u003E\u003C\u002Fdiv\u003E";}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"header" in locals_for_with?locals_for_with.header:typeof header!=="undefined"?header:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}}