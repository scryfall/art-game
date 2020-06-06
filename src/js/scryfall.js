export class Scryfall {
  /**
   * Get a random card from the Random API.
   * @param {string} format The format to pick from, e.g.: 'standard', 'modern', 'vintage'
   * @param {string[]} [additionalCriteria] An array of additional criteria to search by
   * @returns {object} A card object
   */
  async getRandomCard(format, additionalCriteria) {
    const endpoint = 'https://api.scryfall.com/cards/random';
    const response = await fetch(`${endpoint}?q=f:${format} ${additionalCriteria.join(' ')}`);
    const card = await response.json();
    return card;
  }
}
