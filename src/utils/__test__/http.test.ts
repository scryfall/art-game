import type { Mock } from "vitest";
import { Http, HttpError } from "../http";

describe("http", () => {
  let http: Http;
  let fetchSpy: Mock;

  beforeEach(() => {
    fetchSpy = vi.fn();
    http = new Http();
  });

  describe("fetch", () => {
    const body = { data: "foo" };

    beforeEach(() => {
      fetchSpy.mockResolvedValue({
        status: 200,
        ok: true,
        json: vi.fn().mockResolvedValue(body),
      });
      vi.stubGlobal("fetch", fetchSpy);
    });

    it("calls fetch with url", async () => {
      const res = await http.fetch("https://example.com/foo");

      expect(res).toEqual(body);
      expect(fetchSpy).toBeCalledWith("https://example.com/foo");
    });

    it("throws if response was not OK", async () => {
      fetchSpy.mockResolvedValue({
        status: 400,
        ok: false,
        json: vi.fn().mockResolvedValue(body),
      });

      await expect(http.fetch("https://example.com/foo")).rejects.toThrow(HttpError);
    });
  });
});
