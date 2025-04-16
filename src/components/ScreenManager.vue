<script setup lang="ts">
import PickModeScreen from "./PickModeScreen.vue";
import GettingReadyScreen from "./GettingReadyScreen.vue";
import { LoadingStatus, useAppSelector } from "../store";
import GameScreen from "./GameScreen.vue";
import SettingsScreen from "../pages/SettingsScreen.vue";

const isViewingSettings = useAppSelector((state) => state.config.viewConfigScreen);
const gameLoadStatus = useAppSelector((state) => state.game.status);
</script>

<template>
  <SettingsScreen v-if="isViewingSettings" />
  <PickModeScreen v-else-if="gameLoadStatus === LoadingStatus.Idle" />
  <GettingReadyScreen v-else-if="gameLoadStatus === LoadingStatus.Pending" />
  <GameScreen v-else-if="gameLoadStatus === LoadingStatus.Success" />
</template>

<style scoped lang="scss"></style>
