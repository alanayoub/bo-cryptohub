// // ABC - a generic, native JS (A)scii(B)inary(C)onverter.
// // (c) 2013 Stephan Schmitz <eyecatchup@gmail.com>
// // License: MIT, http://eyecatchup.mit-license.org
// // URL: https://gist.github.com/eyecatchup/6742657
// var ABC = {
//   toAscii: function(bin) {
//     return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
//       return String.fromCharCode(parseInt(bin, 2))
//     })
//   },
//   toBinary: function(str, spaceSeparatedOctets) {
//     return str.replace(/[\s\S]/g, function(str) {
//       str = ABC.zeroPad(str.charCodeAt().toString(2));
//       return !1 == spaceSeparatedOctets ? str : str + " "
//     })
//   },
//   zeroPad: function(num) {
//     return "00000000".slice(String(num).length) + num
//   }
// };


/**
 *
 */
function BinaryToString(binary) {
  var error;
  try {
    return decodeURIComponent(escape(binary));
  } catch (_error) {
    error = _error;
    if (error instanceof URIError) {
      return binary;
    } else {
      throw error;
    }
  }
}

/**
 *
 */
function StringToBinary(string) {
  var chars;
  var code;
  var isUCS2;
  var len;
  var _i;
  var i;

  len = string.length;
  chars = [];
  isUCS2 = false;
  for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
    code = String.prototype.charCodeAt.call(string, i);
    if (code > 255) {
      isUCS2 = true;
      chars = null;
      break;
    } else {
      chars.push(code);
    }
  }
  if (isUCS2 === true) {
    return unescape(encodeURIComponent(string));
  } else {
    // NOTE: “RangeError: Maximum call stack size exceeded” Why?
    // Well, you are exceeding the browsers maximum number of supported arguments doing it this way. (normally ~65536). A for loop would probably be more sensible. – Xotic750 Mar 2 '14 at 4:27
    debugger
    const res = String.fromCharCode.apply(null, Array.prototype.slice.apply(chars))
    return res;
  }
}

/**
 *
 */
function arrayBufferToString(buffer) {
  const uInt8Arr = new Uint8Array(buffer);
  debugger;
  const binary = String.fromCharCode.apply(null, Array.prototype.slice.apply(uInt8Arr));
  return BinaryToString(binary);
}

/**
 *
 */
function stringToArrayBuffer(string) {

  const binary   = StringToBinary(string);
  const binLen   = binary.length;
  const buffer   = new ArrayBuffer(binLen);
  const uInt8Arr = new Uint8Array(buffer);

  let i, j;
  for (i = j = 0; 0 <= binLen ? j < binLen : j > binLen; i = 0 <= binLen ? ++j : --j) {
    uInt8Arr[i] = String.prototype.charCodeAt.call(binary, i);
  }

  return uInt8Arr.buffer;
}

module.exports = {
  arrayBufferToString,
  stringToArrayBuffer
};
