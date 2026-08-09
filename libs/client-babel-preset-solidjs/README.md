# @purrpose/client-babel-preset-solidjs

> SolidJS JSX transform preset for `@purrpose/client-babel`.

This package is part of the [@purrpose](../../README.md) toolkit.

This package provides a Babel preset configuration that enables `@purrpose/client-babel` to compile SolidJS TSX/JSX components directly in the browser.

It contains no runtime, compiler, or execution logic. It only exports a preset suitable for use with `createCompiler()`.

## Installation

```bash
npm install @purrpose/client-babel-preset-solidjs
```

⚠️ **Peer dependencies:** Also install if not in your project already:

- `@purrpose/client-babel`
- `babel-plugin-jsx-dom-expressions`
- `solid-js`

## Usage

```tsx
import { createCompiler } from '@purrpose/client-babel';
import solidPreset from '@purrpose/client-babel-preset-solidjs';

const compiler = createCompiler({ preset: solidPreset });
```

See `@purrpose/client-babel` for complete documentation, examples and API details.

## What it configures

The preset configures Babel to transform JSX into SolidJS-compatible runtime code.

Typical use cases include:

- Component documentation playgrounds
- Interactive examples
- Visual editors
- Runtime component previews
- Browser-based TSX sandboxes

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
