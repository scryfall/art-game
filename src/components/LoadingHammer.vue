<script setup lang="ts">
import UrzasLegacy from "./Svg/UrzasLegacy.vue";
</script>

<template>
  <UrzasLegacy class="hammer" />
</template>

<style scoped lang="scss">
.hammer {
  transform-origin: 95% 70%;
  animation: hammer 0.5s alternate ease-in infinite;
}

@keyframes hammer {
  0% {
    transform: scale(2) rotate(15deg);
  }

  100% {
    transform: scale(2) rotate(-10deg);
  }
}
</style>
