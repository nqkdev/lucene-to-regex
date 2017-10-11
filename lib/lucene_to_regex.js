const lucene = require('lucene')
const QueryParser = require('./query_parser')
lucene.parse = QueryParser.parse.bind(QueryParser);

const NOT = 'NOT'

// Convert term into regex
const parseNode = (node, negate) => {
  const term = node.term
    ? `\\${node.prefix ? `B` + node.prefix : `b`}${String.raw`${node.term}`}\\b`
    : buildRegex(node)
  return `(?${negate ? '!' : '='}.*?${term})`
}

// Build regex from parsed tree
const buildRegex = (ast, negate = false) => {
  let regex = parseNode(ast.left, ast.start === NOT ^ negate)

  if (ast.operator) {
    let negate = false;
    if (/^OR/.test(ast.operator)) {
      regex += '|'
    }
    if (/NOT$/.test(ast.operator))
      negate = true
    if (ast.right.operator === ast.operator) {
      regex += buildRegex(ast.right, negate)
    } else {
      regex += parseNode(ast.right, negate)
    }
  }

  return regex
}

module.exports = {
  parse: lucene.parse,
  toString: lucene.toString,
  toRegex: (query, flag) => {
    const ast = lucene.parse(query)
    const regex = `^${buildRegex(ast)}.*$`

    return new RegExp(regex, flag)
  }
}