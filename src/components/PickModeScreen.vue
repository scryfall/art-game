<script setup lang="ts">
import { computed, ref } from "vue";
import { startGame } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingStatus } from "../store/common";

const dispatch = useAppDispatch();
const gameLoadStatus = useAppSelector((state) => state.game.status);

/**
 * Start the game with a given query.
 * @param query The format query to work with
 */
const start = (query: string) => {
  dispatch(startGame(query));
};

const commonCriteria = [
  "-t:basic",
  "-t:stickers",
  "-t:saga",
  "-t:class",
  "-t:case",
  "not:reversible",
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

const disabled = computed(() => {
  return gameLoadStatus.value !== LoadingStatus.Idle;
});
</script>

<template>
  <div class="screen">
    <p>Which format should we show cards from?</p>

    <div class="formats">
      <button
        v-for="(preset, index) in presets"
        :id="`${preset.id}-format-button`"
        :key="index"
        type="button"
        class="btn btn-large"
        @click="start(preset.query)"
        @keypress.enter="start(preset.query)"
        :disabled="disabled"
      >
        {{ preset.label }}
      </button>
    </div>

    <p>
      or, use your own
      <a href="https://scryfall.com/docs/syntax" target="_blank">Scryfall query</a>:
    </p>

    <form class="custom" @submit.prevent="start(customQueryFull)">
      <label class="vh" for="custom-query">Custom Scryfall Query</label>
      <input
        v-model="customQuery"
        id="custom-query"
        class="input-large"
        type="text"
        placeholder="set:dom type:creaure"
        :disabled="disabled"
      />
      <button
        type="submit"
        class="btn btn-large"
        value="Start"
        :disabled="disabled || customQuery.length === 0"
      >
        Start
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

.screen {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.formats {
  display: flex;
  flex-flow: column;
  gap: 16px;
  min-width: 200px;
  max-width: 90vw;
}

p {
  margin: 16px 0;
}

.custom {
  display: flex;
  gap: 10px;
}
</style>
