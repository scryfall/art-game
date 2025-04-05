import { naturalize } from "../utils";

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
