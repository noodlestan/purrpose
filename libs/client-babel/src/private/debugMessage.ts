import type { DebugOption } from '../types';

import { makeMessage } from './makeMessage';

export function debugMessage(debug: DebugOption, message: string, ...args: unknown[]): void {
	if (!debug) {
		return;
	}
	console.info(makeMessage(debug, message), ...args);
}
