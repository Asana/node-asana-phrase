# Asana [![GitHub release](https://img.shields.io/github/release/asana/node-asana-phrase.svg)]() [![Build Status][travis-image]][travis-url] [![NPM Version][npm-image]][npm-url]

A random error phrase generator used to create more memorable error codes than
just numeric or alphanumeric strings, as used by Asana.

## Installation

### Node

Install with npm:

```sh
npm install asana-phrase --save
```

### Browser

Include the latest release directly from GitHub.

```html
<script src="https://github.com/Asana/node-asana/releases/download/<LATEST_RELEASE>/asana-min.js"></script>
```

OR

1. Download the latest distribution in [releases](https://github.com/Asana/node-asana-phrase/releases).
2. Make sure to serve it from your webserver.
3. Include it on the client from a `SCRIPT` tag.

## Usage

If you just want 32-bit numbers translated to phrases in the same way Asana does,
you can use the default phrase factory.

If you want to customize the generated phrases (or create ones with a larger
bit space, up to 53 bits), you can very easily add your own dictionaries.
