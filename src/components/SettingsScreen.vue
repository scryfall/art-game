<script setup lang="ts"></script>

<template>
  <div class="screen">
    <section>
      <h2>Settings</h2>

      <div class="settings-grid">
        <!-- Elements in this grid automatically alternate between left and right column. -->
        <div>Allow autocomplete</div>
        <div>
          <button type="button" class="btn btn-small">On/off</button>
        </div>
        <div class="description">
          If enabled, you'll see autocomplete suggestions for card names. They won't necessarily be
          limited to cards in your chosen format.
        </div>
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
  gap: 40px;
}

h2 {
  font-size: 20px;
  text-align: center;
}

.settings-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: auto;
  gap: 8px;
  min-width: 400px;

  > * {
    display: flex;
    align-items: center;
  }

  .description {
    grid-column: 1 / span 2;
    font-style: italic;
    opacity: 0.8;
    font-size: 80%;
    text-align: left;
    width: min-content;
    min-width: 100%;
  }
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
