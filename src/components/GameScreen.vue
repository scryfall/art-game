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

const skip = () => {
  dispatch(setGuess({ name: "", outcome: Outcome.Skip }));
  dispatch(fetchNextCard(query.value));
};

const submitGuess = (guess: string) => {
  if (!card.value) {
    console.debug("received guess, but there's no card.");
    return;
  }

  const outcome = isGuessOk(guess, card.value) ? Outcome.Correct : Outcome.Incorrect;
  console.debug("received guess:", guess, `(${outcome})`);
  dispatch(setGuess({ name: guess, outcome }));
  dispatch(fetchNextCard(query.value));
};
</script>

<template>
  <div class="screen" :data-answer="card?.name">
    <CardArt v-if="card" :card="card" />

    <p>
      Which card is this?
      <span class="skip">
        (<button type="button" class="skip link" @click.prevent="skip" @keypress.enter="skip">
          skip</button
        >)
      </span>
    </p>

    <GuessInput :disabled="nextCardStatus !== LoadingStatus.Success" @submit="submitGuess" />

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
</style>
