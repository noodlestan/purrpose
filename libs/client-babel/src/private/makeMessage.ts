import type { DebugOption } from '../types';

export function makeMessage(debug: DebugOption, message: string): string {
	if (typeof debug === 'string') {
		return `"${debug} ${message}"`;
	}
	return `"${message}"`;
}
