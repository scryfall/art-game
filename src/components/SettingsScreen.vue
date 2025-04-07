<script setup lang="ts"></script>

<template>
  <div class="screen">
    <section>
      <h2>Settings</h2>
    </section>

    <section class="credits">
      <h2>Credits</h2>
      <p>
        This game was made by <a href="https://github.com/scarletcs/" target="_blank">scarletcs</a>
        based on the MagicCards.info Art Game.
      </p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.screen {
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
}

h2 {
  font-size: 20px;
}

.credits {
  opacity: 0.6;
  font-size: 14px;
  max-width: 320px;
  p {
    text-align: left;
    margin: 0 auto;
  }
}
</style>
