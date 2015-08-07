var assert = require('assert');

/**
 * @returns {Function} A function that, when called, returns a random 1 or 0
 *     with equal probability up until `len` digits.
 */
function randomBitGen(len) {
  assert.equal(typeof(len), 'number');
  var remaining = len;
  return function() {
    if (remaining > 0) {
      remaining--;
      return Math.random() >= 0.5 ? 1 : 0;
    } else {
      return null;
    }
  };
}

/**
 * @param value {number}
 * @returns {Function} A function that, when called, returns the bits of the
 *     integer `value`, starting from least to most significant.
 */
function intBitGen(value) {
  assert.equal(typeof(value), 'number');
  assert.equal(value, Math.floor(value), 'value is not an integer');
  assert(value < Math.pow(2, 53), 'value too large to be integer');
  var returnedAny = false;
  var remaining = value;
  return function() {
    if (remaining > 0 || !returnedAny) {
      var bit = remaining % 2;
      remaining >>= 1;
      returnedAny = true;
      return bit;
    } else {
      return null;
    }
  };
}

/**
 * @param value {string}
 * @returns {Function} A function that, when called, returns the bits of the
 *     hex string `value`, starting from least to most significant.
 */
function hexBitGen(value) {
  assert.equal(typeof(value), 'string');
  assert(/^[0-9a-fA-F]+$/.test(value), 'value is not a hex number');
  var returnedAny = false;
  var remaining = value;
  var offset = 0;
  var nibble = 0;
  return function() {
    if (offset++ % 4 === 0 && remaining.length > 0) {
      nibble = parseInt(remaining.substr(-1), 16);
      remaining = remaining.substr(0, remaining.length - 1);
    }
    if (nibble > 0 || remaining.length > 0 || !returnedAny) {
      var bit = nibble % 2;
      nibble >>= 1;
      returnedAny = true;
      return bit;
    } else {
      return null;
    }
  };
}

/**
 * @param value {string}
 * @returns {Function} A function that, when called, returns the bits of the
 *     binary digit string `value` (e.g. "10010110"), starting from least
 *     to most significant.
 */
function binaryDigitBitGen(value) {
  assert.equal(typeof(value), 'string');
  assert(/^[01]+$/.test(value), 'value is not a string of binary digits');
  var returnedAny = false;
  var remaining = value;
  return function() {
    var bit = 0;
    if (remaining) {
      bit = remaining.charCodeAt(remaining.length - 1) - 48;
      remaining = remaining.substr(0, remaining.length - 1);
      returnedAny = true;
      return bit;
    } else if (!returnedAny) {
      returnedAny = true;
      return 0;
    } else {
      return null;
    }
  };
}

module.exports = {
  random: randomBitGen,
  int: intBitGen,
  hex: hexBitGen,
  binaryDigit: binaryDigitBitGen
};
