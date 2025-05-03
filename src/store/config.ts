import { Theme } from "../models/theme";
import { StorageKey } from "../models/storage-key";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore("config", () => {
  const theme = ref(localStorage.getItem(StorageKey.Theme) ?? Theme.Dark);
  const autocomplete = ref(Boolean(localStorage.getItem(StorageKey.Autocomplete)));
  const viewConfigScreen = ref(false);

  function toggleTheme() {
    theme.value = theme.value === Theme.Dark ? Theme.Light : Theme.Dark;
    localStorage.setItem(StorageKey.Theme, theme.value);
  }
  function toggleAutocomplete() {
    autocomplete.value = !autocomplete.value;
    localStorage.setItem(StorageKey.Autocomplete, autocomplete.value ? "true" : "");
  }

  return {
    theme,
    autocomplete,
    viewConfigScreen,
    toggleTheme,
    toggleAutocomplete,
  };
});
