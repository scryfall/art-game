import type { ScryfallCard } from "../models/scryfall-card";
import { getCardNames } from "./card-names";
import { naturalize } from "./string";
import levenshtein from "js-levenshtein";

export function isGuessOk(guess: string, card: ScryfallCard) {
  const naturalizedGuess = naturalize(guess);
  const THRESHOLD = 3;

  const names = getCardNames(card);

  for (const name of names) {
    const naturalizedName = naturalize(name);
    if (levenshtein(naturalizedGuess, naturalizedName) <= THRESHOLD) {
      return true;
    }
  }

  return false;
}
