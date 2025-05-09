<script setup lang="ts">
import { Outcome } from "../models/outcome";
import { LoadingStatus } from "../store";
import CardArt from "./CardArt.vue";
import GuessInput from "./GuessInput.vue";
import { isGuessOk } from "../utils/guess";
import GuessFeedback from "./GuessFeedback.vue";
import LoadingHammer from "./LoadingHammer.vue";
import { useGameRefs, useGameStore } from "../store/game";

const {
  nextCardStatus,
  card,
  score,
  previousCard: prevCard,
  guess: prevGuess,
  query,
  status: gameLoadStatus,
} = useGameRefs();
const { fetchNextCard, setGuess } = useGameStore();

const loadNextCard = () => {
  if (!query.value) {
    throw Error("Somehow, no game query is loaded.");
  }

  fetchNextCard(card.value?.oracle_id);
};

const skip = () => {
  setGuess({ name: "", outcome: Outcome.Skip });
  loadNextCard();
};

const retry = () => {
  loadNextCard();
};

const submitGuess = (guess: string) => {
  if (!card.value) {
    console.debug("Guess was submitted somehow, but no card is loaded.");
    return;
  }

  const outcome = isGuessOk(guess, card.value) ? Outcome.Correct : Outcome.Incorrect;
  setGuess({ name: guess, outcome });
  loadNextCard();
};
</script>

<template>
  <p v-if="gameLoadStatus === LoadingStatus.Pending" class="loading">
    <LoadingHammer />
    <span> Getting your game ready... </span>
  </p>
  <div class="screen" :data-answer="card?.name" v-else>
    <CardArt v-if="card" :card="card" :loading-next="nextCardStatus" />

    <p class="error-loading" v-if="nextCardStatus === LoadingStatus.Failed">
      There was an error loading the next card. Check your internet connection and
      <button type="button" class="retry link" @click.prevent="retry" @keypress.enter="retry">
        retry</button
      >.
    </p>

    <p>
      Which card is this? (<button
        type="button"
        class="skip link"
        :disabled="nextCardStatus === LoadingStatus.Pending"
        @click.prevent="skip"
        @keypress.enter="skip"
      >
        skip</button
      >)
    </p>

    <GuessInput
      :disabled="nextCardStatus !== LoadingStatus.Success || !card"
      @submit="submitGuess"
    />

    <p class="score">Score: {{ score }}</p>

    <GuessFeedback v-if="prevGuess && prevCard" :guess="prevGuess" :card="prevCard" />
  </div>
</template>

<style scoped lang="scss">
.screen {
  padding: 16px;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-style: italic;
}

.error-loading {
  text-align: center;
  color: var(--error-loading-color);
}
</style>
