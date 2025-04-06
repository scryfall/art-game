import axios from "axios";
import type { ScryfallCard } from "../models/scryfall-card";

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
}
