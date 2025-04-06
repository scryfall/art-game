<script setup lang="ts">
import ScreenManager from "./components/ScreenManager.vue";
import ThemeButton from "./components/ThemeButton.vue";
import { useAppSelector } from "./store/hooks";

const theme = useAppSelector((state) => state.config.theme);
</script>

<template>
  <div class="app" :data-theme="theme">
    <header>
      <a href="/">
        <h1>
          <img class="logo" src="./assets/scryfall.svg" alt="Scryfall" />
          <span>Art Game</span>
        </h1>
      </a>
    </header>

    <main>
      <ScreenManager />
    </main>

    <footer>
      <div class="controls">
        <ThemeButton />
      </div>
      <div class="credit">
        by
        <a href="https://github.com/scarletcs/" target="_blank">scarletcs</a>
        based on the MagicCards.info Art Game
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use "./styles/mixins";

.app {
  background-color: var(--page-background);
  color: var(--text-color);
  font-family: var(--font-sans-serif);
  font-size: var(--font-size);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  height: 100%;

  @include mixins.bp-small {
    justify-content: flex-start;
    .footer {
      justify-self: flex-end;
    }
  }
}

header {
  padding: 10px 0;
  padding-bottom: 40px;

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    margin: 0;
    font-size: 24px;
  }

  a {
    text-decoration: none;
  }

  .logo {
    height: 32px;
  }
}

main {
  flex: 1;
}

footer {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px;

  .credit {
    font-size: 12px;
    font-style: italic;
    opacity: 0.6;
  }

  .controls {
    flex-shrink: 0;
    margin-left: 10px;
  }
}
</style>
