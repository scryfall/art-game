<script setup lang="ts">
import { onMounted } from "vue";
import GameScreen from "../components/GameScreen.vue";
import { startGame } from "../store";
import { useAppDispatch } from "../store/hooks";
import { useRoute, useRouter } from "vue-router";
import { flattenSearchCriteria } from "../utils/string";
import { COMPATIBILITY_CRITERIA } from "../config";

type QueryParams = {
  q: string;
  include_extras?: "true" | "false";
};

const route = useRoute();
const router = useRouter();
const dispatch = useAppDispatch();

const start = (criteria: string, includeExtras?: boolean) => {
  const search = flattenSearchCriteria([criteria, ...COMPATIBILITY_CRITERIA]);

  dispatch(
    startGame({
      search,
      includeExtras,
    })
  );
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
