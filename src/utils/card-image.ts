import type { ScryfallCard, ScryfallImageUris } from "../models/scryfall-card";

/**
 * Extract the image_uri objects of a card.
 *
 * This should return one or two images, for cards with one or two faces respectively.
 *
 * In event of a completely unexpected card, this function will return an empty array (`[]`)
 *
 * @param card The card to extract image_uris for.
 * @returns A list of the card's image_uris.
 */
export function getCardImages(card: ScryfallCard): ScryfallImageUris[] {
  if (card.image_uris) {
    return [card.image_uris];
  }
  if (card.card_faces) {
    return card.card_faces.map((face) => face.image_uris).filter(Boolean) as ScryfallImageUris[];
  }
  console.warn("Card had no image_uris found.", card);
  return [];
}
