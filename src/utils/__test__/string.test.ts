import { capitalize, naturalize, trimTrailingSlash } from "../string";

describe("naturalize", () => {
  [
    { in: `Ring of Ma'rûf`, out: "ringofmaruf" },
    { in: `Ghazbán Ogress`, out: "ghazbanogress" },
    { in: `El-Hajjâj`, out: "elhajjaj" },
    { in: `Junún Efreet`, out: "jununefreet" },
    { in: `Offspring's Revenge`, out: "offspringsrevenge" },
    { in: `Alive // Well`, out: `alivewell` },
    {
      in: `Chandra, Fire of Kaladesh // Chandra, Roaring Flame`,
      out: "chandrafireofkaladeshchandraroaringflame",
    },
    { in: `Kongming, "Sleeping Dragon"`, out: "kongmingsleepingdragon" },
  ].forEach((scenario) => {
    it(`naturalizes ${scenario.in} as expected`, () => {
      expect(naturalize(scenario.in)).toBe(scenario.out);
    });
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter of text", () => {
    expect(capitalize("foo")).toEqual("Foo");
  });
});

describe("trimTrailingSlash", () => {
  it("strips the final trailing slash from text", () => {
    expect(trimTrailingSlash("path/to/")).toEqual("path/to");
  });

  it("doesn't alter text that has no trailing slash", () => {
    expect(trimTrailingSlash("path/to")).toEqual("path/to");
  });
});
