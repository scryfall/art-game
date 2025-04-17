import { CardBank } from "../../models/__test__/card-bank.util";
import type { ScryfallCard } from "../../models/scryfall-card";
import { getCardNames } from "../card-names";

describe("getCardNames", () => {
  it("returns the name for common single faced cards", () => {
    expect(getCardNames(CardBank.ArborElf)).toEqual(["Arbor Elf"]);
  });

  describe("legendary name handling", () => {
    test.each<[string, ScryfallCard, string[]]>([
      [
        "a comma",
        CardBank.Alesha,
        [
          "Alesha, Who Smiles at Death",
          "Alesha",
          "Who Smiles at Death",
          "the Who Smiles at Death",
          "of the Who Smiles at Death",
        ],
      ],
      [
        'the construction "of the"',
        CardBank.Hivis,
        ["Hivis of the Scale", "Hivis", "Scale", "the Scale", "of the Scale"],
      ],
      [
        'the word "the"',
        CardBank.Mayael,
        ["Mayael the Anima", "Mayael", "Anima", "the Anima", "of the Anima"],
      ],
      [
        'both a comma and "the"',
        CardBank.Jolene,
        [
          "Jolene, the Plunder Queen",
          "Jolene",
          "Plunder Queen",
          "the Plunder Queen",
          "of the Plunder Queen",
        ],
      ],
    ])("gets names back card names that contain %s", (_, card, expectedNames) => {
      expect(getCardNames(card).sort()).toEqual(expectedNames.sort());
    });
  });

  describe("double faced cards", () => {
    test.each<[string, ScryfallCard, string[]]>([
      ["split", CardBank.AliveAndWell, ["Alive // Well", "Alive", "Well"]],
      ["aftermath", CardBank.CommitToMemory, ["Commit // Memory", "Commit", "Memory"]],
      [
        "legendary creatures and adventures",
        CardBank.BelunaGrandsquall,
        ["Beluna Grandsquall", "Beluna Grandsquall // Seek Thrills", "Seek Thrills"],
      ],
      [
        "legendary creatures with commas in the name and adventures",
        CardBank.KellanTheFaeBlooded,
        [
          "Kellan, the Fae-Blooded // Birthright Boon",
          "Birthright Boon",
          "Kellan, the Fae-Blooded",
          "Kellan",
          "Fae-Blooded",
          "the Fae-Blooded",
          "of the Fae-Blooded",
        ],
      ],
    ])("gets names for cards that are %s", (_, card, expectedNames) => {
      expect(getCardNames(card).sort()).toEqual(expectedNames.sort());
    });
  });

  describe("flavor names", () => {
    test.each<[string, ScryfallCard, string[]]>([
      ["basic cards", CardBank.Touchdown, ["Approach of the Second Sun", "Touchdown!"]],
      [
        "reversible cards",
        CardBank.SwallowsOfParadise,
        [
          "Birds of Paradise // Birds of Paradise",
          "African Swallow // European Swallow",
          "Birds of Paradise",
          // because it's the same card on both sides, the regular name appears twicce in the array
          "Birds of Paradise",
          "African Swallow",
          "European Swallow",
        ],
      ],
    ])("includes oracle and flavor name cards for", (_, card, expectedNames) => {
      expect(getCardNames(card).sort()).toEqual(expectedNames.sort());
    });
  });
});
