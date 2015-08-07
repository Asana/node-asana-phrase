var WordGenerator = require('./word_generator');
var assert = require('assert');
var util = require('util');

/**
 * A word generator that draws from a dictionary of words.
 *
 * @param words {String[]} List of words the dictionary should draw on.
 *     The length must be an even power of two.
 * @constructor
 */
function Dictionary(words) {
  var size = words.length;
  this._numBits = 0;
  for (var x = size; x > 1; x = x >> 1) {
    if (x % 2 === 1) {
      throw new Error('Dictionary size is not an even power of two: ' + size);
    }
    this._numBits++;
  }
  assert.equal(words.length, this.size());
  this._words = words;
}
util.inherits(Dictionary, WordGenerator);

Dictionary.prototype.numBits = function() {
  return this._numBits;
};

Dictionary.prototype.word = function(num) {
  assert.equal(typeof(num), 'number');
  assert(num >= 0);
  assert(num < this.size());
  return '' + this._words[num];
};

module.exports = Dictionary;
