var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import './Parser.module.css';
export var jsParseCFG = {
    variableColor: '#ff7edb',
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
};
var Parser = /** @class */ (function () {
    /**
     * Constructor for the Parser component.
     * @param options
     */
    function Parser(options) {
        var _this = this;
        /**
         * Parses content that can be determined from the alphabet.
         */
        this.parseKnownContent = function () {
            _this.alphabet.forEach(function (alphabet) {
                var name = alphabet.name;
                // get color for content
                var color;
                _this.CFGConfig.symbols.forEach(function (symbol) {
                    if (symbol.name === name) {
                        color = symbol.color;
                    }
                });
                // color all known words
                alphabet.alphabet.forEach(function (word) {
                    var index = 0;
                    while (index !== -1) {
                        // get start and end indices for first instance of word
                        var startIndex = _this.text.indexOf(word, index);
                        var endIndex 
                        // check if word is found
                        = void 0;
                        // check if word is found
                        if (startIndex === -1) {
                            index = -1;
                        }
                        else {
                            endIndex = startIndex + word.length;
                            // make new parsed content
                            var parsedContent = {
                                start: startIndex,
                                end: endIndex,
                                color: color,
                                content: word
                            };
                            _this.parsedContent.push(parsedContent);
                            index = endIndex;
                        }
                    }
                });
            });
        };
        /**
         * Used for BubbleSort purposes
         * @param x first number to swap
         * @param y second number to swap
         */
        this.swap = function (x, y) {
            var temp = _this.parsedContent[x];
            _this.parsedContent[x] = _this.parsedContent[y];
            _this.parsedContent[y] = temp;
        };
        /**
         * Sorts content that can be parse from known alphabet.
         */
        this.sortParsedContent = function () {
            var i = 0;
            var j = 0;
            for (i = 0; i < _this.parsedContent.length - 1; i++) {
                for (j = 0; j < _this.parsedContent.length - i - 1; j++) {
                    if (_this.parsedContent[j].start > _this.parsedContent[j + 1].start) {
                        _this.swap(j, j + 1);
                    }
                }
            }
        };
        /**
         * Parse all other content that cannot be determined from alphabet.
         */
        this.parseUnknownContent = function () {
            // determine color
            var color = _this.CFGConfig.variableColor;
            for (var i = 0; i < _this.parsedContent.length - 1; i++) {
                if (_this.parsedContent[i].end !== _this.parsedContent[i + 1].start) {
                    var start = _this.parsedContent[i].end;
                    var end = _this.parsedContent[i + 1].start;
                    var replacementContent = {
                        start: start,
                        end: end,
                        color: color,
                        content: _this.text.substring(start, end)
                    };
                    _this.parsedContent.splice(i + 1, 0, replacementContent);
                }
            }
            // check if unknown content is at beginning of text
            if (_this.parsedContent[0].start > 0) {
                var start = 0;
                var end = _this.parsedContent[0].start;
                var replacementContent = {
                    start: start,
                    end: end,
                    color: color,
                    content: _this.text.substring(start, end)
                };
                _this.parsedContent.splice(0, 0, replacementContent);
            }
            // check if unknown content is at end of text
            if (_this.parsedContent[_this.parsedContent.length - 1].end < _this.text.length) {
                var start = _this.parsedContent[_this.parsedContent.length - 1].end;
                var end = _this.text.length;
                var replacementContent = {
                    start: start,
                    end: end,
                    color: color,
                    content: _this.text.substring(start, end)
                };
                _this.parsedContent.splice(_this.parsedContent.length, 0, replacementContent);
            }
        };
        /**
         * Parses text into content.
         */
        this.parseContent = function () {
            _this.parseKnownContent();
            _this.sortParsedContent();
            _this.parseUnknownContent();
        };
        /**
         * Parses the alphabet to be used in this Parser from both an alphabet given from the config
         * and an alphabet determined by the grammar.
         */
        this.parseAlphabet = function () {
            _this.parseAlphabetFromConfig();
            _this.parseAlphabetFromGrammar();
        };
        /**
         * Parses the alphabet to be used in this parser from an alphabet given by the config.
         */
        this.parseAlphabetFromConfig = function () {
            _this.CFGConfig.alphabet.forEach(function (alphabet) {
                _this.alphabet.push(alphabet);
            });
        };
        /**
         * Parses the alphabet to be used in this parser from an alphabet determined by the grammar.
         */
        this.parseAlphabetFromGrammar = function () {
            _this.CFGConfig.grammar.forEach(function (grammar) {
                var name = grammar.name;
                grammar.phrases.forEach(function (phrase) {
                    // check if prefix and suffix found
                    var prefixIndex = _this.text.indexOf(phrase[0]);
                    var suffixIndex = _this.text.indexOf(phrase[1]);
                    if (prefixIndex !== -1 && suffixIndex !== -1) {
                        // regularize prefix index and extract new word
                        prefixIndex = prefixIndex + phrase[0].length;
                        var word_1 = _this.text.substring(prefixIndex, suffixIndex);
                        // check if name already exist in alphabet
                        var nameFound_1 = false;
                        _this.alphabet.forEach(function (alphabet) {
                            if (name === alphabet.name) {
                                if (!alphabet.alphabet.includes(word_1.trim())) {
                                    alphabet.alphabet.push(word_1.trim());
                                }
                                nameFound_1 = true;
                            }
                        });
                        // make new alphabet member if not
                        if (!nameFound_1) {
                            var newAlphabet = {
                                name: name,
                                alphabet: [word_1]
                            };
                            _this.alphabet.push(newAlphabet);
                        }
                    }
                });
            });
        };
        /**
         * Parses content into rows based on newlines.
         */
        this.parseRows = function () {
            // start on some index
            // loop through parsed content until a newline is found
            // if a newline isn't found, put nodes from index to end in an array
            // if newline is found, then set index to index + 1 and repeat
            var rows = [];
            var startIndex = 0;
            for (var i = 0; i < _this.parsedContent.length; i++) {
                var newlineFound = _this.parsedContent[i].content.includes('\n');
                if (newlineFound) {
                    rows.push(_this.parsedContent.slice(startIndex, i));
                    startIndex = i;
                }
                else {
                    if (i === _this.parsedContent.length - 1) {
                        rows.push(_this.parsedContent.slice(startIndex, _this.parsedContent.length));
                    }
                }
            }
            _this.parsedRows = rows;
            console.log(JSON.stringify(rows));
        };
        /**
         * Parses all elements that have a tab in them.
         */
        this.parseTabs = function () {
            for (var i = 0; i < _this.parsedRows.length; i++) {
                for (var j = 0; j < _this.parsedRows[i].length; j++) {
                    var replacement = _this.parsedRows[i][j].content.replace('\t', '\u00A0\u00A0\u00A0\u00A0');
                    _this.parsedRows[i][j].content = replacement;
                }
            }
        };
        /**
         * Renders a single row of words.
         * @returns a the row of words
         */
        this.renderRow = function (content) {
            return content.map(function (content, key) {
                return (_jsx("span", __assign({ className: 'stumpSpanClass', style: { color: content.color } }, { children: content.content }), key));
            });
        };
        /**
         * Returns the elements to be rendered to the code block.
         * @returns parsed array of colored elements
         */
        this.render = function () {
            return (_jsx("ul", __assign({ className: 'stumpListClass' }, { children: _this.parsedRows.map(function (content, key) {
                    return (_jsx("li", { children: _this.renderRow(content) }, key));
                }) })));
        };
        this.text = options.text;
        this.CFGConfig = options.CFGConfig;
        this.parsedContent = [];
        this.parsedRows = [];
        this.types = [];
        this.alphabet = [];
        this.parseAlphabet();
        this.parseContent();
        this.parseRows();
        this.parseTabs();
    }
    return Parser;
}());
export { Parser };
