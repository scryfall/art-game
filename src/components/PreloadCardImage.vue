<script setup lang="ts">
import type { ScryfallCard } from "../models/scryfall-card";

const props = defineProps<{ card: ScryfallCard }>();
const emit = defineEmits(["loaded"]);

const loaded = () => {
  emit("loaded", { card: props.card });
};
</script>

<template>
  <img alt="" class="vh" :src="card.image_uris.art_crop" :onload="loaded" />
</template>

<style scoped lang="scss"></style>
