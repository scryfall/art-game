import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { Scryfall } from './scryfall';

describe('Scryfall', () => {
  let scryfall = new Scryfall();

  beforeEach(() => {
    scryfall = new Scryfall();
  });

  describe('getRandomCard', () => {
    const data = { name: 'test name' };

    beforeEach(() => {
      scryfall.axios.get = jest.fn(() => Promise.resolve({ data }));
    });

    it('should call with the requested format', async () => {
      const card = await scryfall.getRandomCard('standard');

      expect(card).toBeDefined();
      expect(card.card).toBe(data);
      expect(scryfall.axios.get).toHaveBeenCalledTimes(1);
    });

    it('should call with the specified format', async () => {
      const format = 'someformat';

      await scryfall.getRandomCard(format);

      expect(scryfall.axios.get).toHaveBeenCalledTimes(1);
      const args = scryfall.axios.get.mock.calls[0];
      expect(args[0].includes(`f:${format}`)).toBe(true);
    });

    it('should pass through additional criteria', async () => {
      const criteria = 'foo bar baz -biff not:jazz';

      await scryfall.getRandomCard('standard', criteria.split(' '));

      expect(scryfall.axios.get).toHaveBeenCalledTimes(1);
      const args = scryfall.axios.get.mock.calls[0];
      expect(args[0].includes(criteria)).toBe(true);

    });
  });
});
