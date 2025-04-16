import { ScryfallApi } from "../scryfall-api";
import { vi } from "vitest";
import { makeCard } from "../../models/__test__/card.util";
import { Http } from "../http";

vi.mock("../http");

describe.sequential("ScryfallApi", () => {
  let api = new ScryfallApi();

  beforeEach(() => {
    api = new ScryfallApi();
  });

  describe("getRandomCard", () => {
    it("should get a random art with the requested query", async () => {
      const CARD = makeCard();
      vi.mocked(Http.prototype.fetch).mockResolvedValue(CARD);

      const query = "f:standard";

      const card = await api.getRandomCard(query);

      expect(card).toEqual(CARD);

      const url = vi.mocked(Http.prototype.fetch).mock.calls[0][0] as URL;
      expect(url.href).toContain("/random");
      expect(url.href).toContain(encodeURIComponent(query));
    });
  });

  describe("getRandomArt", () => {
    it("should get a random art with the requested query", async () => {
      const ORACLE_CARD = makeCard();
      const PRINT = makeCard();
      vi.mocked(Http.prototype.fetch).mockResolvedValue(PRINT);

      const query = "f:standard";

      const card = await api.getRandomArt(ORACLE_CARD.oracle_id, query);

      expect(card).toEqual(PRINT);

      const url = vi.mocked(Http.prototype.fetch).mock.calls[0][0] as URL;
      expect(url.href).toContain("/random");
      expect(url.href).toContain(encodeURIComponent(query));
      expect(url.href).toContain(encodeURIComponent(`oracle_id:${ORACLE_CARD.oracle_id}`));
    });
  });
});
