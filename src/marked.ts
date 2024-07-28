import { _Lexer } from './lexer.ts';
import { _Parser } from './parser.ts';
import { _Tokenizer } from './tokenizer.ts';
import { _Renderer } from './renderer.ts';
import { _TextRenderer } from './textRenderer.ts';
import { _Hooks } from './hooks.ts';
import { Marked } from './instance.ts';
import {
  _getDefaults,
  changeDefaults,
  _defaults,
} from './defaults.ts';
import type { MarkedExtension, MarkedOptions } from './markedOptions.ts';
import type { Token, TokensList } from './tokens.ts';
import type { MaybePromise } from './instance.ts';

const markedInstance = new Marked();

/**
 * Compiles markdown to HTML asynchronously.
 *
 * @param src String of markdown source to be compiled
 * @param options Hash of options, having async: true
 * @return Promise of string of compiled HTML
 */
export function marked(src: string, options: MarkedOptions & { async: true }): Promise<string>;

/**
 * Compiles markdown to HTML.
 *
 * @param src String of markdown source to be compiled
 * @param options Optional hash of options
 * @return String of compiled HTML. Will be a Promise of string if async is set to true by any extensions.
 */
export function marked(src: string, options?: MarkedOptions): string | Promise<string>;
export function marked(src: string, opt?: MarkedOptions): string | Promise<string> {
  return markedInstance.parse(src, opt);
}

/**
 * Sets the default options.
 *
 * @param options Hash of options
 */
marked.options =
  marked.setOptions = function(options: MarkedOptions) {
    markedInstance.setOptions(options);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };

/**
 * Gets the original marked default options.
 */
marked.getDefaults = _getDefaults;

marked.defaults = _defaults;

/**
 * Use Extension
 */

marked.use = function(...args: MarkedExtension[]) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};

/**
 * Run callback for every token
 */

marked.walkTokens = function(tokens: Token[] | TokensList, callback: (token: Token) => MaybePromise | MaybePromise[]) {
  return markedInstance.walkTokens(tokens, callback);
};

/**
 * Compiles markdown to HTML without enclosing `p` tag.
 *
 * @param src String of markdown source to be compiled
 * @param options Hash of options
 * @return String of compiled HTML
 */
marked.parseInline = markedInstance.parseInline;

/**
 * Expose
 */
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;

export const options = marked.options;
export const setOptions = marked.setOptions;
export const use = marked.use;
export const walkTokens = marked.walkTokens;
export const parseInline = marked.parseInline;
export const parse = marked;
export const parser = _Parser.parse;
export const lexer = _Lexer.lex;
export { _defaults as defaults, _getDefaults as getDefaults } from './defaults.ts';
export { _Lexer as Lexer } from './lexer.ts';
export { _Parser as Parser } from './parser.ts';
export { _Tokenizer as Tokenizer } from './tokenizer.ts';
export { _Renderer as Renderer } from './renderer.ts';
export { _TextRenderer as TextRenderer } from './textRenderer.ts';
export { _Hooks as Hooks } from './hooks.ts';
export { Marked } from './instance.ts';
export type * from './markedOptions.ts';
export type * from './rules.ts';
export type * from './tokens.ts';
