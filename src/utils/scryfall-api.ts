import type { ScryfallCard } from "../models/scryfall-card";
import type { ScryfallCatalog } from "../models/scryfall-catalog";
import type { ScryfallCardList } from "../models/scryfall-list";
import { Http } from "./http";
import { wait } from "./timer";

class ScryfallApiHttp extends Http {
  private rateLimitPromise = Promise.resolve();

  async fetch<T>(url: string | URL) {
    /**
     * If a previous request has just happened, wait for it to finish and an additional 50ms
     * before starting the next request
     *
     * @see {@link https://scryfall.com/docs/api#rate-limits-and-good-citizenship Rate limits and good citizenship}
     */
    await this.rateLimitPromise;

    const response = super.fetch<T>(url);

    // this makes it so if another request is made in quick succession
    // we'll wait up to 50ms before actually making the request
    // but since we're not awaiting on it here, the current request
    // can finish without issue
    this.rateLimitPromise = response.then(() => wait(50)).catch(() => wait(50));

    return response;
  }
}

type SearchParams = {
  includeExtras?: boolean;
};

export class ScryfallApi {
  constructor(private readonly http: Http = new ScryfallApiHttp()) {}

  /**
   * Get a random card from the Random API.
   *
   * @param query The query to send to Scryfall's random API endpoint
   * @param params Additional paraameters for the search
   * @returns A card object
   */
  async getRandomCard(query: string, params: SearchParams = {}) {
    const url = new URL("https://api.scryfall.com/cards/random");
    url.searchParams.set("q", query);
    if (params.includeExtras) {
      url.searchParams.set("include_extras", "true");
    }

    const card = await this.http.fetch<ScryfallCard>(url);
    return card;
  }

  /**
   * Get a random artwork for a given card.
   *
   * @param oracleId The oracle ID to request
   * @param query The query with constraints on the card art
   * @param params Additional paraameters for the search
   * @returns A card object
   */
  async getRandomArt(oracleId: string, query: string, params: SearchParams = {}) {
    const url = new URL("https://api.scryfall.com/cards/random");
    url.searchParams.set("q", `${query} oracle_id:${oracleId}`);
    url.searchParams.set("unique", "art");
    if (params.includeExtras) {
      url.searchParams.set("include_extras", "true");
    }

    const card = await this.http.fetch<ScryfallCard>(url);
    return card;
  }

  /**
   * Run a normal Scryfall search for a range of cards that meet a query.
   *
   * @param query The search query to run
   * @param params Additional paraameters for the search
   * @returns The results list object.
   */
  async search(query: string, params: SearchParams = {}) {
    const url = new URL("https://api.scryfall.com/cards/search");
    url.searchParams.set("q", query);
    if (params.includeExtras) {
      url.searchParams.set("include_extras", "true");
    }

    const list = await this.http.fetch<ScryfallCardList>(url);
    return list;
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
