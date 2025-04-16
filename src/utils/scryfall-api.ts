import type { ScryfallCard } from "../models/scryfall-card";
import type { ScryfallCatalog } from "../models/scryfall-catalog";
import { Http } from "./http";
import { wait } from "./timer";

export class ScryfallApi {
  private readonly http = new Http();

  /**
   * Await this method to wait for a standard rate limit period between requests.
   *
   * @see {@link https://scryfall.com/docs/api#rate-limits-and-good-citizenship Rate limits and good citizenship}
   */
  async rateLimit() {
    await wait(50);
  }

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
