import unorm from "unorm";

export function naturalize(value: string) {
  value = unorm.nfd(value).replace(/[\u0300-\u036f]/g, "");
  value = value.toLowerCase();
  value = value.replace(/[^\w\d]/gi, "");
  return value;
}

/**
 * Capitalize the first letter of a piece of text.
 *
 * @param value The text to capitalize
 */
export function capitalize(value: string) {
  if (!value) return "";
  value = String(value);
  return value[0].toUpperCase() + value.slice(1);
}

export function flattenSearchCriteria(criteria: (string | boolean)[]) {
  return criteria.flat().filter(Boolean).join(" ");
}

/** If there's a trailing slash, get the string back without one. */
export function trimTrailingSlash(str: string) {
  if (str.at(-1) === "/") {
    return str.slice(0, -1);
  }
  return str;
}
