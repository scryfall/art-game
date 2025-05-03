import { createPinia, setActivePinia } from "pinia";
import { StorageKey } from "../../models/storage-key";
import { useConfigStore } from "../config";
import { Theme } from "../../models/theme";

describe("Config Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    localStorage.removeItem(StorageKey.Theme);
    localStorage.removeItem(StorageKey.Autocomplete);
  });

  describe("state", () => {
    it("sets defaults", () => {
      const config = useConfigStore();

      expect(config.theme).toEqual(Theme.Dark);
      expect(config.autocomplete).toEqual(false);
      expect(config.viewConfigScreen).toEqual(false);
    });

    it("uses theme from local storage if available", () => {
      localStorage.setItem(StorageKey.Theme, Theme.Light);
      const config = useConfigStore();

      expect(config.theme).toEqual(Theme.Light);
    });

    // not yet implemented
    it.todo("defaults to Dark theme if local storage theme is invalid");

    it("uses autocomplete setting from local storage if available", () => {
      localStorage.setItem(StorageKey.Autocomplete, "true");
      const config = useConfigStore();

      expect(config.autocomplete).toEqual(true);
    });

    it.todo("defaults to false when autocomplete value is invalid in local storage");
  });

  describe("toggleTheme", () => {
    it("flips theme from light to dark", () => {
      const config = useConfigStore();

      expect(config.theme).toEqual(Theme.Dark);

      config.toggleTheme();
      expect(config.theme).toEqual(Theme.Light);

      config.toggleTheme();
      expect(config.theme).toEqual(Theme.Dark);
    });

    it("sets local storage to current theme", () => {
      const config = useConfigStore();
      expect(localStorage.getItem(StorageKey.Theme)).toBeNull();

      config.toggleTheme();
      expect(localStorage.getItem(StorageKey.Theme)).toBe(Theme.Light);

      config.toggleTheme();
      expect(localStorage.getItem(StorageKey.Theme)).toBe(Theme.Dark);
    });
  });

  describe("toggleAutocomplete", () => {
    it("flips value for autocomplete", () => {
      const config = useConfigStore();

      expect(config.autocomplete).toEqual(false);

      config.toggleAutocomplete();
      expect(config.autocomplete).toEqual(true);

      config.toggleAutocomplete();
      expect(config.autocomplete).toEqual(false);
    });

    it("saves autocomplete value in local storage", () => {
      const config = useConfigStore();
      expect(localStorage.getItem(StorageKey.Autocomplete)).toBeNull();

      config.toggleAutocomplete();
      expect(localStorage.getItem(StorageKey.Autocomplete)).toBe("true");

      config.toggleAutocomplete();
      expect(localStorage.getItem(StorageKey.Autocomplete)).toBe("");
    });
  });
});
