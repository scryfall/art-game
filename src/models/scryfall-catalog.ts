/**
 * A catalog of values.
 *
 * @see {@link https://scryfall.com/docs/api/catalogs}
 */
export type ScryfallCatalog = {
  object: "catalog";
  total_values: number;
  data: string[];
};
