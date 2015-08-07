# Asana Error Phrase Factory [![GitHub release][release-image]]() [![Build Status][travis-image]][travis-url] [![NPM Version][npm-image]][npm-url]

A random phrase generator used to create memorable error codes, as used by Asana.

## Installation

### Node

Install with npm:

```sh
npm install asana-phrase --save
```

### Browser

Include the latest release directly from GitHub.

```html
<script src="https://github.com/Asana/node-asana-phrase/releases/download/<LATEST_RELEASE>/asana-phrase-min.js"></script>
```

OR

1. Download the latest distribution in [releases](https://github.com/Asana/node-asana-phrase/releases).
2. Make sure to serve it from your webserver.
3. Include it on the client from a `SCRIPT` tag.

## Overview

This package is designed to convert integers into human-readable phrases,
which are more entertaining and memorable, and suitable for error codes.

Currently it only supports numbers that could be represented in JavaScript
integers, which is up to 53-bits. We could extend this library to support
arbitrary-length strings to be encoded as phrases instead if we wanted to,
e.g., represent cryptographic keys like 128-bit hashes.

It operates on a simple bitwise substitution principle, so given a particular
phrase factory, there is a deterministic way to map any set of bits into a
phrase and vice versa.

## Usage

If you just want 32-bit numbers translated to phrases in the same way Asana does,
you can use the default phrase factory.

```js
var phrase = require('asana-phrase');
phrase.default32BitFactory().randomPhrase();

>>> ["6", "sad", "squid", "snuggle", "softly"]
```

If you want to customize the generated phrases (or create ones with a larger
bit space, up to 53 bits), you can very easily add your own word generators.
There are two predefined types of word generator: `Dictionary` and `NumberRange`,
which you can plug into the `Factory` to make your own combinations. You can
also access the dictionaries that comprise the default phrase factory so you
can leverage it in your custom factory:

```js
var factory = new phrase.Factory([
  new phrase.Dictionary(phrase.dictionaries.subjects),
  new phrase.Dictionary(phrase.dictionaries.verbs),
  new phrase.Dictionary(["with", "against", "for", "around"]),
  new phrase.Dictionary(phrase.dictionaries.subjects)
]);
factory.randomPhrase();

>>> ["trout", "behave", "around", "sharks"]
```

If you want some logic that isn't based on making sequential numbers or
choosing words from a dictionary, it's very easy to make your own word generator.
Simply subclass `WordGenerator` and fulfill its simple contract.

[travis-url]: http://travis-ci.org/Asana/node-asana-phrase
[travis-image]: http://img.shields.io/travis/Asana/node-asana-phrase.svg?style=flat-square

[npm-url]: https://www.npmjs.org/package/asana-phrase
[npm-image]: http://img.shields.io/npm/v/asana-phrase.svg?style=flat-square

[release-image]: https://img.shields.io/github/release/asana/node-asana-phrase.svg