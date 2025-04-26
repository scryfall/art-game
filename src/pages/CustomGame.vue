<script setup lang="ts">
import { onMounted } from "vue";
import GameScreen from "../components/GameScreen.vue";
import { startGame } from "../store";
import { useAppDispatch } from "../store/hooks";
import { useRoute, useRouter } from "vue-router";

type QueryParams = {
  q: string;
  include_extras?: "true";
};

const route = useRoute();
const router = useRouter();
const dispatch = useAppDispatch();

const start = (search: string, includeExtras?: boolean) => {
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
    start(query.q, Boolean(query.include_extras));
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
