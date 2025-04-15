<script setup lang="ts">
import PickModeScreen from "./PickModeScreen.vue";
import { LoadingStatus, useAppSelector } from "../store";
import GameScreen from "./GameScreen.vue";
import SettingsScreen from "./SettingsScreen.vue";

const isViewingSettings = useAppSelector((state) => state.config.viewConfigScreen);
const gameLoadStatus = useAppSelector((state) => state.game.status);
</script>

<template>
  <SettingsScreen v-if="isViewingSettings" />
  <GameScreen v-else-if="gameLoadStatus === LoadingStatus.Success" />
  <PickModeScreen v-else />
</template>

<style scoped lang="scss"></style>
