# Lucene to Regex for Javascript
[![Build Status](https://travis-ci.org/nqkdev/lucene-to-regex.svg?branch=master)](https://travis-ci.org/nqkdev/lucene-to-regex)
[![npm](https://img.shields.io/npm/v/lucene-to-regex.svg)]()

This tiny project provides ability to convert a boolean query string to regular expressions.

### Installation
```bash
npm install --save lucene-to-regex
```

### Usage

```js
const ltr = require('lucene-to-regex')
const regex = ltr.toRegex('Lucene AND Regex AND (easy NOT difficult)', 'i')
// regex: /^(?=.*?\bLucene\b)(?=.*?\bRegex\b)(?=.*?(?=.*?\beasy\b)(?!.*?\bdifficult\b)).*$/i


regex.test('Regex and Lucene are easy.')
// result: true

regex.test('Lucene and regex are difficult.')
// result: false
```

> You can set flag by passing an additional parameter to the method.



> Check out [bripkens/lucene](https://github.com/bripkens/lucene) for lucene 