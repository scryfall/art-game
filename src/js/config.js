/**
 * Enum for local storage keys.
 * @readonly
 * @enum {string}
 */
export const StorageKey = Object.freeze({
  Theme: 'theme',
});

/**
 * Enum for theme options.
 * @readonly
 * @enum {string}
 */
export const Theme = Object.freeze({
  Dark: 'dark',
  Light: 'light',
});

/**
 * Criteria to use for every random fetch.
 */
export const UniversalCriteria = [
  '-t:basic',
  '-t:saga',
  '-t:stickers',
  'not:split',
  'not:transform',
  'not:fullart',
  'not:extra',
];

/**
 * The supported formats in the art game.
 * This is the order they'll show up on the front page, too.
 */
export const SupportedFormats = [
  'standard',
  'pioneer',
  'modern',
  'vintage'
];

/**
 * Outcomes of a user's action (guessing or skipping).
 * @readonly
 * @enum {string}
 */
export const Outcome = Object.freeze({
  Correct: 'correct',
  Incorrect: 'incorrect',
  Skip: 'skip',
});
