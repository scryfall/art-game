<script setup lang="ts">
import { computed } from "vue";
import { useAppSelector } from "../store/hooks";
import { Outcome } from "../models/outcome";

const score = useAppSelector((state) => state.game.score);
const guess = useAppSelector((state) => state.game.guess);
const prevCard = useAppSelector((state) => state.game.previousCard);
const prevCardCrop = computed(() => prevCard.value?.image_uris.art_crop);
</script>

<template>
  <div class="feedback">
    <p class="score">Score: {{ score }}</p>

    <div class="retrospective" v-if="prevCard && prevCardCrop">
      <div class="figure">
        <div class="art-frame art-frame--small">
          <img class="art-frame__image" :src="prevCardCrop" />
        </div>
      </div>

      <div class="outcome" v-if="guess && prevCard">
        <p>
          <span v-if="guess.outcome === Outcome.Correct">Correct!</span>
          <span v-else-if="guess.outcome === Outcome.Incorrect">Incorrect.</span>
          <span v-else-if="guess.outcome === Outcome.Skip">Skipped.</span>
          That was
          <a :href="prevCard.scryfall_uri" class="feedback-cardname" target="_blank">{{
            prevCard.name
          }}</a
          >.
        </p>
        <p v-if="guess.outcome === Outcome.Incorrect">You guessed: {{ guess.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.retrospective {
  display: inline-flex;
  align-items: center;
  margin: 0 auto;

  .figure {
    flex-shrink: 0.5;
    height: 120px;
    margin-right: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .outcome {
    text-align: left;
  }

  p:first-child {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
}
</style>
