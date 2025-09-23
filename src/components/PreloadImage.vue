<script setup lang="ts">
type Props = {
  /** The image URI to preload. */
  uri: string | undefined;
};

defineProps<Props>();
const emit = defineEmits(["load", "error"]);

const onLoad = () => {
  emit("load");
};

const onError = () => {
  emit("error");
};
</script>

<template>
  <img alt="" class="vh preload" :src="uri" :onload="onLoad" :onerror="onError" />
</template>
