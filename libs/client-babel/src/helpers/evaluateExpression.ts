import type { Compiler } from '../types';

export function evaluateExpression<T>(
	compiler: Compiler,
	expression: string,
	scope: Record<string, unknown>,
): T {
	const code = `const value = (${expression});`;
	const js = compiler.compile(code);

	const executable = `${js} ; return value;`;
	return compiler.execute(executable, scope) as T;
}
