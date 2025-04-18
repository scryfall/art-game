import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ScryfallCard } from "../models/scryfall-card";
import { Outcome } from "../models/outcome";
import { LoadingStatus } from "./common";
import { ScryfallApiInstance } from "../utils/scryfall-api";

export type GameGuess = { name: string; outcome: Outcome };

type GameSliceState = {
  status: LoadingStatus;
  nextCardStatus: LoadingStatus;
  query: string;
  score: number;
  guess: undefined | GameGuess;
  card: undefined | ScryfallCard;
  previousCard: undefined | ScryfallCard;
};

const initialState: GameSliceState = {
  status: LoadingStatus.Idle,
  nextCardStatus: LoadingStatus.Idle,
  query: "",
  score: 0,
  guess: undefined,
  card: undefined,
  previousCard: undefined,
};

export const startGame = createAsyncThunk("game/startGame", async (query: string, api) => {
  await api.dispatch(fetchNextCard({ query }));
});

export const fetchNextCard = createAsyncThunk(
  "game/fetchNextCard",
  async (payload: { query: string; excludeOracleId?: string }) => {
    const { query, excludeOracleId } = payload;

    const cardQuery = excludeOracleId ? `${query} -oracle_id:${excludeOracleId}` : query;
    const card = await ScryfallApiInstance.getRandomCard(cardQuery);
    const print = await ScryfallApiInstance.getRandomArt(card.oracle_id, query);
    return print;
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGuess(state, action: PayloadAction<{ name: string; outcome: Outcome }>) {
      const guess = action.payload;
      state.guess = guess;
      if (guess.outcome === Outcome.Correct) {
        state.score++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startGame.pending, (state, action) => {
      state.status = LoadingStatus.Pending;
      state.query = action.meta.arg;
    });

    builder.addCase(startGame.fulfilled, (state) => {
      state.status = LoadingStatus.Success;
    });

    builder.addCase(startGame.rejected, (state) => {
      state.status = LoadingStatus.Failed;
    });

    builder.addCase(fetchNextCard.pending, (state) => {
      state.nextCardStatus = LoadingStatus.Pending;
      state.previousCard = state.card;
    });

    builder.addCase(fetchNextCard.fulfilled, (state, action) => {
      state.nextCardStatus = LoadingStatus.Success;
      state.card = action.payload;
    });

    builder.addCase(fetchNextCard.rejected, (state) => {
      state.nextCardStatus = LoadingStatus.Failed;
    });
  },
});

export const { setGuess } = gameSlice.actions;
