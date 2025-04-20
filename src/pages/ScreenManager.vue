<script setup lang="ts">
import PickModeScreen from "../components/PickModeScreen.vue";
import { LoadingStatus, useAppSelector } from "../store";
import GameScreen from "../components/GameScreen.vue";

const gameLoadStatus = useAppSelector((state) => state.game.status);
</script>

<template>
  <GameScreen v-if="gameLoadStatus === LoadingStatus.Success" />
  <PickModeScreen v-else />
</template>

<style scoped lang="scss"></style>
