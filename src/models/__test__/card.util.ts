import type { ScryfallCard } from "../scryfall-card";

export function makeCard(overrides: Partial<ScryfallCard> = {}) {
  const card: ScryfallCard = {
    name: "<card name>",
    scryfall_uri: "<scryfall uri>",
    type_line: "<type line>",
    image_uris: {
      small: "<image.small>",
      normal: "<image.normal>",
      large: "<image.large>",
      png: "<image.png>",
      art_crop: "<image.art_crop>",
    },
    card_faces: undefined,
    ...overrides,
  };
  return card;
}
