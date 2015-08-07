/* jshint mocha:true */
var assert = require('assert');
var NumberRange = require('../lib/number_range');

describe('NumberRange', function() {

  describe('constructor', function() {
    it('should store num bits', function() {
      var range = new NumberRange(5);
      assert.equal(range.numBits(), 5);
    });
    it('should store offset', function() {
      var range = new NumberRange(5, 10);
      assert.equal(range._offset, 10);
    });
    it('should default offset to zero', function() {
      var range = new NumberRange(5);
      assert.equal(range._offset, 0);
    });
  });

  describe('word', function() {

    it('should return nth number in range', function() {
      var range = new NumberRange(3);
      assert.equal(range.word(0), '0');
      assert.equal(range.word(1), '1');
      assert.equal(range.word(3), '3');
    });

    it('should return nth number in range with offset', function() {
      var range = new NumberRange(3, 10);
      assert.equal(range.word(0), '10');
      assert.equal(range.word(1), '11');
      assert.equal(range.word(3), '13');
    });

    it('should fail if num out of range', function() {
      var range = new NumberRange(3);
      assert.throws(function() {
        range.num(8);
      });
    });
  });

});