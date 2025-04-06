import {
  createAsyncThunk,
  createSlice,
  isAsyncThunkAction,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ScryfallCard } from "../models/scryfall-card";
import { Outcome } from "../models/outcome";
import { LoadingStatus } from "./common";
import { ScryfallApi } from "../utils/scryfall-api";

const scryfallApi = new ScryfallApi();

type GameSliceState = {
  status: LoadingStatus;
  nextCardStatus: LoadingStatus;
  query: string;
  score: number;
  guess:
    | undefined
    | {
        name: string;
        outcome: Outcome;
      };
  card: undefined | ScryfallCard;
};

const initialState: GameSliceState = {
  status: LoadingStatus.Idle,
  nextCardStatus: LoadingStatus.Idle,
  query: "",
  score: 0,
  card: undefined,
  guess: undefined,
};

export const startGame = createAsyncThunk("game/startGame", async (query: string) => {
  const card = await scryfallApi.getRandomCard(query);
  return card;
});

const fetchNextCard = createAsyncThunk("game/fetchNextCard", async (query: string) => {
  const card = await scryfallApi.getRandomCard(query);
  return card;
});

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

    builder.addCase(startGame.fulfilled, (state, action) => {
      state.status = LoadingStatus.Success;
      state.card = action.payload;
    });

    builder.addCase(startGame.rejected, (state) => {
      state.status = LoadingStatus.Failed;
    });

    builder.addCase(fetchNextCard.pending, (state) => {
      state.nextCardStatus = LoadingStatus.Pending;
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
