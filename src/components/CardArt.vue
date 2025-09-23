<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";
import { LoadingStatus } from "../store";
import LoadingPulser from "./LoadingPulser.vue";
import PreloadImage from "./PreloadImage.vue";
import { getCardImages } from "../utils/card-image";
import { pickRandomItem } from "../utils/math";

type Props = {
  /** The card to show art for. */
  card: ScryfallCard;
  /** Whether the next card is currently being loaded in. This activates a loading overlay. */
  loading: LoadingStatus;
};

const props = defineProps<Props>();
const imageUri = computed(() => {
  const imageUris = getCardImages(props.card);

  if (imageUris.length === 0) {
    return undefined;
  }

  if (imageUris.length === 1) {
    return imageUris[0].art_crop;
  }

  const randomImageUri = pickRandomItem(imageUris);
  return randomImageUri.art_crop;
});

const status = ref(LoadingStatus.Pending);

watch(imageUri, () => {
  status.value = LoadingStatus.Pending;
});

const onLoad = () => {
  console.debug("PreloadImage: Image error");
  status.value = LoadingStatus.Success;
};

const onError = () => {
  console.debug("PreloadImage: Image error");
  status.value = LoadingStatus.Failed;
};

const showLoadingOverlay = computed(() => {
  return props.loading === LoadingStatus.Pending || status.value === LoadingStatus.Pending;
});

const showErrorOverlay = computed(() => {
  return props.loading === LoadingStatus.Failed || status.value === LoadingStatus.Failed;
});
</script>

<template>
  <div class="art-frame">
    <div v-if="showErrorOverlay" class="overlay error">
      <div class="shape-x"></div>
    </div>
    <div v-else-if="showLoadingOverlay" class="overlay loading">
      <LoadingPulser class="pulser" />
    </div>
    <div class="flavor-mask" v-if="card.flavor_name">Hint: this print has a flavor name.</div>
    <PreloadImage :uri="imageUri" :load="onLoad" :error="onError" />
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

  background: rgba(0 0 0 / 0.5);
}

.shape-x {
  color: var(--c-salmon);
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
