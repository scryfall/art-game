import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ScryfallCard } from "../models/scryfall-card";
import { Outcome } from "../models/outcome";

type GameSliceState = {
  query: string;
  score: number;
  guess:
    | undefined
    | {
        name: string;
        outcome: Outcome;
      };
  loadingNextCard: boolean;
  card: undefined | ScryfallCard;
};

const initialState: GameSliceState = {
  query: "",
  score: 0,
  guess: undefined,
  loadingNextCard: false,
  card: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setCard(state, action: PayloadAction<ScryfallCard>) {
      state.card = action.payload;
    },
    setGuess(state, action: PayloadAction<{ name: string; outcome: Outcome }>) {
      state.guess = action.payload;
    },
  },
});

export const { setQuery, setCard, setGuess } = gameSlice.actions;
