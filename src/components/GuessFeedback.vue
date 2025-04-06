<script setup lang="ts">
import { Outcome } from "../models/outcome";
import type { GameGuess } from "../store";
import type { ScryfallCard } from "../models/scryfall-card";

defineProps<{ guess: GameGuess; card: ScryfallCard }>();
</script>

<template>
  <div class="guess-feedback">
    <div class="figure">
      <img class="card-image" :src="card.image_uris.normal" :data-set="card.set" />
    </div>

    <div class="outcome">
      <p>
        <span v-if="guess.outcome === Outcome.Correct">Correct!</span>
        <span v-else-if="guess.outcome === Outcome.Incorrect">Incorrect.</span>
        <span v-else-if="guess.outcome === Outcome.Skip">Skipped.</span>
        That was
        <a :href="card.scryfall_uri" class="cardname" target="_blank">{{ card.name }}</a
        >.
      </p>
      <p v-if="guess.outcome === Outcome.Incorrect">You guessed: {{ guess.name }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guess-feedback {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.figure {
  flex-shrink: 0.5;
  margin-right: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 120px;
}

.outcome {
  text-align: left;
}
</style>
