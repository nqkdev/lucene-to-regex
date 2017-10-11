# Lucene to Regex for Javascript

This tiny project provides ability to convert a boolean query string to regular expressions.

### Installation
```bash
npm install --save lucene-to-regex
```

### Usage

```js
const ltr = require('lucene-to-regex')
const regex = ltr.toRegex('Lucene AND Regex AND (easy NOT difficult)', 'i')


regex.test('Lucene and regex are easy.')
// result: true

regex.test('Lucene and regex are difficult.')
// result: false
```



### Changes
The parser grammar is modified to support these prefix (+, -, #, @). The reason was to make it easy to build regex for twitter hashtags and mentions.

Check out [bripkens/lucene](https://github.com/bripkens/lucene) for lucene 