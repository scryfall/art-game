<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";
import { LoadingStatus } from "../store";
import Pulser from "./Pulser.vue";

const props = defineProps<{ card: ScryfallCard; loadingNext: LoadingStatus }>();
const imageUri = computed(() => props.card.image_uris.art_crop);

const status = ref(LoadingStatus.Pending);

watch(imageUri, () => {
  status.value = LoadingStatus.Pending;
});

const onLoad = () => {
  status.value = LoadingStatus.Success;
};

const onError = () => {
  status.value = LoadingStatus.Failed;
};

const showLoadingOverlay = computed(() => {
  return props.loadingNext === LoadingStatus.Pending || status.value === LoadingStatus.Pending;
});

const showErrorOverlay = computed(() => {
  return props.loadingNext === LoadingStatus.Failed || status.value === LoadingStatus.Failed;
});
</script>

<template>
  <div class="art-frame">
    <div v-if="showErrorOverlay" class="overlay error">
      <div class="cross"></div>
    </div>
    <div v-else-if="showLoadingOverlay" class="overlay loading">
      <Pulser class="pulser" />
    </div>
    <img
      alt=""
      class="vh preload"
      :src="card.image_uris.art_crop"
      :onload="onLoad"
      :onerror="onError"
    />
    <img :src="imageUri" />
  </div>
</template>

<style scoped lang="scss">
$default-art-height: 456px;
$default-art-width: 626px;

.art-frame {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulser {
  opacity: 0.5;
}

.cross {
  --size: 80px;
  position: relative;
  font-size: var(--size);
  width: 1em;
  height: 1em;
  color: var(--c-salmon);

  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: "";
    background: currentColor;
    display: block;
    height: calc(1em * 1.25);
    width: 0.2em;
    border-radius: 0.1em;

    position: absolute;
  }

  &::before {
    transform: rotate(-45deg);
  }

  &::after {
    transform: rotate(45deg);
  }
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0 0 0 / 0.5);
}

img {
  outline: 2px solid var(--art-frame-border-color);
  border-radius: 4px;
  max-height: min(60vh, $default-art-height);
  max-width: min(100%, $default-art-width);
}
</style>
