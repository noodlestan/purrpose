import * as babel from '@babel/standalone';

import { evaluateComponent, evaluateExpression, evaluateHandler } from './helpers';
import { debugMessage, defaultOptions, errorMessage } from './private';
import type { CompilerAPI, CompilerOptions, CompilerScope, DebugOption } from './types';

export function createCompiler(opts: CompilerOptions = {}): CompilerAPI {
	const defaults = defaultOptions();
	const options = {
		...defaults,
		...opts,
		compile: { ...defaults.compile, ...opts.compile },
		execute: { ...defaults.execute, ...opts.execute },
	};

	const babelPresets = [
		['env', { modules: false }],
		['typescript', { onlyRemoveTypeImports: true }],
		...(options.presets?.flatMap(preset => preset.babelPresets || []) || []),
		...(options.compile?.presets || []),
	];

	const babelOptions = {
		...options.compile.babelOptions,
		presets: babelPresets,
		plugins: [],
		filename: options.compile.filename,
		sourceType: 'script' as const,
	};

	const staticScope = Object.assign(
		{},
		...(options.presets?.map(preset => preset.scope ?? {}) ?? []),
	);

	function compile(code: string): string {
		try {
			debugMessage(options.debug, 'compile(code)', { code });

			const result = babel.transform(code, babelOptions);
			if (!result?.code) {
				throw new Error('Babel transform returned empty output');
			}
			return result.code;
		} catch (error) {
			errorMessage(options.debug, 'COMPILE_ERROR:', error, { code });
			throw error;
		}
	}

	function execute(code: string, locals: CompilerScope = {}) {
		const scope = Object.assign({}, locals, staticScope);

		try {
			debugMessage(options.debug, 'execute(code, scope):', { code, scope });

			const args = Object.keys(scope);
			// eslint-disable-next-line no-new-func
			const fn = new Function(...args, code);
			return fn.call(options.execute.thisArg, ...Object.values(scope));
		} catch (error) {
			errorMessage(options.debug, 'EXECUTE_ERROR:', error, { code, scope });
			throw error;
		}
	}

	const compiler = { compile, execute };

	const evalComponent = <T>(body: string | undefined, jsx: string, scope: CompilerScope) =>
		evaluateComponent<T>(compiler, body, jsx, scope);

	const evalExpression = <T>(exp: string, scope: CompilerScope) =>
		evaluateExpression<T>(compiler, exp, scope);

	const evalHandler = <T>(handler: string, debug: DebugOption, scope: CompilerScope) =>
		evaluateHandler<T>(compiler, handler, debug, scope);

	return {
		...compiler,
		evaluateComponent: evalComponent,
		evaluateExpression: evalExpression,
		evaluateHandler: evalHandler,
	};
}
