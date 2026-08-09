// getLoadedShikiLangs.ts
import type { BundledLanguage } from 'shiki';

import type { SyntaxHighlighterLang, SyntaxHighlighterLangOptions } from '../types';

export const getLoadedShikiLangs = (
	langs: Record<SyntaxHighlighterLang, SyntaxHighlighterLangOptions>,
): BundledLanguage[] => {
	const langKeys = Object.keys(langs) as BundledLanguage[];

	const shikiLangValues = Object.values(langs).map(langOptions => langOptions.shiki.lang);

	const allLangs = [...langKeys, ...shikiLangValues];
	const uniqueLangs = Array.from(new Set<BundledLanguage>(allLangs));

	return uniqueLangs;
};
