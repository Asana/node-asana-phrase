/* jshint mocha:true */
var assert = require('assert');
var WordGenerator = require('../lib/word_generator');
var Factory = require('../lib/factory');
var sinon = require('sinon');

describe('Factory', function() {

  describe('constructor', function() {

    it('should calculate num bits based on generators', function() {
      var gen1 = sinon.createStubInstance(WordGenerator);
      gen1.numBits.returns(3);
      var gen2 = sinon.createStubInstance(WordGenerator);
      gen2.numBits.returns(7);
      var gen3 = sinon.createStubInstance(WordGenerator);
      gen3.numBits.returns(5);
      var factory = new Factory([gen1, gen2, gen3]);
      assert.equal(factory.numBits, 15);
    });

    it('should fail if no generators', function() {
      var factory;
      assert.throws(function() {
        factory = new Factory([]);
      });
    });

    it('should fail if too many bits', function() {
      var gen1 = sinon.createStubInstance(WordGenerator);
      gen1.numBits.returns(30);
      var gen2 = sinon.createStubInstance(WordGenerator);
      gen2.numBits.returns(24);
      var factory;
      assert.throws(function() {
        factory = new Factory([gen1, gen2]);
      });
    });
  });

  describe('phraseFromInt', function() {

    function mockGenerator(gen, numBits, expectedWord, result) {
      var genMock = sinon.mock(gen);
      genMock.expects('numBits').atLeast(0).returns(numBits);
      genMock.expects('word').returns(result).withArgs(expectedWord);
      return genMock;
    }

    describe('single generator', function() {
      it('returns first word', function() {
        var gen1 = new WordGenerator();
        var gen1Mock = mockGenerator(gen1, 2, 0, 'w1');
        var factory = new Factory([gen1]);
        assert.deepEqual(factory.phraseFromInt(0), ['w1']);
        gen1Mock.verify();
      });

      it('returns last word', function() {
        var gen1 = new WordGenerator();
        var gen1Mock = mockGenerator(gen1, 2, 3, 'w1');
        var factory = new Factory([gen1]);
        assert.deepEqual(factory.phraseFromInt(3), ['w1']);
        gen1Mock.verify();
      });
    });

    describe('two generators', function() {
      it('returns zero word from first and nonzero from second', function() {
        var gen1 = new WordGenerator();
        var gen1Mock = mockGenerator(gen1, 2, 0, 'w1');
        var gen2 = new WordGenerator();
        var gen2Mock = mockGenerator(gen2, 2, 3, 'w2');
        var factory = new Factory([gen1, gen2]);
        assert.deepEqual(factory.phraseFromInt(3), ['w1', 'w2']);
        gen1Mock.verify();
        gen2Mock.verify();
      });
      it('returns nonzero word from first and second', function() {
        var gen1 = new WordGenerator();
        var gen1Mock = mockGenerator(gen1, 2, 2, 'w1');
        var gen2 = new WordGenerator();
        var gen2Mock = mockGenerator(gen2, 2, 3, 'w2');
        var factory = new Factory([gen1, gen2]);
        assert.deepEqual(factory.phraseFromInt(11), ['w1', 'w2']);
        gen1Mock.verify();
        gen2Mock.verify();
      });
    });

    it('should fail if out of range', function() {
      var gen1 = sinon.createStubInstance(WordGenerator);
      gen1.numBits.returns(3);
      var factory = new Factory([gen1]);
      assert.throws(function() {
        factory.phraseFromInt(8);
      });
    });
  });

});