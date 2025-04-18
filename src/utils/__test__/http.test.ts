import type { Mock } from "vitest";
import { Http } from "../http";

describe("http", () => {
  describe("fetch", () => {
    let fetchSpy: Mock;

    beforeEach(() => {
      fetchSpy = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ data: "foo" }),
      });
      vi.stubGlobal("fetch", fetchSpy);
    });

    it("calls fetch with url", async () => {
      const http = new Http();

      const res = await http.fetch("https://example.com/foo");

      expect(res).toEqual({
        data: "foo",
      });
      expect(fetchSpy).toBeCalledWith("https://example.com/foo");
    });
  });
});
