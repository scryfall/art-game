<script setup lang="ts">
import PickModeScreen from "./components/PickModeScreen.vue";
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
          Art Game
        </h1>
      </a>
    </header>

    <PickModeScreen />

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

  padding: 0 16px;

  @include mixins.bp-small {
    .screen {
      flex: auto;
      flex-shrink: 0;
    }
  }

  @include mixins.bp-large {
    justify-content: space-between;
  }
}

header {
  text-align: center;
  padding: 10px 0;

  @include mixins.bp-large {
    padding-bottom: 50px;
  }

  a {
    text-decoration: none;
  }

  .logo {
    height: 32px;
    margin-right: 10px;
    vertical-align: middle;
  }
}

h1 {
  display: inline-block;
  font-size: 18px;
  line-height: 32px;
  margin: 0;

  @include mixins.bp-large {
    font-size: 24px;
  }
}

footer {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;

  @include mixins.bp-large {
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .credit {
    font-size: 12px;
    font-style: italic;
    opacity: 0.6;

    @include mixins.bp-small {
      margin-top: 20px;
    }
  }

  .controls {
    flex-shrink: 0;
    margin-left: 10px;
  }
}
</style>
