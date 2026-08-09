import type {
	SyntaxHighlighterLangOptions,
	SyntaxHighlighterLangOptionsPartial,
	SyntaxHighlighterOptions,
	SyntaxHighlighterOptionsPartial,
} from '../types';

import { DEFAULT_LANGS } from './constants';
import { mergeLangOptions } from './mergeLangOptions';

export const createOptions = (
	partialOptions: SyntaxHighlighterOptionsPartial = {},
	externalLangs?: Record<string, SyntaxHighlighterLangOptionsPartial>,
): SyntaxHighlighterOptions => {
	const theme = partialOptions.theme ?? 'github-dark-dimmed';

	const merged: Record<string, SyntaxHighlighterLangOptions> = {};

	for (const [lang, defaultOptions] of Object.entries(DEFAULT_LANGS)) {
		const partialOverride = partialOptions.langs?.[lang];
		merged[lang] = mergeLangOptions(defaultOptions, partialOverride);
	}

	if (externalLangs) {
		for (const [lang, externalOptions] of Object.entries(externalLangs)) {
			if (lang in DEFAULT_LANGS) {
				merged[lang] = mergeLangOptions(
					merged[lang] as SyntaxHighlighterLangOptions,
					externalOptions,
				);
			} else {
				merged[lang] = mergeLangOptions(
					{} as unknown as SyntaxHighlighterLangOptions,
					externalOptions,
				);
			}
		}
	}

	return {
		theme,
		langs: merged,
	};
};
