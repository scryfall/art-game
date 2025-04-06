type CardFace = {
  type_line: string;
};

export type ScryfallCard = {
  id: string;
  oracle_id: string;
  name: string;
  scryfall_uri: string;
  type_line: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
  };
  card_faces: undefined | CardFace[];
};
