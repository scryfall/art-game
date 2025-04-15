/**
 * These criteria must be part of every lookup, because otherwise the game breaks.
 */
export const COMPATIBILITY_CRITERIA = [
  // Flavornames give away the answer inside the art frame.
  "not:flavorname",

  // Reversible cards and DFC cards just aren't supported at all yet. If you get one, the game crashes.
  "not:reversible",
  "not:dfc",
];
