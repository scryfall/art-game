import {
  type DFCScryfallCard,
  type SplitScryfallCard,
  type ScryfallCard,
  type ScryfallImageUris,
  type ScryfallSplitCardFace,
  type ScryfallDFCCardFace,
} from "../scryfall-card";
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

export function makeCard<T extends ScryfallCard>(overrides: Partial<T> = {}): T {
  const card = {
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
  return card as T;
}

/**
 * Make a single-faced split card.
 */
export function makeSplitCard(
  face1: ScryfallSplitCardFace,
  face2: ScryfallSplitCardFace,
  overrides: Partial<SplitScryfallCard> = {}
) {
  return makeCard<SplitScryfallCard>({
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
  face1: Omit<ScryfallDFCCardFace, "image_uris">,
  face2: Omit<ScryfallDFCCardFace, "image_uris">,
  overrides: Partial<DFCScryfallCard> = {}
) {
  const card = makeCard<DFCScryfallCard>({
    name: `${face1.name} // ${face2.name}`,
    type_line: `${face1.type_line} // ${face2.type_line}`,
    card_faces: [
      {
        ...face1,
        image_uris: makeImageUris("front"),
      },
      {
        ...face2,
        image_uris: makeImageUris("back"),
      },
    ],
    ...overrides,
    image_uris: undefined,
  });
  return card;
}
