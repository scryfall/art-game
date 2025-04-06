<script setup lang="ts"></script>

<template>
  <div class="loader"></div>
</template>

<style scoped lang="scss">
// Pulser courtesy of https://css-loaders.com/pulsing/
.loader {
  --mid-color: color-mix(in srgb, currentColor 75%, transparent);
  --faded-color: color-mix(in srgb, currentColor 0%, transparent);

  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 0 var(--mid-color);
  animation: l2 1.5s infinite linear;
  position: relative;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 0 var(--mid-color);
  animation: inherit;
  animation-delay: -0.5s;
}
.loader:after {
  animation-delay: -1s;
}
@keyframes l2 {
  100% {
    box-shadow: 0 0 0 40px var(--faded-color);
  }
}
</style>
