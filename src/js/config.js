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

export const UniversalCriteria = [
  '-t:basic',
  '-t:saga',
  '-is:split',
  '-is:transform',
  '-is:fullart',
  '-is:extra'
];
