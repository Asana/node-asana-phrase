
var Factory = require('./lib/factory');
var Dictionary = require('./lib/dictionary');
var NumberRange = require('./lib/number_range');
var WordGenerator = require('./lib/word_generator');
var dictionaries = require('./lib/dictionaries');

/**
 * The default 32-bit phrase generator, which creates fun and easy-to-remember
 * phrases consisting of, in order:
 *   * One of 32 numbers, from 2-33 [5 bits]
 *   * One of 128 adjectives [7 bits]
 *   * One of 128 subjects (mostly animals, for extra cuteness) [7 bits]
 *   * One of 128 verbs [7 bits]
 *   * One of 64 adverbs [6 bits]
 *
 * So a random phrase is something like:
 *   "23 glossy ants march happily"
 *
 * Dividing the phrase into distinct parts of speech with an obvious pattern
 * and constraints makes memorization easier. Restricting the dictionary space
 * to as few syllables as possible (in most cases one- or two-syllable words)
 * makes recitation of the complete phrase simpler. The result is a phrase
 * that, while taking up more bytes to render digitally, theoretically takes up
 * significantly less cognitive space than an 8-digit hex string or even a
 * 6-digit alphanumeric code. This is an experiment. :)
 */
var default32BitFactory = new Factory([
  new NumberRange(5, 2),
  new Dictionary(dictionaries.adjectives),
  new Dictionary(dictionaries.subjects),
  new Dictionary(dictionaries.verbs),
  new Dictionary(dictionaries.adverbs)
]);

module.exports = {
  default32BitFactory: function() {
    return default32BitFactory;
  },
  Factory: Factory,
  WordGenerator: WordGenerator,
  Dictionary: Dictionary,
  NumberRange: NumberRange,
  dictionaries: dictionaries
};

