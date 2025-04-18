import type { ScryfallCard } from "./scryfall-card";

export type ScryfallCardList = {
  object: "list";
  total_cards: number;
  has_more: boolean;
  next_page: string;
  data: ScryfallCard[];
};
