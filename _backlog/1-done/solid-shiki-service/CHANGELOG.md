# CHANGELOG

## (PENDING RELEASE)

### Added

- Create new `@purrpose/solid-shiki-service` package.
- Add `SyntaxHighlighter` service, types, and defaults.

### Changed

- Widen `SyntaxHighlighterLang` from union to `string`.
- Rename `DEFAULT_OPTIONS` to `DEFAULT_LANGS`.
- Accept optional `langs` param in `createSyntaxHighlighter`.
- Merge external langs over defaults in `createOptions`.
