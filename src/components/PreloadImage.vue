<script setup lang="ts">
type Props = {
  /** The image URI to preload. */
  uri: string | undefined;
};

type Emits = {
  /** The image has loaded. */
  load: [];
  /** The image failed to load. */
  error: [];
};

defineProps<Props>();
const emit = defineEmits<Emits>();

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
