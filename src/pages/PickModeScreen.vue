<script setup lang="ts">
import { computed } from "vue";
import { LoadingStatus, useGameRefs } from "../store";

type Preset = {
  id: string;
  label: string;
  link: string;
};

const { status: gameLoadStatus } = useGameRefs();

/**
 * The supported formats in the art game.
 * This is the order they'll show up on the front page, too.
 */
const presets: Preset[] = [
  { id: "standard", label: "Standard", link: "/game/standard" },
  { id: "pioneer", label: "Pioneer", link: "/game/pioneer" },
  { id: "modern", label: "Modern", link: "/game/modern" },
  { id: "vintage", label: "Vintage", link: "/game/vintage" },
];

const disabled = computed(() => {
  return gameLoadStatus.value !== LoadingStatus.Idle;
});
</script>

<template>
  <div class="screen">
    <div class="subscreen">
      <p>Which format should we show cards from?</p>

      <div class="options">
        <RouterLink
          v-for="(preset, index) in presets"
          :id="`${preset.id}-format-button`"
          :key="index"
          type="button"
          class="btn btn-large"
          :disabled="disabled"
          :to="preset.link"
        >
          {{ preset.label }}
        </RouterLink>

        <div class="separator">or</div>

        <RouterLink to="/custom" class="btn btn-large" :disabled="disabled">Custom game</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

.screen,
.subscreen {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.btn {
  text-align: center;
  text-decoration: none;
}

.subscreen {
  min-width: 200px;
  max-width: min(400px, 90vw);
}

.options {
  display: flex;
  flex-flow: column;
  gap: 16px;
  min-width: 200px;
}

p {
  margin: 16px 0;
}

.separator {
  position: relative;
  text-align: center;
  font-size: 90%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-style: italic;

  &::before,
  &::after {
    content: "";
    border-top: 1px solid currentColor;
    flex: 1;
    opacity: 50%;
  }
}

.error {
  color: var(--c-salmon);
}
</style>
