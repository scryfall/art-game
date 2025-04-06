import type { ScryfallCard } from "../scryfall-card";

export function makeCard(overrides: Partial<ScryfallCard> = {}) {
  const card: ScryfallCard = {
    name: "<card name>",
    id: "<scryfall id>",
    oracle_id: "<oracle id>",
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

export function makeSplitCard(
  face1: { name: string; type_line: string },
  face2: { name: string; type_line: string },
  overrides: Partial<ScryfallCard> = {}
) {
  return makeCard({
    name: `${face1.name} // ${face2.name}`,
    type_line: `${face1.type_line} // ${face2.type_line}`,
    card_faces: [face1, face2],
    ...overrides,
  });
}
