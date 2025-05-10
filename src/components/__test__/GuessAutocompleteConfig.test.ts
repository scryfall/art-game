import { getActiveDescendent, getAutocompleteOptionId } from "../GuessAutocompleteConfig";

describe("GuessAutocompleteConfig", () => {
  describe("getAutocompleteOptionId", () => {
    it("returns a string identifier for autocomplete option", () => {
      expect(getAutocompleteOptionId(0)).toEqual("ac-item-0");
      expect(getAutocompleteOptionId(1)).toEqual("ac-item-1");
      expect(getAutocompleteOptionId(99)).toEqual("ac-item-99");
    });
  });

  describe("getActiveDescendent", () => {
    it("returns the autocomplete option id if focused index is at least 0", () => {
      expect(getActiveDescendent(0)).toEqual("ac-item-0");
      expect(getActiveDescendent(1)).toEqual("ac-item-1");
      expect(getActiveDescendent(99)).toEqual("ac-item-99");
    });

    it("returns undefined if focused index is less than 0", () => {
      expect(getActiveDescendent(-1)).toBeUndefined();
      expect(getActiveDescendent(-99)).toBeUndefined();
    });
  });
});
