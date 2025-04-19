import { makeCard, makeDfcCard, makeSplitCard } from "./card.util";

export const CardBank = {
  /** Simple vanilla creature card. */
  ArborElf: makeCard({ name: "Arbor Elf", type_line: "Creature — Elf" }),

  /** Simple vanilla spell card. */
  LightningBolt: makeCard({ name: "Lightning Bolt", type_line: "Instant" }),

  /** Simple vanilla spell card. */
  Shock: makeCard({ name: "Shock", type_line: "Instant" }),

  /** Alesha, Who Smiles At Death: A legendary card with a comma in her name. */
  Alesha: makeCard({
    name: "Alesha, Who Smiles at Death",
    type_line: "Legendary Creature — Human Warrior",
  }),

  /** Hivis of the Scale: A legendary card with “of the” in his name. */
  Hivis: makeCard({ name: "Hivis of the Scale", type_line: "Legendary Creature — Lizard Shaman" }),

  /** Mayael the Naima: A legendary card with “the” in her name. */
  Mayael: makeCard({ name: "Mayael the Anima", type_line: "Legendary Creature — Elf Shaman" }),

  /** “Jolene, the Plunder Queen”: A legendary card with “, the” in his name. */
  Jolene: makeCard({
    name: "Jolene, the Plunder Queen",
    type_line: "Legendary Creature — Human Warrior",
  }),

  /** Alive // Well: Split card */
  AliveAndWell: makeSplitCard(
    { name: "Alive", type_line: "Sorcery" },
    { name: "Well", type_line: "Sorcery" }
  ),

  /** Commit // Memory: Split card */
  CommitToMemory: makeSplitCard(
    { name: "Commit", type_line: "Instant" },
    { name: "Memory", type_line: "Sorcery" }
  ),

  /** Beluna Grandsquall: A split legendary card with a simple name. */
  BelunaGrandsquall: makeSplitCard(
    { name: "Beluna Grandsquall", type_line: "Legendary Creature — Giant Noble" },
    { name: "Seek Thrills", type_line: "Instant — Adventure" }
  ),

  /** Kellan, the Fae-Blooded: A split legendary card with a title. */
  KellanTheFaeBlooded: makeSplitCard(
    { name: "Kellan, the Fae-Blooded", type_line: "Legendary Creature — Human Faerie" },
    { name: "Birthright Boon", type_line: "Sorcery — Adventure" }
  ),

  /** Touchdown!: basic card with flavor name */
  Touchdown: makeCard({
    name: "Approach of the Second Sun",
    type_line: "Sorcery",
    flavor_name: "Touchdown!",
  }),

  /** Eleven: a legendary card with a flavor name */
  Eleven: makeCard({
    name: "Cecily, Haunted Mage",
    flavor_name: "Eleven, the Mage",
    type_line: "Legendary Creature - Human Wizard",
  }),

  /** Dracula, Lord of Blood: DFC (not legendary, but has comma in flavor name) with flavor names on both sides */
  DraculaLordOfBlood: makeDfcCard(
    {
      name: "Voldaren Bloodcaster",
      type_line: "Creature — Vampire Wizard",
      flavor_name: "Dracula, Lord of Blood",
    },
    {
      name: "Bloodbat Summoner",
      type_line: "Creature — Vampire Wizard",
      flavor_name: "Dracula, Lord of Bats",
    }
  ),

  /** Heart of the Explorer: Legencary DFC with flavor names on both sides */
  HeartOfTheExplorer: makeDfcCard(
    {
      name: "Search for Azcanta",
      type_line: "Legendary Enchantment",
      flavor_name: "Heart of the Explorer",
    },
    {
      name: "Azcanta, the Sunken Ruin",
      type_line: "Legendary Land",
      flavor_name: "The Lost Valley",
    }
  ),
};
