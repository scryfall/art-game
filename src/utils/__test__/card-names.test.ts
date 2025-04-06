import { makeCard } from "../../models/__test__/card.util";
import { getCardNames } from "../card-names";

describe("getCardNames", () => {
  test.each<[string, string, string[]]>([
    ["Arbor Elf", "Creature — Elf", []],
    [
      // comma
      "Alesha, Who Smiles at Death",
      "Legendary Creature — Human Warrior",
      ["Alesha", "Who Smiles at Death", "the Who Smiles at Death", "of the Who Smiles at Death"],
    ],
    [
      // "of the"
      "Hivis of the Scale",
      "Legendary Creature — Lizard Shaman",
      ["Hivis", "Scale", "the Scale", "of the Scale"],
    ],
    [
      // "the"
      "Mayael the Anima",
      "Legendary Creature — Elf Shaman",
      ["Mayael", "Anima", "the Anima", "of the Anima"],
    ],
    [
      // Combined comma + "the"
      "Aegar, the Freezing Flame",
      "Legendary Creature — Elf Shaman",
      ["Aegar", "Freezing Flame", "the Freezing Flame", "of the Freezing Flame"],
    ],
  ])("gets names back for single-faced cards: %s", (fullName, typeLine, additionalNames) => {
    const card = makeCard({ name: fullName, type_line: typeLine });

    expect(getCardNames(card).sort()).toEqual([fullName, ...additionalNames].sort());
  });

  test.each<[string, string, string, string, string[]]>([
    ["Alive", "Well", "Sorcery", "Sorcery", []],
    ["Commit", "Memory", "Instant", "Sorcery", []],
    [
      // Simple legend name
      "Beluna Grandsquall",
      "Seek Thrills",
      "Legendary Creature — Giant Noble",
      "Instant — Adventure",
      [],
    ],
    [
      // Complex legend name
      "Kellan, the Fae-Blooded",
      "Birthright Boon",
      "Legendary Creature — Human Faerie",
      "Sorcery — Adventure",
      ["Kellan", "Fae-Blooded", "the Fae-Blooded", "of the Fae-Blooded"],
    ],
  ])(
    "gets names back for multi-part cards: %s // %s",
    (name1, name2, type1, type2, additionalNames) => {
      const combined = `${name1} // ${name2}`;
      const card = makeCard({
        name: combined,
        type_line: `${type1} // ${type2}`,
        card_faces: [
          { name: name1, type_line: type1 },
          { name: name2, type_line: type2 },
        ],
      });

      expect(getCardNames(card).sort()).toEqual(
        [combined, name1, name2, ...additionalNames].sort()
      );
    }
  );
});
