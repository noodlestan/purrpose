import type { SyntaxHighlighterLangOptions, SyntaxHighlighterLangOptionsPartial } from '../types';

export const mergeLangOptions = (
	base: SyntaxHighlighterLangOptions,
	override?: SyntaxHighlighterLangOptionsPartial,
): SyntaxHighlighterLangOptions => {
	const prettier: SyntaxHighlighterLangOptions['prettier'] = {
		...base.prettier,
	};

	if (override?.prettier) {
		Object.assign(prettier, override.prettier);

		if (override.prettier.options) {
			prettier.options = {
				...base.prettier.options,
				...override.prettier.options,
			};
		}
	}

	const shiki: SyntaxHighlighterLangOptions['shiki'] = {
		...base.shiki,
	};

	if (override?.shiki) {
		Object.assign(shiki, override.shiki);
	}

	return {
		prettier,
		shiki,
	};
};
