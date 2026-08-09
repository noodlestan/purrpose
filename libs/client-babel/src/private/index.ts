// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './debugMessage';
export * from './defaultOptions';
export * from './errorMessage';
export * from './makeMessage';
