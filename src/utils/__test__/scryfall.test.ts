import axios from "axios";
import { Scryfall } from "../scryfall";
import { vi } from "vitest";
import { makeCard } from "../../models/__test__/card.util";

vi.mock("axios", { spy: true });

describe("Scryfall", () => {
  let scryfall = new Scryfall();

  beforeEach(() => {
    scryfall = new Scryfall();
  });

  describe("getRandomCard", () => {
    it("should call with the requested query", async () => {
      const TEST_CARD = makeCard();
      vi.mocked(axios.get).mockResolvedValue({
        data: TEST_CARD,
      });

      const query = "f:standard";

      const card = await scryfall.getRandomCard(query);

      expect(card).toEqual(TEST_CARD);
      expect(axios.get).toHaveBeenCalledExactlyOnceWith(expect.stringContaining(query));
    });
  });
});
