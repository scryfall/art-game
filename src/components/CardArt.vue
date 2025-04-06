<script setup lang="ts">
import { computed } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";

const props = defineProps<{ card: ScryfallCard }>();
const imageUri = computed(() => props.card.image_uris.art_crop);
</script>

<template>
  <div class="art-frame">
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
  border: 1px solid var(--art-frame-border-color);
  border-radius: 4px;
  max-height: 60vh;
  max-width: min(100%, $default-art-width);
}
</style>
