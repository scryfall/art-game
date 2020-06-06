/**
 * A helper class for handling Magic cards from the Scryfall API.
 */
export class Card {
  /**
   * Create a new Card wrapping a Scryfall API card object.
   * @param {object} card A card from the Scryfall API
   */
  constructor(card) {
    this.card = card;
  }

  /**
   * Get the card's proper name. This will be in the "A // B" format if the card is split.
   * @return {string} The card's name
   */
  get name() {
    return this.card.name;
  }

  /**
   * Get the card's art crop URI.
   * @return {string} The art crop URI
   */
  get artCropUri() {
    return this.card.image_uris.art_crop;
  }

  /**
   * Get the card's URI on Scryfall
   * @return {string} The URI for the card page on Scryfall
   */
  get scryfallUri() {
    return this.card.scryfall_uri;
  }

  /**
   * Is this card a split card?
   * @returns {boolean} Whether the card is a split card
   */
  get isSplit() {
    return !!this.card.card_faces;
  }

  /**
   * Get an array of all names this card has.
   * @returns {string[]} The card's names
   */
  get allNames() {
    if (this.isSplit) {
      return this.card.card_faces.map(face => face.name);
    } else {
      return [this.card.name];
    }
  }
}
