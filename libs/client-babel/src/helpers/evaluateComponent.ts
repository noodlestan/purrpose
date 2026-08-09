import type { Compiler } from '../types';

export function evaluateComponent<T>(
	compiler: Compiler,
	body: string | undefined,
	jsx: string,
	scope: Record<string, unknown>,
): T {
	const bodyCode = body ? `${body} ;` : '';
	const code = `function Component(props) { ${bodyCode} return ${jsx}; }`;
	const js = compiler.compile(code);

	const executable = `${js} ; return Component;`;
	return compiler.execute(executable, scope) as T;
}
