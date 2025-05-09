import { defineStore, storeToRefs } from "pinia";
import { LoadingStatus } from "./common";
import { ref } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";
import { Outcome } from "../models/outcome";
import { ScryfallApiInstance } from "../utils/scryfall-api";

export type GameGuess = { name: string; outcome: Outcome };

export type GameQuery = {
  /** The search string used for this game. */
  search: string;
  /** Whether extras are allowed. Defaults to false. */
  includeExtras?: boolean;
};

function constructSearch(query: GameQuery, previousOracleId?: string) {
  if (previousOracleId) {
    return `${query.search} -oracle_id:${previousOracleId}`;
  }
  return query.search;
}

export const useGameStore = defineStore("game", () => {
  const status = ref<LoadingStatus>(LoadingStatus.Idle);
  const nextCardStatus = ref<LoadingStatus>(LoadingStatus.Idle);
  const query = ref<GameQuery>({ search: "" });
  const score = ref(0);
  const guess = ref<undefined | GameGuess>();
  const card = ref<undefined | ScryfallCard>();
  const previousCard = ref<undefined | ScryfallCard>();

  async function fetchNextCard(previousOracleId?: string) {
    if (!query.value.search) {
      return;
    }
    nextCardStatus.value = LoadingStatus.Pending;
    previousCard.value = card.value;

    const search = constructSearch(query.value, previousOracleId);

    try {
      const newCard = await ScryfallApiInstance.getRandomCard(search, {
        includeExtras: query.value.includeExtras,
      });
      card.value = await ScryfallApiInstance.getRandomArt(newCard.oracle_id, search);
      nextCardStatus.value = LoadingStatus.Success;
    } catch (err) {
      nextCardStatus.value = LoadingStatus.Failed;
      throw err;
    }

    return card.value;
  }

  async function startGame(startGameQuery: GameQuery) {
    query.value = startGameQuery;
    status.value = LoadingStatus.Pending;
    score.value = 0;
    guess.value = undefined;
    previousCard.value = undefined;
    card.value = undefined;

    try {
      await fetchNextCard();
      status.value = LoadingStatus.Success;
    } catch {
      status.value = LoadingStatus.Failed;
    }
  }

  function setGuess(usersGuess: GameGuess) {
    guess.value = usersGuess;
    if (usersGuess.outcome === Outcome.Correct) {
      score.value++;
    }
  }

  return {
    status,
    nextCardStatus,
    query,
    score,
    guess,
    card,
    previousCard,
    // methods

    fetchNextCard,
    startGame,
    setGuess,
  };
});

export function useGameRefs() {
  const game = useGameStore();
  return storeToRefs(game);
}
