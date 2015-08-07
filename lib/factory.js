var assert = require('assert');
var bitGenerator = require('./bit_generator');
var WordGenerator = require('./word_generator');

/**
 * @param generators {WordGenerator[]}
 * @constructor
 */
function Factory(generators) {
  var bits = 0;
  generators.forEach(function(generator) {
    assert(generator instanceof WordGenerator);
    bits += generator.numBits();
  });
  assert(bits > 0);

  this.generators = generators;
  this._numBits = bits;
}

/**
 * @returns {string[]} An array of words randomly chosen from amongst
 *     `numPossiblePhrases` possibilities.
 */
Factory.prototype.randomPhrase = function() {
  return this.phraseFromBits(bitGenerator.random(this._numBits));
};

/**
 * @param num {number}
 * @returns {string[]} An array of words chosen to correspond to the integer
 *     supplied in `num`.
 */
Factory.prototype.phraseFromInt = function(num) {
  return this.phraseFromBits(bitGenerator.int(num));
};

/**
 * @param value {string}
 * @returns {string[]} An array of words chosen to correspond to the hex
 *     value supplied.
 */
Factory.prototype.phraseFromHex = function(value) {
  return this.phraseFromBits(bitGenerator.hex(value));
};

/**
 * @param bitGen {function} A function that when called, returns a 1 or 0
 *     starting from least to most significant bit
 * @returns {string[]} The specific phrase (array of words) corresponding to
 *     the number built up from the bit stream.
 */
Factory.prototype.phraseFromBits = function(bitGen) {
  assert.equal(typeof(bitGen), 'function');
  var words = [];
  this.generators.forEach(function(generator) {
    // Shift off the number of bits the generator expects and use it
    // to generate the next word in the phrase.
    var numBits = generator.numBits();
    var wordIndex = 0;
    for (var i = 0; i < numBits; i++) {
      var bit = bitGen() || 0;
      wordIndex += (bit << i);
    }
    words.push(generator.word(wordIndex));
  });
  return words;
};

/**
 * @returns {number} The total number of possible phrases this could return.
 */
Factory.prototype.numPossiblePhrases = function() {
  return Math.pow(2, this._numBits); // left-shift would truncate to 32-bit int
};

module.exports = Factory;