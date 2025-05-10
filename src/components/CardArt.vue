<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";
import { LoadingStatus } from "../store";
import LoadingPulser from "./LoadingPulser.vue";

const props = defineProps<{ card: ScryfallCard; loadingNext: LoadingStatus }>();
const imageUri = computed(() => {
  if (props.card.image_uris) {
    return props.card.image_uris.art_crop;
  }
  const randomIndex = Math.floor(Math.random() * props.card.card_faces.length);
  const randomFace = props.card.card_faces[randomIndex];
  return randomFace.image_uris?.art_crop;
});

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
      <div>
        <div class="shape-x"></div>
        <p>There was an error loading the card art.</p>
      </div>
    </div>
    <div v-else-if="showLoadingOverlay" class="overlay loading">
      <LoadingPulser class="pulser" />
    </div>
    <div class="flavor-mask" v-if="card.flavor_name">Hint: this print has a flavor name.</div>
    <img
      alt=""
      class="vh preload"
      :src="imageUri"
      :onload="onLoad"
      :onerror="onError"
      data-testid="card-art-preload"
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

.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background: rgba(0 0 0 / 0.5);
}

.shape-x {
  color: var(--c-salmon);
  margin: auto;
}

img {
  outline: 2px solid var(--art-frame-border-color);
  border-radius: 4px;
  max-height: min(60vh, $default-art-height);
  max-width: min(100%, $default-art-width);
}

.flavor-mask {
  background: var(--page-background);
  border-radius: 0 0 4px 4px;
  font-size: 0.9em;
  text-align: center;
  width: 80%;
  height: 1.75rem;
  position: absolute;
  top: -2px;
  border-left: 2px solid var(--art-frame-border-color);
  border-right: 2px solid var(--art-frame-border-color);
  border-bottom: 2px solid var(--art-frame-border-color);
}
</style>
