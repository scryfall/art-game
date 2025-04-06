/**
 * Criteria to use for every random fetch.
 */
export const UniversalCriteria = [
  "-t:basic",
  "-t:saga",
  "-t:stickers",
  "not:split",
  "not:transform",
  "not:fullart",
  "not:extra",
];

/**
 * The supported formats in the art game.
 * This is the order they'll show up on the front page, too.
 */
export const PresetFormatQueries = [
  { id: "standard", query: "f:standard" },
  { id: "pioneer", query: "f:pioneer" },
  { id: "modern", query: "f:modern" },
  { id: "vintage", query: "f:vintage" },
];
