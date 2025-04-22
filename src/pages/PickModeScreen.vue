<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppSelector } from "../store/hooks";
import { LoadingStatus } from "../store/common";
import CustomGameSetup from "../components/CustomGameSetup.vue";

type Preset = {
  id: string;
  label: string;
  link: string;
};

const gameLoadStatus = useAppSelector((state) => state.game.status);
const custom = ref(false);

/**
 * The supported formats in the art game.
 * This is the order they'll show up on the front page, too.
 */
const presets: Preset[] = [
  { id: "standard", label: "Standard", link: "/format/standard" },
  { id: "pioneer", label: "Pioneer", link: "/format/pioneer" },
  { id: "modern", label: "Modern", link: "/format/modern" },
  { id: "vintage", label: "Vintage", link: "/format/vintage" },
];

const disabled = computed(() => {
  return gameLoadStatus.value !== LoadingStatus.Idle;
});
</script>

<template>
  <div class="screen">
    <div class="subscreen" v-if="!custom">
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

        <button
          type="button"
          class="btn btn-large"
          @click="() => (custom = true)"
          :disabled="disabled"
        >
          Custom game
        </button>
      </div>
    </div>

    <div v-if="!custom && gameLoadStatus === LoadingStatus.Pending" class="getting-ready">
      <p>Getting your game ready...</p>
    </div>

    <!-- TODO(#101): This won't work until we can get routing in. -->
    <div v-else-if="!custom && gameLoadStatus === LoadingStatus.Failed" class="getting-ready error">
      <p>Couldn't start your game. Scryfall might be down for maintenance.</p>
    </div>

    <CustomGameSetup
      v-if="custom"
      class="subscreen"
      :disabled="disabled"
      @cancel="() => (custom = false)"
    />
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
