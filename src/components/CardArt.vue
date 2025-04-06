<script setup lang="ts">
import { computed } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";

const props = defineProps<{ card: ScryfallCard }>();
const imageUri = computed(() => props.card.image_uris.art_crop);
</script>

<template>
  <div class="art-frame">
    <!-- <div class="art-frame__placeholder" v-if="imageUri"></div> -->
    <img :src="imageUri" />
  </div>
</template>

<style scoped lang="scss">
$default-art-height: 456px;
$default-art-width: 626px;

.art-frame {
  border: 1px solid var(--art-frame-border-color);
  box-sizing: border-box;
  display: inline-block;
  font-size: 0;
  max-height: 60vh;
}

.art-frame--small {
  max-width: 150px;
  max-height: 100%;
}

// .art-placeholder {
//   height: $default-art-height;
//   width: $default-art-width;
// }

.art-frame__placeholder,
.art-frame__image {
  max-width: 100%;
  max-height: 100%;
}
</style>
