# @purrpose/client-babel

> In-browser JSX/TSX compiler for playgrounds and documentation tools.

This package is part of the [@purrpose](../../README.md) toolkit.

This package is designed for **interactive component environments**: documentation sandboxes, visual editors, and runtime JSX evaluation in the browser.

It is not a build tool replacement and should not be used in production execution contexts.

## ⚠️ Security model

The `execute()` API uses `new Function(...)` and is intended for trusted environments.

See the warnings section below for security, sandboxing, and bundle-size considerations.

## Features

- Compile TSX / JSX in the browser via Babel Standalone
- Pluggable JSX preset (React, Solid, custom)
- Execute compiled code with injected scope
- Debug-friendly logging modes

## Installation

```bash
npm install @purrpose/client-babel
```

⚠️ **Peer dependencies:** Also install if not in your project already:

- `@babel/standalone`
- `assert`

## Usage

### Warnings

- **Uses @babel/standalone (~3–4MB)** - A heavy payload, even for playgrounds and documentation sandboxes. Prefer lazy-loaded or dynamically imported modules.

- ⚠️ `execute()` **is UNSAFE** - It uses `new Function()` without isolation or sandboxing. For a production environments make sure you use a sandboxing model.

- ⚠️ **Transpilation and evaluation only** - module resolution and dependency loading are your responsibility.

### Compiling and evaluating any TS

The compiler can transpile and evaluate arbitrary JavaScript or TypeScript code directly in the browser.

```tsx
import { createCompiler } from '@purrpose/client-babel';

const compiler = createCompiler();
const code = compiler.compile(`const x: string = 'hello';`);
const result = compiler.execute(`${code}; return x`);
```

### Compiling SolidJS components

By providing a JSX transform preset, the same compiler can produce executable framework components at runtime.

The following example uses [@purrpose/client-babel-preset-solidjs](../../purrpose/libs/client-babel-preset-solidjs) to generate a SolidJS component from raw code.

```tsx
import { createCompiler } from '@purrpose/client-babel';
import solidPreset from '@purrpose/client-babel-preset-solidjs';

const options = compile: { preset: solidPreset }
const compiler = createCompiler(options);
const code = compiler.compile(`
  const x: string = 'hello';
  const COMP = (props) => <p>{x} {props.name}</p>;
`);

const Component compiler.execute(`${code}; return COMP`);
return <Component name="world!" />
```

### Using in a complex playground

The following example creates a sandbox demo renderer that recompiles only when strictly necessary.

```tsx
import { createCompiler } from '@purrpose/client-babel';
import solidPreset from '@purrpose/client-babel-preset-solidjs';
import { type Component, createMemo, Dynamic } from 'solid-js';
import * as solidWeb from 'solid-js/web';
import Button from 'my-component-library';

const compiler = createCompiler({
  debug: 'Playground >>',
  compile: { preset: solidPreset }
});

type PlaygroundProps = {
    title: string;
    cName: string,
    cProps: Record<string, unknown>
}

const scope = {
    Button,
    // ... more components
    require: () => solidWeb,
}

const Playground: Component<PlaygroundProps> = (props) => {
    const cName = () => props.cName || 'Button';

    const Comp = createMemo(() => {
        const source = `function COMP(p) { return <div><p>{p.title}</p><${cName()} {...p.props} /></div> }`;
        const code = compiler.compile(source, scope);
        return compiler.execute(`${code}; return COMP; `);
    }

    return <Dynamic component={Comp()} cProps={props.cProps} title={props.title} />
};
```

For `Button` the compiled code will look like this:

```tsx
function COMP(p) {
  return (
    <div>
      <p>{p.title}</p>
      <Button {...p.props} />
    </div>
  );
}
```

The `<Playground />` component can now be used to render any component in scope.

```tsx
const buttonProps = { variant: 'danger', children: 'Click me!' };
return <Playground title="Demo" cName="Button" cProps={buttonProps} />;
```

The generated component is memoized and only recompiled when necessary:

- if `cName` changes the playground recompiles the component.
- if `cProps` or `title` change they are handled by the pre-compiled component.

This can now be integrated into a playground that allows the user to edit the `<div>...</div>` wrapper and even use other components, as long as they are in scope.

## API

### `createCompiler(): CompilerAPI`

```ts
function createCompiler(options?: CompilerOptions): CompilerAPI;
```

### `CompilerAPI`

```ts
type CompilerAPI = {
  compile(code: string): string;
  execute(code: string, scope?: Record<string, unknown>): unknown;
};
```

### Options

```ts
type CompilerOptions = {
  debug?: boolean | string;
  compile?: {
    preset?: babel.PluginItem;
    filename?: string;
    babelOptions?: babel.TransformOptions;
  };
  execute?: {
    thisArg?: unknown;
  };
};
```

| Option                 |                                                                    |
| ---------------------- | ------------------------------------------------------------------ |
| `debug`                | `boolean \| string \| unndefined`                                  |
| `compile.preset`       | JSX transform preset (React, SolidJS, or custom Babel preset).     |
| `compile.filename`     | Virtual filename used in Babel output and error stacks.            |
| `compile.babelOptions` | Additional Babel options merged with the default configuration.    |
| `execute.thisArg`      | Optional `this` binding used when invoking the generated function. |

#### Debug modes

| Mode                     | Behavior                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `undefined`**(Default)** | Errors are logged with `code`, `scope` details before thrown.                              |
| `false`                  | Silent. Errors are still thrown but no logs are emitted.                                   |
| `true`                   | Logs source code before compilation and execution, plus all errors.                        |
| `string`                 | Same as `true`, but the string is prepended to every log message to make filtering easier. |

## Troubleshooting

If you run into errors such as `process is not defined` when bundling `babel-standalone` you need to add this to your bundler environment `BABEL_TYPES_8_BREAKING: true`.

As a last resort:

```html
<script>
  window.process = {};
  window.process.env = { BABEL_TYPES_8_BREAKING: true };
</script>
```

## Development

Make sure you read the [@purrpose README](../../README.md) first.

### Build Targets

This library is distributed as ESM and intended to be processed by a bundler such as Vite or Astro. The main entry point is the Typescript source code.

### Scripts

- **$** `npm run dev` - uses `Vite` to (re)build on changes
- **$** `npm run build` - uses `Vite` to do produce a dry build in `dist/`.
- **$** `npm run lint` / `npm run lint:fix` - uses [@noodlestan/eslint-config](https://www.npmjs.com/package/@noodlestan/eslint-config).

## MIT License

Copyright (c) 2026 [Noodlestan](https://noodlestan.org/).

Published under a [MIT license](https://noodlestan.mit-license.org/).
