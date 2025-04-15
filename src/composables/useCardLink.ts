import { computed } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";

export function useCardUri(card: ScryfallCard) {
  return computed(() => {
    const url = new URL(card.scryfall_uri);
    url.searchParams.set("utm_source", "artgame");
    return url.toString();
  });
}
