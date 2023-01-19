export const jsParseCFG: ICFGConfig = {
  symbols: [
    {
      name: 'delimeter',
      color: '#848bbd'
    },
    {
      name: 'keyword',
      color: '#fede5d'
    },
    {
      name: 'variable',
      color: '#ff7edb'
    },
    {
      name: 'type',
      color: '#fe4450'
    },
  ],
  alphabet: [
    {
      name: 'delimeter',
      alphabet: ['.', ' ', '{', '}', '(', ')', '[', ']', ';', '=', '>', '<', '-', ':']
    },
    {
      name: 'keyword',
      alphabet: ['self', 'const', 'let', 'class', 'interface', 'constructor']
    },
    {
      name: 'type',
      alphabet: ['string', 'number']
    }
  ],
  grammar: [
    {
      name: 'type',
      phrases: [
        ['class ', 'type', ' {'],
        ['class ', 'type', '{'],
        ['interface ', 'type', ' {'],
        ['interface ', 'type', '{']
      ]
    }
  ]
}

interface ISymbol {
  name: string,
  color: string
}

interface IAlphabet {
  name: string,
  alphabet: string[]
}

interface IGrammar {
  name: string,
  phrases: string[][]
}

interface ICFGConfig {
  symbols: ISymbol[],
  alphabet: IAlphabet[],
  grammar: IGrammar[]
}

interface ParserOptions {
  text: string,
  CFGConfig: ICFGConfig
}

class Parser {
  text: string
  CFGConfig: ICFGConfig
  parsedContent: JSX.Element[]
  types: string[]
  alphabet: IAlphabet[]

  constructor(options: ParserOptions) {
    this.text = options.text
    this.CFGConfig = options.CFGConfig
    this.parsedContent = []
    this.types = []
    this.alphabet = []
  }

  parseAlphabet = () => {
    // parse initial alphabet from config
    this.CFGConfig.alphabet.forEach((alphabet) => {
      this.alphabet.push(alphabet)
    })
    
    // parse alphabet from grammar
  }

  render = () => {
    return this.parsedContent
  }
}

export default Parser

/**
 * Foo takes any argument.
 * The return value is 'baz' in all cases.
 * @param {*} bar - Any argument
 * @param {string} [optionalArg] - An optional argument that is a string
 */
function foo() {
  return 'baz';
}
