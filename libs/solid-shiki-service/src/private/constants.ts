import * as babelParser from 'prettier/plugins/babel';
import * as estreeParser from 'prettier/plugins/estree';
import * as htmlParser from 'prettier/plugins/html';

import type { SyntaxHighlighterLang, SyntaxHighlighterLangOptions } from '../types';

export const DEFAULT_LANGS: Record<SyntaxHighlighterLang, SyntaxHighlighterLangOptions> = {
	html: {
		prettier: {
			parser: 'html',
			plugins: [htmlParser],
			options: {
				printWidth: 80,
				htmlWhitespaceSensitivity: 'ignore',
				proseWrap: 'always',
			},
		},
		shiki: {
			lang: 'html',
		},
	},
	javascript: {
		prettier: {
			parser: 'babel-ts',
			plugins: [babelParser, estreeParser],
			options: {
				printWidth: 80,
				proseWrap: 'always',
			},
		},
		shiki: {
			lang: 'javascript',
		},
	},
	json: {
		prettier: {
			parser: 'json',
			plugins: [babelParser, estreeParser],
			options: {
				printWidth: 80,
			},
		},
		shiki: {
			lang: 'json',
		},
	},
};
