import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./game";

export const setupStore = () =>
  configureStore({
    reducer: {
      game: gameSlice.reducer,
    },
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
