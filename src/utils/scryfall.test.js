import { Scryfall } from "./scryfall";

describe("Scryfall", () => {
  let scryfall = new Scryfall();

  beforeEach(() => {
    scryfall = new Scryfall();
  });

  describe("getRandomCard", () => {
    const data = { name: "test name" };

    beforeEach(() => {
      scryfall.axios.get = jest.fn().mockResolvedValue({ data });
    });

    it("should call with the requested query", async () => {
      const card = await scryfall.getRandomCard("f:standard");

      expect(card).toBeDefined();
      expect(card.data).toBe(data);
      expect(scryfall.axios.get).toHaveBeenCalledTimes(1);
      expect(scryfall.axios.get).toHaveBeenCalledWith(
        expect.stringContaining("?q=f:standard")
      );
    });

    it("should pass through additional criteria", async () => {
      const criteria = "foo bar baz -biff not:jazz";

      await scryfall.getRandomCard("standard", criteria.split(" "));

      expect(scryfall.axios.get).toHaveBeenCalledTimes(1);
      expect(scryfall.axios.get).toHaveBeenCalledWith(
        expect.stringContaining(criteria)
      );
    });
  });
});
