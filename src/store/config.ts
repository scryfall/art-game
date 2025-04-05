import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../models/theme";
import { StorageKey } from "../models/storage-key";

export const configSlice = createSlice({
  name: "config",
  initialState: {
    theme: Theme.Dark,
  },
  reducers: {
    loadConfig(state, action: PayloadAction<{ theme: Theme }>) {
      state.theme = action.payload.theme;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = configSlice.actions;

export const loadConfig = createAction(configSlice.actions.loadConfig.type, function prepare() {
  const theme = localStorage.getItem(StorageKey.Theme) ?? Theme.Dark;

  return {
    payload: {
      theme,
    },
  };
});
