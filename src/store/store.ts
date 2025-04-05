import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./game";
import { configSlice } from "./config";

export const setupStore = () =>
  configureStore({
    reducer: {
      game: gameSlice.reducer,
      config: configSlice.reducer,
    },
  });

export const store = setupStore();
