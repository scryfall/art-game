<script setup lang="ts">
import PickModeScreen from "./PickModeScreen.vue";
import GettingReadyScreen from "./GettingReadyScreen.vue";
import { LoadingStatus, useAppSelector } from "../store";
import GameScreen from "./GameScreen.vue";

const gameLoadStatus = useAppSelector((state) => state.game.status);
</script>

<template>
  <PickModeScreen v-if="gameLoadStatus === LoadingStatus.Idle" />
  <GettingReadyScreen v-else-if="gameLoadStatus === LoadingStatus.Pending" />
  <GameScreen v-else-if="gameLoadStatus === LoadingStatus.Success" />
</template>

<style scoped lang="scss"></style>
