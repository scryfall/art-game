import axios from "axios";
import { ScryfallApi } from "../scryfall-api";
import { vi } from "vitest";
import { makeCard } from "../../models/__test__/card.util";

vi.mock("axios", { spy: true });

describe("ScryfallApi", () => {
  let api = new ScryfallApi();

  beforeEach(() => {
    api = new ScryfallApi();
  });

  describe("getRandomCard", () => {
    it("should call with the requested query", async () => {
      const TEST_CARD = makeCard();
      vi.mocked(axios.get).mockResolvedValue({
        data: TEST_CARD,
      });

      const query = "f:standard";

      const card = await api.getRandomCard(query);

      expect(card).toEqual(TEST_CARD);
      expect(axios.get).toHaveBeenCalledExactlyOnceWith(expect.stringContaining(query));
    });
  });
});
