export type ScryfallCardFace = {
  name: string;
  flavor_name?: string;
  type_line: string;
  /** The face's oracle ID. This will be present only if it's a reversible card. */
  oracle_id?: string;
  /** The face's imagery. This will be present only if it's a DFC or reversible card. */
  image_uris?: ScryfallImageUris;
};

export type ScryfallImageUris = {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
};

export type ScryfallCard = {
  object: "card";
  id: string;
  /** The oracle ID. This will be absent at the root level if it's a reversible card. */
  oracle_id?: string;
  name: string;
  flavor_name?: string;
  scryfall_uri: string;
  /** The type line. This will be absent at the root level if it's a reversible card. */
  type_line?: string;
  /** The set code. */
  set: string;
  /** Image URIs for the card. This will be absent at the root level if it's a reversible card. */
  image_uris?: ScryfallImageUris;
  card_faces?: ScryfallCardFace[];
};
