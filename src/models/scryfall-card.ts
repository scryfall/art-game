export type ScryfallDFCCardFace = {
  name: string;
  flavor_name?: string;
  type_line: string;
  image_uris: ScryfallImageUris;
};

export type ScryfallSplitCardFace = {
  name: string;
  type_line: string;
  image_uris?: never;
  flavor_name?: never;
};

export type ScryfallCardFace = ScryfallDFCCardFace | ScryfallSplitCardFace;

export type ScryfallImageUris = {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
};

export type DefaultScryfallCard = {
  object: "card";
  id: string;
  oracle_id: string;
  name: string;
  flavor_name?: string;
  printed_name?: string;
  scryfall_uri: string;
  type_line: string;
  set: string;
  image_uris: ScryfallImageUris;
  card_faces?: never;
};

export type SplitScryfallCard = {
  object: "card";
  id: string;
  oracle_id: string;
  name: string;
  flavor_name?: string;
  printed_name?: string;
  scryfall_uri: string;
  type_line: string;
  set: string;
  image_uris: ScryfallImageUris;
  card_faces: ScryfallSplitCardFace[];
};

export type DfcScryfallCard = {
  object: "card";
  id: string;
  oracle_id: string;
  name: string;
  scryfall_uri: string;
  type_line: string;
  set: string;
  card_faces: ScryfallCardFace[];
  image_uris?: never;
  flavor_name?: never;
  printed_name?: never;
};

export type ScryfallCard = DefaultScryfallCard | SplitScryfallCard | DfcScryfallCard;
