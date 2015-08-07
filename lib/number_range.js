var WordGenerator = require('./word_generator');
var assert = require('assert');
var util = require('util');

/**
 * A word generator that generates a number.
 *
 * @param numBits {number} Generate numbers with this many bits in depth.
 * @param offset {number} Offset all generated numbers by this amount.
 * @constructor
 */
function NumberRange(numBits, offset) {
  this._numBits = numBits;
  this._offset = offset || 0;
}
util.inherits(NumberRange, WordGenerator);

NumberRange.prototype.numBits = function() {
  return this._numBits;
};

NumberRange.prototype.word = function(num) {
  assert.equal(typeof(num), 'number');
  assert(num >= 0);
  assert(num < this.size());
  return '' + (num + this._offset);
};

module.exports = NumberRange;
