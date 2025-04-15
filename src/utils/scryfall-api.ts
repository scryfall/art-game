import type { ScryfallCard } from "../models/scryfall-card";
import type { ScryfallCatalog } from "../models/scryfall-catalog";
import { Http } from "./http";

export class ScryfallApi {
  private readonly http = new Http();

  /**
   * Get a random card from the Random API.
   * @param query The query to send to Scryfall's random API endpoint
   * @returns A card object
   */
  async getRandomCard(query: string) {
    const url = new URL("https://api.scryfall.com/cards/random");
    url.searchParams.set("q", query);

    const card = await this.http.fetch<ScryfallCard>(url);
    return card;
  }

  /**
   * Get a random artwork for a given card.
   * @param oracleId The oracle ID to request
   * @param query The query with constraints on the card art
   * @returns A card object
   */
  async getRandomArt(oracleId: string, query: string) {
    const url = new URL("https://api.scryfall.com/cards/random");
    url.searchParams.set("q", `${query} oracle_id:${oracleId} unique:art`);

    const card = await this.http.fetch<ScryfallCard>(url);
    return card;
  }

  /**
   * Autocomplete a card name.
   *
   * @param name The partial card name to autocomplete
   * @returns A list of autocomplete suggestions, as sorted by the Scryfall API (nearest match first).
   */
  async autocomplete(name: string) {
    const url = new URL("https://api.scryfall.com/cards/autocomplete");
    url.searchParams.set("q", name);

    const catalog = await this.http.fetch<ScryfallCatalog>(url);
    return catalog.data;
  }
}

export const ScryfallApiInstance = new ScryfallApi();
