import { solidPreset } from './preset';

// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './preset';
// @endindex

export default solidPreset;
