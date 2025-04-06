<script setup lang="ts">
import { computed, ref } from "vue";
import { startGame, useGameLoadStatus } from "../store";
import { useAppDispatch } from "../store/hooks";
import { LoadingStatus } from "../store/common";

const dispatch = useAppDispatch();
const gameLoadStatus = useGameLoadStatus();

/**
 * Start the game with a given query.
 * @param query The format query to work with
 */
const start = (query: string) => {
  dispatch(startGame(query));
};

const commonCriteria = [
  "-t:basic",
  "-t:saga",
  "-t:stickers",
  "not:split",
  "not:transform",
  "not:fullart",
  "not:extra",
];

function flatten(text: string[]) {
  return text.join(" ");
}

/**
 * The supported formats in the art game.
 * This is the order they'll show up on the front page, too.
 */
const presets = [
  { id: "standard", label: "Standard", query: flatten(["f:standard", ...commonCriteria]) },
  { id: "pioneer", label: "Pioneer", query: flatten(["f:pioneer", ...commonCriteria]) },
  { id: "modern", label: "Modern", query: flatten(["f:modern", ...commonCriteria]) },
  { id: "vintage", label: "Vintage", query: flatten(["f:vintage", ...commonCriteria]) },
];

const customQuery = ref("");
const customQueryFull = computed(() => {
  return flatten([customQuery.value, ...commonCriteria]);
});

const locked = computed(() => {
  return gameLoadStatus.value !== LoadingStatus.Idle;
});
</script>

<template>
  <main class="screen">
    <p>Which format should we show cards from?</p>

    <div class="format-buttons" ref="formatButtons">
      <button
        v-for="(preset, index) in presets"
        :id="`${preset.id}-format-button`"
        :key="index"
        type="button"
        class="button--lg"
        @click="start(preset.query)"
        @keypress.enter="start(preset.query)"
        :disabled="locked"
      >
        {{ preset.label }}
      </button>
    </div>

    <p>
      or, use your own
      <a href="https://scryfall.com/docs/syntax" target="_blank">Scryfall query</a>:
    </p>

    <form @submit.prevent="start(customQueryFull)">
      <label class="vh" for="custom-query">Custom Scryfall Query</label>
      <input
        v-model="customQuery"
        id="custom-query"
        class="input--lg"
        type="text"
        placeholder="set:dom type:creaure"
        :disabled="locked"
      />
      <button type="submit" class="button--lg" value="Start" :disabled="locked">Start</button>
    </form>
  </main>
</template>

<style scoped lang="scss">
.screen {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>
