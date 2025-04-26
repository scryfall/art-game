<script setup lang="ts">
import { onMounted } from "vue";
import GameScreen from "../components/GameScreen.vue";
import { startGame } from "../store";
import { useAppDispatch } from "../store/hooks";
import { useRoute } from "vue-router";
import { flattenSearchCriteria } from "../utils/string";
import { AVOID_CRITERIA, COMPATIBILITY_CRITERIA } from "../config";

const route = useRoute();
const dispatch = useAppDispatch();
const formatCriteria = ["-t:stickers", "not:extra", ...COMPATIBILITY_CRITERIA, ...AVOID_CRITERIA];

const start = (criteria: string[]) => {
  const search = flattenSearchCriteria(criteria);
  dispatch(
    startGame({
      search,
      includeExtras: false,
    })
  );
};

onMounted(() => {
  // TODO patch trailing slash
  const format = route.path.split("/").pop();
  const criteria = [`f:${format}`, ...formatCriteria];
  start(criteria);
});
</script>

<template>
  <GameScreen />
</template>
