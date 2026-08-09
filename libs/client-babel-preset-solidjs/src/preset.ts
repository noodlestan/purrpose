import type { CompilerPreset } from '@purrpose/client-babel';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-expect-error */
import jsxTransform from 'babel-plugin-jsx-dom-expressions';
import * as solidWeb from 'solid-js/web';

/**
 * Extracted from [babel-preset-solid](https://github.com/solidjs/solid/blob/main/packages/babel-preset-solid/index.js) in order to insulate from non-standalone Babel.
 */
export function solidPreset(): CompilerPreset {
	const plugin = [
		jsxTransform,
		{
			moduleName: 'solid-js/web',
			builtIns: [
				'For',
				'Show',
				'Switch',
				'Match',
				'Suspense',
				'SuspenseList',
				'Portal',
				'Index',
				'Dynamic',
				'ErrorBoundary',
			],
			contextToCustomElements: true,
			wrapConditionals: true,
			generate: 'dom',
		},
	];
	const babelPreset = { plugins: [plugin] };

	return {
		babelPresets: [babelPreset],
		scope: {
			require: () => solidWeb,
		},
	};
}
