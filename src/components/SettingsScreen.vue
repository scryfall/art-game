<script setup lang="ts"></script>

<template>
  <div class="screen">
    <section>
      <h2>Settings</h2>

      <div class="settings-grid">
        <div>Allow autocomplete</div>
        <div>
          <button type="button" class="btn btn-small">On/off</button>
        </div>
        <!-- <div>Allow autocomplete</div>
        <div>
          <button type="button" class="btn btn-small">On/off</button>
        </div> -->
      </div>
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
  gap: 40px;
}

h2 {
  font-size: 20px;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  gap: 8px;
}

.settings-grid > * {
  display: flex;
  align-items: center;
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
