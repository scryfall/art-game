import { CardBank } from "../../models/__test__/card-bank.util";
import type { ScryfallCard } from "../../models/scryfall-card";
import { isGuessOk } from "../guess";

describe("isGuessOk", () => {
  it.each<[ScryfallCard, string]>([
    [CardBank.KellanTheFaeBlooded, "Kellan"], // short name
    [CardBank.KellanTheFaeBlooded, "Kellog"], // close enough
    [CardBank.KellanTheFaeBlooded, "Kellan the Fae-Blooded"], // full name
    [CardBank.KellanTheFaeBlooded, CardBank.KellanTheFaeBlooded.name],

    [CardBank.LightningBolt, CardBank.LightningBolt.name],
    [CardBank.LightningBolt, "Lightnin Bot"], // typo

    [CardBank.Patrick, CardBank.Patrick.name], // name
    [CardBank.Patrick, CardBank.Patrick.flavor_name!], // flavor name

    [CardBank.Jolene, "Joeline"], // mis-spelling her name *just* within the acceptable threshold

    [CardBank.Fleem, CardBank.Fleem.card_faces[0].name], // oracle name
    [CardBank.Fleem, CardBank.Fleem.card_faces[1].name!], // oracle name
    [CardBank.Fleem, CardBank.Fleem.card_faces[0].printed_name!], // printed name
    [CardBank.Fleem, CardBank.Fleem.card_faces[1].printed_name!], // printed name
  ])("accepts good guesses: $1", (card, guess) => {
    expect(isGuessOk(guess, card)).toBeTruthy();
  });

  it.each<[ScryfallCard, string]>([
    [CardBank.LightningBolt, "Shock"],
    [CardBank.LightningBolt, "Lightning"],
    [CardBank.KellanTheFaeBlooded, "Real big long text"],
    [CardBank.KellanTheFaeBlooded, "K"],
  ])("rejects bad guesses: $1", (card, guess) => {
    expect(isGuessOk(guess, card)).toBeFalsy();
  });
});
