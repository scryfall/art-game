/**
 * These criteria must be part of every lookup, because otherwise the game breaks.
 */
export const COMPATIBILITY_CRITERIA = [
  // Reversible cards just aren't supported at all. If you get one, the game crashes.
  "not:reversible",
];

/**
 * These criteria exclude some treatments that are compatible with art game, except they're just bad because they give away the answer inside the artwork.
 */
export const AVOID_CRITERIA = [
  // Posters often mix in the name somewhere within the art.
  "not:poster",
  // OTJ/OTP Wanted posters have the name just inside the art crop.
  "-(set:otj,otp frame:showcase)",
];
