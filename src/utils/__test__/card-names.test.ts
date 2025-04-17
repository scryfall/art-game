import { CardBank } from "../../models/__test__/card-bank.util";
import type { ScryfallCard } from "../../models/scryfall-card";
import { getCardNames } from "../card-names";

describe("getCardNames", () => {
  it("returns the name for common single faced cards", () => {
    expect(getCardNames(CardBank.ArborElf)).toEqual([CardBank.ArborElf.name]);
  });

  describe("legendary name handling", () => {
    test.each<[string, ScryfallCard, string[]]>([
      [
        "a comma",
        CardBank.Alesha,
        ["Alesha", "Who Smiles at Death", "the Who Smiles at Death", "of the Who Smiles at Death"],
      ],
      [
        'the construction "of the"',
        CardBank.Hivis,
        ["Hivis", "Scale", "the Scale", "of the Scale"],
      ],
      ['the word "the"', CardBank.Mayael, ["Mayael", "Anima", "the Anima", "of the Anima"]],
      [
        'both a comma and "the"',
        CardBank.Jolene,
        ["Jolene", "Plunder Queen", "the Plunder Queen", "of the Plunder Queen"],
      ],
    ])("gets names back card names that contain %s", (_, card, additionalNames) => {
      expect(getCardNames(card).sort()).toEqual([card.name, ...additionalNames].sort());
    });
  });

  describe("double faced cards", () => {
    test.each<[string, ScryfallCard, string[]]>([
      ["split", CardBank.AliveAndWell, []],
      ["aftermath", CardBank.CommitToMemory, []],
      ["legendary creatures and adventures", CardBank.BelunaGrandsquall, []],
      [
        "legendary creatures with commas in the name and adventures",
        CardBank.KellanTheFaeBlooded,
        ["Kellan", "Fae-Blooded", "the Fae-Blooded", "of the Fae-Blooded"],
      ],
    ])("gets names for cards that are %s", (_, card, additionalNames) => {
      expect(getCardNames(card).sort()).toEqual(
        [card.name, card.card_faces?.[0].name, card.card_faces?.[1].name, ...additionalNames].sort()
      );
    });
  });
});
