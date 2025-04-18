import type { ScryfallCard, ScryfallCardFace, ScryfallImageUris } from "../scryfall-card";
import { uuidv4 } from "../uuid";

export function makeImageUris(label?: string): ScryfallImageUris {
  const prefix = label ? `${label}.` : "";

  return {
    small: `<${prefix}image.small>`,
    normal: `<${prefix}image.normal>`,
    large: `<${prefix}image.large>`,
    png: `<${prefix}image.png>`,
    art_crop: `<${prefix}image.art_crop>`,
  };
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
    image_uris: makeImageUris(),
    ...overrides,
  };
  return card;
}

/**
 * Make a single-faced split card.
 */
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

/**
 * Make a double-faced card.
 */
export function makeDfcCard(
  face1: ScryfallCardFace,
  face2: ScryfallCardFace,
  overrides: Partial<ScryfallCard> = {}
) {
  const card = makeCard({
    name: `${face1.name} // ${face2.name}`,
    type_line: `${face1.type_line} // ${face2.type_line}`,
    card_faces: [
      {
        image_uris: makeImageUris("front"),
        ...face1,
      },
      {
        image_uris: makeImageUris("back"),
        ...face2,
      },
    ],
    ...overrides,
  });
  delete card.image_uris;
  return card;
}

export function makeReversibleCard(
  face1: ScryfallCardFace,
  face2: ScryfallCardFace,
  overrides: Partial<ScryfallCard> = {}
) {
  const card = makeCard({
    name: `${face1.name} // ${face2.name}`,
    card_faces: [
      {
        oracle_id: uuidv4(),
        image_uris: makeImageUris("front"),
        ...face1,
      },
      {
        oracle_id: uuidv4(),
        image_uris: makeImageUris("back"),
        ...face2,
      },
    ],
    ...overrides,
  });
  delete card.oracle_id;
  delete card.image_uris;
  return card;
}
