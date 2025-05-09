<script setup lang="ts">
import { onMounted } from "vue";
import GameScreen from "../components/GameScreen.vue";
import { useRoute, useRouter } from "vue-router";
import { flattenSearchCriteria } from "../utils/string";
import { COMPATIBILITY_CRITERIA } from "../config";
import { useGameStore } from "../store/game";

type QueryParams = {
  q: string;
  include_extras?: "true" | "false";
};

const { startGame } = useGameStore();
const route = useRoute();
const router = useRouter();

const start = (criteria: string, includeExtras?: boolean) => {
  const search = flattenSearchCriteria([criteria, ...COMPATIBILITY_CRITERIA]);

  startGame({
    search,
    includeExtras,
  });
};

onMounted(() => {
  const query = route.query as QueryParams;
  if (query.q) {
    start(query.q, query.include_extras === "true");
  } else {
    router.replace({
      path: "/custom",
    });
  }
});
</script>

<template>
  <GameScreen />
</template>
