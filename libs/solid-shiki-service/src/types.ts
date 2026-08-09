import { type Options, type Plugin } from 'prettier';
import { type BundledLanguage, type BundledTheme, type ShikiTransformer } from 'shiki';
import type { Accessor, Resource } from 'solid-js';

export type SyntaxHighlighterSymbolMap = ReadonlyMap<string, string>;

export type SyntaxHighlighterLang = string;

export type SyntaxHighlighterLangOptions = {
	prettier: {
		parser: string;
		plugins?: Plugin[];
		options?: Omit<Options, 'parser' | 'plugins'>;
	};
	shiki: {
		lang: BundledLanguage;
		transformers?: (context: SyntaxHighlighterTransformContext) => ShikiTransformer[] | undefined;
	};
};

export type SyntaxHighlighterTransformContext = {
	lang: SyntaxHighlighterLang;
	code: string;
	symbols: SyntaxHighlighterSymbolMap | undefined;
};

export type SyntaxHighlighterOptions = {
	theme: BundledTheme;
	langs: Record<SyntaxHighlighterLang, SyntaxHighlighterLangOptions>;
};

export type SyntaxHighlighterLangOptionsPartial = {
	prettier?: Partial<SyntaxHighlighterLangOptions['prettier']>;
	shiki?: Partial<SyntaxHighlighterLangOptions['shiki']>;
};

export type SyntaxHighlighterOptionsPartial = {
	theme?: BundledTheme;
	langs?: Partial<Record<SyntaxHighlighterLang, SyntaxHighlighterLangOptionsPartial>>;
};

export type SyntaxHighlighterAPI = {
	createSyntaxHighlighterResource: (
		lang: Accessor<string>,
		code: Accessor<string | undefined>,
		symbols?: Accessor<SyntaxHighlighterSymbolMap | undefined>,
	) => Resource<string | undefined>;
};
