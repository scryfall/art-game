type CardFace = {
  name: string;
  flavor_name?: string;
  type_line: string;
};

export type ScryfallCard = {
  object: "card";
  id: string;
  oracle_id: string;
  name: string;
  flavor_name?: string;
  scryfall_uri: string;
  type_line: string;
  /** The set code. */
  set: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
  };
  card_faces: undefined | CardFace[];
};
