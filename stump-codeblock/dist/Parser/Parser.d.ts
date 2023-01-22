/// <reference types="react" />
import './Parser.module.css';
export declare const jsParseCFG: ICFGConfig;
export interface ISymbol {
    name: string;
    color: string;
}
export interface IAlphabet {
    name: string;
    alphabet: string[];
}
export interface IGrammar {
    name: string;
    phrases: string[][];
}
export interface ICFGConfig {
    variableColor: string;
    symbols: ISymbol[];
    alphabet: IAlphabet[];
    grammar: IGrammar[];
}
export interface IParsedContent {
    start: number;
    end: number;
    color: string;
    content: string;
}
export interface ParserOptions {
    text: string;
    CFGConfig: ICFGConfig;
}
export declare class Parser {
    text: string;
    CFGConfig: ICFGConfig;
    parsedContent: IParsedContent[];
    parsedRows: IParsedContent[][];
    types: string[];
    alphabet: IAlphabet[];
    /**
     * Constructor for the Parser component.
     * @param options
     */
    constructor(options: ParserOptions);
    /**
     * Parses content that can be determined from the alphabet.
     */
    parseKnownContent: () => void;
    /**
     * Used for BubbleSort purposes
     * @param x first number to swap
     * @param y second number to swap
     */
    swap: (x: number, y: number) => void;
    /**
     * Sorts content that can be parse from known alphabet.
     */
    sortParsedContent: () => void;
    /**
     * Parse all other content that cannot be determined from alphabet.
     */
    parseUnknownContent: () => void;
    /**
     * Parses text into content.
     */
    parseContent: () => void;
    /**
     * Parses the alphabet to be used in this Parser from both an alphabet given from the config
     * and an alphabet determined by the grammar.
     */
    parseAlphabet: () => void;
    /**
     * Parses the alphabet to be used in this parser from an alphabet given by the config.
     */
    parseAlphabetFromConfig: () => void;
    /**
     * Parses the alphabet to be used in this parser from an alphabet determined by the grammar.
     */
    parseAlphabetFromGrammar: () => void;
    /**
     * Parses content into rows based on newlines.
     */
    parseRows: () => void;
    /**
     * Parses all elements that have a tab in them.
     */
    parseTabs: () => void;
    /**
     * Renders a single row of words.
     * @returns a the row of words
     */
    renderRow: (content: IParsedContent[]) => JSX.Element[];
    /**
     * Returns the elements to be rendered to the code block.
     * @returns parsed array of colored elements
     */
    render: () => JSX.Element;
}
