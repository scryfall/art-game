import axios from 'axios';
import { Card } from './card';

export class Scryfall {
  constructor() {
    this.axios = axios;
  }

  /**
   * Get a random card from the Random API.
   * @param {string} format The format to pick from, e.g.: 'standard', 'modern', 'vintage'
   * @param {string[]} [additionalCriteria] An array of additional criteria to search by
   * @returns {Card} A card object
   */
  async getRandomCard(format, additionalCriteria) {
    additionalCriteria = additionalCriteria || [];
    const endpoint = 'https://api.scryfall.com/cards/random';
    const response = await this.axios.get(`${endpoint}?q=f:${format} ${additionalCriteria.join(' ')}`);
    return new Card(response.data);
  }
}
