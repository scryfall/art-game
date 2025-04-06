import { CardBank } from "../../models/__test__/card-bank.util";
import { makeCard } from "../../models/__test__/card.util";
import type { ScryfallCard } from "../../models/scryfall-card";
import { getCardNames } from "../card-names";

describe("getCardNames", () => {
  test.each<[ScryfallCard, string[]]>([
    [CardBank.ArborElf, []],
    [
      // comma
      CardBank.Alesha,
      ["Alesha", "Who Smiles at Death", "the Who Smiles at Death", "of the Who Smiles at Death"],
    ],
    [
      // "of the"
      CardBank.Hivis,
      ["Hivis", "Scale", "the Scale", "of the Scale"],
    ],
    [
      // "the"
      CardBank.Mayael,
      ["Mayael", "Anima", "the Anima", "of the Anima"],
    ],
    [
      // Combined comma + "the"
      CardBank.Jolene,
      ["Jolene", "Plunder Queen", "the Plunder Queen", "of the Plunder Queen"],
    ],
  ])("gets names back for single-faced cards: %#", (card, additionalNames) => {
    expect(getCardNames(card).sort()).toEqual([card.name, ...additionalNames].sort());
  });

  test.each<[ScryfallCard, string[]]>([
    [CardBank.AliveAndWell, []],
    [CardBank.CommitToMemory, []],
    [CardBank.BelunaGrandsquall, []],
    [
      CardBank.KellanTheFaeBlooded,
      ["Kellan", "Fae-Blooded", "the Fae-Blooded", "of the Fae-Blooded"],
    ],
  ])("gets names back for multi-part cards: %#", (card, additionalNames) => {
    expect(getCardNames(card).sort()).toEqual(
      [card.name, card.card_faces?.[0].name, card.card_faces?.[1].name, ...additionalNames].sort()
    );
  });
});
