<script setup lang="ts">
import { Outcome } from "../models/outcome";
import { fetchNextCard, LoadingStatus, setGuess, useAppDispatch, useAppSelector } from "../store";
import CardArt from "./CardArt.vue";
import GuessInput from "./GuessInput.vue";
import { isGuessOk } from "../utils/guess";
import GuessFeedback from "./GuessFeedback.vue";

const dispatch = useAppDispatch();
const nextCardStatus = useAppSelector((state) => state.game.nextCardStatus);
const card = useAppSelector((state) => state.game.card);
const score = useAppSelector((state) => state.game.score);
const prevCard = useAppSelector((state) => state.game.previousCard);
const prevGuess = useAppSelector((state) => state.game.guess);
const query = useAppSelector((state) => state.game.query);

const loadNextCard = () => {
  dispatch(fetchNextCard({ query: query.value, excludeOracleId: card.value?.oracle_id }));
};

const skip = () => {
  dispatch(setGuess({ name: "", outcome: Outcome.Skip }));
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
  dispatch(setGuess({ name: guess, outcome }));
  loadNextCard();
};
</script>

<template>
  <div class="screen" :data-answer="card?.name">
    <CardArt v-if="card" :card="card" :loadingNext="nextCardStatus" />

    <p class="error-loading" v-if="nextCardStatus === LoadingStatus.Failed">
      There was an error loading the next card. Check your internet connection and
      <button type="button" class="retry link" @click.prevent="retry" @keypress.enter="retry">
        retry</button
      >.
    </p>

    <p>
      Which card is this?
      <span class="skip">
        (<button type="button" class="skip link" @click.prevent="skip" @keypress.enter="skip">
          skip</button
        >)
      </span>
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

.error-loading {
  text-align: center;
  color: var(--error-loading-color);
}
</style>
