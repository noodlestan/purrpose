# Agent Rules and Orientation

## Agent Boot Sequence

1. Read this file.
2. Read `package.json` to understand the project structure and available scripts.
3. Run `npm install` to install dependencies.

## Commands

- `npm run ci` — run lint, build, and test across all packages.
- `npm run lint` — lint all packages.
- `npm run build` — build all packages.
- `npm run test` — test all packages.

## Project Structure

This is an npm workspaces monorepo with packages under `libs/`.

- `libs/client-babel/` — `@purrpose/client-babel` — In-browser JSX/TSX compiler for playgrounds and documentation tools.
- `libs/client-babel-preset-solidjs/` — `@purrpose/client-babel-preset-solidjs` — SolidJS JSX transform preset for `@purrpose/client-babel`.
- `libs/solid-shiki-service/` — `@purrpose/solid-shiki-service` — Shiki syntax highlighting service for SolidJS.
