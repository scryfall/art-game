import type { ScryfallCard } from "../scryfall-card";
import { uuidv4 } from "../uuid";

interface Face {
  name: string;
  flavor_name?: string;
  type_line: string;
}

export function makeCard(overrides: Partial<ScryfallCard> = {}) {
  const card: ScryfallCard = {
    object: "card",
    name: "<card name>",
    id: uuidv4(),
    oracle_id: uuidv4(),
    scryfall_uri: "<scryfall uri>",
    type_line: "<type line>",
    set: "<set code>",
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

export function makeSplitCard(face1: Face, face2: Face, overrides: Partial<ScryfallCard> = {}) {
  return makeCard({
    name: `${face1.name} // ${face2.name}`,
    type_line: `${face1.type_line} // ${face2.type_line}`,
    card_faces: [face1, face2],
    ...overrides,
  });
}
