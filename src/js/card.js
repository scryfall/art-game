import { naturalize } from "./utils";
import levenshtein from "js-levenshtein";

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
   * Check if a guess at this card's name is correct.
   * @param {string} guess A guess at the name
   * @returns {boolean} Whether the guess was approximately correct
   */
  guessName(guess) {
    guess = naturalize(guess);

    const goodGuess = this.getAllNames().reduce((acc, cur) => {
      const actual = naturalize(cur);
      const correct = levenshtein(guess, actual) <= 3;
      return acc || correct;
    }, false);

    return goodGuess;
  }

  /**
   * Get an array of all names this card has.
   * @returns {string[]} The card's names
   */
  getAllNames() {
    if (this.isSplit) {
      return this.card.card_faces.flatMap(face => this.getNamesForFace(face));
    } else {
      return this.getNamesForFace(this.card);
    }
  }

  /**
   * Get all names belonging to a face of a card.
   * 
   * If the face is legendary, this will include the face's proper name and title.
   * Their title will be specified with and without "the", regardless of whether it was present.
   * This is to anticipate variants in how users will guess at the name.
   * 
   * Examples:
   *    ["Jace, Cunning Castaway", "Jace", "Cunning Castaway", "the Cunning Castaway"]
   *    ["Saskia the Unyielding", "Saskia", "Unyielding", "the Unyielding"]
  *     ["Vraska, Golgari Queen", "Vraska", "Golgari Queen", "the Golgari Queen"]
   * 
   * @param {object} face A face of a card
   * @returns {string[]} The face's names
   */
  getNamesForFace(face) {
    const names = [face.name];
    const legendary = face.type_line.toLowerCase().includes('legendary');
    if (!legendary) return names;

    const parts = face.name.split(/(?:, | the )/);
    const properName = parts[0];
    const title = parts[1];
    names.push(properName, title, `the ${title}`);

    return names;
  }
}
