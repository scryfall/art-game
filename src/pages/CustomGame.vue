<script setup lang="ts">
import GameScreen from "../components/GameScreen.vue";
import { LoadingStatus } from "../store";
import { useAppSelector } from "../store/hooks";
import CustomGameSetup from "../components/CustomGameSetup.vue";

const gameLoadStatus = useAppSelector((state) => state.game.status);
</script>

<template>
  <GameScreen v-if="gameLoadStatus === LoadingStatus.Success" />
  <CustomGameSetup v-else />
</template>
