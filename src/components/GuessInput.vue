<script setup lang="ts">
import { ref } from "vue";
import { setGuess, useAppDispatch } from "../store";
import type { ScryfallCard } from "../models/scryfall-card";
import { isGuessOk } from "../utils/guess";
import { Outcome } from "../models/outcome";

const props = defineProps<{ disabled: boolean; card: ScryfallCard }>();
const dispatch = useAppDispatch();

const guess = ref("");

const submitGuess = () => {
  const outcome = isGuessOk(guess.value, props.card) ? Outcome.Correct : Outcome.Incorrect;
  dispatch(setGuess({ name: guess.value, outcome }));
};
</script>

<template>
  <form @submit.prevent="submitGuess">
    <input
      type="text"
      ref="guessInput"
      class="guess"
      v-model="guess"
      :disabled="disabled || !card"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <button type="submit" class="vh" tabindex="-1">Check</button>
  </form>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

.guess {
  border: 1px solid;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  font-size: 18px;
  margin: 0 auto;
  padding: 10px;
  width: 400px;
  max-width: 100%;

  @include mixins.bp-large {
    font-size: 24px;
  }

  &:disabled,
  &:not(:focus) {
    opacity: 0.6;
  }
}
</style>
