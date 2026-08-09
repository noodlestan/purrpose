import { makeMessage } from '../private';
import type { Compiler, DebugOption } from '../types';

export function evaluateHandler<T>(
	compiler: Compiler,
	handler: string,
	debug: DebugOption,
	scope: Record<string, unknown>,
): T {
	const debugCode = debug
		? `console.info(${makeMessage(debug, 'Handler called with arguments:')}, ...args);`
		: '';
	const exposedCode = `const exposed = (...args) => { ${debugCode} return handler(...args); }`;
	const code = `const handler = (${handler}); ${exposedCode}`;
	const js = compiler.compile(code);

	const executable = `${js} ; return exposed;`;
	return compiler.execute(executable, scope) as T;
}
