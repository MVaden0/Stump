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
        ['class ', ' {'],
        ['class ', '{'],
        ['interface ', ' {'],
        ['interface ', '{']
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

interface IParsedContent {
  start: number,
  end: number,
  color: string,
  content: string
}

interface ParserOptions {
  text: string,
  CFGConfig: ICFGConfig
}

class Parser {
  text: string
  CFGConfig: ICFGConfig
  parsedContent: IParsedContent[]
  types: string[]
  alphabet: IAlphabet[]

  /**
   * Constructor for the Parser component.
   * @param options 
   */
  constructor(options: ParserOptions) {
    this.text = options.text
    this.CFGConfig = options.CFGConfig
    this.parsedContent = []
    this.types = []
    this.alphabet = []

    this.parseAlphabet()
    this.parseContent()
  }

  /**
   * Parses text into content.
   */
  parseContent = () => {
    this.alphabet.forEach((alphabet) => {
      let name: string = alphabet.name

      // get color for content
      let color: string

      this.CFGConfig.symbols.forEach((symbol) => {
        if (symbol.name === name) {
          color = symbol.color
        }
      })
  
      // color all known words
      alphabet.alphabet.forEach((word) => {
        let index: number = 0

        while (index != -1) {
          // get start and end indices for first instance of word
          let startIndex: number = this.text.indexOf(word, index)
          let endIndex: number

          // check if word is found
          if (startIndex == -1) {
            index = -1
          } else {
            endIndex = startIndex + word.length

            // make new parsed content
            let parsedContent: IParsedContent = {
              start: startIndex,
              end: endIndex,
              color: color,
              content: word
            }

            this.parsedContent.push(parsedContent)

            index = endIndex
          }
        }
      })
    })
  }

  /**
   * Parses the alphabet to be used in this Parser from both an alphabet given from the config 
   * and an alphabet determined by the grammar.
   */
  parseAlphabet = () => {
    this.parseAlphabetFromConfig()
    this.parseAlphabetFromGrammar()
  }

  /**
   * Parses the alphabet to be used in this parser from an alphabet given by the config.
   */
  parseAlphabetFromConfig = () => {
    this.CFGConfig.alphabet.forEach((alphabet) => {
      this.alphabet.push(alphabet)
    })
  }

  /**
   * Parses the alphabet to be used in this parser from an alphabet determined by the grammar.
   */
  parseAlphabetFromGrammar = () => {
    this.CFGConfig.grammar.forEach((grammar) => {
      let name: string = grammar.name

      grammar.phrases.forEach((phrase) => {
        // check if prefix and suffix found
        let prefixIndex: number = this.text.indexOf(phrase[0])
        let suffixIndex: number = this.text.indexOf(phrase[1])

        if (prefixIndex != -1 && suffixIndex != -1) {
          // regularize indices and extract new word
          prefixIndex = prefixIndex + phrase[0].length
          suffixIndex = suffixIndex

          let word: string = this.text.substring(prefixIndex, suffixIndex)

          // check if name already exist in alphabet
          let nameFound: boolean = false

          this.alphabet.forEach((alphabet) => {
            if (name === alphabet.name) {
              if (!alphabet.alphabet.includes(word.trim())) {
                alphabet.alphabet.push(word.trim())
              }
              
              nameFound = true
            }
          })

          // make new alphabet member if not
          if (!nameFound) {
            let newAlphabet: IAlphabet = {
              name: name,
              alphabet: [word]
            }

            this.alphabet.push(newAlphabet)
          }
        }
      })
    })
  }

  /**
   * Returns the elements to be rendered to the code block.
   * @returns parsed array of colored elements
   */
  render = () => {
    let DOMContent: JSX.Element[] = []
    return DOMContent
  }
}

export default Parser