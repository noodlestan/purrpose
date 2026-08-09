import type babel from '@babel/core';

type CompileOptions = {
	presets?: babel.PluginItem[];
	filename?: string;
	babelOptions?: babel.TransformOptions;
};

type ExecuteOptions = {
	thisArg?: unknown;
};

export type DebugOption = boolean | string | undefined;

export type CompilerPreset = {
	babelPresets?: babel.PluginItem[];
	scope?: CompilerScope;
};

export type CompilerOptions = {
	presets?: CompilerPreset[];
	debug?: DebugOption;
	compile?: CompileOptions;
	execute?: ExecuteOptions;
};

export type CompilerScope = Record<string, unknown>;

export type Compiler = {
	compile: (code: string) => string;
	execute: (code: string, scope: CompilerScope) => unknown;
};

export type CompilerHelpers = {
	evaluateComponent: <T>(body: string | undefined, jsx: string, scope: CompilerScope) => T;
	evaluateExpression: <T>(expression: string, scope: CompilerScope) => T;
	evaluateHandler: <T>(handler: string, debug: DebugOption, scope: CompilerScope) => T;
};

export type CompilerAPI = Compiler & CompilerHelpers;
