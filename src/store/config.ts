import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../models/theme";
import { StorageKey } from "../models/storage-key";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    viewConfigScreen: false,
    autocomplete: false,
    theme: Theme.Dark,
  },
  reducers: {
    loadConfig(state, action: PayloadAction<{ theme: Theme; autocomplete: boolean }>) {
      state.theme = action.payload.theme;
      state.autocomplete = action.payload.autocomplete;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setAutocomplete(state, action: PayloadAction<boolean>) {
      state.autocomplete = action.payload;
    },
  },
});

export const loadConfig = createAction(configSlice.actions.loadConfig.type, () => {
  const theme = localStorage.getItem(StorageKey.Theme) ?? Theme.Dark;
  const autocomplete = localStorage.getItem(StorageKey.Autocomplete) ?? false;

  return {
    payload: {
      theme,
      autocomplete,
    },
  };
});

export const toggleTheme = createAction(
  configSlice.actions.setTheme.type,
  (currentTheme: Theme) => {
    const theme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
    localStorage.setItem(StorageKey.Theme, theme);

    return {
      payload: theme,
    };
  }
);

export const toggleAutocomplete = createAction(
  configSlice.actions.setAutocomplete.type,
  (currentValue: boolean) => {
    const on = !currentValue;
    localStorage.setItem(StorageKey.Autocomplete, on ? "true" : "");

    return {
      payload: on,
    };
  }
);
