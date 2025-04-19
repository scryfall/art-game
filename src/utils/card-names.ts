import type { ScryfallCard } from "../models/scryfall-card";

/**
 * Get an array of all names a card has.
 * @returns The card's names
 */
export function getCardNames(card: ScryfallCard) {
  if (card.card_faces) {
    const names = [card.name, ...card.card_faces.flatMap((face) => getValidNames(face))];
    if (card.card_faces.every((face) => face.flavor_name)) {
      const combinedFlavorName = card.card_faces.map((f) => f.flavor_name).join(" // ");
      names.push(combinedFlavorName);
    }
    return names;
  } else {
    return getValidNames(card);
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
 *    ["Elrond of the White Council", "Elrond", "White Council", "the White Council"]
 *
 * Because of our friend Daxos, we can't just split on commas and "the",
 * or else we get Daxos, Blessed by, Sun. Alas.
 *
 * @param face A face of a card
 * @returns The face's names
 */
function getValidNames(face: { name: string; type_line: string; flavor_name?: string }) {
  const names = [face.name];
  if (face.flavor_name) {
    names.push(face.flavor_name);
  }
  const legendary = face.type_line.toLowerCase().includes("legendary");
  if (!legendary) return names;

  const comma = ",";
  const ofThe = " of the ";
  const the = " the ";

  const push = (properName: string, title: string) => {
    properName = properName.trim();
    title = title
      .trim()
      .replace(/^(the|of the)/, "")
      .trim();
    names.push(properName, title, `the ${title}`, `of the ${title}`);
  };

  const numberOfNames = names.length;
  for (let i = 0; i < numberOfNames; i++) {
    const name = names[i];
    if (name.indexOf(comma) > 0) {
      const [properName, title] = name.split(comma);
      push(properName, title);
    } else if (name.indexOf(ofThe) > 0) {
      const [properName, title] = name.split(ofThe);
      push(properName, title);
    } else if (name.indexOf(the) > 0) {
      const [properName, title] = name.split(the);
      push(properName, title);
    }
  }

  return names;
}
