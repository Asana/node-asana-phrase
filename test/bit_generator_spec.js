/* jshint mocha:true */
var assert = require('assert');
var sinon = require('sinon');
var bitGenerator = require('../lib/bit_generator');

describe('BitGenerator', function() {

  describe('random', function() {
    it('should return random bits', function() {
      var randomStub = sinon.stub(Math, 'random');
      randomStub.onCall(0).returns(0.6);
      randomStub.onCall(1).returns(0.1);
      randomStub.onCall(2).returns(0.9);
      var gen = bitGenerator.random(3);
      assert.equal(gen(), 1);
      assert.equal(gen(), 0);
      assert.equal(gen(), 1);
      assert.equal(gen(), null);
    });
  });

  describe('int', function() {
    it('should return one zero bit for zero value', function() {
      var gen = bitGenerator.int(0);
      assert.equal(gen(), 0);
      assert.equal(gen(), null);
    });
    it('should return bits of integer starting with LSB', function() {
      var gen = bitGenerator.int(11);
      assert.equal(gen(), 1);
      assert.equal(gen(), 1);
      assert.equal(gen(), 0);
      assert.equal(gen(), 1);
      assert.equal(gen(), null);
    });
  });

  describe('hex', function() {
    it('should return one zero bit for zero value', function() {
      var gen = bitGenerator.hex('0');
      assert.equal(gen(), 0);
      assert.equal(gen(), null);
    });

    it('should return four bits for four bit value', function() {
      var gen = bitGenerator.hex('b');
      assert.equal(gen(), 1);
      assert.equal(gen(), 1);
      assert.equal(gen(), 0);
      assert.equal(gen(), 1);
      assert.equal(gen(), null);
    });

    it('should return seven bits for seven bit value', function() {
      var gen = bitGenerator.hex('6b');
      assert.equal(gen(), 1);
      assert.equal(gen(), 1);
      assert.equal(gen(), 0);
      assert.equal(gen(), 1);
      assert.equal(gen(), 0);
      assert.equal(gen(), 1);
      assert.equal(gen(), 1);
      assert.equal(gen(), null);
    });

  });

  describe('binaryDigit', function() {
    it('should return one zero bit for zero value', function() {
      var gen = bitGenerator.binaryDigit('0');
      assert.equal(gen(), 0);
      assert.equal(gen(), null);
    });

    it('should return bits for each digit', function() {
      var gen = bitGenerator.binaryDigit('1011');
      assert.equal(gen(), 1);
      assert.equal(gen(), 1);
      assert.equal(gen(), 0);
      assert.equal(gen(), 1);
      assert.equal(gen(), null);
    });
  });

});