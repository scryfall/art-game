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
        CardBank.Eleven,
        [
          "Cecily, Haunted Mage",
          "Eleven, the Mage",
          "Eleven",
          "Mage",
          "the Mage",
          "of the Mage",
          "Cecily",
          "Haunted Mage",
          "of the Haunted Mage",
          "the Haunted Mage",
        ],
      ],
      [
        "non-legendary cards with legendary name constructions",
        CardBank.DraculaLordOfBlood,
        [
          "Dracula, Lord of Blood // Dracula, Lord of Bats",
          "Voldaren Bloodcaster // Bloodbat Summoner",
          "Voldaren Bloodcaster",
          // note: because it's not actually legendary, we don't respect the comma construction
          "Dracula, Lord of Blood",
          "Bloodbat Summoner",
          "Dracula, Lord of Bats",
        ],
      ],
      [
        "legendary cards with legendary name constructions",
        CardBank.HeartOfTheExplorer,
        [
          "Search for Azcanta // Azcanta, the Sunken Ruin",
          "Heart of the Explorer // The Lost Valley",
          "Search for Azcanta",
          "Azcanta, the Sunken Ruin",
          "Azcanta",
          "Sunken Ruin",
          "of the Sunken Ruin",
          "the Sunken Ruin",
          "Heart of the Explorer",
          "The Lost Valley",
          "Explorer",
          "Heart",
          "of the Explorer",
          "the Explorer",
        ],
      ],
    ])("includes oracle and flavor name cards for %s", (_, card, expectedNames) => {
      expect(getCardNames(card).sort()).toEqual(expectedNames.sort());
    });
  });
});
