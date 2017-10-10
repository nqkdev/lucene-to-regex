const expect = require('chai').expect

const ltr = require('../')

describe('LuceneToRegex', () => {
  describe('#toRegex()', () => {
    it('must works with simple term', () => {
      const result = ltr.toRegex('foo')
      const expected = /^(?=.*?\bfoo\b).*$/

      expect(result).to.eqls(expected)
      expect('foo').to.match(expected)
      expect('fooo').to.not.match(expected)
    })

    it('must works with AND operator', () => {
      const result = ltr.toRegex('foo AND bar')
      const expected = /^(?=.*?\bfoo\b)(?=.*?\bbar\b).*$/

      expect(result).to.eqls(expected)
      expect('foo bar').to.match(expected)
      expect('bar and foo').to.match(expected)
      expect('foo').to.not.match(expected)
      expect('barr and foo').to.not.match(expected)
    })

    it('must works with OR operator', () => {
      const result = ltr.toRegex('foo OR bar')
      const expected = /^(?=.*?\bfoo\b)|(?=.*?\bbar\b).*$/

      expect(result).to.eqls(expected)
      expect('foo').to.match(expected)
      expect('foo bar').to.match(expected)
      expect('foo and bar').to.match(expected)
      expect('fooo and barr').to.not.match(expected)
    })

    it('must works with NOT operator', () => {
      const result = ltr.toRegex('NOT bar')
      const expected = /^(?!.*?\bbar\b).*$/

      expect(result).to.eqls(expected)
      expect('bar').to.not.match(expected)
      expect('foo bar').to.not.match(expected)
      expect('foo').to.match(expected)
    })

    it('must works with AND NOT operator', () => {
      const result = ltr.toRegex('foo AND NOT bar')
      const expected = /^(?=.*?\bfoo\b)(?!.*?\bbar\b).*$/

      expect(result).to.eqls(expected)
      expect('and').to.not.match(expected)
      expect('foo bar').to.not.match(expected)
      expect('foo').to.match(expected)
    })
    // 
    it('must works with complex query string', () => {
      const result = ltr.toRegex('(#hitbtc OR #bitfinex) AND @BitSensor AND NOT (Listed OR Delisted)')
      const expected = /^(?=.*?(?=.*?\B#hitbtc\b)|(?=.*?\B#bitfinex\b))(?=.*?(?=.*?\B@BitSensor\b)(?!.*?(?=.*?\bListed\b)|(?=.*?\bDelisted\b))).*$/

      expect(result).to.eqls(expected)
      expect('@BitSensor is going to be Listed on #hitbtc').to.not.match(expected)
      expect('@BitSensor will launch an ICO on #hitbtc').to.match(expected)
    })
  })
})