<script setup lang="ts">
import { onMounted } from "vue";
import GameScreen from "../components/GameScreen.vue";
import { useRoute } from "vue-router";
import { flattenSearchCriteria, trimTrailingSlash } from "../utils/string";
import { AVOID_CRITERIA, COMPATIBILITY_CRITERIA } from "../config";
import { useGameStore } from "../store/game";

const { startGame } = useGameStore();
const route = useRoute();
const formatCriteria = ["-t:stickers", "not:extra", ...COMPATIBILITY_CRITERIA, ...AVOID_CRITERIA];

const start = (criteria: string[]) => {
  const search = flattenSearchCriteria(criteria);
  startGame({
    search,
    includeExtras: false,
  });
};

onMounted(() => {
  const path = trimTrailingSlash(route.path);
  const format = path.split("/").pop();
  const criteria = [`f:${format}`, ...formatCriteria];
  start(criteria);
});
</script>

<template>
  <GameScreen />
</template>
