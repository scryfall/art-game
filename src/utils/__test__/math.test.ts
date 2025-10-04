import { pickRandomItem } from "../math";

describe("math", () => {
  describe("pickRandomItem", () => {
    it("picks a random item from the array", () => {
      const arr = ["a", "b", "c"];

      const pick = pickRandomItem(arr);

      expect(pick).toBeOneOf(arr);
    });

    it("returns undefined for a zero length array", () => {
      expect(pickRandomItem([])).toBeUndefined();
    });
  });
});
