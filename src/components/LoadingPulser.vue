<script setup lang="ts"></script>

<template>
  <div class="loader">
    <div class="pulse-0"></div>
    <div class="pulse-1"></div>
    <div class="pulse-2"></div>
  </div>
</template>

<style scoped lang="scss">
// Pulser adapted from https://css-loaders.com/pulsing/
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  background: currentColor;
  border-radius: 50%;

  width: 20px;
  height: 20px;
  overflow: visible;
  position: relative;
}
.pulse-0,
.pulse-1,
.pulse-2 {
  position: absolute;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: currentColor;
  opacity: 0.75;
  width: 0;
  height: 0;
  animation: l2 1.5s infinite linear;
}
.pulse-1 {
  animation-delay: -0.5s;
}
.pulse-2 {
  animation-delay: -1s;
}
@keyframes l2 {
  100% {
    opacity: 0;
    width: 80px;
    height: 80px;
  }
}
</style>
