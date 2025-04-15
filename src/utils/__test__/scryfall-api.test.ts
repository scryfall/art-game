import axios from "axios";
import { ScryfallApi } from "../scryfall-api";
import { vi } from "vitest";
import { makeCard } from "../../models/__test__/card.util";

vi.mock("axios", { spy: true });

const expectUriComponent = (text: string) => expect.stringContaining(encodeURIComponent(text));

describe.sequential("ScryfallApi", () => {
  let api = new ScryfallApi();

  beforeEach(() => {
    api = new ScryfallApi();
  });

  describe("getRandomCard", () => {
    it("should get a random art with the requested query", async () => {
      const CARD = makeCard();
      vi.mocked(axios.get).mockResolvedValue({
        data: CARD,
      });

      const query = "f:standard";

      const card = await api.getRandomCard(query);

      expect(card).toEqual(CARD);
      expect(axios.get).toHaveBeenCalledExactlyOnceWith(expectUriComponent(query));
    });
  });

  describe("getRandomArt", () => {
    it("should get a random art with the requested query", async () => {
      const ORACLE_CARD = makeCard();
      const PRINT = makeCard();
      vi.mocked(axios.get).mockResolvedValue({
        data: PRINT,
      });

      const query = "f:standard";

      const card = await api.getRandomArt(ORACLE_CARD.oracle_id, query);

      expect(card).toEqual(PRINT);
      expect(axios.get).toHaveBeenCalledExactlyOnceWith(expectUriComponent(query));
      expect(axios.get).toHaveBeenCalledExactlyOnceWith(
        expectUriComponent(`oracle_id:${ORACLE_CARD.oracle_id}`)
      );
    });
  });
});
