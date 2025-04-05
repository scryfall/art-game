import axios from "axios";
import { Card } from "../models/card";

export class Scryfall {
  constructor() {
    this.axios = axios;
  }

  /**
   * Get a random card from the Random API.
   * @param {string} query The base query to send to Scryfall's random API endpoint
   * @param {string[]} [additionalCriteria] An array of additional criteria to search by
   * @returns {Card} A card object
   */
  async getRandomCard(query, additionalCriteria) {
    additionalCriteria = additionalCriteria || [];
    const endpoint = "https://api.scryfall.com/cards/random";
    const response = await this.axios.get(`${endpoint}?q=${query} ${additionalCriteria.join(" ")}`);
    return new Card(response.data);
  }
}
