var assert = require('assert');

function randInt(max) {
  // Per ECMAScript sections 15.8.2.14(random()), 4.3.19(number value)
  // Math.random gives 52 bits of pseudorandomness (implementation dependent)
  // We degrade it to max of 32 bits here.
  return Math.floor(Math.random() * max);
}

/**
 * @param generators {WordGenerator[]}
 * @constructor
 */
function Factory(generators) {
  var bits = 0;
  generators.forEach(function(generator) {
    bits += generator.numBits();
  });
  assert(bits >= 0);
  assert(bits <= 53, 'Integers cannot exceed 53 bits in JavaScript');

  this.generators = generators;
  this.numBits = bits;
}

/**
 * @returns {string[]} An array of words randomly chosen from amongst
 *     `numPossiblePhrases` possibilities.
 */
Factory.prototype.randomPhrase = function() {
  return this.phraseFromInt(randInt(this.numPossiblePhrases()));
};

/**
 * @param num {number}
 * @returns {string[]} The specific phrase (array of words) corresponding to
 *     the number provided
 */
Factory.prototype.phraseFromInt = function(num) {
  assert(typeof(num) === 'number');
  assert(num === Math.floor(num), 'Number must be an integer');
  assert(num <= this.numPossiblePhrases());
  var words = [];
  var lsb = this.numBits;
  this.generators.forEach(function(generator) {
    // Shift off the number of bits the generator expects and use it
    // to generate the next word in the phrase. We can't use regular bit-shift
    // ops though because those cast to 32-bit and we want to preserve more
    // bits than that.
    var bits = generator.numBits();
    lsb -= bits;
    var divisor = Math.pow(2, lsb);
    var wordIndex = Math.floor(num / divisor) % (1 << bits);
    words.push(generator.word(wordIndex));
  });
  assert(lsb === 0);
  return words;
};

/**
 * @returns {number} The total number of possible phrases this could return.
 */
Factory.prototype.numPossiblePhrases = function() {
  return Math.pow(2, this.numBits); // left-shift would truncate to 32-bit int
};

module.exports = Factory;