# Externalise Syntax Highlighter config

## Summary

Move the syntax highlighter language configuration out of the service implementation and make it injectable from the demo app.

## Scope

- `$PROJECT = apps/standard-ui-demo`
- `$PROJECT/src/services/SyntaxHighlighter/private/constants.ts`

## User story

As the demo app configures syntax highlighting, I need language definitions to come from externalized config, so the service can be assembled from purrception language data instead of hardcoded assumptions.

## Refined

- Configure the app with all purrception languages.
- Inject parsers through service configuration.
- Keep the default values in `LANG_DEFAULTS` in `apps/standard-ui-demo/src/services/SyntaxHighlighter/private/constants.ts`.
- Ensure the service can still initialize with sensible defaults when no custom config is passed.

## Unrefined

- Decide how the language registry should be shaped.
- Confirm whether parser injection should happen at app bootstrap or at service construction.
- Check whether the config should support partial overrides or only full replacement.

## Acceptance criteria

- Syntax highlighter language config is provided externally.
- `LANG_DEFAULTS` remains the source of default values.
- The app can configure the service with the full purrception language set.

## Changes

| package                       | feature             | change  | summary                                                  |
| ----------------------------- | ------------------- | ------- | -------------------------------------------------------- |
| @purrpose/solid-shiki-service | Syntax highlighting | changed | `SyntaxHighlighterLang` widened from union to `string`   |
| @purrpose/solid-shiki-service | Syntax highlighting | changed | `DEFAULT_OPTIONS` renamed to `DEFAULT_LANGS`             |
| @purrpose/solid-shiki-service | Syntax highlighting | changed | `createSyntaxHighlighter` accepts optional `langs` param |
| @purrpose/solid-shiki-service | Syntax highlighting | changed | `createOptions` merges external langs over defaults      |
