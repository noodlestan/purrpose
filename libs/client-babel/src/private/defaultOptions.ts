import type { CompilerOptions } from '../types';

export function defaultOptions(): CompilerOptions {
	return {
		debug: false,
		compile: {
			filename: 'purrpose/client-babel/main.tsx',
			babelOptions: {},
		},
		execute: {
			thisArg: undefined,
		},
		presets: [{ babelPresets: ['es6'] }],
	};
}
