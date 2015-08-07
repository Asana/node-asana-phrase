/* jshint mocha:true */
var assert = require('assert');
var Dictionary = require('../lib/dictionary');

describe('Dictionary', function() {

  describe('constructor', function() {

    it('should calculate num bits based on num words', function() {
      var dict = new Dictionary(['a', 'b']);
      assert.equal(dict.numBits(), 1);
      dict = new Dictionary(['a', 'b', 'c', 'd']);
      assert.equal(dict.numBits(), 2);
      dict = new Dictionary(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
      assert.equal(dict.numBits(), 3);
    });

    it('should fail if num bits is not exact', function() {
      var dict;
      assert.throws(function() {
        dict = new Dictionary(['a', 'b', 'c']);
      }, /power of two/);
    });
  });

  describe('word', function() {

    it('should return nth word', function() {
      var dict = new Dictionary(['a', 'b', 'c', 'd']);
      assert.equal(dict.word(0), 'a');
      assert.equal(dict.word(1), 'b');
      assert.equal(dict.word(3), 'd');
    });

    it('should fail if num out of range', function() {
      var dict = new Dictionary(['a', 'b', 'c', 'd']);
      assert.throws(function() {
        dict.num(4);
      });
    });
  });

});