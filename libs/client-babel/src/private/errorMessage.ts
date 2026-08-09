import type { DebugOption } from '../types';

import { makeMessage } from './makeMessage';

export function errorMessage(debug: DebugOption, message: string, ...args: unknown[]): void {
	console.error(makeMessage(debug, message), ...args);
}
