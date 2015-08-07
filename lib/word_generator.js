function WordGenerator() {}

/**
 * @return {Number} Number of bits of information this generator makes.
 */
WordGenerator.prototype.numBits = function() {
  throw new Error('not implemented');
};

/**
 * @param num {Number} An integer, 0 <= number < 2^numBits
 * @return {String} The word for the given number
 */
WordGenerator.prototype.word = function() {
  throw new Error('not implemented');
};

/**
 * @returns {number} Number of values this generator can make.
 */
WordGenerator.prototype.size = function() {
  return 1 << this.numBits();
};

module.exports = WordGenerator;