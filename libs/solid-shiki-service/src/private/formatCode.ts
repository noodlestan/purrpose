import * as prettier from 'prettier/standalone.js';

import type { SyntaxHighlighterLangOptions } from '../types';

export const formatCode = async (
	code: string,
	langOptions: SyntaxHighlighterLangOptions | undefined,
): Promise<string> => {
	const prettierOptions = langOptions?.prettier;
	if (!prettierOptions) {
		return code;
	}
	try {
		return await prettier.format(code, {
			parser: prettierOptions.parser,
			plugins: prettierOptions.plugins,
			...prettierOptions.options,
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.warn(`Prettier parser ${prettierOptions.parser} error ${message}`);
		return code;
	}
};
