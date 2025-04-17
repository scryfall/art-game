import type { Mock } from "vitest";
import { Http } from "../http";
import { wait } from "../timer";

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

    it("automatically ratelimits the request", async () => {
      let resolved = false;
      const http = new Http();
      await http.fetch("https://example.com/1");
      http.fetch("https://example.com/2").then(() => (resolved = true));

      expect(resolved).toEqual(false);
      await wait(40);
      expect(resolved).toEqual(false);

      await wait(10);
      expect(resolved).toEqual(true);
    });
  });
});
