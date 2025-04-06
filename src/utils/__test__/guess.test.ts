import { CardBank } from "../../models/__test__/card-bank.util";
import type { ScryfallCard } from "../../models/scryfall-card";
import { isGuessOk } from "../guess";

describe("isGuessOk", () => {
  it.each<[ScryfallCard, string]>([
    [CardBank.KellanTheFaeBlooded, "Kellan"],
    [CardBank.KellanTheFaeBlooded, "Kellog"], // close enough
    [CardBank.KellanTheFaeBlooded, "Kellan the Fae-Blooded"],
    [CardBank.KellanTheFaeBlooded, CardBank.KellanTheFaeBlooded.name],
    [CardBank.LightningBolt, CardBank.LightningBolt.name],
    [CardBank.LightningBolt, "Lightnin Bot"], // typo
    [CardBank.Jolene, "Joeline"], // mis-spelling her name *just* within the acceptable threshold
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
