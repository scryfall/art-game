<script setup lang="ts">
// TODO - maybe randomize from various options?
const imgSrc = "/lost.jpg";
</script>

<template>
  <section>
    <h1>404 Not Found</h1>
    <img :src="imgSrc" alt="" />
  </section>
</template>

<style scoped lang="scss">
section {
  text-align: center;
}
</style>
