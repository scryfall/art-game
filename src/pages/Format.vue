<script setup lang="ts">
import { onMounted } from "vue";
import GameScreen from "../components/GameScreen.vue";
import { LoadingStatus, startGame } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRoute } from "vue-router";
import { flattenSearchCriteria } from "../utils/string";
import { AVOID_CRITERIA, COMPATIBILITY_CRITERIA } from "../config";

const gameLoadStatus = useAppSelector((state) => state.game.status);

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
  const format = route.path.split("/").pop();
  const criteria = [`f:${format}`, ...formatCriteria];
  start(criteria);
});
</script>

<template>
  <GameScreen />
</template>
