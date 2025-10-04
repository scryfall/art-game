import { CardBank } from "../../models/__test__/card-bank.util";
import { makeCard } from "../../models/__test__/card.util";
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

  describe("multi-part cards", () => {
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
        "legendary card",
        makeCard({
          name: "Foo, Bar",
          printed_name: "Fleem, the Tester",
          type_line: "Legendary Creature - Human Warrior",
        }),
        [
          "Foo, Bar",
          "Fleem, the Tester",
          "Foo",
          "Bar",
          "the Bar",
          "of the Bar",
          "Fleem",
          "Tester",
          "the Tester",
          "of the Tester",
        ],
      ],
      [
        "legendary DFC with flavor name in legendary style",
        CardBank.HeartOfTheExplorer,
        [
          "Azcanta",
          "Azcanta, the Sunken Ruin",
          "Explorer",
          "Heart",
          "Heart of the Explorer",
          "Heart of the Explorer // The Lost Valley",
          "Search for Azcanta",
          "Search for Azcanta // Azcanta, the Sunken Ruin",
          "Sunken Ruin",
          "The Lost Valley",
          "of the Explorer",
          "of the Sunken Ruin",
          "the Explorer",
          "the Sunken Ruin",
        ],
      ],
      [
        "DFC with flavor name in legendary style",
        CardBank.DraculaLordOfBlood,
        [
          "Voldaren Bloodcaster // Bloodbat Summoner",
          "Voldaren Bloodcaster",
          "Bloodbat Summoner",
          // does not give it the legendary treatment of allowing just Dracula
          "Dracula, Lord of Blood // Dracula, Lord of Bats",
          "Dracula, Lord of Bats",
          "Dracula, Lord of Blood",
        ],
      ],
    ])("includes oracle and flavor name cards for %s", (_, card, expectedNames) => {
      expect(getCardNames(card).sort()).toEqual(expectedNames.sort());
    });
  });
});
