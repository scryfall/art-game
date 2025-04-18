/**
 * These criteria must be part of every lookup, because otherwise the game breaks.
 */
export const COMPATIBILITY_CRITERIA = [
  // Flavornames give away the answer inside the art frame.
  "not:flavorname",
  "not:reversible",
];
