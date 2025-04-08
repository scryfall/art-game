<script setup lang="ts"></script>

<template>
  <div class="screen">
    <section>
      <h2>Settings</h2>
    </section>

    <section class="credits">
      <h2>Credits</h2>
      <p>
        Made by
        <a href="https://github.com/scarletcs/" target="_blank">scarletcs</a>, with contributions
        from <a href="https://github.com/crookedneighbor" target="_blank">crookedneighbor</a>.
      </p>
      <p>This game is based on the MagicCards.info Art Game.</p>
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
  max-width: 400px;
  p {
    text-align: left;
  }
}
</style>
