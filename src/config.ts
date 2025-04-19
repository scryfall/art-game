/**
 * These criteria must be part of every lookup, because otherwise the game breaks.
 */
export const COMPATIBILITY_CRITERIA = [
  // Reversible cards just aren't supported at all. If you get one, the game crashes.
  "not:reversible",
];
