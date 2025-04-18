<script setup lang="ts">
import { Outcome } from "../models/outcome";
import type { GameGuess } from "../store";
import type { ScryfallCard } from "../models/scryfall-card";
import { ref, watch } from "vue";

const props = defineProps<{ guess: GameGuess; card: ScryfallCard }>();

function getNormalizedUri(card: ScryfallCard) {
  const url = new URL(card.scryfall_uri);
  url.searchParams.set("utm_source", "artgame");
  return url.toString();
}

const cardUri = ref(getNormalizedUri(props.card));

watch(props, (p) => {
  cardUri.value = getNormalizedUri(p.card);
});
</script>

<template>
  <div class="guess-feedback">
    <a :href="cardUri" target="_blank" class="figure">
      <img class="card-image" :src="card.image_uris.normal" :data-set="card.set" />
    </a>

    <div class="outcome">
      <p>
        <span v-if="guess.outcome === Outcome.Correct">Correct!</span>
        <span v-else-if="guess.outcome === Outcome.Incorrect">Incorrect.</span>
        <span v-else-if="guess.outcome === Outcome.Skip">Skipped.</span>
        That was
        <span v-if="card.flavor_name">
          <!-- TODO(#65): Flavor name lookup will need to change with DFCs, which will not have a root-level flavor name. -->
          <a :href="cardUri" class="cardname" target="_blank">{{ card.flavor_name }}</a> (also known
          as
        </span>
        <a :href="cardUri" class="cardname" target="_blank">{{ card.name }}</a
        ><span v-if="card.flavor_name">)</span>.
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
  gap: 20px;
}

.figure {
  flex-shrink: 0.5;

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
