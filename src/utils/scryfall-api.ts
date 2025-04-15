import axios from "axios";
import type { ScryfallCard } from "../models/scryfall-card";
import type { ScryfallCatalog } from "../models/scryfall-catalog";

export class ScryfallApi {
  /**
   * Get a random card from the Random API.
   * @param query The query to send to Scryfall's random API endpoint
   * @returns A card object
   */
  async getRandomCard(query: string) {
    const response = await axios.get<ScryfallCard>(
      `https://api.scryfall.com/cards/random?q=${query}`
    );
    return response.data;
  }

  async autocomplete(name: string) {
    const response = await axios.get<ScryfallCatalog>(
      `https://api.scryfall.com/cards/autocomplete?q=${name}`
    );
    const catalog = response.data;
    return catalog.data;
  }
}

export const ScryfallApiInstance = new ScryfallApi();
