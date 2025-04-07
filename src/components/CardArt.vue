<script setup lang="ts">
import { computed } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";

const props = defineProps<{ card: ScryfallCard }>();
const imageUri = computed(() => props.card.image_uris.art_crop);

const vertical = computed(() => {
  const verticalTypes = ["saga", "class", "case"];
  const cardTypes = props.card.type_line.split(" ");
  return verticalTypes.some((type) => cardTypes.includes(type))
});
</script>

<template>
  <div class="art-frame" :data-vertical="vertical">
    <!-- TODO(#35) Use this preloader to determine that the image is still loading. -->
    <!-- <img alt="" class="vh preload" :src="card.image_uris.art_crop" /> -->
    <img :src="imageUri" />
  </div>
</template>

<style scoped lang="scss">
$default-art-height: 456px;
$default-art-width: 626px;

.art-frame {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  outline: 2px solid var(--art-frame-border-color);
  border-radius: 4px;
  max-height: min(60vh, $default-art-height);
  max-width: min(100%, $default-art-width);
}
</style>
