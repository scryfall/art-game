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
    this.data = card;
  }

  /**
   * Get the card's proper name. This will be in the "A // B" format if the card is split.
   * @return {string} The card's name
   */
  get name() {
    return this.data.name;
  }

  /**
   * Get the card's art crop URI.
   * @return {string} The art crop URI
   */
  get artCropUri() {
    return this.data.image_uris.art_crop;
  }

  /**
   * Get the card's URI on Scryfall
   * @return {string} The URI for the card page on Scryfall
   */
  get scryfallUri() {
    return this.data.scryfall_uri;
  }

  /**
   * Is this card a multiface card?
   * E.g. split, flip, transform, adventure, etc.
   * @returns {boolean} Whether the card is a multiface card
   */
  get isMultiface() {
    return !!this.data.card_faces;
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
    if (this.isMultiface) {
      return this.data.card_faces.flatMap(face => this.getNamesForFace(face));
    } else {
      return this.getNamesForFace(this.data);
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
   *    ["Vraska, Golgari Queen", "Vraska", "Golgari Queen", "the Golgari Queen"]
   *    ["Saskia the Unyielding", "Saskia", "Unyielding", "the Unyielding"]
   *    ["Daxos, Blessed by the Sun", "Daxos", "Blessed by the Sun", "the Blessed by the Sun"]
   *
   * Because of our friend Daxos, we can't just split on commas and "the",
   * or else we get Daxos, Blessed by, Sun. Alas.
   *
   * @private
   * @param {object} face A face of a card
   * @returns {string[]} The face's names
   */
  getNamesForFace(face) {
    const names = [face.name];
    const legendary = face.type_line && face.type_line.toLowerCase().includes('legendary');
    if (!legendary) return names;

    const comma = ', ';
    const the = ' the ';
    const pComma = face.name.indexOf(comma);
    const pThe = face.name.indexOf(the);
    if (pComma > -1) {
      const properName = face.name.slice(0, pComma);
      const title = face.name.slice(pComma + comma.length).trim();
      names.push(properName, title, `the ${title}`);
      return names;
    } else if (pThe > -1) {
      const properName = face.name.slice(0, pThe);
      const title = face.name.slice(pThe + the.length).trim();
      names.push(properName, title, `the ${title}`);
    }

    return names;
  }
}
