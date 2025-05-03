import { Theme } from "../models/theme";
import { StorageKey } from "../models/storage-key";
import { defineStore } from "pinia";
import { ref } from "vue";

function parseTheme() {
  const savedValue = localStorage.getItem(StorageKey.Theme);
  if (savedValue === Theme.Dark || savedValue === Theme.Light) {
    return savedValue;
  }
  return Theme.Dark;
}

export const useConfigStore = defineStore("config", () => {
  const theme = ref(parseTheme());
  const autocomplete = ref(localStorage.getItem(StorageKey.Autocomplete) === "true");
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
