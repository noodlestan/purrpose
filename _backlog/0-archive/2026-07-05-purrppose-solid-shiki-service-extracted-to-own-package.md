# Extract SyntaxHighlighter to its own package

## Summary

Move the `SyntaxHighlighter` service out of the Standard UI demo and into a dedicated package so the service can be shared and maintained independently.

## Scope

- `$PROJECT = apps/standard-ui-demo`
- `$ROOT/libs/purrtrait-shiki-service`

## User story

As a consumer of the Standard UI demo and related rendering services, I need `SyntaxHighlighter` to live in a standalone package, so its implementation and dependencies are isolated from the app.

## Refined

- Extract `apps/standard-ui-demo/src/services/SyntaxHighlighter` into `libs/purrtrait-shiki-service/src/services/SyntaxHighlighter`.
- Base the new package scaffold on `libs/purrtrait-solid-code`.
- Declare `solid-prettier-standalone` and `shiki` as peer dependencies.
- Add barrel files to every new index file using the existing barrel comment pattern.
- Refactor `apps/standard-ui-demo/src/providers/Rendering/private/createRenderingContext.ts` to consume the new package.
- Run `npm install` after adding the package so workspace symlinks are created.

## Unrefined

- Confirm the final package name and folder spelling before moving files.
- Decide how much of the current service implementation should be copied versus adapted.
- Check whether the new package needs any additional public exports beyond the service entry point.

## Acceptance criteria

- `SyntaxHighlighter` is no longer sourced from `apps/standard-ui-demo/src/services/SyntaxHighlighter`.
- The service exists in `libs/purrtrait-shiki-service/src/services/SyntaxHighlighter`.
- The Standard UI demo consumes the new package path.
- Workspace links are updated after `npm install`.

## Changes

|package |feature|change|summary|
|-|-|-|-|
|@purrpose/solid-shiki-service|N/A|added|new package|
|@purrpose/solid-shiki-service|Syntax highlighting|added|`SyntaxHighlighter` service, types, and defaults|
|@no-comply/standard-ui-demo|Code blocks|changed|import `SyntaxHighlighter` from `@purrpose/solid-shiki-service`|
|@no-comply/standard-ui-demo|Code blocks|removed|old `src/services/SyntaxHighlighter/` directory|

